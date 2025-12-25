/**
 * Lenis Smooth Scroll Utility
 * 
 * Provides a centralized way to initialize and manage Lenis smooth scrolling.
 * Respects prefers-reduced-motion and provides SSR-safe fallbacks.
 */

import Lenis from 'lenis';

/**
 * Check if user prefers reduced motion
 * SSR-safe: returns false during SSR, checks media query on client
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR fallback
  }
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize Lenis smooth scroll instance
 * Returns null if reduced motion is preferred or in SSR
 * 
 * Note: Lenis works seamlessly with GSAP ScrollTrigger.
 * ScrollTrigger will automatically use Lenis's scroll position.
 */
export function createLenisInstance(): Lenis | null {
  // SSR safety: return null during server-side rendering
  if (typeof window === 'undefined') {
    return null;
  }

  // Respect user's motion preferences
  if (prefersReducedMotion()) {
    return null;
  }

  // Create Lenis instance with optimized settings
  const lenis = new Lenis({
    duration: 1.2, // Smooth scroll duration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    orientation: 'vertical', // Only vertical scrolling
    gestureOrientation: 'vertical', // Only vertical gestures
    smoothWheel: true, // Enable smooth wheel scrolling
    wheelMultiplier: 1, // Wheel scroll multiplier
    touchMultiplier: 2, // Touch scroll multiplier
    infinite: false, // Don't allow infinite scrolling
  });

  return lenis;
}

/**
 * Start the Lenis animation loop
 * This should be called in a requestAnimationFrame loop
 */
export function raf(time: number, lenis: Lenis | null): void {
  if (!lenis) return;
  
  lenis.raf(time);
}

/**
 * Cleanup function to destroy Lenis instance
 */
export function destroyLenis(lenis: Lenis | null): void {
  if (!lenis) return;
  
  lenis.destroy();
}

