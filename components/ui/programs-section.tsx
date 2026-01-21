import ProgramCard from "@/components/ui/program-card";
import { Sprout, Banknote, GraduationCap, Scale, HeartPulse, Gift, BookOpen } from "lucide-react";
import agricultureImage from "@assets/generated_images/nigerian_community_farming_scene.png";
import microfinanceImage from "@assets/generated_images/women_micro-finance_meeting.png";
import capacityImage from "@assets/generated_images/youth_capacity_building_workshop.png";
import governanceImage from "@assets/generated_images/governance_community_workshop.png";
import healthImage from "@assets/generated_images/health_education_community_session.png";
import charityImage from "@assets/generated_images/charity_distribution_event.png";
import educationImage from "@assets/generated_images/inclusive_education_classroom.png";

// todo: remove mock functionality
const programs = [
    {
        title: "Agriculture & Livelihood",
        description: "Supporting sustainable farming practices and livelihood development for rural communities.",
        icon: Sprout,
        image: '/projects/IMG_3866.JPG',
        href: "/our-work#agriculture",
    },
    {
        title: "Micro-Financing",
        description: "Providing financial support and training for small-scale entrepreneurs and women-led businesses.",
        icon: Banknote,
        image: '/projects/IMG_3845.JPG',
        href: "/our-work#microfinance",
    },
    {
        title: "Capacity Building",
        description: "Developing skills and empowering individuals for sustainable community transformation.",
        icon: GraduationCap,
        image: '/projects/IMG_3868.JPG',
        href: "/our-work#capacity",
    },
    {
        title: "Good Governance & Rights",
        description: "Promoting accountability, civic engagement, and human rights awareness across communities.",
        icon: Scale,
        image: '/projects/IMG_3865.JPG',
        href: "/our-work#governance",
    },
    {
        title: "Health & Environment",
        description: "Advancing health education and environmental sustainability for community wellbeing.",
        icon: HeartPulse,
        image: '/projects/IMG_3874.JPG',
        href: "/our-work#health",
    },
    {
        title: "Charity",
        description: "Providing humanitarian support to the less privileged and internally displaced persons.",
        icon: Gift,
        image: '/projects/charity.JPG',
        href: "/our-work#charity",
    },
    {
        title: "Inclusive Education",
        description: "Creating educational opportunities for all, including persons with disabilities.",
        icon: BookOpen,
        image: '/projects/IMG_3850.JPG',
        href: "/our-work#education",
    },
];

export default function ProgramsSection() {
    return (
        <section className="py-16 md:py-24" data-testid="section-programs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-programs-title">
                        What We Do
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                        Our programs are designed to create lasting impact across seven key areas of human development
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.slice(0, 6).map((program) => (
                        <ProgramCard key={program.title} {...program} />
                    ))}
                </div>

                <div className="mt-6 flex justify-center">
                    <div className="max-w-md w-full">
                        <ProgramCard {...programs[6]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
