"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import { useLanguage } from "@/components/language-provider"

// Define the type for article data
type ArticleData = {
  title: {
    en: string
    ar: string
  }
  date: string
  author: string
  category: {
    en: string
    ar: string
  }
  image?: string
  heroImage?: string
  heroVideo?: string
  content: {
    en: string[]
    ar: string[]
  }
}

// Mock news articles data with bilingual support
const newsArticles: Record<string, ArticleData> = {
  "isnad-support-tour": {
    title: {
      en: "Isnad Conducts Support Tours in Six Countries and Provides Educational Grants to Gaza Students",
      ar: "إسناد تنفذ جولات دعم في ست دول وتقدم منحًا تعليمية لطلاب غزة"
    },
    date: "June 06, 2024",
    author: "Isnad Foundation",
    category: {
      en: "Education & Humanitarian Support",
      ar: "التعليم والدعم الإنساني"
    },
    image: "/LastNews/new3.jpeg",
    heroImage: "/LastNews/new3.jpeg",
    content: {
      en: [
        "Since the beginning of the genocide war in the Gaza Strip, the Isnad Foundation for Palestinian Student Support has implemented a series of meetings and events in several countries including Turkey, Egypt, Mauritania, Kyrgyzstan, Malaysia, and the Gaza Strip, as part of its urgent response to the needs of Palestinian students affected by the ongoing war on the Gaza Strip since October 2023.",
        "These tours aimed to directly communicate with students, understand their living and educational conditions, and provide psychological and moral support to them, amid the living difficulties and psychological pressures they face due to the loss of their families or the disruption of support channels.",
        "During the meetings, the foundation announced the provision of direct educational grants to a number of students, as an urgent contribution to alleviate their burden and ensure the continuity of their academic achievement. Isnad also worked to establish partnerships with local institutions in the visited countries, with the aim of securing additional sustainable grants for Palestinian students and enhancing educational opportunities in a safe and supportive environment.",
        "The foundation confirmed that these efforts come within a rapid response plan launched since the beginning of the war, aiming to provide comprehensive support to students from various psychological, educational, and social aspects, with a focus on Gaza students amid the catastrophic conditions the Strip is going through.",
        "The Isnad Foundation for Palestinian Student Support is a Palestinian civil society organization established in Turkey, aiming to academically and socially empower Palestinian students through providing educational grants, psychological and social support, and contributing to building an educational environment that embraces Palestinian students inside Palestine and in areas of refuge and diaspora, through sustainable local and international partnerships."
      ],
      ar: [
        "نفذت مؤسسة إسناد لدعم الطالب الفلسطيني منذ بدء حرب الإبادة في قطاع غزة سلسلة من اللقاءات والفعاليات في عدد من الدول شملت تركيا، مصر، موريتانيا، قرغيزستان، ماليزيا، وقطاع غزة، وذلك في إطار استجابتها العاجلة لاحتياجات الطلبة الفلسطينيين المتضررين من الحرب المستمرة على قطاع غزة منذ أكتوبر 2023.",
        "وهدفت هذه الجولات إلى التواصل المباشر مع الطلبة، والاطلاع على أوضاعهم المعيشية والتعليمية، وتقديم الدعم النفسي والمعنوي لهم، في ظل ما يعانونه من صعوبات معيشية وضغوط نفسية نتيجة فقدان ذويهم أو انقطاع سبل الدعم.",
        "وخلال اللقاءات، أعلنت المؤسسة عن تقديم منح تعليمية مباشرة لعدد من الطلبة، كمساهمة عاجلة لتخفيف العبء عنهم وضمان استمرارية تحصيلهم الأكاديمي. كما عملت \"إسناد\" على إبرام شراكات مع مؤسسات محلية في الدول التي تمت زيارتها، بهدف تأمين منح إضافية مستدامة للطلبة الفلسطينيين، وتعزيز فرص التعليم في بيئة آمنة وداعمة.",
        "وأكدت المؤسسة أن هذه الجهود تأتي ضمن خطة استجابة سريعة أطلقتها منذ بداية الحرب، وتهدف إلى تقديم دعم متكامل للطلبة من مختلف الجوانب النفسية والتعليمية والاجتماعية، مع التركيز على طلبة غزة في ظل الظروف الكارثية التي يمر بها القطاع.",
        "ومؤسسة إسناد لدعم الطالب الفلسطيني هي هيئة مجتمع مدني فلسطينية أُسست في تركيا، تهدف إلى تمكين الطلبة الفلسطينيين أكاديميًا ومجتمعيًا من خلال تقديم المنح التعليمية، وتوفير الدعم النفسي والاجتماعي، والمساهمة في بناء بيئة تعليمية حاضنة للطلبة الفلسطينيين داخل فلسطين وفي مناطق اللجوء والشتات، عبر شراكات محلية ودولية مستدامة."
      ]
    }
  },
  "nabd-al-hayat-grant-interviews": {
    title: {
      en: "Launch of First Phase Interviews for Pulse of Life Scholarship",
      ar: "انطلاق مقابلات المرحلة الأولى من منحة نبض الحياة"
    },
    date: "May 5, 2025",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    image: "/LastNews/pulseOfLife-start.png",
    heroImage: "/LastNews/pulseOfLife-start.png",
    content: {
      en: [
        "Istanbul / Turkey",
        "Today, Tuesday, the first interviews for the Pulse of Life scholarship, launched by the Isnad Palestinian Student Fund, began.",
        "The interviews, conducted by the fund online, witnessed the participation of dozens of Palestinian students who are pursuing their studies in medical specialties.",
        "During the interviews, the foundation got to know the students who passed the initial selection after electronic registration for the scholarship.",
        "Successful candidates in the Pulse of Life scholarship interviews will receive various forms of assistance, including financial grants, educational seats, and educational equipment such as tablets and computers.",
        "It is worth noting that 'Pulse of Life' is one of the most prominent scholarship programs launched by the Isnad Palestinian Student Fund, which aims to provide scholarships to Palestinian students who wish to or are pursuing their studies in medical specialties.",
        "The program seeks to provide grants and assistance to 1,000 Palestinian students, within a five-year work plan.",
        "The Isnad Palestinian Student Fund is an independent Palestinian developmental non-profit organization, aiming to support higher education in Palestine through investing in young academic energies, by providing scholarships within a comprehensive developmental vision."
      ],
      ar: [
        "اسطنبول/ تركيا",
        "انطلقت اليوم الثلاثاء، أولى مقابلات الخاصة بمنحة نبض الحياة، التي دشنتها مؤسسة إسناد الطالب الفلسطيني.",
        "وشهدت المقابلات التي عقدها الصندوق عبر الانترنت، مشاركة عشرات الطلبة الفلسطينيين الذين يتابعون دراستهم في تخصصات طبية.",
        "وخلال المقابلات، تعرفت المؤسسة على الطلبة الذين اجتازوا المقابلات الأولى بعد التسجيل الالكتروني في المنحة.",
        "وسيحصل الناجحون في المقابلات ضمن منحة نبض الحياة، على مساعدات تتنوع بين منح مالية وتوفير مقاعد دراسية واقتناء معدات تعليمية وأجهزة لوحية وحواسيب.",
        "يذكر أن \"نبض الحياة\" يعتبر من أبرز برامج المنح التي أطلقتها مؤسسة إسنَاد لدعم الطالب الفلسطيني، والذي يستهدف تقديم منح للطلاب الفلسطينيين الذي يرغبون أو يتابعون دراستهم في أحد التخصصات الطبية.",
        "ويسعى البرنامج إلى تقديم منح ومساعدات إلى 1000 طالب فلسطيني، ضمن خطة عمل تمتد إلى خمس سنوات.",
        "ومؤسسة إسناد الطالب الفلسطيني هي منظمة فلسطينية تنموية مستقلة وغير ربحية، تهدف إلى دعم مسيرة التعليم العالي في فلسطين، من خلال الاستثمار في الطاقات الشبابية الأكاديمية، عبر توفير منح دراسية ضمن رؤية تنموية شاملة."
      ]
    }
  },
  "nabd-al-hayat-scholarship-interviews": {
    title: {
      en: "Completion of First Phase of Pulse of Life Scholarship Interviews",
      ar: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة"
    },
    date: "May 25, 2025",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    image: "/LastNews/pulseOfLife-end.png",
    heroImage: "/LastNews/pulseOfLife-end.png",
    content: {
      en: [
        "Istanbul / Turkey",
        "The Isnad Foundation for Palestinian Student Support concluded, on Saturday, May 25, 2025, the first phase of the 'Pulse of Life' scholarship interviews, which extended over three weeks starting from May 5, with the participation of dozens of outstanding Palestinian students in the field of human medicine, graduates and applicants from Gaza Strip universities.",
        "The interviews were conducted remotely via the internet, aiming to closely examine the academic and living conditions of the students and evaluate their eligibility for support, after they passed the initial screening stage through electronic registration.",
        "In this phase, launched in strategic partnership with Alkhidmat Europe, the Isnad Foundation provides monthly financial support for 12 months to accepted students, a step aimed at alleviating their study burdens and enabling them to continue their higher education amid existing challenges.",
        "The 'Pulse of Life' scholarship is one of the most prominent programs launched by the Isnad Foundation, focusing particularly on supporting Palestinian students in medical specialties, especially from the Gaza Strip, whose educational journey has been affected by harsh humanitarian conditions, siege, and repeated wars.",
        "The program aims to enable about 1,000 Palestinian students to complete their medical studies in its successive phases, within an ambitious five-year plan, focusing on investing in young scientific competencies and preparing a qualified medical generation that contributes to serving the Palestinian society and enhancing its resilience.",
        "The Isnad Foundation is an independent Palestinian non-profit organization that dedicates its efforts to supporting higher education in Palestine, through providing sustainable educational and developmental scholarships, based on a comprehensive vision for building the Palestinian human being and empowering them through science and knowledge."
      ],
      ar: [
        "إسطنبول / تركيا",
        "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري، من خريجي ومقيدي جامعات قطاع غزة.",
        "وقد جرت المقابلات عن بُعد عبر الإنترنت، وهدفت إلى التعرف عن كثب على الظروف الأكاديمية والمعيشية للطلبة، وتقييم مدى استحقاقهم للدعم، وذلك بعد اجتيازهم مرحلة التصفية الأولية من خلال التسجيل الإلكتروني.",
        "وتمنح مؤسسة إسناد، في هذه المرحلة التي أُطلقت بشراكة استراتيجية مع مؤسسة الخدمت يوروب (Alkhidmat Europe)، دعماً مالياً شهرياً لمدة 12 شهراً للطلبة المقبولين، في خطوة تهدف إلى التخفيف من أعبائهم الدراسية وتمكينهم من مواصلة تعليمهم العالي في ظل التحديات القائمة.",
        "وتُعد منحة \"نبض الحياة\" من أبرز البرامج التي أطلقتها مؤسسة إسنَاد والتي تركز بشكل خاص على دعم الطلبة الفلسطينيين في التخصصات الطبية، ولا سيما من قطاع غزة، الذين تأثرت مسيرتهم التعليمية جراء الأوضاع الإنسانية القاسية والحصار والحروب المتكررة.",
        "ويستهدف البرنامج في مراحله المتتالية تمكين نحو 1000 طالب فلسطيني من استكمال دراستهم الطبية، ضمن خطة طموحة تمتد على خمس سنوات، تُعنى بالاستثمار في الكفاءات العلمية الشابة، وإعداد جيل طبي مؤهل يساهم في خدمة المجتمع الفلسطيني وتعزيز صموده.",
        "وتُعد مؤسسة إسنَاد مؤسسة فلسطينية مستقلة غير ربحية، تُكرّس جهودها لدعم التعليم العالي في فلسطين، من خلال تقديم منح دراسية وتنموية مستدامة، ترتكز على رؤية شاملة لبناء الإنسان الفلسطيني وتمكينه من خلال العلم والمعرفة."
      ]
    }
  },
  "pulse-of-life-disbursement": {
    title: {
      en: "Disbursements of the first phase of the Pulse of Life program have begun in Türkiye.",
      ar: "بدء صرف منح المرحلة الأولى من برنامج نبض الحياة في تركيا"
    },
    date: "June 06, 2024",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    heroVideo: "/newVid/new4Vid.mp4",
    content: {
      en: [
        "Istanbul / Turkey",
        "The Isnad Foundation for Palestinian Student Support announced the commencement of disbursing scholarships to students benefiting from the first phase of the Pulse of Life program, starting May 1, 2025, in partnership with and with the generous support of the Turkish National Youth Association (MGV - Milli Gençlik Vakfı).",
        "The first phase included ten Palestinian students studying in Turkish universities in human medicine specialties, where the first two monthly grant payments were disbursed, in a practical step aimed at supporting their academic and living stability and helping them overcome the challenges they face.",
        "In this context, the foundation met with a number of beneficiary students and documented special video clips in which they expressed their gratitude to the supporting parties, while also encouraging their fellow students to register for the program and benefit from this unique opportunity.",
        "The Pulse of Life is one of the pioneering initiatives launched by the Isnad Foundation in partnership with several institutions, targeting the provision of sustainable financial grants to one thousand Palestinian students in medical specialties, with the aim of enabling them to continue their studies and contribute to serving their community and homeland, within a five-year support plan.",
        "The Isnad Foundation confirmed that it continues to receive registration applications for the next phase of the program, as part of its vision to enhance the resilience of Palestinian students and provide a safe educational environment that supports academic excellence and creativity."
      ],
      ar: [
        "إسطنبول / تركيا",
        "أعلنت مؤسسة إسناد لدعم الطالب الفلسطيني عن بدء صرف المنح الدراسية للطلبة المستفيدين ضمن المرحلة الأولى من برنامج \"نبض الحياة\"، وذلك اعتبارًا من 1 مايو 2025، بالشراكة والدعم الكريم من جمعية الشباب الوطني التركي (MGV - Milli Gençlik Vakfı).",
        "وشملت المرحلة الأولية عشرة طلاب فلسطينيين يدرسون في الجامعات التركية في تخصصات الطب البشري، حيث تم صرف أول دفعتين من المنحة الشهرية، في خطوة عملية تهدف إلى دعم استقرارهم الأكاديمي والمعيشي، ومساندتهم في تجاوز التحديات التي يواجهونها.",
        "وفي هذا السياق، التقت المؤسسة بعدد من الطلبة المستفيدين، وقامت بتوثيق مقاطع فيديو خاصة عبّروا فيها عن امتنانهم للجهات الداعمة، كما دعوا زملاءهم الطلبة إلى التسجيل في البرنامج والاستفادة من هذه الفرصة النوعية.",
        "ويُعد \"نبض الحياة\" من المبادرات الرائدة التي أطلقتها مؤسسة إسنَاد بالشراكة مع  عدد من المؤسسات، ويستهدف تقديم منح مالية مستدامة لألف طالب فلسطيني في التخصصات الطبية، بهدف تمكينهم من مواصلة دراستهم والمساهمة في خدمة مجتمعهم ووطنهم، ضمن خطة دعم تصل إلى خمس سنوات.",
        "وأكدت مؤسسة إسنَاد أنها مستمرة في استقبال طلبات التسجيل للمرحلة المقبلة من البرنامج، في إطار رؤيتها لتعزيز صمود الطلبة الفلسطينيين وتوفير بيئة تعليمية آمنة تدعم التميز الأكاديمي والإبداع."
      ]
    }
  }
}

// Categories for the sidebar
const categories = [
  { value: "Scholarships", label: { en: "Scholarships", ar: "المنح الدراسية" } },
  { value: "Partnerships", label: { en: "Partnerships", ar: "الشراكات" } },
  { value: "Events", label: { en: "Events", ar: "الفعاليات" } },
  { value: "Success Stories", label: { en: "Success Stories", ar: "قصص النجاح" } },
  { value: "Grants", label: { en: "Grants", ar: "المنح" } },
  { value: "Announcements", label: { en: "Announcements", ar: "الإعلانات" } },
  { value: "Reports", label: { en: "Reports", ar: "التقارير" } }
]

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const { language, t } = useLanguage()
  const isRTL = language === "ar"

  // Get article data or use default if not found
  const article = newsArticles[slug as keyof typeof newsArticles] || {
    title: {
      en: "Article Not Found",
      ar: "المقال غير موجود"
    },
    date: "",
    author: "",
    category: {
      en: "",
      ar: ""
    },
    image: "/placeholder.svg?height=600&width=1200",
    heroImage: "/placeholder.svg?height=600&width=1200",
    heroVideo: undefined,
    content: {
      en: ["The requested article could not be found."],
      ar: ["لم يتم العثور على المقال المطلوب."]
    }
  }

  // Get related articles (excluding current article)
  const dynamicRelatedArticles = Object.entries(newsArticles)
    .filter(([key]) => key !== slug)
    .map(([key, article]) => ({
      id: key,
      title: article.title[language],
      excerpt: article.content[language][0],
      date: article.date,
      category: article.category[language],
      href: `/news/${key}`
    }))

  // Share handlers
  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = article.title[language]
    const text = article.content[language][0]

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'general':
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              text,
              url
            })
          } catch (err) {
            // Only log actual errors, not user cancellations
            if (err instanceof Error && err.name !== 'AbortError') {
              console.error('Error sharing:', err)
            }
          }
        } else {
          // Fallback for browsers that don't support the Web Share API
          try {
            await navigator.clipboard.writeText(url)
            alert(t("news.linkCopied"))
          } catch (err) {
            console.error('Error copying to clipboard:', err)
          }
        }
        break
    }
  }

  // Video loading states
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoInView, setVideoInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!videoContainerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(videoContainerRef.current)

    return () => observer.disconnect()
  }, [])

  // Video event handlers
  const handleVideoCanPlayThrough = () => {
    setVideoLoaded(true)
  }

  const handleVideoError = () => {
    // Fallback to show video anyway after error
    setVideoLoaded(true)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Add any GSAP animations here if needed
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="flex min-h-screen flex-col" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero Section */}
      <section className="relative h-[calc(70vh)] sm:h-[calc(60vh)] md:h-[calc(70vh)] lg:h-[calc(80vh)] xl:h-[calc(85vh)] w-full overflow-hidden mt-24">
        <div className="absolute inset-0 z-0" ref={videoContainerRef}>
          {article.heroVideo ? (
            <div className="relative w-full h-full">
              {/* Video Skeleton */}
              {!videoLoaded && (
                <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="text-gray-400 dark:text-gray-500 text-sm">
                      {language === 'ar' ? 'جاري تحميل الفيديو...' : 'Loading video...'}
                    </div>
                  </div>
                </div>
              )}

              {/* Video Element */}
              {videoInView && (
                <video
                  ref={videoRef}
                  src={article.heroVideo}
                  poster={article.image || "/placeholder.svg?height=600&width=1200"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlayThrough={handleVideoCanPlayThrough}
                  onError={handleVideoError}
                  className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          ) : (
            <img
              src={article.heroImage || article.image}
              alt={article.title[language]}
              className="h-full w-full object-contain object-center"
            />
          )}
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

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link href="/news" className="mb-6 inline-flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className={`mr-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  {t("news.backToNews")}
                </Link>
                <h1 
                  className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {article.title[language]}
                </h1>
                <div 
                  className="flex flex-wrap items-center gap-4 text-muted-foreground"
                  style={{ 
                    justifyContent: isRTL ? 'flex-end' : 'flex-start',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}
                >
                  {article.date && (
                    <div className="flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Calendar className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      <span>{article.date}</span>
                    </div>
                  )}
                  {article.author && (
                    <div className="flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <User className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      <span>{article.author}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Tag className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      <span>{article.category[language]}</span>
                    </div>
                  )}
                </div>
              </div>
              <GSAPReveal animation="fade">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {article.content[language].map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </GSAPReveal>

              {/* Videos Section - Only for pulse-of-life-disbursement */}
              {slug === "pulse-of-life-disbursement" && (
                <GSAPReveal animation="fade" delay={0.2}>
                  <div className="mt-12">
                    <h3 
                      className="text-2xl font-bold mb-6"
                      style={{ textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {language === 'ar' ? 'أحدث الفيديوهات' : 'Latest Videos'}
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Video 1 */}
                      <div className="group relative rounded-lg border-2 border-[#1e7e34]/20 transition-all hover:shadow-lg">
                        <video
                          className="w-full max-h-[400px] object-contain transition-opacity duration-700"
                          controls
                          preload="metadata"
                        >
                          <source src="/newVid/lastnews1.mp4" type="video/mp4" />
                          {language === 'ar'
                            ? 'متصفحك لا يدعم تشغيل الفيديو'
                            : 'Your browser does not support the video tag.'
                          }
                        </video>
                      </div>

                      {/* Video 2 */}
                      <div className="group relative rounded-lg border-2 border-[#1e7e34]/20 transition-all hover:shadow-lg">
                        <video
                          className="w-full max-h-[400px] object-contain transition-opacity duration-700"
                          controls
                          preload="metadata"
                        >
                          <source src="/newVid/lastnews2.mp4" type="video/mp4" />
                          {language === 'ar'
                            ? 'متصفحك لا يدعم تشغيل الفيديو'
                            : 'Your browser does not support the video tag.'
                          }
                        </video>
                      </div>
                    </div>
                  </div>
                </GSAPReveal>
              )}

              {/* Share Section */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm font-medium">{t("news.share")}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-sky-50 hover:text-sky-600"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-gray-50 hover:text-gray-600"
                    onClick={() => handleShare('general')}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="space-y-8">
                {/* Categories */}
                <GSAPReveal animation="slide-left">
                  <Card>
                    <CardContent className="p-6">
                      <h3 
                        className="mb-4 text-lg font-bold"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {t("news.categories")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge 
                            key={category.value} 
                            variant="outline" 
                            className="bg-primary/10 text-primary"
                          >
                            {category.label[language]}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </GSAPReveal>

                {/* Related Articles */}
                {dynamicRelatedArticles && dynamicRelatedArticles.length > 0 && (
                  <GSAPReveal animation="slide-left" delay={0.1}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 
                          className="mb-4 text-lg font-bold"
                          style={{ textAlign: isRTL ? 'right' : 'left' }}
                        >
                          {t("news.relatedArticles")}
                        </h3>
                        <div className="space-y-4">
                          {dynamicRelatedArticles.map((related) => (
                            <Link key={related.id} href={related.href} className="group block">
                              <div className="flex gap-3">
                                <div>
                                  <h4 
                                    className="line-clamp-2 font-medium group-hover:text-primary"
                                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                                  >
                                    {related.title}
                                  </h4>
                                  <p 
                                    className="text-xs text-muted-foreground"
                                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                                  >
                                    {related.date}
                                  </p>
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
                      <h3 
                        className="mb-2 text-lg font-bold"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {t("news.explorePrograms")}
                      </h3>
                      <p 
                        className="mb-4 text-primary-foreground/90"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {t("news.exploreProgramsDesc")}
                      </p>
                      <Link href="/programs">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">
                          {t("news.viewPrograms")}
                        </Button>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                {t("news.moreNews")}
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
                {t("news.moreNewsDesc")}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dynamicRelatedArticles.slice(0, 3).map((related, index) => (
              <GSAPReveal key={related.id} animation="slide-up" delay={0.1 * index}>
                <Link href={related.href} className="group block">
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
                    <div className="p-4">
                      <Badge 
                        variant="outline" 
                        className="mb-2 bg-primary/10 text-primary"
                        style={{ 
                          display: 'inline-block',
                          marginLeft: isRTL ? 'auto' : '0',
                          marginRight: isRTL ? '0' : 'auto'
                        }}
                      >
                        {related.category}
                      </Badge>
                      <h3 
                        className="mb-2 line-clamp-2 text-xl font-bold group-hover:text-primary"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {related.title}
                      </h3>
                      <p 
                        className="mb-4 line-clamp-2 text-muted-foreground"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {related.excerpt}
                      </p>
                      <div 
                        className="flex items-center text-sm text-muted-foreground"
                        style={{ 
                          justifyContent: isRTL ? 'flex-end' : 'flex-start',
                          flexDirection: isRTL ? 'row-reverse' : 'row',
                          width: '100%'
                        }}
                      >
                        <Calendar className={`${isRTL ? 'ml-1' : 'mr-1'} h-3 w-3`} />
                        <span style={{ textAlign: isRTL ? 'right' : 'left' }}>{related.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
