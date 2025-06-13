"use client"

import {
  Brain,
  Users,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  Eye,
  UserPlus,
  Scroll,
  Library,
  Microscope,
  ChevronDown,
  Download
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function IbnKhaldunScholarshipPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} className={`flex min-h-screen flex-col bg-purple-50 dark:bg-purple-950 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Scholarly/Academic-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-purple-50 dark:bg-purple-950 shadow-lg border-b-4 border-purple-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-xl">
              <Library size={48} className="text-white animate-pulse" />
            </div>
            <div className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg`}>
              <Brain size={16} className="text-purple-500 animate-bounce" />
            </div>
            <div className={`absolute -bottom-2 ${isRTL ? '-right-2' : '-left-2'} w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg`}>
              <Scroll size={16} className="text-indigo-500 animate-pulse" />
            </div>
          </div>
          <GSAPTextReveal className={`text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-sora drop-shadow-lg tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
            {t("ibn-khaldun.title")}
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className={`text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400 mt-2 h-10 ${isRTL ? 'font-arabic' : ''}`}>
            {t("ibn-khaldun.subtitle")}
          </GSAPTextReveal>
          <p className={`mt-4 text-lg md:text-xl text-purple-800 dark:text-purple-300 font-medium max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t("ibn-khaldun.tagline")}
          </p>
        </div>
        <div className={`flex justify-center gap-8 mt-8 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <StatsCounter number={200} label={t("ibn-khaldun.scholarships") as string} />
          <StatsCounter number={2} label={t("ibn-khaldun.fields") as string} />
          <StatsCounter number={5} label={t("ibn-khaldun.years") as string} />
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <h2 className={`text-xl font-bold text-indigo-700 mb-2 flex items-center justify-center gap-2 ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
            <Brain className={`text-purple-600 animate-pulse ${isRTL ? 'order-2' : ''}`} size={28} />
            <span>{t("ibn-khaldun.about.title")}</span>
            <Library className={`text-indigo-600 animate-bounce ${isRTL ? 'order-1' : ''}`} size={28} />
          </h2>
          <p className={`text-gray-800 dark:text-gray-100 text-base md:text-lg text-center ${isRTL ? 'font-arabic' : ''}`}>
            {t("ibn-khaldun.about.desc")}
          </p>
          <div className={`flex justify-center mt-6 gap-4 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer">
                <GraduationCap size={22} className={`${isRTL ? 'order-2' : '-ml-1'} animate-pulse`} /> {t("ibn-khaldun.apply")}
              </a>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-black hover:bg-transparent hover:text-purple-600 border-none font-semibold group"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  {language === 'ar' ? 'تحميل البرنامج' : 'Download Program'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-gray-200">
                <DropdownMenuItem asChild>
                  <a href="/ProgramsFiles/ibn-khaldun-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    English (EN)
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/ProgramsFiles/ibn-khaldun-AR.pdf" download className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    العربية (AR)
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-purple-50 dark:bg-purple-950">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.fields.title")}</GSAPTextReveal>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[400px] justify-center hover:scale-105 transition-transform duration-300">
                <Users className="text-blue-700 mb-4" size={48} />
                <h3 className={`text-2xl font-bold text-center text-blue-800 dark:text-blue-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.fields.sociology.title")}</h3>
                <p className={`text-gray-600 dark:text-gray-300 text-sm text-center mb-6 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.fields.sociology.desc")}
                </p>
                <div className={`space-y-3 text-sm w-full max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>
                  {Array.isArray(t("ibn-khaldun.fields.sociology.points")) && (t("ibn-khaldun.fields.sociology.points") as string[]).map((point, index) => (
                    <div key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <div className={`w-2 h-2 bg-blue-500 rounded-full ${isRTL ? 'order-2' : ''}`}></div>
                      <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic text-right' : ''}`}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[400px] justify-center hover:scale-105 transition-transform duration-300">
                <Brain className="text-purple-700 mb-4" size={48} />
                <h3 className={`text-2xl font-bold text-center text-purple-800 dark:text-purple-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.fields.psychology.title")}</h3>
                <p className={`text-gray-600 dark:text-gray-300 text-sm text-center mb-6 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.fields.psychology.desc")}
                </p>
                <div className={`space-y-3 text-sm w-full max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>
                  {Array.isArray(t("ibn-khaldun.fields.psychology.points")) && (t("ibn-khaldun.fields.psychology.points") as string[]).map((point, index) => (
                    <div key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <div className={`w-2 h-2 bg-purple-500 rounded-full ${isRTL ? 'order-2' : ''}`}></div>
                      <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic text-right' : ''}`}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-purple-50 dark:bg-purple-950">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.requirements.title")}</GSAPTextReveal>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Globe className="text-purple-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.requirements.nationality")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-purple-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.requirements.degree")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Award className="text-purple-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.requirements.gpa")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <BookOpen className="text-purple-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.requirements.research")}</h3>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Problem Indicators Section */}
      <section className="py-16 px-4 md:px-0 bg-purple-50 dark:bg-purple-950">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>
            {t("ibn-khaldun.problems.title")}
          </GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 h-[280px] flex flex-col">
                <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-300 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.problems.experts")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t("ibn-khaldun.problems.experts.desc")}
                </p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 h-[280px] flex flex-col">
                <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-300 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.problems.fragmentation")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t("ibn-khaldun.problems.fragmentation.desc")}
                </p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 h-[280px] flex flex-col">
                <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-300 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.problems.research")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t("ibn-khaldun.problems.research.desc")}
                </p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 h-[280px] flex flex-col">
                <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-300 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.problems.local")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t("ibn-khaldun.problems.local.desc")}
                </p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 h-[280px] flex flex-col">
                <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-300 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.problems.programs")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t("ibn-khaldun.problems.programs.desc")}
                </p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.5}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 h-[280px] flex flex-col">
                <h3 className={`text-xl font-bold text-purple-800 dark:text-purple-300 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.problems.policy")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t("ibn-khaldun.problems.policy.desc")}
                </p>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Financial Support Structure Section */}
      <section className="py-16 px-4 md:px-0 bg-purple-50 dark:bg-purple-950">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>
            {t("ibn-khaldun.financial.title")}
          </GSAPTextReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 border border-purple-100 dark:border-purple-900">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-white" size={32} />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold text-center text-purple-800 dark:text-purple-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.financial.tuition.title")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 text-center mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.financial.tuition.desc")}
                </p>
                <div className="text-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    $3,000
                  </span>
                  <span className={`text-gray-600 dark:text-gray-400 ml-2 ${isRTL ? 'font-arabic mr-2 ml-0' : ''}`}>
                    {t("ibn-khaldun.financial.perYear")}
                  </span>
                </div>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 border border-purple-100 dark:border-purple-900">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={32} />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold text-center text-purple-800 dark:text-purple-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.financial.stipend.title")}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 text-center mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.financial.stipend.desc")}
                </p>
                <div className="text-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    $2,400
                  </span>
                  <span className={`text-gray-600 dark:text-gray-400 ml-2 ${isRTL ? 'font-arabic mr-2 ml-0' : ''}`}>
                    {t("ibn-khaldun.financial.perYear")}
                  </span>
                </div>
              </div>
            </GSAPReveal>
          </div>

          <div className="max-w-3xl mx-auto">
            <GSAPReveal animation="slide-up">
              <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
                <h3 className={`text-2xl font-bold text-center text-purple-800 dark:text-purple-300 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.financial.total.title")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                    <p className={`text-gray-600 dark:text-gray-400 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {t("ibn-khaldun.financial.total.annual")}
                    </p>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      $5,400
                    </span>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
                    <p className={`text-gray-600 dark:text-gray-400 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {t("ibn-khaldun.financial.total.fiveYear")}
                    </p>
                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      $27,000
                    </span>
                  </div>
                </div>
                <p className={`text-center text-gray-600 dark:text-gray-400 mt-6 italic ${isRTL ? 'font-arabic' : ''}`}>
                  {t("ibn-khaldun.financial.note")}
                </p>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-purple-50 dark:bg-purple-950">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className={`text-xl font-bold text-purple-800 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.contact.title")}</GSAPTextReveal>
          <p className={`text-gray-700 dark:text-gray-200 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("ibn-khaldun.contact.desc")}</p>
          <div className={`flex flex-col md:flex-row justify-center items-center gap-4 text-lg ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <a href="mailto:info@isnadf.org" className={`flex items-center gap-2 text-purple-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Mail className="text-purple-700" size={22} /> info@isnadf.org
            </a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className={`flex items-center gap-2 text-purple-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Phone className="text-purple-700" size={22} /> <span dir="ltr">+90 539 430 07 26</span>
            </a>
          </div>
        </div>

        <div className={`flex justify-center my-8 gap-4 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-indigo-600 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer">
              <UserPlus size={26} className={`${isRTL ? 'order-2' : '-ml-1'}`} /> {t("ibn-khaldun.apply.now")}
            </a>
          </Button>

          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-black hover:bg-transparent hover:text-purple-600 border-none font-semibold group"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  {language === 'ar' ? 'تحميل البرنامج' : 'Download Program'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-gray-200">
                <DropdownMenuItem asChild>
                  <a href="/ProgramsFiles/ibn-khaldun-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    English (EN)
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/ProgramsFiles/ibn-khaldun-AR.pdf" download className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    العربية (AR)
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </section>
    </main>
  );
}
