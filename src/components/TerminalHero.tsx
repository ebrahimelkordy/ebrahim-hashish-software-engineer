"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TerminalHeroProps {
  title: string;
  description: string;
}

export const TerminalHero = ({ title, description }: TerminalHeroProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = title;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="py-20 px-6 flex flex-col items-start gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-zinc-600 text-[10px] font-mono ml-4 uppercase tracking-widest">Architect-V1.0.0-Live</span>
      </div>

      <div className="terminal-line">
        <span className="text-green-500 underline mr-2">system.root</span>
        <span className="text-zinc-500 mr-2">➜</span>
        <h1 className="inline text-3xl md:text-5xl font-bold text-white leading-tight">
          {displayedText}
          <span className="cursor-blink text-indigo-500">_</span>
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="terminal-line pl-8 border-l border-zinc-900 ml-2"
      >
        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed italic">
          "{description}"
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex flex-wrap gap-4 mt-8"
      >
        <button className="px-6 py-3 architect-card text-sm font-bold text-indigo-400 hover:text-white transition-all uppercase tracking-widest">
          View Projects
        </button>
        <button className="px-6 py-3 text-sm font-bold text-zinc-600 hover:text-zinc-300 transition-all uppercase tracking-widest">
          Get in Touch
        </button>
      </motion.div>
    </section>
  );
};
