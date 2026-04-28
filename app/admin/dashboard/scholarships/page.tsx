'use client';

import { useState, useEffect } from 'react';
import { getBeneficiaries, createBeneficiary, updateBeneficiary, deleteBeneficiary, updateBeneficiaryOrders } from './actions';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Save, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

type Beneficiary = {
    id: string;
    type: string;
    name: string;
    yearJoined: string;
    gender: string;
    img: string | null;
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
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    
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

    const handleMove = async (index: number, direction: 'up' | 'down', type: string) => {
        const list = beneficiaries.filter(b => b.type === type);
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === list.length - 1) return;

        const newItems = [...list];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        
        // Update local state
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
            toast.error("Name, Year, Gender, and Type are required");
            return;
        }

        try {
            if (isEditing) {
                await updateBeneficiary(isEditing, formData);
                toast.success("Beneficiary updated");
            } else {
                await createBeneficiary(formData as any);
                toast.success("Beneficiary created");
            }
            setIsEditing(null);
            setIsCreating(false);
            setFormData({ type: 'academic', gender: 'Female' });
            loadData();
        } catch (e: any) {
            toast.error(e.message || "Operation failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this beneficiary?")) return;
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
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-zinc-400" /></div>;

    const renderList = (type: string) => {
        const list = beneficiaries.filter(b => b.type === type).sort((a, b) => a.sortOrder - b.sortOrder);
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm mb-8">
                <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between text-sm font-medium text-zinc-900">
                    <span className="capitalize">{type} Beneficiaries</span>
                </div>
                <div className="divide-y divide-zinc-100">
                    {list.map((b, idx) => (
                        <div key={b.id} className="p-4 flex items-center gap-4 hover:bg-zinc-50/50 transition-colors">
                            <div className="flex flex-col gap-1">
                                <button onClick={() => handleMove(idx, 'up', type)} disabled={idx === 0} className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded disabled:opacity-30">
                                    <ArrowUp size={16} />
                                </button>
                                <button onClick={() => handleMove(idx, 'down', type)} disabled={idx === list.length - 1} className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded disabled:opacity-30">
                                    <ArrowDown size={16} />
                                </button>
                            </div>
                            
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 shrink-0">
                                {b.img ? <img src={b.img} alt={b.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-200" />}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-zinc-900">{b.name}</h3>
                                <div className="text-sm text-zinc-500 flex gap-4">
                                    <span>Joined {b.yearJoined}</span>
                                    {b.type === 'academic' ? (
                                        <span>{b.schoolName} - {b.course}</span>
                                    ) : (
                                        <span>{b.craft}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => startEdit(b)} className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(b.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
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
                    <p className="text-zinc-500 mt-2">Manage beneficiaries and their display order.</p>
                </div>
                {!isCreating && !isEditing && (
                    <button 
                        onClick={() => { setIsCreating(true); setFormData({ type: 'academic', gender: 'Female' }); }}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={18} />
                        <span>New Beneficiary</span>
                    </button>
                )}
            </div>

            {(isCreating || isEditing) && (
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{isEditing ? 'Edit Beneficiary' : 'Add Beneficiary'}</h2>
                        <button onClick={() => { setIsEditing(null); setIsCreating(false); }} className="text-zinc-400 hover:text-zinc-900"><X size={20} /></button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Name</label>
                                <input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Type</label>
                                    <select value={formData.type || 'academic'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none">
                                        <option value="academic">Academic</option>
                                        <option value="youth">Youth Empowerment</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Gender</label>
                                    <select value={formData.gender || 'Female'} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none">
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Year Joined</label>
                                <input value={formData.yearJoined || ''} onChange={e => setFormData({...formData, yearJoined: e.target.value})} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" placeholder="e.g. 2024" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">Image URL (Optional)</label>
                                <input value={formData.img || ''} onChange={e => setFormData({...formData, img: e.target.value})} className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" placeholder="e.g. /scholars/image.jpg" />
                            </div>
                        </div>

                        {formData.type === 'academic' ? (
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-xl">
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">School Name</label><input value={formData.schoolName || ''} onChange={e => setFormData({...formData, schoolName: e.target.value})} className="w-full px-4 py-2 rounded-xl outline-none" /></div>
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">Course</label><input value={formData.course || ''} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full px-4 py-2 rounded-xl outline-none" /></div>
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">Grant Level</label><input value={formData.grant || ''} onChange={e => setFormData({...formData, grant: e.target.value})} className="w-full px-4 py-2 rounded-xl outline-none" placeholder="e.g. Tertiary" /></div>
                                <div><label className="block text-sm font-medium text-blue-900 mb-1">Class/Level</label><input value={formData.level || ''} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-2 rounded-xl outline-none" placeholder="e.g. 100 L" /></div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-xl">
                                <div><label className="block text-sm font-medium text-orange-900 mb-1">Craft</label><input value={formData.craft || ''} onChange={e => setFormData({...formData, craft: e.target.value})} className="w-full px-4 py-2 rounded-xl outline-none" placeholder="e.g. Business" /></div>
                                <div><label className="block text-sm font-medium text-orange-900 mb-1">Equipment Given</label><input value={formData.equipmentGiven || ''} onChange={e => setFormData({...formData, equipmentGiven: e.target.value})} className="w-full px-4 py-2 rounded-xl outline-none" placeholder="e.g. Electronics" /></div>
                            </div>
                        )}

                        <div className="pt-4 flex justify-end">
                            <button onClick={handleSave} className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black">
                                <Save size={18} />
                                {isEditing ? 'Save Changes' : 'Save Beneficiary'}
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
