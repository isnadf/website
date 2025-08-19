"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Search, Filter, Calendar, MapPin, Users, ChevronLeft, ChevronRight, Award, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import GSAPReveal from "@/components/gsap-reveal"
import { ActivityGallery } from "@/components/activity-gallery"
import ActivityGalleryHero from "@/components/activity-gallery-hero"
import { useLanguage } from "@/components/language-provider"

import { activitiesData, type Activity } from "./data"

// Type definitions
type Language = 'en' | 'ar'

type Location = {
  en: string;
  ar: string;
}

type LocalizedText = {
  en: string;
  ar: string;
}

// Helper function to get localized text
const getLocalizedText = (obj: LocalizedText, lang: Language): string => {
  return obj[lang]
}

// Helper function to initialize state
const initializeState = () => {
  const DEFAULT_LOCATION: Location = { en: "All", ar: "الكل" }

  const yearOptions = ["All", "2023", "2022", "2021"]

  const locationOptions: Location[] = [
    DEFAULT_LOCATION,
    { en: "İstanbul, Türkiye", ar: "إسطنبول، تركيا" },
    { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    { en: "Bishkek, Kyrgyzstan", ar: "بيشكيك، قيرغيزستان" },
    { en: "Kuala Lumpur, Malaysia", ar: "كوالالمبور، ماليزيا" },
    { en: "Nouakchott, Mauritania", ar: "نواكشوط، موريتانيا" }
  ]

  return {
    DEFAULT_LOCATION,
    yearOptions,
    locationOptions
  }
}

export default function ActivitiesPage() {
  const { language } = useLanguage()
  const lang = language as Language

  // Initialize state and constants
  const { DEFAULT_LOCATION, yearOptions, locationOptions } = initializeState()

  // State initialization
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("All")
  const [selectedLocationKey, setSelectedLocationKey] = useState(DEFAULT_LOCATION.en)
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // State for individual activity gallery modals
  const [galleryActivity, setGalleryActivity] = useState<typeof activitiesData[0] | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  // Get the full location object from its key
  const selectedLocation = locationOptions.find(l => l.en === selectedLocationKey) || DEFAULT_LOCATION

  const handleViewGallery = (activity: typeof activitiesData[0]) => {
    setGalleryActivity(activity)
    setIsGalleryOpen(true)
  }

  const scrollToActivityArchive = () => {
    // @ts-ignore - we know this exists
    const archiveSection = window.activityArchiveRef;

    if (archiveSection) {
      // Set the active tab to "all" to show all activities
      setActiveTab("all")

      // Scroll to the archive section with GSAP animation
      gsap.to(window, {
        duration: 0.2,
        scrollTo: {
          y: archiveSection,
          offsetY: 40 // Add some offset to account for fixed headers
        },
        ease: "power2.inOut"
      });
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // Initialize progress bar
    const progressBar = document.querySelector(".progress-bar")
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Filter activities based on search query, location, and tab
  const filteredActivities = activitiesData.filter((activity: Activity) => {
    const matchesSearch =
      getLocalizedText(activity.title, lang).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalizedText(activity.description, lang).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalizedText(activity.location, lang).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesYear = selectedYear === "All" || activity.year.toString() === selectedYear
    const matchesLocation = selectedLocationKey === DEFAULT_LOCATION.en || 
      getLocalizedText(activity.location, lang) === getLocalizedText(selectedLocation, lang)

    const matchesTab = activeTab === "all" || (activeTab === "featured" && activity.featured)

    return matchesSearch && matchesYear && matchesLocation && matchesTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const paginatedActivities = filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedYear, selectedLocationKey, activeTab])

  // Update locations to use language-specific values
  const locations = [
    "All",
    ...Array.from(new Set(activitiesData.map(activity => activity.location[language as Language])))
  ]

  return (
    <main className="flex min-h-screen flex-col bg-[#f8faf8] dark:bg-gray-950">
      {/* Activity Gallery Hero Section */}
      <ActivityGalleryHero activities={activitiesData} />

      {/* Featured Activities */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative">
        <div className="absolute inset-0 bg-[#f8faf8]/70 dark:bg-gray-900/50"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <GSAPReveal animation="slide-up">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center rounded-full bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 px-4 py-2 text-base text-[#1e7e34] shadow-sm">
                <Award className="mr-2 h-5 w-5" />
                {language === 'en' ? 'Featured Events' : 'الفعاليات المميزة'}
              </div>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl text-gray-900 dark:text-white leading-tight">
                <span className="relative">
                  {language === 'en' ? 'Highlighted Activities' : 'الأنشطة البارزة'}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/80 to-[#1e7e34]/0"></span>
                </span>
              </h2>
              <p className="mx-auto mt-8 max-w-[800px] text-gray-600 dark:text-gray-300 text-xl">
                {language === 'en' 
                  ? 'A selection of our most impactful recent events and initiatives.'
                  : 'اختيار من أحدث فعالياتنا ومبادراتنا الأكثر تأثيراً'}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-1 lg:grid-cols-3">
            {activitiesData
              .filter((activity) => activity.featured)
              .slice(0, 3)
              .map((activity, index) => (
                <GSAPReveal key={activity.id} animation="slide-up" delay={0.1 * index}>
                  <Link href={`/activities/${activity.id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-2 cursor-pointer group bg-white dark:bg-gray-900 rounded-xl">
                      <div className="aspect-video overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title[language as Language]}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute bottom-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300`}>
                          {activity.year}
                        </div>
                      </div>
                      <CardContent className={`p-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h3 className={`mb-4 font-bold ${language === 'ar' ? 'text-lg line-clamp-3 text-right font-arabic' : 'text-xl line-clamp-2 text-left'} text-gray-900 dark:text-white group-hover:text-[#1e7e34] transition-colors`}>
                          {activity.title[language as Language]}
                        </h3>
                        <div className={`mb-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 ${language === 'ar' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                          <div className={`flex items-center bg-[#e8f5e9] dark:bg-[#1e7e34]/20 px-4 py-1.5 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <Calendar className={`h-4 w-4 text-[#1e7e34] ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                            <span className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{activity.date[language as Language]}</span>
                          </div>
                          <div className={`flex items-center bg-[#e8f5e9] dark:bg-[#1e7e34]/20 px-4 py-1.5 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <MapPin className={`h-4 w-4 text-[#1e7e34] ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                            <span className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{activity.location[language as Language]}</span>
                          </div>
                        </div>
                        <p className={`mb-6 line-clamp-2 text-gray-600 dark:text-gray-300 ${language === 'ar' ? 'text-right font-arabic' : 'text-left'}`}>
                          {activity.description[language as Language]}
                        </p>
                        <Button className={`w-full bg-white dark:bg-gray-900 text-[#1e7e34] border border-[#1e7e34] hover:bg-[#1e7e34] hover:text-white transition-colors group-hover:bg-[#1e7e34] group-hover:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {language === 'en' ? 'Read More' : 'اقرأ المزيد'}
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </GSAPReveal>
              ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 md:py-24 bg-[#1e7e34]/5 dark:bg-[#1e7e34]/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/50 to-[#1e7e34]/0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/50 to-[#1e7e34]/0"></div>
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 rounded-full blur-3xl"></div>
        <div className="absolute -right-24 top-1/3 -translate-y-1/2 w-64 h-64 bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 rounded-full blur-3xl"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <GSAPReveal animation="slide-up">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold sm:text-5xl text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block">
                  {language === 'en' ? 'Our Impact' : 'تأثيرنا'}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/80 to-[#1e7e34]/0"></span>
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 text-xl">
                {language === 'en' 
                  ? 'The collective reach and influence of our activities and programs.'
                  : 'الوصول والتأثير الجماعي لأنشطتنا وبرامجنا'}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            <GSAPReveal animation="fade" delay={0.1}>
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <div className="w-16 h-16 rounded-full bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 flex items-center justify-center mb-4 group-hover:bg-[#1e7e34]/20 dark:group-hover:bg-[#1e7e34]/30 transition-colors">
                  <Award className="h-8 w-8 text-[#1e7e34]" />
                </div>
                <span className="text-5xl font-bold text-[#1e7e34] mb-2">7</span>
                <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {language === 'en' ? 'Events & Activities' : 'الفعاليات والأنشطة'}
                </span>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.2}>
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <div className="w-16 h-16 rounded-full bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 flex items-center justify-center mb-4 group-hover:bg-[#1e7e34]/20 dark:group-hover:bg-[#1e7e34]/30 transition-colors">
                  <Users className="h-8 w-8 text-[#1e7e34]" />
                </div>
                <span className="text-5xl font-bold text-[#1e7e34] mb-2">1,620+</span>
                <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {language === 'en' ? 'Participants' : 'المشاركين'}
                </span>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.3}>
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <div className="w-16 h-16 rounded-full bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 flex items-center justify-center mb-4 group-hover:bg-[#1e7e34]/20 dark:group-hover:bg-[#1e7e34]/30 transition-colors">
                  <MapPin className="h-8 w-8 text-[#1e7e34]" />
                </div>
                <span className="text-5xl font-bold text-[#1e7e34] mb-2">5</span>
                <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {language === 'en' ? 'Cities' : 'الدول'}
                </span>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.4}>
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <div className="w-16 h-16 rounded-full bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 flex items-center justify-center mb-4 group-hover:bg-[#1e7e34]/20 dark:group-hover:bg-[#1e7e34]/30 transition-colors">
                  <ThumbsUp className="h-8 w-8 text-[#1e7e34]" />
                </div>
                <span className="text-5xl font-bold text-[#1e7e34] mb-2">98%</span>
                <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {language === 'en' ? 'Satisfaction Rate' : 'معدل الرضا'}
                </span>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* All Activities */}
      <section
        ref={(el) => {
          if (el) {
            // @ts-ignore - we know this is an HTMLElement
            window.activityArchiveRef = el;
          }
        }}
        className="py-16 md:py-24 bg-white dark:bg-gray-950 relative">
        <div className="container px-4 md:px-6 relative z-10">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center rounded-full bg-[#1e7e34]/10 dark:bg-[#1e7e34]/20 px-4 py-2 text-sm text-[#1e7e34] shadow-sm">
                <Calendar className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Past Events' : 'الفعاليات السابقة'}
              </div>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl text-gray-900 dark:text-white mb-4">
                <span className="relative inline-block">
                  {language === 'en' ? 'Activity Archive' : 'أرشيف الأنشطة'}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/0 via-[#1e7e34]/80 to-[#1e7e34]/0"></span>
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 text-xl">
                {language === 'en' 
                  ? 'Browse our full archive of events, workshops, and initiatives.'
                  : 'تصفح تاريخنا الكامل من الفعاليات وورش العمل والمبادرات'}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto max-w-5xl">
            {/* Search and Filter */}
            <GSAPReveal animation="fade">
              <div className="mb-12 space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                  <Search className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
                  <Input
                    type="search"
                    placeholder={language === 'en' ? "Search activities..." : "البحث في الأنشطة..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full ${language === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-6 text-lg rounded-full border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-[#1e7e34] focus:border-transparent`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Filter Tabs */}
                <GSAPReveal animation="fade" delay={0.1}>
                  <div className="flex justify-center -mt-4 mb-10">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                      <TabsList className="grid w-auto grid-cols-2 bg-[#e8f5e9] dark:bg-[#1e7e34]/20 p-1 rounded-full">
                        <TabsTrigger
                          value="all"
                          className="rounded-full px-6 data-[state=active]:bg-[#1e7e34] data-[state=active]:text-white"
                        >
                          {language === 'en' ? 'All Activities' : 'جميع الأنشطة'}
                        </TabsTrigger>
                        <TabsTrigger
                          value="featured"
                          className="rounded-full px-6 data-[state=active]:bg-[#1e7e34] data-[state=active]:text-white"
                        >
                          {language === 'en' ? 'Highlighted' : 'مميز'}
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </GSAPReveal>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={language === 'en' ? "Year" : "السنة"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">
                        {language === 'en' ? 'All Years' : 'كل السنوات'}
                      </SelectItem>
                      {yearOptions.filter(year => year !== "All").map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select 
                    value={selectedLocationKey} 
                    onValueChange={setSelectedLocationKey}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={language === 'en' ? "Location" : "الموقع"}>
                        {getLocalizedText(selectedLocation, lang)}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((location) => (
                        <SelectItem key={location.en} value={location.en}>
                          {getLocalizedText(location, lang)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GSAPReveal>

            {/* Activities Grid */}
            {paginatedActivities.length > 0 ? (
              <div className="space-y-8">
                {paginatedActivities.map((activity, index) => (
                  <GSAPReveal key={activity.id} animation="fade" delay={0.1 * index}>
                    <Link href={`/activities/${activity.id}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 rounded-xl cursor-pointer group bg-white dark:bg-gray-900">
                        <div className="grid md:grid-cols-3">
                          <div className={`aspect-video md:aspect-square overflow-hidden relative ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                            <img
                              src={activity.image || "/placeholder.svg"}
                              alt={activity.title[language as Language]}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className={`p-6 md:col-span-2 ${language === 'ar' ? 'order-1' : 'order-2'}`}>
                            <div className={`mb-3 flex flex-wrap items-center gap-3 ${language === 'ar' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                              <div className={`text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full ${language === 'ar' ? 'text-right' : ''}`}>{activity.year}</div>
                            </div>
                            <h3 className={`mb-4 font-bold ${language === 'ar' ? 'text-lg line-clamp-3 text-right font-arabic' : 'text-xl line-clamp-2 text-left'} text-gray-900 dark:text-white group-hover:text-[#1e7e34] transition-colors`}>
                              {activity.title[language as Language]}
                            </h3>
                            <div className={`mb-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 ${language === 'ar' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                              <div className={`flex items-center bg-[#e8f5e9] dark:bg-[#1e7e34]/20 px-4 py-1.5 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <Calendar className={`h-4 w-4 text-[#1e7e34] ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                                <span className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{activity.date[language as Language]}</span>
                              </div>
                              <div className={`flex items-center bg-[#e8f5e9] dark:bg-[#1e7e34]/20 px-4 py-1.5 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <MapPin className={`h-4 w-4 text-[#1e7e34] ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                                <span className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{activity.location[language as Language]}</span>
                              </div>
                            </div>
                            <p className={`mb-5 text-gray-600 dark:text-gray-300 line-clamp-2 ${language === 'ar' ? 'text-right' : ''}`}>
                              {activity.description[language as Language]}
                            </p>
                            <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                              <Button className="bg-white dark:bg-gray-900 text-[#1e7e34] border border-[#1e7e34] hover:bg-[#1e7e34] hover:text-white transition-colors group-hover:bg-[#1e7e34] group-hover:text-white shadow-sm">
                                {language === 'en' ? 'Read More' : 'اقرأ المزيد'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </GSAPReveal>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white dark:bg-gray-900 p-12 text-center shadow-md">
                <div className="flex flex-col items-center justify-center">
                  <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">No activities found matching your criteria.</p>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <GSAPReveal animation="fade" delay={0.2}>
                <div className="mt-12 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#1e7e34]/5 dark:hover:bg-[#1e7e34]/20 hover:text-[#1e7e34] hover:border-[#1e7e34] rounded-full shadow-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-gray-600 dark:text-gray-300">
                    {language === 'en' 
                      ? `Page ${currentPage} of ${totalPages}`
                      : `الصفحة ${currentPage} من ${totalPages}`}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#1e7e34]/5 dark:hover:bg-[#1e7e34]/20 hover:text-[#1e7e34] hover:border-[#1e7e34] rounded-full shadow-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </GSAPReveal>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events CTA */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-[#f8faf8]/70"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#34a853]/30 via-[#34a853]/80 to-[#34a853]/30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#34a853]/5 rounded-full"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#34a853]/5 rounded-full"></div>

            <GSAPReveal animation="slide-up">
              <div className="inline-flex items-center justify-center rounded-full bg-[#34a853]/10 px-4 py-2 text-sm text-[#34a853] shadow-sm mb-4 mx-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Stay Connected' : 'ابق على تواصل'}
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4 text-center">
                {language === 'en' ? 'Join Our Upcoming Events' : 'انضم إلى فعالياتنا القادمة'}
              </h2>
              <p className="mx-auto mb-8 max-w-[700px] text-gray-600 text-lg text-center">
                {language === 'en' 
                  ? 'Stay connected with our community and participate in our upcoming workshops, seminars, and networking opportunities.'
                  : 'ابق على تواصل مع مجتمعنا وشارك في ورش العمل والندوات وفرص التواصل القادمة.'}
              </p>
              <div className="mt-8 text-center">
                <Link href="/contact">
                  <Button className="bg-[#34a853] text-white hover:bg-[#2d9249] px-8 py-6 text-lg font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    {language === 'en' ? 'Subscribe to Event Updates' : 'تواصل معنا'}
                  </Button>
                </Link>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Gallery Modal for individual activities */}
      {galleryActivity && (
        <div className="container px-4 md:px-6 py-16">
          <ActivityGallery activity={galleryActivity} />
        </div>
      )}
    </main>
  )
}
