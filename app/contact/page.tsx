"use client"
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import ContactForm from "@/components/ui/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

// todo: remove mock functionality
const contactInfo = {
    address: "No1 Agwuleri Street, Independence Layout Enugu North L.G.A, Enugu State, Nigeria",
    email: "villatoscanafoundation@yahoo.com",
    phones: ["08037655182", "07039189063"],
    hours: "Monday - Friday: 9:00 AM - 5:00 PM",
};

import { motion } from "framer-motion";

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function Contact() {
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
                            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight" data-testid="text-contact-page-title">
                                Get in <span className="text-green-400">Touch</span>
                            </h1>
                            <p className="mt-8 text-xl md:text-2xl text-green-50/90 font-light leading-relaxed">
                                Whether you're a partner, donor, or community member, we're here to listen and collaborate.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24 md:py-32 relative overflow-hidden" data-testid="section-contact">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl -z-10 opacity-30" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-zinc-200 rounded-full blur-3xl -z-10 opacity-30" />

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-zinc-900 mb-6 tracking-tight">Connect with Us</h2>
                            <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto">
                                Our doors and lines are always open. Reach out to our dedicated team for any inquiries or strategic partnerships.
                            </p>
                        </div>

                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {[
                                { icon: MapPin, title: "Our Headquarters", content: contactInfo.address, testId: "card-contact-address" },
                                { icon: Mail, title: "Digital Mailbox", content: contactInfo.email, isLink: true, href: `mailto:${contactInfo.email}`, testId: "card-contact-email" },
                                { icon: Phone, title: "Direct Lines", content: contactInfo.phones.join(" / "), testId: "card-contact-phone" },
                                { 
                                    icon: Clock, 
                                    title: "Operational Hours", 
                                    content: (
                                        <div className="flex flex-col gap-1">
                                            <span>Monday - Friday</span>
                                            <span className="text-green-600 text-sm">9:00 AM - 5:00 PM</span>
                                        </div>
                                    ), 
                                    testId: "card-contact-hours" 
                                },
                            ].map((item, idx) => (
                                <motion.div key={idx} variants={itemVariants}>
                                    <Card className="h-full border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-[2.5rem] hover:shadow-2xl transition-all group overflow-hidden" data-testid={item.testId}>
                                        <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-green-600">
                                                <item.icon className="w-8 h-8 text-green-700 transition-colors group-hover:text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{item.title}</h3>
                                                {item.isLink ? (
                                                    <a href={item.href} className="text-xl font-heading font-bold text-zinc-900 hover:text-green-700 transition-colors break-all">{item.content}</a>
                                                ) : (
                                                    <div className="text-xl font-heading font-bold text-zinc-900 leading-tight">{item.content}</div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
