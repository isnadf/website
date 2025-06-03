"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsCard from "@/components/news-card"

// Mock news data
const newsData = [
  {
    id: 1,
    title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
    date: "May 25, 2025",
    excerpt: "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري.",
    image: "/LastNews/1.png",
    href: "/news/nabd-al-hayat-scholarship-interviews",
    category: "Scholarships",
    featured: true,
  },
  {
    id: 2,
    title: "استمرار مقابلات المرحلة الأولى من منحة نبض الحياة لاختيار 100 طالب من غزة للاستفادة من البرنامج",
    date: "May 5, 2025",
    excerpt: "تواصلت اليوم الإثنين مقابلات المرحلة الأولى من برنامج منحة نبض الحياة، الذي ينفذه صندوق إسناد الطالب الفلسطيني بالشراكة مع مؤسسة الخدمات أوروبا (Alkhidmat Europe)، والتي تستهدف طلبة الطب الفلسطينيين خاصة في قطاع غزة.",
    image: "/LastNews/1.png",
    href: "/news/nabd-al-hayat-grant-interviews",
    category: "Scholarships",
    featured: true,
  },
  {
    id: 3,
    title: "Partnership with Istanbul University",
    date: "May 28, 2023",
    excerpt: "We're excited to announce our new partnership with Istanbul University to provide more opportunities.",
    image: "/LastNews/1.png",
    href: "/news/istanbul-university-partnership",
    category: "Partnerships",
    featured: true,
  },
  {
    id: 4,
    title: "إسناد تنفذ جولات دعم في ست دول وتقدم منحًا تعليمية لطلاب غزة",
    date: "March 15, 2024",
    excerpt: "نفذت مؤسسة إسناد لدعم الطالب الفلسطيني منذ بدء حرب الإبادة في قطاع غزة سلسلة من اللقاءات والفعاليات في عدد من الدول شملت تركيا، مصر، موريتانيا، قرغيزستان، ماليزيا، وقطاع غزة، وذلك في إطار استجابتها العاجلة لاحتياجات الطلبة الفلسطينيين المتضررين من الحرب المستمرة على قطاع غزة منذ أكتوبر 2023.",
    image: "/LastNews/1.png",
    href: "/news/isnad-support-tours",
    category: "Announcements",
    featured: true,
  },
  {
    id: 5,
    title: "Student Success Story: Layla's Journey",
    date: "March 22, 2023",
    excerpt: "Read about Layla's inspiring journey from Gaza to completing her PhD in Environmental Science.",
    image: "/LastNews/1.png",
    href: "/news/student-success-layla",
    category: "Success Stories",
    featured: false,
  },
  {
    id: 6,
    title: "New Research Grant Opportunities",
    date: "February 15, 2023",
    excerpt: "Announcing new research grant opportunities for Palestinian scholars in STEM fields.",
    image: "/LastNews/1.png",
    href: "/news/research-grant-opportunities",
    category: "Grants",
    featured: false,
  },
  {
    id: 7,
    title: "Educational Workshop Series Announced",
    date: "January 30, 2023",
    excerpt: "Join our upcoming workshop series on academic writing, research methodologies, and career development.",
    image: "/LastNews/1.png",
    href: "/news/workshop-series",
    category: "Events",
    featured: false,
  },
  {
    id: 8,
    title: "Foundation Expands Support to Lebanon",
    date: "December 12, 2022",
    excerpt: "Our foundation is expanding its support programs to reach Palestinian students in Lebanon.",
    image: "/LastNews/1.png",
    href: "/news/lebanon-expansion",
    category: "Announcements",
    featured: true,
  },
  {
    id: 9,
    title: "Year-End Impact Report Released",
    date: "December 5, 2022",
    excerpt: "Our 2022 Impact Report shows significant growth in student support and program effectiveness.",
    image: "/LastNews/1.png",
    href: "/news/impact-report-2022",
    category: "Reports",
    featured: false,
  },
  {
    id: 10,
    title: "New Board Members Appointed",
    date: "November 18, 2022",
    excerpt: "We welcome three new distinguished members to our Board of Directors.",
    image: "/LastNews/1.png",
    href: "/news/new-board-members",
    category: "Announcements",
    featured: false,
  },
]

// Categories for filtering
const categories = [
  "All",
  "Scholarships",
  "Partnerships",
  "Events",
  "Success Stories",
  "Grants",
  "Announcements",
  "Reports",
]

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 6



  // Filter news based on search query, category, and tab
  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && news.featured) ||
      (activeTab === "recent" && new Date(news.date).getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000) // Last 90 days

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
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/LastNews/1.png"
            alt="Hero Cover"
            className="h-full w-full object-contain object-center"
          />
        </div>
        {/* Page Indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className="text-white text-xs sm:text-sm font-medium">Latest News</span>
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
              Featured
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl text-black dark:text-white">Featured Stories</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Highlighting our most important updates and announcements.
            </p>
          </div>

          <div className="mx-auto grid max-w-10xl gap-x-16 gap-y-8 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {newsData
              .filter((news) => news.featured)
              .slice(0, 3)
              .map((news, index) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  date={news.date}
                  excerpt={news.excerpt}
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
            <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
              <Calendar className="mr-1 h-4 w-4" />
              Archive
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl text-black dark:text-white">News Archive</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Browse our complete collection of news, updates, and announcements.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            {/* Search and Filter */}
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(0,76%,40%)] dark:text-[hsl(0,76%,50%)]" />
                <Input
                  placeholder="Search news..."
                  className="pl-10 border-[hsl(120,61%,34%)]/20 focus-visible:ring-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[hsl(120,61%,34%)] dark:text-[hsl(120,61%,44%)]" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-[hsl(120,61%,34%)]/20 focus:ring-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="focus:bg-[hsl(120,61%,34%)]/10 focus:text-[hsl(120,61%,34%)] dark:focus:bg-[hsl(120,61%,34%)]/20 dark:focus:text-[hsl(120,61%,44%)]"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3 bg-[hsl(0,76%,40%)]/5 dark:bg-[hsl(0,76%,40%)]/10">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[hsl(120,61%,34%)] data-[state=active]:text-white"
                >
                  All News
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="data-[state=active]:bg-[hsl(120,61%,34%)] data-[state=active]:text-white"
                >
                  Featured
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-[hsl(120,61%,34%)] data-[state=active]:text-white"
                >
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* News Grid */}
            {paginatedNews.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedNews.map((news, index) => (
                  <div key={news.id} className="group relative overflow-hidden rounded-lg border-2 border-[#1e7e34]/20 bg-card transition-all hover:shadow-md dark:bg-gray-900 dark:border-[#1e7e34]/30">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={news.image || "/cover3.png"}
                        alt={news.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline" className="bg-[hsl(0,76%,40%)]/10 text-[hsl(0,76%,40%)] dark:bg-[hsl(0,76%,40%)]/20 dark:text-[hsl(0,76%,50%)]">
                          {news.category}
                        </Badge>
                        <div className="flex items-center text-sm text-[hsl(0,76%,40%)] dark:text-[hsl(0,76%,50%)]">
                          <Calendar className="mr-1 h-3 w-3" />
                          {news.date}
                        </div>
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-xl font-bold text-black dark:text-white">{news.title}</h3>
                      <p className="mb-4 line-clamp-3 text-muted-foreground">{news.excerpt}</p>
                      <a
                        href={news.href}
                        className="inline-flex items-center text-sm font-medium text-[hsl(120,61%,34%)] hover:underline dark:text-[hsl(120,61%,44%)]"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-[hsl(0,76%,40%)]/20 dark:border-[hsl(0,76%,40%)]/30 p-8 text-center">
                <p className="text-[hsl(0,76%,40%)] dark:text-[hsl(0,76%,50%)]">No news articles found matching your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-[hsl(120,61%,34%)]/30 hover:bg-[hsl(120,61%,34%)]/10 hover:text-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30 dark:hover:bg-[hsl(120,61%,34%)]/20 dark:hover:text-[hsl(120,61%,44%)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1
                      ? "bg-[hsl(120,61%,34%)] text-white hover:bg-[hsl(120,61%,34%)]/90 dark:bg-[hsl(120,61%,34%)] dark:text-white dark:hover:bg-[hsl(120,61%,34%)]/90"
                      : "border-[hsl(120,61%,34%)]/30 hover:bg-[hsl(120,61%,34%)]/10 hover:text-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30 dark:hover:bg-[hsl(120,61%,34%)]/20 dark:hover:text-[hsl(120,61%,44%)]"
                    }
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-[hsl(120,61%,34%)]/30 hover:bg-[hsl(120,61%,34%)]/10 hover:text-[hsl(120,61%,34%)] dark:border-[hsl(120,61%,34%)]/30 dark:hover:bg-[hsl(120,61%,34%)]/20 dark:hover:text-[hsl(120,61%,44%)]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-[#f8faf8]/70"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/30 via-[#1e7e34]/80 to-[#1e7e34]/30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white relative z-10">Stay Updated</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 relative z-10">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center relative z-10">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-xs bg-gray-50 text-gray-900 placeholder:text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
              />
              <Button className="bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90">Subscribe</Button>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 relative z-10">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
