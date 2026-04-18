"use client";

import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  isEditable?: boolean;
}

export const EditableText = ({
  value,
  onChange,
  className = "",
  multiline = false,
  placeholder = "Click to edit",
  isEditable = false,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
         // select text on edit for quick replacement
         (inputRef.current as any).select(); 
      }
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onChange(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditable) {
    if (multiline) {
       // Support rendering multiline text with line breaks
       return (
         <span className={className}>
           {value.split('\n').map((line, i) => (
             <span key={i}>
               {line}
               <br />
             </span>
           ))}
         </span>
       )
    }
    return <span className={className}>{value}</span>;
  }

  if (isEditing) {
    const editClasses = `${className} bg-[#0e0e0e] border border-[#00f4fe] outline-none text-current rounded-sm shadow-[0_0_10px_rgba(0,245,255,0.2)] resize-none p-1 block w-full`;
    
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={editClasses}
          rows={Math.max(3, value.split('\n').length)}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={editClasses}
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`${className} relative group cursor-text inline-block hover:bg-[#d90429]/10 rounded-sm border border-transparent hover:border-[#d90429]/50 transition-colors px-1 -mx-1`}
      title="Click to Edit (Admin Mode)"
    >
      {multiline ? (
        value.split('\n').map((line, i) => (
          <span key={i}>
            {line || <span className="opacity-50 italic">{placeholder}</span>}
            <br />
          </span>
        ))
      ) : (
        value || <span className="opacity-50 italic">{placeholder}</span>
      )}
      <span className="material-symbols-outlined absolute top-0 -right-5 text-[14px] text-[#d90429] opacity-0 group-hover:opacity-100 transition-opacity">
        edit
      </span>
    </span>
  );
};
