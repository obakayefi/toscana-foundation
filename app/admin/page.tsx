'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { loginAdmin } from './actions';
import { toast } from 'sonner';

export default function AdminLockScreen() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;

        setIsLoading(true);
        try {
            const res = await loginAdmin(password);
            if (res.success) {
                toast.success("Authentication successful");
                router.push('/admin/dashboard');
            } else {
                toast.error(res.error || "Authentication failed");
                setPassword('');
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl shadow-black/50">
                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-700/20 rounded-2xl flex items-center justify-center border border-green-500/30 mb-4 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                            <ShieldCheck className="w-8 h-8 text-green-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Restricted Area</h1>
                        <p className="text-zinc-400 text-sm text-center">
                            Enter the administrative sequence to access the foundation's secure portal.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-green-400 transition-colors">
                                <KeyRound size={20} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                placeholder="Admin Password"
                                autoFocus
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-zinc-900/20 border-t-zinc-900 rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Lock size={18} />
                                    <span>Unlock Portal</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => router.push('/')}
                        className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
                    >
                        &larr; Return to public site
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
