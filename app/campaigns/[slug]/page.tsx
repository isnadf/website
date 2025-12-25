"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { Check, Copy, Facebook, Heart, MessageSquare, Share2, Twitter, X } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

type CampaignInfo = {
  key: string;
  image: string;
  pdf: string;
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

export default function CampaignPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const slug = params.slug as string;
  const campaign = campaignData[slug];

  if (!campaign) {
    return (
      <div className="container px-4 md:px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">{t("404.message")}</h1>
        <Link href="/">
          <Button>{t("404.home")}</Button>
        </Link>
      </div>
    );
  }

  const { key } = campaign;

  const paid = parseCurrency(t(`campaigns.${key}.paid`) as string);
  const left = parseCurrency(t(`campaigns.${key}.left`) as string);
  const goal = parseCurrency(t(`campaigns.${key}.goal`) as string);
  const progress = Math.min(Math.round((paid / goal) * 100), 100);

  const [activeTab, setActiveTab] = useState("overview");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const estimatedShareRaise = Math.round(goal * 0.1);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedField("shareLink");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(t(`campaigns.${key}.title`) as string);
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

  return (
    <>
      <div className="bg-white dark:bg-black min-h-screen">
        <div className="container px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={campaign.image}
                  alt={t(`campaigns.${key}.title`) as string}
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
                    {t(`campaigns.${key}.title`) as string}
                  </h1>
                  <p className={`text-lg text-gray-600 dark:text-gray-400 mb-4 ${isRTL ? "font-arabic" : ""}`}>
                    {t(`campaigns.${key}.tagline`) as string}
                  </p>
                  <p className={`text-base text-gray-700 dark:text-gray-300 ${isRTL ? "font-arabic" : ""}`}>
                    {t("campaigns.goalLabel") as string} ${goal.toLocaleString()} $
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`text-gray-600 dark:text-gray-400 ${isRTL ? "ml-auto" : ""}`}>
                      {t("campaigns.paid")}: ${paid.toLocaleString()}
                    </span>
                    <span className={`text-gray-600 dark:text-gray-400 ${isRTL ? "" : "ml-auto"}`}>
                      {t("campaigns.left")}: ${left.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e7e34] transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className={`flex items-center gap-4 flex-wrap ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}`}>
                  <Button size="lg" className={`bg-[#1e7e34] hover:bg-[#188352] text-white ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Heart className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("campaigns.donate")}
                  </Button>
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

                <div className={`prose prose-lg max-w-none ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                  {activeTab === "overview" && (
                    <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
                      <p
                        className={`text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line ${
                          isRTL ? "font-arabic text-right" : ""
                        }`}
                      >
                        {t(`campaigns.${key}.description`) as string}
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
                          href={campaign.pdf}
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
                          className={`flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                            <div className={isRTL ? "text-right" : "text-left"}>
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

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sticky top-8">
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
                      <Link key={s} href={`/campaigns/${s}`} className={`block group ${isRTL ? "flex flex-row-reverse gap-3" : "flex gap-3"}`}>
                        <div className={`relative w-24 flex-shrink-0 h-24 rounded-lg overflow-hidden`}>
                          <Image
                            src={c.image}
                            alt={t(`campaigns.${c.key}.title`) as string}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="96px"
                          />
                        </div>
                        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
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

              <div className={`flex gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
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
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className={`flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? "text-right font-arabic" : "text-left"}`}
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
    </>
  );
}
