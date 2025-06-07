"use client"

import Link from "next/link"
import { GraduationCap, Facebook, Instagram } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="border-t bg-gradient-to-r from-[hsl(0,76%,40%)]/5 via-transparent to-[hsl(120,61%,34%)]/5 dark:from-[hsl(0,76%,40%)]/10 dark:via-black/80 dark:to-[hsl(120,61%,34%)]/10 font-sora">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold font-sora">IFPPS</span>
            </div>
            <p className={`mt-4 text-sm text-muted-foreground font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
              {t("footer.description")}
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://www.facebook.com/Palestian.studentsFund"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/IsnadFoundation"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.59 3H17.4l-4.4 5.77L8.07 3H3.41l6.96 9.27L3 21h3.2l5.04-6.62L15.95 21H20.6l-7.13-9.49L20.59 3z"/>
                      </svg>
              </a>
              <a
                href="https://www.instagram.com/support.fund.ps/?igsh=MXhvdDFjbjBiMTB2YQ%3D%3D"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("footer.programs")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs" className={`text-muted-foreground hover:text-primary font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                  {t("footer.programs.undergraduate")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className={`text-muted-foreground hover:text-primary font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                  {t("footer.programs.graduate")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className={`text-muted-foreground hover:text-primary font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                  {t("footer.programs.research")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("footer.about")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className={`text-muted-foreground hover:text-primary font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                  {t("footer.about.mission")}
                </Link>
              </li>
              <li>
                <Link href="/about" className={`text-muted-foreground hover:text-primary font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                  {t("footer.about.team")}
                </Link>
              </li>
              <li>
                <Link href="/about" className={`text-muted-foreground hover:text-primary font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                  {t("footer.about.partners")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`mb-4 text-sm font-semibold uppercase tracking-wider font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("footer.contact")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground font-sora">Kayabaşı Mah. Adnan Menderes Blv. A4 Blok No:7A Kapı No:11 Başakşehir/İstanbul</li>
              <li>
                <a href="mailto:info@isnadf.org" className="text-muted-foreground hover:text-primary font-sora">
                  info@isnadf.org
                </a>
              </li>
              <li>
                <a href="tel:+905394300726" className="text-muted-foreground hover:text-primary font-sora">
                  +90 5394300726
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-muted mt-8 pt-8">
          <div className={`text-center text-sm text-muted-foreground font-sora ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
            © {new Date().getFullYear()} IFPPS. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  )
}

