'use client';

import { useState } from 'react';
import { ArrowLeft, Download, Loader2, Database } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ExportPage() {
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            const response = await fetch('/api/admin/export');
            if (!response.ok) throw new Error('Export failed');
            
            const data = await response.json();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `toscana_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            toast.success("Backup created successfully!");
        } catch (e: any) {
            toast.error(e.message || "Failed to export data");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center gap-4 mb-12">
                <Link href="/admin/dashboard" className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-zinc-900">Database Backup</h1>
            </div>

            <div className="bg-white rounded-[2.5rem] p-12 border border-zinc-200 shadow-xl text-center">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto mb-8">
                    <Database size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Export All Data</h2>
                <p className="text-zinc-500 mb-12 max-w-md mx-auto leading-relaxed">
                    Download a full backup of all gallery events, images, and beneficiaries in JSON format. 
                    You can use this file to seed another environment.
                </p>

                <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="inline-flex items-center gap-3 bg-zinc-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50 shadow-xl shadow-zinc-900/10"
                >
                    {exporting ? <Loader2 size={24} className="animate-spin" /> : <Download size={24} />}
                    {exporting ? 'Generating Backup...' : 'Generate & Download Backup'}
                </button>
            </div>
        </div>
    );
}
