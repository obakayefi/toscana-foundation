'use server';

import { readData, writeData } from "@/lib/json-db";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../../actions";

export async function deleteGalleryEvent(eventId: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const data = await readData();
    data.galleryEvents = data.galleryEvents.filter(e => e.id !== eventId);
    
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard/gallery');
    return { success: true };
}

export async function updateGalleryEvent(eventId: string, updateData: { title: string, year: string, description: string }) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const data = await readData();
    const index = data.galleryEvents.findIndex(e => e.id === eventId);
    if (index === -1) throw new Error("Event not found");
    
    data.galleryEvents[index] = {
        ...data.galleryEvents[index],
        ...updateData,
        updatedAt: new Date().toISOString()
    };
    
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
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

    const data = await readData();
    const eventIndex = data.galleryEvents.findIndex(e => e.id === eventId);
    if (eventIndex === -1) throw new Error("Event not found");

    const newImages = uploadedImages.map(img => ({
        id: crypto.randomUUID(),
        url: img.url,
        publicId: img.publicId
    }));

    data.galleryEvents[eventIndex].images.push(...newImages);
    data.galleryEvents[eventIndex].updatedAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();
    await writeData(data);

    revalidatePath('/gallery');
    revalidatePath(`/admin/dashboard/gallery/${eventId}`);
    return { success: true };
}

export async function deleteImage(imageId: string, eventId: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");
    
    const data = await readData();
    const eventIndex = data.galleryEvents.findIndex(e => e.id === eventId);
    if (eventIndex === -1) throw new Error("Event not found");

    data.galleryEvents[eventIndex].images = data.galleryEvents[eventIndex].images.filter(img => img.id !== imageId);
    data.galleryEvents[eventIndex].updatedAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();
    await writeData(data);
    
    revalidatePath('/gallery');
    revalidatePath(`/admin/dashboard/gallery/${eventId}`);
    return { success: true };
}
