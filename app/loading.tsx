'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
            <div className="relative flex flex-col items-center">
                {/* Logo with scale and pulse animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                        scale: [0.8, 1.05, 1],
                        opacity: 1
                    }}
                    transition={{ 
                        duration: 0.8, 
                        ease: "easeOut"
                    }}
                    className="mb-8"
                >
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                        <Image
                            src="/logo.png"
                            alt="Villa Toscana Foundation"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-xl font-heading font-bold text-zinc-900 tracking-tight">
                        Villa Toscana Foundation
                    </h2>
                    <p className="text-zinc-400 text-sm font-medium mt-1 uppercase tracking-widest">
                        Restoring Dignity
                    </p>
                </motion.div>

                {/* Premium Progress Bar */}
                <div className="mt-10 w-48 h-1 bg-zinc-100 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-green-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ 
                            width: ["0%", "30%", "60%", "100%"] 
                        }}
                        transition={{ 
                            duration: 2,
                            times: [0, 0.4, 0.7, 1],
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                    />
                </div>
            </div>

            {/* Decorative Background Elements */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-50 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] -z-10" />
            </motion.div>
        </div>
    );
}
