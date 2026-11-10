"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

interface TerminalImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

// Automatically optimize Cloudinary URLs with modern format, good quality and tailored width
function getOptimizedImageUrl(src: string, priority = false): string {
  if (!src) return "";
  if (src.includes("res.cloudinary.com") && src.includes("/image/upload/")) {
    const width = priority ? 1000 : 800;
    // Strip any old static transformations if present
    const cleanUrl = src.replace(/\/image\/upload\/f_auto,q_auto,w_\d+\//, "/image/upload/");
    if (!cleanUrl.includes("/f_auto,q_auto")) {
      return cleanUrl.replace("/image/upload/", `/image/upload/f_auto,q_auto:good,w_${width}/`);
    }
    return cleanUrl;
  }
  return src;
}

export const TerminalImage = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "", 
  priority = false 
}: TerminalImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, priority);
  const isValidUrl = Boolean(src && (src.startsWith('/') || src.startsWith('http') || src.startsWith('blob:')));

  if (!isValidUrl || hasError) {
    return (
      <div className={`relative ${containerClassName} bg-[#141414] border border-dashed border-[#5d3f3d]/60 flex items-center justify-center min-h-[160px] overflow-hidden`}>
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20"></div>
        <div className="flex flex-col items-center gap-2 text-center p-4 z-10">
          <ImageOff className="w-8 h-8 text-[#d90429] opacity-80" />
          <div className="space-y-0.5">
             <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#d90429] block font-bold">
               ASSET_OFFLINE
             </span>
             <span className="text-[8px] uppercase tracking-widest font-mono text-[#e7bcba] block opacity-50">
               STREAM_UNAVAILABLE
             </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#121212] ${containerClassName}`}>
      {/* Lightweight Ambient Pulse placeholder underneath (Zero CPU overhead, non-blocking) */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#161616] animate-pulse z-0 pointer-events-none" />
      )}

      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={`${className} transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  );
};
