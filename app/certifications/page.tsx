"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import { ShieldCheck, FileText, Landmark, Scale, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import ImageModal from "@/components/ui/image-modal";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Certifications() {
    const scumCert = '/certifications/scuml_cert.jpeg'
    const corpCert = '/certifications/corp_cert.jpeg'

    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; url: string; title: string }>({
        isOpen: false,
        url: "",
        title: ""
    });

    const openModal = (url: string, title: string) => {
        setModalConfig({ isOpen: true, url, title });
    };

    return (
        <div className="min-h-screen bg-zinc-50">
            <Header />
            <main className="overflow-hidden">
                <section className="relative min-h-[30vh] flex items-center overflow-hidden">
                    <div className="absolute inset-0 bg-green-950">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800/80 to-transparent z-10" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-10" />
                    </div>
                    
                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight" data-testid="text-cert-page-title">
                                Our <span className="text-green-400">Credentials</span>
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-green-50/90 font-light leading-relaxed">
                                Built on transparency, legal compliance, and accountability.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 md:py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl -z-10 opacity-30" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Certificate Card 1 - SCUML */}
                            <motion.div variants={itemVariants}>
                                <Card 
                                    className="group relative h-full border-none shadow-2xl rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-green-900/20 hover:-translate-y-1"
                                    onClick={() => openModal(scumCert, "SCUML Certificate")}
                                >
                                    <div className="relative min-h-[320px] bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-10 flex flex-col justify-between overflow-hidden">
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 right-0 w-72 h-72 bg-green-700/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
                                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" />
                                        
                                        {/* Decorative lines */}
                                        <div className="absolute top-8 right-8 w-24 h-24 border border-white/[0.06] rounded-2xl rotate-12 group-hover:rotate-6 transition-transform duration-700" />
                                        <div className="absolute top-12 right-12 w-16 h-16 border border-white/[0.04] rounded-xl rotate-12 group-hover:rotate-3 transition-transform duration-700" />
                                        
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors duration-500">
                                                <Landmark size={28} className="text-green-300" />
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400/70">Federal Compliance</span>
                                            </div>
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-3 leading-tight">
                                                SCUML<br />Certificate
                                            </h2>
                                            <p className="text-green-100/50 text-sm font-light leading-relaxed max-w-xs">
                                                Special Control Unit against Money Laundering compliance verification.
                                            </p>
                                            <div className="mt-6 flex items-center gap-2 text-green-300/60 text-xs font-medium group-hover:text-green-300/90 transition-colors">
                                                <span>View Certificate</span>
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Certificate Card 2 - Incorporation */}
                            <motion.div variants={itemVariants}>
                                <Card 
                                    className="group relative h-full border-none shadow-2xl rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-blue-900/20 hover:-translate-y-1"
                                    onClick={() => openModal(corpCert, "Incorporation Certificate")}
                                >
                                    <div className="relative min-h-[320px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-10 flex flex-col justify-between overflow-hidden">
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4" />
                                        <div className="absolute bottom-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl translate-y-1/3 translate-x-1/4" />
                                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" />
                                        
                                        {/* Decorative lines */}
                                        <div className="absolute bottom-8 left-8 w-20 h-20 border border-white/[0.06] rounded-full group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute bottom-12 left-12 w-10 h-10 border border-white/[0.04] rounded-full group-hover:scale-110 transition-transform duration-700" />
                                        
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors duration-500">
                                                <FileText size={28} className="text-blue-300" />
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/70">CAC Registered</span>
                                            </div>
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-3 leading-tight">
                                                Incorporation<br />Certificate
                                            </h2>
                                            <p className="text-blue-100/50 text-sm font-light leading-relaxed max-w-xs">
                                                Corporate Affairs Commission registration and legal incorporation.
                                            </p>
                                            <div className="mt-6 flex items-center gap-2 text-blue-300/60 text-xs font-medium group-hover:text-blue-300/90 transition-colors">
                                                <span>View Certificate</span>
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Trust Card 1 - Legal Legitimacy */}
                            <motion.div variants={itemVariants}>
                                <Card className="h-full bg-white border border-zinc-100/80 shadow-xl shadow-zinc-200/30 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
                                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-60" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                                            <ShieldCheck className="text-green-700" size={26} />
                                        </div>
                                        <h3 className="text-xl font-heading font-extrabold text-zinc-900 mb-2">Legal Legitimacy</h3>
                                        <p className="text-zinc-500 text-sm font-light leading-relaxed">Full legal authorization for all charitable operations across Nigeria.</p>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Trust Card 2 - Financial Oversight */}
                            <motion.div variants={itemVariants}>
                                <Card className="h-full bg-green-900 text-white border-none shadow-xl shadow-green-900/10 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.06]">
                                        <CheckCircle2 size={100} />
                                    </div>
                                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-green-700/30 rounded-full blur-2xl" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors duration-300">
                                            <Scale className="text-green-300" size={26} />
                                        </div>
                                        <h3 className="text-xl font-heading font-extrabold mb-2">Financial Oversight</h3>
                                        <p className="text-green-50/60 text-sm font-light leading-relaxed">Transparent management of operational funds under regulatory supervision.</p>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
                <ImageModal 
                    isOpen={modalConfig.isOpen}
                    onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                    imageUrl={modalConfig.url}
                    title={modalConfig.title}
                />
            </main>
            <Footer />
        </div>
    )
}