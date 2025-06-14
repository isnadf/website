"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsCard from "@/components/news-card"
import { useLanguage } from "@/components/language-provider"

// Mock news data with bilingual support
const newsData = [
  {
    id: 1,
    title: {
      en: "Completion of First Phase of Pulse of Life Scholarship Interviews",
      ar: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة"
    },
    date: "May 25, 2025",
    excerpt: {
      en: "The Isnad Foundation for Palestinian Student Support concluded, on Saturday, May 25, 2025, the first phase of the 'Pulse of Life' scholarship interviews, which extended over three weeks starting from May 5, with the participation of dozens of outstanding Palestinian students in the field of human medicine.",
      ar: "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري."
    },
    image: "/LastNews/pulseOfLife-end.png",
    href: "/news/nabd-al-hayat-scholarship-interviews",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    featured: true,
  },
  {
    id: 2,
    title: {
      en: "Continuation of First Phase Interviews for Pulse of Life Scholarship to Select 100 Students from Gaza",
      ar: "استمرار مقابلات المرحلة الأولى من منحة نبض الحياة لاختيار 100 طالب من غزة للاستفادة من البرنامج"
    },
    date: "May 5, 2025",
    excerpt: {
      en: "The first phase interviews of the Pulse of Life program, implemented by the Isnad Palestinian Student Fund in partnership with Alkhidmat Europe, continued today, Monday, targeting Palestinian medical students, especially in the Gaza Strip.",
      ar: "تواصلت اليوم الإثنين مقابلات المرحلة الأولى من برنامج منحة نبض الحياة، الذي تنفذه مؤسسة إسنَاد لدعم الطالب الفلسطيني بالشراكة مع مؤسسة الخدمات أوروبا (Alkhidmat Europe)، والتي تستهدف طلبة الطب الفلسطينيين خاصة في قطاع غزة."
    },
    image: "/LastNews/pulseOfLife-start.png",
    href: "/news/nabd-al-hayat-grant-interviews",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    featured: true,
  },
  {
    id: 3,
    title: {
      en: "Isnad Conducts Support Tours in Six Countries and Provides Educational Grants to Gaza Students",
      ar: "إسناد تنفذ جولات دعم في ست دول وتقدم منحًا تعليمية لطلاب غزة"
    },
    date: "June 06, 2024",
    excerpt: {
      en: "Since the beginning of the genocide war in the Gaza Strip, the Isnad Foundation for Palestinian Student Support has implemented a series of meetings and events in several countries including Turkey, Egypt, Mauritania, Kyrgyzstan, Malaysia, and the Gaza Strip, as part of its urgent response to the needs of Palestinian students affected by the ongoing war on the Gaza Strip since October 2023.",
      ar: "نفذت مؤسسة إسناد لدعم الطالب الفلسطيني منذ بدء حرب الإبادة في قطاع غزة سلسلة من اللقاءات والفعاليات في عدد من الدول شملت تركيا، مصر، موريتانيا، قرغيزستان، ماليزيا، وقطاع غزة، وذلك في إطار استجابتها العاجلة لاحتياجات الطلبة الفلسطينيين المتضررين من الحرب المستمرة على قطاع غزة منذ أكتوبر 2023."
    },
    image: "/LastNews/new3.jpeg",
    href: "/news/isnad-support-tour",
    category: {
      en: "Education & Humanitarian Support",
      ar: "التعليم والدعم الإنساني"
    },
    featured: true,
  },
  {
    id: 4,
    title:{
      en: "Disbursements of the first phase of the Pulse of Life program have begun in Türkiye.",
      ar: "بدء صرف منح المرحلة الأولى من برنامج نبض الحياة في تركيا",
    },
    date: "June 06, 2024",
    excerpt: {
      en: "The Isnad Foundation for Palestinian Student Support announced the commencement of disbursing scholarships to students benefiting from the first phase of the Nabd Al-Hayat program, starting May 1, 2025, in partnership with and with the generous support of the Turkish National Youth Association (MGV - Milli Gençlik Vakfı).",
      ar: "علنت مؤسسة إسناد لدعم الطالب الفلسطيني عن بدء صرف المنح الدراسية للطلبة المستفيدين ضمن المرحلة الأولى من برنامج نبض الحياة، وذلك اعتبارًا من 1 مايو 2025، بالشراكة والدعم الكريم من جمعية الشباب الوطني التركي (MGV - Milli Gençlik Vakfı)."
    },
    image: "/LastNews/latestnews4.jpeg",
    href: "/news/pulse-of-life-disbursement",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    featured: true,
  }
]

// Categories for filtering with bilingual support
const categories = [
  { value: "all", label: { en: "All", ar: "الكل" } },
  { value: "scholarships", label: { en: "Scholarships", ar: "المنح الدراسية" } },
  { value: "education", label: { en: "Education & Humanitarian Support", ar: "التعليم والدعم الإنساني" } }
]

export default function NewsPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 6

  // Filter news based on search query, category, and tab
  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "scholarships" && news.category[language] === categories[1].label[language]) ||
      (selectedCategory === "education" && news.category[language] === categories[2].label[language])

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && news.featured) ||
      (activeTab === "recent" && new Date(news.date).getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000)

    return matchesSearch && matchesCategory && matchesTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, activeTab])

  return (
    <main className="flex min-h-screen flex-col" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/LastNews/1.png"
            alt={t("news.hero.alt") as string}
            className="h-full w-full object-contain object-center"
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

          <div className="mx-auto grid max-w-10xl gap-x-16 gap-y-8 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {newsData
              .filter((news) => news.featured)
              .slice(0, 3)
              .map((news, index) => (
                <NewsCard
                  key={news.id}
                  title={news.title[language]}
                  date={news.date}
                  excerpt={news.excerpt[language]}
                  image={news.image}
                  href={news.href}
                />
              ))}
          </div>
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
            {paginatedNews.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedNews.map((news, index) => (
                  <div key={news.id} className="group relative overflow-hidden rounded-lg border-2 border-[#1e7e34]/20 bg-card transition-all hover:shadow-md dark:bg-gray-900 dark:border-[#1e7e34]/30">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={news.image || "/cover3.png"}
                        alt={news.title[language]}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
