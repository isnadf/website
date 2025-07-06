"use client"

import { useLanguage } from "@/components/language-provider"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { SplitText } from "gsap/SplitText"
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaExclamationTriangle, FaChartBar, FaQuoteLeft, FaArrowRight, FaPlay, FaStar, FaHeart } from "react-icons/fa"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText)

// Real content from the educational environment PDF
const sections = [ 
  {
    id: 1,
    image: "/educationalenvironment/section1.png",
    titleKey: "educational.environment.section1.title",
    bodyKey: "educational.environment.section1.body",
    color: "from-blue-500 to-cyan-500",
    icon: FaUserGraduate
  }
]

export default function EducationalEnvironmentPage() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [isInImmersiveSection, setIsInImmersiveSection] = useState(false)

  useEffect(() => {
    // Hero animation with enhanced effects
    if (heroRef.current) {
      const heroTl = gsap.timeline()
      
      // Background elements animation
      heroTl.fromTo(
        heroRef.current.querySelectorAll('.hero-bg-element'),
        { 
          opacity: 0, 
          scale: 0.5, 
          rotation: 180,
          y: 100 
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          y: 0, 
          stagger: 0.2, 
          duration: 2, 
          ease: "elastic.out(1, 0.5)" 
        }
      )

      // Title split text animation
      const titleElement = heroRef.current.querySelector('.hero-title')
      if (titleElement) {
        const splitTitle = new SplitText(titleElement, { type: "chars, words" })
        heroTl.fromTo(
          splitTitle.chars,
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -90,
            scale: 0.5 
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            scale: 1, 
            stagger: 0.05, 
            duration: 1, 
            ease: "back.out(1.7)" 
          },
          "-=1"
        )
      }

      // Subtitle and button animation
      heroTl.fromTo(
        heroRef.current.querySelectorAll('.hero-content'),
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.8 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.3, 
          duration: 1.2, 
          ease: "power3.out" 
        },
        "-=0.5"
      )

      // Floating animation for hero elements
      gsap.to(heroRef.current.querySelectorAll('.float-animation'), {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
    }

    // Enhanced section animations with alternating layouts
    sectionsRef.current.forEach((section, sectionIndex) => {
      if (!section) return

      const isEven = sectionIndex % 2 === 0
      const imageElement = section.querySelector('.section-image')
      const textElements = section.querySelectorAll('.section-text')
      const iconElement = section.querySelector('.section-icon')

      // Section entrance with dramatic effect
      gsap.fromTo(
        section,
        { 
          opacity: 0,
          scale: 0.8,
          rotationY: isEven ? 15 : -15,
          y: 100
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentSection(sectionIndex),
            onEnterBack: () => setCurrentSection(sectionIndex)
          }
        }
      )

      // Image animation with morphing effect
      if (imageElement) {
        const imageTl = gsap.timeline({
          scrollTrigger: {
            trigger: imageElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        })

        imageTl.fromTo(
          imageElement,
          { 
            opacity: 0,
            x: isEven ? -150 : 150,
            scale: 0.5,
            rotationY: isEven ? -30 : 30,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out"
          }
        )

                 // Remove breathing and parallax animations to keep images static
      }

      // Text reveal with split text
      textElements.forEach((textElement, textIndex) => {
        const splitText = new SplitText(textElement, { type: "lines, words" })
        
        gsap.fromTo(
          splitText.lines,
          { 
            opacity: 0,
            y: 50,
            rotationX: 15,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textElement,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Icon animation
      if (iconElement) {
        gsap.fromTo(
          iconElement,
          { 
            opacity: 0,
            scale: 0,
            rotation: 180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: iconElement,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )

                 // Remove continuous rotation to keep icons static
      }


    })

    // Background color transition
    gsap.to("body", {
      backgroundColor: "#ffffff",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "bottom top",
        end: "bottom top",
        toggleActions: "play none none reverse"
      }
    })

    // Navbar control
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top",
      end: "bottom top",
      onEnter: () => {
        setIsInImmersiveSection(true)
        document.body.classList.add('immersive-mode')
      },
      onLeave: () => {
        setIsInImmersiveSection(false)
        document.body.classList.remove('immersive-mode')
      },
      onEnterBack: () => {
        setIsInImmersiveSection(true)
        document.body.classList.add('immersive-mode')
      },
      onLeaveBack: () => {
        setIsInImmersiveSection(false)
        document.body.classList.remove('immersive-mode')
      }
    })

  }, [language])

  return (
    <>
      <style jsx global>{`
        body.immersive-mode header {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translateY(-100%) !important;
          transition: all 0.5s ease-in-out !important;
        }
        
        body.immersive-mode header * {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .text-gradient {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .arabic-single-line {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .arabic-single-line:lang(ar) {
          white-space: nowrap !important;
          word-spacing: normal;
          letter-spacing: normal;
          line-height: 1 !important;
          overflow: hidden;
        }
      `}</style>
      
      <main className={`flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 overflow-hidden ${isInImmersiveSection ? 'immersive-mode' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
          {/* Hero Image Only */}
          <img 
            src="/educationalenvironment/hero.jpg" 
            alt="Educational Environment Hero" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
            style={{objectPosition: 'center'}}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          
          {/* Hero Content */}
          <div className="relative z-20 text-center text-white px-6 max-w-8xl mx-auto">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight arabic-single-line h-40">
              {t("educational.environment.hero.title")}
            </h1>
            
            {/* Subtitle */}
            <div className="mb-8 max-w-5xl mx-auto">
              <div className="backdrop-blur-sm bg-black/20 px-6 py-4 rounded-2xl border border-white/10 shadow-2xl">
                <div className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed">
                  <TextGenerateEffect 
                    words={t("educational.environment.hero.subtitle") as string}
                    className="text-white"
                    duration={0.3}
                  />
                </div>
              </div>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  document.querySelector('.bg-white')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                <FaBookOpen className="mr-2" style={{ marginRight: language === 'ar' ? '0' : '.5rem', marginLeft: language === 'ar' ? '.5rem' : '0' }} />
                {t("educational.environment.hero.learnReality")}
              </button>
              <a 
                href="/donate" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                <FaHeart className="mr-3" style={{ marginRight: language === 'ar' ? '0' : '.5rem', marginLeft: language === 'ar' ? '.5rem' : '0' }} />
                {t("educational.environment.hero.supportPalestinianEducation")}
              </a>
            </div>
            

          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl float-animation"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full blur-lg float-animation" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-400/20 rounded-full blur-md float-animation" style={{animationDelay: '2s'}}></div>
        </section>

        {/* Apple-style Clean Sections */}
        <div className="bg-white">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0
            const IconComponent = section.icon
            
            return (
              <section
                key={section.id}
                ref={(el: HTMLDivElement | null) => { sectionsRef.current[index] = el }}
                className="py-32 px-6 relative"
              >
                <div className="max-w-7xl mx-auto">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                    
                    {/* Image Section */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl section-image">
                          <img 
                            src={section.image} 
                            alt={`Educational Environment Section ${section.id}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>

                      
                      {/* Title */}
                      <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight section-text">
                        {t(section.titleKey)}
                      </h2>
                      
                      {/* Body Content */}
                      <div className="text-xl leading-relaxed text-gray-600 section-text max-w-2xl">
                        {t(section.bodyKey)}
                      </div>


                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>


      </main>
    </>
  )
} 