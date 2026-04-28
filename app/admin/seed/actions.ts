'use server';

import { prisma } from "@/lib/db";
import { verifyAdmin } from "../actions";
import { revalidatePath } from "next/cache";

export async function seedFromJson(jsonData: any) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const { galleryEvents, beneficiaries } = jsonData;
    let count = 0;

    // 1. Seed Gallery Events
    if (galleryEvents && Array.isArray(galleryEvents)) {
        for (const event of galleryEvents) {
            const { images, id, createdAt, ...eventData } = event;
            
            // Check if slug already exists
            const existing = await prisma.galleryEvent.findUnique({ where: { slug: eventData.slug } });
            if (existing) continue;

            await prisma.galleryEvent.create({
                data: {
                    ...eventData,
                    images: {
                        create: images.map((img: any) => ({
                            url: img.url,
                            publicId: img.publicId
                        }))
                    }
                }
            });
            count++;
        }
    }

    // 2. Seed Beneficiaries
    if (beneficiaries && Array.isArray(beneficiaries)) {
        for (const b of beneficiaries) {
            const { id, createdAt, ...bData } = b;
            // Check if name/type already exists
            const existing = await prisma.beneficiary.findFirst({ 
                where: { name: b.name, type: b.type } 
            });
            if (existing) continue;

            await prisma.beneficiary.create({
                data: {
                    ...bData
                }
            });
            count++;
        }
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/gallery');
    revalidatePath('/about');
    
    return { success: true, count };
}
