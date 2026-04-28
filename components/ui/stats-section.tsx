"use client"
import { Users, Heart, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Stat {
    icon: typeof Users;
    value: string;
    label: string;
}

const stats: Stat[] = [
    { icon: Users, value: "15,000+", label: "Lives Impacted" },
    { icon: Heart, value: "7", label: "Program Areas" },
    { icon: MapPin, value: "36", label: "States Reached" },
    { icon: Calendar, value: "10+", label: "Years of Service" },
];

export default function StatsSection() {
    return (
        <section className="py-24 relative overflow-hidden" data-testid="section-stats">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-zinc-100 -z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900" data-testid="text-stats-title">
                        Our <span className="text-green-700">Milestones</span>
                    </h2>
                    <p className="mt-4 text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                        A decade of dedication to creating lasting change across Nigeria's diverse communities.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white rounded-3xl p-8 text-center shadow-xl shadow-zinc-200/50 border border-zinc-100 transition-all"
                            data-testid={`card-stat-${index}`}
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-green-50 flex items-center justify-center transition-colors group-hover:bg-green-600">
                                <stat.icon className="w-8 h-8 text-green-700 transition-colors group-hover:text-white" />
                            </div>
                            <div className="text-4xl md:text-5xl font-heading font-bold text-zinc-900 mb-2" data-testid={`text-stat-value-${index}`}>
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-zinc-500 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
