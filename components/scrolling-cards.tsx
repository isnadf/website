"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import NewsCards2 from "@/components/news-cards2"

interface ScrollingCardsProps {
  cards: {
    title: string
    excerpt: string
    image: string
    href?: string
    date?: string
    category?: string
  }[]
  isAnyCardHovered: boolean
  onHoverChange: (isHovered: boolean) => void
}

export default function ScrollingCards({ cards, isAnyCardHovered, onHoverChange }: ScrollingCardsProps) {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isTranslated, setIsTranslated] = useState(false)

  // Use ResizeObserver to handle container size changes
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(container)

    // Create a MutationObserver to detect Google Translate changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          setIsTranslated(true)
          // Reset animation position when translation occurs
          if (container) {
            container.style.transform = 'translateX(0)'
          }
        }
      })
    })

    observer.observe(container, {
      childList: true,
      characterData: true,
      subtree: true
    })

    return () => {
      resizeObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  // Use a custom animation with JavaScript instead of CSS animation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationId: number
    let position = 0
    const totalWidth = containerWidth || container.scrollWidth / 2
    const speed = 1.5 // Adjust speed as needed

    const animate = () => {
      if (isTranslated) {
        // Reset animation when translation occurs
        position = 0
        setIsTranslated(false)
      }

      // For RTL, we move in the opposite direction
      if (isRTL) {
        position += speed
        if (position >= totalWidth) {
          position = 0
        }
      } else {
        position -= speed
        if (position <= -totalWidth) {
          position = 0
        }
      }

      container.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      animate()
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isRTL, containerWidth, isTranslated])

  return (
    <div className="w-screen overflow-hidden py-8">
      <div
        ref={scrollContainerRef}
        className="flex whitespace-nowrap"
        style={{
          willChange: 'transform',
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left'
        }}
        data-scrolling-cards="true"
      >
        {/* First set of cards */}
        <div className="flex gap-8 pr-8">
          {cards.map((card, index) => (
            <div key={`first-${index}`} data-card-index={index}>
              <NewsCards2
                title={card.title}
                excerpt={card.excerpt}
                image={card.image}
                href={card.href}
                date={card.date}
                isAnyCardHovered={isAnyCardHovered}
                onHoverChange={onHoverChange}
              />
            </div>
          ))}
        </div>

        {/* Duplicate set of cards to ensure seamless looping */}
        <div className="flex gap-8 pl-8">
          {cards.map((card, index) => (
            <div key={`second-${index}`} data-card-index={index}>
              <NewsCards2
                title={card.title}
                excerpt={card.excerpt}
                image={card.image}
                href={card.href}
                date={card.date}
                isAnyCardHovered={isAnyCardHovered}
                onHoverChange={onHoverChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
