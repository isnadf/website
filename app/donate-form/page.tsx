"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Banknote, Gift, Heart, Shield, Users, Copy, Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"


export default function DonateFormPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const [amount, setAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState("")

  const presetAmounts = ["500", "1000", "2500", "3500", "5000"]

  // Validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '')
    // Accept phone numbers with 7-15 digits (international format)
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
    const finalAmount = customAmount || amount;

    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setError(language === "ar" ? "يرجى إدخال مبلغ صحيح" : "Please enter a valid amount");
      return;
    }

    // Validate customer info
    if (!isValidCustomerInfo(customerInfo)) {
      setError(language === "ar" ? "يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف" : "Please enter a valid email or phone number");
      return;
    }

    setIsLoading(false);
    setError(language === "ar" ? "الدفع غير متاح حالياً وسيعود قريباً. نعمل على تحديث معلومات الحساب." : "Donations are temporarily unavailable while we update our account details. Please try again soon.");
    
    /*
    // Original payment flow - temporarily disabled while updating bank information.
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

      // Validate response is HTML with payment form
      if (!html.includes("<form") || !html.includes("ziraatkatilim.com.tr")) {
        console.error("Invalid payment response:", html);
        throw new Error(language === "ar" ? "خطأ في بوابة الدفع. يرجى المحاولة مرة أخرى." : "Payment gateway error. Please try again.");
      }

      // Create a temporary form and submit it in the same window
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const form = tempDiv.querySelector('form');
      
      if (form) {
        // Set form to submit in the same window
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
    */

    return;
  };

  const impactStats = [
    { icon: Users, value: "500+", label: language === "ar" ? "طالب مدعوم" : "Supported Students" },
    { icon: Gift, value: "₺1M+", label: language === "ar" ? "منحة مقدمة" : "Scholarships Provided" },
    { icon: Heart, value: "20+", label: language === "ar" ? "دولة مستفيدة" : "Beneficiary Countries" },
  ]

  const paymentBrands = [
    { name: "Visa", logo: "/visa.svg" },
    { name: "Mastercard", logo: "/mastercard.svg" },
  ]

  const faqs = [
    {
      question: language === "ar" ? "كيف سيتم استخدام مساهمتي؟" : "How will my contribution be used?",
      answer: language === "ar" ? "تُستخدم مساهماتك لدعم الطلاب الفلسطينيين في تغطية الرسوم الدراسية والكتب والمواد التعليمية والإقامة." : "Your contributions are used to support Palestinian students in covering tuition fees, books, educational materials, and accommodation."
    },
    {
      question: language === "ar" ? "هل مساهمتي معفاة من الضرائب؟" : "Is my contribution tax exempt?",
      answer: language === "ar" ? "نعم، مساهماتك معفاة من الضرائب وفقاً للقوانين التركية. يمكنك الحصول على إيصال ضريبي." : "Yes, your contributions are tax exempt according to Turkish laws. You can receive a tax receipt."
    },
    {
      question: language === "ar" ? "هل يمكنني تقديم مساهمات متكررة؟" : "Can I make recurring contributions?",
      answer: language === "ar" ? "نعم، يمكنك إعداد مساهمات شهرية أو سنوية منتظمة. تواصل معنا لترتيب ذلك." : "Yes, you can set up regular monthly or annual contributions. Contact us to arrange this."
    },
    {
      question: language === "ar" ? "كيف يمكنني تتبع تأثير مساهمتي؟" : "How can I track my contribution's impact?",
      answer: language === "ar" ? "سنرسل لك تقارير دورية عن الطلاب المدعومين والتقدم المحرز في برامجنا التعليمية." : "We will send you periodic reports about supported students and progress in our educational programs."
    }
  ]

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 ${isRTL ? "font-arabic" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-[#34a853] to-[#2d9249] rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ar" ? "ساهم الآن" : "Donate Now"}
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-[#34a853] text-[#34a853] hover:bg-[#34a853] hover:text-white"
          >
            {isRTL ? "العودة" : "Back"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >


              {/* Amount Selection */}
              <div className="mb-8">
                <Label className={`text-xl font-bold mb-6 block ${isRTL ? "text-right" : "text-left"}`}>
                  {language === "ar" ? "اختر المبلغ" : "Choose Amount"}
                </Label>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      variant={amount === preset ? "default" : "outline"}
                      className={`h-16 text-lg font-semibold ${
                        amount === preset ? "bg-[#34a853] text-white border-[#34a853]" : "border-gray-300 hover:border-[#34a853]"
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
                
                {/* Custom Amount */}
                <div className="mb-8">
                  <Label className={`text-lg font-medium mb-4 block ${language === "ar" ? "text-right" : "text-left"}`}>
                    {language === "ar" ? "مبلغ مخصص" : "Custom Amount"}
                  </Label>
                  <div className="flex items-center border-2 border-gray-300 rounded-2xl bg-white h-20 px-6 focus-within:border-[#34a853] transition-colors">
                    {/* Currency */}
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-2xl font-bold text-gray-800">₺</span>
                      <span className="text-xs text-gray-600 font-medium">TRY</span>
                    </div>
                    {/* Input */}
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder={language === "ar" ? "أدخل المبلغ" : "Enter amount"}
                      value={customAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow positive numbers
                        if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
                          setCustomAmount(value);
                          setAmount("");
                        }
                      }}
                      onKeyPress={(e) => {
                        // Prevent non-numeric characters
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className={`flex-1 text-4xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${language === "ar" ? "mr-4" : "ml-4"}`}
                    />
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-8">
                <Label className={`text-xl font-bold mb-6 block ${isRTL ? "text-right" : "text-left"}`}>
                  {language === "ar" ? "معلومات المتبرع" : "Donor Information"}
                </Label>
                <div>
                  <Label className={`text-sm font-medium mb-2 block ${isRTL ? "text-right" : "text-left"}`}>
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
                  {customerInfo.trim() && isValidCustomerInfo(customerInfo) && (
                    <p className={`text-green-500 text-sm mt-1 ${isRTL ? "text-right" : "text-left"}`}>
                      {language === "ar" ? "✓ صحيح" : "✓ Valid"}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <Label className={`text-xl font-bold mb-6 block ${isRTL ? "text-right" : "text-left"}`}>
                  {language === "ar" ? "طريقة الدفع" : "Payment Method"}
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div 
                    className={`flex items-center space-x-4 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                      paymentMethod === "card" 
                        ? "bg-green-50 border-[#34a853] shadow-lg" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${isRTL ? "space-x-reverse" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <RadioGroupItem value="card" id="card" className="cursor-pointer" />
                    <Label 
                      htmlFor="card" 
                      className={`flex items-center cursor-pointer flex-1 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <CreditCard className={`w-6 h-6 ${isRTL ? "ml-3" : "mr-3"} ${paymentMethod === "card" ? "text-[#34a853]" : "text-gray-600"}`} />
                      <span className={`text-lg font-semibold ${paymentMethod === "card" ? "text-[#34a853]" : "text-gray-700"}`}>
                        {language === "ar" ? "بطاقة ائتمان/خصم" : "Credit/Debit Card"}
                      </span>
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-4 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                      paymentMethod === "bank" 
                        ? "bg-green-50 border-[#34a853] shadow-lg" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${isRTL ? "space-x-reverse" : ""}`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <RadioGroupItem value="bank" id="bank" className="cursor-pointer" />
                    <Label 
                      htmlFor="bank" 
                      className={`flex items-center cursor-pointer flex-1 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Banknote className={`w-6 h-6 ${isRTL ? "ml-3" : "mr-3"} ${paymentMethod === "bank" ? "text-[#34a853]" : "text-gray-600"}`} />
                      <span className={`text-lg font-semibold ${paymentMethod === "bank" ? "text-[#34a853]" : "text-gray-700"}`}>
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
                  className="mb-8 p-6 bg-gray-50 rounded-2xl"
                >
                  <h3 className={`text-lg font-bold mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                    {language === "ar" ? "تفاصيل الحساب البنكي" : "Bank Account Details"}
                  </h3>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center p-3 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "اسم الحساب" : "Account Name"}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{bankInfo.accountName}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.accountName, "accountName")}
                          className="h-8 w-8 p-0 hover:bg-transparent"
                        >
                          {copiedField === "accountName" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-3 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "رقم الحساب (TRY)" : "Account Number (TRY)"}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{bankInfo.tryAccount}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.tryAccount, "tryAccount")}
                          className="h-8 w-8 p-0 hover:bg-transparent"
                        >
                          {copiedField === "tryAccount" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-3 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "رقم الحساب (USD)" : "Account Number (USD)"}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{bankInfo.usdAccount}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.usdAccount, "usdAccount")}
                          className="h-8 w-8 p-0 hover:bg-transparent"
                        >
                          {copiedField === "usdAccount" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-3 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "رقم الحساب (EUR)" : "Account Number (EUR)"}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{bankInfo.eurAccount}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(bankInfo.eurAccount, "eurAccount")}
                          className="h-8 w-8 p-0 hover:bg-transparent"
                        >
                          {copiedField === "eurAccount" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center p-3 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "اسم البنك" : "Bank Name"}</span>
                      <span className="font-mono text-sm">{bankInfo.bankName}</span>
                    </div>
                    <div className={`flex justify-between items-center p-3 bg-white rounded-lg ${language === "ar" ? "text-right" : "text-left"}`}>
                      <span className="font-medium">{language === "ar" ? "رمز SWIFT" : "SWIFT Code"}</span>
                      <span className="font-mono text-sm">{bankInfo.swiftCode}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Donate Button */}
              {paymentMethod !== "bank" && (
                <>
                  <Button 
                    onClick={handleDonate}
                    disabled={isLoading || (!amount && !customAmount) || !paymentMethod || !isValidCustomerInfo(customerInfo)}
                    className="w-full bg-gradient-to-r from-[#34a853] to-[#2d9249] hover:from-[#2d9249] hover:to-[#34a853] text-white font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{language === "ar" ? "جاري التحميل..." : "Loading..."}</span>
                      </div>
                    ) : (
                      <span className="text-xl">{language === "ar" ? "ساهم الآن" : "Donate Now"}</span>
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
                </>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Security & Tax Info */}
              <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#34a853]" />
                  <span>{language === "ar" ? "دفع آمن" : "Secure Payment"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#34a853]" />
                  <span>{language === "ar" ? "معفى من الضرائب" : "Tax Exempt"}</span>
                </div>
              </div>
            </motion.div>
          </div>



          {/* Sidebar */}
          <div className="space-y-8">
            {/* Impact Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className={`text-2xl font-bold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
                {language === "ar" ? "تأثيرك" : "Your Impact"}
              </h3>
              <div className="space-y-6">
                {impactStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-4"}`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#34a853]/20 to-[#2d9249]/20 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-[#34a853]" />
                    </div>
                    <div className={`flex-1 ${language === "ar" ? "text-right" : "text-left"}`}>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className={`text-2xl font-bold mb-6 ${language === "ar" ? "text-right" : "text-left"}`}>
                {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-xl"
                  >
                    <h4 className={`font-semibold text-gray-900 mb-2 ${language === "ar" ? "text-right" : "text-left"}`}>
                      {faq.question}
                    </h4>
                    <p className={`text-sm text-gray-600 leading-relaxed ${language === "ar" ? "text-right" : "text-left"}`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 