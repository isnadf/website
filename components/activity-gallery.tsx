"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Image from 'next/image'
import { Activity } from "@/app/activities/data"
import { useLanguage } from "@/components/language-provider"

interface ActivityGalleryProps {
  activity: Activity
}

export function ActivityGallery({ activity }: ActivityGalleryProps) {
  const { language } = useLanguage()
  const [images, setImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Map activity ID to folder name
  const getFolderName = (id: number) => {
    switch (id) {
      case 1:
        return "one"
      case 2:
        return "two"
      case 3:
        return "three"
      case 4:
        return "four"
      case 5:
        return "five"
      case 6:
        return "six"
      case 7:
        return "seven"
      default:
        return ""
    }
  }

  useEffect(() => {
    // Fetch images for the selected activity
    const fetchImages = async () => {
      setLoading(true)
      try {
        const folderName = getFolderName(activity.id)
        let imageList: string[] = []

        if (folderName === "one") {
          imageList = [
            "/one/PHOTO-2025-04-20-18-03-45.jpg",
            "/one/PHOTO-2025-04-20-18-03-46 2.jpg",
            "/one/PHOTO-2025-04-20-18-03-46 3.jpg",
            "/one/PHOTO-2025-04-20-18-03-46 4.jpg",
            "/one/PHOTO-2025-04-20-18-03-46.jpg",
            "/one/PHOTO-2025-04-20-18-03-47 2.jpg",
            "/one/PHOTO-2025-04-20-18-03-47 3.jpg",
            "/one/PHOTO-2025-04-20-18-03-47 4.jpg",
            "/one/PHOTO-2025-04-20-18-03-47 5.jpg",
            "/one/PHOTO-2025-04-20-18-03-47.jpg",
            "/one/PHOTO-2025-04-20-18-03-48 2.jpg",
            "/one/PHOTO-2025-04-20-18-03-48.jpg",
            "/one/VIDEO-2025-04-20-18-03-48.mp4"
          ]
        } else if (folderName === "two") {
          imageList = [
            "/two/PHOTO-2025-04-20-18-04-02 2.jpg",
            "/two/PHOTO-2025-04-20-18-04-02 3.jpg",
            "/two/PHOTO-2025-04-20-18-04-02 4.jpg",
            "/two/PHOTO-2025-04-20-18-04-02.jpg",
            "/two/PHOTO-2025-04-20-18-04-03 2.jpg",
            "/two/PHOTO-2025-04-20-18-04-03 3.jpg",
            "/two/PHOTO-2025-04-20-18-04-03 4.jpg",
            "/two/PHOTO-2025-04-20-18-04-03.jpg",
            "/two/PHOTO-2025-04-20-18-04-04 2.jpg",
            "/two/PHOTO-2025-04-20-18-04-04 3.jpg",
            "/two/PHOTO-2025-04-20-18-04-04 4.jpg",
            "/two/PHOTO-2025-04-20-18-04-04 5.jpg",
            "/two/PHOTO-2025-04-20-18-04-04.jpg",
            "/two/PHOTO-2025-04-20-18-04-05.jpg"
          ]
        } else if (folderName === "three") {
          imageList = [
            "/three/PHOTO-2025-04-20-18-04-17 2.jpg",
            "/three/PHOTO-2025-04-20-18-04-17.jpg",
            "/three/PHOTO-2025-04-20-18-04-18 2.jpg",
            "/three/PHOTO-2025-04-20-18-04-18 3.jpg",
            "/three/PHOTO-2025-04-20-18-04-18.jpg",
          ]
        } else if (folderName === "four") {
          imageList = [
            "/four/PHOTO-2025-04-26-22-18-22 2.jpg",
            "/four/PHOTO-2025-04-26-22-18-22 3.jpg",
            "/four/PHOTO-2025-04-26-22-18-22 4.jpg",
            "/four/PHOTO-2025-04-26-22-18-22 5.jpg",
            "/four/PHOTO-2025-04-26-22-18-22.jpg",
            "/four/VIDEO-2025-04-26-22-18-23.mp4"
          ]
        } else if (folderName === "five") {
          imageList = [
            "/five/DSC07404.jpg",
            "/five/DSC07413.jpg",
            "/five/DSC07417.jpg",
            "/five/DSC07427.jpg",
            "/five/DSC07431.jpg",
            "/five/DSC07433.jpg",
            "/five/DSC07462.jpg",
            "/five/DSC07469.jpg",
            "/five/DSC07478.jpg",
            "/five/DSC07485.jpg",
            "/five/DSC07489.jpg",
            "/five/DSC07508.jpg",
            "/five/DSC07509.jpg",
            "/five/DSC07513.jpg",
            "/five/DSC07522.jpg",
            "/five/DSC07538.jpg",
            "/five/DSC07542.jpg",
            "/five/DSC07548.jpg",
            "/five/VIDEO-2025-04-26-22-20-53.mp4"
          ]
        } else if (folderName === "six") {
          imageList = [
            "/six/PHOTO-2025-04-26-22-24-14 2.jpg",
            "/six/PHOTO-2025-04-26-22-24-14.jpg",
            "/six/PHOTO-2025-04-26-22-24-15.jpg",
            "/six/VIDEO-2025-04-26-22-24-15.mp4"
          ]
        } else if (folderName === "seven") {
          imageList = [
            "/seven/1.jpeg",
            "/seven/2.jpeg",
            "/seven/video.mp4"
          ]
        }

        setImages(imageList)
        setSelectedImageIndex(0)
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [activity.id])

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

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
  }, [])

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Activity Info */}
      <div className="space-y-4 sm:space-y-6">
        <Badge className="bg-[hsl(120,61%,34%)]/10 text-[hsl(120,61%,34%)] text-sm sm:text-base px-3 py-1.5">
          {activity.category[language]}
        </Badge>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{activity.title[language]}</h1>
        <div className={`flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
            <Calendar className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
            {activity.date[language]}
          </div>
          <div className={`flex items-center ${language === 'ar' ? 'order-1' : 'order-2'}`}>
            <MapPin className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4 sm:h-5 sm:w-5`} />
            {activity.location[language]}
          </div>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {activity.full_description[language].split('\n\n').map((paragraph, index) => (
            <p key={index} className={`mb-4 text-base sm:text-lg text-muted-foreground leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            {images[selectedImageIndex]?.endsWith('.mp4') ? (
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
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={images[selectedImageIndex]}
                  alt={`${activity.title[language]} image ${selectedImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-cover"
                  priority={selectedImageIndex === 0}
                  quality={85}
                  loading={selectedImageIndex === 0 ? "eager" : "lazy"}
                />
              </div>
            )}
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
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative aspect-square overflow-hidden rounded-lg ${
              selectedImageIndex === index
                ? 'ring-2 ring-primary ring-offset-2'
                : 'hover:opacity-80'
            }`}
          >
            {image.endsWith('.mp4') ? (
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
                  className="object-cover"
                  quality={60}
                  loading="lazy"
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 