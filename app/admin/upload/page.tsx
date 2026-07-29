'use client';

import { useState, useRef } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import PageJumbo from "@/components/ui/PageJumbo";
import { uploadGalleryEvent } from "@/lib/gallery";
import { Upload, X, Image as ImageIcon, Lock, Calendar, Tag, Type, Loader2, CheckCircle2 } from "lucide-react";

export default function AdminUploadPage() {
    const [uploading, setUploading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newPreviews: string[] = [];
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    if (newPreviews.length === files.length) {
                        setPreviews(newPreviews);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setUploading(true);
        setStatus(null);

        const formData = new FormData(event.currentTarget);

        try {
            await uploadGalleryEvent(formData);
            setStatus({ type: 'success', message: "Gallery event published successfully!" });
            formRef.current?.reset();
            setPreviews([]);
        } catch (error) {
            console.error("Upload failed", error);
            setStatus({ type: 'error', message: error instanceof Error ? error.message : "Upload failed" });
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Header />
            <PageJumbo
                title="Content Management"
                description="Expand the foundation's visual legacy by adding new event galleries."
            />

            <main className="max-w-5xl mx-auto py-16 px-4">
                <div className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
                    <div className="grid md:grid-cols-5 h-full">
                        {/* Sidebar/Info */}
                        <div className="md:col-span-2 bg-green-900 p-8 md:p-12 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Gallery Upload</h2>
                                <p className="text-green-100/80 leading-relaxed mb-8">
                                    Use this portal to upload high-quality images from our foundation's events. 
                                    All content published here will be immediately visible to the public in the Gallery section.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <ImageIcon className="w-5 h-5 text-green-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Multiple Uploads</h4>
                                            <p className="text-sm text-green-100/60">Upload up to 50 photos per event.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/10 p-2 rounded-lg">
                                            <Tag className="w-5 h-5 text-green-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Smart Slugs</h4>
                                            <p className="text-sm text-green-100/60">Unique identifiers for SEO-friendly URLs.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <p className="text-xs text-green-100/40 uppercase tracking-widest font-bold">Internal Administrator Tool</p>
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="md:col-span-3 p-8 md:p-12">
                            {status && (
                                <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 ${
                                    status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                    <p className="font-medium">{status.message}</p>
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                                {/* Security Section */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-zinc-500 uppercase tracking-wider">Access Control</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input 
                                            name="adminSecret" 
                                            type="password" 
                                            required 
                                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all" 
                                            placeholder="Enter Admin Lock Key" 
                                        />
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="space-y-6">
                                    <label className="block text-sm font-bold text-zinc-500 uppercase tracking-wider">Event Details</label>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                                            <Type className="w-5 h-5" />
                                        </div>
                                        <input 
                                            name="title" 
                                            type="text" 
                                            required 
                                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all" 
                                            placeholder="Event Title (e.g. Annual Gala)" 
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <input 
                                                name="year" 
                                                type="text" 
                                                required 
                                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all" 
                                                placeholder="Year (2025)" 
                                            />
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                                                <Tag className="w-5 h-5" />
                                            </div>
                                            <input 
                                                name="id" 
                                                type="text" 
                                                required 
                                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all" 
                                                placeholder="Category-ID" 
                                            />
                                        </div>
                                    </div>

                                    <textarea 
                                        name="description" 
                                        rows={4} 
                                        className="w-full p-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all" 
                                        placeholder="Describe the event impact and activities..."
                                    ></textarea>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-zinc-500 uppercase tracking-wider">Gallery Images</label>
                                    <div className="relative border-2 border-dashed border-zinc-200 rounded-3xl p-8 transition-colors hover:border-green-500/50 group">
                                        <input 
                                            name="images" 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            required 
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                        />
                                        <div className="text-center">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="w-8 h-8" />
                                            </div>
                                            <p className="text-zinc-600 font-medium">Click to upload or drag and drop</p>
                                            <p className="text-zinc-400 text-sm mt-1">PNG, JPG, WEBP up to 10MB each</p>
                                        </div>
                                    </div>

                                    {previews.length > 0 && (
                                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                                            {previews.map((src, i) => (
                                                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                                                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            <div className="aspect-square rounded-xl border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400">
                                                <span className="text-xs font-bold">+{previews.length}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full relative group overflow-hidden bg-green-600 text-white font-bold py-5 rounded-2xl transition-all hover:bg-green-700 active:scale-[0.98] disabled:bg-zinc-300 disabled:active:scale-100"
                                >
                                    <div className="relative flex items-center justify-center gap-2">
                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Publishing to Gallery...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-5 h-5" />
                                                <span>Publish Gallery Event</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}