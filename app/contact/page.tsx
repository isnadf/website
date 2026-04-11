"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import GSAPReveal from "@/components/gsap-reveal"
import { useLanguage } from "@/components/language-provider"
import { SocialBrandIcon } from "@/components/social-brand-icon"
import Image from "next/image"

export default function ContactPage() {
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize progress bar
    const progressBar = document.querySelector(".progress-bar")
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    toast({
      title: language === 'ar' ? "تم إرسال الرسالة" : "Message Sent",
      description: language === 'ar' ? "شكراً لرسالتك. سنتواصل معك قريباً." : "Thank you for your message. We'll get back to you soon.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="flex min-h-screen flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contactUS/new-contactus.jpeg"
            alt={t("contact.title") as string}
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center rounded-lg bg-white/10 backdrop-blur-md px-3 py-1 text-sm text-white mb-6 border border-white/20">
              <Mail className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
              {t("contact.getInTouch") as string}
            </div>
            <h1 className={`text-4xl font-bold sm:text-5xl md:text-6xl text-white drop-shadow-lg font-sora text-center flex justify-center`}>
              <span>{t("contact.title") as string}</span>
            </h1>
            <p className={`mt-6 text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto`}>
              {t("contact.subtitle") as string}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <Phone className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 text-white`} />
                  <span className="text-white text-sm" dir="ltr">{t("contact.phone") as string}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <Mail className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4 text-white`} />
                  <span className="text-white text-sm">{t("contact.email") as string}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[hsl(0,76%,40%)]/5 via-transparent to-[hsl(120,61%,34%)]/5 dark:from-[hsl(0,76%,40%)]/10 dark:via-black/80 dark:to-[hsl(120,61%,34%)]/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <GSAPReveal animation={isRTL ? "slide-left" : "slide-right"}>
              <div>
                <div className="inline-flex items-center rounded-lg bg-[hsl(120,61%,34%)]/10 px-3 py-1 text-sm text-[hsl(120,61%,34%)]">
                  <Mail className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                  {t("contact.info.title") as string}
                </div>
                <h2 className={`mt-2 text-3xl font-bold tracking-tighter`}>
                  {t("contact.getInTouch") as string}
                </h2>
                <p className={`mt-4 text-muted-foreground`}>
                  {t("contact.info.subtitle") as string}
                </p>
                <p className={`mt-4 text-muted-foreground`}>
                  {t("contact.info.subtitle3") as string}
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start">
                    <div className={`${isRTL ? 'ml-4' : 'mr-4'} flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(120,61%,34%)]/10`}>
                      <MapPin className="h-5 w-5 text-[hsl(120,61%,34%)]" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium`}>
                        {t("contact.location.title") as string}
                      </h3>
                      <p className={`mt-1 text-muted-foreground`}>  
                        {t("contact.location.address") as string}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className={`${isRTL ? 'ml-4' : 'mr-4'} flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(0,76%,40%)]/10`}>
                      <Mail className="h-5 w-5 text-[hsl(0,76%,40%)]" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium`}>
                        {t("contact.email.title") as string}
                      </h3>
                      <p className={`mt-1 text-muted-foreground`}>
                        {t("contact.email") as string}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className={`${isRTL ? 'ml-4' : 'mr-4'} flex h-10 w-10 items-center justify-center rounded-full bg-black/10 dark:bg-white/10`}>
                      <Phone className="h-5 w-5 text-black dark:text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium`}>
                        {t("contact.phone.title") as string}
                      </h3>
                      <p className={`mt-1 text-muted-foreground`}>
                        <span dir="ltr">{t("contact.phone") as string}</span>
                        <br />
                        {t("contact.phone.hours") as string}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className={`text-lg font-medium`}>
                    {t("contact.follow.title") as string}
                  </h3>
                  <div className="mt-4 flex gap-4">
                    <a
                      href="https://www.facebook.com/Palestian.studentsFund"
                      className="inline-flex transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                      aria-label="Facebook"
                    >
                      <SocialBrandIcon platform="facebook" className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://x.com/IsnadFoundation"
                      className="inline-flex transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                      aria-label="X"
                    >
                      <SocialBrandIcon platform="x" className="h-4.5 w-4.5" />
                      <span className="sr-only">X</span>
                    </a>
                    <a
                      href="https://www.instagram.com/isnadfoundation.ps?igsh=dzI5YnBpam1ubHRl"
                      className="inline-flex transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"
                      aria-label="Instagram"
                    >
                      <SocialBrandIcon platform="instagram" className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </GSAPReveal>

            <GSAPReveal animation={isRTL ? "slide-right" : "slide-left"}>
              <div className="rounded-lg border border-[hsl(0,76%,40%)]/20 bg-card p-6 shadow-sm">
                <div className="inline-flex items-center rounded-lg bg-[hsl(0,76%,40%)]/10 px-3 py-1 text-sm text-[hsl(0,76%,40%)]">
                  <Send className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                  {t("contact.form.title") as string}
                </div>
                <h3 className={`mt-2 text-2xl font-bold`}>
                  {t("contact.form.title") as string}
                </h3>
                <p className={`mt-2 text-muted-foreground`}>
                  {t("contact.form.subtitle") as string}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={isRTL ? 'text-right' : ''}>{t("contact.form.name") as string}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name.placeholder") as string}
                      required
                      className={isRTL ? 'text-right' : ''}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className={isRTL ? 'text-right' : ''}>{t("contact.form.email") as string}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email.placeholder") as string}
                      required
                      className={isRTL ? 'text-right' : ''}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className={isRTL ? 'text-right' : ''}>{t("contact.form.subject") as string}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subject.placeholder") as string}
                      required
                      className={isRTL ? 'text-right' : ''}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className={isRTL ? 'text-right' : ''}>{t("contact.form.message") as string}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.message.placeholder") as string}
                      rows={5}
                      required
                      className={isRTL ? 'text-right' : ''}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[hsl(120,61%,34%)] text-white hover:bg-[hsl(120,61%,34%)]/90 dark:bg-[hsl(120,61%,34%)] dark:text-white dark:hover:bg-[hsl(120,61%,34%)]/90"
                  >
                    {t("contact.form.submit") as string}
                    <Send className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                  </Button>
                </form>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[hsl(0,76%,40%)]/5 via-transparent to-[hsl(120,61%,34%)]/5 dark:from-[hsl(0,76%,40%)]/10 dark:via-black/80 dark:to-[hsl(120,61%,34%)]/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <GSAPReveal animation="slide-up">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center rounded-lg bg-[hsl(120,61%,34%)]/10 px-3 py-1 text-sm text-[hsl(120,61%,34%)]">
                  <MapPin className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                  {t("contact.map.title") as string}
                </div>
                <h2 className={`mt-2 text-3xl font-bold`}>
                  {t("contact.map.title") as string}
                </h2>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[hsl(120,61%,34%)]/20 shadow-sm h-[450px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d658.780531356402!2d29.21284671786046!3d40.93622722514771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caaf131ed23bbf%3A0x704d637dafc4692c!2sIsnad%20Foundation!5e0!3m2!1sen!2s!4v1753733019353!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("contact.location.address") as string}
                ></iframe>
                <a
                  href="https://www.google.com/maps/place/Isnad+Foundation/@40.9362272,29.2128467,17z/data=!3m1!4b1!4m6!3m5!1s0x14caaf131ed23bbf:0x704d637dafc4692c!2sIsnad+Foundation!8m2!3d40.9362272!4d29.2128467!16s%2Fg%2F11t8z0z0z0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer"
                  aria-label={t("contact.map.title") as string}
                />
              </div>
            </GSAPReveal>

            {/* Office Images Gallery */}
            <GSAPReveal animation="slide-up">
              <div className="mt-16">
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center rounded-lg bg-[hsl(120,61%,34%)]/10 px-3 py-1 text-sm text-[hsl(120,61%,34%)]">
                    <MapPin className={`${isRTL ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                    {t("contact.office.title") as string}
                  </div>
                  <h2 className={`mt-2 text-3xl font-bold`}>
                    {t("contact.office.title") as string}
                  </h2>
                  <p className={`mt-4 text-muted-foreground max-w-2xl mx-auto`}>
                    {t("contact.office.subtitle") as string}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[hsl(120,61%,34%)]/20">
                    <Image
                      src="/office/1.jpeg"
                      alt={t("contact.office.entrance") as string}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[hsl(120,61%,34%)]/20">
                    <Image
                      src="/office/2.jpeg"
                      alt={t("contact.office.workspace") as string}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[hsl(120,61%,34%)]/20">
                    <Image
                      src="/office/3.jpeg"
                      alt={t("contact.office.meeting") as string}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
