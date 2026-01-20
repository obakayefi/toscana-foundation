import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import PageJumbo from "@/components/ui/PageJumbo";
import { EVENT_PICS } from "@/lib/data";
import { BsCalendarRangeFill } from "react-icons/bs";
import { Calendar, CalendarIcon } from "lucide-react";

export async function generateStaticParams() {
    const params = EVENT_PICS.map((event: any) => ({
        id: event.id,
    }));
    return params;
}

export default async function GalleryDetail({ params }: { params: { id: string } }) {
    const { id } = await params;

    const event = EVENT_PICS.find((event: any) => event.id === id);

    // Convert eventYears object to array format: [["2024", ...images], ["2023", ...images]]
    function prepareEventImages(years: Record<string, string[]> | undefined) {
        if (!years) return [];
        return Object.entries(years).map(([year, images]) => [year, ...images]);
    }

    const eventYearsArray = prepareEventImages(event?.years);

    console.log({ event, eventYearsArray });

    return (
        <div className="min-h-screen bg-zinc-100">
            <Header />
            {event ? (
                <>
                    <PageJumbo
                        title={event?.name}
                        description={event?.description} />
                    <section className="py-16 md:py-24" data-testid="section-events">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {eventYearsArray.length > 0 && eventYearsArray.reverse().map((yearData) => {
                                const [year, ...images] = yearData;
                                return (
                                    <div key={year} className="mb-12">
                                        <h2 className="text-3xl font-bold mb-6 items-center bg-green-100 text-green-900 rounded inline-flex px-4 py-2">
                                            <BsCalendarRangeFill className="w-6 h-6 mr-2" /> {year}
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {images.map((image) => (
                                                <img
                                                    key={image}
                                                    src={image}
                                                    alt={`${event?.name} - ${year}`}
                                                    className="w-full h-full rounded-lg border-2 border-zinc-200 object-cover"
                                                />
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