"use client";

import { useState } from "react";

interface EditableListProps {
  items: string[];
  isEditable: boolean;
  onChange: (items: string[]) => void;
  label: string;
}

export const EditableList = ({ items, isEditable, onChange, label }: EditableListProps) => {
  const [newVal, setNewVal] = useState("");

  const handleUpdate = (idx: number, val: string) => {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  };

  const handleAdd = () => {
    if (!newVal.trim()) return;
    onChange([...items, newVal.trim()]);
    setNewVal("");
  };

  const handleRemove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  if (!isEditable) {
    return (
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#00f4fe] text-xs mt-1">[{String(i + 1).padStart(2, '0')}]</span>
            <span className="text-[#e7bcba] text-sm">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-4">
      <p className="font-label text-[10px] uppercase tracking-widest text-[#5d3f3d] mb-4">{label}_EDITOR</p>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={item}
            onChange={(e) => handleUpdate(i, e.target.value)}
            className="flex-grow bg-[#1c1b1b] border border-[#5d3f3d]/30 p-2 text-sm text-[#e7bcba] font-mono focus:border-[#00f4fe] outline-none min-h-[60px]"
          />
          <button 
            onClick={() => handleRemove(i)}
            className="w-8 h-8 flex items-center justify-center bg-[#d90429]/10 text-[#d90429] border border-[#d90429]/30 hover:bg-[#d90429] hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      ))}
      <div className="flex gap-2 mt-4 pt-4 border-t border-[#5d3f3d]/20">
        <input 
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          placeholder={`Add new ${label.toLowerCase()}...`}
          className="flex-grow bg-black/40 border border-[#00f4fe]/30 p-2 text-xs text-[#00f4fe] font-mono outline-none"
        />
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-[#00f4fe] text-black font-label text-[10px] uppercase tracking-widest hover:bg-white transition-all"
        >
          ADD
        </button>
      </div>
    </div>
  );
};
