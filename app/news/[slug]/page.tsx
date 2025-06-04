"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"

// Define the type for article data
type ArticleData = {
  title: string
  date: string
  author: string
  category: string
  image: string
  heroImage?: string
  content: string[]
}

// Mock news article data
const newsArticles: Record<string, ArticleData> = {
  "nabd-al-hayat-scholarship-interviews": {
    title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
    date: "May 25, 2025",
    author: "Isnad Foundation",
    category: "Scholarships",
    image: "/LastNews/pulseOfLife-end.png",
    heroImage: "/LastNews/pulseOfLife-end.png",
    content: [
      "إسطنبول / تركيا",
      "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري، من خريجي ومقيدي جامعات قطاع غزة.",
      "وقد جرت المقابلات عن بُعد عبر الإنترنت، وهدفت إلى التعرف عن كثب على الظروف الأكاديمية والمعيشية للطلبة، وتقييم مدى استحقاقهم للدعم، وذلك بعد اجتيازهم مرحلة التصفية الأولية من خلال التسجيل الإلكتروني.",
      "وتمنح مؤسسة إسناد، في هذه المرحلة التي أُطلقت بشراكة استراتيجية مع مؤسسة الخدمت يوروب (Alkhidmat Europe)، دعماً مالياً شهرياً لمدة 12 شهراً للطلبة المقبولين، في خطوة تهدف إلى التخفيف من أعبائهم الدراسية وتمكينهم من مواصلة تعليمهم العالي في ظل التحديات القائمة.",
      "وتُعد منحة \"نبض الحياة\" من أبرز البرامج التي أطلقتها مؤسسة إسناد والتي تركز بشكل خاص على دعم الطلبة الفلسطينيين في التخصصات الطبية، ولا سيما من قطاع غزة، الذين تأثرت مسيرتهم التعليمية جراء الأوضاع الإنسانية القاسية والحصار والحروب المتكررة.",
      "ويستهدف البرنامج في مراحله المتتالية تمكين نحو 1000 طالب فلسطيني من استكمال دراستهم الطبية، ضمن خطة طموحة تمتد على خمس سنوات، تُعنى بالاستثمار في الكفاءات العلمية الشابة، وإعداد جيل طبي مؤهل يساهم في خدمة المجتمع الفلسطيني وتعزيز صموده.",
      "وتُعد مؤسسة إسناد مؤسسة فلسطينية مستقلة غير ربحية، تُكرّس جهودها لدعم التعليم العالي في فلسطين، من خلال تقديم منح دراسية وتنموية مستدامة، ترتكز على رؤية شاملة لبناء الإنسان الفلسطيني وتمكينه من خلال العلم والمعرفة."
    ],
  },
  "nabd-al-hayat-grant-interviews": {
    title: "استمرار مقابلات المرحلة الأولى من منحة نبض الحياة لاختيار 100 طالب من غزة للاستفادة من البرنامج",
    date: "May 5, 2025",
    author: "Isnad Foundation",
    category: "Scholarships",
    image: "/LastNews/pulseOfLife-start.png",
    heroImage: "/LastNews/pulseOfLife-start.png",
    content: [
      "إسطنبول/ تركيا – الإثنين 5 أيار 2025",
      "تواصلت اليوم الإثنين مقابلات المرحلة الأولى من برنامج منحة نبض الحياة، الذي ينفذه صندوق إسناد الطالب الفلسطيني بالشراكة مع مؤسسة الخدمات أوروبا (Alkhidmat Europe)، والتي تستهدف طلبة الطب الفلسطينيين خاصة في قطاع غزة.",
      "وجاءت هذه المقابلات امتداداً لتلك التي انعقدت الثلاثاء الماضي، حيث أجريت عبر الإنترنت بمشاركة نخبة من الطلبة الفلسطينيين الذين اجتازوا مرحلة الانتقاء الأولي، ويواصلون دراستهم في تخصصات الطب البشري في الجامعات الفلسطينية، في قطاع غزة.",
      "وسيتم ضمن المرحلة الأولى اختيار 100 طالب للاستفادة من منحة نبض الحياة، التي تقدم دعماً مالياً شهرياً على مدى 12 شهراً، إلى جانب فرص دعم أخرى تشمل أجهزة تعليمية وتغطية جزئية للرسوم الدراسية.",
      "وتأتي هذه المبادرة في إطار رؤية تنموية تهدف إلى تمكين الطلبة الفلسطينيين من مواصلة مسيرتهم الأكاديمية رغم الظروف القاسية التي خلفتها الحرب، لا سيما في ظل النزوح، وتدمير البيوت، والضغوط النفسية والاقتصادية التي يعاني منها الطلبة وأسرهم.",
      "يُشار إلى أن برنامج نبض الحياة هو أحد أبرز برامج صندوق إسناد الطالب الفلسطيني، والذي يسعى من خلاله إلى دعم أكثر من 1000 طالب خلال خمس سنوات، عبر شراكات محلية ودولية فاعلة.",
      "وصندوق إسناد هو مؤسسة فلسطينية تنموية مستقلة وغير ربحية، تُعنى بتعزيز فرص التعليم العالي للفلسطينيين من خلال تقديم منح دراسية ودعم أكاديمي للطلبة في التخصصات الحيوية، وخاصة التخصصات الطبية."
    ],
  },
  "isnad-support-tour": {
    title: " إسناد تُنفذ جولات دعم إقليمي وتُطلق منحًا تعليمية عاجلة لطلبة غزة المتضررين من الحرب ",
    date: "June 30, 2024",
    author: "Isnad Foundation",
    category: "Education & Humanitarian Support",
    image: "/LastNews/new3.jpeg",
    content: [
      "We are thrilled to announce a new strategic partnership between the Isnad Foundation and Istanbul University, one of Turkey's most prestigious educational institutions. This collaboration marks a significant milestone in our mission to expand educational opportunities for Palestinian students.",
      "The partnership will create dedicated pathways for Palestinian students to access undergraduate and graduate programs at Istanbul University, with special consideration for those facing financial barriers or displacement due to conflict.",
      '"This partnership represents a meaningful step forward in our commitment to providing quality education for Palestinian students," said Dr. Mahmoud Abbas, Executive Director of the Isnad Foundation. "Istanbul University\'s academic excellence and inclusive approach make them an ideal partner in this mission."',
      "Key components of the partnership include:",
      "• Reserved spots for qualified Palestinian students across various academic departments",
      "• Joint scholarship programs covering tuition and living expenses",
      "• Collaborative research opportunities for faculty and graduate students",
      "• Cultural exchange initiatives to foster understanding and connection",
      "• Language support programs to help students transition to Turkish-language instruction",
      'Professor Mehmet Yılmaz, Rector of Istanbul University, expressed enthusiasm about the collaboration: "We are honored to partner with the Isnad Foundation to provide educational opportunities for talented students who have faced significant challenges. This partnership aligns with our university\'s values of academic excellence, diversity, and social responsibility."',
      "The first cohort of students under this partnership will begin their studies in the Fall 2023 semester. Information sessions about available programs and application procedures will be held virtually in the coming weeks.",
      "For more information about this partnership and how to apply for the joint scholarship programs, please visit our Partnerships page or contact our academic advisors at info@isnadf.org.",
    ],
  }
}

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  // Get article data or use default if not found
  const article = newsArticles[slug as keyof typeof newsArticles] || {
    title: "Article Not Found",
    date: "",
    author: "",
    category: "",
    image: "/placeholder.svg?height=600&width=1200",
    heroImage: "/placeholder.svg?height=600&width=1200",
    content: ["The requested article could not be found."],
  }

  // Import news data from the main news page
  const allNewsData = [
    {
      id: 1,
      title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
      date: "May 25, 2025",
      excerpt: "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري.",
      image: "/LastNews/pulseOFLife-end.png",
      href: "/news/nabd-al-hayat-scholarship-interviews",
      category: "Scholarships",
      featured: true,
    },
    {
      id: 2,
      title: "استمرار مقابلات المرحلة الأولى من منحة نبض الحياة لاختيار 100 طالب من غزة للاستفادة من البرنامج",
      date: "May 5, 2025",
      excerpt: "تواصلت اليوم الإثنين مقابلات المرحلة الأولى من برنامج منحة نبض الحياة، الذي ينفذه صندوق إسناد الطالب الفلسطيني بالشراكة مع مؤسسة الخدمات أوروبا (Alkhidmat Europe)، والتي تستهدف طلبة الطب الفلسطينيين خاصة في قطاع غزة.",
      image: "/LastNews/pulseOFLife-start.png",
      href: "/news/nabd-al-hayat-grant-interviews",
      category: "Scholarships",
      featured: true,
    },
    {
      id: 3,
      title: " إسناد تنفذ جولات دعم في ست دول وتقدم منحًا تعليمية لطلاب غزة",
      date: "May 28, 2023",
      excerpt: "نفذت مؤسسة إسناد لدعم الطالب الفلسطيني منذ بدء حرب الإبادة في قطاع غزة  سلسلة من اللقاءات والفعاليات في عدد من الدول شملت تركيا، مصر، موريتانيا، قرغيزستان، ماليزيا، وقطاع غزة، وذلك في إطار استجابتها العاجلة لاحتياجات الطلبة الفلسطينيين المتضررين من الحرب المستمرة على قطاع غزة منذ أكتوبر 2023.",
      image: "/LastNews/new3.jpeg",
      href: "/news/isnad-support-tour",
      category: "Education & Humanitarian Support",
      featured: true,
    },
  ]

  // Function to get related articles dynamically
  const getRelatedArticles = (currentSlug: string, currentCategory: string) => {
    // Filter out the current article and get articles from the same category first
    const otherArticles = allNewsData.filter(news => news.href !== `/news/${currentSlug}`)

    // Prioritize articles from the same category
    const sameCategory = otherArticles.filter(news => news.category === currentCategory)
    const differentCategory = otherArticles.filter(news => news.category !== currentCategory)

    // Combine and limit to 3 articles
    const related = [...sameCategory, ...differentCategory].slice(0, 3)

    return related.map(news => ({
      id: news.id,
      title: news.title,
      date: news.date,
      excerpt: news.excerpt,
      image: news.image,
      href: news.href,
      category: news.category,
    }))
  }

  // Get dynamic related articles
  const dynamicRelatedArticles = getRelatedArticles(slug, article.category)

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

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[calc(50vh)] sm:h-[calc(60vh)] md:h-[calc(70vh)] lg:h-[calc(80vh)] xl:h-[calc(85vh)] w-full overflow-hidden mt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={article.heroImage || article.image}
            alt={article.title}
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

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link href="/news" className="mb-6 inline-flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {article.date && (
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  )}
                  {article.author && (
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>{article.category}</span>
                    </div>
                  )}
                </div>
              </div>
              <GSAPReveal animation="fade">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </GSAPReveal>

              {/* Share Section */}
              <GSAPReveal animation="fade" delay={0.2}>
                <div className="mt-12 rounded-lg border bg-muted/20 p-6">
                  <h3 className="mb-4 flex items-center text-lg font-bold">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share This Article
                  </h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </GSAPReveal>
            </div>

            {/* Sidebar */}
            <div>
              <div className="space-y-8">
                {/* Categories */}
                <GSAPReveal animation="slide-left">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-bold">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Scholarships
                        </Badge>
                        <Badge variant="outline">Partnerships</Badge>
                        <Badge variant="outline">Events</Badge>
                        <Badge variant="outline">Success Stories</Badge>
                        <Badge variant="outline">Grants</Badge>
                        <Badge variant="outline">Announcements</Badge>
                        <Badge variant="outline">Reports</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </GSAPReveal>

                {/* Related Articles */}
                {dynamicRelatedArticles && dynamicRelatedArticles.length > 0 && (
                  <GSAPReveal animation="slide-left" delay={0.1}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-bold">Related Articles</h3>
                        <div className="space-y-4">
                          {dynamicRelatedArticles.map((related) => (
                            <Link key={related.id} href={related.href} className="group block">
                              <div className="flex gap-3">
                                <div>
                                  <h4 className="line-clamp-2 font-medium group-hover:text-primary">{related.title}</h4>
                                  <p className="text-xs text-muted-foreground">{related.date}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </GSAPReveal>
                )}

                {/* Call to Action */}
                <GSAPReveal animation="slide-left" delay={0.2}>
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-lg font-bold">Explore Our Programs</h3>
                      <p className="mb-4 text-primary-foreground/90">
                        Discover our comprehensive scholarship programs and find the perfect opportunity for your educational journey.
                      </p>
                      <Link href="/programs">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">View Programs</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </GSAPReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More News Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">More News</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
                Discover more updates and stories from the Isnad Foundation.
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dynamicRelatedArticles &&
              dynamicRelatedArticles.slice(0, 3).map((related, index) => (
                <GSAPReveal key={related.id} animation="slide-up" delay={0.1 * index}>
                  <Link href={related.href} className="group block">
                    <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 bg-primary/10 text-primary">
                          {related.category}
                        </Badge>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold group-hover:text-primary">
                          {related.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{related.excerpt}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {related.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                </GSAPReveal>
              ))}
          </div>

          <GSAPReveal animation="fade" delay={0.3}>
            <div className="mt-12 text-center">
              <Link href="/news">
                <Button variant="outline" className="group">
                  View All News
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>
    </main>
  )
}
