'use client';

import { useState } from 'react';
import { Upload, FileJson, Loader2, Database, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { seedFromJson } from './actions';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SeedPage() {
    const [file, setFile] = useState<File | null>(null);
    const [seeding, setSeeding] = useState(false);
    const [result, setResult] = useState<{ success: boolean, count: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/json') {
            setFile(selectedFile);
            setResult(null);
        } else {
            toast.error("Please select a valid JSON file");
            e.target.value = '';
        }
    };

    const handleSeed = async () => {
        if (!file) return;
        
        setSeeding(true);
        try {
            const text = await file.text();
            const json = JSON.parse(text);
            
            const res = await seedFromJson(json);
            setResult(res);
            toast.success(`Successfully seeded ${res.count} items!`);
        } catch (e: any) {
            toast.error(e.message || "Failed to seed database. Ensure JSON format is correct.");
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center gap-4 mb-12">
                <Link href="/admin/dashboard" className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-zinc-900">Database Seeding</h1>
            </div>

            <div className="flex flex-col items-center text-center mb-12">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                    <Database size={32} />
                </div>
                <p className="text-zinc-500">Upload a JSON backup file to populate the database.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-xl space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Upload size={20} className="text-green-600" />
                        Upload Backup
                    </h2>
                    
                    <div 
                        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer relative group ${
                            file ? 'border-green-500 bg-green-50/30' : 'border-zinc-200 hover:border-green-500/50 hover:bg-zinc-50'
                        }`}
                    >
                        <input 
                            type="file" 
                            accept=".json,application/json"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <FileJson className={`w-12 h-12 mx-auto mb-4 transition-transform group-hover:scale-110 ${
                            file ? 'text-green-600' : 'text-zinc-300'
                        }`} />
                        <p className="text-sm font-bold text-zinc-700">
                            {file ? file.name : 'Click or drag JSON file'}
                        </p>
                        <p className="text-xs text-zinc-400 mt-2">Maximum file size: 10MB</p>
                    </div>

                    <button
                        onClick={handleSeed}
                        disabled={!file || seeding}
                        className="w-full flex items-center justify-center gap-3 bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50 shadow-xl shadow-zinc-900/10"
                    >
                        {seeding ? <Loader2 size={20} className="animate-spin" /> : <Database size={20} />}
                        {seeding ? 'Processing Data...' : 'Start Seeding'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900 text-white p-8 rounded-[2rem] shadow-xl">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <AlertCircle size={18} className="text-green-400" />
                            Important Notes
                        </h3>
                        <ul className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                Existing records with the same slug (for events) or name/type (for beneficiaries) will be skipped.
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                Ensure image URLs are valid Cloudinary CDN links for best performance.
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                Large files may take a few seconds to process.
                            </li>
                        </ul>
                    </div>

                    {result && (
                        <div className="bg-green-50 border border-green-200 p-8 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4 mb-4 text-green-700">
                                <CheckCircle2 size={32} />
                                <h3 className="text-xl font-bold">Seed Complete!</h3>
                            </div>
                            <p className="text-green-700/80 mb-6 font-medium">
                                Successfully added <span className="font-bold text-green-700">{result.count}</span> new items to the database.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/admin/dashboard" className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition-colors">
                                    Dashboard
                                </Link>
                                <Link href="/gallery" className="bg-white text-green-700 border border-green-200 px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-50 transition-colors">
                                    View Gallery
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
