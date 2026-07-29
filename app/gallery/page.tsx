import { prisma } from "@/lib/db";
import GalleryClient from "./GalleryClient";

export default async function Page() {
    let formattedDbEvents: any[] = [];
    try {
        const dbEvents = await prisma.galleryEvent.findMany({
            orderBy: { createdAt: "desc" },
            include: { images: true }
        });
        formattedDbEvents = dbEvents.map((event: any) => ({
            id: event.slug,
            dbId: event.id,
            title: event.title,
            date: event.year,
            description: event.description,
            coverImage: event.images[0]?.url || '',
            photoCount: event.images.length,
        }));
    } catch (error: any) {
        console.error("GALLERY SERVER FETCH ERROR:", error);
    }

    return <GalleryClient initialEvents={formattedDbEvents} />;
}