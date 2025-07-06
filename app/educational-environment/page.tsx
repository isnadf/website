"use client"

import { useLanguage } from "@/components/language-provider"

export default function EducationalEnvironmentPage() {
  const { language } = useLanguage()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">لبئية التعليمية</h1>
        <p className="text-lg text-muted-foreground">Educational Environment Page</p>
        <p className="text-sm text-muted-foreground mt-2">Content will be added later</p>
      </div>
    </main>
  )
} 