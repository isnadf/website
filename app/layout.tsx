import type React from "react"
import { Inter, Poppins, Noto_Kufi_Arabic, Playfair_Display, Sora } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import LoadingBar from "@/components/loading-bar"
import TranslationSafeWrapper from "@/components/translation-safe-wrapper"
import TranslationDebug from "@/components/translation-debug"
import SmoothScroll from "@/components/smooth-scroll"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})
const notoKufiArabic = Noto_Kufi_Arabic({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
  display: "swap",
  preload: true,
})

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
})

const sora = Sora({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
})


export const metadata: Metadata = {
  title: {
    default: "Isnad Foundation",
    template: "%s | Isnad Foundation",
  },
  description:
    "Providing scholarships, university admissions, and academic support for Palestinian students across the world.",
  keywords: ["scholarships", "education", "palestinian students", "academic support", "university admissions"],
  generator: 'v0.dev',
  icons: {
    icon: '/logo.png',
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-precomposed.png' }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${notoKufiArabic.variable} ${playfair.variable} ${sora.variable} font-sora`}>
        <SmoothScroll />
        <TranslationSafeWrapper>
            <LanguageProvider>
              <LoadingBar />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
              <Toaster />
            </LanguageProvider>
          <TranslationDebug />
        </TranslationSafeWrapper>
        <Analytics />
      </body>
    </html>
  )
}
