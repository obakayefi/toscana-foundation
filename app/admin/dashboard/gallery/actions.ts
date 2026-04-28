'use server';

import { prisma } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../../actions";

export async function deleteGalleryEvent(eventId: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    // Deletes cascade if configured in Prisma schema, otherwise we should delete images first
    // In schema.prisma we have `onDelete: Cascade` for eventId in Image
    await prisma.galleryEvent.delete({
        where: { id: eventId }
    });
    
    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard/gallery');
    return { success: true };
}

export async function updateGalleryEvent(eventId: string, data: { title: string, year: string, description: string }) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    await prisma.galleryEvent.update({
        where: { id: eventId },
        data: {
            title: data.title,
            year: data.year,
            description: data.description
        }
    });
    
    revalidatePath('/gallery');
    revalidatePath(`/admin/dashboard/gallery/${eventId}`);
    return { success: true };
}

export async function addImagesToEvent(eventId: string, formData: FormData) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const files = formData.getAll("images") as File[];
    if (!files || files.length === 0) throw new Error("No images provided");


    const uploadedImages = await Promise.all(
        files.map(async (file) => {
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

    // Create image records
    await prisma.image.createMany({
        data: uploadedImages.map(img => ({
            url: img.url,
            publicId: img.publicId,
            eventId: eventId
        }))
    });

    revalidatePath('/gallery');
    revalidatePath(`/admin/dashboard/gallery/${eventId}`);
    return { success: true };
}

export async function deleteImage(imageId: string, eventId: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    await prisma.image.delete({
        where: { id: imageId }
    });
    
    revalidatePath('/gallery');
    revalidatePath(`/admin/dashboard/gallery/${eventId}`);
    return { success: true };
}
