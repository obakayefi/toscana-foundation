"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import CTASection from "@/components/ui/cta-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { Heart, Users, Building2, Handshake, CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { BANK_DETAILS } from "@/lib/utils";

const fundingSources = [
    { icon: Users, title: "Individual Donors", description: "Generous individuals who believe in our mission" },
    { icon: Building2, title: "Organisations", description: "Corporate partners supporting community development" },
    { icon: Handshake, title: "Companies", description: "Businesses contributing to social impact" },
    { icon: Heart, title: "Friends & Well-wishers", description: "Our extended community of supporters" },
];



export default function Funding() {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const copyAccountNumber = () => {
        navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
        setCopied(true);
        toast({
            title: "Copied!",
            description: "Account number copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-50">
            <Header />
            <main>
                <section className="relative min-h-[50vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0 bg-green-950">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800/80 to-transparent z-10" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-10" />
                    </div>
                    
                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight" data-testid="text-funding-page-title">
                                Funding & <span className="text-green-400">Partners</span>
                            </h1>
                            <p className="mt-8 text-xl md:text-2xl text-green-50/90 font-light leading-relaxed">
                                Our mission is powered by the collective generosity of individuals and organizations committed to social transformation.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24" data-testid="section-funding-sources">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900">Our Funding <span className="text-green-700">Ecosystem</span></h2>
                            <p className="mt-4 text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                                We leverage diverse support channels to ensure the sustainability of our community projects.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {fundingSources.map((source, index) => (
                                <motion.div
                                    key={source.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <Card className="h-full border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-[2rem] hover:shadow-2xl hover:shadow-green-900/5 transition-all group overflow-hidden">
                                        <CardContent className="p-8 text-center">
                                            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-50 flex items-center justify-center mb-6 transition-colors group-hover:bg-green-600">
                                                <source.icon className="w-8 h-8 text-green-700 transition-colors group-hover:text-white" />
                                            </div>
                                            <h3 className="text-xl font-heading font-bold text-zinc-900 mb-3">{source.title}</h3>
                                            <p className="text-zinc-500 font-light leading-relaxed">{source.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="donate" className="py-24 bg-white relative overflow-hidden" data-testid="section-bank-details">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
                    
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900">Direct <span className="text-green-700">Impact</span></h2>
                            <p className="mt-4 text-xl text-zinc-500 font-light">
                                Your financial contribution directly empowers lives in rural Nigeria.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-none shadow-2xl shadow-green-900/10 rounded-[3rem] overflow-hidden" data-testid="card-bank-details">
                                <div className="bg-green-900 p-6 sm:p-8 md:p-12 text-center text-white">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                                        <CreditCard className="w-10 h-10 text-green-400" />
                                    </div>
                                    <h3 className="text-3xl font-heading font-bold mb-2">Secure Bank Transfer</h3>
                                    <p className="text-green-50/70 font-light">Transfer directly to our foundation account</p>
                                </div>
                                <CardContent className="p-6 sm:p-8 md:p-12 bg-white space-y-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Financial Institution</span>
                                            <p className="text-xl font-heading font-bold text-zinc-900">{BANK_DETAILS.bank}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Branch Location</span>
                                            <p className="text-xl font-heading font-bold text-zinc-900">{BANK_DETAILS.branch}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 group relative">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Verified Account Number</span>
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <p className="text-3xl min-[400px]:text-4xl md:text-5xl font-heading font-extrabold text-green-700 tracking-tight text-center sm:text-left" data-testid="text-account-number">
                                                {BANK_DETAILS.accountNumber}
                                            </p>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="h-14 w-14 rounded-2xl border-green-700/20 text-green-700 hover:bg-green-700 hover:text-white transition-all shadow-xl shadow-green-700/5 shrink-0"
                                                onClick={copyAccountNumber}
                                                data-testid="button-copy-account"
                                            >
                                                {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Account Beneficiary</span>
                                        <p className="text-xl font-heading font-bold text-zinc-900">{BANK_DETAILS.accountName}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <div className="text-center mt-12">
                            <Link href="/contact">
                                <Button variant="outline" className="h-auto min-h-14 py-4 px-8 border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-2xl font-bold transition-all whitespace-normal text-center" data-testid="button-contact-donate">
                                    Need other payment methods? Contact us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Partner with our Mission"
                    description="We welcome strategic partnerships with organizations that share our commitment to sustainable community development."
                    primaryAction={{ label: "Start a Partnership", href: "/contact" }}
                    secondaryAction={{ label: "View Our Portfolio", href: "/our-work" }}
                />
            </main>
            <Footer />
        </div>
    );
}
