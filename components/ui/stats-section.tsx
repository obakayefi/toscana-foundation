import { Users, Heart, MapPin, Calendar } from "lucide-react";

interface Stat {
    icon: typeof Users;
    value: string;
    label: string;
}

// todo: remove mock functionality
const stats: Stat[] = [
    { icon: Users, value: "15,000+", label: "Lives Impacted" },
    { icon: Heart, value: "7", label: "Program Areas" },
    { icon: MapPin, value: "36", label: "States Reached" },
    { icon: Calendar, value: "10+", label: "Years of Service" },
];

export default function StatsSection() {
    return (
        <section className="py-16 md:py-24 bg-[#EBEFED]" data-testid="section-stats">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-stats-title">
                        Our Impact in Numbers
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                        Since 2015, we have been working tirelessly to create lasting change across Nigeria
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-2xl p-6 md:p-8 text-center border border-card-border"
                            data-testid={`card-stat-${index}`}
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#005F46]/10 flex items-center justify-center">
                                <stat.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-primary" data-testid={`text-stat-value-${index}`}>
                                {stat.value}
                            </div>
                            <div className="mt-2 text-sm md:text-base text-muted-foreground font-body">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
