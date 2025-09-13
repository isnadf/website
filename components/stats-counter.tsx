"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface StatsCounterProps {
  number: number
  label: string
}

export default function StatsCounter({ number, label }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const start = 0
    const duration = 2

    // Create a simple counter animation without relying on progress property
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 500), 1)
      
      setCount(Math.floor(start + (number - start) * progress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)

    return () => {
      startTime = null
    }
  }, [isInView, number])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center">
      <span className="text-5xl font-bold">{count}</span>
      <span className="mt-2 text-lg">{label}</span>
    </div>
  )
}

