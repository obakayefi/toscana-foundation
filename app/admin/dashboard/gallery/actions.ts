'use server';

import { prisma } from "@/lib/db";
import cloudinary, { uploadToCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "../../actions";

export async function deleteGalleryEvent(eventId: string) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    // Delete all Cloudinary images for this event
    const event = await prisma.galleryEvent.findUnique({
        where: { id: eventId },
        include: { images: true }
    });
    if (event?.images?.length) {
        await Promise.allSettled(
            event.images.map((img) => cloudinary.uploader.destroy(img.publicId))
        );
    }

    await prisma.galleryEvent.delete({ where: { id: eventId } });

    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard/gallery');
    return { success: true };
}

export async function updateGalleryEvent(eventId: string, updateData: { title: string, year: string, description: string }) {
    if (!await verifyAdmin()) throw new Error("Unauthorized");

    await prisma.galleryEvent.update({
        where: { id: eventId },
        data: updateData
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
        files.map((file) => uploadToCloudinary(file, 'toscana-gallery'))
    );

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

    const image = await prisma.image.findUnique({ where: { id: imageId } });
    if (image?.publicId) {
        await cloudinary.uploader.destroy(image.publicId).catch(() => {});
    }

    await prisma.image.delete({ where: { id: imageId } });

    revalidatePath('/gallery');
    revalidatePath(`/admin/dashboard/gallery/${eventId}`);
    return { success: true };
}
