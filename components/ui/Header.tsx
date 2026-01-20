"use client"
import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import { useState } from "react";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/our-work", label: "Our Work" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Our Team" },
    { href: "/funding-partners", label: "Funding & Partners" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    //const [location] = useLocation();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky  bg-green-900 h-26 top-0 z-50" data-testid="header-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
                        {/* <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-semibold text-lg hidden sm:block">
              Toscana Foundation
            </span> */}
                        <img src="/logo.png" alt="Logo" className="w-28 md:w-42 mt-10 bg-white rounded-xl object-contain h-auto" />
                    </Link>

                    <nav className="hidden lg:flex items-center mt-10 gap-1" data-testid="nav-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === link.href
                                    ? "text-white bg-white/20"
                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                    }`}
                                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center mt-10 gap-3">
                        <Link href="/funding-partners#donate">
                            <button
                                // variant="outline"
                                className="hidden sm:flex border-white/30 text-green-800 bg-white  items-center  px-4 p-2 rounded-lg hover:bg-white hover:text-primary"
                                data-testid="button-donate-header"
                            >
                                <Heart className="w-4 h-4 mr-2" />
                                Donate
                            </button>
                        </Link>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-white hover:bg-white/10"
                                    data-testid="button-mobile-menu"
                                >
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72 bg-green-800 border-l-0">
                                <div className="flex flex-col gap-4 px-4 mt-8">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`px-4 py-3 text-base font-medium rounded-md transition-colors ${pathname === link.href
                                                ? "text-white bg-white/20"
                                                : "text-white/80 hover:text-white hover:bg-white/10"
                                                }`}
                                            data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <Link href="/funding-partners#donate" onClick={() => setIsOpen(false)}>
                                        <Button
                                            className="w-full mt-4 bg-white text-primary hover:bg-white/90"
                                            data-testid="button-donate-mobile"
                                        >
                                            <Heart className="w-4 h-4 mr-2" />
                                            Donate Now
                                        </Button>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}