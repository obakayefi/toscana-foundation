"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import { Sprout, Banknote, GraduationCap, Scale, HeartPulse, Gift, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { SmoothImage } from "@/components/ui/smooth-image";

const programs = [
    {
        id: "agriculture",
        title: "Agriculture & Livelihood",
        description: "We support sustainable farming practices and livelihood development for rural communities across Nigeria. Our programs include agricultural training, provision of farming inputs, and connecting farmers to markets.",
        icon: Sprout,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777366281/toscana-gallery/if5wluaoypqvfilqpwz4.webp',
    },
    {
        id: "microfinance",
        title: "Micro-Financing",
        description: "We provide financial support and training for small-scale entrepreneurs and women-led businesses. Through microloans and financial literacy programs, we empower individuals to build sustainable livelihoods.",
        icon: Banknote,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746225/xmxexeffrusenrkjqodd_nfxk33.webp',
    },
    {
        id: "capacity",
        title: "Capacity Building",
        description: "We develop skills and empower individuals for sustainable community transformation. Our capacity building programs include vocational training, leadership development, and organizational strengthening.",
        icon: GraduationCap,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746231/digxbh1uiixoee4gdier_hythkp.webp',
    },
    {
        id: "governance",
        title: "Good Governance & Human Rights",
        description: "We promote accountability, civic engagement, and human rights awareness across communities. Our advocacy programs strengthen democratic participation and protect fundamental rights.",
        icon: Scale,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746227/ishxl7s0rfmrjwle7fum_tjweub.webp',
    },
    {
        id: "health",
        title: "Health & Environment",
        description: "We advance health education and environmental sustainability for community wellbeing. Our programs address preventive healthcare, sanitation, and environmental conservation.",
        icon: HeartPulse,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777366390/toscana-gallery/nfaew53yuw3umyv2wysj.jpg',
    },
    {
        id: "charity",
        title: "Charity",
        description: "We provide humanitarian support to the less privileged and internally displaced persons. Our charity programs include food distribution, emergency relief, and support for vulnerable populations.",
        icon: Gift,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777746204/bwo7cds9xtqgzx622nq1_wxkape.webp',
    },
    {
        id: "education",
        title: "Inclusive Education",
        description: "We create educational opportunities for all, including persons with disabilities. Our education programs promote access to quality learning and support for marginalized students.",
        icon: BookOpen,
        image: 'https://res.cloudinary.com/dmwfdyxkt/image/upload/v1777366388/toscana-gallery/ydg2tvb6red9b0eoo31t.jpg',
    },
];

export default function OurWork() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <Header />
            <main>
                <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0 bg-green-950">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800/80 to-transparent z-10" />
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-10" />
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20 sm:py-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-[3.25rem] leading-[1.1] sm:text-7xl md:text-8xl font-heading font-extrabold text-white" data-testid="text-work-page-title">
                                Our <span className="text-green-400 underline decoration-green-500/30">Impact</span>
                            </h1>
                            <p className="mt-8 text-xl md:text-2xl text-green-50/90 font-light leading-relaxed max-w-2xl">
                                Discover our core pillars of transformation—designed to empower, educate, and uplift communities across Nigeria.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24 md:py-32 relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl -z-10 opacity-30" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-zinc-200 rounded-full blur-3xl -z-10 opacity-30" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-24 md:gap-48">
                            {programs.map((program, index) => (
                                <motion.div
                                    key={program.id}
                                    id={program.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                        }`}
                                    data-testid={`section-program-${program.id}`}
                                >
                                    <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                        <div className="relative group">
                                            <div className="absolute -inset-4 bg-green-100 rounded-[2.5rem] scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 -z-10" />
                                            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-2xl shadow-zinc-200/50 group-hover:shadow-green-900/10 transition-all duration-500">
                                                <SmoothImage
                                                    src={program.image}
                                                    alt={program.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                        <div className="relative">
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className="w-16 h-16 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-xl shadow-green-600/20">
                                                    <program.icon size={32} />
                                                </div>
                                                <div className="h-[2px] flex-grow bg-zinc-100 rounded-full" />
                                            </div>

                                            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-zinc-900 mb-6 leading-tight">
                                                {program.title}
                                            </h2>

                                            <p className="text-xl text-zinc-500 font-light leading-relaxed mb-8">
                                                {program.description}
                                            </p>

                                            <div className="flex flex-wrap gap-3">
                                                <span className="px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-500 text-xs font-bold uppercase tracking-widest">Empowerment</span>
                                                <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest">Strategic Impact</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Be Part of the Transformation"
                    description="Your support allows us to scale these programs and reach thousands more who are waiting for an opportunity to thrive."
                    primaryAction={{ label: "Partner With Us", href: "/contact" }}
                    secondaryAction={{ label: "Make a Donation", href: "/funding-partners#donate" }}
                />
            </main>
            <Footer />
        </div>
    );
}
