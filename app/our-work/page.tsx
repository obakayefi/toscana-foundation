import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Banknote, GraduationCap, Scale, HeartPulse, Gift, BookOpen } from "lucide-react";
import agricultureImage from "@assets/generated_images/nigerian_community_farming_scene.png";
import microfinanceImage from "@assets/generated_images/women_micro-finance_meeting.png";
import capacityImage from "@assets/generated_images/youth_capacity_building_workshop.png";
//import governanceImage from "@assets/generated_images/governance_community_workshop.png";
import healthImage from "@assets/generated_images/health_education_community_session.png";
import charityImage from "@assets/generated_images/charity_distribution_event.png";
import educationImage from "@assets/generated_images/inclusive_education_classroom.png";

// todo: remove mock functionality
const programs = [
    {
        id: "agriculture",
        title: "Agriculture & Livelihood",
        description: "We support sustainable farming practices and livelihood development for rural communities across Nigeria. Our programs include agricultural training, provision of farming inputs, and connecting farmers to markets.",
        icon: Sprout,
        image: '/projects/agriculture-livelihood.jpg',
    },
    {
        id: "microfinance",
        title: "Micro-Financing",
        description: "We provide financial support and training for small-scale entrepreneurs and women-led businesses. Through microloans and financial literacy programs, we empower individuals to build sustainable livelihoods.",
        icon: Banknote,
        image: '/projects/micro-financing.jpg',
    },
    {
        id: "capacity",
        title: "Capacity Building",
        description: "We develop skills and empower individuals for sustainable community transformation. Our capacity building programs include vocational training, leadership development, and organizational strengthening.",
        icon: GraduationCap,
        image: '/projects/capacity-building.jpg',
    },
    {
        id: "governance",
        title: "Good Governance & Human Rights",
        description: "We promote accountability, civic engagement, and human rights awareness across communities. Our advocacy programs strengthen democratic participation and protect fundamental rights.",
        icon: Scale,
        image: '/projects/good-governance.jpg',
    },
    {
        id: "health",
        title: "Health & Environment",
        description: "We advance health education and environmental sustainability for community wellbeing. Our programs address preventive healthcare, sanitation, and environmental conservation.",
        icon: HeartPulse,
        image: '/projects/health-environment.jpg',
    },
    {
        id: "charity",
        title: "Charity",
        description: "We provide humanitarian support to the less privileged and internally displaced persons. Our charity programs include food distribution, emergency relief, and support for vulnerable populations.",
        icon: Gift,
        image: '/projects/charity.JPG',
    },
    {
        id: "education",
        title: "Inclusive Education",
        description: "We create educational opportunities for all, including persons with disabilities. Our education programs promote access to quality learning and support for marginalized students.",
        icon: BookOpen,
        image: '/projects/IMG_3850.JPG',
    },
];

export default function OurWork() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-work-page-title">
                                Our Work
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Discover our seven key program areas designed to create lasting impact across communities.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-16">
                            {programs.map((program, index) => (
                                <div
                                    key={program.id}
                                    id={program.id}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                        }`}
                                    data-testid={`section-program-${program.id}`}
                                >
                                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="rounded-2xl shadow-lg w-full"
                                        />
                                    </div>
                                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 rounded-full bg-[#005F46]/10 flex items-center justify-center">
                                                <program.icon className="w-7 h-7 text-primary" />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                                {program.title}
                                            </h2>
                                        </div>
                                        <p className="text-lg text-muted-foreground font-body leading-relaxed">
                                            {program.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Support Our Programs"
                    description="Your contribution helps us expand our reach and create more impact in communities across Nigeria."
                />
            </main>
            <Footer />
        </div>
    );
}
