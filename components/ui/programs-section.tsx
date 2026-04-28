"use client"
import ProgramCard from "@/components/ui/program-card";
import { Sprout, Banknote, GraduationCap, Scale, HeartPulse, Gift, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900" data-testid="text-programs-title">
                        Empowerment <span className="text-green-700">Pillars</span>
                    </h2>
                    <p className="mt-4 text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                        Our programs are designed to create lasting impact across seven key areas of human development
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.slice(0, 6).map((program, index) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <ProgramCard {...program} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="max-w-md w-full"
                    >
                        <ProgramCard {...programs[6]} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
