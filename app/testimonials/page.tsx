"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Quote, Video, X, Play } from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import { TestimonialVideoModal } from "@/components/testimonial-video-modal"
import { studentTestimonials, publicFigureTestimonials } from "./data"
import { useLanguage } from "@/components/language-provider"

function TestimonialsContent() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  const { language, t } = useLanguage()
  const isRTL = language === 'ar'

  // State for testimonial video modal
  const [isTestimonialVideoOpen, setIsTestimonialVideoOpen] = useState(false)
  const [testimonialName, setTestimonialName] = useState("")
  const [testimonialVideoPath, setTestimonialVideoPath] = useState("")
  const [testimonialDescription, setTestimonialDescription] = useState("")

  // State for video loading (hero only)
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(false)
  const [heroVideoError, setHeroVideoError] = useState(false)

  const handleOpenTestimonialVideo = (name: { en: string; ar: string }, videoFileName: string, quote: { en: string; ar: string }) => {
    setTestimonialName(name[language as keyof typeof name])
    setTestimonialVideoPath(`/testomenialVid/${videoFileName}`)
    setIsTestimonialVideoOpen(true)
  }

  // Add timeout fallback for video loading
  useEffect(() => {
    if (typeParam === 'students') {
      // Fallback timeout for hero video - show video after 5 seconds even if not fully loaded
      const heroTimeout = setTimeout(() => {
        if (!heroVideoLoaded && !heroVideoError) {
          setHeroVideoLoaded(true)
        }
      }, 5000)

      return () => clearTimeout(heroTimeout)
    }
  }, [typeParam, heroVideoLoaded, heroVideoError])

  // Video Skeleton Component
  const VideoSkeleton = ({ className = "", showPlayButton = false }: { className?: string, showPlayButton?: boolean }) => (
    <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {showPlayButton && (
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <Play className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
    </div>
  )

  // Determine which testimonials to show based on URL parameter
  const testimonials = typeParam === 'influencers' ? publicFigureTestimonials : studentTestimonials
  const title = typeParam === 'influencers' ? t("testimonials.public_figures") : t("testimonials.student_voices")
  const subtitle = typeParam === 'influencers' ? t("testimonials.public_figure_testimonials") : t("testimonials.student_testimonials")
  const description = typeParam === 'influencers' ? t("testimonials.public_figure_description") : t("testimonials.student_description")

  return (
    <main className={`flex min-h-screen flex-col dark:bg-gray-950 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Hero Section */}
      {typeParam === 'students' ? (
        // Full video hero for students
        <section className="relative h-[calc(50vh)] sm:h-[calc(60vh)] md:h-[calc(70vh)] lg:h-[calc(80vh)] xl:h-[calc(85vh)] w-full overflow-hidden mt-24">
          <div className="absolute inset-0 z-0">
            {/* Video Skeleton - Shows while loading */}
            {!heroVideoLoaded && (
              <div className="absolute inset-0 z-10">
                <VideoSkeleton
                  className="h-full w-full"
                  showPlayButton={true}
                />
              </div>
            )}

            {/* Actual Video - Always present but hidden until loaded */}
            <video
              src="/newVid/students.mp4"
              autoPlay
              loop
              playsInline
              preload="metadata"
              poster="" // Remove default poster to avoid flash
              className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
                heroVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => {
                console.log('Hero video loaded data')
                setHeroVideoLoaded(true)
              }}
              onCanPlay={() => {
                console.log('Hero video can play')
                setHeroVideoLoaded(true)
              }}
              onLoadedMetadata={() => {
                console.log('Hero video metadata loaded')
                setHeroVideoLoaded(true)
              }}
              onError={(e) => {
                console.error('Hero video error:', e)
                setHeroVideoError(true)
              }}
              onLoadStart={() => {
                console.log('Hero video load start')
              }}
            />
          </div>
        </section>
      ) : (
        // Original hero for other types
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#1e7e34] to-[#f8faf8] dark:from-[#1e7e34] dark:to-gray-950 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className={`flex flex-col items-center justify-center ${isRTL ? 'font-arabic' : ''}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-center">
                  {t("testimonials.hero.title")}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 text-center">
                  {typeParam === 'influencers' ? t("testimonials.hero.subtitle_influencers") : t("testimonials.hero.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Video Modal */}
      <TestimonialVideoModal
        isOpen={isTestimonialVideoOpen}
        onClose={() => setIsTestimonialVideoOpen(false)}
        name={testimonialName}
        videoPath={testimonialVideoPath}
        isRTL={language === 'ar'}
      />

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/50 to-[#1e7e34]/0"></div>
        <div className="absolute -left-24 bottom-1/3 w-48 h-48 bg-[#1e7e34]/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-24 top-1/4 w-64 h-64 bg-[#1e7e34]/10 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <GSAPReveal animation="slide-up">
            <div className="mb-12">
              <div className={`flex flex-col items-center justify-center ${isRTL ? 'font-arabic' : ''}`}>
                <div className={`inline-flex items-center rounded-full bg-[#1e7e34]/10 px-4 py-2 text-sm text-[#1e7e34] shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Quote className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                  {title}
                </div>
                <h2 className={`mt-3 text-3xl font-bold sm:text-5xl text-gray-900 dark:text-white mb-4 text-center`}>
                  <span className="relative inline-block">
                    {subtitle}
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/80 to-[#1e7e34]/0"></span>
                  </span>
                </h2>
                <p className={`mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 text-xl mb-8 text-center`}>
                  {description}
                </p>
              </div>
            </div>
          </GSAPReveal>

          {/* Testimonials Grid */}
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <GSAPReveal key={testimonial.id} animation="slide-up" delay={0.1 * index}>
                <div
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => handleOpenTestimonialVideo(
                    testimonial.name,
                    testimonial.videoFileName,
                    testimonial.quote
                  )}
                >
                  {/* Video background */}
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    >
                      <source src={`/testomenialVid/${testimonial.videoFileName}`} type="video/mp4" />
                    </video>

                    {/* Gradient overlay - made darker and more consistent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1e7e34]/80 to-black/50 opacity-95"></div>
                  </div>

                  {/* Content container */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 text-white">
                    {/* Play button */}
                    <div className="flex justify-end">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                        <Video className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Name and degree only */}
                    <div className="mt-auto">
                      <div className={`flex items-center pt-4 border-t border-white/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'} text-white font-bold text-lg border border-white/20`}>
                          {testimonial.name[language].charAt(0)}
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className={`font-bold text-white text-lg ${isRTL ? 'font-arabic' : ''}`}>{testimonial.name[language]}</p>
                          <p className={`text-white/70 ${isRTL ? 'font-arabic' : ''}`}>{testimonial.role[language]}, {testimonial.organization[language]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

// Loading component
function TestimonialsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8faf8] dark:bg-gray-950">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

// Main component with Suspense
export default function TestimonialsPage() {
  return (
    <Suspense fallback={<TestimonialsLoading />}>
      <TestimonialsContent />
    </Suspense>
  )
}
