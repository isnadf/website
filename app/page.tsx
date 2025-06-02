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
    { name: "Partner1", logo: "/partners/p1.jpg", type: "Academic Partner" },
    { name: "Partner2", logo: "/partners/p2.png", type: "Academic Partner" },
    { name: "Partner3", logo: "/partners/p3.jpeg", type: "Academic Partner" },
    { name: "Partner4", logo: "/partners/p4.png", type: "International Organization" },
    { name: "Partner5", logo: "/partners/p5.png", type: "Development Partner" },
    { name: "Partner6", logo: "/partners/p6.png", type: "Government Partner" }
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
      </section>

      {/* News Section */}
      <section className="py-12 md:py-16 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mb-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Calendar className="mr-1 h-4 w-4" />
                  Latest Updates
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl h-20">News & Announcements</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay informed with our latest news, updates, and important announcements from the foundation.
                </p>
              </div>
            </GSAPReveal>
          </div>
        </div>

        {/* News Cards */}
        <ScrollingCards
          cards={[
            {
              title: "Interviews for the first phase of the Nabd Al Hayat grant continue",
              excerpt: "Ongoing interviews to select 100 Gaza students for the Nabd al-Hayat scholarship program. Partnership between Isnad Foundation and Alkhidmat Europe.",
              image: "/cover3.png",
              href: "/news/nabd-al-hayat-grant-interviews",
              date: "May 5, 2025",
              category: "Scholarships"
            },
            {
              title: "Partnership with Istanbul University",
              excerpt: "We're excited to announce our new partnership with Istanbul University to provide more opportunities for Palestinian students.",
              image: "/cover3.png",
              href: "/news/istanbul-university-partnership",
              date: "May 28, 2023",
              category: "Partnerships"
            },
            {
              title: "Annual Conference Success",
              excerpt: "Our annual conference brought together students, educators, and partners from around the world to discuss educational opportunities.",
              image: "/cover3.png",
              href: "/news/annual-conference",
              date: "April 10, 2023",
              category: "Events"
            },
            {
              title: "Foundation Expands Support to Lebanon",
              excerpt: "Our foundation is expanding its support programs to reach Palestinian students in Lebanon, providing new opportunities for education.",
              image: "/cover3.png",
              href: "/news/lebanon-expansion",
              date: "December 12, 2022",
              category: "Announcements"
            }
          ]}
          isAnyCardHovered={isAnyCardHovered}
          onHoverChange={setIsAnyCardHovered}
          direction="rtl"
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

      {/* Student Journey Section (replacing Program Impact) */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <GSAPReveal animation="slide-up">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Users className="mr-1 h-4 w-4" />
                  Student Journey
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl">Your Path to Success</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From application to graduation, we provide comprehensive support at every step of your academic journey.
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
                <h3 className="mb-2 text-xl font-semibold">Application</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Submit your application through our streamlined process. We review each application carefully to identify promising candidates.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Online Application Form
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Document Submission
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Initial Screening
                  </li>
                </ul>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Selection</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Our expert committee evaluates candidates based on academic excellence, leadership potential, and commitment to community.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Academic Review
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Interview Process
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Final Selection
                  </li>
                </ul>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Support</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Receive comprehensive support throughout your academic journey, including financial aid, mentorship, and career guidance.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Financial Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Academic Mentoring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Career Development
                  </li>
                </ul>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Success</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Join our network of successful graduates who are making a difference in their communities and beyond.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Graduation Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Alumni Network
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Career Opportunities
                  </li>
                </ul>
              </div>
            </GSAPReveal>
          </div>

          <GSAPReveal animation="fade" delay={0.6}>
            <div className="mt-12 text-center">
              <Link href="/apply">
                <Button className="group bg-primary hover:bg-primary/90 text-white">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                Join Us in Empowering Palestinian Students
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Your support can make a lasting impact on the lives of talented Palestinian students. Together, we can build a brighter future through education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Apply for Scholarship
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Support Our Cause
                    <Heart className="ml-2 h-4 w-4" />
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
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Handshake className="mr-1 h-4 w-4" />
                  Our Partners
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl">Working Together for Change</GSAPTextReveal>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We collaborate with leading institutions and organizations to provide comprehensive support to Palestinian students.
                </p>
              </div>
            </GSAPReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <GSAPReveal key={index} animation="fade" delay={index * 0.1}>
                <div className="group relative flex items-center justify-center p-4 transition-all duration-300 hover:scale-105">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-1 text-xs text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-800 dark:text-gray-300">
                    {partner.type}
                  </div>
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
                <div className="inline-flex items-center rounded-lg bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Get in Touch
                </div>
                <GSAPTextReveal className="text-3xl font-bold sm:text-5xl text-white">Contact Us</GSAPTextReveal>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? Our team is here to help you with any inquiries about our programs and application
                  process.
                </p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="fade" delay={0.3}>
              <div className="flex justify-center pt-8 gap-4">
                <Link href="/contact">
                  <Button size="lg" className="group bg-white text-primary hover:bg-white/90">
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

