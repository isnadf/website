"use client"

import {
  GraduationCap,
  Award,
  BookOpen,
  Lightbulb,
  Globe,
  Users,
  Calendar,
  CheckSquare,
  DollarSign,
  Briefcase,
  Target,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Shield,
  Brain,
  Eye,
  Building,
  Trophy,
  Crown,
  Sparkles,
  Wallet,
  Laptop
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import StatsCounter from "@/components/stats-counter"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function PalestinianTalentedScholarshipPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} className={`flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 via-blue-50 to-white dark:from-yellow-950 dark:via-blue-900 dark:to-black ${isRTL ? 'font-arabic' : ''}`}>
      {/* Excellence-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-yellow-600/10 dark:from-yellow-900/20 dark:via-blue-900/20 dark:to-yellow-800/20 shadow-lg border-b-4 border-yellow-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
              <Crown size={48} className="text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Sparkles size={16} className="text-yellow-500 animate-spin" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Trophy size={16} className="text-blue-500 animate-pulse" />
            </div>
          </div>
          <GSAPTextReveal className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent font-sora drop-shadow-lg h-40 pt-5 tracking-wider">
            {t("talented.title")}
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 mt-2 h-10 -pt-2">
            {t("talented.subtitle")}
          </GSAPTextReveal>
          <p className="mt-4 text-lg md:text-xl text-yellow-800 dark:text-yellow-300 font-medium max-w-2xl mx-auto">
            {t("talented.tagline")}
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={1000} label={t("talented.scholarships") as string} />
          <StatsCounter number={8} label={t("talented.areas") as string} />
          <StatsCounter number={3} label={t("talented.pillars") as string} />
        </div>
        {/* Hero Donate Button */}
        <div className="mt-6 mb-4">
          <Link href="/donate/palestinian-talented" className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#34a853] to-[#2d9249] text-white font-bold rounded-full shadow-2xl hover:from-[#2d9249] hover:to-[#34a853] transition-all duration-300 text-xl hover:scale-110 hover:shadow-3xl">
            <Heart size={24} className="-ml-1" /> {t("donate.donate")}
          </Link>
        </div>
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-50/90 to-blue-50/90 dark:bg-gradient-to-r dark:from-yellow-900/80 dark:to-blue-900/80 rounded-xl shadow-xl p-6 mt-4 border border-yellow-300">
          <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center justify-center gap-2">
            <Star className="text-yellow-500 animate-pulse" size={28} />
            <span>{t("talented.about.title")}</span>
            <Star className="text-yellow-500 animate-pulse" size={28} />
          </h2>
          <p className="text-gray-800 dark:text-gray-100 text-base md:text-lg">
            {t("talented.about.desc")}
          </p>
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <div className="flex gap-3">
              <a href="/2026-pdfs/palestinian-talented/program-en.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> {t("talented.download.en")}
              </a>
              <a href="/2026-pdfs/palestinian-talented/program-ar.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> {t("talented.download.ar")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Palestinian Talent Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-blue-100/40 dark:from-green-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">{t("talented.why.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.programs.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.programs.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <TrendingUp className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.environment.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.environment.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Users className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.brain.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.brain.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Shield className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.development.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.development.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Eye className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.occupation.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.occupation.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.5}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <DollarSign className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.economic.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.economic.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.6}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Brain className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.achievement.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.achievement.desc")}</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.7}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Building className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">{t("talented.why.infrastructure.title")}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{t("talented.why.infrastructure.desc")}</p>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-green-700 mb-8 ${isRTL ? 'font-arabic' : ''}`}>{t("talented.goals.title")}</GSAPTextReveal>
          <ul className={`space-y-4 text-lg text-gray-800 dark:text-gray-100 font-medium mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Award className={`text-green-700 ${isRTL ? 'order-2' : ''}`} size={24} />
              <span className={`${isRTL ? 'font-arabic order-1' : ''}`}>{t("talented.goals.scholarships")}</span>
            </li>
            <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Users className={`text-green-700 ${isRTL ? 'order-2' : ''}`} size={24} />
              <span className={`${isRTL ? 'font-arabic order-1' : ''}`}>{t("talented.goals.leaders")}</span>
            </li>
            <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <Target className={`text-green-700 ${isRTL ? 'order-2' : ''}`} size={24} />
              <span className={`${isRTL ? 'font-arabic order-1' : ''}`}>{t("talented.goals.potential")}</span>
            </li>
          </ul>

          <div className="bg-gradient-to-br from-yellow-50/80 to-blue-50/80 dark:from-yellow-900/40 dark:to-blue-900/40 rounded-2xl shadow-xl p-8 border border-yellow-200/50 dark:border-yellow-800/50">
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center flex items-center justify-center gap-3">
              <span className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Trophy className="text-yellow-600 dark:text-yellow-400" size={28} />
              </span>
              {t("talented.financial.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GSAPReveal animation="scale">
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                      <GraduationCap className="text-yellow-600 dark:text-yellow-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-yellow-800 dark:text-yellow-300">{t("talented.financial.academic.title")}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t("talented.financial.academic.desc")}</p>
                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">{t("talented.financial.academic.amount")}</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">{t("talented.financial.academic.period")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.1}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                      <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">{t("talented.financial.stipend.title")}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t("talented.financial.stipend.desc")}</p>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{t("talented.financial.stipend.amount")}</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">{t("talented.financial.stipend.period")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.2}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-blue-500"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-yellow-100 to-blue-100 dark:from-yellow-900/50 dark:to-blue-900/50 p-3 rounded-lg">
                      <Laptop className="text-gradient-to-r from-yellow-600 to-blue-600 dark:from-yellow-400 dark:to-blue-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">{t("talented.financial.technology.title")}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{t("talented.financial.technology.desc")}</p>
                    <div className="bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">{t("talented.financial.technology.amount")}</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">{t("talented.financial.technology.period")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-blue-100/40 dark:from-green-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">{t("talented.requirements.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Globe className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.requirements.nationality")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <GraduationCap className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.requirements.average")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Award className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.requirements.gpa")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.requirements.english")}</h3>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">{t("talented.fields.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Briefcase className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.business")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Lightbulb className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.engineering")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.education")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Users className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.social")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Target className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.computer")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.5}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Globe className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.international")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.6}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <DollarSign className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.economics")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.7}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <CheckSquare className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.law")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.8}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Brain className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.psychology")}</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.9}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Calendar className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">{t("talented.fields.media")}</h3>
              </div>
            </GSAPReveal>
          </div>
        </div>

        {/* <div className="flex justify-center my-8 gap-4 flex-wrap">
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-red-600 hover:to-green-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/2026-pdfs/palestinian-talented/program-en.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> Download Program (EN)
            </a>
            <a href="/2026-pdfs/palestinian-talented/program-ar.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
            </a>
          </div>
        </div> */}
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-green-100/40 via-white to-blue-100/40 dark:from-green-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className={`text-xl font-bold text-green-800 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? "للمزيد من المعلومات، تواصل معنا:" : "For more information, reach out to us:"}
          </GSAPTextReveal>
          <div className={`flex flex-col md:flex-row justify-center items-center gap-4 text-lg ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <a href="mailto:info@isnadf.org" className={`flex items-center gap-2 text-green-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Mail className="text-green-700" size={22} /> info@isnadf.org
            </a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className={`flex items-center gap-2 text-green-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Phone className="text-green-700" size={22} /> <span dir="ltr">+90 539 430 07 26</span>
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}
