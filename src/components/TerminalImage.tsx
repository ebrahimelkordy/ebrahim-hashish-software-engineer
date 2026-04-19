"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface TerminalImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export const TerminalImage = ({ src, alt, className = "", containerClassName = "", priority = false }: TerminalImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    // Safety Timeout: 7 seconds
    // If the image hasn't loaded by then, we assume connection failure
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsTimedOut(true);
        setIsLoading(false);
        setHasError(true);
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Reset states if src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsTimedOut(false);
  }, [src]);

  // Robust validation to prevent Next.js Image from crashing on invalid inputs like ";"
  const isValidUrl = src && (src.startsWith('/') || src.startsWith('http') || src.startsWith('blob:'));

  if (!isValidUrl || hasError) {
    return (
      <div className={`relative ${containerClassName} bg-[#1c1b1b] border border-dashed border-[#5d3f3d] flex items-center justify-center min-h-[150px] overflow-hidden`}>
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20"></div>
        <div className="flex flex-col items-center gap-3 text-center p-4">
          <span className="material-symbols-outlined text-3xl text-[#d90429] animate-pulse">
            {isTimedOut ? 'shutter_speed' : 'broken_image'}
          </span>
          <div className="space-y-1">
             <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#d90429] block font-bold">
               {!isValidUrl ? 'INVALID_PATH_STREAM' : isTimedOut ? 'CONNECTION_TIMEOUT' : 'ASSET_CORRUPT'}
             </span>
             <span className="text-[8px] uppercase tracking-widest font-mono text-[#e7bcba] block opacity-60">
               {!isValidUrl ? 'SOURCE_PATH_MALFORMED' : isTimedOut ? 'LATENCY_EXCEEDED_THRESHOLD' : 'SOURCE_UNREACHABLE'}
             </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Skeleton / Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e0e0e] border border-[#d90429]/20 z-10 font-mono text-[#00f4fe] p-4 text-center">
          <div className="mb-2">
            <span className="material-symbols-outlined animate-spin text-[#d90429] mb-2 block mx-auto">sync</span>
            <span className="text-[10px] uppercase tracking-widest block">&gt; FETCHING_ASSET</span>
          </div>
          <div className="w-full max-w-[200px] h-2 bg-[#1c1b1b] border border-[#5d3f3d]/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-[#00f4fe] animate-[pulse_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized={src.startsWith('http')}
        priority={priority}
      />
    </div>
  );
};
