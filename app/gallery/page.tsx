import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import GalleryCard from "@/components/ui/gallery-card";
import CTASection from "@/components/ui/cta-section";
import PageJumbo from "@/components/ui/PageJumbo";
import { getGalleryEvents } from "@/lib/gallery";

const Page = async () => {
    let formattedDbEvents = [];
    try {
        const dbEvents = await getGalleryEvents();
        formattedDbEvents = dbEvents.map((event: any) => ({
            id: event.slug,
            title: event.title,
            date: event.year,
            coverImage: event.images[0]?.url || '',
            photoCount: event._count.images,
        }));
    } catch (error: any) {
        console.error("GALLERY FETCH ERROR:", error);
        try {
            const fs = require('fs');
            fs.writeFileSync('gallery-error.log', JSON.stringify({
                message: error.message,
                stack: error.stack,
                raw: error
            }, null, 2));
        } catch (e) { }
        // Fallback to empty db events
    }

    const staticEvents = [
        {
            id: "health-outreach",
            title: "Community Health Outreach",
            date: "2025",
            coverImage: '/health-outreach/health-002-closer.jpg',
            photoCount: 1,
        },
    ];

    const allEvents = [...formattedDbEvents];

    return (
        <div className="min-h-screen bg-zinc-100">
            <Header />
            <PageJumbo
                title="Gallery"
                description="A collection of our events and activities."
            />
            <section className="py-16 md:py-24" data-testid="section-events">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allEvents.map((event) => (
                            <GalleryCard
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                coverImage={event.coverImage}
                                photoCount={event.photoCount}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Page