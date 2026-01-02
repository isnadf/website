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

// Mock news data with bilingual support
const newsData = [
  {
    id: 8,
    title: {
      en: "Pulse of Life Scholarship Supports Medical Students in Gaza in Partnership with Biman Foundation",
      ar: "منحة نبض الحياة تدعم طلبة الطب في غزة بالشراكة مع مؤسسة بيمان"
    },
    date: "January 1, 2026",
    excerpt: {
      en: "As part of the “Pulse of Life” Scholarship, Isnad foundation for Palestinian student support continues its efforts to empower Palestinian students, in cooperation with Biman Foundation, by providing scholarships for medical students in the Gaza Strip, aimed at supporting their academic journey and enhancing their ability to continue their education despite the challenges. Together, we plant hope and build a future our students deserve.",
      ar: "في إطار منحة “نبض الحياة” تواصل مؤسسة إسناد لدعم الطالب الفلسطيني جهودها في تمكين الطلبة الفلسطينيين، وذلك بالتعاون مع مؤسسة بيمان، من خلال تقديم منح دراسية لطلاب الطب في قطاع غزة تهدف إلى دعم مسيرتهم التعليمية وتعزيز فرصهم في مواصلة التعليم رغم التحديات. معًا نزرع الأمل، ونصنع مستقبلًا يستحقه طلابنا."
    },
    image: "/1-1-2026/6.jpeg",
    href: "/news/pulse-of-life-biman-scholarships",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    featured: true,
  },
  {
    id: 6,
    title: {
      en: "Isnad Foundation Visits Wafa Foundation in Jakarta, Indonesia",
      ar: "مؤسسة إسناد تزور مؤسسة وفاء في جاكرتا بإندونيسيا"
    },
    date: "December 10, 2025",
    excerpt: {
      en: "As part of its visit to the Republic of Indonesia, the Isnad Foundation paid a visit to the Wafa Foundation in Jakarta on December 10, 2025. The meeting focused on the role of humanitarian work in supporting Palestinian students and discussed avenues for cooperation in financing education and covering students' educational needs both inside and outside Palestine.",
      ar: "ضمن جولة زيارات مؤسسة إسناد إلى دولة إندونيسيا، تشرفنا بزيارة مؤسسة Wafa Foundation في مدينة جاكرتا وذلك بتاريخ 10 / 12 / 2025، حيث تركز اللقاء على دور العمل الإنساني في دعم الطلبة الفلسطينيين، وبحث سبل التعاون في تمويل التعليم وتغطية احتياجات الطلبة الدراسية داخل فلسطين وخارجها."
    },
    image: "/10-12-2025/4.png",
    href: "/news/isnad-visits-wafa-foundation-indonesia",
    category: {
      en: "Partnerships & Cooperation",
      ar: "الشراكات والتعاون"
    },
    featured: true,
  },
  {
    id: 7,
    title: {
      en: "Isnad Foundation Visits University of Indonesia in Jakarta",
      ar: "مؤسسة إسناد تزور جامعة إندونيسيا في جاكرتا"
    },
    date: "December 9, 2025",
    excerpt: {
      en: "As part of its official visit to the Republic of Indonesia, the İsnad foundation for Palestinian student support paid a visit to the University of Indonesia (UI) on December 9, 2025, where an expanded academic meeting was held to discuss prospects for cooperation in the field of higher education and ways to support Palestinian students academically.",
      ar: "ضمن جولة زياراتها الرسمية إلى جمهورية إندونيسيا، تشرفت مؤسسة إسناد لدعم الطالب الفلسطيني بزيارة جامعة إندونيسيا (University of Indonesia – UI) بتاريخ 09 كانون الأول/ديسمبر 2025، حيث جرى عقد لقاء أكاديمي موسّع ناقش آفاق التعاون المشترك في مجال التعليم العالي، وسبل دعم الطلبة الفلسطينيين أكاديميًا."
    },
    image: "/09-12-2025/1.png",
    href: "/news/isnad-visits-university-of-indonesia",
    category: {
      en: "Partnerships & Cooperation",
      ar: "الشراكات والتعاون"
    },
    featured: true,
  },
  {
    id: 1,
    title: {
      en: "Isnad Begins Monthly Scholarship Disbursements for Medical Students in Gaza Under 'Pulse of Life' Program",
      ar: "إسناد تبدأ صرف منح شهرية لطلبة الطب البشري في غزة ضمن برنامج \"نبض الحياة\""
    },
    date: "January 15, 2025",
    excerpt: {
      en: "The Isnad Foundation for Palestinian Student Support launched the new phase of the 'Pulse of Life' scholarship program, specifically designed for medical students in the Gaza Strip. The foundation has begun disbursing monthly scholarships for a full year, renewable, aiming to enable students to continue their education amid the exceptional circumstances facing the sector.",
      ar: "أطلقت مؤسسة إسناد لدعم الطالب الفلسطيني المرحلة الجديدة من برنامج \"منحة نبض الحياة\"، والمخصصة لطلبة الطب البشري في قطاع غزة، حيث بدأت بصرف منح شهرية لمدة عام كامل قابلة للتجديد، بهدف تمكين الطلبة من مواصلة تعليمهم وسط الظروف الاستثنائية التي يعيشها القطاع."
    },
    image: "/hero-cover.jpg",
    href: "/news/pulse-of-life-gaza-medical-scholarships",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    featured: true,
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
    title:{
      en: "Disbursements of First Phase of Pulse of Life Program Begins in Türkiye – Istanbul / Turkey",
      ar: "بدء صرف منح المرحلة الأولى من برنامج نبض الحياة في تركيا",
    },
    date: "May 20, 2025",
    excerpt: {
      en: "On May 1, 2025, the Isnad Foundation for Supporting the Palestinian Student announced the start of scholarship disbursements for students benefiting from the first phase of the Pulse of Life program. This phase was launched in partnership with, and with the generous support of, the Turkish National Youth Foundation (MGV – Milli Gençlik Vakfı).",
      ar: "أعلنت مؤسسة إسناد لدعم الطالب الفلسطيني عن بدء صرف المنح الدراسية للطلبة المستفيدين ضمن المرحلة الأولى من برنامج نبض الحياة، وذلك اعتبارًا من 1 مايو 2025، بالشراكة والدعم الكريم من جمعية الشباب الوطني التركي (MGV - Milli Gençlik Vakfı)."
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

export default function NewsPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 6

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
            src="/LastNews/1.png"
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
