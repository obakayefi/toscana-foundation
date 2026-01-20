import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import GalleryCard from "@/components/ui/gallery-card";
import CTASection from "@/components/ui/cta-section";
import healthImage from "@assets/generated_images/health_outreach_community_event.png";
import womenImage from "@assets/generated_images/women_empowerment_graduation_ceremony.png";
// import schoolImage from "@assets/generated_images/";
// import agricultureImage from "@assets/generated_images/";
import foodImage from "@assets/generated_images/food_distribution_community_event.png";
import youthImage from "@assets/generated_images/youth_skills_training_workshop.png";

// todo: remove mock functionality
const events = [
    // {
    //     id: "health-outreach",
    //     title: "Community Health Outreach Program",
    //     date: "November 2024",
    //     coverImage: '/health_outreach_community_event.png',
    //     photoCount: 24,
    // },
    // {
    //     id: "women-empowerment-graduation",
    //     title: "Women Empowerment Graduation Ceremony",
    //     date: "October 2024",
    //     coverImage: '/women_empowerment_graduation_ceremony.png',
    //     photoCount: 32,
    // },
    // {
    //     id: "school-supplies",
    //     title: "Back to School Supplies Distribution",
    //     date: "September 2024",
    //     coverImage: '/school_supplies_distribution_event.png',
    //     photoCount: 18,
    // },
    {
        id: "agricultural-training",
        title: "Agricultural Skills Training Workshop",
        date: "August 2024",
        coverImage: '/agricultural-training/BW9A4150.jpg',
        photoCount: 28,
    },
    {
        id: "community-food-distribution", // Matches lib/data.ts
        title: "Community Food Distribution Event",
        date: "July 2024",
        coverImage: '/community-food-distribution/BW9A8921.jpg',
        photoCount: 22,
    },
    {
        id: "youth-training", // Matches lib/data.ts
        title: "Youth Vocational Skills Training",
        date: "June 2024",
        coverImage: '/youth-training/BW9A4255.jpg',
        photoCount: 35,
    },
];

export default function Gallery() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-gallery-page-title">
                                Event Gallery
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Explore memorable moments from our community projects and events across Nigeria.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" data-testid="section-events">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                                <GalleryCard key={event.id} {...event} />
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Want to See More?"
                    description="Follow our journey and stay updated on our latest events and community impact."
                    primaryAction={{ label: "Contact Us", href: "/contact" }}
                    secondaryAction={{ label: "Support Our Work", href: "/donate" }}
                />
            </main>
            <Footer />
        </div>
    );
}
