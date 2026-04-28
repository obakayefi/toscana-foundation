'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { uploadGalleryEvent } from "@/lib/gallery";
import { Upload, X, Image as ImageIcon, Tag, Type, Loader2, CheckCircle2, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminUploadGalleryPage() {
    const [uploading, setUploading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<{file: File, url: string}[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        
        if (files.length + imagePreviews.length > 10) {
            toast.error("You can only upload a maximum of 10 images at once.");
            return;
        }

        const newPreviews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setImagePreviews(prev => [...prev, ...newPreviews]);
        e.target.value = ''; // Reset input
    };

    const removePreview = (index: number) => {
        setImagePreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index].url);
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (imagePreviews.length === 0) {
            toast.error("Please select at least 1 image.");
            return;
        }
        if (imagePreviews.length > 10) {
            toast.error("You can only upload up to 10 images.");
            return;
        }
        setUploading(true);

        const formData = new FormData(event.currentTarget);
        formData.delete('images');
        imagePreviews.forEach(({ file }) => {
            formData.append('images', file);
        });

        try {
            await uploadGalleryEvent(formData);
            toast.success("Gallery event published successfully!");
            router.push('/admin/dashboard/gallery');
        } catch (error: any) {
            console.error("Upload failed", error);
            toast.error(error.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="max-w-5xl space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/gallery" className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">New Gallery Event</h1>
                    <p className="text-zinc-500 mt-2">Publish a new event to the public gallery.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
                <form ref={formRef} onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
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
                                    placeholder="Category/Slug (e.g. gala-2025)" 
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
                                type="file" 
                                multiple 
                                accept="image/*" 
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <p className="text-zinc-600 font-medium">Click to upload or drag and drop</p>
                                <p className="text-zinc-400 text-sm mt-1">Select up to 10 images (Min 1)</p>
                            </div>
                        </div>

                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                                {imagePreviews.map((preview, i) => (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 group">
                                        <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => removePreview(i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-sm z-20"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
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
                                    <span>Publishing...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    <span>Publish Gallery Event</span>
                                </>
                            )}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}
