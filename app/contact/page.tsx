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

export default function Contact() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <section className="relative py-20 md:py-32 bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white" data-testid="text-contact-page-title">
                                Contact Us
                            </h1>
                            <p className="mt-6 text-xl text-white/90 font-body">
                                Get in touch with us. We'd love to hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24" data-testid="section-contact">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
                                <p className="text-muted-foreground font-body mb-8">
                                    Whether you want to partner with us, make a donation, volunteer, or simply learn more
                                    about our work, we're here to help. Fill out the form and we'll get back to you as
                                    soon as possible.
                                </p>

                                <div className="space-y-6">
                                    <Card data-testid="card-contact-address">
                                        <CardContent className="p-4 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">Address</h3>
                                                <p className="text-sm text-zinc-500 font-body mt-1">{contactInfo.address}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card data-testid="card-contact-email">
                                        <CardContent className="p-4 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">Email</h3>
                                                <a
                                                    href={`mailto:${contactInfo.email}`}
                                                    className="text-sm text-zinc-500 hover:underline font-body mt-1 block"
                                                    data-testid="link-contact-email"
                                                >
                                                    {contactInfo.email}
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card data-testid="card-contact-phone">
                                        <CardContent className="p-4 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">Phone</h3>
                                                <p className="text-sm text-zinc-500 font-body mt-1">
                                                    {contactInfo.phones.join(" / ")}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card data-testid="card-contact-hours">
                                        <CardContent className="p-4 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">Office Hours</h3>
                                                <p className="text-sm text-zinc-500 font-body mt-1">{contactInfo.hours}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* <div>
                                <ContactForm />
                            </div> */}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
