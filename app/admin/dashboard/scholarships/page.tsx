'use client';

import { useState, useEffect, useRef } from 'react';
import { getBeneficiaries, createBeneficiary, updateBeneficiary, deleteBeneficiary, updateBeneficiaryOrders, uploadBeneficiaryImage } from './actions';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, Loader2, X, Upload, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

type Beneficiary = {
    id: string;
    type: string;
    name: string;
    yearJoined: string;
    gender: string;
    img: string | null;
    imgPublicId: string | null;
    grant: string | null;
    schoolName: string | null;
    course: string | null;
    level: string | null;
    craft: string | null;
    equipmentGiven: string | null;
    sortOrder: number;
};

export default function ScholarshipsAdminPage() {
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const formSectionRef = useRef<HTMLDivElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Beneficiary>>({ type: 'academic', gender: 'Female' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getBeneficiaries();
            setBeneficiaries(data);
        } catch (e) {
            toast.error("Failed to load beneficiaries");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show local preview immediately
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target?.result as string);
        reader.readAsDataURL(file);

        // Upload to Cloudinary via server action
        setUploadingImage(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const { url, publicId } = await uploadBeneficiaryImage(fd);
            setFormData(prev => ({ ...prev, img: url, imgPublicId: publicId }));
            toast.success('Photo uploaded to Cloudinary');
        } catch (err: any) {
            toast.error(err.message || 'Image upload failed');
            setImagePreview(null);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down', type: string) => {
        const list = beneficiaries.filter(b => b.type === type);
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === list.length - 1) return;

        const newItems = [...list];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

        const updatedList = beneficiaries.map(b => b.type === type ? newItems.find(n => n.id === b.id)! : b);
        setBeneficiaries(updatedList);

        try {
            await updateBeneficiaryOrders(newItems.map(s => s.id));
        } catch (e) {
            toast.error("Failed to save new order");
            loadData();
        }
    };

    const handleSave = async () => {
        if (!formData.name || !formData.yearJoined || !formData.gender || !formData.type) {
            toast.error("Name, Year, Gender, and Type are required fields");
            return;
        }
        if (uploadingImage) {
            toast.error("Please wait for the image upload to complete");
            return;
        }

        setSaving(true);
        try {
            if (isEditing) {
                const res = await updateBeneficiary(isEditing, formData);
                if (res?.success) {
                    toast.success("Beneficiary updated successfully");
                }
            } else {
                const res = await createBeneficiary(formData as any);
                if (res?.success) {
                    toast.success("Beneficiary created successfully");
                }
            }
            resetForm();
            await loadData();
        } catch (e: any) {
            console.error("Save error:", e);
            toast.error(e.message || "Failed to save beneficiary");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this beneficiary? Their Cloudinary photo will also be deleted.")) return;
        try {
            await deleteBeneficiary(id);
            toast.success("Beneficiary deleted");
            loadData();
        } catch (e: any) {
            toast.error(e.message || "Delete failed");
        }
    };

    const startEdit = (b: Beneficiary) => {
        setIsEditing(b.id);
        setIsCreating(false);
        setFormData({ ...b });
        setImagePreview(b.img || null);

        // Smooth scroll to form section
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nameInputRef.current?.focus();
        }, 50);
    };

    const startCreate = () => {
        setIsCreating(true);
        setIsEditing(null);
        setFormData({ type: 'academic', gender: 'Female' });
        setImagePreview(null);

        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nameInputRef.current?.focus();
        }, 50);
    };

    const resetForm = () => {
        setIsEditing(null);
        setIsCreating(false);
        setFormData({ type: 'academic', gender: 'Female' });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (loading && beneficiaries.length === 0) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-zinc-400" /></div>;

    const renderList = (type: string) => {
        const list = beneficiaries.filter(b => b.type === type).sort((a, b) => a.sortOrder - b.sortOrder);
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm mb-8">
                <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between text-sm font-medium text-zinc-900">
                    <span className="capitalize">{type} Beneficiaries</span>
                    <span className="text-xs text-zinc-400 font-normal">{list.length} records</span>
                </div>
                <div className="divide-y divide-zinc-100">
                    {list.map((b, idx) => (
                        <div key={b.id} className={`p-4 flex items-center gap-4 transition-colors ${isEditing === b.id ? 'bg-amber-50/60 border-l-4 border-amber-500' : 'hover:bg-zinc-50/50'}`}>
                            <div className="flex flex-col gap-1">
                                <button onClick={() => handleMove(idx, 'up', type)} disabled={idx === 0} className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded disabled:opacity-30">
                                    <ArrowUp size={16} />
                                </button>
                                <button onClick={() => handleMove(idx, 'down', type)} disabled={idx === list.length - 1} className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded disabled:opacity-30">
                                    <ArrowDown size={16} />
                                </button>
                            </div>

                            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 shrink-0 border-2 border-zinc-200">
                                {b.img ? (
                                    <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400">
                                        <ImageIcon size={18} />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-zinc-900">{b.name}</h3>
                                    {isEditing === b.id && (
                                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Editing</span>
                                    )}
                                </div>
                                <div className="text-sm text-zinc-500 flex gap-4">
                                    <span>Joined {b.yearJoined}</span>
                                    {b.type === 'academic' ? (
                                        <span>{b.schoolName} - {b.course}</span>
                                    ) : (
                                        <span>{b.craft}</span>
                                    )}
                                </div>
                                {b.img && b.img.includes('cloudinary') && (
                                    <span className="text-[10px] text-green-600 font-medium">✓ Cloudinary</span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => startEdit(b)} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(b.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                    {list.length === 0 && <div className="p-8 text-center text-zinc-500">No {type} beneficiaries found.</div>}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Scholarships & Beneficiaries</h1>
                    <p className="text-zinc-500 mt-2">Manage beneficiaries, profile photos, and display ordering.</p>
                </div>
                {!isCreating && !isEditing && (
                    <button
                        onClick={startCreate}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>New Beneficiary</span>
                    </button>
                )}
            </div>

            {(isCreating || isEditing) && (
                <div ref={formSectionRef} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold">{isEditing ? `Edit Beneficiary: ${formData.name || ''}` : 'Add New Beneficiary'}</h2>
                            <p className="text-xs text-zinc-400 mt-0.5">Changes will immediately reflect on the public website.</p>
                        </div>
                        <button onClick={resetForm} className="text-zinc-400 hover:text-zinc-900 p-1.5 rounded-lg hover:bg-zinc-100"><X size={20} /></button>
                    </div>

                    <div className="space-y-4">
                        {/* Photo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">Profile Photo</label>
                            <div className="flex items-center gap-4">
                                {/* Preview */}
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-100 border-2 border-dashed border-zinc-300 flex items-center justify-center shrink-0">
                                    {uploadingImage ? (
                                        <Loader2 size={24} className="animate-spin text-zinc-400" />
                                    ) : imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon size={24} className="text-zinc-300" />
                                    )}
                                </div>
                                {/* File picker */}
                                <div className="flex-1">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="beneficiary-image-upload"
                                    />
                                    <label
                                        htmlFor="beneficiary-image-upload"
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 text-sm font-medium cursor-pointer transition-all
                                            ${uploadingImage
                                                ? 'opacity-50 pointer-events-none bg-zinc-50 text-zinc-400'
                                                : 'bg-white text-zinc-700 hover:bg-zinc-50 hover:border-green-400 hover:text-green-700'
                                            }`}
                                    >
                                        <Upload size={16} />
                                        {uploadingImage ? 'Uploading to Cloudinary…' : imagePreview ? 'Change Photo' : 'Upload Photo'}
                                    </label>
                                    {formData.img && !uploadingImage && (
                                        <p className="mt-1.5 text-xs text-green-600 font-medium">✓ Photo hosted on Cloudinary</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Name</label>
                                <input
                                    ref={nameInputRef}
                                    value={formData.name || ''}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-green-400 focus:bg-white transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Type</label>
                                    <select value={formData.type || 'academic'} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-green-400 focus:bg-white transition-all">
                                        <option value="academic">Academic</option>
                                        <option value="youth">Youth Empowerment</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Gender</label>
                                    <select value={formData.gender || 'Female'} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-green-400 focus:bg-white transition-all">
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">Year Joined</label>
                            <input value={formData.yearJoined || ''} onChange={e => setFormData({ ...formData, yearJoined: e.target.value })} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-green-400 focus:bg-white transition-all" placeholder="e.g. 2024" />
                        </div>

                        {formData.type === 'academic' ? (
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">School Name</label><input value={formData.schoolName || ''} onChange={e => setFormData({ ...formData, schoolName: e.target.value })} className="w-full px-4 py-2 bg-white rounded-xl outline-none border border-blue-200 focus:border-blue-400" /></div>
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">Course</label><input value={formData.course || ''} onChange={e => setFormData({ ...formData, course: e.target.value })} className="w-full px-4 py-2 bg-white rounded-xl outline-none border border-blue-200 focus:border-blue-400" /></div>
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">Grant Level</label><input value={formData.grant || ''} onChange={e => setFormData({ ...formData, grant: e.target.value })} className="w-full px-4 py-2 bg-white rounded-xl outline-none border border-blue-200 focus:border-blue-400" placeholder="e.g. Tertiary" /></div>
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">Class/Level</label><input value={formData.level || ''} onChange={e => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-white rounded-xl outline-none border border-blue-200 focus:border-blue-400" placeholder="e.g. 100 L" /></div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50/70 rounded-xl border border-orange-100">
                                <div><label className="block text-sm font-medium text-orange-900 mb-1">Craft</label><input value={formData.craft || ''} onChange={e => setFormData({ ...formData, craft: e.target.value })} className="w-full px-4 py-2 bg-white rounded-xl outline-none border border-orange-200 focus:border-orange-400" placeholder="e.g. Business" /></div>
                                <div><label className="block text-sm font-medium text-orange-900 mb-1">Equipment Given</label><input value={formData.equipmentGiven || ''} onChange={e => setFormData({ ...formData, equipmentGiven: e.target.value })} className="w-full px-4 py-2 bg-white rounded-xl outline-none border border-orange-200 focus:border-orange-400" placeholder="e.g. Electronics" /></div>
                            </div>
                        )}

                        <div className="pt-4 flex justify-end gap-3">
                            <button onClick={resetForm} disabled={saving} className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-medium hover:bg-zinc-50 transition-colors disabled:opacity-50">
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={uploadingImage || saving}
                                className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                {isEditing ? (saving ? 'Saving...' : 'Save Changes') : (saving ? 'Creating...' : 'Save Beneficiary')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isCreating && !isEditing && (
                <>
                    {renderList('academic')}
                    {renderList('youth')}
                </>
            )}
        </div>
    );
}
