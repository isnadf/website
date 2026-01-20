"use client"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
export default function NotFound() {
const {t,language}=useLanguage()
const isRTL=language==="ar"
return (
<div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
<div className={`text-center max-w-md ${isRTL?"font-arabic":""}`}>
<h1 className="text-8xl md:text-9xl font-bold text-slate-900 dark:text-white mb-2">404</h1>
<p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">{t("404.message")||"Page Not Found"}</p>
<Link href="/" className="inline-block px-8 py-3 bg-[#1e7e34] text-white rounded-lg hover:bg-[#188352] transition-colors">
{t("404.home")||"Go Home"}
</Link>
</div>
</div>
)
}
