"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, CreditCard, Banknote, Gift, Heart, Shield, Users, Building2, GraduationCap, Stethoscope, Star, Leaf, Scale, Brain, Copy, Check, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function DonatePage() {
  const { t, language } = useLanguage()
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [donationType, setDonationType] = useState<"individual" | "institution">("individual")
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const bankInfo = {
    accountName: "FİLİSTİNLİ ÖĞRENCİLERİ DESTEKLEME VE DAYANIŞMA DERNEĞİ",
    tryAccount: "TR230020900001928671000001",
    usdAccount: "TR660020900001928671000003",
    eurAccount: "TR930020900001928671000002",
    bankName: "Ziraat Katılım Bankası A.S",
    swiftCode: "ZKBATRIS"
  }

  const handleDonate = async () => {
    const finalAmount = customAmount || amount;

    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

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
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const html = await res.text();

      // Validate response is HTML with payment form
      if (!html.includes("<form") || !html.includes("ziraatkatilim.com.tr")) {
        console.error("Invalid payment response:", html);
        alert("Payment gateway error. Please try again.");
        return;
      }

      const win = window.open("", "_blank");

      if (win) {
        win.document.write(html);
        win.document.close();
      } else {
        alert("Popup blocked. Please enable popups to continue.");
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const presetAmounts = ["500", "1000", "2500", "3500", "5000"]

  const impactStats = [
    { icon: Users, value: "500+", label: t("donate.impact.students") },
    { icon: Gift, value: "₺1M+", label: t("donate.impact.scholarships") },
    { icon: Heart, value: "20+", label: t("donate.impact.countries") },
  ]

  const faqs = [
    {
      question: t("donate.faq.use"),
      answer: t("donate.faq.use.answer")
    },
    {
      question: t("donate.faq.tax"),
      answer: t("donate.faq.tax.answer")
    },
    {
      question: t("donate.faq.recurring"),
      answer: t("donate.faq.recurring.answer")
    },
    {
      question: t("donate.faq.track"),
      answer: t("donate.faq.track.answer")
    }
  ]

  const whySupportReasons = [
    t("donate.why_support.reason1"),
    t("donate.why_support.reason2"),
    t("donate.why_support.reason3"),
    t("donate.why_support.reason4"),
    t("donate.why_support.reason5"),
    t("donate.why_support.reason6"),
    t("donate.why_support.reason7"),
    t("donate.why_support.reason8"),
  ]

  const whyNowReasons = [
    t("donate.why_now.reason1"),
    t("donate.why_now.reason2"),
    t("donate.why_now.reason3"),
  ]

  const whatWeOffer = [
    t("donate.what_we_offer.item1"),
    t("donate.what_we_offer.item2"),
    t("donate.what_we_offer.item3"),
    t("donate.what_we_offer.item4"),
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Left Image and Right Content */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-cover.jpg"
                  alt="Palestinian Students"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${language === "ar" ? "text-right" : "text-left"}`}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t("donate.hero.title")}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {t("donate.hero.subtitle")}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("donate.hero.main_text")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-4xl mx-auto ${language === "ar" ? "text-right" : ""}`}
          >
            <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.why_support.title")}
            </h2>
            <div className={`space-y-4 ${language === "ar" ? "text-right" : ""}`}>
              {whySupportReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative p-4 bg-gray-50 rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}
                >
                  <div className={`absolute w-2 h-2 bg-[#34a853] rounded-full ${language === "ar" ? "right-4 top-6" : "left-4 top-6"}`} />
                  <p className={`text-gray-700 leading-relaxed ${language === "ar" ? "pr-6" : "pl-6"}`}>
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.why_now.title")}
            </h2>
            <div className="space-y-4">
              {whyNowReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative p-4 bg-white rounded-lg shadow-sm ${language === "ar" ? "text-right" : "text-left"}`}
                >
                  <div className={`absolute w-2 h-2 bg-[#34a853] rounded-full ${language === "ar" ? "right-4 top-6" : "left-4 top-6"}`} />
                  <p className={`text-gray-700 leading-relaxed ${language === "ar" ? "pr-6" : "pl-6"}`}>
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.what_we_offer.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whatWeOffer.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative p-4 bg-gray-50 rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}
                >
                  <CheckCircle className={`absolute w-5 h-5 text-[#34a853] ${language === "ar" ? "right-4 top-5" : "left-4 top-5"}`} />
                  <p className={`text-gray-700 ${language === "ar" ? "pr-8" : "pl-8"}`}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Breakdown Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className={`text-3xl font-bold text-center text-gray-900 mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.cost.title")}
            </h2>
            <p className={`text-lg text-gray-700 mb-8 leading-relaxed ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.cost.intro")}
            </p>
            <p className={`text-lg text-gray-700 mb-8 leading-relaxed ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.cost.total")}
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className={`text-xl font-semibold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
                {t("donate.cost.breakdown.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className={`font-medium ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.tuition")}</span>
                  <span className="font-bold text-[#34a853]">$5,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className={`font-medium ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.living")}</span>
                  <span className="font-bold text-[#34a853]">$4,500</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className={`font-medium ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.transport")}</span>
                  <span className="font-bold text-[#34a853]">$1,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className={`font-medium ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.cost.academic")}</span>
                  <span className="font-bold text-[#34a853]">$1,500</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#34a853] text-white rounded-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">$12,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Contribute Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${language === "ar" ? "text-right" : "text-left"}`}>
              {t("donate.how_contribute.title")}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* For Individuals */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className={`text-2xl font-bold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {t("donate.for_individuals.title")}
                </h3>
                <div className="space-y-4">
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">$12,000 USD → {t("donate.full_sponsorship")}</h4>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.partial_sponsorship")}</h4>
                    <p className="text-sm text-gray-600">{t("donate.partial_50")}</p>
                    <p className="text-sm text-gray-600">{t("donate.tuition_only")}</p>
                    <p className="text-sm text-gray-600">{t("donate.living_only")}</p>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.one_time")}</h4>
                  </div>
                </div>
              </div>

              {/* For Institutions */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className={`text-2xl font-bold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {t("donate.for_institutions.title")}
                </h3>
                <div className="space-y-4">
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.full_program")}</h4>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.student_numbers")}</h4>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.training_partnership")}</h4>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.media_partnership")}</h4>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.endowment")}</h4>
                  </div>
                  <div className={`p-4 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold text-[#34a853] mb-2">{t("donate.adopt_program")}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 bg-[#34a853] text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{t("donate.contact_invitation")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center space-y-2">
                  <MapPin className="w-6 h-6" />
                  <span className="font-medium">{t("donate.office_visit")}</span>
                  <p className="text-sm text-white/90 mt-2">
                    {t("contact.location.address")}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Mail className="w-6 h-6" />
                  <span className="font-medium">{t("donate.contact_info")}</span>
                  <div className="text-sm text-white/90 mt-2 space-y-1">
                    <p>{t("contact.email")}</p>
                    <p dir="ltr">{t("contact.phone")}</p>
                    <p>{t("contact.phone.hours")}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Phone className="w-6 h-6" />
                  <span className="font-medium">{t("donate.social_media")}</span>
                  <div className="flex gap-3 mt-2">
                    <a
                      href="https://www.facebook.com/Palestian.studentsFund"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/IsnadFoundation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.59 3H17.4l-4.4 5.77L8.07 3H3.41l6.96 9.27L3 21h3.2l5.04-6.62L15.95 21H20.6l-7.13-9.49L20.59 3z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/support.fund.ps/?igsh=MXhvdDFjbjBiMTB2YQ%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section - Only for Individuals */}
      <section className="pt-8 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex justify-center items-center ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.form.title")}</h2>
              
              {/* Donation Type Selection */}
              <div className="mb-8">
                <Label className={`text-lg font-medium mb-4 flex ${language === "ar" ? "justify-center" : "justify-center"} items-center`}>Choose Contribution Type</Label>
                <RadioGroup
                  value={donationType}
                  onValueChange={(value) => {
                    setDonationType(value as "individual" | "institution")
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div 
                    className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                      donationType === "individual" 
                        ? "bg-green-50 border-green-200" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${language === "ar" ? "space-x-reverse" : ""}`}
                    onClick={() => setDonationType("individual")}
                  >
                    <RadioGroupItem value="individual" id="individual" className="cursor-pointer" />
                    <Label 
                      htmlFor="individual" 
                      className={`flex items-center cursor-pointer flex-1 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <Users className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"} ${donationType === "individual" ? "text-green-600" : "text-gray-600"}`} />
                      <span className={donationType === "individual" ? "text-green-700 font-medium" : ""}>
                        Individual
                      </span>
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                      donationType === "institution" 
                        ? "bg-green-50 border-green-200" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${language === "ar" ? "space-x-reverse" : ""}`}
                    onClick={() => setDonationType("institution")}
                  >
                    <RadioGroupItem value="institution" id="institution" className="cursor-pointer" />
                    <Label 
                      htmlFor="institution" 
                      className={`flex items-center cursor-pointer flex-1 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <Building2 className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"} ${donationType === "institution" ? "text-green-600" : "text-gray-600"}`} />
                      <span className={donationType === "institution" ? "text-green-700 font-medium" : ""}>
                        Institution
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Show form only for individuals */}
              {donationType === "individual" && (
                <>
                  {/* Amount Selection */}
                  <div className="mb-8">
                    <Label className={`text-lg font-medium mb-4 block ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.form.amount")}</Label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {presetAmounts.map((preset) => (
                        <Button
                          key={preset}
                          variant={amount === preset ? "default" : "outline"}
                          className={`h-12 text-lg ${
                            amount === preset ? "bg-[#34a853] text-white" : ""
                          }`}
                          onClick={() => {
                            setAmount(preset)
                            setCustomAmount("")
                          }}
                        >
                          ₺{preset}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Label className={`text-sm text-gray-600 mb-2 block ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.form.custom")}</Label>
                      <div
                        className="flex items-center justify-between border border-gray-300 rounded-lg bg-white h-20 px-4 focus-within:border-green-500"
                      >
                        {/* Left: Currency symbol and label */}
                        <div className="flex flex-col items-start justify-center">
                          <span className="text-2xl font-bold text-gray-800">₺</span>
                          <span className="text-xs text-gray-700 font-semibold mt-1">TRY</span>
                        </div>
                        {/* Right: Amount input */}
                        <input
                          type="number"
                          placeholder={t("donate.form.custom") as string}
                          value={customAmount}
                          onChange={e => {
                            setCustomAmount(e.target.value)
                            setAmount("")
                          }}
                          className="w-full text-right border-none outline-none bg-transparent text-4xl font-bold text-gray-900 placeholder-gray-400 focus:ring-0 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          style={{maxWidth: '80%', direction: language === 'ar' ? 'rtl' : 'ltr'}}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <Label className={`text-lg font-medium mb-4 block ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.form.payment")}</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}
                    >
                      <div className={`flex items-center ${language === "ar" ? "justify-end" : ""} cursor-pointer`}>
                        <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                          <RadioGroupItem value="card" id="card" className={`${language === "ar" ? "ml-2" : "mr-2"} cursor-pointer`} />
                          <Label 
                            htmlFor="card" 
                            className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""} cursor-pointer`}
                          >
                            <CreditCard className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                            <span className={language === "ar" ? "text-right" : ""}>{t("donate.form.card")}</span>
                          </Label>
                        </div>
                      </div>
                      <div className={`flex items-center ${language === "ar" ? "justify-end" : ""} cursor-pointer`}>
                        <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                          <RadioGroupItem value="bank" id="bank" className={`${language === "ar" ? "ml-2" : "mr-2"} cursor-pointer`} />
                          <Label 
                            htmlFor="bank" 
                            className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""} cursor-pointer`}
                          >
                            <Banknote className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                            <span className={language === "ar" ? "text-right" : ""}>{t("donate.form.bank")}</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Bank Information - Show when bank transfer is selected */}
                  {paymentMethod === "bank" && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
                      <h3 className={`text-lg font-semibold mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                        {language === "ar" ? "معلومات التحويل البنكي" : "Bank Transfer Information"}
                      </h3>
                      
                      <div className="space-y-3">
                        {/* Account Name */}
                        <div className="flex items-center justify-between bg-white p-3 rounded border">
                          <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {language === "ar" ? "اسم الحساب" : "Account Name"}
                            </p>
                            <p className="text-gray-900 text-sm">{bankInfo.accountName}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankInfo.accountName, "accountName")}
                            className={`${language === "ar" ? "mr-2" : "ml-2"} hover:bg-transparent`}
                          >
                            {copiedField === "accountName" ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600" />
                            )}
                          </Button>
                        </div>

                        {/* Bank Name */}
                        <div className="flex items-center justify-between bg-white p-3 rounded border">
                          <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {language === "ar" ? "اسم البنك" : "Bank Name"}
                            </p>
                            <p className="text-gray-900 text-sm">{bankInfo.bankName}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankInfo.bankName, "bankName")}
                            className={`${language === "ar" ? "mr-2" : "ml-2"} hover:bg-transparent`}
                          >
                            {copiedField === "bankName" ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600" />
                            )}
                          </Button>
                        </div>

                        {/* SWIFT Code */}
                        <div className="flex items-center justify-between bg-white p-3 rounded border">
                          <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {language === "ar" ? "رمز سويفت" : "SWIFT Code"}
                            </p>
                            <p className="text-gray-900 font-mono text-sm">{bankInfo.swiftCode}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bankInfo.swiftCode, "swiftCode")}
                            className={`${language === "ar" ? "mr-2" : "ml-2"} hover:bg-transparent`}
                          >
                            {copiedField === "swiftCode" ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600" />
                            )}
                          </Button>
                        </div>

                        {/* Account Numbers */}
                        <div className="space-y-2">
                          <h4 className={`font-medium text-gray-900 ${language === "ar" ? "text-right" : "text-left"}`}>
                            {language === "ar" ? "أرقام الحسابات" : "Account Numbers"}
                          </h4>
                          
                          {/* TRY Account */}
                          <div className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                {language === "ar" ? "حساب الليرة التركية" : "TRY Account"}
                              </p>
                              <p className="text-gray-900 font-mono text-sm">{bankInfo.tryAccount}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(bankInfo.tryAccount, "tryAccount")}
                              className={`${language === "ar" ? "mr-2" : "ml-2"} hover:bg-transparent`}
                            >
                              {copiedField === "tryAccount" ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-600" />
                              )}
                            </Button>
                          </div>

                          {/* USD Account */}
                          <div className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                {language === "ar" ? "حساب الدولار الأمريكي" : "USD Account"}
                              </p>
                              <p className="text-gray-900 font-mono text-sm">{bankInfo.usdAccount}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(bankInfo.usdAccount, "usdAccount")}
                              className={`${language === "ar" ? "mr-2" : "ml-2"} hover:bg-transparent`}
                            >
                              {copiedField === "usdAccount" ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-600" />
                              )}
                            </Button>
                          </div>

                          {/* EUR Account */}
                          <div className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                {language === "ar" ? "حساب اليورو" : "EUR Account"}
                              </p>
                              <p className="text-gray-900 font-mono text-sm">{bankInfo.eurAccount}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(bankInfo.eurAccount, "eurAccount")}
                              className={`${language === "ar" ? "mr-2" : "ml-2"} hover:bg-transparent`}
                            >
                              {copiedField === "eurAccount" ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-600" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 p-3 rounded border border-blue-200">
                          <p className={`text-sm text-blue-800 ${language === "ar" ? "text-right" : "text-left"}`}>
                            {language === "ar" 
                              ? "يرجى استخدام رقم الحساب المناسب للعملة المفضلة لديك. بعد إجراء التحويل، يرجى الاحتفاظ بالإيصال كسجل."
                              : "Please use the account number corresponding to your preferred currency. After making the transfer, please keep the receipt for your records."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contribute Button */}
                  <Button
                    className="w-full h-14 text-lg bg-[#34a853] hover:bg-[#2d9249] text-white"
                    onClick={handleDonate}
                    disabled={paymentMethod === "bank"}
                  >
                    {paymentMethod === "bank" 
                      ? (language === "ar" ? "تم اختيار التحويل البنكي - استخدم تفاصيل الحساب أعلاه" : "Bank transfer selected - use account details above")
                      : (language === "ar" ? "ساهم الآن" : t("donate.form.button"))
                    }
                  </Button>

                  {/* Trust Indicators */}
                  <div className={`mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 ${language === "ar" ? "space-x-reverse" : ""}`}>
                    <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                      <Shield className={`w-4 h-4 ${language === "ar" ? "ml-1" : "mr-1"}`} />
                      {t("donate.trust.secure")}
                    </div>
                    <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                      <CheckCircle className={`w-4 h-4 ${language === "ar" ? "ml-1" : "mr-1"}`} />
                      {t("donate.trust.tax")}
                    </div>
                  </div>
                </>
              )}

              {/* For Institutions - Show contact message */}
              {donationType === "institution" && (
                <div className="text-center py-8">
                  <Building2 className="w-16 h-16 text-[#34a853] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{t("donate.contact_invitation")}</h3>
                  <p className="text-gray-600 mb-6">
                    {language === "ar" 
                      ? "للمؤسسات والجهات المانحة، يرجى التواصل معنا مباشرة لعقد لقاء تعارفي وتقديم نموذج شراكة مخصص لاحتياجاتكم."
                      : "For institutions and donor entities, please contact us directly to arrange an introductory meeting and present a customized partnership model for your needs."
                    }
                  </p>
                  <Button className="bg-[#34a853] hover:bg-[#2d9249] text-white">
                    {language === "ar" ? "تواصل معنا" : "Contact Us"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${language === "ar" ? "text-right flex justify-center items-center" : "text-left"}`}>
            {t("donate.impact.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 text-center shadow-md ${language === "ar" ? "text-right" : "text-left"}`}
              >
                <stat.icon className="w-12 h-12 text-[#34a853] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2 flex justify-center items-center">{stat.value}</div>
                <div className="text-gray-600 flex justify-center items-center">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center text-gray-900 mb-12 ${language === "ar" ? "text-right flex justify-center items-center" : "text-left"}`}>
            {t("donate.faq.title")}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`border rounded-lg px-4 ${language === "ar" ? "text-right" : "text-left"}`}
                >
                  <AccordionTrigger 
                    className={`text-lg font-medium w-full ${language === "ar" ? "flex-row-reverse justify-end" : ""}`}
                  >
                    <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className={`text-gray-600 ${language === "ar" ? "text-right" : "text-left"}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
} 