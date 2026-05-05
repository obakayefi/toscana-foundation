import { readData } from "@/lib/json-db";
import { notFound } from "next/navigation";
import EditEventClient from "./EditEventClient";

export default async function EditGalleryEventPage({ params }: { params: { id: string } }) {
    const eventId = await Promise.resolve(params).then(p => p.id);
    
    const data = await readData();
    const event = data.galleryEvents.find(e => e.id === eventId);

    if (!event) return notFound();

    return <EditEventClient event={event} />;
}
