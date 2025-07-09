"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, CreditCard, Banknote, Gift, Heart, Shield, Users, Building2, GraduationCap, Stethoscope, Star, Leaf, Scale, Brain } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DonatePage() {
  const { t, language } = useLanguage()
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [donationType, setDonationType] = useState<"general" | "program">("general")
  const [selectedProgram, setSelectedProgram] = useState("")

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

  const presetAmounts = ["50", "100", "250", "500", "1000"]

  const programs = [
    {
      id: "pulse-of-life",
      name: t("donate.programs.pulse"),
      icon: Stethoscope,
      description: t("donate.programs.pulse.desc"),
      scholarships: "1,000",
      duration: "5 years",
      focus: "Medicine and Health Sciences"
    },
    {
      id: "palestinian-talented",
      name: t("donate.programs.talented"),
      icon: Star,
      description: t("donate.programs.talented.desc"),
      scholarships: "1,000",
      focus: "Various Academic Fields"
    },
    {
      id: "sustainability",
      name: t("donate.programs.sustainability"),
      icon: Leaf,
      description: t("donate.programs.sustainability.desc"),
      scholarships: "200",
      focus: "Energy and Agricultural Engineering"
    },
    {
      id: "justice-for-palestine",
      name: t("donate.programs.justice"),
      icon: Scale,
      description: t("donate.programs.justice.desc"),
      scholarships: "200",
      focus: "Political Science and International Relations"
    },
    {
      id: "ibn-khaldun",
      name: t("donate.programs.ibn-khaldun"),
      icon: Brain,
      description: t("donate.programs.ibn-khaldun.desc"),
      scholarships: "200",
      focus: "Sociology and Psychology"
    }
  ]

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-3xl mx-auto text-center ${language === "ar" ? "text-right" : "text-left"}`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex justify-center items-center">
              {t("donate.hero.title")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t("donate.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex justify-center items-center ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.form.title")}</h2>
              
              {/* Donation Type Selection */}
              <div className="mb-8">
                <Label className={`text-lg font-medium mb-4 flex ${language === "ar" ? "justify-center" : "justify-center"} items-center`}>{t("donate.form.type")}</Label>
                <RadioGroup
                  value={donationType}
                  onValueChange={(value) => {
                    setDonationType(value as "general" | "program")
                    setSelectedProgram("")
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div 
                    className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                      donationType === "general" 
                        ? "bg-green-50 border-green-200" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${language === "ar" ? "space-x-reverse" : ""}`}
                    onClick={() => {
                      setDonationType("general")
                      setSelectedProgram("")
                    }}
                  >
                    <RadioGroupItem value="general" id="general" className="cursor-pointer" />
                    <Label 
                      htmlFor="general" 
                      className={`flex items-center cursor-pointer flex-1 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <Building2 className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"} ${donationType === "general" ? "text-green-600" : "text-gray-600"}`} />
                      <span className={donationType === "general" ? "text-green-700 font-medium" : ""}>
                        {t("donate.form.general")}
                      </span>
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                      donationType === "program" 
                        ? "bg-green-50 border-green-200" 
                        : "hover:bg-gray-50 border-gray-200"
                    } ${language === "ar" ? "space-x-reverse" : ""}`}
                    onClick={() => {
                      setDonationType("program")
                      setSelectedProgram("")
                    }}
                  >
                    <RadioGroupItem value="program" id="program" className="cursor-pointer" />
                    <Label 
                      htmlFor="program" 
                      className={`flex items-center cursor-pointer flex-1 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <GraduationCap className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"} ${donationType === "program" ? "text-green-600" : "text-gray-600"}`} />
                      <span className={donationType === "program" ? "text-green-700 font-medium" : ""}>
                        {t("donate.form.specific")}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Program Selection - Only show when specific program is selected */}
              {donationType === "program" && (
                <div className="mb-8">
                  <Label className={`text-lg font-medium mb-4 block ${language === "ar" ? "text-right" : "text-left"}`}>{t("donate.form.select_program")}</Label>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger className={`w-full h-12 ${language === "ar" ? "text-right" : "text-left"}`}>
                      <SelectValue placeholder={t("donate.form.choose_program")} />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                            <program.icon className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                            {program.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Program Details - Only show when a program is selected */}
              {donationType === "program" && selectedProgram && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  {(() => {
                    const program = programs.find(p => p.id === selectedProgram)
                    if (!program) return null
                    return (
                      <>
                        <h3 className={`text-lg font-semibold mb-4 flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                          <program.icon className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                          {program.name}
                        </h3>
                        <div className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                          <p className="text-gray-600">{program.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">{t("donate.programs.scholarships")}:</span>
                              <span className={`${language === "ar" ? "mr-2" : "ml-2"} text-gray-600`}>{program.scholarships}</span>
                            </div>
                            {program.duration && (
                              <div>
                                <span className="font-medium text-gray-700">{t("donate.programs.duration")}:</span>
                                <span className={`${language === "ar" ? "mr-2" : "ml-2"} text-gray-600`}>{program.duration}</span>
                              </div>
                            )}
                            <div className="col-span-2">
                              <span className="font-medium text-gray-700">{t("donate.programs.focus")}:</span>
                              <span className={`${language === "ar" ? "mr-2" : "ml-2"} text-gray-600`}>{program.focus}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}

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
                  <Input
                    type="number"
                    placeholder={t("donate.form.custom") as string}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setAmount("")
                    }}
                    className={`h-12 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${language === "ar" ? "text-right" : "text-left"}`}
                  />
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
                  <div className={`flex items-center ${language === "ar" ? "justify-end" : ""}`}>
                    <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                      <RadioGroupItem value="card" id="card" className={language === "ar" ? "ml-2" : "mr-2"} />
                      <Label 
                        htmlFor="card" 
                        className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
                      >
                        <CreditCard className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                        <span className={language === "ar" ? "text-right" : ""}>{t("donate.form.card")}</span>
                      </Label>
                    </div>
                  </div>
                  <div className={`flex items-center ${language === "ar" ? "justify-end" : ""}`}>
                    <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                      <RadioGroupItem value="bank" id="bank" className={language === "ar" ? "ml-2" : "mr-2"} />
                      <Label 
                        htmlFor="bank" 
                        className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
                      >
                        <Banknote className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                        <span className={language === "ar" ? "text-right" : ""}>{t("donate.form.bank")}</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Donate Button */}
              <Button
                className="w-full h-14 text-lg bg-[#34a853] hover:bg-[#2d9249] text-white"
                onClick={handleDonate}
              >
                {t("donate.form.button")}
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