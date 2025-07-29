"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Users, Building2, GraduationCap, Star, Clock, BookOpen, CheckCircle, Banknote, ArrowRight, MapPin, Phone, Mail } from "lucide-react"
import Silk from "@/app/blocks/Backgrounds/Silk/Silk"




export default function DonatePage() {
  const { t, language } = useLanguage()
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [showInstitutionsModal, setShowInstitutionsModal] = useState(false)
  
  // Force Canvas resize after mount to ensure Silk takes full height
  useEffect(() => {
    // Reset loading state on mount
    setIsHeroLoaded(false)
    
    const forceCanvasResize = () => {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.position = 'absolute'
        canvas.style.top = '0'
        canvas.style.left = '0'
        // Force a resize event to trigger viewport recalculation
        window.dispatchEvent(new Event('resize'))
        
        // Check if canvas is properly sized
        const rect = canvas.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // More robust size checking
        if (rect.width > 0 && rect.height > 0 && rect.height >= viewportHeight * 0.8) {
          setIsHeroLoaded(true)
          return true // Canvas is properly sized
        }
      }
      return false // Canvas not ready yet
    }

    // Try immediately and with faster delays
    forceCanvasResize() // Immediate attempt
    const timer1 = setTimeout(forceCanvasResize, 10)   // 0.01s
    const timer2 = setTimeout(forceCanvasResize, 50)   // 0.05s
    const timer3 = setTimeout(forceCanvasResize, 100)  // 0.1s
    const timer4 = setTimeout(forceCanvasResize, 200)  // 0.2s
    const timer5 = setTimeout(forceCanvasResize, 500)  // 0.5s
    
    // Additional check for navigation scenarios
    const navigationCheck = setTimeout(() => {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        // Force a more aggressive resize for navigation
        canvas.style.width = '100vw'
        canvas.style.height = '100vh'
        canvas.style.position = 'absolute'
        canvas.style.top = '0'
        canvas.style.left = '0'
        window.dispatchEvent(new Event('resize'))
        setIsHeroLoaded(true)
      }
    }, 300)
    
    // Final check to ensure hero is loaded
    const finalCheck = setTimeout(() => {
      setIsHeroLoaded(true)
    }, 1000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(navigationCheck)
      clearTimeout(finalCheck)
    }
  }, [])
  const whySupportReasons = [
    t("donate.why_support.reason1"),
    t("donate.why_support.reason2"),
    t("donate.why_support.reason3"),
    t("donate.why_support.reason4"),
    t("donate.why_support.reason5"),
    t("donate.why_support.reason6"),
    t("donate.why_support.reason7"),
    t("donate.why_support.reason8"),
  ]

  const whyNowReasons = [
    t("donate.why_now.reason1"),
    t("donate.why_now.reason2"),
    t("donate.why_now.reason3"),
  ]

  const whatWeOffer = [
    t("donate.what_we_offer.item1"),
    t("donate.what_we_offer.item2"),
    t("donate.what_we_offer.item3"),
    t("donate.what_we_offer.item4"),
  ]

  return (
    <div className="min-h-screen bg-white">
            {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-center">
        {/* Loading Overlay */}
        {!isHeroLoaded && (
          <div className="absolute inset-0 z-20 bg-gradient-to-br from-[#34a853] to-[#2d8a47] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg font-medium">
                {language === "ar" ? "جاري التحميل..." : "Loading..."}
              </p>
            </div>
          </div>
        )}
        
        {/* Silk Background */}
        <div className="absolute inset-0 z-0 h-full w-full [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:w-full [&_canvas]:h-full">
          <Silk 
            speed={5}
            scale={1}
            color="#34a853"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>

        {/* Main Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-6 transition-opacity duration-500 ${isHeroLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div
            className="space-y-8 flex flex-col items-center"
            dir={language === "ar" ? "rtl" : "ltr"}
          >


            {/* Main Title */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tight w-full max-w-6xl mx-auto"
              dir={language === "ar" ? "rtl" : "ltr"}
              style={{ 
                textAlign: 'justify', 
                textAlignLast: 'center',
                textJustify: 'inter-word'
              }}
            >
                {t("donate.hero.title")}
              </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium w-full"
              style={{ 
                textAlign: 'justify', 
                textAlignLast: 'center',
                textJustify: 'inter-word'
              }}
            >
                {t("donate.hero.subtitle")}
              </p>

            {/* Description */}
            <p
              className="text-base md:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed w-full"
              style={{ 
                textAlign: 'justify', 
                textAlignLast: 'center',
                textJustify: 'inter-word'
              }}
            >
                {t("donate.hero.main_text")}
              </p>

            {/* CTA Button */}
            <div
              className="flex justify-center items-center pt-4"
            >
              <Button 
                onClick={() => window.location.href = '/donate-form'}
                className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-20 py-8 text-2xl font-black shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-110 rounded-3xl group"
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/40 via-white/20 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <span className="relative z-10 tracking-wider drop-shadow-lg">
                  {language === "ar" ? "تبرع الآن" : "Donate Now"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#34a853]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-r from-[#34a853]/20 to-transparent rounded-full blur-2xl"></div>


      </section>

      {/* Why Support Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#34a853] rounded-2xl mb-8">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              {t("donate.why_support.title")}
            </h2>
          </div>

          {/* Reasons List */}
          <div className="space-y-8">
              {whySupportReasons.map((reason, index) => (
              <div
                key={index + 1}
                className={`flex items-start p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 ${
                  language === "ar" ? "flex-row-reverse space-x-reverse space-x-8" : "space-x-8"
                }`}
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                {/* Number Circle */}
                <div className={`number-circle flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-xl flex items-center justify-center shadow-lg ${
                  language === "ar" ? "order-last" : "order-first"
                }`}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>

                {/* Content */}
                <div className={`reason-content flex-1 pt-2 ${
                  language === "ar" ? "text-right order-first" : "text-left order-last"
                }`}>
                  <p className="text-xl text-gray-800 leading-relaxed font-medium">
                    {reason}
                  </p>
                </div>
              </div>
              ))}
            </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-3xl mb-8 shadow-lg">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              {t("donate.why_now.title")}
            </h2>
          </div>

          {/* Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyNowReasons.map((reason, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#34a853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className={`text-gray-800 leading-relaxed text-lg font-medium group-hover:text-gray-900 transition-colors duration-300 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}>
                      {reason}
                    </p>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#34a853]/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-3xl mb-8 shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              {t("donate.what_we_offer.title")}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whatWeOffer.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#34a853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#34a853]/10 to-[#2d9249]/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle className="w-8 h-8 text-[#34a853] group-hover:text-[#2d9249] transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className={`text-gray-800 leading-relaxed text-base font-medium group-hover:text-gray-900 transition-colors duration-300 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}>
                      {item}
                    </p>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#34a853]/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Cost Breakdown Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-3xl mb-8 shadow-lg">
              <Banknote className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              {t("donate.cost.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t("donate.cost.intro")}
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("donate.cost.total")}
            </p>
          </div>

          {/* Cost Breakdown Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                {t("donate.cost.breakdown.title")}
              </h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34a853]/20 to-[#2d9249]/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-[#34a853]" />
                  </div>
                  <span className={`text-lg font-semibold text-gray-800 ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.tuition")}</span>
                </div>
                <span className="text-2xl font-bold text-[#34a853]">$5,000</span>
              </div>
              
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34a853]/20 to-[#2d9249]/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#34a853]" />
                  </div>
                  <span className={`text-lg font-semibold text-gray-800 ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.living")}</span>
                </div>
                <span className="text-2xl font-bold text-[#34a853]">$4,500</span>
              </div>
              
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34a853]/20 to-[#2d9249]/20 rounded-xl flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-[#34a853]" />
                  </div>
                  <span className={`text-lg font-semibold text-gray-800 ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.transport")}</span>
                </div>
                <span className="text-2xl font-bold text-[#34a853]">$1,000</span>
              </div>
              
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34a853]/20 to-[#2d9249]/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#34a853]" />
                  </div>
                  <span className={`text-lg font-semibold text-gray-800 ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.academic")}</span>
                </div>
                <span className="text-2xl font-bold text-[#34a853]">$1,500</span>
              </div>
              
              <div className="flex justify-between items-center p-8 bg-gradient-to-br from-[#34a853] to-[#2d9249] text-white rounded-2xl shadow-lg" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xl font-bold ${language === "ar" ? "text-right" : "text-left"}`}>Total</span>
                </div>
                <span className="text-3xl font-bold">$12,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Contribute Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-3xl mb-8 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              {t("donate.how_contribute.title")}
            </h2>
          </div>
            
          {/* Contribution Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* For Individuals */}
            <div className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#34a853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Header */}
              <div className={`relative z-10 flex items-center mb-8 ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {t("donate.for_individuals.title")}
                </h3>
                  </div>
              
              {/* Options */}
              <div className="relative z-10 space-y-6">
                <div className="p-6 bg-gradient-to-r from-[#34a853]/10 to-white rounded-2xl border border-[#34a853]/20 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-xl font-bold text-[#34a853] mb-3 ${language === "ar" ? "text-right" : "text-left"}`}>$12,000 USD → {t("donate.full_sponsorship")}</h4>
                  </div>
                
                <div className="p-6 bg-gradient-to-r from-[#34a853]/10 to-white rounded-2xl border border-[#34a853]/20 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-xl font-bold text-[#34a853] mb-3 ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.partial_sponsorship")}</h4>
                  <div className={`space-y-2 text-gray-700 ${language === "ar" ? "text-right" : "text-left"}`}>
                    <p>• {t("donate.partial_50")}</p>
                    <p>• {t("donate.tuition_only")}</p>
                    <p>• {t("donate.living_only")}</p>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-[#34a853]/10 to-white rounded-2xl border border-[#34a853]/20 hover:shadow-lg transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-xl font-bold text-[#34a853] mb-3 ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.one_time")}</h4>
                </div>
                
                {/* Donate Now Button */}
                <div className="pt-6">
                  <Button 
                    onClick={() => {
                      // Navigate to the new donation form page
                      window.location.href = '/donate-form'
                    }}
                    className="w-full bg-gradient-to-r from-[#34a853] to-[#2d9249] hover:from-[#2d9249] hover:to-[#34a853] text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {language === "ar" ? "ساهم الآن" : "Donate Now"}
                  </Button>
                </div>
              </div>
            </div>

              {/* For Institutions */}
            <div 
              onClick={() => setShowInstitutionsModal(true)}
              className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#34a853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Header */}
              <div className={`relative z-10 flex items-center mb-8 ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {t("donate.for_institutions.title")}
                </h3>
                  </div>
              
              {/* Options */}
              <div className="relative z-10 space-y-4">
                <div className="p-4 bg-gradient-to-r from-[#34a853]/10 to-white rounded-xl border border-[#34a853]/20 hover:shadow-md transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-lg font-bold text-[#34a853] ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.full_program")}</h4>
                  </div>
                <div className="p-4 bg-gradient-to-r from-[#34a853]/10 to-white rounded-xl border border-[#34a853]/20 hover:shadow-md transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-lg font-bold text-[#34a853] ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.student_numbers")}</h4>
                  </div>
                <div className="p-4 bg-gradient-to-r from-[#34a853]/10 to-white rounded-xl border border-[#34a853]/20 hover:shadow-md transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-lg font-bold text-[#34a853] ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.training_partnership")}</h4>
                  </div>
                <div className="p-4 bg-gradient-to-r from-[#34a853]/10 to-white rounded-xl border border-[#34a853]/20 hover:shadow-md transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-lg font-bold text-[#34a853] ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.media_partnership")}</h4>
                  </div>
                <div className="p-4 bg-gradient-to-r from-[#34a853]/10 to-white rounded-xl border border-[#34a853]/20 hover:shadow-md transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-lg font-bold text-[#34a853] ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.endowment")}</h4>
                  </div>
                <div className="p-4 bg-gradient-to-r from-[#34a853]/10 to-white rounded-xl border border-[#34a853]/20 hover:shadow-md transition-all duration-300" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
                  <h4 className={`text-lg font-bold text-[#34a853] ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.adopt_program")}</h4>
                </div>
              </div>
            </div>
            </div>

            {/* Contact Information */}
          <div 
            onClick={() => window.location.href = '/contact'}
            className="bg-gradient-to-br from-[#34a853] to-[#2d9249] text-white rounded-3xl p-12 shadow-2xl text-center cursor-pointer hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <h3 className="text-3xl font-bold mb-6">{t("donate.contact_invitation")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center space-y-4">
                  <MapPin className="w-8 h-8" />
                  <span className="font-medium text-lg">{t("donate.office_visit")}</span>
                </div>
              <div className="flex flex-col items-center space-y-4">
                  <Phone className="w-8 h-8" />
                <span className="font-medium text-lg">Call Us</span>
                <span className="text-base opacity-90" dir="ltr">+90 5394300726</span>
                  </div>
              <div className="flex flex-col items-center space-y-4">
                <Mail className="w-8 h-8" />
                <span className="font-medium text-lg">Email Us</span>
                <span className="text-base opacity-90">info@isnadf.org</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Institutions Partnership Modal */}
      {showInstitutionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" dir={language === "ar" ? "rtl" : "ltr"}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {language === "ar" ? "شراكات المؤسسات" : "Institutional Partnerships"}
                </h2>
              </div>
              <button
                onClick={() => setShowInstitutionsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-8">


              {/* Partnership Types */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === "ar" ? "أنواع الشراكة:" : "Partnership Types:"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-xl font-bold text-[#34a853] mb-3">
                      {language === "ar" ? "شراكات استراتيجية" : "Strategic Partnerships"}
                    </h4>
                    <p className="text-gray-700">
                      {language === "ar" ? "شراكات طويلة المدى مع مؤسسات تعليمية وشركات" : "Long-term partnerships with educational institutions and companies"}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-xl font-bold text-[#34a853] mb-3">
                      {language === "ar" ? "تبني أحد برامجنا" : "Adopt Our Programs"}
                    </h4>
                    <p className="text-gray-700">
                      {language === "ar" ? "تبني كامل أو جزئي لأحد برامجنا التعليمية" : "Full or partial adoption of our educational programs"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-[#34a853] to-[#2d9249] text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">
                  {language === "ar" ? "ندعوكم للتواصل معنا" : "We invite you to contact us"}
                </h3>
                <p className="text-lg mb-6">
                  {language === "ar" 
                    ? "للعقد لقاء تعارفي وتقديم نموذج شراكة مخصص لاحتياجاتكم"
                    : "To arrange an introductory meeting and present a customized partnership model for your needs"
                  }
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center space-y-3">
                    <MapPin className="w-8 h-8" />
                    <span className="font-medium text-lg">{language === "ar" ? "زيارتنا في المكتب الخاص بنا" : "Visit our office"}</span>
                    <a 
                      href="https://www.google.com/maps/place/Kayabaşı+Mah.+Adnan+Menderes+Blv.+A4+Blok+No:7A+Kapı+No:11+Başakşehir/İstanbul/@41.118961,28.774727,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!2zNDHCsDA3JzA4LjMiTiAyOMKwNDYnMjkuMCJF!8m2!3d41.118961!4d28.774727!16s%2Fg%2F11t8z0z0z0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm opacity-90 text-center hover:text-white hover:opacity-100 transition-all duration-300 cursor-pointer underline"
                      dir="ltr"
                    >
                      Kayabaşı Mah. Adnan Menderes Blv. A4 Blok No:7A Kapı No:11 Başakşehir/İstanbul
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3">
                    <Phone className="w-8 h-8" />
                    <span className="font-medium text-lg">Call Us</span>
                    <span className="text-sm opacity-90" dir="ltr">+90 5394300726</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3">
                    <Mail className="w-8 h-8" />
                    <span className="font-medium text-lg">Email Us</span>
                    <span className="text-sm opacity-90">info@isnadf.org</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="flex-1 bg-gradient-to-r from-[#34a853] to-[#2d9249] hover:from-[#2d9249] hover:to-[#34a853] text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {language === "ar" ? "تواصل معنا" : "Contact Us"}
                </Button>
                <Button 
                  onClick={() => setShowInstitutionsModal(false)}
                  variant="outline"
                  className="flex-1 border-[#34a853] text-[#34a853] hover:bg-[#34a853] hover:text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 