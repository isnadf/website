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

export default function ContactPage() {
  const { toast } = useToast()
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
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e7e34]/90 via-[#1e7e34]/80 to-black/90" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center rounded-lg bg-white/10 backdrop-blur-md px-3 py-1 text-sm text-white mb-6 border border-white/20">
              <Mail className="mr-1 h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white drop-shadow-lg font-sora">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
              Have questions about our programs or application process? Our team is here to help you navigate your educational journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white" />
                  <span className="text-white text-sm">+90 (539) 4300 726</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white" />
                  <span className="text-white text-sm">info@isnadf.org</span>
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
            <GSAPReveal animation="slide-right">
              <div>
                <div className="inline-flex items-center rounded-lg bg-[hsl(120,61%,34%)]/10 px-3 py-1 text-sm text-[hsl(120,61%,34%)]">
                  <Mail className="mr-1 h-4 w-4" />
                  Contact Information
                </div>
                <h2 className="mt-2 text-3xl font-bold tracking-tighter">Get in Touch</h2>
                <p className="mt-4 text-muted-foreground">
                  Whether you have questions about our programs, application process, or just want to learn more about
                  our foundation, we're here to help. Reach out to us using any of the methods below.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(120,61%,34%)]/10">
                      <MapPin className="h-5 w-5 text-[hsl(120,61%,34%)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Our Location</h3>
                      <p className="mt-1 text-muted-foreground">
                        Kayabaşı Mah. Adnan Menderes Blv. A4 Blok No:7A Kapı No:11 Başakşehir/İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(0,76%,40%)]/10">
                      <Mail className="h-5 w-5 text-[hsl(0,76%,40%)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Email Us</h3>
                      <p className="mt-1 text-muted-foreground">
                      info@isnadf.org
                      </p>
                      <p className="mt-1 text-muted-foreground">
                      Palestinian.pssf@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                      <Phone className="h-5 w-5 text-black dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Call Us</h3>
                      <p className="mt-1 text-muted-foreground">
                      +90 5394300726
                      <br />
                        Monday-Friday, 9:00 AM - 5:00 PM (GMT+3)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium">Follow Us</h3>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="#"
                      className="rounded-full bg-[hsl(120,61%,34%)]/10 p-2 text-[hsl(120,61%,34%)] transition-colors hover:bg-[hsl(120,61%,34%)]/20"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="rounded-full bg-[hsl(0,76%,40%)]/10 p-2 text-[hsl(0,76%,40%)] transition-colors hover:bg-[hsl(0,76%,40%)]/20"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href="#"
                      className="rounded-full bg-black/10 dark:bg-white/10 p-2 text-black dark:text-white transition-colors hover:bg-black/20 dark:hover:bg-white/20"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-left">
              <div className="rounded-lg border border-[hsl(0,76%,40%)]/20 bg-card p-6 shadow-sm">
                <div className="inline-flex items-center rounded-lg bg-[hsl(0,76%,40%)]/10 px-3 py-1 text-sm text-[hsl(0,76%,40%)]">
                  <Send className="mr-1 h-4 w-4" />
                  Message Form
                </div>
                <h3 className="mt-2 text-2xl font-bold">Send Us a Message</h3>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[hsl(120,61%,34%)] text-white hover:bg-[hsl(120,61%,34%)]/90 dark:bg-[hsl(120,61%,34%)] dark:text-white dark:hover:bg-[hsl(120,61%,34%)]/90"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
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
                  <MapPin className="mr-1 h-4 w-4" />
                  Our Location
                </div>
                <h2 className="mt-2 text-3xl font-bold">Find Us</h2>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[hsl(120,61%,34%)]/20 shadow-sm h-[450px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.9848269944!2d28.774727!3d41.118961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA3JzA4LjMiTiAyOMKwNDYnMjkuMCJF!5e0!3m2!1sen!2str!4v1718193600000!5m2!1sen!2str"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Our location - Kayabaşı Mah. Adnan Menderes Blv. A4 Blok No:7A Kapı No:11 Başakşehir/İstanbul"
                ></iframe>
                <a
                  href="https://www.google.com/maps/place/Kayabaşı+Mah.+Adnan+Menderes+Blv.+A4+Blok+No:7A+Kapı+No:11+Başakşehir/İstanbul/@41.118961,28.774727,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!2zNDHCsDA3JzA4LjMiTiAyOMKwNDYnMjkuMCJF!8m2!3d41.118961!4d28.774727!16s%2Fg%2F11t8z0z0z0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer"
                  aria-label="Open location in Google Maps"
                />
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </main>
  )
}

