import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import EditEventClient from "./EditEventClient";

export default async function EditGalleryEventPage({ params }: { params: { id: string } }) {
    const eventId = await Promise.resolve(params).then(p => p.id); // Resolving params in Next.js 15+
    
    const event = await prisma.galleryEvent.findUnique({
        where: { id: eventId },
        include: { images: true }
    });

    if (!event) return notFound();

    return <EditEventClient event={event} />;
}
