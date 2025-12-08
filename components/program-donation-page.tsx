"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Banknote, Heart, Shield, Users, Copy, Check, Share2, CheckCircle, Globe, Gift, Sparkles, Star, Smile, ArrowRight, Leaf, X, MessageCircle, Facebook, Twitter } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

interface ProgramDonationPageProps {
  heroImage: string
  portraitImage1?: string
  portraitImage2?: string
  organizerName?: string
  organizerLogo?: string
  programTitle: string
  programDescription: string
  goalAmount: number
  raisedAmount: number
  supporters: number
  daysLeft: number
  impactCountry: string
  suggestedAmounts?: Array<{
    amount: number
    title: string
    description: string
    claimed?: number
  }>
}

export default function ProgramDonationPage({
  heroImage,
  portraitImage1,
  portraitImage2,
  organizerName,
  organizerLogo,
  programTitle,
  programDescription,
  goalAmount,
  raisedAmount,
  supporters,
  daysLeft,
  impactCountry,
  suggestedAmounts = [
    { amount: 54, title: "Build Part of a Classroom Space", description: "Contribute to help fund a classroom for orphans", claimed: 1 },
    { amount: 107, title: "Support Student Learning", description: "Help provide educational resources", claimed: 0 },
    { amount: 200, title: "Fund a Student's Education", description: "Support a student's full educational journey", claimed: 0 },
    { amount: 800, title: "One Space for Generations", description: "Create a lasting impact for future generations", claimed: 0 },
  ]
}: ProgramDonationPageProps) {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  const [amount, setAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState("")
  const [selectedSuggestedAmount, setSelectedSuggestedAmount] = useState<number | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href)
    }
  }, [])

  const presetAmounts = ["500", "1000", "2500", "3500", "5000"]

  const paymentBrands = [
    { name: "Visa", logo: "/visa.svg" },
    { name: "Mastercard", logo: "/mastercard.svg" },
  ]

  // Validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length >= 7 && cleanPhone.length <= 15
  }

  const isValidCustomerInfo = (info: string): boolean => {
    const trimmed = info.trim()
    return trimmed.length > 0 && (isValidEmail(trimmed) || isValidPhone(trimmed))
  }

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
    accountName: "İSNAD ÖĞRENCİ DESTEK DERNEĞİ",
    tryAccount: "TR420020900002315850000001",
    usdAccount: "TR150020900002315850000002",
    eurAccount: "TR850020900002315850000003",
    bankName: "Ziraat Katılım Bankası A.S",
    swiftCode: "ZKBATRIS"
  }

  const handleDonate = async () => {
    const finalAmount = selectedSuggestedAmount 
      ? selectedSuggestedAmount.toString() 
      : customAmount || amount;

    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setError(language === "ar" ? "يرجى إدخال مبلغ صحيح" : "Please enter a valid amount");
      return;
    }

    if (!isValidCustomerInfo(customerInfo)) {
      setError(language === "ar" ? "يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف" : "Please enter a valid email or phone number");
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
          customerInfo: customerInfo.trim()
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      const html = await res.text();

      if (!html.includes("<form") || !html.includes("ziraatkatilim.com.tr")) {
        console.error("Invalid payment response:", html);
        throw new Error(language === "ar" ? "خطأ في بوابة الدفع. يرجى المحاولة مرة أخرى." : "Payment gateway error. Please try again.");
      }

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const form = tempDiv.querySelector('form');
      
      if (form) {
        form.setAttribute('target', '_self');
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } else {
        throw new Error(language === "ar" ? "خطأ في تحميل نموذج الدفع" : "Error loading payment form");
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      setError(err instanceof Error ? err.message : (language === "ar" ? "حدث خطأ ما. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleSocialShare = (platform: string) => {
    if (!shareUrl) return
    
    const url = encodeURIComponent(shareUrl)
    const text = encodeURIComponent(`${programTitle} - ${programDescription}`)
    
    let socialShareUrl = ""
    switch (platform) {
      case "whatsapp":
        socialShareUrl = `https://wa.me/?text=${text}%20${url}`
        break
      case "facebook":
        socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        socialShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        break
    }
    
    if (socialShareUrl) {
      window.open(socialShareUrl, "_blank", "width=600,height=400")
    }
  }

  const handleCopyLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedField("shareLink")
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleSuggestedAmountClick = (suggestedAmount: number) => {
    setSelectedSuggestedAmount(suggestedAmount)
    setAmount("")
    setCustomAmount("")
  }

  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100)
  const finalAmount = selectedSuggestedAmount || (customAmount ? parseFloat(customAmount) : (amount ? parseFloat(amount) : 0))

  // Animated counter for raised amount
  const [animatedRaised, setAnimatedRaised] = useState(0)
  
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = raisedAmount / steps
    const stepDuration = duration / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= raisedAmount) {
        setAnimatedRaised(raisedAmount)
        clearInterval(timer)
      } else {
        setAnimatedRaised(Math.floor(current))
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [raisedAmount])

  // Mock recent supporters data
  const recentSupporters = [
    { name: t("donate.donors.anonymous") as string, amount: "$5", currency: "USD", time: "24 minutes", icon: "star", iconColor: "bg-blue-400" },
    { name: t("donate.donors.anonymous") as string, amount: "RM 5", currency: "MYR", time: "15 hours", icon: "smile", iconColor: "bg-orange-400" },
    { name: t("donate.donors.anonymous") as string, amount: "£40", currency: "GBP", time: "a day", icon: "sparkles", iconColor: "bg-purple-400" },
    { name: t("donate.donors.anonymous") as string, amount: "$1", currency: "CAD", time: "2 days", icon: "heart", iconColor: "bg-pink-400" },
    { name: t("donate.donors.anonymous") as string, amount: "$25", currency: "USD", time: "3 days", icon: "star", iconColor: "bg-green-400" },
    { name: t("donate.donors.anonymous") as string, amount: "$10", currency: "USD", time: "4 days", icon: "smile", iconColor: "bg-yellow-400" },
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "star":
        return <Star className="w-4 h-4" />
      case "smile":
        return <Smile className="w-4 h-4" />
      case "sparkles":
        return <Sparkles className="w-4 h-4" />
      case "heart":
        return <Heart className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const estimatedShareRaise = Math.floor(raisedAmount * 0.15) // Estimate 15% from sharing

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-gray-50 pt-20">
      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Campaign Title */}
            <div className={`mb-4 ${isRTL ? "text-right" : "text-left"}`}>
              <h1 className={`text-2xl md:text-3xl font-bold ${isRTL ? "text-right" : "text-left"}`}>
                {programTitle}
              </h1>
              {organizerName && (
                <div className={`flex items-center gap-2 mt-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                  <span className="text-sm text-gray-600">
                    {language === "ar" ? "منظم بواسطة" : "Organized by"} {language === "ar" ? "مؤسسة إسناد لدعم الطالب الفلسطيني" : organizerName}
                  </span>
                  {organizerLogo && (
                    <div className="inline-flex items-center justify-center w-6 h-6">
                      <Image src={organizerLogo} alt={organizerName} width={20} height={20} className="object-contain" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hero Section with Overlaid Portraits */}
            <section className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={heroImage}
                alt={programTitle}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              
              {/* Overlaid Portraits */}
              {(portraitImage1 || portraitImage2) && (
                <div className={`absolute bottom-6 ${isRTL ? "right-6" : "left-6"} flex gap-4 z-10`}>
                  {portraitImage1 && (
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-blue-400/30 blur-xl" />
                      <Image
                        src={portraitImage1}
                        alt="Portrait 1"
                        fill
                        className="object-cover relative z-10"
                        sizes="96px"
                      />
                    </div>
                  )}
                  {portraitImage2 && (
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-blue-400/30 blur-xl" />
                      <Image
                        src={portraitImage2}
                        alt="Portrait 2"
                        fill
                        className="object-cover relative z-10"
                        sizes="96px"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Text Overlay */}
              <div className={`absolute bottom-6 ${isRTL ? "left-6" : "right-6"} z-10 max-w-md ${isRTL ? "text-right" : "text-left"}`}>
                <h2 className="text-white text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">
                  {programTitle}
                </h2>
                <p className="text-white/90 text-sm md:text-base drop-shadow-md">
                  {language === "ar" ? "تبرع اليوم" : "Donate today"} <Heart className="inline w-4 h-4 text-red-500" />
                </p>
              </div>

              {/* Organization Logo Overlay */}
              {organizerLogo && (
                <div className="absolute top-6 right-6 z-10">
                  <Image src={organizerLogo} alt={organizerName || ""} width={80} height={40} className="object-contain" />
                </div>
              )}
            </section>

            {/* Donation Form */}
            <div id="donation-form" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className={`text-2xl font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                {language === "ar" ? "اختر مبلغ التبرع" : "Choose Your Donation Amount"}
              </h2>

              {/* Preset Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    variant={amount === preset && !selectedSuggestedAmount ? "default" : "outline"}
                    className={`h-20 text-lg font-semibold ${
                      amount === preset && !selectedSuggestedAmount
                        ? "bg-[#34a853] text-white border-[#34a853]" 
                        : "border-gray-300 hover:border-[#34a853]"
                    }`}
                    onClick={() => {
                      setAmount(preset)
                      setCustomAmount("")
                      setSelectedSuggestedAmount(null)
                    }}
                    >
                    ₺{preset}
                  </Button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <Label className={`text-lg font-medium mb-4 block ${isRTL ? "text-right" : "text-left"}`}>
                  {language === "ar" ? "مبلغ مخصص" : "Custom Amount"}
                </Label>
                <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white h-16 px-4 focus-within:border-[#34a853] transition-colors">
                  <span className="text-xl font-bold text-gray-800">₺</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder={language === "ar" ? "أدخل المبلغ" : "Enter amount"}
                    value={customAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
                        setCustomAmount(value);
                        setAmount("");
                        setSelectedSuggestedAmount(null)
                      }
                    }}
                    className={`flex-1 text-2xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isRTL ? "mr-2" : "ml-2"}`}
                  />
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <Label className={`text-lg font-medium mb-2 block ${isRTL ? "text-right" : "text-left"}`}>
                  {language === "ar" ? "البريد الإلكتروني أو رقم الهاتف *" : "Email or Phone Number *"}
                </Label>
                <input
                  type="text"
                  placeholder={language === "ar" ? "بريدك الإلكتروني أو رقم هاتفك" : "Your email or phone number"}
                  value={customerInfo}
                  onChange={(e) => setCustomerInfo(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:border-[#34a853] outline-none transition-colors ${
                    customerInfo.trim() && !isValidCustomerInfo(customerInfo) 
                      ? "border-red-500" 
                      : customerInfo.trim() && isValidCustomerInfo(customerInfo)
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  required
                />
                {customerInfo.trim() && !isValidCustomerInfo(customerInfo) && (
                  <p className={`text-red-500 text-sm mt-1 ${isRTL ? "text-right" : "text-left"}`}>
                    {language === "ar" ? "يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف" : "Please enter a valid email or phone number"}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <Label className={`text-lg font-medium mb-4 block ${isRTL ? "text-right" : "text-left"}`}>
                  {language === "ar" ? "طريقة الدفع" : "Payment Method"}
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div 
                    className={`flex items-center space-x-4 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "card" 
                        ? "bg-green-50 border-[#34a853]" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${isRTL ? "space-x-reverse" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" className="cursor-pointer" />
                    <Label htmlFor="card" className={`flex items-center cursor-pointer flex-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <CreditCard className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"} ${paymentMethod === "card" ? "text-[#34a853]" : "text-gray-600"}`} />
                      <span className={`font-semibold ${paymentMethod === "card" ? "text-[#34a853]" : "text-gray-700"}`}>
                        {language === "ar" ? "بطاقة ائتمان/خصم" : "Credit/Debit Card"}
                      </span>
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-4 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === "bank" 
                        ? "bg-green-50 border-[#34a853]" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${isRTL ? "space-x-reverse" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <RadioGroupItem value="bank" id="bank" className="cursor-pointer" />
                    <Label htmlFor="bank" className={`flex items-center cursor-pointer flex-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Banknote className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"} ${paymentMethod === "bank" ? "text-[#34a853]" : "text-gray-600"}`} />
                      <span className={`font-semibold ${paymentMethod === "bank" ? "text-[#34a853]" : "text-gray-700"}`}>
                        {language === "ar" ? "تحويل بنكي" : "Bank Transfer"}
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
                  className="mb-6 p-6 bg-gray-50 rounded-xl"
                >
                  <h3 className={`font-bold mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                    {language === "ar" ? "تفاصيل الحساب البنكي" : "Bank Account Details"}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: language === "ar" ? "اسم الحساب" : "Account Name", value: bankInfo.accountName, key: "accountName" },
                      { label: language === "ar" ? "TRY" : "TRY", value: bankInfo.tryAccount, key: "tryAccount" },
                      { label: language === "ar" ? "USD" : "USD", value: bankInfo.usdAccount, key: "usdAccount" },
                      { label: language === "ar" ? "EUR" : "EUR", value: bankInfo.eurAccount, key: "eurAccount" },
                      { label: language === "ar" ? "اسم البنك" : "Bank Name", value: bankInfo.bankName, key: "bankName" },
                      { label: language === "ar" ? "رمز SWIFT" : "SWIFT Code", value: bankInfo.swiftCode, key: "swiftCode" },
                    ].map((item) => (
                      <div key={item.key} className={`flex justify-between items-center p-2 bg-white rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <span className="text-sm font-medium">{item.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs">{item.value}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(item.value, item.key)}
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === item.key ? (
                              <Check className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-600" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Donate Button */}
              {paymentMethod !== "bank" && (
                <>
                  <Button 
                    onClick={handleDonate}
                    disabled={isLoading || (!amount && !customAmount && !selectedSuggestedAmount) || !paymentMethod || !isValidCustomerInfo(customerInfo)}
                    className="w-full bg-gradient-to-r from-[#34a853] to-[#2d9249] hover:from-[#2d9249] hover:to-[#34a853] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{language === "ar" ? "جاري التحميل..." : "Loading..."}</span>
                      </div>
                    ) : (
                      <span>{language === "ar" ? "ساهم الآن" : "Donate Now"}</span>
                    )}
                  </Button>

                  <div className="mt-6 flex items-center justify-center gap-2">
                    {paymentBrands.map((brand) => (
                      <Image
                        key={brand.name}
                        src={brand.logo}
                        alt={brand.name}
                        width={brand.name === "Mastercard" ? 100 : 80}
                        height={brand.name === "Mastercard" ? 35 : 28}
                        className={brand.name === "Mastercard" ? "h-9 w-auto" : "h-7 w-auto"}
                        priority={false}
                      />
                    ))}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#34a853]" />
                      <span>{language === "ar" ? "دفع آمن" : "Secure Payment"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#34a853]" />
                      <span>{language === "ar" ? "معفى من الضرائب" : "Tax Exempt"}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Program Description - White Content Blocks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className={`prose max-w-none ${isRTL ? "text-right" : "text-left"}`}>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {programDescription}
                </p>
                
                {/* Additional content sections can be added here */}
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
                      {language === "ar" ? "الهدف من البرنامج" : "Program Goals"}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {programDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky */}
          <div className="lg:sticky lg:top-20 h-fit space-y-6">
            {/* Donation Summary Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Funds Raised */}
              <div className="mb-4">
                <div className="text-4xl font-bold text-[#34a853] mb-1">
                  ${animatedRaised.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {language === "ar" ? "تم جمعه من" : "raised of"} ${goalAmount.toLocaleString()} {language === "ar" ? "هدف" : "USD goal"}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-[#34a853] rounded-full"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="text-xs text-gray-600 mb-6">
                {supporters} {t("donate.supporters") as string}, {daysLeft} {t("donate.daysLeft") as string}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  <Share2 className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("donate.share") as string}
                </Button>
                <Button
                  onClick={() => {
                    const donationSection = document.getElementById("donation-form")
                    donationSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full bg-gradient-to-r from-[#34a853] to-[#2d9249] hover:from-[#2d9249] hover:to-[#34a853] text-white font-bold"
                >
                  {t("donate.donate") as string}
                </Button>
              </div>

              {/* Impact and Verification */}
              <div className="space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{impactCountry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span>{language === "ar" ? "معفى من الضرائب" : "Tax Exempt"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#34a853]" />
                  <span>{t("donate.verified") as string}</span>
                </div>
              </div>
            </div>

            {/* Suggested Donation Amounts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className={`text-lg font-bold mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                {language === "ar" ? "مبالغ التبرع المقترحة" : "Your giving amount"}
              </h3>
              <div className="space-y-3">
                {suggestedAmounts.map((suggested, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestedAmountClick(suggested.amount)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSuggestedAmount === suggested.amount
                        ? "border-[#34a853] bg-green-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-xl font-bold text-gray-900">
                        ₺{suggested.amount}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {suggested.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {suggested.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donors Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <h3 className={`text-xl font-bold p-6 pb-4 ${isRTL ? "text-right" : "text-left"}`}>
                {t("donate.donors.title") as string}
              </h3>
              
              {/* Share Section */}
              <div className="bg-gray-100 rounded-t-xl px-6 py-4 flex items-center justify-between relative overflow-hidden">
                <p className={`text-sm font-medium text-gray-900 ${isRTL ? "text-right" : "text-left"}`}>
                  {t("donate.donors.shareText") as string} ${estimatedShareRaise}
                </p>
                <Button
                  onClick={handleShare}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                >
                  {t("donate.share") as string}
                  <ArrowRight className="w-4 h-4" />
                </Button>
                {/* Decorative Plant */}
                <div className="absolute -right-4 -bottom-2 opacity-20">
                  <Leaf className="w-16 h-16 text-green-500 rotate-12" />
                </div>
              </div>

              {/* Recent Supporters */}
              <div className="px-6 py-4">
                <h4 className={`text-sm font-bold mb-3 ${isRTL ? "text-right" : "text-left"}`}>
                  {t("donate.donors.recentSupporters") as string}
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {recentSupporters.map((supporter, index) => (
                    <div key={index} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full ${supporter.iconColor} flex items-center justify-center text-white flex-shrink-0`}>
                        {getIcon(supporter.icon)}
                      </div>
                      <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {supporter.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {supporter.amount} {supporter.currency}, {supporter.time} {t("donate.donors.ago") as string}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsShareModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className={`text-2xl font-bold mb-3 ${isRTL ? "text-right pr-12" : "text-left"}`}>
                {t("donate.shareModal.title") as string}
              </h2>

              {/* Description */}
              <p className={`text-gray-700 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                {t("donate.shareModal.description") as string} ${estimatedShareRaise}.
              </p>

              {/* Social Media Buttons */}
              <div className={`flex gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={() => handleSocialShare("whatsapp")}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-xl flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

              {/* Shareable Link */}
              <div className="mb-6">
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className={`flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm ${isRTL ? "text-right" : "text-left"}`}
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center"
                  >
                    {copiedField === "shareLink" ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Motivational Quote */}
              <div className={`bg-gray-50 rounded-xl p-4 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                <p className="text-sm text-gray-700 italic">
                  &quot;{t("donate.shareModal.quote") as string}&quot; - {t("donate.shareModal.prophet") as string}
                </p>
              </div>

              {/* Illustrative Graphic */}
              <div className="flex items-center justify-center gap-2 text-4xl">
                <Heart className="text-red-500" />
                <Users className="text-blue-500" />
                <Sparkles className="text-yellow-500" />
                <Star className="text-purple-500" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

