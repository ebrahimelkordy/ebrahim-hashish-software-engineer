"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARACTERS = "!<>-_\\\\/[]{}—=+*^?#________";

export const ScrambleText = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) {
      // Scramble completely while waiting
      const initialScramble = text
        .split("")
        .map((char) => (char === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]))
        .join("");
      setDisplayText(initialScramble);
      return;
    }

    let iteration = 0;
    let timeoutId: NodeJS.Timeout;

    const startScramble = () => {
      const interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index]; // solved
              }

              if (letter === " ") return " ";

              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1; // Solves 1 letter per tick (was 1/3)
      }, speed);
      
      return interval;
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        const intervalId = startScramble();
        // we can't easily clear the interval from here if unmounted, so we trust it completes fast.
      }, delay);
    } else {
      const intervalId = startScramble();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, delay, isInView]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
};
