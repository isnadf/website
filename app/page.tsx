"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, GraduationCap, Users, BookOpen, Award, Calendar, MessageSquare, Stethoscope, Laptop } from "lucide-react"
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
  const { t } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false)

  // Create cards data array for the ScrollingCards component
  const cardsData = [
    {
      title: t("card1.title"),
      excerpt: t("Card1.desc"),
      image: "/scholer.png?height=400&width=600",
      href: "/news/scholarships-academic-support",
      date: "May 15, 2024",
      category: "Scholarships"
    },
    {
      title: t("Card2.title"),
      excerpt: t("Card2.desc"),
      image: "/secondCard.png",
      href: "/news/capacity-building",
      date: "May 10, 2024",
      category: "Professional Development"
    },
    {
      title: t("Card3.title"),
      excerpt: t("Card3.desc"),
      image: "/thirdCard.png?height=400&width=600",
      href: "/news/scientific-research",
      date: "May 5, 2024",
      category: "Research"
    },
    {
      title: t("Card4.title"),
      excerpt: t("Card4.desc"),
      image: "/fourCard.png?height=400&width=600",
      href: "/news/national-identity",
      date: "April 28, 2024",
      category: "Community"
    },
    {
      title: t("Card5.title"),
      excerpt: t("Card5.desc"),
      image: "/fifthCard.png?height=400&width=600",
      href: "/news/palestinian-network",
      date: "April 20, 2024",
      category: "Network"
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
    <>
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
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <BookOpen className="mr-1 h-4 w-4" />
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

        {/* Full-width scrolling section */}
        <ScrollingCards
          cards={cardsData}
          isAnyCardHovered={isAnyCardHovered}
          onHoverChange={setIsAnyCardHovered}
        />

        <div className="container px-4 md:px-6 mt-8">
          <GSAPReveal animation="fade" delay={0.4}>
            <div className="flex justify-center">
              <Link href="/news">
                <Button variant="outline" className="group">
                  View All News
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  <span className="font-medium">Scholarship Programs</span>
                </div>
                <GSAPTextReveal className="text-4xl font-bold sm:text-6xl text-white tracking-tight">
                  Our Programs
                </GSAPTextReveal>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed font-light">
                  Empowering Palestinian students through specialized scholarship programs
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
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Pulse of Life</h3>
                      </div>
                      <div className="flex items-center gap-2 text-red-200">
                        <span className="font-medium">Medical & Health Sciences</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-5 w-5" />
                        <span>1,000 Scholarships Over 5 Years</span>
                      </div>
                    </div>
                    
                    <blockquote className="relative pl-4 border-l-2 border-red-300/50 italic text-white/90 text-lg">
                      "A bold national initiative providing full scholarships in medicine and health sciences, focusing on rare and critical specializations to strengthen healthcare in Palestine."
                    </blockquote>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">Program Focus</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            Medical Education
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            Healthcare Innovation
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">Key Features</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            Full Scholarships
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-300/50" />
                            5-Year Program
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
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Palestinian Talented</h3>
                      </div>
                      <div className="flex items-center gap-2 text-yellow-200">
                        <span className="font-medium">Excellence Scholarship</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-5 w-5" />
                        <span>1,000 Scholarships Available</span>
                      </div>
                    </div>

                    <blockquote className="relative pl-4 border-l-2 border-yellow-300/50 italic text-white/90 text-lg">
                      "Supporting outstanding Palestinian students across various academic fields, developing exceptional leaders who will drive innovation and progress in their communities."
                    </blockquote>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">Program Focus</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            Academic Excellence
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            Leadership Development
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium">Key Features</h4>
                        <ul className="space-y-2 text-white/80">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            Multiple Fields
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300/50" />
                            Comprehensive Support
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
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 group px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  Explore All Programs
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
              <StatsCounter number={5} label="Scholarships Awarded" />
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.1}>
              <StatsCounter number={2000} label="beneficiaries" />
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.3}>
              <StatsCounter number={6} label="Countries Reached" />
            </GSAPReveal>
            <GSAPReveal animation="fade" delay={0.4}>
              <StatsCounter number={98} label="Graduation Rate %" />
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Contact Us Preview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/10 dark:from-black dark:to-primary/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Get in Touch
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl">Contact Us</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? Our team is here to help you with any inquiries about our programs and application
                  process.
                </p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="fade" delay={0.3}>
              <div className="flex justify-center pt-8 gap-4">
                <Link href="/contact">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white">
                    Contact Our Team
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </>
  )
}

