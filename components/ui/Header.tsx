"use client"
// Updated to fix Button props warnings
import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SheetTrigger, Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useEffect, useState } from "react";


export const ChevronDown = ({ fill, size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const Lock = ({ fill, size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    const color = fill;

    return (
        <svg
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g transform="translate(3.5 2)">
                <path
                    d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth={1.5}
                    transform="translate(3.85 0.75)"
                />
                <path
                    d="M.5,0V2.221"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth={1.5}
                    transform="translate(7.91 12.156)"
                />
                <path
                    d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth={1.5}
                    transform="translate(0.75 6.824)"
                />
            </g>
        </svg>
    );
};

export const Activity = ({ fill, size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    return (
        <svg
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            >
                <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
                <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
                <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
            </g>
        </svg>
    );
};

export const Flash = ({ fill = "currentColor", size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const Server = ({ fill = "currentColor", size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const TagUser = ({ fill = "currentColor", size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const Scale = ({ fill = "currentColor", size, height, width, ...props }: { fill: string, size: number, height: number, width: number }) => {
    return (
        <svg
            fill="none"
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M18 10V6h-4M6 14v4h4"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

const navLinks = [
    { href: "/", label: "Home" },
    // { href: "/about", label: "About Us" },
    // { href: "/our-work", label: "Our Work" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/gallery", label: "Gallery" },
    // { href: "/team", label: "Our Team" },
    { href: "/funding-partners", label: "Funding & Partners" },
    // { href: "/contact", label: "Contact" },
];

const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/our-work", label: "Our Work" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/certifications", label: "Certifications" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Our Team" },
    { href: "/funding-partners", label: "Funding & Partners" },
    { href: "/contact", label: "Contact" },
]

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Secret Shortcut: Ctrl + Shift + Alt + A
            if (e.ctrlKey && e.shiftKey && e.altKey && e.key.toLowerCase() === 'a') {
                router.push('/admin/upload');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    const handleLogoClick = (e: React.MouseEvent) => {
        setLogoClicks(prev => prev + 1);
        if (logoClicks + 1 >= 5) {
            e.preventDefault();
            router.push('/admin');
            setLogoClicks(0);
        }
        // Reset click counter after 2 seconds
        setTimeout(() => setLogoClicks(0), 2000);
    };

    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        lock: <Lock className="text-success" fill="currentColor" size={30} />,
        activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        server: <Server className="text-success" fill="currentColor" size={30} />,
        user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };

    const navLinkClass = (link: { href: string }) => `px-4 py-2 text-sm font-heading font-semibold tracking-wide rounded-xl transition-all duration-300 ${pathname === link.href
        ? "text-white bg-white/20 shadow-inner"
        : "text-white/70 hover:text-white hover:bg-white/10"
        }`

    return (
        <Navbar
            className="fixed top-0 w-full z-50 bg-green-950/80 backdrop-blur-xl border-b border-white/5 h-24"
            data-testid="header-main"
            maxWidth="xl"
        >
            <div className="w-full flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center group"
                    data-testid="link-logo"
                    onClick={handleLogoClick}
                >
                    <div className="bg-white p-2 rounded-2xl shadow-2xl transition-transform group-hover:scale-105">
                        <img src="/logo.png" alt="Logo" className="w-32 md:w-40 object-contain h-auto" />
                    </div>
                </Link>

                <NavbarContent className="hidden lg:flex gap-2" justify="center">
                    {navLinks.map((link) => (
                        <NavbarItem key={link.href}>
                            <Link
                                key={link.href}
                                href={link.href}
                                className={navLinkClass(link)}
                                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                {link.label}
                            </Link>
                        </NavbarItem>
                    ))}
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    className="px-4 py-2 bg-transparent flex items-center gap-1 text-white/70 hover:text-white hover:bg-white/10 text-sm font-heading font-semibold rounded-xl transition-all"
                                    variant="ghost"
                                >
                                    About {icons.chevron}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            className="backdrop-blur-3xl p-2 bg-zinc-950/90 border border-white/10 shadow-2xl rounded-2xl mt-4 min-w-[200px]"
                            aria-label="About features"
                        >
                            <DropdownItem key="work" textValue="Our Work">
                                <Link href="/our-work" className="block w-full text-white/80 hover:text-white font-heading font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">Our Work</Link>
                            </DropdownItem>
                            <DropdownItem key="team" textValue="Team">
                                <Link href='/team' className="block w-full text-white/80 hover:text-white font-heading font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">Team</Link>
                            </DropdownItem>
                            <DropdownItem key="cert" textValue="Certifications">
                                <Link href="/certifications" className="block w-full text-white/80 hover:text-white font-heading font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">Certifications</Link>
                            </DropdownItem>
                            <DropdownItem key="contact" textValue="Contact Us">
                                <Link href="/contact" className="block w-full text-white/80 hover:text-white font-heading font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">Contact Us</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>

                <div className="flex items-center gap-4">
                    <Link href="/funding-partners#donate">
                        <button
                            className="hidden sm:flex bg-white text-green-900 px-6 py-2.5 rounded-2xl font-heading font-bold text-sm shadow-xl shadow-white/5 hover:bg-green-50 transition-all hover:scale-105 active:scale-95 items-center gap-2"
                            data-testid="button-donate-header"
                        >
                            <Heart className="w-4 h-4 fill-current" />
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
                                {mobileLinks.map((link) => (
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
        </Navbar>
    );
}