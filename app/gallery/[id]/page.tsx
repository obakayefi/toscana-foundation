import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import PageJumbo from "@/components/ui/PageJumbo";
import { EVENT_PICS } from "@/lib/data";
import { getGalleryEventBySlug } from "@/lib/gallery";
import { BsCalendarRangeFill } from "react-icons/bs";
import ImagePreviewGallery from "./ImagePreviewGallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const params = EVENT_PICS.map((event: any) => ({
        id: event.id,
    }));
    return params;
}

export default async function GalleryDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 1. Try fetching from database first
    const dbEvent = await getGalleryEventBySlug(id);
    
    // 2. Fallback to static data
    const staticEvent = EVENT_PICS.find((event: any) => event.id === id);

    const event = dbEvent || staticEvent;

    // Convert eventYears object to array format for static events
    function prepareEventImages(years: Record<string, string[]> | undefined) {
        if (!years) return [];
        return Object.entries(years).map(([year, images]) => [year, ...images]);
    }

    const eventYearsArray = dbEvent 
        ? [[dbEvent.year, { name: dbEvent.title, caption: dbEvent.description, images: dbEvent.images.map(img => img.url) }]]
        : prepareEventImages(staticEvent?.years);
    console.log({ event, eventYearsArray });
    return (
        <div className="min-h-screen bg-zinc-100">
            <Header />
            {event ? (
                <>
                    <PageJumbo
                        title={dbEvent ? dbEvent.title : staticEvent?.name || ''}
                        description={dbEvent ? dbEvent.description || '' : staticEvent?.description || ''} />
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
                            {eventYearsArray.length > 0 && eventYearsArray.reverse().map((yearData) => {
                                const [year, ...data] = yearData;
                                const events = [...data]
                                return (
                                    <div key={year} className="mb-12">
                                        <h2 className="text-3xl font-bold mb-6 items-center bg-green-100 text-green-900 rounded inline-flex px-4 py-2">
                                            <BsCalendarRangeFill className="w-6 h-6 mr-2" /> {year}
                                        </h2>
                                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                                        <div className="flex flex-col gap-10">
                                            {events.map((event: any, idx: number) => (
                                                <div key={idx} className="border-b-3 border-zinc-200 pb-6">
                                                    <div className="my-6">
                                                        <h2 className="text-2xl text-zinc-700">{event.name}</h2>
                                                        <p className="text-zinc-400">{event.caption}</p>
                                                    </div>

                                                    {event.images.length > 0 && (
                                                        <ImagePreviewGallery 
                                                            images={event.images} 
                                                            eventName={event.name} 
                                                            year={year} 
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </>
            ) : (
                <div className="min-h-screen bg-zinc-100">

                    <PageJumbo
                        title="Event Not Found"
                        description="The event you are looking for does not exist." />
                </div>
            )
            }
            <Footer />
        </div >
    )
}   