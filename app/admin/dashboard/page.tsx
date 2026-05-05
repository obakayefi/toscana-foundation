import { readData } from "@/lib/json-db";
import Link from "next/link";
import { Image as ImageIcon, GraduationCap, ArrowRight, Download, Database } from "lucide-react";

export default async function AdminDashboardOverview() {
    const data = await readData();
    const galleryCount = data.galleryEvents.length;
    const scholarshipCount = data.beneficiaries.length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900">Overview</h1>
                <p className="text-zinc-500 mt-2">Manage the foundation's content and resources.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                            <ImageIcon size={24} />
                        </div>
                        <span className="text-2xl font-bold text-zinc-900">{galleryCount}</span>
                    </div>
                    <h3 className="font-semibold text-zinc-900 mb-1">Gallery Events</h3>
                    <p className="text-sm text-zinc-500 mb-4">Manage photo galleries and events.</p>
                    <Link href="/admin/dashboard/gallery" className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1 group">
                        Manage Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                            <GraduationCap size={24} />
                        </div>
                        <span className="text-2xl font-bold text-zinc-900">{scholarshipCount}</span>
                    </div>
                    <h3 className="font-semibold text-zinc-900 mb-1">Scholarships</h3>
                    <p className="text-sm text-zinc-500 mb-4">Manage scholarship listings and display order.</p>
                    <Link href="/admin/dashboard/scholarships" className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 group">
                        Manage Scholarships <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Maintenance & Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between group hover:bg-white hover:border-green-500/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-zinc-600 shadow-sm">
                                <Download size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900">Database Backup</h3>
                                <p className="text-sm text-zinc-500">Export all data to a JSON file.</p>
                            </div>
                        </div>
                        <Link href="/admin/export" className="p-3 bg-white rounded-xl shadow-sm border border-zinc-100 text-zinc-400 group-hover:text-green-600 transition-colors">
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between group hover:bg-white hover:border-green-500/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-zinc-600 shadow-sm">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900">Import Data</h3>
                                <p className="text-sm text-zinc-500">Seed database from a JSON file.</p>
                            </div>
                        </div>
                        <Link href="/admin/seed" className="p-3 bg-white rounded-xl shadow-sm border border-zinc-100 text-zinc-400 group-hover:text-green-600 transition-colors">
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
