"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GSAPReveal from "@/components/gsap-reveal"
import Image from 'next/image'
import { Activity } from "@/app/activities/data"
import { useLanguage } from "@/components/language-provider"

interface ActivityGalleryHeroProps {
  activities: Activity[]
}

export default function ActivityGalleryHero({ activities }: ActivityGalleryHeroProps) {
  const { language } = useLanguage()
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  const isRTL = language === 'ar'
  const ChevronIcon = isRTL ? ChevronRight : ChevronLeft
  const ChevronNextIcon = isRTL ? ChevronLeft : ChevronRight

  const currentActivity = activities[currentActivityIndex]
  const autoPlayInterval = 5000 // 5 seconds

  const handlePrevActivity = useCallback(() => {
    setCurrentActivityIndex((prev) => (prev === 0 ? activities.length - 1 : prev - 1))
    setProgress(0)
  }, [activities.length])

  const handleNextActivity = useCallback(() => {
    setCurrentActivityIndex((prev) => (prev === activities.length - 1 ? 0 : prev + 1))
    setProgress(0)
  }, [activities.length])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying)
    setProgress(0)
  }, [isAutoPlaying])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextActivity()
          return 0
        }
        return prev + (100 / (autoPlayInterval / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered, handleNextActivity])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevActivity()
      if (e.key === 'ArrowRight') handleNextActivity()
      if (e.key === ' ') {
        e.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handlePrevActivity, handleNextActivity, toggleAutoPlay])

  // Get preview images for the current activity
  const getPreviewImages = (activityId: number) => {
    const activityImage = activities.find(a => a.id === activityId)?.image

    switch (activityId) {
      case 1:
        return ["/one/PHOTO-2025-04-20-18-03-45.jpg"]
      case 2:
        return ["/two/PHOTO-2025-04-20-18-04-03.jpg"]
      case 3:
        return ["/three/PHOTO-2025-04-20-18-04-17 2.jpg"]
      case 4:
        return ["/four/PHOTO-2025-04-26-22-18-22 2.jpg"]
      case 5:
        return ["/five/DSC07404.jpg"]
      case 6:
        return ["/six/PHOTO-2025-04-26-22-24-14 2.jpg"]
      case 7:
        return [activityImage || "/placeholder.svg"]
      default:
        return [activityImage || "/placeholder.svg"]
    }
  }

  const previewImages = getPreviewImages(currentActivity.id)

  return (
    <div className="pt-32 pb-16 px-4 md:px-6 bg-white dark:bg-gray-950">
      <section 
        className="relative h-[80vh] min-h-[600px] w-full overflow-hidden mx-auto max-w-[90rem] rounded-2xl shadow-2xl border-4 border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={previewImages[0] || currentActivity.image || "/placeholder.svg"}
            alt={currentActivity.title[language]}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="relative z-20 h-full flex flex-col">
          <div className={`flex-1 flex items-start ${isRTL ? 'justify-end' : 'justify-start'} p-6 md:p-8 lg:p-12`}>
            <GSAPReveal 
              animation="slide-up" 
              className={`relative ${isRTL ? 'w-full text-right' : 'max-w-3xl text-left'}`}
            >
              <Link href={`/activities/${currentActivity.id}`}>
                <div
                  className={`space-y-12 cursor-pointer group ${isRTL ? 'w-full text-right' : 'text-left'}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${currentActivity.title[language]} details`}
                >
                  {/* Activity Title */}
                  <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg line-clamp-3 ${isRTL ? 'w-full text-right' : 'text-left'}`}>
                    <span className="relative inline-block">
                      {currentActivity.title[language]}
                      <span className={`absolute -bottom-3 ${isRTL ? 'right-0 left-0' : 'left-0 right-0'} h-2 bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34] to-[#1e7e34]/0`}></span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className={`text-white/90 line-clamp-2 sm:line-clamp-3 ${isRTL ? 'w-full text-right' : 'text-left'}`}>
                    {currentActivity.description[language]}
                  </p>

                  {/* Activity Details */}
                  <div className={`relative ${isRTL ? 'w-full' : ''}`}>
                    <div className={`flex flex-row gap-4 text-white/90 text-lg ${isRTL ? 'absolute right-0 top-0' : ''}`}>
                      {/* Date Badge */}
                      <div className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'order-2' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className={`font-medium ${isRTL ? 'order-1' : ''}`}>{currentActivity.date[language]}</span>
                      </div>
                      {/* Location Badge */}
                      <div className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'order-2' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className={`font-medium ${isRTL ? 'order-1' : ''}`}>{currentActivity.location[language]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </GSAPReveal>
          </div>

          {/* Auto-play progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
            <div
              className="h-full bg-gradient-to-r from-[#1e7e34] to-[#166328] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigation buttons - position changes based on language */}
          <div className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} flex gap-4`}>
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-white/50 text-white hover:bg-white hover:text-[#1e7e34] shadow-lg rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 backdrop-blur-sm bg-black/20 w-14 h-14"
              onClick={handlePrevActivity}
              aria-label="Previous activity"
            >
              <ChevronIcon className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-white/50 text-white hover:bg-white hover:text-[#1e7e34] shadow-lg rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 backdrop-blur-sm bg-black/20 w-14 h-14"
              onClick={handleNextActivity}
              aria-label="Next activity"
            >
              <ChevronNextIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Activity indicator dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            {activities.map((activity, index) => (
              <button
                key={index}
                className={`relative group transition-all duration-300 ${
                  index === currentActivityIndex
                    ? 'w-8 h-3 bg-white rounded-full'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125'
                }`}
                onClick={() => {
                  setCurrentActivityIndex(index)
                  setProgress(0)
                }}
                aria-label={`Go to activity ${index + 1}: ${activity.title[language]}`}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {activity.title[language]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
