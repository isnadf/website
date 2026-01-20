"use client";

/**
 * SmoothScroll Component
 * 
 * Client-side component that initializes Lenis smooth scrolling globally.
 * 
 * Features:
 * - Initializes Lenis once on mount
 * - Respects prefers-reduced-motion (disables if user opts out)
 * - Cleans up properly on unmount
 * - Runs animation loop using requestAnimationFrame
 * - SSR-safe: no-op during server-side rendering
 * 
 * Usage:
 * Add this component once in your root layout.tsx
 */

import { useEffect, useRef } from 'react';
import { createLenisInstance, destroyLenis, raf } from '@/lib/lenis';

export default function SmoothScroll() {
  const lenisRef = useRef<ReturnType<typeof createLenisInstance>>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis instance
    lenisRef.current = createLenisInstance();

    // If Lenis is disabled (reduced motion or SSR), do nothing
    if (!lenisRef.current) {
      return;
    }

    // Start the animation loop
    function animate(time: number) {
      raf(time, lenisRef.current);
      rafIdRef.current = requestAnimationFrame(animate);
    }

    // Begin the animation loop
    rafIdRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      // Cancel animation frame if it exists
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Destroy Lenis instance
      destroyLenis(lenisRef.current);
      lenisRef.current = null;
    };
  }, []);

  // Listen for changes in prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      // If user enables reduced motion, destroy Lenis
      if (mediaQuery.matches && lenisRef.current) {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        destroyLenis(lenisRef.current);
        lenisRef.current = null;
      }
      // If user disables reduced motion, reinitialize Lenis
      else if (!mediaQuery.matches && !lenisRef.current) {
        lenisRef.current = createLenisInstance();
        if (lenisRef.current) {
          function animate(time: number) {
            raf(time, lenisRef.current);
            rafIdRef.current = requestAnimationFrame(animate);
          }
          rafIdRef.current = requestAnimationFrame(animate);
        }
      }
    };

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
}


