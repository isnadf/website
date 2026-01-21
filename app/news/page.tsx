"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import NewsCard from "@/components/news-card"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { NewsListItem } from "@/types/news"
import ProgressSpinnerDemo from "@/components/progress/spinner"

// Helper function to format date from YYYY-MM-DD to "Month Day, Year"
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export default function NewsPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const heroImageSrc = isRTL ? "/LastNews/new-lastnews-ar.png" : "/LastNews/new-lastnews.jpg"
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [newsData, setNewsData] = useState<NewsListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 6

  // Fetch news data from API
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        // Format dates
        const formattedData = data.map((item: NewsListItem & { date: string }) => ({
          ...item,
          date: formatDate(item.date)
        }))
        setNewsData(formattedData)
        setError(null)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Failed to load news. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Filter news based on search query and tab
  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && news.featured) ||
      (activeTab === "recent" && new Date(news.date).getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000)

    return matchesSearch && matchesTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab])

  return (
    <main className="flex min-h-screen flex-col" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageSrc}
            alt={t("news.hero.alt") as string}
            className="h-full w-full object-contain object-center"
            width={1920}
            height={1080}
          />
        </div>
        {/* Page Indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className="text-white text-xs sm:text-sm font-medium">{t("news.latest")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
              <Filter className="mr-1 h-4 w-4" />
              {t("news.featured.badge")}
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl text-black dark:text-white">{t("news.featured.title")}</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              {t("news.featured.subtitle")}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <ProgressSpinnerDemo />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : newsData.filter((news) => news.featured).length > 0 ? (
          <div className="mx-auto grid max-w-10xl gap-x-16 gap-y-8 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {newsData
              .filter((news) => news.featured)
              .slice(0, 3)
              .map((news) => (
                <NewsCard
                  key={news.id}
                  title={news.title[language]}
                  date={news.date}
                  excerpt={news.excerpt[language]}
                    image={news.image || "/cover3.png"}
                  href={news.href}
                />
              ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{language === 'ar' ? 'لا توجد أخبار مميزة حالياً' : 'No featured news at the moment'}</p>
            </div>
          )}
        </div>
      </section>

      {/* News Archive */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Calendar className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
              {t("news.archive.badge")}
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl text-black dark:text-white text-center">{t("news.archive.title")}</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
              {t("news.archive.subtitle")}
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            {/* Search and Filter */}
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(0,76%,40%)] dark:text-[hsl(0,76%,50%)]`} />
                <Input
                  placeholder={t("news.search.placeholder") as string}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} border-[hsl(120,61%,34%)]/20 focus-visible:ring-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="text-center">
                      {t("news.tabs.all")}
                    </TabsTrigger>
                    <TabsTrigger value="featured" className="text-center">
                      {t("news.tabs.featured")}
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="text-center">
                      {t("news.tabs.recent")}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* News Grid */}
            {loading ? (
              <div className="text-center py-12">
                <ProgressSpinnerDemo />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : paginatedNews.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedNews.map((news) => (
                  <div key={news.id} className="group relative overflow-hidden rounded-lg border-2 border-[#1e7e34]/20 bg-card transition-all hover:shadow-md dark:bg-gray-900 dark:border-[#1e7e34]/30">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={news.image || "/cover3.png"}
                        alt={news.title[language]}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-3 space-y-2" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <div className="flex flex-wrap items-start gap-2" style={{ 
                          justifyContent: isRTL ? 'flex-end' : 'flex-start',
                          flexDirection: isRTL ? 'row-reverse' : 'row'
                        }}>
                          <Badge 
                            variant="outline" 
                            className="bg-[hsl(0,76%,40%)]/10 text-[hsl(0,76%,40%)] dark:bg-[hsl(0,76%,40%)]/20 dark:text-[hsl(0,76%,50%)] text-xs leading-tight"
                          >
                            {news.category[language]}
                          </Badge>
                        </div>
                        <div 
                          className="flex items-center text-sm text-[hsl(0,76%,40%)] dark:text-[hsl(0,76%,50%)]" 
                          style={{ 
                            justifyContent: isRTL ? 'flex-end' : 'flex-start',
                            flexDirection: isRTL ? 'row-reverse' : 'row'
                          }}
                        >
                          <Calendar className={`${isRTL ? 'ml-1' : 'mr-1'} h-3 w-3`} />
                          <span>{news.date}</span>
                        </div>
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-xl font-bold text-black dark:text-white" style={{ textAlign: isRTL ? 'right' : 'left' }}>{news.title[language]}</h3>
                      <p className="mb-4 line-clamp-3 text-muted-foreground" style={{ textAlign: isRTL ? 'right' : 'left' }}>{news.excerpt[language]}</p>
                      <a
                        href={news.href}
                        className="inline-flex items-center text-sm font-medium text-[hsl(120,61%,34%)] hover:underline dark:text-[hsl(120,61%,44%)]"
                        style={{ 
                          flexDirection: isRTL ? 'row-reverse' : 'row',
                          justifyContent: isRTL ? 'flex-end' : 'flex-start'
                        }}
                      >
                        {t("news.readMore")}
                        <ArrowRight className={`${isRTL ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-[hsl(0,76%,40%)]/20 dark:border-[hsl(0,76%,40%)]/30 p-8 text-center">
                <p className="text-[hsl(0,76%,40%)] dark:text-[hsl(0,76%,50%)]" style={{ textAlign: isRTL ? 'right' : 'left' }}>{t("news.noResults")}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-[hsl(120,61%,34%)]/30 hover:bg-[hsl(120,61%,34%)]/10 hover:text-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30 dark:hover:bg-[hsl(120,61%,34%)]/20 dark:hover:text-[hsl(120,61%,44%)]"
                >
                  <ChevronLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-[hsl(120,61%,34%)]/30 hover:bg-[hsl(120,61%,34%)]/10 hover:text-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30 dark:hover:bg-[hsl(120,61%,34%)]/20 dark:hover:text-[hsl(120,61%,44%)]"
                >
                  <ChevronRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
