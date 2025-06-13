"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent as UICardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

interface NewsCardProps {
  title: string
  excerpt: string
  image: string
  date?: string
  href?: string
  isAnyCardHovered?: boolean
  onHoverChange?: (isHovered: boolean) => void
  isClickable?: boolean
}

export default function NewsCards2({
  title,
  excerpt,
  image,
  date,
  href,
  isAnyCardHovered = false,
  onHoverChange,
  isClickable = false
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHoverChange?.(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHoverChange?.(false)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const cardContent = (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <Card
        className={`w-[500px] h-[500px] overflow-hidden transition-all hover:shadow-lg border-2 border-[#1e7e34]/20 shadow-md dark:bg-gray-900 dark:border-[#1e7e34]/30 ${
          isAnyCardHovered && !isHovered ? 'blur-[2px] opacity-50' : ''
        } ${isClickable ? 'cursor-pointer' : ''}`}
      >
        <div className="relative aspect-[16/9] w-full">
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              onError={handleImageError}
              sizes="(max-width: 500px) 100vw, 500px"
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">Image not available</span>
            </div>
          )}
        </div>
        <CardHeader className="p-6">
          <h3 className="text-2xl font-bold leading-tight line-clamp-2 break-words whitespace-normal hyphens-auto text-black dark:text-white" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', textAlign: isRTL ? 'right' : 'left' }}>{title}</h3>
          {date && (
            <p className="text-sm text-[#1e7e34] dark:text-[#1e7e34] mt-1" style={{ textAlign: isRTL ? 'right' : 'left' }}>{date}</p>
          )}
        </CardHeader>
        <UICardContent className="p-6 pt-0">
          <p className="text-base text-muted-foreground leading-relaxed line-clamp-2 whitespace-normal hyphens-auto" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', textAlign: isRTL ? 'right' : 'left' }}>{excerpt}</p>
        </UICardContent>
      </Card>
    </motion.div>
  )

  return isClickable ? (
    <Link href={href || '#'} className="block">
      {cardContent}
    </Link>
  ) : cardContent
}

