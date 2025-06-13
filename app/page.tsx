"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, GraduationCap, Users, BookOpen, Award, Calendar, MessageSquare, Stethoscope, Laptop, Heart, Globe, Star, Trophy, Building2, Handshake, Microscope, Rocket, Target, Lightbulb, Globe2, Briefcase, Scale, Brain, Leaf, TreePine, Recycle, Sprout, Droplets, Crown, Library, Scroll, Flag, Gavel } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import ParallaxSection from "@/components/parallax-section"
import ProgramCard from "@/components/program-card"
import SuccessStoryCard from "@/components/success-story-card"
import StatsCounter from "@/components/stats-counter"
import ScrollingCards from "@/components/scrolling-cards"

export default function Home() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false)
  const isRTL = language === 'ar'

  // Create cards data array for the ScrollingCards component
  const cardsData = [
    {
      title: t("card1.title"),
      excerpt: t("Card1.desc"),
      image: "/work/2.jpeg",
      href: "/news/scholarships-academic-support",
      date: "",
      category: "Scholarships"
    },
    {
      title: t("Card2.title"),
      excerpt: t("Card2.desc"),
      image: "/work/4.jpeg",
      href: "/news/capacity-building",
      date: "",
      category: "Professional Development"
    },
    {
      title: t("Card3.title"),
      excerpt: t("Card3.desc"),
      image: "/work/3.jpeg",
      href: "/news/scientific-research",
      date: "",
      category: "Research"
    },
    {
      title: t("Card4.title"),
      excerpt: t("Card4.desc"),
      image: "/work/1.jpeg",
      href: "/news/national-identity",
      date: "",
      category: "Community"
    },
    {
      title: t("Card5.title"),
      excerpt: t("Card5.desc"),
      image: "/work/3.jpeg",
      href: "/news/palestinian-network",
      date: "",
      category: "Network"
    }
  ]

  // Replace impactData with programImpactData
  const programImpactData = [
    {
      title: "Pulse of Life",
      icon: <Stethoscope className="h-8 w-8" />,
      description: "Full scholarships in medicine and health sciences, supporting 1,000 students over 5 years",
      stats: "1,000 Scholarships",
      image: "/s3.png",
      color: "from-red-500/20 to-red-600/20",
      iconColor: "text-red-400",
      link: "/programs/pulse-of-life",
      fields: ["Human Medicine", "Dentistry", "Pharmacy", "Allied Health"]
    },
    {
      title: "Palestinian Talented",
      icon: <Crown className="h-8 w-8" />,
      description: "Supporting outstanding Palestinian students across various academic fields",
      stats: "1,000 Scholarships",
      image: "/cover2.png",
      color: "from-yellow-500/20 to-blue-600/20",
      iconColor: "text-yellow-400",
      link: "/programs/palestinian-talented",
      fields: ["Business", "Engineering", "Education", "Social Sciences", "Computer Science"]
    },
    {
      title: "Sustainability",
      icon: <TreePine className="h-8 w-8" />,
      description: "200 scholarships in energy and agricultural engineering for Palestine's green future",
      stats: "200 Scholarships",
      image: "/s3.png",
      color: "from-green-500/20 to-emerald-600/20",
      iconColor: "text-green-400",
      link: "/programs/sustainability",
      fields: ["Energy Engineering", "Agricultural Engineering", "Natural Resources"]
    }
  ]

  // Add partners data
  const partners = [
    { name: "Milli Gençlik Vakfı", logo: "/partners/p1.png", type: "Academic Partner" },
    { name: "YediHilal", logo: "/partners/p2.png", type: "Academic Partner" },
    { name: "Hüdayi Vakfı", logo: "/partners/p3.jpeg", type: "Academic Partner" },
    { name: "Khidhumaiy", logo: "/partners/p4.jpg", type: "International Organization" },
    { name: "FEDERATION OF INTERNATIONAL STUDENT ASSOCIATIONS", logo: "/partners/p5.png", type: "Development Partner" },
    { name: "Alkhidmat Europe", logo: "/partners/p6.png", type: "Government Partner" }
  ]

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
      const heroImages = heroRef.current.querySelectorAll(".hero-image")
      const heroContent = heroRef.current.querySelector(".hero-content")

      gsap.to(heroImages, {
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

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0 z-0 hero-image">
          {/* Desktop/PC Hero Image */}
          <img
            src="/hero-cover.jpg"
            alt="Isnad Foundation - Palestinian Student Support"
            className="hidden md:block h-full w-full object-contain"
          />
          {/* Mobile Hero Image */}
          <img
            src="/cover-mobil-isnad.png"
            alt="Isnad Foundation - Palestinian Student Support"
            className="block md:hidden h-full w-full object-cover"
          />
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
            isClickable: false
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
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("news.subtitle")}
                </p>
              </div>
            </GSAPReveal>
          </div>
        </div>

        {/* News Cards */}
        <ScrollingCards
          cards={newsCards}
          isAnyCardHovered={isAnyCardHovered}
          onHoverChange={setIsAnyCardHovered}
          direction={isRTL ? 'rtl' : 'ltr'}
        />

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

      {/* Our Programs Section */}
      <ParallaxSection
        backgroundImage="/s3.png?height=1080&width=1920" 
        className="py-24 md:py-32 text-white relative overflow-hidden"
      >
        {/* Remove gradient overlay and floating elements */}
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
            <GSAPReveal animation="slide-up">
              <div className="space-y-3">
                <div className={`inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <GraduationCap className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className="font-medium">{t("programs.badge")}</span>
                </div>
                <GSAPTextReveal className="text-4xl font-bold sm:text-6xl text-white h-20">
                  {t("programs.title")}
                </GSAPTextReveal>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed font-light">
                  {t("programs.subtitle")}
                </p>
              </div>
            </GSAPReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Pulse of Life Program */}
            <GSAPReveal animation="slide-right" className="group">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl border border-white/20">
                <div className="p-8 md:p-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-red-500/20">
                          <Stethoscope className="h-6 w-6 text-red-200" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{t("programs.pulse.title")}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-red-200">
                        <span className="font-medium">{t("programs.pulse.category")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-5 w-5" />
                        <span>{t("programs.pulse.scholarships")}</span>
                      </div>
                    </div>

                    <blockquote className="relative pl-4 border-l-2 border-red-300/50 italic text-white/90 text-lg">
                      "{t("programs.pulse.description")}"
                    </blockquote>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">{t("programs.pulse.focus")}</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            {t("programs.pulse.medical")}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            {t("programs.pulse.innovation")}
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">{t("programs.pulse.features")}</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            {t("programs.pulse.full")}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            {t("programs.pulse.years")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GSAPReveal>

            {/* Palestinian Talented Program */}
            <GSAPReveal animation="slide-left" className="group">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl border border-white/20">
                <div className="p-8 md:p-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-yellow-500/20">
                          <Award className="h-6 w-6 text-yellow-200" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{t("programs.talented.title")}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-200">
                        <span className="font-medium">{t("programs.talented.category")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-5 w-5" />
                        <span>{t("programs.talented.scholarships")}</span>
                      </div>
                    </div>

                    <blockquote className="relative pl-4 border-l-2 border-yellow-300/50 italic text-white/90 text-lg">
                      "{t("programs.talented.description")}"
                    </blockquote>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">{t("programs.talented.focus")}</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            {t("programs.talented.excellence")}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            {t("programs.talented.leadership")}
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">{t("programs.talented.features")}</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            {t("programs.talented.fields")}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            {t("programs.talented.support")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GSAPReveal>
          </div>

          <GSAPReveal animation="fade" delay={0.4}>
            <div className="flex justify-center pt-12">
              <Link href="/programs">
                <Button
                  className={`bg-white/20 hover:bg-white/30 text-white border-white/30 group px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {t("programs.explore")}
                  <ArrowRight className={`h-5 w-5 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                </Button>
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[hsl(0,76%,40%)] via-black to-[hsl(120,61%,34%)] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <GSAPReveal animation="fade" delay={0.1}>
              <StatsCounter number={5} label={t("stats.scholarships") as string} />
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.1}>
              <StatsCounter number={2000} label={t("stats.beneficiaries") as string} />
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.1}>
              <StatsCounter number={3} label={t("stats.pillars") as string} />
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.1}>
              <StatsCounter number={6} label={t("stats.partners") as string} />
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Student Journey Section (replacing Program Impact) */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className={`inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Users className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t("journey.badge")}
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl h-20">{t("journey.title")}</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("journey.subtitle")}
                </p>
              </div>
            </GSAPReveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Scroll className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t("journey.application.title")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("journey.application.description")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.application.form")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.application.documents")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.application.screening")}
                  </li>
                </ul>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t("journey.selection.title")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("journey.selection.description")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.selection.review")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.selection.interview")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.selection.final")}
                  </li>
                </ul>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t("journey.support.title")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("journey.support.description")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.support.financial")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.support.mentoring")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.support.career")}
                  </li>
                </ul>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t("journey.success.title")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("journey.success.description")}
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.success.graduation")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.success.alumni")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t("journey.success.opportunities")}
                  </li>
                </ul>
              </div>
            </GSAPReveal>
          </div>

          <GSAPReveal animation="fade" delay={0.6}>
            <div className="mt-12 text-center">
              <Link href="/programs">
                <Button className={`group bg-primary hover:bg-primary/90 text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t("journey.start")}
                  <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'}`} />
                </Button>
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-primary/90 to-primary dark:from-primary/80 dark:to-primary/90">
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center text-white">
            <GSAPReveal animation="slide-up">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl leading-loose [&:lang(ar)]:leading-[1.5] [&:lang(ar)]:tracking-wide">
                {t("cta.title")}
              </h2>
              <p className="mb-8 text-lg text-white/90">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate">
                  <Button size="lg" className={`bg-white text-primary hover:bg-white/90 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t("cta.button")}
                    <Heart className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  </Button>
                </Link>
              </div>
            </GSAPReveal>
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
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl h-20 pt-4">{t("partners.title")}</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("partners.subtitle")}
                </p>
              </div>
            </GSAPReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <GSAPReveal key={index} animation="fade" delay={index * 0.1}>
                <div className="flex flex-col items-center justify-between text-center h-full p-4 rounded-lg transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/10 hover:shadow-md">
                  <div className="flex items-center justify-center h-32 mb-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-32 w-auto object-contain transition-all duration-300 hover:scale-105"
                    />
                  </div>
                  <p className="font-medium text-black dark:text-white text-sm md:text-base">
                    {partner.name}
                  </p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Preview */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/contactUS/cover.jpeg"
            alt="Contact Us Background"
            className="h-full w-full object-cover"
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

