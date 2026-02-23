"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { Check, Copy, Facebook, Heart, MessageSquare, Share2, Twitter, X, CreditCard, Banknote } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CampaignInfo = {
  key: string;
  image: string;
  pdf: string;
};

type DynamicCampaign = {
  slug: string;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  pdf: string | null;
  paid: number;
  left: number;
  goal: number;
  progress: number;
};

const campaignData: Record<string, CampaignInfo> = {
  "sponsor-medical-student": {
    key: "medical",
    image: "/campaign/medical.webp",
    pdf: "/Campaigns/برنامج اكفل طبيب انجليزي.pdf",
  },
  "support-quran-memorizer": {
    key: "quran",
    image: "/campaign/3.png",
    pdf: "/Campaigns/برنامج الحفاظ بالانجليزي .pdf",
  },
  "empower-gazan-female-student": {
    key: "empower",
    image: "/campaign/4.png",
    pdf: "/Campaigns/برنامج تمكين الفتاة الغزاوية الطالبة انجليزي.pdf",
  },
};

const parseCurrency = (value: string) => parseInt(value.replace(/,/g, ""), 10);

const presetAmounts = ["500", "1000", "2500", "3500", "5000"];

const bankInfo = {
  accountName: "İSNAD ÖĞRENCİ DESTEK DERNEĞİ",
  tryAccount: "TR420020900002315850000001",
  usdAccount: "TR150020900002315850000002",
  eurAccount: "TR850020900002315850000003",
  bankName: "Ziraat Katılım Bankası A.S",
  swiftCode: "ZKBATRIS"
};

export default function CampaignPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const lang = language as "en" | "ar";

  const slug = params.slug as string;
  const staticCampaign = campaignData[slug];
  const [dynamicCampaign, setDynamicCampaign] = useState<DynamicCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(`/api/home/campaigns/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setDynamicCampaign(data);
        }
      } catch {
        // Fall back to static
      } finally {
        setLoading(false);
      }
    }
    fetchCampaign();
  }, [slug]);

  const isDynamic = !!dynamicCampaign;
  const campaign = staticCampaign;

  const [activeTab, setActiveTab] = useState("overview");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Donation form state
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-16 flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-2 border-[#1e7e34] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!campaign && !dynamicCampaign) {
    return (
      <div className="container px-4 md:px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">{t("404.message")}</h1>
        <Link href="/">
          <Button>{t("404.home")}</Button>
        </Link>
      </div>
    );
  }

  const { key } = campaign || { key: "medical" };
  const paid = isDynamic ? dynamicCampaign!.paid : parseCurrency(t(`campaigns.${key}.paid`) as string);
  const left = isDynamic ? dynamicCampaign!.left : parseCurrency(t(`campaigns.${key}.left`) as string);
  const goal = isDynamic ? dynamicCampaign!.goal : parseCurrency(t(`campaigns.${key}.goal`) as string);
  const progress = isDynamic ? dynamicCampaign!.progress : Math.min(Math.round((paid / goal) * 100), 100);

  const title = isDynamic ? dynamicCampaign!.title[lang] : (t(`campaigns.${key}.title`) as string);
  const tagline = isDynamic ? dynamicCampaign!.tagline[lang] : (t(`campaigns.${key}.tagline`) as string);
  const description = isDynamic ? dynamicCampaign!.description[lang] : (t(`campaigns.${key}.description`) as string);
  const campaignImage = isDynamic ? dynamicCampaign!.image : campaign!.image;
  const campaignPdf = isDynamic ? dynamicCampaign!.pdf : campaign!.pdf;

  const estimatedShareRaise = Math.round(goal * 0.1);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedField("shareLink");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(title);
    const url = encodeURIComponent(shareUrl);

    let shareLink = "";
    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      default:
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer");
    }
  };

  // Donation form validation and handlers
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
  };

  const isValidCustomerInfo = (info: string): boolean => {
    const trimmed = info.trim();
    return trimmed.length > 0 && (isValidEmail(trimmed) || isValidPhone(trimmed));
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDonate = async () => {
    const finalAmount = customAmount || amount;

    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setError(t("campaigns.donation.error") as string);
      return;
    }

    if (!isValidCustomerInfo(customerInfo)) {
      setError(t("campaigns.donation.invalid") as string);
      return;
    }

    setIsLoading(true);
    setError("");
    const orderId = `ORD-${Date.now()}`;

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount: parseFloat(finalAmount).toFixed(2),
          paymentMethod,
          customerInfo: customerInfo.trim(),
          campaignSlug: slug,
          campaignTitle: title,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const html = await res.text();

      if (!html.includes("<form") || !html.includes("ziraatkatilim.com.tr")) {
        console.error("Invalid payment response:", html);
        throw new Error(
          language === "ar"
            ? "خطأ في بوابة الدفع. يرجى المحاولة مرة أخرى."
            : "Payment gateway error. Please try again."
        );
      }

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const form = tempDiv.querySelector("form");

      if (form) {
        form.setAttribute("target", "_self");
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } else {
        throw new Error(
          language === "ar"
            ? "خطأ في تحميل نموذج الدفع"
            : "Error loading payment form"
        );
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      setError(
        err instanceof Error
          ? err.message
          : language === "ar"
          ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-black min-h-screen overflow-x-hidden">
        <div className="container px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 min-w-0">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={campaignImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8">
                <div className={`mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                  <h1
                    className={`text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {title}
                  </h1>
                  <p className={`text-lg text-gray-600 dark:text-gray-400 mb-4 ${isRTL ? "font-arabic" : ""}`}>
                    {tagline}
                  </p>
                  <p className={`text-base text-gray-700 dark:text-gray-300 ${isRTL ? "font-arabic" : ""}`}>
                    {t("campaigns.goalLabel") as string} ${goal.toLocaleString()} $
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className={`text-gray-600 dark:text-gray-400 break-words ${isRTL ? "sm:ml-auto" : ""}`}>
                      {t("campaigns.paid")}: ${paid.toLocaleString()}
                    </span>
                    <span className={`text-gray-600 dark:text-gray-400 break-words ${isRTL ? "" : "sm:ml-auto"}`}>
                      {t("campaigns.left")}: ${left.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e7e34] transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Donation Form - Simplified */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-4 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                    {t("campaigns.donation.modal.title") as string}
                  </h3>
                  
                  {/* Amount Selection */}
                  <div className="mb-4">
                    <Label className={`text-sm font-semibold mb-3 block ${isRTL ? "text-right" : "text-left"}`}>
                      {t("campaigns.donation.chooseAmount") as string}
                    </Label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                      {presetAmounts.map((preset) => (
                        <Button
                          key={preset}
                          variant={amount === preset ? "default" : "outline"}
                          size="sm"
                          className={`h-12 text-sm font-semibold ${
                            amount === preset
                              ? "bg-[#1e7e34] text-white border-[#1e7e34] hover:bg-[#188352]"
                              : "border-gray-300 dark:border-gray-700 hover:border-[#1e7e34]"
                          }`}
                          onClick={() => {
                            setAmount(preset);
                            setCustomAmount("");
                          }}
                        >
                          ₺{preset}
                        </Button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <Label className={`text-xs font-medium mb-2 block ${isRTL ? "text-right" : "text-left"}`}>
                        {t("campaigns.donation.customAmount") as string}
                      </Label>
                      <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 h-12 px-4 focus-within:border-[#1e7e34] transition-colors">
                        <span className="text-lg font-bold text-gray-800 dark:text-white">₺</span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          placeholder={t("campaigns.donation.enterAmount") as string}
                          value={customAmount}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
                              setCustomAmount(value);
                              setAmount("");
                            }
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          className={`flex-1 min-w-0 text-lg font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isRTL ? "mr-2 text-right" : "ml-2 text-left"}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button
                    onClick={() => {
                      if (!amount && !customAmount) {
                        setError(t("campaigns.donation.error") as string);
                        return;
                      }
                      setIsDonationModalOpen(true);
                      setError("");
                    }}
                    className="w-full bg-[#1e7e34] hover:bg-[#188352] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t("campaigns.donation.donateNow") as string}
                  </Button>

                  {error && (
                    <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs text-center">
                      {error}
                    </div>
                  )}
                </div>

                <div className={`flex items-center gap-4 flex-wrap mt-6 ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsShareModalOpen(true)}
                    className={isRTL ? "flex-row-reverse" : ""}
                  >
                    <Share2 className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("campaigns.share")}
                  </Button>
                  <Button variant="ghost" size="lg" className={isRTL ? "flex-row-reverse" : ""}>
                    <Heart className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    20
                  </Button>
                  <Button variant="ghost" size="lg" className={isRTL ? "flex-row-reverse" : ""}>
                    <MessageSquare className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    0
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8">
                <div
                  className={`flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto ${
                    isRTL ? "flex-row-reverse justify-end" : "justify-start"
                  }`}
                >
                  {(isRTL ? ["donations", "comments", "updates", "details", "overview"] : ["overview", "details", "updates", "comments", "donations"]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        isRTL ? "font-arabic" : ""
                      } ${
                        activeTab === tab
                          ? "border-[#1e7e34] text-[#1e7e34]"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {t(`campaigns.tabs.${tab}`) as string}
                      {tab === "donations" && ` (186)`}
                      {tab === "comments" && ` (0)`}
                      {tab === "updates" && ` (0)`}
                    </button>
                  ))}
                </div>

                <div className={`prose prose-lg max-w-none break-words ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                  {activeTab === "overview" && (
                    <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
                      <p
                        className={`text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line ${
                          isRTL ? "font-arabic text-right" : ""
                        }`}
                      >
                        {description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 pt-4">
                        <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                          <p className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${isRTL ? "font-arabic" : ""}`}>
                            {t("campaigns.info.number")}
                          </p>
                          <p className={`font-semibold text-slate-900 dark:text-white ${isRTL ? "font-arabic" : ""}`}>
                            {t(`campaigns.${key}.number`) as string}
                          </p>
                        </div>
                        <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                          <p className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${isRTL ? "font-arabic" : ""}`}>
                            {t("campaigns.info.department")}
                          </p>
                          <p className={`font-semibold text-slate-900 dark:text-white ${isRTL ? "font-arabic" : ""}`}>
                            {t(`campaigns.${key}.department`) as string}
                          </p>
                        </div>
                        <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                          <p className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${isRTL ? "font-arabic" : ""}`}>
                            {t("campaigns.info.date")}
                          </p>
                          <p className={`font-semibold text-slate-900 dark:text-white ${isRTL ? "font-arabic" : ""}`}>
                            {t(`campaigns.${key}.date`) as string}
                          </p>
                        </div>
                        <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                          <p className={`text-sm text-gray-600 dark:text-gray-400 mb-1 ${isRTL ? "font-arabic" : ""}`}>
                            {t("campaigns.info.category")}
                          </p>
                          <p className={`font-semibold text-slate-900 dark:text-white ${isRTL ? "font-arabic" : ""}`}>
                            {t(`campaigns.${key}.category`) as string}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <a
                          href={campaignPdf || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#1e7e34] hover:underline"
                        >
                          {t("campaigns.viewPDF")}
                        </a>
                      </div>
                    </div>
                  )}

                  {activeTab === "details" && (
                    <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                      <p className={`text-gray-700 dark:text-gray-300 ${isRTL ? "font-arabic text-right" : ""}`}>
                        {t(`campaigns.${key}.details`) as string}
                      </p>
                    </div>
                  )}

                  {activeTab === "updates" && (
                    <div className={`py-12 text-gray-500 dark:text-gray-400 ${isRTL ? "text-right font-arabic" : "text-center"}`}>
                      {t("campaigns.noUpdates")}
                    </div>
                  )}

                  {activeTab === "comments" && (
                    <div className={`py-12 text-gray-500 dark:text-gray-400 ${isRTL ? "text-right font-arabic" : "text-center"}`}>
                      {t("campaigns.noComments")}
                    </div>
                  )}

                  {activeTab === "donations" && (
                    <div className="space-y-4">
                      {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg sm:flex-row sm:items-center sm:justify-between ${
                        isRTL ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`flex items-center gap-3 min-w-0 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className={`min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
                          <p className={`font-medium text-slate-900 dark:text-white ${isRTL ? "font-arabic" : ""}`}>Donor {i + 1}</p>
                          <p className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? "font-arabic" : ""}`}>#{1700000 + i}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-semibold text-slate-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}>
                        ${[15, 20, 50, 30, 10, 5, 100, 25, 75, 200][i]}
                      </div>
                    </div>
                  ))}
                </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 min-w-0">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 lg:sticky lg:top-8 min-w-0">
                <h3
                  className={`text-lg font-bold text-slate-900 dark:text-white mb-4 ${
                    isRTL ? "text-right font-arabic" : "text-left"
                  }`}
                >
                  {t("campaigns.otherCampaigns")}
                </h3>

                <div className="space-y-4">
                  {Object.entries(campaignData)
                    .filter(([s]) => s !== slug)
                    .slice(0, 2)
                    .map(([s, c]) => (
                      <Link key={s} href={`/campaigns/${s}`} className={`block group min-w-0 ${isRTL ? "flex flex-row-reverse gap-3" : "flex gap-3"}`}>
                        <div className={`relative w-24 flex-shrink-0 h-24 rounded-lg overflow-hidden`}>
                          <Image
                            src={c.image}
                            alt={t(`campaigns.${c.key}.title`) as string}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="96px"
                          />
                        </div>
                        <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
                          <h4
                            className={`font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2 group-hover:text-[#1e7e34] transition-colors ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {t(`campaigns.${c.key}.title`) as string}
                          </h4>
                          <p className={`text-sm text-gray-600 dark:text-gray-400 ${isRTL ? "font-arabic" : ""}`}>
                            {t("campaigns.goalLabel")}{" "}
                            {parseCurrency(t(`campaigns.${c.key}.goal`) as string).toLocaleString()} $
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsShareModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden ${
              isRTL ? "font-arabic" : ""
            }`}
          >
            <button
              onClick={() => setIsShareModalOpen(false)}
              className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10`}
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-3 ${isRTL ? "text-right pr-12" : "text-left"}`}>
                {t("donate.shareModal.title") as string}
              </h2>
              <p className={`text-gray-700 dark:text-gray-300 mb-6 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                {t("donate.shareModal.description") as string} ${estimatedShareRaise.toLocaleString()}.
              </p>

              <div className={`flex flex-col gap-3 mb-6 sm:flex-row ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                <button
                  onClick={() => handleSocialShare("whatsapp")}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialShare("facebook")}
                  className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white p-4 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleSocialShare("twitter")}
                  className="flex-1 bg-black hover:bg-gray-800 text-white p-4 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <div className={`flex flex-col gap-2 sm:flex-row ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className={`flex-1 min-w-0 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? "text-right font-arabic" : "text-left"}`}
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors flex items-center justify-center"
                  >
                    {copiedField === "shareLink" ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  &quot;{t("donate.shareModal.quote") as string}&quot; - {t("donate.shareModal.prophet") as string}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Donation Modal - Email/Phone and Payment Method */}
      {isDonationModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setIsDonationModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full ${
              isRTL ? "font-arabic" : ""
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className={`text-xl font-bold text-gray-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}>
                {t("campaigns.donation.modal.title") as string}
              </h2>
              <button
                onClick={() => setIsDonationModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Selected Amount Display */}
              <div className={`p-4 bg-gradient-to-r from-[#1e7e34]/10 to-transparent rounded-xl border border-[#1e7e34]/20 ${isRTL ? "text-right" : "text-left"}`}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {language === "ar" ? "المبلغ المحدد:" : "Selected Amount:"}
                </p>
                <p className="text-2xl font-bold text-[#1e7e34]">
                  ₺{customAmount || amount}
                </p>
              </div>

              {/* Customer Information */}
              <div>
                <Label className={`text-base font-semibold mb-3 block ${isRTL ? "text-right" : "text-left"}`}>
                  {t("campaigns.donation.donorInfo") as string}
                </Label>
                <div>
                  <Label className={`text-sm font-medium mb-2 block ${isRTL ? "text-right" : "text-left"}`}>
                    {t("campaigns.donation.emailOrPhone") as string}
                  </Label>
                  <input
                    type="text"
                    placeholder={t("campaigns.donation.emailOrPhonePlaceholder") as string}
                    value={customerInfo}
                    onChange={(e) => setCustomerInfo(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:border-[#1e7e34] outline-none transition-colors dark:bg-gray-800 dark:text-white ${
                      customerInfo.trim() && !isValidCustomerInfo(customerInfo)
                        ? "border-red-500"
                        : customerInfo.trim() && isValidCustomerInfo(customerInfo)
                        ? "border-green-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                    required
                  />
                  {customerInfo.trim() && !isValidCustomerInfo(customerInfo) && (
                    <p className={`text-red-500 text-xs mt-1 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("campaigns.donation.invalid") as string}
                    </p>
                  )}
                  {customerInfo.trim() && isValidCustomerInfo(customerInfo) && (
                    <p className={`text-green-500 text-xs mt-1 ${isRTL ? "text-right" : "text-left"}`}>
                      {t("campaigns.donation.valid") as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <Label className={`text-base font-semibold mb-3 block ${isRTL ? "text-right" : "text-left"}`}>
                  {t("campaigns.donation.paymentMethod") as string}
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div
                    className={`flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      paymentMethod === "card"
                        ? "bg-green-50 dark:bg-green-900/20 border-[#1e7e34]"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                    } ${isRTL ? "space-x-reverse" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" className="cursor-pointer" />
                    <Label
                      htmlFor="card"
                      className={`flex items-center cursor-pointer flex-1 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <CreditCard
                        className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"} ${
                          paymentMethod === "card" ? "text-[#1e7e34]" : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold ${
                          paymentMethod === "card"
                            ? "text-[#1e7e34]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {t("campaigns.donation.card") as string}
                      </span>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      paymentMethod === "bank"
                        ? "bg-green-50 dark:bg-green-900/20 border-[#1e7e34]"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                    } ${isRTL ? "space-x-reverse" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <RadioGroupItem value="bank" id="bank" className="cursor-pointer" />
                    <Label
                      htmlFor="bank"
                      className={`flex items-center cursor-pointer flex-1 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Banknote
                        className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"} ${
                          paymentMethod === "bank" ? "text-[#1e7e34]" : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold ${
                          paymentMethod === "bank"
                            ? "text-[#1e7e34]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {t("campaigns.donation.bank") as string}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Bank Transfer Details */}
              {paymentMethod === "bank" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <h4 className={`text-sm font-bold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
                    {language === "ar" ? "تفاصيل الحساب البنكي" : "Bank Account Details"}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className={`flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded ${isRTL ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "اسم الحساب" : "Account Name"}</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono">{bankInfo.accountName}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.accountName, "accountName")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "accountName" ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded ${isRTL ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "TRY" : "TRY"}</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono">{bankInfo.tryAccount}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.tryAccount, "tryAccount")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "tryAccount" ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded ${isRTL ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "USD" : "USD"}</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono">{bankInfo.usdAccount}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.usdAccount, "usdAccount")}
                          className="h-6 w-6 p-0"
                        >
                          {copiedField === "usdAccount" ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Donate Button */}
              {paymentMethod !== "bank" && (
                <Button
                  onClick={handleDonate}
                  disabled={
                    isLoading ||
                    !paymentMethod ||
                    !isValidCustomerInfo(customerInfo)
                  }
                  className="w-full bg-[#1e7e34] hover:bg-[#188352] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className={`flex items-center justify-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t("campaigns.donation.loading") as string}</span>
                    </div>
                  ) : (
                    <span>{t("campaigns.donation.donateNow") as string}</span>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
