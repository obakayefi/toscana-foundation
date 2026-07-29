'use server';

import { prisma } from "@/lib/db";
import cloudinary, { uploadToCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadGalleryEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const year = formData.get("year") as string;
  const slug = formData.get("id") as string;
  const description = formData.get("description") as string;
  const imageFiles = formData.getAll("images") as File[];

  const uploadedImages = await Promise.all(
    imageFiles.map((file) => uploadToCloudinary(file, "toscana-gallery"))
  );

  const event = await prisma.galleryEvent.create({
    data: {
      title,
      year,
      slug,
      description,
      images: {
        create: uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      },
    },
    include: { images: true },
  });

  revalidatePath("/gallery");
  return { success: true, event };
}

export async function getGalleryEvents() {
  const events = await prisma.galleryEvent.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  return events.map((event) => ({
    ...event,
    _count: { images: event.images.length },
  }));
}

export async function getGalleryEventBySlug(slug: string) {
  return await prisma.galleryEvent.findUnique({
    where: { slug },
    include: { images: true },
  });
}