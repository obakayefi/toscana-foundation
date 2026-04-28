"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-green-950" data-testid="section-hero">
            {/* Background Layer with Zoom Animation */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/projects/IMG_3841.JPG"
                    alt="Villa Toscana Foundation Hero"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={90}
                />
                {/* Combined Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-green-950/95 via-green-950/70 to-green-950/30" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight"
                            data-testid="text-hero-headline">
                            Restoring <span className="text-green-400">Dignity</span>.
                            <br />
                            Empowering <span className="text-green-400">Communities</span>.
                            <br />
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-white/80"
                            >
                                Transforming Nigeria.
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="mt-8 text-xl sm:text-2xl text-zinc-200 font-light max-w-2xl leading-relaxed"
                        data-testid="text-hero-subheadline"
                    >
                        Villa Toscana Community Development Foundation is committed to reshaping lives
                        through empowerment, health education, and humanitarian support.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="mt-12 flex flex-wrap gap-5"
                    >
                        <Link href="/funding-partners#donate">
                            <Button
                                size="lg"
                                className="h-16 px-10 bg-white text-green-900 hover:bg-green-50 font-bold text-lg rounded-2xl shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                                data-testid="button-hero-donate"
                            >
                                <Heart className="w-5 h-5 mr-2 fill-current" />
                                Donate Now
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-10 border-white/20 text-white bg-white/5 backdrop-blur-xl hover:bg-white/10 font-bold text-lg rounded-2xl transition-all hover:scale-105 active:scale-95"
                                data-testid="button-hero-learn"
                            >
                                Our Story
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Element */}
            <motion.div 
                animate={{ 
                    y: [0, -10, 0],
                }}
                transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-10 right-10 hidden lg:block"
            >
                <div className="w-64 h-64 rounded-full bg-green-500/10 blur-3xl" />
            </motion.div>
        </section>
    );
}
