"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Search, Filter, ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import SuccessStoryCard from "@/components/success-story-card"
import { useLanguage } from "@/components/language-provider"

// Mock success stories data
const successStoriesData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    degree: "PhD in Computer Science",
    university: "Istanbul Technical University",
    quote:
      "The support from the Palestinian Student Fund transformed my academic journey and opened doors I never thought possible.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/ahmed-hassan",
    category: "PhD",
    featured: true,
    country: "Turkey",
    year: 2022,
  },
  {
    id: 2,
    name: "Layla Mahmoud",
    degree: "Master's in Public Health",
    university: "Ankara University",
    quote:
      "Thanks to the scholarship program, I was able to pursue my dream of working in healthcare policy to help communities in need.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/layla-mahmoud",
    category: "Master's",
    featured: true,
    country: "Turkey",
    year: 2021,
  },
  {
    id: 3,
    name: "Omar Khalidi",
    degree: "Bachelor's in Mechanical Engineering",
    university: "Boğaziçi University",
    quote:
      "From refugee camps to engineering labs, my journey would not have been possible without the foundation's unwavering support.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/omar-khalidi",
    category: "Bachelor's",
    featured: false,
    country: "Turkey",
    year: 2023,
  },
  {
    id: 4,
    name: "Nour Al-Jabari",
    degree: "PhD in Biochemistry",
    university: "Sabancı University",
    quote:
      "The mentorship program connected me with leading researchers in my field, helping me publish my work in international journals.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/nour-al-jabari",
    category: "PhD",
    featured: false,
    country: "Turkey",
    year: 2020,
  },
  {
    id: 5,
    name: "Sami Barakat",
    degree: "Master's in Architecture",
    university: "Middle East Technical University",
    quote:
      "Studying architecture has given me the tools to envision rebuilding my homeland. This scholarship was the foundation of that dream.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/sami-barakat",
    category: "Master's",
    featured: true,
    country: "Turkey",
    year: 2022,
  },
  {
    id: 6,
    name: "Rania Abed",
    degree: "Bachelor's in Computer Engineering",
    university: "Bilkent University",
    quote:
      "As a woman in STEM, I faced many challenges. The foundation provided not just financial support, but a community that believed in me.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/rania-abed",
    category: "Bachelor's",
    featured: false,
    country: "Turkey",
    year: 2021,
  },
  {
    id: 7,
    name: "Kareem Nasser",
    degree: "PhD in Political Science",
    university: "Koç University",
    quote:
      "My research on conflict resolution was made possible through this scholarship. I'm now working with international organizations on peace initiatives.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/kareem-nasser",
    category: "PhD",
    featured: false,
    country: "Turkey",
    year: 2019,
  },
  {
    id: 8,
    name: "Leila Hamdan",
    degree: "Master's in Environmental Engineering",
    university: "Yıldız Technical University",
    quote:
      "Studying environmental engineering has equipped me with the knowledge to address water scarcity issues in Palestine.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/leila-hamdan",
    category: "Master's",
    featured: false,
    country: "Turkey",
    year: 2020,
  },
  {
    id: 9,
    name: "Yousef Darwish",
    degree: "Bachelor's in Medicine",
    university: "Hacettepe University",
    quote:
      "Becoming a doctor was my childhood dream. Now I can return to Gaza with the skills to help my community's healthcare system.",
    image: "/placeholder.svg?height=300&width=300",
    href: "/success-stories/yousef-darwish",
    category: "Bachelor's",
    featured: false,
    country: "Turkey",
    year: 2022,
  },
]

export default function SuccessStoriesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 6

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

  // Filter stories based on search query, category, country, year, and tab
  const filteredStories = successStoriesData.filter((story) => {
    const matchesSearch =
      story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.quote.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory
    const matchesCountry = true // Country filter removed
    const matchesYear = selectedYear === "All" || story.year.toString() === selectedYear

    const matchesTab = activeTab === "all" || (activeTab === "featured" && story.featured)

    return matchesSearch && matchesCategory && matchesCountry && matchesYear && matchesTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage)
  const paginatedStories = filteredStories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedYear, activeTab])

  // Categories for filtering
  const categories = ["All", t("success_stories.categories.bachelors"), t("success_stories.categories.masters"), t("success_stories.categories.phd")]
  const years = ["All", "2023", "2022", "2021", "2020", "2019"]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/story.png"
            alt="Success Stories - Students"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {/* Page Indicator */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className="text-white text-sm font-medium">{t("success_stories.page_indicator")}</span>
            </div>
          </div>
        </div>
        <div className="container relative z-10 px-4 md:px-6 h-full flex items-center justify-center">
          <div className="mx-auto max-w-5xl text-center">
            <GSAPTextReveal className="text-5xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl drop-shadow-2xl font-sora h-40">
              {t("success_stories.title")}
            </GSAPTextReveal>
            <GSAPReveal animation="fade" delay={0.3}>
              <p className="mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-xl max-w-4xl mx-auto leading-relaxed">
                {t("success_stories.subtitle")}
              </p>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
                <Quote className="mr-1 h-4 w-4" />
                {t("success_stories.inspiring_journeys")}
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl">{t("success_stories.featured_stories")}</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
                {t("success_stories.featured_description")}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {successStoriesData
              .filter((story) => story.featured)
              .slice(0, 2)
              .map((story, index) => (
                <GSAPReveal key={story.id} animation="slide-up" delay={0.1 * index}>
                  <Link href={story.href}>
                    <SuccessStoryCard
                      name={story.name}
                      degree={story.degree}
                      university={story.university}
                      quote={story.quote}
                      image={story.image}
                    />
                  </Link>
                </GSAPReveal>
              ))}
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-16 md:py-24 bg-[#f8faf8] relative">
        <div className="absolute inset-0 bg-[#f8faf8]/70"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/30 via-[#1e7e34]/80 to-[#1e7e34]/30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <GSAPReveal animation="fade">
              <Quote className="mx-auto mb-6 h-16 w-16 opacity-20 text-[#1e7e34] relative z-10" />
              <p className="text-2xl font-medium italic md:text-3xl text-gray-900 dark:text-white relative z-10">
                {t("success_stories.mandela_quote")}
              </p>
              <p className="mt-4 text-lg text-[#1e7e34] relative z-10">{t("success_stories.mandela_author")}</p>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* All Success Stories */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
                <Search className="mr-1 h-4 w-4" />
                {t("success_stories.browse_stories")}
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl">{t("success_stories.all_stories")}</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
                {t("success_stories.browse_description")}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto max-w-5xl">
            {/* Search and Filter */}
            <GSAPReveal animation="fade">
              <div className="mb-8 grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={t("success_stories.search_placeholder") as string}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("success_stories.degree_level")} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category as string} value={category as string}>
                          {category as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("success_stories.graduation_year")} />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GSAPReveal>

            {/* Tabs */}
            <GSAPReveal animation="fade" delay={0.1}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-[#1e7e34]/5 dark:bg-[#1e7e34]/10">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-[#1e7e34] data-[state=active]:text-white"
                  >
                    {t("success_stories.tabs.all")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="featured"
                    className="data-[state=active]:bg-[#1e7e34] data-[state=active]:text-white"
                  >
                    {t("success_stories.tabs.featured")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </GSAPReveal>

            {/* Stories Grid */}
            {paginatedStories.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedStories.map((story, index) => (
                  <GSAPReveal key={story.id} animation="fade" delay={0.1 * index}>
                    <Link href={story.href} className="block h-full">
                      <div className="group relative h-full overflow-hidden rounded-lg border border-[#1e7e34]/20 bg-card transition-all hover:shadow-md">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={story.image || "/placeholder.svg"}
                            alt={story.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="mb-1 text-xl font-bold group-hover:text-[#1e7e34]">{story.name}</h3>
                          <p className="text-[#1e7e34]">{story.degree}</p>
                          <p className="mb-3 text-sm text-muted-foreground">{story.university}</p>
                          <p className="italic text-muted-foreground">"{story.quote.substring(0, 100)}..."</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-[#1e7e34]">
                            {t("success_stories.read_full_story")}
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </GSAPReveal>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-muted-foreground">{t("success_stories.no_stories_found")}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <GSAPReveal animation="fade" delay={0.2}>
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      className={currentPage === index + 1 ? "bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90" : ""}
                      size="icon"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </GSAPReveal>
            )}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-16 md:py-24 bg-[#f8faf8] relative">
        <div className="absolute inset-0 bg-[#f8faf8]/70"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/30 via-[#1e7e34]/80 to-[#1e7e34]/30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <GSAPReveal animation="slide-up">
              <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34] relative z-10">
                <Quote className="mr-1 h-4 w-4" />
                {t("success_stories.your_journey_matters")}
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tighter sm:text-3xl text-gray-900 dark:text-white relative z-10">
                {t("success_stories.share_story_title")}
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 relative z-10">
                {t("success_stories.share_story_description")}
              </p>
              <div className="mt-6 relative z-10">
                <Link href="/contact">
                  <Button className="bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90 dark:bg-[#1e7e34] dark:text-white dark:hover:bg-[#1e7e34]/90">
                    {t("success_stories.submit_story")}
                  </Button>
                </Link>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
