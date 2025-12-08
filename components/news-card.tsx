"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

interface NewsCardProps {
  title: string
  excerpt: string
  image: string
  href: string
  date?: string
}

export default function NewsCard({ title, excerpt, image, href, date }: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { language, t } = useLanguage()
  const isRTL = language === "ar"

  return (
    <motion.div
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full"
    >
      <Link href={href} className="block h-full">
        <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900 flex flex-col group rounded-lg cursor-pointer">
          {/* Image Section */}
          <div className="relative h-[240px] overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content Section */}
          <CardHeader className="p-5 pb-3 flex-grow">
            {date && (
              <p 
                className="text-xs text-[#1e7e34] dark:text-[#1e7e34] mb-2 font-medium"
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {date}
              </p>
            )}
            <h3 
              className="text-lg font-bold leading-tight line-clamp-2 mb-2 text-gray-900 dark:text-white group-hover:text-[#1e7e34] transition-colors duration-300" 
              style={{ 
                wordWrap: 'break-word', 
                overflowWrap: 'break-word',
                textAlign: isRTL ? 'right' : 'left'
              }}
            >
              {title}
            </h3>
            <p 
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3" 
              style={{ 
                wordWrap: 'break-word', 
                overflowWrap: 'break-word',
                textAlign: isRTL ? 'right' : 'left'
              }}
            >
              {excerpt}
            </p>
          </CardHeader>

          {/* Footer with Button */}
          <CardFooter className="p-5 pt-0">
            <Button 
              variant="outline" 
              className="w-full h-10 border-[#1e7e34] text-[#1e7e34] hover:bg-[#1e7e34] hover:text-white transition-all duration-300 group/btn text-sm"
            >
              <span>{t("news.readMore")}</span>
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

