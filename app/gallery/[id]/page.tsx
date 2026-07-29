import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import PageJumbo from "@/components/ui/PageJumbo";
import { getGalleryEventBySlug } from "@/lib/gallery";
import { prisma } from "@/lib/db";
import { BsCalendarRangeFill } from "react-icons/bs";
import ImagePreviewGallery from "./ImagePreviewGallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    try {
        const events = await prisma.galleryEvent.findMany({
            select: { slug: true },
        });
        return events.map((event) => ({ id: event.slug }));
    } catch {
        // Fallback to empty if DB is unreachable during build
        return [];
    }
}

export default async function GalleryDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const dbEvent = await getGalleryEventBySlug(id);

    const eventYearsArray = dbEvent
        ? [{
            year: dbEvent.year,
            events: [{
                name: dbEvent.title,
                caption: dbEvent.description,
                images: dbEvent.images.map((img: { url: string }) => img.url)
            }]
          }]
        : [];

    return (
        <div className="min-h-screen bg-zinc-100">
            <Header />
            {dbEvent ? (
                <>
                    <PageJumbo
                        title={dbEvent.title}
                        description={dbEvent.description || ''}
                    />
                    <section className="py-16 md:py-24" data-testid="section-events">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Link
                                href="/gallery"
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-green-700 transition-colors mb-12 font-medium group"
                            >
                                <div className="p-2 rounded-full bg-white shadow-sm border border-zinc-100 group-hover:bg-green-50 group-hover:border-green-100 transition-all">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </div>
                                <span>Back to Gallery</span>
                            </Link>
                            {eventYearsArray.length > 0 && [...eventYearsArray].reverse().map(({ year, events }) => (
                                <div key={year} className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6 items-center bg-green-100 text-green-900 rounded inline-flex px-4 py-2">
                                        <BsCalendarRangeFill className="w-6 h-6 mr-2" /> {year}
                                    </h2>
                                    <div className="flex flex-col gap-10">
                                        {events.map((evt: any, idx: number) => (
                                            <div key={idx} className="border-b-3 border-zinc-200 pb-6">
                                                <div className="my-6">
                                                    <h2 className="text-2xl text-zinc-700">{evt.name}</h2>
                                                    <p className="text-zinc-400">{evt.caption}</p>
                                                </div>
                                                {evt.images && evt.images.length > 0 && (
                                                    <ImagePreviewGallery
                                                        images={evt.images}
                                                        eventName={evt.name}
                                                        year={year}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <PageJumbo
                    title="Event Not Found"
                    description="The event you are looking for does not exist."
                />
            )}
            <Footer />
        </div>
    );
}