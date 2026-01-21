"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useLanguage } from "@/components/language-provider"

interface ActivityGalleryProps {
  activity: {
    id: string
    title: { en: string; ar: string }
    full_description: { en: string; ar: string }
    gallery_images: string[]
    gallery_videos: string[]
    image: string | null
  }
}

export function ActivityGallery({ activity }: ActivityGalleryProps) {
  const { language } = useLanguage()
  const [images, setImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const allMedia = [
      ...(activity.gallery_images || []),
      ...(activity.gallery_videos || [])
    ]
    setImages(allMedia)
    setSelectedImageIndex(0)
  }, [activity.gallery_images, activity.gallery_videos])

  const shouldContainImage = (src: string) => {
    return src?.includes('hero-1.png') || false
  }

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  // Add keyboard event handler for left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage()
      } else if (e.key === "ArrowRight") {
        handleNextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleNextImage, handlePrevImage])

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Activity Info */}
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{activity.title[language]}</h1>
        {/* <div className={`flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
            <Calendar className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
            {activity.date[language]}
          </div>
          <div className={`flex items-center ${language === 'ar' ? 'order-1' : 'order-2'}`}>
            <MapPin className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
            {activity.location[language]}
          </div>
        </div> */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {activity.full_description[language].split('\n\n').map((paragraph, index) => (
            <p key={index} className={`mb-4 text-base sm:text-lg text-muted-foreground leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Main Image Gallery */}
      {images.length > 0 && images.some(img => img && img.trim() !== '') && (
        <>
          <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <>
                {images[selectedImageIndex] && images[selectedImageIndex].trim() !== '' && (images[selectedImageIndex].endsWith('.mp4') || images[selectedImageIndex].includes('.mp4') || images[selectedImageIndex].includes('video')) ? (
                  <video
                    src={images[selectedImageIndex]}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    autoPlay
                    loop
                    muted
                    preload="metadata"
                  />
                ) : images[selectedImageIndex] && images[selectedImageIndex].trim() !== '' ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={images[selectedImageIndex]}
                      alt={`${activity.title[language]} image ${selectedImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      className={shouldContainImage(images[selectedImageIndex]) ? "object-contain bg-white" : "object-cover"}
                      priority={selectedImageIndex === 0}
                      quality={85}
                      loading={selectedImageIndex === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ) : null}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white/90 sm:left-4"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white/90 sm:right-4"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
            {images.map((image, index) => (
              image && image.trim() !== '' && (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-primary ring-offset-2'
                      : 'hover:opacity-80'
                  }`}
                >
                  {image.endsWith('.mp4') || image.includes('.mp4') || image.includes('video') ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 10vw"
                        className={shouldContainImage(image) ? "object-contain bg-white" : "object-cover"}
                        quality={60}
                        loading="lazy"
                      />
                    </div>
                  )}
                </button>
              )
            ))}
          </div>
        </>
      )}
    </div>
  )
} 
