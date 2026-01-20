import Link from 'next/link'
import { Heart, Mail, Phone, MapPin } from "lucide-react";

// todo: remove mock functionality
const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/our-work" },
    { label: "Our Team", href: "/team" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/donate" },
];

const contactInfo = {
    address: "No1 Agwuleri Street, Independence Layout Enugu North L.G.A, Enugu State, Nigeria",
    email: "villatoscanafoundation@yahoo.com",
    phones: ["08037655182", "08052379600", "07039189063"],
};

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white" data-testid="footer-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg">Toscana Foundation</span>
                        </div>
                        <p className="text-white/80 font-body text-sm leading-relaxed max-w-md">
                            Villa Toscana Community Development Foundation is a non-governmental,
                            non-profit organization dedicated to advancing human development across Nigeria
                            through empowerment, education, and structured community transformation.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/80 hover:text-white text-sm font-body transition-colors"
                                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                                <span className="text-white/80 text-sm font-body">{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0 text-white/60" />
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-white/80 hover:text-white text-sm font-body transition-colors"
                                    data-testid="link-footer-email"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                                <div className="text-white/80 text-sm font-body">
                                    {contactInfo.phones.join(" / ")}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                    <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">Bank Details for Donations</h4>
                        <p className="text-white/80 text-sm font-body">
                            <span className="font-medium">Bank:</span> Fidelity Bank Nigeria PLC, Agbani Road Enugu Nigeria
                            <br />
                            <span className="font-medium">Account Number:</span> 4011515251
                            <br />
                            <span className="font-medium">Account Name:</span> Villa Toscana Community Development Foundation
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20 text-center">
                    <p className="text-white/60 text-sm font-body">
                        &copy; {new Date().getFullYear()} Villa Toscana Community Development Foundation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
