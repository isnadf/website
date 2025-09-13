"use client"
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";

export default function SuccessfulPaymentPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center w-1/2">
        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500 mb-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-3xl font-bold text-green-700 mb-4">{t("payment.success.title")}</h1>
        <p className="text-lg text-gray-700 mb-6">{t("payment.success.thankyou")}</p>
        <div className="flex flex-row gap-4">
        <Link href="/" className="text-green-600 hover:underline bg-green-100 p-2 rounded-md">{t("payment.success.home")}</Link>
        <Link href="/donate-form" className="text-green-600 hover:underline bg-green-100 p-2 rounded-md">{t("payment.success.donate")}</Link>
        </div>
      </div>
    </div>
  );
} 