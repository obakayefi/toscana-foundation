import Link from 'next/link'
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { BANK_DETAILS } from "@/lib/utils";

// todo: remove mock functionality
const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/our-work" },
    { label: "Our Team", href: "/team" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/funding-partners#donate" },
];

const contactInfo = {
    address: "No1 Agwuleri Street, Independence Layout Enugu North L.G.A, Enugu State, Nigeria",
    email: "villatoscanafoundation@yahoo.com",
    phones: ["08037655182", "07039189063"],
};

export default function Footer() {
    return (
        <footer className="bg-green-950 text-white relative overflow-hidden" data-testid="footer-main">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-8 group" data-testid="link-logo">
                            <div className="bg-white p-3 rounded-2xl shadow-xl transition-transform group-hover:scale-105">
                                <img src="/logo.png" alt="Logo" className="w-32 md:w-40 object-contain h-auto" />
                            </div>
                        </Link>
                        <p className="text-white/60 font-light text-base leading-relaxed max-w-md">
                            Villa Toscana Community Development Foundation is a non-profit organization dedicated to advancing human development across Nigeria through empowerment, education, and structured community transformation.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-heading font-bold text-xl mb-6 tracking-tight">Quick Links</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white text-base transition-colors flex items-center gap-2 group"
                                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 scale-0 group-hover:scale-100 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading font-bold text-xl mb-6 tracking-tight">Contact Us</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 text-white/60">
                                <MapPin className="w-5 h-5 flex-shrink-0 text-green-500 mt-1" />
                                <span className="text-sm leading-relaxed">{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                                <Mail className="w-5 h-5 flex-shrink-0 text-green-500" />
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-sm truncate"
                                    data-testid="link-footer-email"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-4 text-white/60">
                                <Phone className="w-5 h-5 flex-shrink-0 text-green-500 mt-1" />
                                <div className="text-sm">
                                    {contactInfo.phones.join(" / ")}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/10">
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <h4 className="font-heading font-bold text-2xl text-green-950 mb-2">Direct Support</h4>
                                <p className="text-zinc-500 text-base max-w-sm">Every donation directly funds our empowerment and scholarship programs across Nigeria.</p>
                            </div>
                            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex-grow max-w-md">
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Bank Partner</span>
                                        <p className="text-green-900 font-bold">{BANK_DETAILS.bank}</p>
                                    </div>
                                    <div className="flex-col lg:flex-row flex justify-between gap-4">
                                        <div>
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Account Number</span>
                                            <p className="text-green-700 font-extrabold text-xl font-heading">{BANK_DETAILS.accountNumber}</p>
                                        </div>
                                        <div className="">
                                            {/* <div className="text-left md:mt-0 outline-2 outline-red-300 md:text-right"> */}
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest  block mb-1">Account Name</span>
                                            <p className="text-green-900 font-bold text-xs">V.T.C.D.F</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white/30 text-xs tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} Villa Toscana Foundation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
