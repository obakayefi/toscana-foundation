'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Upload, Loader2, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { updateGalleryEvent, deleteGalleryEvent, addImagesToEvent, deleteImage } from '../actions';

type EventWithImages = {
    id: string;
    title: string;
    year: string;
    description: string | null;
    images: { id: string, url: string }[];
};

export default function EditEventClient({ event }: { event: EventWithImages }) {
    const router = useRouter();
    const [title, setTitle] = useState(event.title);
    const [year, setYear] = useState(event.year);
    const [description, setDescription] = useState(event.description || '');
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    const [uploadingImages, setUploadingImages] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<{file: File, url: string}[]>([]);

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

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateGalleryEvent(event.id, { title, year, description });
            toast.success("Event updated successfully");
            router.refresh();
        } catch (e: any) {
            toast.error(e.message || "Failed to update event");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this event? This will also delete all associated images.")) return;
        setDeleting(true);
        try {
            await deleteGalleryEvent(event.id);
            toast.success("Event deleted successfully");
            router.push('/admin/dashboard/gallery');
        } catch (e: any) {
            toast.error(e.message || "Failed to delete event");
            setDeleting(false);
        }
    };

    const handleUploadImages = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (imagePreviews.length === 0) {
            toast.error("Please select at least 1 image to upload.");
            return;
        }
        if (imagePreviews.length > 10) {
            toast.error("Maximum 10 images allowed.");
            return;
        }

        setUploadingImages(true);
        const formData = new FormData();
        imagePreviews.forEach(({ file }) => {
            formData.append("images", file);
        });

        try {
            await addImagesToEvent(event.id, formData);
            toast.success("Images uploaded successfully");
            imagePreviews.forEach(p => URL.revokeObjectURL(p.url));
            setImagePreviews([]);
            (e.target as HTMLFormElement).reset();
            router.refresh();
        } catch (e: any) {
            toast.error(e.message || "Failed to upload images");
        } finally {
            setUploadingImages(false);
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        if (!confirm("Delete this image?")) return;
        try {
            await deleteImage(imageId, event.id);
            toast.success("Image deleted");
            router.refresh();
        } catch (e: any) {
            toast.error(e.message || "Failed to delete image");
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/gallery" className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Edit Event: {event.title}</h1>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Event Details Form */}
                <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <h2 className="text-lg font-semibold border-b pb-4">Event Details</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                            <input 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Year</label>
                            <input 
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                            <textarea 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Save Changes
                        </button>
                        
                        <button 
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl font-medium transition-colors ml-auto"
                        >
                            {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            Delete Event
                        </button>
                    </div>
                </div>

                {/* Image Upload Form */}
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-fit">
                    <h2 className="text-lg font-semibold border-b pb-4 mb-4">Add More Photos</h2>
                    
                    <form onSubmit={handleUploadImages} className="space-y-4">
                        <div className="border-2 border-dashed border-zinc-200 rounded-xl p-6 text-center hover:border-green-500/50 transition-colors relative group">
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <p className="text-sm font-medium text-zinc-600">Select up to 10 images</p>
                            <p className="text-xs text-zinc-400 mt-1">Min 1, Max 10 per upload</p>
                        </div>
                        
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                                {imagePreviews.map((preview, i) => (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-200 group">
                                        <Image 
                                            src={preview.url} 
                                            alt="Preview" 
                                            fill 
                                            className="object-cover" 
                                            unoptimized // Blob URLs shouldn't be optimized
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => removePreview(i)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-sm z-20"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <button 
                            type="submit"
                            disabled={imagePreviews.length === 0 || imagePreviews.length > 10 || uploadingImages}
                            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:bg-zinc-300"
                        >
                            {uploadingImages ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                            Upload Photos
                        </button>
                    </form>
                </div>
            </div>

            {/* Image Gallery Management */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <h2 className="text-lg font-semibold border-b pb-4 mb-6">Manage Photos ({event.images.length})</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {event.images.map(img => (
                        <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <Image 
                                src={img.url} 
                                alt="Gallery image" 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                    onClick={() => handleDeleteImage(img.id)}
                                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors transform hover:scale-110"
                                    title="Delete image"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {event.images.length === 0 && (
                        <div className="col-span-full py-12 text-center text-zinc-500 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                            No photos in this gallery yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
