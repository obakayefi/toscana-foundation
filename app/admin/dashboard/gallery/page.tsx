import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit2, Image as ImageIcon } from "lucide-react";

export default async function AdminGalleryPage() {
    let events: any[] = [];
    try {
        const dbEvents = await prisma.galleryEvent.findMany({
            orderBy: { year: 'desc' },
            include: { images: true }
        });
        events = dbEvents.map(e => ({
            ...e,
            _count: { images: e.images.length }
        }));
    } catch (e) {
        console.error("Admin gallery fetch error:", e);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Gallery Events</h1>
                    <p className="text-zinc-500 mt-2">Manage your photo galleries and event collections.</p>
                </div>
                <Link 
                    href="/admin/dashboard/gallery/upload"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                    <Plus size={18} />
                    <span>New Event</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-600">
                        <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-900">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Event Title</th>
                                <th className="px-6 py-4 font-semibold">Year</th>
                                <th className="px-6 py-4 font-semibold">Photos</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {events.map(event => (
                                <tr key={event.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-900">
                                        {event.title}
                                        {event.description && <p className="text-xs text-zinc-400 font-normal mt-1 line-clamp-1">{event.description}</p>}
                                    </td>
                                    <td className="px-6 py-4">{event.year}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full w-fit text-xs font-medium border border-green-100">
                                            <ImageIcon size={14} />
                                            {event._count.images}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link 
                                                href={`/admin/dashboard/gallery/${event.id}`}
                                                className="p-2 text-zinc-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Edit Event & Add Photos"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                        No gallery events found. Click "New Event" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
