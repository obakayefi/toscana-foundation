"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import Image from "next/image";

export function AuroraBackgroundDemo() {
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className={'bg-white/80 rounded-lg'}>
                    <Image src={'/logo.png'} alt={'logo'} width={300} height={400} />
                </div>
                <div className="text-3xl sm:text-7xl my-4 font-bold dark:text-white text-center">
                   Coming Soon
                </div>
                <div className="font-extralight text-base sm:text-4xl dark:text-neutral-200 py-4">
                    Website Under Construction
                </div>
               
            </motion.div>
        </AuroraBackground>
    );
}
