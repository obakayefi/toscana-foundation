'use server';

import { prisma } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { verifyAdmin } from "../actions";
import { revalidatePath } from "next/cache";

const CLOUDINARY_HOST = 'https://res.cloudinary.com';

/** Returns true if the URL is already hosted on Cloudinary */
function isCloudinaryUrl(url: string | null | undefined): boolean {
    return !!url && url.startsWith(CLOUDINARY_HOST);
}

/**
 * Upload a URL or local file path to Cloudinary if it isn't already a Cloudinary URL.
 * Returns null if the URL is empty/null or if the upload fails.
 */
async function migrateUrlToCloudinary(
    url: string | null | undefined,
    folder: string
): Promise<{ url: string; publicId: string } | null> {
    if (!url) return null;
    if (isCloudinaryUrl(url)) {
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
        const publicId = match?.[1] ?? 'existing';
        return { url, publicId };
    }

    try {
        console.log(`[seed] Uploading local/remote image to Cloudinary: ${url}`);
        return await uploadToCloudinary(url, folder);
    } catch (err) {
        console.error(`[seed] Failed to upload image ${url}:`, err);
        return null;
    }
}

export async function seedFromJson(jsonData: any) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const { galleryEvents, beneficiaries } = jsonData;
    let seededCount = 0;
    let errors: string[] = [];

    // ── Seed Beneficiaries ──────────────────────────────────────────────
    if (beneficiaries && Array.isArray(beneficiaries)) {
        for (const b of beneficiaries) {
            try {
                const { id, createdAt, updatedAt, ...rest } = b;

                // Check if beneficiary already exists by name and type
                const existing = await prisma.beneficiary.findFirst({
                    where: {
                        name: rest.name,
                        type: rest.type || 'academic',
                    }
                });

                // Migrate/Upload photo to Cloudinary (checks local disk first, then remote fetch)
                const migratedImg = await migrateUrlToCloudinary(rest.img, 'toscana-scholars');

                if (existing) {
                    // Update existing record with Cloudinary URL if available
                    await prisma.beneficiary.update({
                        where: { id: existing.id },
                        data: {
                            yearJoined: rest.yearJoined || existing.yearJoined,
                            gender: rest.gender || existing.gender,
                            img: migratedImg?.url || existing.img,
                            imgPublicId: migratedImg?.publicId || existing.imgPublicId,
                            grant: rest.grant ?? existing.grant,
                            schoolName: rest.schoolName ?? existing.schoolName,
                            course: rest.course ?? existing.course,
                            level: rest.level ?? existing.level,
                            craft: rest.craft ?? existing.craft,
                            equipmentGiven: rest.equipmentGiven ?? existing.equipmentGiven,
                            sortOrder: rest.sortOrder ?? existing.sortOrder,
                        }
                    });
                } else {
                    // Create new beneficiary record
                    await prisma.beneficiary.create({
                        data: {
                            type: rest.type || 'academic',
                            name: rest.name,
                            yearJoined: rest.yearJoined || '2024',
                            gender: rest.gender || 'N/A',
                            img: migratedImg?.url || null,
                            imgPublicId: migratedImg?.publicId || null,
                            grant: rest.grant || null,
                            schoolName: rest.schoolName || null,
                            course: rest.course || null,
                            level: rest.level || null,
                            craft: rest.craft || null,
                            equipmentGiven: rest.equipmentGiven || null,
                            sortOrder: rest.sortOrder ?? seededCount,
                        }
                    });
                }
                seededCount++;
            } catch (err: any) {
                errors.push(`Beneficiary "${b.name}": ${err.message}`);
                console.error(`[seed] Beneficiary error:`, err);
            }
        }
    }

    // ── Seed Gallery Events ─────────────────────────────────────────────
    if (galleryEvents && Array.isArray(galleryEvents)) {
        for (const e of galleryEvents) {
            try {
                const { id, createdAt, updatedAt, images, ...rest } = e;
                const slug = rest.slug || rest.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                // Check if event already exists by slug
                const existingEvent = await prisma.galleryEvent.findUnique({
                    where: { slug }
                });

                // Migrate/Upload each image to Cloudinary if needed
                const migratedImages = await Promise.all(
                    (images || []).map((img: any) => migrateUrlToCloudinary(img.url, 'toscana-gallery'))
                );

                const validImages = migratedImages.filter((img): img is { url: string; publicId: string } => img !== null);

                if (existingEvent) {
                    // Update existing event details
                    await prisma.galleryEvent.update({
                        where: { id: existingEvent.id },
                        data: {
                            title: rest.title,
                            year: rest.year || existingEvent.year,
                            description: rest.description || existingEvent.description,
                        }
                    });

                    // Add any new images that aren't already linked
                    for (const img of validImages) {
                        const existingImg = await prisma.image.findFirst({
                            where: { eventId: existingEvent.id, url: img.url }
                        });
                        if (!existingImg) {
                            await prisma.image.create({
                                data: {
                                    url: img.url,
                                    publicId: img.publicId,
                                    eventId: existingEvent.id
                                }
                            });
                        }
                    }
                } else {
                    // Create new gallery event with images
                    await prisma.galleryEvent.create({
                        data: {
                            title: rest.title,
                            slug,
                            year: rest.year || '2025',
                            description: rest.description || '',
                            images: {
                                create: validImages.map(img => ({
                                    url: img.url,
                                    publicId: img.publicId,
                                }))
                            }
                        }
                    });
                }
                seededCount++;
            } catch (err: any) {
                errors.push(`Gallery event "${e.title}": ${err.message}`);
                console.error(`[seed] Gallery event error:`, err);
            }
        }
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/gallery');
    revalidatePath('/scholarships');
    revalidatePath('/about');

    return {
        success: true,
        count: seededCount,
        errors: errors.length > 0 ? errors : undefined,
    };
}
