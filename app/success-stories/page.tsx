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

// Mock success stories data with translations
const successStoriesData = [
  {
    id: 1,
    slug: "ahmed-hassan",
    name: {
      en: "Ahmed Hassan",
      ar: "أحمد حسن"
    },
    degree: {
      en: "PhD in Computer Science",
      ar: "دكتوراه في علوم الحاسوب"
    },
    university: {
      en: "Istanbul Technical University",
      ar: "جامعة إسطنبول التقنية"
    },
    quote: {
      en: "The support from the Palestinian Student Fund transformed my academic journey and opened doors I never thought possible.",
      ar: "دعم مؤسسة إسنَاد لدعم الطالب الفلسطيني غير مسيرتي الأكاديمية وفتح أمامي أبواباً لم أكن أتخيلها ممكنة."
    },
    category: "PhD",
    featured: true,
    country: "Turkey",
    year: 2022,
  },
  {
    id: 2,
    slug: "layla-mahmoud",
    name: {
      en: "Layla Mahmoud",
      ar: "ليلى محمود"
    },
    degree: {
      en: "Master's in Public Health",
      ar: "ماجستير في الصحة العامة"
    },
    university: {
      en: "Ankara University",
      ar: "جامعة أنقرة"
    },
    quote: {
      en: "Thanks to the scholarship program, I was able to pursue my dream of working in healthcare policy to help communities in need.",
      ar: "بفضل برنامج المنح الدراسية، تمكنت من تحقيق حلمي في العمل في سياسات الرعاية الصحية لمساعدة المجتمعات المحتاجة."
    },
    category: "Master's",
    featured: true,
    country: "Turkey",
    year: 2021,
  },
  {
    id: 3,
    slug: "omar-khalidi",
    name: {
      en: "Omar Khalidi",
      ar: "عمر خليدي"
    },
    degree: {
      en: "Bachelor's in Mechanical Engineering",
      ar: "بكالوريوس في الهندسة الميكانيكية"
    },
    university: {
      en: "Boğaziçi University",
      ar: "جامعة بوغازيشي"
    },
    quote: {
      en: "From refugee camps to engineering labs, my journey would not have been possible without the foundation's unwavering support.",
      ar: "من مخيمات الهجرة إلى أبحاث الهندسة الميكانيكية، لم تكن رحلتي ممكنة بدون دعم الأساسي المستمر."
    },
    category: "Bachelor's",
    featured: false,
    country: "Turkey",
    year: 2023,
  },
  {
    id: 4,
    slug: "nour-al-jabari",
    name: {
      en: "Nour Al-Jabari",
      ar: "نور الجباري"
    },
    degree: {
      en: "PhD in Biochemistry",
      ar: "دكتوراه في الكيمياء الحيوية"
    },
    university: {
      en: "Sabancı University",
      ar: "جامعة صباحكي"
    },
    quote: {
      en: "The mentorship program connected me with leading researchers in my field, helping me publish my work in international journals.",
      ar: "برنامج الإشراف الذي سمح لي بالتواصل مع الباحثين المتقدمين في مجالي، مساعدتي في نشر عملي في المجلات الدولية."
    },
    category: "PhD",
    featured: false,
    country: "Turkey",
    year: 2020,
  },
  {
    id: 5,
    slug: "sami-barakat",
    name: {
      en: "Sami Barakat",
      ar: "سامي بركات"
    },
    degree: {
      en: "Master's in Architecture",
      ar: "ماجستير في الهندسة المعمارية"
    },
    university: {
      en: "Middle East Technical University",
      ar: "جامعة خليج الشرق الأوسط التقنية"
    },
    quote: {
      en: "Studying architecture has given me the tools to envision rebuilding my homeland. This scholarship was the foundation of that dream.",
      ar: "دراسة الهندسة المعمارية أعطاني الأدوات لتخيل بناء بلدي. كانت هذه المنحة الأساسية لهذا الحلم."
    },
    category: "Master's",
    featured: true,
    country: "Turkey",
    year: 2022,
  },
  {
    id: 6,
    slug: "rania-abed",
    name: {
      en: "Rania Abed",
      ar: "رانيا عبد"
    },
    degree: {
      en: "Bachelor's in Computer Engineering",
      ar: "بكالوريوس في الهندسة الكمبيوترية"
    },
    university: {
      en: "Bilkent University",
      ar: "جامعة بيلكنت"
    },
    quote: {
      en: "As a woman in STEM, I faced many challenges. The foundation provided not just financial support, but a community that believed in me.",
      ar: "كانت الهندسة الكمبيوترية مجالًا صعبًا للإنسان، لكن الأساسية توفرت عليّ دعمًا غير ماليًا بالإضافة إلى مجموعة تؤمن بي."
    },
    category: "Bachelor's",
    featured: false,
    country: "Turkey",
    year: 2021,
  },
  {
    id: 7,
    slug: "kareem-nasser",
    name: {
      en: "Kareem Nasser",
      ar: "كريم ناصر"
    },
    degree: {
      en: "PhD in Political Science",
      ar: "دكتوراه في العلوم السياسية"
    },
    university: {
      en: "Koç University",
      ar: "جامعة خوك"
    },
    quote: {
      en: "My research on conflict resolution was made possible through this scholarship. I'm now working with international organizations on peace initiatives.",
      ar: "دراستي على حل الصراعات كانت ممكنة بفضل هذه المنحة، وأنا الآن أعمل مع منظمات دولية لتنفيذ مبادرات السلام."
    },
    category: "PhD",
    featured: false,
    country: "Turkey",
    year: 2019,
  },
  {
    id: 8,
    slug: "leila-hamdan",
    name: {
      en: "Leila Hamdan",
      ar: "ليلى حمدان"
    },
    degree: {
      en: "Master's in Environmental Engineering",
      ar: "ماجستير في الهندسة البيئية"
    },
    university: {
      en: "Yıldız Technical University",
      ar: "جامعة إيلديز التقنية"
    },
    quote: {
      en: "Studying environmental engineering has equipped me with the knowledge to address water scarcity issues in Palestine.",
      ar: "دراسة الهندسة البيئية أعطتني المعرفة لمعالجة أزمة نقص المياه في فلسطين."
    },
    category: "Master's",
    featured: false,
    country: "Turkey",
    year: 2020,
  },
  {
    id: 9,
    slug: "yousef-darwish",
    name: {
      en: "Yousef Darwish",
      ar: "يوسف درويش"
    },
    degree: {
      en: "Bachelor's in Medicine",
      ar: "بكالوريوس في الطب"
    },
    university: {
      en: "Hacettepe University",
      ar: "جامعة حسيتيب"
    },
    quote: {
      en: "Becoming a doctor was my childhood dream. Now I can return to Gaza with the skills to help my community's healthcare system.",
      ar: "كون طبيباً كان حلمي منذ الطفولة، والآن أستطيع أن أعود إلى غزة مع المهارات لمساعدة نظام الرعاية الصحية في مجتمعي."
    },
    category: "Bachelor's",
    featured: false,
    country: "Turkey",
    year: 2022,
  },
]

export default function SuccessStoriesPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
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
      story.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.degree[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.university[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.quote[language].toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory
    const matchesYear = selectedYear === "All" || story.year.toString() === selectedYear
    const matchesTab = activeTab === "all" || (activeTab === "featured" && story.featured)

    return matchesSearch && matchesCategory && matchesYear && matchesTab
  })

  // Pagination
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage)
  const paginatedStories = filteredStories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedYear, activeTab])

  // Categories for filtering with translations
  const categories = [
    "All",
    t("success_stories.categories.bachelors") as string,
    t("success_stories.categories.masters") as string,
    t("success_stories.categories.phd") as string
  ]
  const years = ["All", "2023", "2022", "2021", "2020", "2019"]

  return (
    <main className="flex min-h-screen flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-screen w-full text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/story.png"
            alt={t("success_stories.hero_alt") as string}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {/* Page Indicator */}
        <div className={`absolute bottom-6 ${isRTL ? 'left-6' : 'right-6'} md:bottom-8 ${isRTL ? 'md:left-8' : 'md:right-8'} z-10`}>
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 border border-white/20">
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className={`text-white text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>{t("success_stories.page_indicator") as string}</span>
            </div>
          </div>
        </div>
        <div className="container relative z-10 px-4 md:px-6 h-full flex items-center justify-center">
          <div className="mx-auto max-w-5xl text-center">
            <GSAPTextReveal className={`text-5xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl drop-shadow-2xl ${isRTL ? 'font-arabic' : 'font-sora'} min-h-[200px] flex items-center justify-center`}>
              <div className="flex flex-row items-center gap-4">
                <span>{t("success_stories.title") as string}</span>
              </div>
            </GSAPTextReveal>
            <GSAPReveal animation="fade" delay={0.3}>
              <p className={`mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-xl max-w-4xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {t("success_stories.subtitle") as string}
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
              <div className={`inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Quote className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                <span className={isRTL ? 'font-arabic' : ''}>{t("success_stories.inspiring_journeys") as string}</span>
              </div>
              <h2 className={`mt-2 text-3xl font-bold tracking-tighter sm:text-4xl ${isRTL ? 'font-arabic' : ''}`}>
                {t("success_stories.featured_stories") as string}
              </h2>
              <p className={`mx-auto mt-4 max-w-[700px] text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {t("success_stories.featured_description") as string}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {successStoriesData
              .filter((story) => story.featured)
              .slice(0, 2)
              .map((story, index) => (
                <GSAPReveal key={story.id} animation="slide-up" delay={0.1 * index}>
                  <Link href={`/success-stories/${story.slug}`}>
                    <SuccessStoryCard
                      name={story.name[language]}
                      degree={story.degree[language]}
                      university={story.university[language]}
                      quote={story.quote[language]}
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
                {t("success_stories.mandela_quote") as string}
              </p>
              <p className="mt-4 text-lg text-[#1e7e34] relative z-10">{t("success_stories.mandela_author") as string}</p>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* All Success Stories */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <div className={`inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Search className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                <span className={isRTL ? 'font-arabic' : ''}>{t("success_stories.browse_stories") as string}</span>
              </div>
              <h2 className={`mt-2 text-3xl font-bold tracking-tighter sm:text-4xl ${isRTL ? 'font-arabic' : ''}`}>
                {t("success_stories.all_stories") as string}
              </h2>
              <p className={`mx-auto mt-4 max-w-[700px] text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {t("success_stories.browse_description") as string}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto max-w-5xl">
            {/* Search and Filter */}
            <GSAPReveal animation="fade">
              <div className="mb-8 grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground`} />
                  <Input
                    placeholder={t("success_stories.search_placeholder") as string}
                    className={isRTL ? 'pr-10 text-right' : 'pl-10'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className={isRTL ? 'text-right' : ''}>
                      <SelectValue placeholder={t("success_stories.degree_level") as string} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className={isRTL ? 'text-right' : ''}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className={isRTL ? 'text-right' : ''}>
                      <SelectValue placeholder={t("success_stories.graduation_year") as string} />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year} className={isRTL ? 'text-right' : ''}>
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
                <div className="flex justify-center">
                  <TabsList className={`grid w-full max-w-md grid-cols-2 bg-[#1e7e34]/5 dark:bg-[#1e7e34]/10 ${isRTL ? 'font-arabic' : ''}`}>
                    <TabsTrigger
                      value="all"
                      className={`data-[state=active]:bg-[#1e7e34] data-[state=active]:text-white text-center ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t("success_stories.tabs.all") as string}
                    </TabsTrigger>
                    <TabsTrigger
                      value="featured"
                      className={`data-[state=active]:bg-[#1e7e34] data-[state=active]:text-white text-center ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {t("success_stories.tabs.featured") as string}
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </GSAPReveal>

            {/* Stories Grid */}
            {paginatedStories.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedStories.map((story, index) => (
                  <GSAPReveal key={story.id} animation="fade" delay={0.1 * index}>
                    <Link href={`/success-stories/${story.slug}`} className="block h-full">
                      <div className={`group relative h-full overflow-hidden rounded-lg border border-[#1e7e34]/20 bg-card transition-all hover:shadow-md ${isRTL ? 'text-right' : 'text-left'} p-6`}>
                        <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <h3 className={`text-xl font-bold group-hover:text-[#1e7e34] ${isRTL ? 'font-arabic' : ''}`}>{story.name[language]}</h3>
                          <p className={`text-[#1e7e34] ${isRTL ? 'text-right' : 'text-left'}`}>{story.degree[language]}</p>
                          <p className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>{story.university[language]}</p>
                          <p className={`italic text-muted-foreground ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>"{story.quote[language].substring(0, 100)}..."</p>
                          <div className={`text-sm font-medium text-[#1e7e34] ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className={isRTL ? 'font-arabic' : ''}>{t("success_stories.read_full_story") as string}</span>
                              <ArrowRight className={`${isRTL ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4 transition-transform group-hover:translate-x-1`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </GSAPReveal>
                ))}
              </div>
            ) : (
              <div className={`rounded-lg border border-dashed p-8 text-center ${isRTL ? 'font-arabic' : ''}`}>
                <p className="text-muted-foreground">{t("success_stories.no_stories_found") as string}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <GSAPReveal animation="fade" delay={0.2}>
                <div className={`mt-8 flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      className={`${currentPage === index + 1 ? 'bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90' : ''} ${isRTL ? 'font-arabic' : ''}`}
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
                    <ChevronRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
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
              <div className={`inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34] ${isRTL ? 'flex-row-reverse' : ''} relative z-10`}>
                <Quote className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                <span className={`${isRTL ? 'font-arabic' : ''} relative z-10`}>{t("success_stories.your_journey_matters") as string}</span>
              </div>
              <h2 className={`mt-2 text-2xl font-bold tracking-tighter sm:text-3xl text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''} relative z-10`}>
                {t("success_stories.share_story_title") as string}
              </h2>
              <p className={`mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic' : ''} relative z-10`}>
                {t("success_stories.share_story_description") as string}
              </p>
              <div className="mt-6 relative z-10">
                <Link href="/contact">
                  <Button className={`bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90 dark:bg-[#1e7e34] dark:text-white dark:hover:bg-[#1e7e34]/90 ${isRTL ? 'font-arabic' : ''}`}>
                    {t("success_stories.submit_story") as string}
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
