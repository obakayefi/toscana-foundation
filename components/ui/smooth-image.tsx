"use client"

import React, { useState } from "react"
import Image, { ImageProps } from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface SmoothImageProps extends ImageProps {
  containerClassName?: string
}

export function SmoothImage({
  src,
  alt,
  className,
  containerClassName,
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div 
      className={cn(
        "relative overflow-hidden", 
        props.fill ? "absolute inset-0 h-full w-full" : "block",
        containerClassName
      )}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <Skeleton className="h-full w-full rounded-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={alt}
        className={cn(
          "duration-700 ease-in-out",
          isLoaded ? "scale-100 blur-0 grayscale-0" : "scale-105 blur-lg grayscale",
          className
        )}
        onLoad={(e) => {
          setIsLoaded(true)
          if (props.onLoad) (props.onLoad as any)(e)
        }}
        onError={(e) => {
          setIsLoaded(true)
          if (props.onError) (props.onError as any)(e)
        }}
        {...props}
      />
    </div>
  )
}
