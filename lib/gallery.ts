'use server';

import { readData, writeData, GalleryEvent } from "@/lib/json-db";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadGalleryEvent(formData: FormData) {
    const adminSecret = formData.get('adminSecret') as string;

    if (adminSecret !== process.env.ADMIN_SECRET) {
        throw new Error('Unauthorized: Invalid Admin Secret');
    }

    const title = formData.get('title') as string;
    const year = formData.get('year') as string;
    const slug = formData.get('id') as string;
    const description = formData.get('description') as string;
    const imageFiles = formData.getAll('images') as File[];

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

    const data = await readData();
    const newEvent: GalleryEvent = {
        id: crypto.randomUUID(),
        title,
        year,
        slug,
        description,
        images: uploadedImages.map(img => ({
            id: crypto.randomUUID(),
            url: img.url,
            publicId: img.publicId
        })),
        createdAt: new Date().toISOString()
    };

    data.galleryEvents.push(newEvent);
    data.updatedAt = new Date().toISOString();
    await writeData(data);

    revalidatePath('/gallery');
    return { success: true };
}

export async function getGalleryEvents() {
    const data = await readData();
    return data.galleryEvents
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map(event => ({
            ...event,
            _count: { images: event.images.length }
        }));
}

export async function getGalleryEventBySlug(slug: string) {
    const data = await readData();
    return data.galleryEvents.find(e => e.slug === slug) || null;
}