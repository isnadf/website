"use client"

import { useRef, useEffect, type ReactNode, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface GSAPTextRevealProps {
  children: ReactNode
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export default function GSAPTextReveal({
  children,
  element: Element = "h2",
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  className = "",
}: GSAPTextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isTranslated, setIsTranslated] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const element = ref.current
    if (!element) return

    // Add data attribute to track original content
    element.setAttribute('data-original-content', element.textContent || '')

    // Create a MutationObserver to detect Google Translate changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const currentContent = element.textContent || ''
          const originalContent = element.getAttribute('data-original-content') || ''
          
          if (currentContent !== originalContent) {
            setIsTranslated(true)
            // Re-apply animation after translation
            gsap.set(element, {
              opacity: 0,
              y: 20,
            })
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration,
              delay: 0.1, // Small delay to ensure translation is complete
              ease: "power2.out",
            })
          }
        }
      })
    })

    // Observe the element for changes
    observer.observe(element, {
      childList: true,
      characterData: true,
      subtree: true
    })

    // Create a simple reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: "play none none none",
        // Add markers for debugging if needed
        // markers: true,
      },
    })

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 20,
    })

    // Animate to revealed state
    tl.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
    })

    return () => {
      if (tl) tl.kill()
      observer.disconnect()
    }
  }, [children, delay, duration, threshold])

  return (
    <Element 
      ref={ref as React.RefObject<HTMLHeadingElement>} 
      className={`${className} overflow-hidden ${isTranslated ? 'translated' : ''}`}
      data-gsap-text-reveal="true"
    >
      {children}
    </Element>
  )
}

