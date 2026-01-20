"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { studentTestimonials, publicFigureTestimonials, type Testimonial } from "@/app/testimonials/data";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function HomeTestimonials() {
  const { language, t } = useLanguage();
  const isRTL = language === "ar";
  
  // Reference testimonial (Hassan Albirok - "The Cultural Exchange Festival...")
  const referenceTestimonial = studentTestimonials[1]; // Hassan Albirok
  const referenceQuote = referenceTestimonial.quote[language as keyof typeof referenceTestimonial.quote];
  
  // Combine testimonials and use the same quote text for all
  const rawTestimonials: Testimonial[] = [
    ...studentTestimonials.slice(0, 3),
    ...publicFigureTestimonials.slice(0, 2),
  ];
  
  // Use the same quote text for all testimonials, but keep different names and roles
  const allTestimonials = rawTestimonials.map(testimonial => ({
    ...testimonial,
    quote: {
      en: referenceTestimonial.quote.en,
      ar: referenceTestimonial.quote.ar,
    }
  }));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-change testimonials every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, allTestimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % allTestimonials.length);
  };

  const currentTestimonial = allTestimonials[currentIndex];

  return (
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-0 items-center max-w-7xl mx-auto relative">
            {/* Left Side - Testimonial Card - Same width as image */}
            <div className={`order-2 lg:order-1 ${isRTL ? "lg:order-2 lg:ml-[-30px]" : "lg:mr-[-30px]"} relative z-20`}>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 md:p-10 lg:p-12 border border-white dark:border-gray-800 shadow-lg relative overflow-hidden max-w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)', backgroundSize: '20px 20px' }}>
              {/* Header */}
              <div className="mb-6">
                <span className="text-[#1e7e34] font-bold text-sm md:text-base mb-4 block">
                  {t("testimonials.home.badge") as string}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                  {t("testimonials.home.title") as string}
                </h2>
                <div className="h-1 w-20 bg-amber-400 rounded-full" />
              </div>

              {/* Testimonial Content with Navigation Buttons */}
              <div className="relative mb-6">
                {/* Left Navigation Button */}
                <button
                  onClick={goToPrevious}
                  className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-0" : "left-0"} z-20 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-amber-400 hover:text-white dark:hover:bg-amber-400 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:border-amber-400 shadow-sm`}
                  aria-label={isRTL ? "التالي" : "Previous"}
                >
                  <ChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </button>

                {/* Opening Quote SVG - Fixed position */}
                <div className={`absolute ${isRTL ? "right-0 scale-x-[-1]" : "left-0"} top-0 z-0`}>
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 48 48" 
                    className="text-[#1e7e34]"
                    fill="currentColor"
                  >
                    <path d="m37,37c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.88-.52h-2c-.27,0-.54.11-.73.31-5.14,5.41-11.27,14.26-11.27,25.69,0,6.07,4.93,10.99,11,11h0Zm-26,0c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.87-.52h-2c-.27,0-.54.11-.73.31C6.13,5.72,0,14.57,0,26c0,6.07,4.93,10.99,11,11h0Zm0,0" />
                  </svg>
                </div>

                {/* Testimonial Text - Fixed height for consistency */}
                <div className={`relative z-10 ${isRTL ? "pr-20 pl-20" : "pl-20 pr-20"} pt-4 pb-8 min-h-[120px] md:min-h-[140px] flex items-center`}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed w-full ${isRTL ? "text-right" : "text-left"} ${isRTL ? "font-arabic" : ""}`}
                    >
                      {currentTestimonial.quote[language as keyof typeof currentTestimonial.quote]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Closing Quote SVG - Fixed position */}
                <div className={`absolute ${isRTL ? "left-0" : "right-0 scale-x-[-1]"} bottom-0 z-0`}>
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 48 48" 
                    className="text-[#1e7e34]"
                    fill="currentColor"
                  >
                    <path d="m37,37c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.88-.52h-2c-.27,0-.54.11-.73.31-5.14,5.41-11.27,14.26-11.27,25.69,0,6.07,4.93,10.99,11,11h0Zm-26,0c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.87-.52h-2c-.27,0-.54.11-.73.31C6.13,5.72,0,14.57,0,26c0,6.07,4.93,10.99,11,11h0Zm0,0" />
                  </svg>
                </div>

                {/* Right Navigation Button */}
                <button
                  onClick={goToNext}
                  className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-0" : "right-0"} z-20 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-amber-400 hover:text-white dark:hover:bg-amber-400 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:border-amber-400 shadow-sm`}
                  aria-label={isRTL ? "السابق" : "Next"}
                >
                  <ChevronRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Attribution - After quotations */}
              <div className={`pt-6 border-t border-gray-200 dark:border-gray-700 ${isRTL ? "text-right" : "text-left"}`}>
                <p className={`text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1 ${isRTL ? "font-arabic" : ""}`}>
                  {currentTestimonial.name[language as keyof typeof currentTestimonial.name]}
                </p>
                <p className={`text-[#1e7e34] font-semibold text-sm md:text-base ${isRTL ? "font-arabic" : ""}`}>
                  {currentTestimonial.role[language as keyof typeof currentTestimonial.role]}
                  {currentTestimonial.organization[language as keyof typeof currentTestimonial.organization] && 
                    `, ${currentTestimonial.organization[language as keyof typeof currentTestimonial.organization]}`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image - Same width as testimonial */}
          <div className={`order-1 lg:order-2 ${isRTL ? "lg:order-1" : ""} relative z-10`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
              <Image
                src="/work/1.jpeg"
                alt={t("testimonials.home.imageAlt") as string}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
