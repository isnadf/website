"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface TestimonialVideoModalProps {
  isOpen: boolean
  onClose: () => void
  name: string
  videoPath: string
  description?: string
  isRTL?: boolean
}

export function TestimonialVideoModal({
  isOpen,
  onClose,
  name,
  videoPath,
  description,
  isRTL = false,
}: TestimonialVideoModalProps) {
  // Add keyboard event handler for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] p-6 bg-white dark:bg-gray-900 overflow-auto">
        <DialogTitle>
          <VisuallyHidden>{name}&apos;s Testimonial</VisuallyHidden>
        </DialogTitle>

        <div className="space-y-6">
          <div className="relative h-[60vh] flex items-center justify-center">
            <video
              src={videoPath}
              controls
              className="w-full h-full rounded-lg object-contain"
              autoPlay
              controlsList="nodownload"
              playsInline
            />
          </div>
          
          {description && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className={`text-gray-700 dark:text-gray-300 ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`}>
                {description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
