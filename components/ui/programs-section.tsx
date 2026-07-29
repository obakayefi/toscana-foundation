"use client"
import ProgramCard from "@/components/ui/program-card";
import { Sprout, Banknote, GraduationCap, Scale, HeartPulse, Gift, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const programs = [
    {
        title: "Agriculture & Livelihood",
        description: "Supporting sustainable farming practices and livelihood development for rural communities.",
        icon: Sprout,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777366281/toscana-gallery/if5wluaoypqvfilqpwz4.webp',
        href: "/our-work#agriculture",
    },
    {
        title: "Micro-Financing",
        description: "Providing financial support and training for small-scale entrepreneurs and women-led businesses.",
        icon: Banknote,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746225/xmxexeffrusenrkjqodd_nfxk33.webp',
        href: "/our-work#microfinance",
    },
    {
        title: "Capacity Building",
        description: "Developing skills and empowering individuals for sustainable community transformation.",
        icon: GraduationCap,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746231/digxbh1uiixoee4gdier_hythkp.webp',
        href: "/our-work#capacity",
    },
    {
        title: "Good Governance & Rights",
        description: "Promoting accountability, civic engagement, and human rights awareness across communities.",
        icon: Scale,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746227/ishxl7s0rfmrjwle7fum_tjweub.webp',
        href: "/our-work#governance",
    },
    {
        title: "Health & Environment",
        description: "Advancing health education and environmental sustainability for community wellbeing.",
        icon: HeartPulse,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777366390/toscana-gallery/nfaew53yuw3umyv2wysj.jpg',
        href: "/our-work#health",
    },
    {
        title: "Charity",
        description: "Providing humanitarian support to the less privileged and internally displaced persons.",
        icon: Gift,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746204/bwo7cds9xtqgzx622nq1_wxkape.webp',
        href: "/our-work#charity",
    },
    {
        title: "Inclusive Education",
        description: "Creating educational opportunities for all, including persons with disabilities.",
        icon: BookOpen,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777366388/toscana-gallery/ydg2tvb6red9b0eoo31t.jpg',
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
