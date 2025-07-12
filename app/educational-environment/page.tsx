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
  },
  {
    id: 2,
    image: "/educationalenvironment/p2.jpg",
    titleKey: "educational.environment.section2.title",
    bodyKey: "educational.environment.section2.body",
    color: "from-green-500 to-emerald-500",
    icon: FaChartBar
  },
  {
    id: 3,
    image: "/educationalenvironment/p6.jpeg",
    titleKey: "educational.environment.section3.title",
    bodyKey: "educational.environment.section3.body",
    color: "from-purple-500 to-pink-500",
    icon: FaBookOpen
  },
  {
    id: 4,
    image: "/educationalenvironment/p4.jpg",
    titleKey: "educational.environment.section4.title",
    bodyKey: "educational.environment.section4.body",
    color: "from-orange-500 to-red-500",
    icon: FaExclamationTriangle
  },
  {
    id: 5,
    image: "/educationalenvironment/p1.webp",
    titleKey: "educational.environment.section5.title",
    bodyKey: "educational.environment.section5.body",
    color: "from-indigo-500 to-blue-500",
    icon: FaChalkboardTeacher
  },
  {
    id: 6,
    image: "/educationalenvironment/p5.jpeg",
    titleKey: "educational.environment.section6.title",
    bodyKey: "educational.environment.section6.body",
    color: "from-red-500 to-pink-500",
    icon: FaExclamationTriangle
  },
  {
    id: 7,
    image: "/educationalenvironment/p10.jpg",
    titleKey: "educational.environment.section7.title",
    bodyKey: "educational.environment.section7.body",
    color: "from-gray-600 to-black",
    icon: FaExclamationTriangle
  },
  {
    id: 8,
    image: "/educationalenvironment/p3.jpg",
    titleKey: "educational.environment.section8.title",
    bodyKey: "educational.environment.section8.body",
    color: "from-brown-600 to-red-800",
    icon: FaExclamationTriangle
  },
  {
    id: 9,
    image: "/educationalenvironment/p8.jpeg",
    titleKey: "educational.environment.section9.title",
    bodyKey: "educational.environment.section9.body",
    color: "from-yellow-600 to-orange-600",
    icon: FaExclamationTriangle
  },
  {
    id: 10,
    image: "/educationalenvironment/p7.jpeg",
    titleKey: "educational.environment.section10.title",
    bodyKey: "educational.environment.section10.body",
    color: "from-rose-700 to-rose-900",
    icon: FaExclamationTriangle
  }
]

// Sample data for assassinated academics
const assassinatedAcademics = [
  { name: "د. ميخائيل نوفل", position: "رئيس الجمعية الإسلامية بغزة", nameEn: "Dr. Mikhail Nofal", positionEn: "President of the Islamic Society in Gaza" },
  { name: "د. حسن الزرد", position: "رئيس الكلية الجامعية للعلوم التطبيقية", nameEn: "Dr. Hassan Al-Zard", positionEn: "President of the University College of Applied Sciences" },
  { name: "د. ياسر أبو إبراهيم", position: "عميد كلية الشريعة والقانون بالجامعة الإسلامية", nameEn: "Dr. Yasser Abu Ibrahim", positionEn: "Dean of the Faculty of Sharia and Law at the Islamic University" },
  { name: "د. بدر الأشل", position: "عميد كلية التربية بالجامعة الإسلامية", nameEn: "Dr. Badr Al-Ashal", positionEn: "Dean of the Faculty of Education at the Islamic University" },
  { name: "د. نصر عبد الجواد", position: "رئيس الجامعة الإسلامية الأسبق", nameEn: "Dr. Nasser Abdel Jawad", positionEn: "Former President of the Islamic University" },
  { name: "د. محمود أبو ندى", position: "أستاذ أصول الدين في الجامعة الإسلامية", nameEn: "Dr. Mahmoud Abu Nada", positionEn: "Professor of Fundamentals of Religion at the Islamic University" },
  { name: "د. محمد أبو سعدة", position: "أستاذ الشريعة بالجامعة الإسلامية", nameEn: "Dr. Mohammed Abu Sa'da", positionEn: "Professor of Sharia at the Islamic University" },
  { name: "د. عمر دراغمة", position: "عميد مساعد بكلية الطب البشري بالجامعة الإسلامية", nameEn: "Dr. Omar Daraghmeh", positionEn: "Assistant Dean of the Faculty of Medicine at the Islamic University" },
  { name: "د. أحمد أبو عيشة", position: "وزير التربية والتعليم الفلسطيني الأسبق", nameEn: "Dr. Ahmed Abu Eisha", positionEn: "Former Palestinian Minister of Education" },
  { name: "د. أحمد عوض الله", position: "عميد كلية التمريض بجامعة فلسطين", nameEn: "Dr. Ahmed Awadallah", positionEn: "Dean of the Faculty of Nursing at Palestine University" },
  { name: "د. محمد شتات", position: "عميد كلية الإعلام وعلوم الصحة بجامعة فلسطين", nameEn: "Dr. Mohammed Shtat", positionEn: "Dean of the Faculty of Media and Health Sciences at Palestine University" },
  { name: "د. أدهم حسونة", position: "محاضر في الإعلام في الجامعات الفلسطينية", nameEn: "Dr. Adham Hassouna", positionEn: "Media Lecturer at Palestinian Universities" },
  { name: "د. أحمد الغزالي", position: "محاضر تكنولوجيا المعلومات وأكاديمي جامعي", nameEn: "Dr. Ahmed Al-Ghazali", positionEn: "IT Lecturer and University Academic" },
  { name: "د. نعيمة أبو شرخ", position: "أستاذة الفنون الجميلة بجامعة الأقصى", nameEn: "Dr. Naeema Abu Sharkh", positionEn: "Professor of Fine Arts at Al-Aqsa University" },
  { name: "د. عبد الناصر السر", position: "أستاذ الفقه في جامعة الأقصى", nameEn: "Dr. Abdul Nasser Al-Sir", positionEn: "Professor of Jurisprudence at Al-Aqsa University" },
  { name: "د. رضوان قدورة", position: "أستاذ الحديث في جامعة الأقصى", nameEn: "Dr. Radwan Qaddoura", positionEn: "Professor of Hadith at Al-Aqsa University" },
  { name: "د. فضل أبو هين", position: "أستاذ علم النفس بجامعة الأقصى", nameEn: "Dr. Fadl Abu Hein", positionEn: "Professor of Psychology at Al-Aqsa University" },
  { name: "د. وجيه المصري", position: "مدير جامعة القدس المفتوحة بخان يونس", nameEn: "Dr. Wajih Al-Masri", positionEn: "Director of Al-Quds Open University in Khan Younis" },
  { name: "د. رفعت الأشقر", position: "أستاذ اللغة العربية في جامعة الأزهر", nameEn: "Dr. Rifaat Al-Ashqar", positionEn: "Professor of Arabic Language at Al-Azhar University" },
  { name: "د. رفعت الصيرفي", position: "أستاذ اللغة الإنجليزية بالجامعة الإسلامية", nameEn: "Dr. Rifaat Al-Sirafi", positionEn: "Professor of English at the Islamic University" },
  { name: "د. منى العصار", position: "أستاذة اللغة الفرنسية في جامعة الأزهر", nameEn: "Dr. Mona Al-Assar", positionEn: "Professor of French Language at Al-Azhar University" },
  { name: "د. إسلام حمدوش", position: "أستاذ التاريخ الحديث في الجامعات الفلسطينية", nameEn: "Dr. Islam Hamdoush", positionEn: "Professor of Modern History in Palestinian Universities" },
  { name: "د. رائد نجم", position: "أستاذ علم النفس وأحد رموز الإصلاح في غزة", nameEn: "Dr. Raed Najm", positionEn: "Professor of Psychology and a Reform Figure in Gaza" },
  { name: "د. زكريا الأقرع", position: "عميد كلية الآداب بالجامعة الإسلامية", nameEn: "Dr. Zakaria Al-Aqra", positionEn: "Dean of the Faculty of Arts at the Islamic University" },
  { name: "د. عزو عقلية", position: "نائب عميد كلية التربية بالجامعة الإسلامية", nameEn: "Dr. Ezzo Aqliya", positionEn: "Vice Dean of the Faculty of Education at the Islamic University" },
  { name: "د. محمد رشيد", position: "أستاذ اللغة العربية والبلاغة بالجامعة الإسلامية", nameEn: "Dr. Mohammed Rashid", positionEn: "Professor of Arabic and Rhetoric at the Islamic University" },
  { name: "د. محمد خبيث", position: "أستاذ العقيدة والمذاهب المعاصرة بالجامعة الإسلامية", nameEn: "Dr. Mohammed Khubeith", positionEn: "Professor of Creed and Contemporary Sects at the Islamic University" },
  { name: "د. طارق ثابت", position: "أستاذ تكنولوجيا المعلومات بالكلية الجامعية", nameEn: "Dr. Tarek Thabet", positionEn: "IT Professor at the University College" },
  { name: "د. طاهر يوسف باغي", position: "أستاذ علم النفس بالجامعة الإسلامية", nameEn: "Dr. Taher Youssef Baghi", positionEn: "Professor of Psychology at the Islamic University" },
  { name: "د. أنس الرنتيسي", position: "محاضر في الطبابة في قطاع غزة", nameEn: "Dr. Anas Al-Rantisi", positionEn: "Medical Lecturer in Gaza" },
  { name: "د. إياد لبد", position: "محاضر في الجامعة الإسلامية بغزة", nameEn: "Dr. Eyad Labad", positionEn: "Lecturer at the Islamic University in Gaza" },
  { name: "د. وائل الزرد", position: "أستاذ علم الشريعة ومحاضر في عدة جامعات فلسطينية", nameEn: "Dr. Wael Al-Zard", positionEn: "Professor of Sharia and Lecturer at several Palestinian Universities" },
  { name: "د. ياسين نزال", position: "خبير دولي حاصل على درجة الماجستير في صحة المرأة", nameEn: "Dr. Yassin Nazzal", positionEn: "International Expert with Master's in Women's Health" },
  { name: "د. سهير العطار", position: "أخصائية في أمراض النساء والتوليد", nameEn: "Dr. Suheir Al-Attar", positionEn: "Specialist in Obstetrics and Gynecology" },
  { name: "د. خالد صافي", position: "محاضر واستشاري في إدارة الأبحاث والتطوير الأكاديمي", nameEn: "Dr. Khaled Safi", positionEn: "Lecturer and Consultant in Academic Research and Development" },
  { name: "د. خالد الملاحي", position: "حاصل على الدكتوراه في الهندسة من زونج تركيا", nameEn: "Dr. Khaled Al-Mallahi", positionEn: "PhD holder in Engineering from Turkey" },
  { name: "د. سعيد حلال الدهشان", position: "أستاذ وخبير القانون الدولي بجامعات غزة", nameEn: "Dr. Saeed Hilal Al-Dahshan", positionEn: "Professor and International Law Expert at Gaza Universities" }
]

// Animated vertical list component
function VerticalInfiniteList({ items, language }: { items: typeof assassinatedAcademics, language: string }) {
  return (
    <div className="overflow-hidden h-40 relative w-full">
      <div className="animate-vertical-marquee flex flex-col gap-4 absolute left-0 top-0 w-full">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="text-center text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 flex flex-col">
            <span>{language === 'ar' ? item.name : item.nameEn}</span>
            <span className="text-sm text-gray-500 dark:text-gray-300">{language === 'ar' ? item.position : item.positionEn}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes vertical-marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-marquee {
          animation: vertical-marquee 12s linear infinite;
        }
      `}</style>
    </div>
  )
}

// Animated vertical table component for section 10
function VerticalInfiniteTable({ items, language }: { items: typeof assassinatedAcademics, language: string }) {
      return (
      <div className="w-11/12 mx-auto rounded-xl shadow-lg flex flex-col items-stretch relative">
      {/* Animated content only */}
      <div className="overflow-hidden h-screen w-full">
        <table className="w-full text-center border-0">
          <tbody className="animate-vertical-marquee-table">
            {items.concat(items).map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 px-6 font-bold text-black drop-shadow-md">{language === 'ar' ? item.name : item.nameEn}</td>
                <td className="py-3 px-6 font-semibold text-black drop-shadow-sm">{language === 'ar' ? item.position : item.positionEn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        @keyframes vertical-marquee-table {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-vertical-marquee-table {
          animation: vertical-marquee-table 45s linear infinite;
        }
        

      `}</style>
    </div>
  )
}

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

      // Skip animations for section 10 (assassinated academics section)
      if (sectionIndex === 9) return

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
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none none",
            onEnter: () => setCurrentSection(sectionIndex),
            onEnterBack: () => setCurrentSection(sectionIndex),
            markers: false,
            fastScrollEnd: true,
            preventOverlaps: true
          }
        }
      )

      // Image animation with morphing effect
      if (imageElement) {
        const imageTl = gsap.timeline({
          scrollTrigger: {
            trigger: imageElement,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none",
            fastScrollEnd: true,
            preventOverlaps: true
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
              toggleActions: "play none none none",
              fastScrollEnd: true,
              preventOverlaps: true
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
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none none",
              fastScrollEnd: true,
              preventOverlaps: true
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
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[7rem] xl:min-h-[8rem] 2xl:min-h-[10rem] flex items-center justify-center px-4 max-w-full break-words">
              {typeof t("educational.environment.hero.title") === 'string' 
                ? (t("educational.environment.hero.title") as string).replace("education", "education\n")
                : t("educational.environment.hero.title")
              }
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
                className={`${section.id === 10 ? 'py-2 px-0' : 'py-32 px-6'} relative`}
              >
                <div className={section.id === 10 ? '' : 'max-w-7xl mx-auto'}>
                  {section.id === 10 ? (
                    <>
                      {/* Section 10 Title and Subtitle - Before the background section */}
                      <section className="py-32 px-6 relative bg-white mb-0">
                        <div className="max-w-7xl mx-auto">
                          <div className="flex flex-col items-center justify-center w-full space-y-8">
                            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 text-center section-text">
                              {t("educational.environment.section10.title")}
                            </h2>
                            <div className="text-xl text-gray-600 text-justify w-full mx-auto section-text max-w-4xl">
                              {t("educational.environment.section10.body")}
                            </div>
                          </div>
                        </div>
                      </section>
                      
                      {/* Background image and table section */}
                      <div className="relative flex flex-col items-center justify-center w-full">
                        {/* Background image with overlay */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src={section.image} 
                            alt="Assassinated Academics Memorial"
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-white/20"></div>
                        </div>
                        
                        {/* Table only */}
                        <div className="relative z-20 w-full px-6">
                          <VerticalInfiniteTable items={assassinatedAcademics} language={language} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}> 
                      {/* Image Section (skip for section 10) */}
                      {section.id !== 10 && (
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
                      )}
                      {/* Content Section */}
                      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-8 w-full`}>
                        {/* Title */}
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight section-text">
                          {t(section.titleKey)}
                        </h2>
                        {/* Body Content */}
                        <div className="text-xl leading-relaxed text-gray-600 section-text max-w-2xl text-justify">
                          {t(section.bodyKey)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>


      </main>
    </>
  )
} 