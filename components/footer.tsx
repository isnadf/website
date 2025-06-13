"use client"

import Link from "next/link"
import { GraduationCap, Facebook, Instagram } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <footer className="border-t bg-gradient-to-r from-[hsl(0,76%,40%)]/5 via-transparent to-[hsl(120,61%,34%)]/5 dark:from-[hsl(0,76%,40%)]/10 dark:via-black/80 dark:to-[hsl(120,61%,34%)]/10 font-sora" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container py-12">
        <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={isRTL ? 'lg:order-4' : ''}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold font-sora">IFPPS</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {t("footer.description") as string}
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse rtl:space-x-4 mt-6">
              <a
                href="https://www.facebook.com/Palestian.studentsFund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/IsnadFoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.59 3H17.4l-4.4 5.77L8.07 3H3.41l6.96 9.27L3 21h3.2l5.04-6.62L15.95 21H20.6l-7.13-9.49L20.59 3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/support.fund.ps/?igsh=MXhvdDFjbjBiMTB2YQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className={isRTL ? 'lg:order-3' : ''}>
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("footer.programs") as string}</h3>
            <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <li>
                <a href="/programs" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {t("footer.programs.undergraduate") as string}
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {t("footer.programs.graduate") as string}
                </a>
              </li>
              <li>
                <a href="/programs" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {t("footer.programs.research") as string}
                </a>
              </li>
            </ul>
          </div>
          <div className={isRTL ? 'lg:order-2' : ''}>
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("footer.about") as string}</h3>
            <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {t("footer.about.mission") as string}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {t("footer.about.team") as string}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {t("footer.about.partners") as string}
                </a>
              </li>
            </ul>
          </div>
          <div className={isRTL ? 'lg:order-1' : ''}>
            <h3 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("footer.contact") as string}</h3>
            <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <li className="text-gray-600 dark:text-gray-400">Kayabaşı Mah. Adnan Menderes Blv. A4 Blok No:7A Kapı No:11 Başakşehir/İstanbul</li>
              <li>
                <a href="mailto:info@isnadf.org" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  info@isnadf.org
                </a>
              </li>
              <li>
                <a href="tel:+905394300726" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 [direction:ltr] [unicode-bidi:isolate]">
                  +90 5394300726
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 py-8">
            <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <span>© 2025 IFPPS.</span>
              <span className="mx-2">|</span>
              <span>{t("footer.rights")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

