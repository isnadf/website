"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, GraduationCap, Users, BookOpen, Award, Calendar, MessageSquare, Stethoscope, Heart, Trophy, Handshake, Scroll, Play, CheckCircle2, Wallet, BriefcaseMedical, Ambulance } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import ImageAccordion from "@/components/ImageAccordion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import ParallaxSection from "@/components/parallax-section"
import StatsCounter from "@/components/stats-counter"
import ScrollingCards from "@/components/scrolling-cards"
import Image from "next/image"
import NewsCard from "@/components/news-card"
import { LinkPreview } from "@/components/ui/link-preview"

export default function Home() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false)
  const isRTL = language === 'ar'
  const heroImages = [
    { src: "/three/PHOTO-2025-04-20-18-04-17.jpg", alt: "Activity three group" },
    { src: "/three/PHOTO-2025-04-20-18-04-17 2.jpg", alt: "Activity three gathering" },
    { src: "/three/PHOTO-2025-04-20-18-04-18.jpg", alt: "Activity three moment" },
    { src: "/three/PHOTO-2025-04-20-18-04-18 2.jpg", alt: "Activity three session" },
  ]
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  const missionVisionImages = [
    { src: "/three/PHOTO-2025-04-20-18-04-17.jpg", alt: "Activity three group", rotation: -2 },
    { src: "/three/PHOTO-2025-04-20-18-04-17 2.jpg", alt: "Activity three gathering", rotation: 6 },
    { src: "/three/PHOTO-2025-04-20-18-04-18.jpg", alt: "Activity three moment", rotation: -4 },
    { src: "/three/PHOTO-2025-04-20-18-04-18 2.jpg", alt: "Activity three session", rotation: 4 },
  ]

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % missionVisionImages.length)
  }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + missionVisionImages.length) % missionVisionImages.length)
  }

  const isImageActive = (index: number) => {
    return index === activeImageIndex
  }

  // Create cards data array for the ScrollingCards component
  const cardsData = [
    {
      title: t("card1.title"),
      excerpt: t("Card1.desc"),
      image: "/work/2.jpeg",
      href: "/programs",
      date: "",
      category: "Scholarships"
    },
    {
      title: t("Card2.title"),
      excerpt: t("Card2.desc"),
      image: "/work/4.jpeg",
      href: "/activities/2",
      date: "",
      category: "Professional Development"
    },
    { 
      title: t("Card3.title"),
      excerpt: t("Card3.desc"),
      image: "/work/3.jpeg",
      href: "/success-stories",
      date: "",
      category: "Research"
    },
    {
      title: t("Card4.title"),
      excerpt: t("Card4.desc"),
      image: "/work/1.jpeg",
      href: "/activities/6",
      date: "",
      category: "Community"
    },
    {
      title: t("Card5.title"),
      excerpt: t("Card5.desc"),
      image: "/work/3.jpeg",
      href: "/activities/1",
      date: "",
      category: "Network"
    }
  ]


  // Add partners data
  const partners = [
    { name: "Milli Gençlik Vakfı", logo: "/partners/p1.png", type: "Academic Partner" },
    { name: "YediHilal", logo: "/partners/p2.png", type: "Academic Partner" },
    { name: "Hüdayi Vakfı", logo: "/partners/p3.jpeg", type: "Academic Partner" },
    { name: "Khidhumaiy", logo: "/partners/p4.jpg", type: "International Organization" }
  ]

  const specialPartner = { name: "Cinta Gaza Malaysia", logo: "/partners/p6.svg", type: "International Organization" }

  const newsCards = [
    {
      title: t("news.latest.supportTour.title") as string,
      excerpt: t("news.latest.supportTour.excerpt") as string,
      image: "/LastNews/new3.jpeg",
      href: "/news/isnad-support-tour",
      date: "June 06, 2024",
      category: t("news.latest.supportTour.category") as string,
      isClickable: true
    },
    {
      title: t("news.latest.pulseOfLifeStart.title") as string,
      excerpt: t("news.latest.pulseOfLifeStart.excerpt") as string,
      image: "/LastNews/pulseOfLife-start.png",
      href: "/news/nabd-al-hayat-grant-interviews",
      date: "May 5, 2025",
      category: t("news.latest.pulseOfLifeStart.category") as string,
      isClickable: true
    },
    {
      title: t("news.latest.pulseOfLifeEnd.title") as string,
      excerpt: t("news.latest.pulseOfLifeEnd.excerpt") as string,
      image: "/LastNews/pulseOfLife-end.png",
      href: "/news/nabd-al-hayat-scholarship-interviews",
      date: "May 25, 2025",
      category: t("news.latest.pulseOfLifeEnd.category") as string,
      isClickable: true
    },
    {
      title: t("news.latest.pulseOfLifeDisbursement.title") as string,
      excerpt: t("news.latest.pulseOfLifeDisbursement.excerpt") as string,
      image: "/LastNews/latestnews4.jpeg",
      href: "/news/pulse-of-life-disbursement",
      date: "May 20, 2025",
      category: t("news.latest.pulseOfLifeDisbursement.category") as string,
      isClickable: true
    }
  ]

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

    // Hero section parallax and fade effects
    if (heroRef.current) {
      const heroImagesEls = heroRef.current.querySelectorAll(".hero-image")
      const heroContent = heroRef.current.querySelector(".hero-content")

      gsap.to(heroImagesEls, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(heroContent, {
        y: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    // Preload all hero images
    heroImages.forEach((image) => {
      const img = new window.Image()
      img.src = image.src
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative mt-16 md:mt-20 h-[calc(100vh-96px)] min-h-[620px] w-full overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={image.src}
              className={`hero-image absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeHeroIndex ? "opacity-100" : "opacity-0"}`}
              style={{ 
                zIndex: index === activeHeroIndex ? 2 : index + 1,
                pointerEvents: index === activeHeroIndex ? "auto" : "none"
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index <= 1}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/25 z-[100] pointer-events-none" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center space-y-5 -translate-y-24 md:-translate-y-28">
          <button
            aria-label={t("hero.heading") as string}
            className="h-16 w-16 rounded-2xl bg-white/90 text-primary shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <Play className="h-7 w-7 text-primary" />
          </button>
          <div className="space-y-3">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t("hero.heading") as string}
            </h1>
            <p className="text-white/90 text-base md:text-xl font-semibold">
              {t("hero.subheading") as string}
            </p>
          </div>
        </div>

        <div className="absolute bottom-28 left-0 right-0 z-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 bg-black/40 backdrop-blur-md rounded-2xl py-4 px-3 text-center text-white shadow-lg -translate-y-6 md:-translate-y-8">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold">{t("hero.stats.students.value") as string}</div>
                <div className="text-sm sm:text-base text-white/80">{t("hero.stats.students.label") as string}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold">{t("hero.stats.sponsorships.value") as string}</div>
                <div className="text-sm sm:text-base text-white/80">{t("hero.stats.sponsorships.label") as string}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold">{t("hero.stats.campaigns.value") as string}</div>
                <div className="text-sm sm:text-base text-white/80">{t("hero.stats.campaigns.label") as string}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold">{t("hero.stats.cases.value") as string}</div>
                <div className="text-sm sm:text-base text-white/80">{t("hero.stats.cases.label") as string}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/donate-form">
                <Button
                  size="lg"
                  className="bg-[#34a853] hover:bg-[#2d9249] text-white px-5 sm:px-7 py-3 rounded-full text-base sm:text-lg shadow-lg"
                >
                  {t("hero.cta.donate") ?? "Donate Now"}
                </Button>
              </Link>
              <Link href="/donate-form">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#34a853] text-white hover:bg-[#2d9249] px-5 sm:px-7 py-3 rounded-full text-base sm:text-lg shadow-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    <span>{t("hero.cta.quickDonate") ?? "Quick Donate"}</span>
                    <span dir="ltr">{isRTL ? "←" : "→"}</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-black">
        <div className="container px-4 md:px-6 mb-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <BookOpen className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t("work.badget")}
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl h-20">{t("work.title")}</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("work.subtitle")}
                </p>
              </div>
            </GSAPReveal>
          </div>
        </div>

        {/* Full-width scrolling section for foundation work */}
        <ScrollingCards
          cards={cardsData.map(card => ({
            title: card.title as string,
            excerpt: card.excerpt as string,
            image: card.image,
            href: card.href,
            date: card.date,
            category: card.category,
            isClickable: true
          }))}
          isAnyCardHovered={isAnyCardHovered}
          onHoverChange={setIsAnyCardHovered}
          direction={isRTL ? 'rtl' : 'ltr'}
        />
      </section>

      {/* News Section */}
      <section className="py-12 md:py-16 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mb-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t("news.badge")}
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl h-20 pt-4">{t("news.title")}</GSAPTextReveal>
              </div>
            </GSAPReveal>
          </div>
        </div>

        {/* News Cards - 3 Cards in Center */}
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl w-full">
              {newsCards.slice(0, 3).map((news, index) => (
                <GSAPReveal key={news.href} animation="fade" delay={index * 0.1}>
                  <NewsCard
                    title={news.title}
                    excerpt={news.excerpt}
                    image={news.image}
                    href={news.href}
                    date={news.date}
                  />
                </GSAPReveal>
              ))}
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 mt-8">
          <GSAPReveal animation="fade" delay={0.4}>
            <div className="flex justify-center">
              <Link href="/news">
                <Button variant="outline" className={`group ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t("news.viewAll")}
                  <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                </Button>
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className={`order-2 lg:order-1 ${isRTL ? "lg:pl-10" : "lg:pr-10"}`}>
              <div className="relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3] max-w-2xl mx-auto">
                <Image
                  src="/EmpoweringGazaStudents.png"
                  alt={t("impact.title") as string}
                  width={640}
                  height={480}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                <div className="text-[#1e7e34] font-semibold text-sm md:text-base">
                  {t("impact.badge")}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                  {t("impact.title")}
                </h2>
                <span className="inline-block h-1 w-14 rounded-full bg-amber-400" />
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {t("impact.description")}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#1e7e34]">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                        {t(`impact.items.${item}.title` as const)}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        {t(`impact.items.${item}.desc` as const)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Video */}
      <section className="py-24 md:py-32 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:gap-16 md:grid-cols-3 items-stretch max-w-[95rem] mx-auto">
            {/* Vision - Left */}
            <div className={`flex flex-col items-center text-center space-y-3 min-h-[400px] justify-center ${isRTL ? 'md:order-3' : 'md:order-1'}`}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white text-balance">
                {t("about.vision.title") as string}
              </h3>
              <span className="h-1.5 w-16 rounded-full bg-amber-500" />
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-snug w-full max-w-2xl text-balance">
                {t("about.vision.text") as string}
              </p>
            </div>

            {/* Image Stack - Center */}
            <div className="md:order-2 flex flex-col items-center justify-center">
              <div className="relative h-80 w-full max-w-md mx-auto">
                <AnimatePresence>
                  {missionVisionImages.map((image, index) => (
                    <motion.div
                      key={image.src}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: image.rotation,
                      }}
                      animate={{
                        opacity: isImageActive(index) ? 1 : 0.7,
                        scale: isImageActive(index) ? 1 : 0.95,
                        z: isImageActive(index) ? 0 : -100,
                        rotate: isImageActive(index) ? 0 : image.rotation,
                        zIndex: isImageActive(index)
                          ? 40
                          : missionVisionImages.length + 2 - index,
                        y: isImageActive(index) ? [0, -80, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: 100,
                        rotate: image.rotation,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={500}
                        height={500}
                        className="h-full w-full rounded-3xl object-cover object-center"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-4 mt-6" dir="ltr">
                <button
                  onClick={handlePrevImage}
                  className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Mission - Right */}
            <div className={`flex flex-col items-center text-center space-y-3 min-h-[400px] justify-center ${isRTL ? 'md:order-1' : 'md:order-3'}`}>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white text-balance">
                {t("about.mission.title") as string}
              </h3>
              <span className="h-1.5 w-16 rounded-full bg-amber-500" />
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-snug w-full max-w-2xl text-balance">
                {t("about.mission.text") as string}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Section - new design */}
      <section className="py-20 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-3 mb-10">
            <div className={`inline-flex items-center rounded-full bg-[#e6f4ea] text-[#1e7e34] px-4 py-2 text-sm font-semibold ${isRTL ? "flex-row-reverse" : ""}`}>
              {t("programs.home.badge") as string}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {t("programs.home.title") as string}
            </h2>
            <span className="h-1 w-12 rounded-full bg-amber-400" />
          </div>

          <div className={`grid gap-6 md:grid-cols-3 ${isRTL ? "text-right" : "text-left"}`}>
            {[
              {
                title: t("programs.home.card1.title") as string,
                desc: t("programs.home.card1.desc") as string,
                icon: <Stethoscope className="h-10 w-10" />,
                color: "bg-[#2f5d8a]",
                href: "/programs/pulse-of-life",
              },
              {
                title: t("programs.home.card2.title") as string,
                desc: t("programs.home.card2.desc") as string,
                icon: <BriefcaseMedical className="h-10 w-10" />,
                color: "bg-[#1f9f63]",
                href: "/programs/palestinian-talented",
              },
              {
                title: t("programs.home.card3.title") as string,
                desc: t("programs.home.card3.desc") as string,
                icon: <Ambulance className="h-10 w-10" />,
                color: "bg-[#2f5d8a]",
                href: "/programs/justice-for-palestine",
              },
            ].map((card) => (
              <LinkPreview
                key={card.title}
                url={card.href}
                className="block w-full no-underline"
              >
                <div
                  className={`rounded-2xl ${card.color} text-white shadow-xl p-8 flex flex-col items-center text-center space-y-4`}
                >
                  {card.icon}
                  <h3 className="text-2xl font-semibold">{card.title}</h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">{card.desc}</p>
                </div>
              </LinkPreview>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/programs">
              <Button
                className={`bg-[#1f9f63] hover:bg-[#188352] text-white px-8 py-6 rounded-xl text-lg shadow-lg transition-transform duration-200 hover:-translate-y-0.5 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t("programs.home.button") as string}
                <ArrowRight className={`h-5 w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Handshake className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t("partners.badge")}
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl h-20 pt-4">
                  {t("about.partners.title")}
                </GSAPTextReveal>
              </div>
            </GSAPReveal>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {partners.map((partner, index) => (
                <GSAPReveal key={partner.name} animation="fade" delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex items-center justify-center h-24 w-32">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        width={200}
                        height={128}
                        sizes="(min-width: 1024px) 18vw, 50vw"
                      />
                    </div>
                    <p className="font-medium text-black dark:text-white text-sm md:text-base">
                      {partner.name}
                    </p>
                  </div>
                </GSAPReveal>
              ))}

              <GSAPReveal key={specialPartner.name} animation="fade" delay={partners.length * 0.1}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="flex items-center justify-center h-24 w-32">
                    <Image
                      src={specialPartner.logo}
                      alt={specialPartner.name}
                      className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                      width={160}
                      height={160}
                      sizes="(min-width: 1024px) 18vw, 50vw"
                    />
                  </div>
                  <p className="font-medium text-black dark:text-white text-sm md:text-base">
                    {specialPartner.name}
                  </p>
                </div>
              </GSAPReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Preview */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/contactUS/cover.jpeg"
            alt="Contact Us Background"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className={`inline-flex items-center rounded-lg bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MessageSquare className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t("contact.badge")}
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl text-white h-20 text-center mx-auto max-w-3xl">{t("contact.title")}</GSAPTextReveal>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto text-center">
                  {t("contact.subtitle")}
                </p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="fade" delay={0.3}>
              <div className="flex justify-center pt-8 gap-4">
                <Link href="/contact">
                  <Button size="lg" className={`group bg-white text-primary hover:bg-white/90 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t("contact.button")}
                    <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                  </Button>
                </Link>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </div>
  )
}

