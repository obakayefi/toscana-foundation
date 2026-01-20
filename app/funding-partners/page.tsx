"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { Heart, Users, Building2, Handshake, CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality
const fundingSources = [
    { icon: Users, title: "Individual Donors", description: "Generous individuals who believe in our mission" },
    { icon: Building2, title: "Organisations", description: "Corporate partners supporting community development" },
    { icon: Handshake, title: "Companies", description: "Businesses contributing to social impact" },
    { icon: Heart, title: "Friends & Well-wishers", description: "Our extended community of supporters" },
];

const bankDetails = {
    bank: "Fidelity Bank Nigeria PLC",
    branch: "Agbani Road Enugu Nigeria",
    accountNumber: "4011515251",
    accountName: "Villa Toscana Community Development Foundation",
};

export default function Funding() {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const copyAccountNumber = () => {
        navigator.clipboard.writeText(bankDetails.accountNumber);
        setCopied(true);
        toast({
            title: "Copied!",
            description: "Account number copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-funding-page-title">
                                Funding & Partners
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Learn about our funding sources and how you can support our work.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" data-testid="section-funding-sources">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground">Our Funding Sources</h2>
                            <p className="mt-4 text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                                We are grateful for the support from various stakeholders who make our work possible
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {fundingSources.map((source) => (
                                <Card key={source.title} className="hover-elevate text-center" data-testid={`card-funding-${source.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                    <CardContent className="p-6">
                                        <div className="w-14 h-14 mx-auto rounded-full bg-[#005F46]/10 flex items-center justify-center mb-4">
                                            <source.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground">{source.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground font-body">{source.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="donate" className="py-16 md:py-24 bg-muted" data-testid="section-bank-details">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground">Make a Donation</h2>
                            <p className="mt-4 text-lg text-muted-foreground font-body">
                                Your donation helps us reach more communities and create lasting change
                            </p>
                        </div>

                        <Card data-testid="card-bank-details">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 mx-auto rounded-full bg-[#005F46]/10 flex items-center justify-center mb-4">
                                    <CreditCard className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle>Bank Transfer Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground font-body">Bank Name</p>
                                        <p className="font-semibold text-foreground">{bankDetails.bank}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-body">Branch</p>
                                        <p className="font-semibold text-foreground">{bankDetails.branch}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="text-sm text-muted-foreground font-body mb-1">Account Number</p>
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-2xl font-bold text-primary" data-testid="text-account-number">
                                            {bankDetails.accountNumber}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={copyAccountNumber}
                                            data-testid="button-copy-account"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground font-body">Account Name</p>
                                    <p className="font-semibold text-foreground">{bankDetails.accountName}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center mt-8">
                            <Link href="/contact">
                                <Button variant="outline" data-testid="button-contact-donate">
                                    Contact Us for Other Donation Methods
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Become a Partner"
                    description="We welcome partnerships with organizations that share our vision for community development."
                    primaryAction={{ label: "Partner With Us", href: "/contact" }}
                    secondaryAction={{ label: "Learn About Our Work", href: "/our-work" }}
                />
            </main>
            <Footer />
        </div>
    );
}
