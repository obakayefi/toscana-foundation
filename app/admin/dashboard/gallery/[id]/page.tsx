import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import EditEventClient from "./EditEventClient";

export default async function EditGalleryEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: eventId } = await params;
    
    let event = null;
    try {
        event = await prisma.galleryEvent.findUnique({
            where: { id: eventId },
            include: { images: true }
        });
    } catch (e) {
        console.error("Fetch single gallery event error:", e);
    }

    if (!event) return notFound();

    return <EditEventClient event={event} />;
}
