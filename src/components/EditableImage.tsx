"use client";

import { useState, useRef } from "react";
import { TerminalImage } from "./TerminalImage";

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (src: string) => void;
  className?: string;
  containerClassName?: string;
  isEditable?: boolean;
  priority?: boolean;
}

export const EditableImage = ({
  src,
  alt,
  onChange,
  className = "",
  containerClassName = "",
  isEditable = false,
  priority = false,
}: EditableImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check configuration
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary configuration missing in .env");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Upload failed. Make sure you have set up the Unsigned Upload Preset in Cloudinary correctly.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
    }
  };

  if (!isEditable) {
    return (
      <TerminalImage 
        src={src} 
        alt={alt} 
        className={className} 
        containerClassName={containerClassName} 
      />
    );
  }

  return (
    <div
      className={`relative group ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TerminalImage 
        src={src} 
        alt={alt} 
        className={`${className} ${isHovered ? 'blur-[2px] brightness-50' : ''} transition-all`} 
        containerClassName="w-full h-full"
        priority={priority}
      />
      
      <input 
         type="file" 
         ref={fileInputRef}
         onChange={handleFileChange}
         accept="image/*"
         className="hidden"
      />

      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-auto ${(!src || isHovered || isUploading) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         {isUploading ? (
            <div className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md border border-[#00f4fe] p-4 font-mono text-[#00f4fe] text-xs">
               <span className="material-symbols-outlined animate-spin mb-2 text-[#00f4fe]">sync</span>
               UPLOADING_ASSET...
            </div>
         ) : (
            <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-[#d90429]/90 border border-[#d90429] text-white px-4 py-2 font-label uppercase text-[10px] tracking-widest hover:bg-[#d90429] hover:shadow-[0_0_15px_rgba(217,4,41,0.5)] transition-all flex items-center gap-2"
            >
               <span className="material-symbols-outlined text-[14px]">upload</span>
               CHANGE_IMAGE {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '(CLD)' : ''}
            </button>
         )}
      </div>

      {!isHovered && !isUploading && (
        <div className="absolute top-2 right-2 bg-black/70 rounded-none border border-[#d90429]/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex">
          <span className="material-symbols-outlined text-[14px] text-[#d90429]">edit</span>
        </div>
      )}
    </div>
  );
};
