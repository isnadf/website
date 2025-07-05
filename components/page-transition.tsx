"use client"

import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { isGoogleTranslateActive } from "@/lib/google-translate-utils"

interface PageTransitionProps {
  children: ReactNode
}

// Define page order for navigation direction detection
const pageOrder = [
  "/",
  "/about",
  "/news",
  "/programs",
  "/success-stories",
  "/apply",
  "/activities",
  "/testimonials",
  "/contact"
]

const getPageIndex = (path: string) => {
  // Handle dynamic routes and subpages
  const basePath = path.split('/')[1] ? `/${path.split('/')[1]}` : "/"
  return pageOrder.indexOf(basePath)
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState<string>("")
  const [direction, setDirection] = useState<"forward" | "backward" | "none">("none")
  const [isTranslated, setIsTranslated] = useState(false)

  useEffect(() => {
    if (previousPath) {
      const currentIndex = getPageIndex(pathname)
      const previousIndex = getPageIndex(previousPath)

      if (currentIndex > previousIndex) {
        setDirection("forward")
      } else if (currentIndex < previousIndex) {
        setDirection("backward")
      } else {
        setDirection("none")
      }
    }
    setPreviousPath(pathname)
  }, [pathname, previousPath])

  // Check for Google Translate on each route change
  useEffect(() => {
    const checkTranslation = () => {
      setIsTranslated(isGoogleTranslateActive())
    }

    // Check immediately
    checkTranslation()

    // Check again after a short delay to catch late translation initialization
    const timer = setTimeout(checkTranslation, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  const pageVariants = {
    initial: (direction: string) => ({
      opacity: 0,
      x: direction === "forward" ? 300 : direction === "backward" ? -300 : 0,
      scale: 0.95,
    }),
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: (direction: string) => ({
      opacity: 0,
      x: direction === "forward" ? -300 : direction === "backward" ? 300 : 0,
      scale: 1.05,
    }),
  }

  const pageTransition = {
    type: "tween" as const,
    ease: easeInOut,
    duration: isTranslated ? 0.1 : 0.4, // Faster transitions when translated to reduce mismatch window
  }

  // When Google Translate is active, use a simpler transition to avoid conflicts
  if (isTranslated) {
    return (
      <div key={`translated-${pathname}`} className="w-full min-h-screen">
        {children}
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        custom={direction}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
