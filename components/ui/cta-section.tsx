"use client"
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
    title?: string;
    description?: string;
    primaryAction?: { label: string; href: string };
    secondaryAction?: { label: string; href: string };
}

export default function CTASection({
    title = "Join Us in Making a Difference",
    description = "Your support helps us reach more communities, transform more lives, and build a more just society for all Nigerians.",
    primaryAction = { label: "Donate Now", href: "/funding-partners#donate" },
    secondaryAction = { label: "Contact Us", href: "/contact" },
}: CTASectionProps) {
    return (
        <section className="py-24 px-4 bg-zinc-50" data-testid="section-cta">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                <div className="relative overflow-hidden rounded-[3rem] bg-green-900 shadow-2xl shadow-green-900/40">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />

                    <div className="relative z-10 px-6 py-20 md:px-16 md:py-24 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 tracking-widest uppercase"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Take Action Today
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight max-w-4xl" data-testid="text-cta-title">
                            {title}
                        </h2>
                        
                        <p className="mt-8 text-xl md:text-2xl text-green-50/80 font-light max-w-2xl leading-relaxed">
                            {description}
                        </p>

                        <div className="mt-12 flex flex-wrap justify-center gap-6">
                            <Link href={primaryAction.href}>
                                <Button
                                    size="lg"
                                    className="h-16 px-12 bg-white text-green-900 hover:bg-green-50 font-bold text-lg rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                                    data-testid="button-cta-primary"
                                >
                                    <Heart className="w-5 h-5 mr-3 fill-current" />
                                    {primaryAction.label}
                                </Button>
                            </Link>
                            <Link href={secondaryAction.href}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-16 px-12 border-white/30 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 font-bold text-lg rounded-2xl transition-all hover:scale-105 active:scale-95"
                                    data-testid="button-cta-secondary"
                                >
                                    {secondaryAction.label}
                                    <ArrowRight className="w-5 h-5 ml-3" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
