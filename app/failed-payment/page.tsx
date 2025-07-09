"use client"
import { useLanguage } from "@/components/language-provider";

export default function FailedPaymentPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center w-1/2">
        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 mb-6">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h1 className="text-3xl font-bold text-red-700 mb-4">{t("payment.fail.title")}</h1>
        <p className="text-lg text-gray-700 mb-6">{t("payment.fail.message")}</p>
        <div className="flex flex-row gap-4">
        <a href="/" className="text-red-600 hover:underline bg-red-100 p-2 rounded-md">{t("payment.fail.home")}</a>
        <a href="/donate" className="text-red-600 hover:underline bg-red-100 p-2 rounded-md">{t("payment.fail.retry")}</a>
        </div>
      </div>
    </div>
  );
} 