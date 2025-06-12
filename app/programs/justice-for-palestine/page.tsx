"use client"

import {
  Scale,
  Globe,
  Shield,
  Flag,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Gavel,
  MessageSquare,
  UserPlus,
  Sword,
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"
import { useLanguage } from "@/components/language-provider"

export default function JusticeForPalestinePage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Palestinian Flag-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-red-600/10 via-white/10 to-black/10 dark:from-red-900/20 dark:via-gray-900/20 dark:to-green-800/20 shadow-lg border-b-4 border-red-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-black rounded-full flex items-center justify-center shadow-xl">
              <Scale size={48} className="text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Flag size={16} className="text-red-500 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Gavel size={16} className="text-black animate-pulse" />
            </div>
          </div>
          <GSAPTextReveal className={`text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent font-sora drop-shadow-lg pt-5 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.title")}
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className={`text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400 mt-2 h-10 ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.subtitle")}
          </GSAPTextReveal>
          <p className={`mt-4 text-lg md:text-xl text-black dark:text-red-300 font-medium max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.tagline")}
          </p>
        </div>
        <div className={`flex justify-center gap-8 mt-8 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <StatsCounter number={200} label={t("justice.scholarships") as string} />
          <StatsCounter number={2} label={t("justice.fields") as string} />
          <StatsCounter number={5} label={t("justice.years") as string} />
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <h2 className={`text-xl font-bold text-red-700 mb-2 flex items-center justify-center gap-2 ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
            <Scale className={`text-red-600 animate-pulse ${isRTL ? 'order-2' : ''}`} size={28} />
            <span>{t("justice.about.title")}</span>
            <Gavel className={`text-black animate-bounce ${isRTL ? 'order-1' : ''}`} size={28} />
          </h2>
          <p className={`text-gray-800 dark:text-gray-100 text-base md:text-lg text-center ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.about.desc")}
          </p>
          <div className={`flex justify-center mt-6 gap-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full shadow-xl hover:from-black hover:to-red-600 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
              <Scale size={22} className={`${isRTL ? 'order-2' : '-ml-1'} animate-pulse`} /> {t("justice.apply")}
            </a>
            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a href="/ProgramsFiles/Justice for Palestine Scholarship.docx" download className={`inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
                <GraduationCap size={20} className={`${isRTL ? 'order-2' : '-ml-1'}`} /> {t("justice.download.en")}
              </a>
              <a href="/ProgramsFiles/Justice for Palestine Scholarship AR.docx" download className={`inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
                <GraduationCap size={20} className={`${isRTL ? 'order-2' : '-ml-1'}`} /> {t("justice.download.ar")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-red-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.mission.title")}</GSAPTextReveal>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className={`text-lg text-gray-800 dark:text-gray-100 font-medium mb-4 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>
              {t("justice.mission.desc")}
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <GSAPReveal animation="scale"><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Globe className="text-red-700 mb-3" size={40} />
              <h3 className={`text-xl font-bold text-red-800 dark:text-red-300 mb-2 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.international.title")}</h3>
              <p className={`text-center text-gray-700 dark:text-gray-200 text-base tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.international.desc")}</p>
            </div></GSAPReveal>
            <GSAPReveal animation="scale" delay={0.1}><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Shield className="text-blue-700 mb-3" size={40} />
              <h3 className={`text-xl font-bold text-blue-800 dark:text-blue-300 mb-2 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.political.title")}</h3>
              <p className={`text-center text-gray-700 dark:text-gray-200 text-base tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.political.desc")}</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-red-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.title")}</GSAPTextReveal>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Gavel className="text-red-700 mb-4" size={48} />
              <h3 className={`text-xl font-bold text-center text-red-800 dark:text-red-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.political.title")}</h3>
              <p className={`text-gray-600 dark:text-gray-300 text-sm text-center mb-4 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                {t("justice.fields.political.desc")}
              </p>
              <div className={`space-y-2 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                {(t("justice.fields.political.points") as string[]).map((point, index) => (
                  <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <div className={`w-2 h-2 bg-red-500 rounded-full ${isRTL ? 'order-2' : ''}`}></div>
                    <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic text-right' : ''}`}>{point}</span>
                  </div>
                ))}
              </div>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Globe className="text-blue-700 mb-4" size={48} />
              <h3 className={`text-xl font-bold text-center text-blue-800 dark:text-blue-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.international.title")}</h3>
              <p className={`text-gray-600 dark:text-gray-300 text-sm text-center mb-4 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                {t("justice.fields.international.desc")}
              </p>
              <div className={`space-y-2 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                {(t("justice.fields.international.points") as string[]).map((point, index) => (
                  <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <div className={`w-2 h-2 bg-blue-500 rounded-full ${isRTL ? 'order-2' : ''}`}></div>
                    <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic text-right' : ''}`}>{point}</span>
                  </div>
                ))}
              </div>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">{t("justice.requirements.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Flag className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.nationality")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.degree")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Award className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.gpa")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <MessageSquare className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.interest")}</h3>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-red-100/40 via-white to-black/40 dark:from-red-900/30 dark:via-black dark:to-green-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className={`text-xl font-bold text-red-800 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.contact.title")}
          </GSAPTextReveal>
          <p className={`text-gray-700 dark:text-gray-200 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.contact.description")}
          </p>
          <div className={`flex flex-col md:flex-row justify-center items-center gap-4 text-lg ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <a href="mailto:info@isnadf.org" className={`flex items-center gap-2 text-red-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Mail className="text-red-700" size={22} /> info@isnadf.org
            </a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className={`flex items-center gap-2 text-red-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Phone className="text-red-700" size={22} /> <span dir="ltr">+90 539 430 07 26</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
