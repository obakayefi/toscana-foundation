import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import CoreValueCard from "@/components/ui/core-value-card";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Target, RefreshCw, Users, Scale } from "lucide-react";
import agricultureImage from "@assets/generated_images/nigerian_community_farming_scene.png";

// todo: remove mock functionality
const coreValues = [
    {
        title: "Accountability",
        description: "We maintain transparency in all our operations and are accountable to our stakeholders.",
        icon: Shield,
    },
    {
        title: "Integrity",
        description: "We uphold the highest ethical standards in every aspect of our work.",
        icon: Heart,
    },
    {
        title: "Commitment",
        description: "We are dedicated to the causes we champion and the communities we serve.",
        icon: Target,
    },
    {
        title: "Consistency",
        description: "We deliver reliable and sustainable programs that create lasting impact.",
        icon: RefreshCw,
    },
    {
        title: "Service",
        description: "We put the needs of communities first and serve with humility and compassion.",
        icon: Users,
    },
    {
        title: "Justice",
        description: "We advocate for fairness and equality in all our initiatives.",
        icon: Scale,
    },
];

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-about-page-title">
                                About Us
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Learn about our journey, mission, and the values that drive our commitment to community development.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" data-testid="section-history">
                    <div className="max-w-4xl px-4 sm:px-6 lg:ml-74 w-full">
                        {/*<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">*/}
                        <h2 className="text-3xl font-bold text-foreground mb-8">Background & History</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-muted-foreground font-body leading-relaxed">
                                Villa Toscana Community Development Foundation (VTCDF) is a non-governmental,
                                non-profit organization dedicated to advancing human development across Nigeria.
                                Established by Chief Francis Obasi in 2015 and incorporated in 2023, the foundation
                                works to reduce vulnerability, promote health education, strengthen democratic
                                participation, enhance food security, and support the dignity of marginalized citizens.
                            </p>
                            <p className="text-muted-foreground font-body leading-relaxed mt-4">
                                With a national presence, the foundation drives structured community development
                                initiatives that create meaningful and sustainable change. Our approach combines
                                grassroots engagement with institutional capacity building to ensure that our
                                programs deliver lasting impact.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-[#EBF1EE]" data-testid="section-vision-mission">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardContent className="p-8">
                                    <div className="w-12 h-12 rounded-full bg-[#005F46]/10 flex items-center justify-center mb-4">
                                        <Target className="w-6 h-6 text-green-800" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="text-vision-title">Our Vision</h3>
                                    <p className="text-muted-foreground font-body text-lg leading-relaxed">
                                        To create a just society where the dignity of every human person is respected,
                                        restored, and promoted.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-8">
                                    <div className="w-12 h-12 rounded-full bg-[#005F46]/10 flex items-center justify-center mb-4">
                                        <Heart className="w-6 h-6 text-green-800" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="text-mission-title">Our Mission</h3>
                                    <p className="text-muted-foreground font-body text-lg leading-relaxed">
                                        To promote sustainable and integral human development through empowerment,
                                        education, and structured community transformation free from discrimination.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" data-testid="section-values">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Core Values</h2>
                            <p className="mt-4 text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                                These principles guide everything we do and how we serve our communities
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreValues.map((value) => (
                                <CoreValueCard key={value.title} {...value} />
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Partner With Us"
                    description="Join us in our mission to restore dignity and empower communities across Nigeria."
                    primaryAction={{ label: "Get Involved", href: "/contact" }}
                    secondaryAction={{ label: "Make a Donation", href: "/donate" }}
                />
            </main>
            <Footer />
        </div>
    );
}
