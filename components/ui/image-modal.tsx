"use client"
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SmoothImage } from "@/components/ui/smooth-image";
import { useEffect } from "react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, title }: ImageModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
        } else {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-zoom-out"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-[110] max-w-5xl w-full bg-transparent overflow-hidden rounded-[2rem] shadow-2xl"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-[120]"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
                            <SmoothImage 
                                src={imageUrl} 
                                alt={title} 
                                fill
                                className="object-contain rounded-xl"
                                sizes="100vw"
                            />
                        </div>
                        
                        <div className="p-8 text-center">
                            <h2 className="text-xl font-heading font-extrabold text-white tracking-tight">{title}</h2>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
