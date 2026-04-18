"use client";

import { useState } from "react";

interface TechCategory {
  category: string;
  items: string[];
}

interface TechManifestEditorProps {
  data: TechCategory[];
  onChange: (data: TechCategory[]) => void;
  isEditable?: boolean;
}

export const TechManifestEditor = ({
  data,
  onChange,
  isEditable = false,
}: TechManifestEditorProps) => {
  const handleAddCategory = () => {
    const name = prompt("Enter new category name (e.g. Backend):");
    if (!name) return;
    onChange([...data, { category: name, items: [] }]);
  };

  const handleAddItem = (catIndex: number) => {
    const name = prompt(`Add tech to [${data[catIndex].category}]:`);
    if (!name) return;
    const nextData = [...data];
    nextData[catIndex].items = [...nextData[catIndex].items, name];
    onChange(nextData);
  };

  const handleRemoveCategory = (catIndex: number) => {
    if (confirm(`Remove category [${data[catIndex].category}] and all items?`)) {
      onChange(data.filter((_, i) => i !== catIndex));
    }
  };

  const handleRemoveItem = (catIndex: number, itemIndex: number) => {
    const nextData = [...data];
    nextData[catIndex].items = nextData[catIndex].items.filter((_, i) => i !== itemIndex);
    onChange(nextData);
  };

  if (!isEditable) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((cat) => (
          <div key={cat.category} className="p-4 bg-[#1c1b1b] border border-[#5d3f3d]/15">
            <h3 className="font-label text-xs uppercase tracking-widest text-[#d90429] mb-3 border-b border-[#5d3f3d]/20 pb-2">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 bg-[#0e0e0e] text-[#e7bcba] font-body text-[11px] border border-[#5d3f3d]/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-[#d90429] text-white font-label text-[10px] uppercase tracking-widest hover:bg-[#b00320] transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add_box</span> NEW_CATEGORY_NODE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="p-6 bg-[#1c1b1b] border border-[#5d3f3d]/15 relative group"
          >
            <div className="flex items-center justify-between mb-6 border-b border-[#5d3f3d]/30 pb-2">
              <h3 className="font-label text-sm uppercase tracking-[0.1em] text-[#e5e2e1] font-bold">
                {cat.category}
              </h3>
              <button
                onClick={() => handleRemoveCategory(catIdx)}
                className="text-[#d90429] hover:scale-125 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {cat.items.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className="group/item flex items-center gap-2 px-2 py-1 bg-[#2a2a2a] text-[#e7bcba] font-body text-xs border border-[#5d3f3d]/20"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveItem(catIdx, itemIdx)}
                    className="opacity-0 group-hover/item:opacity-100 text-[#d90429] hover:animate-pulse"
                  >
                    <span className="material-symbols-outlined text-[10px]">close</span>
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={() => handleAddItem(catIdx)}
              className="w-full py-2 bg-[#2a2a2a] text-[#00f4fe] font-body text-[10px] uppercase tracking-widest border border-[#00f4fe]/30 hover:bg-[#00f4fe]/10 transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-xs">add</span> ADD_TECH
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
