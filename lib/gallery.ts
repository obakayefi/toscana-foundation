'use server';

import { prisma } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadGalleryEvent(formData: FormData) {
    const adminSecret = formData.get('adminSecret') as string;

    // Simple "lock" implementation using an environment variable
    if (adminSecret !== process.env.ADMIN_SECRET) {
        throw new Error('Unauthorized: Invalid Admin Secret');
    }

    const title = formData.get('title') as string;
    const year = formData.get('year') as string;
    const slug = formData.get('id') as string;
    const description = formData.get('description') as string;
    const imageFiles = formData.getAll('images') as File[];

    // Upload images to Cloudinary via stream
    const uploadedImages = await Promise.all(
        imageFiles.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'toscana-gallery' },
                    (error, result) => {
                        if (error || !result) reject(error);
                        else resolve({ url: result.secure_url, publicId: result.public_id });
                    }
                ).end(buffer);
            });
        })
    );

    // Create the record in SQLite
    await prisma.galleryEvent.create({
        data: {
            title,
            year,
            slug,
            description,
            images: {
                create: uploadedImages.map(img => ({
                    url: img.url,
                    publicId: img.publicId
                }))
            }
        }
    });

    revalidatePath('/gallery');
    return { success: true };
}

export async function getGalleryEvents() {
    return await prisma.galleryEvent.findMany({
        include: {
            images: { take: 1 },
            _count: { select: { images: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getGalleryEventBySlug(slug: string) {
    return await prisma.galleryEvent.findUnique({
        where: { slug },
        include: { images: true }
    });
}