"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Star,
  Leaf,
  Scale,
  Brain,
  ChevronDown,
  Stethoscope
} from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function ProgramsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const programsRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  // Helper function to ensure we get a string from translation
  const getTranslation = (key: string): string => {
    const translation = t(key)
    return Array.isArray(translation) ? translation[0] : translation
  }

  // Get hero title
  const heroTitle = getTranslation("programs.hero.title")

  return (
    <main className="relative overflow-hidden text-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[calc(100vh-96px)] mt-24 flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-blue-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          {/* Palestinian Flag */}
          <div className="mb-12 relative">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <Image
                src="/Flag_of_Palestine.svg"
                alt={getTranslation("programs.hero.flag.alt")}
                fill
                className="object-contain drop-shadow-2xl animate-pulse"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
            {isRTL ? (
              // Arabic title - single line
              <span className="block text-transparent tracking-wider bg-clip-text bg-gradient-to-r from-green-400 via-white to-blue-400 font-sora">
                {heroTitle}
              </span>
            ) : (
              // English title - split into two lines
              <>
                <span className="block text-transparent tracking-wider h-40 bg-clip-text bg-gradient-to-r from-green-400 via-white to-blue-400 font-sora">
                  {heroTitle.split(" ")[0]}
                </span>
                <span className="block text-transparent tracking-wider h-40 bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400 font-sora -mt-4">
                  {heroTitle.split(" ")[1]}
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed">
            {getTranslation("programs.hero.subtitle")}
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-white/60" />
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="relative h-1 bg-gradient-to-r from-green-900 via-blue-900 to-green-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.2)_0%,transparent_70%)]"></div>
      </div>

      {/* Programs Section */}
      <section
        ref={programsRef}
        className="relative pt-32 pb-16 bg-gradient-to-br from-black via-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {getTranslation("programs.section.title")}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {getTranslation("programs.section.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Undergraduate Programs */}
            <div className="group relative">
              <Link href="/programs/pulse-of-life" className="block">
                <div className="p-12 bg-gradient-to-br from-red-900/20 to-black/40 rounded-3xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                      <Stethoscope size={48} className="text-white animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{getTranslation("programs.undergraduate.title")}</h3>
                    <h4 className="text-xl text-red-400 mb-6">{getTranslation("programs.pulse.title")}</h4>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      {getTranslation("programs.pulse.description")}
                    </p>
                    <div className={`flex items-center justify-center gap-2 text-red-400 group-hover:gap-4 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span>{getTranslation("programs.learn-more")}</span>
                      <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Palestinian Talented */}
            <div className="group relative">
              <Link href="/programs/palestinian-talented" className="block">
                <div className="p-12 bg-gradient-to-br from-blue-900/20 to-black/40 rounded-3xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                      <Star size={48} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{getTranslation("programs.undergraduate.title")}</h3>
                    <h4 className="text-xl text-blue-400 mb-6">{getTranslation("programs.talented.title")}</h4>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      {getTranslation("programs.talented.description")}
                    </p>
                    <div className={`flex items-center justify-center gap-2 text-blue-400 group-hover:gap-4 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span>{getTranslation("programs.learn-more")}</span>
                      <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Postgraduate Programs */}
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 mb-4">
              {getTranslation("programs.postgraduate.title")}
            </h3>
            <p className="text-lg text-gray-400">{getTranslation("programs.postgraduate.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sustainability */}
            <div className="group relative">
              <Link href="/programs/sustainability" className="block">
                <div className="p-8 bg-gradient-to-br from-green-900/20 to-black/40 rounded-3xl border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                      <Leaf size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{getTranslation("programs.sustainability.title")}</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {getTranslation("programs.sustainability.description")}
                    </p>
                    <div className={`flex items-center justify-center gap-2 text-green-400 group-hover:gap-4 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span>{getTranslation("programs.learn-more")}</span>
                      <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Justice for Palestine */}
            <div className="group relative">
              <Link href="/programs/justice-for-palestine" className="block">
                <div className="p-8 bg-gradient-to-br from-red-900/20 to-black/40 rounded-3xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                      <Scale size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{getTranslation("programs.justice.title")}</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {getTranslation("programs.justice.description")}
                    </p>
                    <div className={`flex items-center justify-center gap-2 text-red-400 group-hover:gap-4 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span>{getTranslation("programs.learn-more")}</span>
                      <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Ibn Khaldun */}
            <div className="group relative">
              <Link href="/programs/ibn-khaldun" className="block">
                <div className="p-8 bg-gradient-to-br from-purple-900/20 to-black/40 rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center">
                      <Brain size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{getTranslation("programs.ibn-khaldun.title")}</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {getTranslation("programs.ibn-khaldun.description")}
                    </p>
                    <div className={`flex items-center justify-center gap-2 text-purple-400 group-hover:gap-4 transition-all ${isRTL ? "flex-row-reverse" : ""}`}>
                      <span>{getTranslation("programs.learn-more")}</span>
                      <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

