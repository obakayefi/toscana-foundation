'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, GraduationCap, LogOut, Menu, X, Globe, ExternalLink } from 'lucide-react';
import { logoutAdmin } from '../actions';
import { toast } from 'sonner';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logoutAdmin();
        toast.success("Logged out successfully");
        router.push('/');
    };

    const navItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { href: '/admin/dashboard/gallery', icon: ImageIcon, label: 'Gallery Events' },
        { href: '/admin/dashboard/scholarships', icon: GraduationCap, label: 'Scholarships' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
                    <span className="text-xl font-bold tracking-wider">Admin Portal</span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                
                <nav data-lenis-prevent className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <Link 
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all border border-white/5 mb-6 group"
                    >
                        <Globe size={20} className="group-hover:text-green-400 transition-colors" />
                        <span className="font-medium flex-1">View Website</span>
                        <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 group-hover:text-green-400 transition-all" />
                    </Link>

                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 mb-2">Management</div>

                    {navItems.map((item) => {
                        const isActive = item.href === '/admin/dashboard' 
                            ? pathname === '/admin/dashboard' 
                            : pathname.startsWith(item.href);
                        return (
                            <Link 
                                key={item.href} 
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                    isActive 
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 shrink-0">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Header for mobile */}
                <header className="h-16 bg-white border-b border-zinc-200 flex items-center px-4 lg:hidden shrink-0">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-bold text-zinc-900">Admin Portal</span>
                </header>

                <div className="flex-1 p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
