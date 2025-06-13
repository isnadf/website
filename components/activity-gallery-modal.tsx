"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Play, Calendar, MapPin, Users, BookOpen, Presentation, Globe, Award, Handshake } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { Badge } from "@/components/ui/badge"
import { Activity } from "@/app/activities/data"
import { useLanguage } from "@/components/language-provider"

interface ActivityGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  activity: Activity
}

export function ActivityGalleryModal({
  isOpen,
  onClose,
  activity,
}: ActivityGalleryModalProps) {
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
      default:
        return ""
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Fetch images for the selected activity
      const fetchImages = async () => {
        setLoading(true)
        try {
          const folderName = getFolderName(activity.id)

          // In a real app, you would fetch this from an API
          // For now, we'll simulate it by hardcoding the image paths based on the folder structure
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
              "/two/PHOTO-2025-04-20-18-04-05.jpg",
              "/two/VIDEO-2025-04-20-18-04-05 2.mp4",
              "/two/VIDEO-2025-04-20-18-04-05 3.mp4",
              "two/VIDEO-2025-04-20-18-04-05.mp4",
              "/two/VIDEO-2025-04-20-18-04-05.mp4",
              "/two/VIDEO-2025-04-20-18-04-06.mp4"

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
    }
  }, [isOpen, activity.id])

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  // Activity type icons
  const getActivityIcon = (category: string) => {
    switch (category) {
      case "Conference":
        return <Users className="h-5 w-5" />
      case "Workshop":
        return <BookOpen className="h-5 w-5" />
      case "Seminar":
        return <Presentation className="h-5 w-5" />
      case "Cultural Event":
        return <Globe className="h-5 w-5" />
      case "Networking":
        return <Handshake className="h-5 w-5" />
      case "Education Fair":
        return <Award className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  // Add keyboard event handler for left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handlePrevImage, handleNextImage, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] p-6 bg-white dark:bg-gray-900 overflow-auto">
        <DialogTitle>
          <VisuallyHidden>{activity.title[language]} Gallery</VisuallyHidden>
        </DialogTitle>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(120,61%,34%)]"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p>No images found for this activity.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Image/Video Gallery */}
            <div className="relative h-[60vh] flex items-center justify-center">
              <div className="relative w-full h-full">
                {images[selectedImageIndex]?.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={images[selectedImageIndex]}
                    controls
                    className="w-full h-full rounded-lg object-contain"
                    autoPlay
                    controlsList="nodownload"
                    playsInline
                  />
                ) : (
                  <img
                    src={images[selectedImageIndex]}
                    alt={`${activity.title[language]} image ${selectedImageIndex + 1}`}
                    className="w-full h-full rounded-lg object-contain"
                  />
                )}

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-10 w-10"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-10 w-10"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Image counter */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                  <div className="bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Activity Details */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-[hsl(120,61%,34%)]/10 text-[hsl(120,61%,34%)] flex items-center gap-1 px-3 py-1.5 text-base">
                  {getActivityIcon(activity.category[language])}
                  {activity.category[language]}
                </Badge>
                <span className="text-base font-medium text-muted-foreground">{activity.year}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold">{activity.title[language]}</h2>

              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {activity.date[language]}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  {activity.location[language]}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-muted-foreground">{activity.full_description[language]}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
