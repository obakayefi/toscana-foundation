"use client"
import TeamCard from "@/components/ui/team-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { boardOfTrustees } from "@/lib/data";
import { motion } from "framer-motion";

export default function TeamSection() {
    return (
        <section className="py-24 bg-white" data-testid="section-team">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900" data-testid="text-team-title">
                        Meet Our <span className="text-green-700">Leadership</span>
                    </h2>
                    <p className="mt-4 text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                        Dedicated individuals committed to transforming lives and communities through selfless service.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {boardOfTrustees.map((member: any, index: number) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <TeamCard {...member} />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/team">
                        <Button 
                            variant="outline" 
                            className="h-14 px-8 border-green-700/20 text-green-700 hover:bg-green-50 rounded-2xl font-bold transition-all"
                            data-testid="button-view-team"
                        >
                            Meet the Whole Team
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
