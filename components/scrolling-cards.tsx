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
    isClickable?: boolean
  }[]
  isAnyCardHovered: boolean
  onHoverChange: (isHovered: boolean) => void
  direction?: "ltr" | "rtl"
}

export default function ScrollingCards({ cards, isAnyCardHovered, onHoverChange, direction }: ScrollingCardsProps) {
  const { language } = useLanguage()
  const isRTL = direction ? direction === "rtl" : language === "ar"
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isTranslated, setIsTranslated] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [containerWidth, setContainerWidth] = useState(0)

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
    const cardWidth = container.querySelector('[data-card-index="0"]')?.getBoundingClientRect().width || 0
    const gap = 32 // 8rem = 32px (gap-8)
    const padding = 32 // 8rem = 32px (px-8)
    const cardSetWidth = (cardWidth + gap) * cards.length + (padding * 2) // Include padding in calculation
    const speed = 1 // Adjust speed as needed

    const animate = () => {
      if (isTranslated) {
        position = 0
        setIsTranslated(false)
      }

      if (isRTL) {
        position += speed
        if (position >= cardSetWidth) {
          position = 0
        }
      } else {
        position -= speed
        if (position <= -cardSetWidth) {
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
  }, [isRTL, cards.length, isTranslated])

  return (
    <div className="w-screen overflow-hidden py-8">
      <div
        ref={scrollContainerRef}
        className="flex"
        style={{
          willChange: 'transform',
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left'
        }}
        data-scrolling-cards="true"
      >
        {/* First set of cards with padding */}
        <div className="flex gap-8 px-2">
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
                isClickable={card.isClickable}
              />
            </div>
          ))}
        </div>

        {/* Second set of cards with padding */}
        <div className="flex gap-8 px-8">
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
                isClickable={card.isClickable}
              />
            </div>
          ))}
        </div>

        {/* Third set of cards with padding */}
        <div className="flex gap-8 px-8">
          {cards.map((card, index) => (
            <div key={`third-${index}`} data-card-index={index}>
              <NewsCards2
                title={card.title}
                excerpt={card.excerpt}
                image={card.image}
                href={card.href}
                date={card.date}
                isAnyCardHovered={isAnyCardHovered}
                onHoverChange={onHoverChange}
                isClickable={card.isClickable}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
