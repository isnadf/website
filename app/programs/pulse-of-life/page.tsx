"use client"

import {
  GraduationCap,
  Award,
  BookOpen,
  Globe,
  Target,
  UserPlus,
  Stethoscope,
  Hospital,
  Microscope,
  Home,
  Phone,
  Mail,
  Heart,
  Wallet,
  Laptop,
  Play,
  ExternalLink
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import StatsCounter from "@/components/stats-counter"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function PulseOfLifePage() {
  const { t, language } = useLanguage()

  // Enhanced Arabic text spacing and RTL support
  const getArabicSpacing = () => language === 'ar' ? { wordSpacing: '0.1em', letterSpacing: '0.02em' } : {}
  const getRTLClass = () => language === 'ar' ? 'rtl' : ''
  const getRTLFlex = () => language === 'ar' ? 'flex-row-reverse' : 'flex-row'
  const getRTLIcon = () => language === 'ar' ? '-mr-1' : '-ml-1'
  const getRTLTextAlign = () => language === 'ar' ? 'text-right' : 'text-left'
  const getRTLItemsAlign = () => language === 'ar' ? 'items-end' : 'items-start'

  return (
    <main className={`flex min-h-screen flex-col bg-gradient-to-br from-red-50 via-pink-50 to-white dark:from-red-950 dark:via-gray-900 dark:to-black ${getRTLClass()}`}>
      {/* Medical-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-red-600/10 via-pink-500/10 to-red-700/10 dark:from-red-900/20 dark:via-pink-900/20 dark:to-red-800/20 shadow-lg border-b-4 border-red-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <Stethoscope size={48} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Heart size={16} className="text-red-500 animate-bounce" />
            </div>
          </div>
          <GSAPTextReveal className={`text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-sora drop-shadow-lg pt-5 tracking-wider [&:lang(ar)]:tracking-wide [&:lang(ar)]:leading-relaxed ${language === 'ar' ? 'tracking-wider space-x-4' : ''}`}>
            {t("pulse.title")}
          </GSAPTextReveal>
          <GSAPTextReveal className={`text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400 mt-2 h-20 ${language === 'ar' ? 'tracking-wider space-x-2' : ''}`}>
            {t("pulse.subtitle")}
          </GSAPTextReveal>
          <p className={`mt-4 text-lg md:text-xl text-red-800 dark:text-red-300 font-medium max-w-2xl mx-auto ${language === 'ar' ? 'tracking-wider space-x-1 leading-relaxed' : ''}`}>
            {t("pulse.tagline")}
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={1000} label={t("pulse.stats.scholarships") as string} />
          <StatsCounter number={5} label={t("pulse.stats.years") as string} />
          <StatsCounter number={3} label={t("pulse.stats.pillars") as string} />
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <h2 className={`text-xl font-bold text-red-700 mb-2 flex items-center justify-center gap-2 ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.5em', letterSpacing: '0.05em' } : {}}>
            <Heart className={`text-red-500 animate-bounce ${language === 'ar' ? 'order-last' : ''}`} size={20} />
            <span>{t("pulse.about.title")}</span>
            <Heart className={`text-red-500 animate-bounce ${language === 'ar' ? 'order-first' : ''}`} size={20} />
          </h2>
          <p className={`text-gray-800 dark:text-gray-100 text-base md:text-lg text-center ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.1em', letterSpacing: '0.05em' } : {}}>
            <span className="font-semibold text-red-800"></span>{t("pulse.about.description")}
          </p>
          <div className={`flex justify-center mt-6 gap-4 flex-wrap ${getRTLFlex()}`}>
            <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-red-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.1em', letterSpacing: '0.05em' } : {}}>
              <Stethoscope size={22} className={`${getRTLIcon()} animate-pulse`} /> {t("pulse.apply")}
            </a>
            <div className={`flex gap-3 ${getRTLFlex()}`}>
              <a href="/ProgramsFiles/Pulse of Life Scholarship-EN.pdf" download className={`inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.5em', letterSpacing: '0.05em' } : {}}>
                <BookOpen size={20} className={getRTLIcon()} /> {t("pulse.download.en")}
              </a>
              <a href="/ProgramsFiles/Pulse of Life Scholarship-AR.pdf" download className={`inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.5em', letterSpacing: '0.05em' } : {}}>
                <BookOpen size={20} className={getRTLIcon()} /> {t("pulse.download.ar")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Pulse of Life Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-red-100/40 dark:from-green-900/30 dark:via-black dark:to-red-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">{t("pulse.why.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num, index) => (
              <GSAPReveal key={num} animation="slide-up" delay={index * 0.1}>
                <div className={`bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[340px] min-w-[250px] w-full justify-start hover:scale-105 transition-transform duration-300 ${getRTLTextAlign()}`}>
                  <Stethoscope className="text-green-700 mb-2" size={32} />
                  <span className="text-3xl font-bold text-red-700 mb-2">0{num}</span>
                  <h3 className={`text-xl font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t(`pulse.why.${['shortage', 'specialized', 'capacity', 'infrastructure', 'occupation'][index]}.title`)}</h3>
                  <p className={`text-gray-600 dark:text-gray-300 text-sm ${getRTLTextAlign()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
                    {t(`pulse.why.${['shortage', 'specialized', 'capacity', 'infrastructure', 'occupation'][index]}.description`)}
                  </p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8 pt-4">{t("pulse.goals.title")}</GSAPTextReveal>
          <ul className={`space-y-4 text-lg text-gray-800 dark:text-gray-100 font-medium mb-8 ${language === 'ar' ? 'items-end' : 'items-start'} ${getRTLTextAlign()}`}>
            <li className={`flex items-center ${language === 'ar' ? 'flex-row-reverse justify-end' : 'flex-row'} gap-3 w-full`}>
              <UserPlus className={`text-green-700 ${language === 'ar' ? 'order-last' : ''}`} size={24} />
              <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.goals.train")}</span>
            </li>
            <li className={`flex items-center ${language === 'ar' ? 'flex-row-reverse justify-end' : 'flex-row'} gap-3 w-full`}>
              <Stethoscope className={`text-green-700 ${language === 'ar' ? 'order-last' : ''}`} size={24} />
              <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.goals.support")}</span>
            </li>
            <li className={`flex items-center ${language === 'ar' ? 'flex-row-reverse justify-end' : 'flex-row'} gap-3 w-full`}>
              <Home className={`text-green-700 ${language === 'ar' ? 'order-last' : ''}`} size={24} />
              <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.goals.reach")}</span>
            </li>
          </ul>
          <div className="bg-gradient-to-br from-green-50/80 to-red-50/80 dark:from-green-900/40 dark:to-red-900/40 rounded-2xl shadow-xl p-8">
            <h3 className={`text-2xl font-bold text-green-800 dark:text-green-300 mb-8 text-center flex items-center justify-center gap-3 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
              <Award className="text-green-700 dark:text-green-400" size={28} />
              {t("pulse.financial.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GSAPReveal animation="scale">
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                      <GraduationCap className="text-green-700 dark:text-green-400" size={24} />
                    </div>
                    <h4 className={`text-lg font-bold text-green-800 dark:text-green-300 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.education.title")}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className={`text-gray-600 dark:text-gray-300 text-sm ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.education.description")}</p>
                    <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{t("pulse.financial.education.amount")}</span>
                        <span className={`block text-sm text-gray-600 dark:text-gray-400 mt-1 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.education.period")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.1}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-lg">
                      <Wallet className="text-pink-700 dark:text-pink-400" size={24} />
                    </div>
                    <h4 className={`text-lg font-bold text-pink-800 dark:text-pink-300 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.stipend.title")}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className={`text-gray-600 dark:text-gray-300 text-sm ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.stipend.description")}</p>
                    <div className="bg-gradient-to-r from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">{t("pulse.financial.stipend.amount")}</span>
                        <span className={`block text-sm text-gray-600 dark:text-gray-400 mt-1 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.stipend.period")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.2}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                      <Laptop className="text-blue-700 dark:text-blue-400" size={24} />
                    </div>
                    <h4 className={`text-lg font-bold text-blue-800 dark:text-blue-300 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.technology.title")}</h4>
                  </div>
                  <div className="space-y-3">
                    <p className={`text-gray-600 dark:text-gray-300 text-sm ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.technology.description")}</p>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{t("pulse.financial.technology.amount")}</span>
                        <span className={`block text-sm text-gray-600 dark:text-gray-400 mt-1 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>{t("pulse.financial.technology.period")}</span>
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
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-red-100/40 dark:from-green-900/30 dark:via-black dark:to-red-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">{t("pulse.requirements.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num, index) => (
              <GSAPReveal key={num} animation="slide-up" delay={index * 0.1}>
                <div className={`bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300 ${getRTLTextAlign()}`}>
                  <Globe className="text-green-700 mb-2" size={32} />
                  <h3 className={`text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
                    {t(`pulse.requirements.${['nationality', 'average', 'gpa', 'english'][index]}`)}
                  </h3>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">{t("pulse.fields.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((num, index) => (
              <GSAPReveal key={num} animation="slide-up" delay={index * 0.1}>
                <div className={`bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300 ${getRTLTextAlign()}`}>
                  <Stethoscope className="text-green-700 mb-2" size={32} />
                  <h3 className={`text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1 ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
                    {t(`pulse.fields.${['medicine', 'dentistry', 'pharmacy', 'allied', 'nursing'][index]}`)}
                  </h3>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Program Updates Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-50 via-white to-pink-50 dark:from-red-950 dark:via-black dark:to-pink-950">
        <div className="max-w-6xl mx-auto">
          <GSAPTextReveal className="text-3xl md:text-4xl font-bold text-center text-red-700 h-20">
            {t("news.latest.pulseOfLifeDisbursement.title")}
          </GSAPTextReveal>
          <p className={`text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
            {t("pulse.news.subtitle")}
          </p>

          <GSAPReveal animation="slide-up" delay={0.2}>
            <div className="rounded-3xl overflow-hidden transition-all duration-500">
              <div className="flex flex-col items-center p-12">
                {/* Centered Video */}
              <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                <div className="relative w-full max-w-2xl h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                      <video
                        src="/newVid/new4Vid.mp4"
                        controls
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                        poster="/posters/poster1.png"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative w-full max-w-2xl h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                      <video
                        src="/newVid/nabd-alyha2.mp4"
                        controls
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                        poster="/posters/poster2.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

                {/* Buttons Under Video */}
                <div className={`flex flex-col sm:flex-row gap-6 w-full max-w-lg mt-6 ${getRTLFlex()}`}>
                  <Link
                    href="/news/pulse-of-life-disbursement"
                    className={`flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-red-500 transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`}
                    style={getArabicSpacing()}
                  >
                    <ExternalLink size={20} className={getRTLIcon()} />
                    {t("pulse.news.read.more")}
                  </Link>

                  <Link
                    href="/news/pulse-of-life-disbursement"
                    className={`flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`}
                    style={getArabicSpacing()}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/news/pulse-of-life-disbursement';
                      setTimeout(() => {
                        const videosSection = document.querySelector('[data-videos-section]');
                        if (videosSection) {
                          videosSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    <Play size={20} className={getRTLIcon()} />
                    {t("pulse.news.watch.videos")}
                  </Link>
                </div>
                
              </div>
              </div>
          </GSAPReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-green-100/40 via-white to-red-100/40 dark:from-green-900/30 dark:via-black dark:to-red-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <div style={getArabicSpacing()}>
            <GSAPTextReveal element="h3" className={`text-xl font-bold text-green-800 mb-2 ${language === 'ar' ? 'tracking-wide' : ''}`}>
              {t("pulse.contact.title")}
            </GSAPTextReveal>
          </div>
          <p className={`text-gray-700 dark:text-gray-200 mb-4 text-center ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
            {t("pulse.contact.description")}
          </p>
          <div className={`flex flex-col md:flex-row justify-center items-center gap-4 text-lg ${getRTLFlex()}`}>
            <a href="mailto:info@isnadf.org" className={`flex items-center gap-2 text-green-700 hover:underline ${getRTLFlex()} justify-center`}>
              <Mail className="text-green-700" size={22} /> info@isnadf.org
            </a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className={`flex items-center gap-2 text-green-700 hover:underline ${getRTLFlex()} justify-center`}>
              <Phone className="text-green-700" size={22} /> +90 539 430 07 26
            </a>
          </div>
        </div>

        <div className={`flex justify-center my-8 gap-4 flex-wrap ${getRTLFlex()}`}>
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-red-600 hover:to-green-500 transition-colors duration-300 text-xl ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
            <UserPlus size={26} className={getRTLIcon()} /> {t("pulse.apply.now")}
          </a>
          <div className={`flex gap-3 ${getRTLFlex()}`}>
            <a href="/ProgramsFiles/Pulse of Life Scholarship-EN.pdf" download className={`inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
              <BookOpen size={20} className={getRTLIcon()} /> {t("pulse.download.en")}
            </a>
            <a href="/ProgramsFiles/Pulse of Life Scholarship-AR.pdf" download className={`inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl ${getRTLFlex()} ${language === 'ar' ? 'tracking-wide' : ''}`} style={getArabicSpacing()}>
              <BookOpen size={20} className={getRTLIcon()} /> {t("pulse.download.ar")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
