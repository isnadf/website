"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  duration?: number;
}) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const wordArray = words.split(' ');

  useEffect(() => {
    setVisibleWords(0);
    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev >= wordArray.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200); // Show one word every 200ms

    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={cn("", className)}>
      {wordArray.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className={`inline-block transition-all duration-500 mr-2 ${
            idx < visibleWords 
              ? 'opacity-100 blur-none' 
              : 'opacity-0 blur-md'
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};
