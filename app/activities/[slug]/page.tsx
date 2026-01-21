"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActivityGallery } from "@/components/activity-gallery"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import ProgressSpinnerDemo from "@/components/progress/spinner"

interface ActivityDetail {
  id: string
  slug: string
  title: {
    en: string
    ar: string
  }
  date: {
    en: string
    ar: string
  }
  location: {
    en: string
    ar: string
  }
  description: {
    en: string
    ar: string
  }
  full_description: {
    en: string
    ar: string
  }
  image: string | null
  category: {
    en: string
    ar: string
  }
  featured: boolean
  year: number
  gallery_images: string[]
  gallery_videos: string[]
}

export default function ActivityPage() {
  const params = useParams()
  const { language } = useLanguage()
  const slug = params.slug as string
  const [activity, setActivity] = useState<ActivityDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        setLoading(true)
        const response = await fetch(`/api/activities/${slug}`)
        if (!response.ok) {
          throw new Error('Activity not found')
        }
        const data = await response.json()
        setActivity(data)
      } catch (error) {
        console.error('Error fetching activity:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchActivity()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ProgressSpinnerDemo />
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="container px-4 md:px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Activity Not Found</h1>
          <p className="mt-4 text-muted-foreground">The activity you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/activities">
            <Button className="mt-6">Return to Activities</Button>
          </Link>
        </div>
      </div>
    )
  }

  const heroFitClass = activity.image?.includes('hero-1.png') ? "object-contain bg-white" : "object-cover"

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={activity.image || "/placeholder.svg"}
            alt={activity.title[language]}
            className={`h-full w-full ${heroFitClass}`}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="container relative h-full px-4 md:px-6">
          <div className="flex h-full flex-col justify-end pb-16">
            <div className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-flex flex-col items-end space-y-4 ${language === 'ar' ? 'float-right' : 'float-left'}`}>
                <Link href="/activities">
                  <Button variant="ghost" className={`w-fit text-white hover:bg-white/20 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <ArrowLeft className={`${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'} h-4 w-4`} />
                    {language === 'en' ? 'Back to Activities' : 'العودة إلى الأنشطة'}
                  </Button>
                </Link>
              </div>
            </div>
            <h1 className={`text-4xl font-bold text-white sm:text-5xl mt-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>{activity.title[language]}</h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className={`mb-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <ActivityGallery activity={activity} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
