'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewGalleryProps {
    images: string[];
    eventName: string;
    year: string;
}

export default function ImagePreviewGallery({ images, eventName, year }: ImagePreviewGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer group"
                        onClick={() => setSelectedIndex(idx)}
                    >
                        <div className="relative w-full h-72 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-200 shadow-sm group-hover:shadow-md transition-all">
                            <Image
                                src={img}
                                alt={`${eventName} - ${year} - ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X size={24} />
                        </button>



                        <motion.div 
                            className="relative w-full max-w-full max-h-[85vh] aspect-[4/3] md:aspect-auto h-[85vh] z-10"
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[selectedIndex]}
                                alt={`${eventName} - ${year} - ${selectedIndex + 1}`}
                                fill
                                className="object-contain rounded-lg shadow-2xl"
                                priority
                            />
                        </motion.div>

                        {images.length > 1 && (
                            <div className="contents z-50">
                                <button
                                    className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50"
                                    onClick={handlePrev}
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 transition-all z-50"
                                    onClick={handleNext}
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                        )}
                        
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium bg-black/50 px-4 py-1.5 rounded-full text-sm z-50">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
