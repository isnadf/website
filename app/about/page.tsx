"use client"

import Link from "next/link"
import { Users, ArrowRight, GraduationCap, Globe, Award, Lightbulb, Handshake as HandshakeIcon, Target, Compass, Rocket } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function AboutPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  const partners = [
    { name: "Milli Gençlik Vakfı", logo: "/partners/p1.png" },
    { name: "YediHilal", logo: "/partners/p2.png" },
    { name: "Hüdayi Vakfı", logo: "/partners/p3.jpeg" },
    { name: "Khidhumaiy", logo: "/partners/p4.jpg" }
  ]

  const specialPartner = { name: "Cinta Gaza Malaysia", logo: "/partners/p6.svg" }

  return (
    <main className="flex min-h-screen flex-col" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/aboutCover/1.png"
            alt="Hero Cover"
            className="h-full w-full object-contain object-center"
            width={1920}
            height={1080}
          />
        </div>
        {/* Page Indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className={`text-white text-xs sm:text-sm font-medium ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.page.indicator") as string}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
              <Compass className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
              {t("about.purpose.badge") as string}
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("about.purpose.title") as string}
            </h2>
            <p className={`mx-auto mt-4 max-w-[700px] text-muted-foreground ${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
              {t("about.purpose.subtitle") as string}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            {/* Mission Card */}
            <div className="relative overflow-hidden rounded-xl border border-[#1e7e34]/20 bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-[#1e7e34]/10"></div>

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e7e34]/10">
                  <Target className="h-8 w-8 text-[#1e7e34]" />
                </div>

                <h3 className="text-2xl font-bold">{t("about.mission.title") as string}</h3>

                <div className="mt-4 space-y-4">
                  <p className="text-muted-foreground">{t("about.mission.text") as string}</p>

                  {/* <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-[#1e7e34]/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#1e7e34]"></div>
                      </div>
                      <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.mission.point1") as string}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-[#1e7e34]/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#1e7e34]"></div>
                      </div>
                      <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.mission.point2") as string}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-[#1e7e34]/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#1e7e34]"></div>
                      </div>
                      <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.mission.point3") as string}</span>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative overflow-hidden rounded-xl border border-[#1e7e34]/20 bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-[#1e7e34]/10"></div>

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e7e34]/10">
                  <Rocket className="h-8 w-8 text-[#1e7e34]" />
                </div>

                <h3 className="text-2xl font-bold">{t("about.vision.title") as string}</h3>

                <div className="mt-4 space-y-4">
                  <p className="text-muted-foreground">{t("about.vision.text") as string}</p>

                  {/* <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-[#1e7e34]/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#1e7e34]"></div>
                      </div>
                      <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.vision.point1") as string}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-[#1e7e34]/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#1e7e34]"></div>
                      </div>
                      <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.vision.point2") as string}</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-[#1e7e34]/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#1e7e34]"></div>
                      </div>
                      <span className={`${language === 'ar' ? 'tracking-wide' : ''}`} style={language === 'ar' ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>{t("about.vision.point3") as string}</span>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
             <div className="container px-4 md:px-6">
               <div className="flex flex-col items-center justify-center space-y-4 text-center">
                 <div className="space-y-2">
                   <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
                     <Users className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                     {t("about.widgt") as string}
                   </div>
                   <h2 className="text-3xl font-bold sm:text-5xl">
                     {t("about.title") as string}
                   </h2>
                   <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     {t("about.subtitle") as string}
                   </p>
                 </div>

                 <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                   <div className="flex flex-col justify-center space-y-4 h-full order-2 lg:order-1">
                     <ul className="grid gap-6 flex-1">
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <GraduationCap className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <Target className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity2") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity2.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <Globe className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity3") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity3.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <Award className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity4") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity4.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                     </ul>
                   </div>

                   <div className="flex flex-col justify-center space-y-4 h-full order-1 lg:order-2">
                     <ul className="grid gap-6 flex-1">
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <Lightbulb className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity5") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity5.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <HandshakeIcon className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity6") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity6.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="flex gap-4 items-start">
                           <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-[#1e7e34]/10 flex items-center justify-center ${language === 'ar' ? 'order-2' : 'order-1'}`}>
                             <Users className="h-6 w-6 text-[#1e7e34]" />
                           </div>
                           <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                             <h3 className="text-xl font-bold">{t("about.identity7") as string}</h3>
                             <p className="text-muted-foreground">{t("about.identity7.desc") as string}</p>
                           </div>
                         </div>
                       </li>
                     </ul>
                   </div>
                 </div>
                 <div className="flex justify-center w-full mt-8">
              {/* <Link href="/about">
                <Button
                  className="group bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90 dark:bg-[#1e7e34] dark:text-white dark:hover:bg-[#1e7e34]/90"
                >
                  {t("about.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Structure */}
      {/* <section className="py-16 md:py-24 bg-[#f8faf8] dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34]">
                <Users className="mr-1 h-4 w-4" />
                {t("about.team.tag")}
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl">
                {t("about.team.title")}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src="/s5.jpg?height=128&width=128"
                    alt={t("about.team.member1.name")}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{t("about.team.member1.name")}</h3>
                <p className="text-[#1e7e34]">{t("about.team.member1.title")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("about.team.member1.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src="/s5.jpg?height=128&width=128"
                    alt={t("about.team.member2.name")}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{t("about.team.member2.name")}</h3>
                <p className="text-[#1e7e34]">{t("about.team.member2.title")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("about.team.member2.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src="/s5.jpg?height=128&width=128"
                    alt={t("about.team.member3.name")}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{t("about.team.member3.name")}</h3>
                <p className="text-[#1e7e34]">{t("about.team.member3.title")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("about.team.member3.description")}
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/about/team">
                <Button
                  className="bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90 dark:bg-[#1e7e34] dark:text-white dark:hover:bg-[#1e7e34]/90"
                >
                  {t("about.team.viewAll")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Partners */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className={`inline-flex items-center rounded-lg bg-[#1e7e34]/10 px-3 py-1 text-sm text-[#1e7e34] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <HandshakeIcon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t("about.partners.badge") as string}
              </div>
              <h2 className={`text-3xl font-bold sm:text-5xl text-black dark:text-white pt-4 ${isRTL ? 'tracking-wide' : ''}`} style={isRTL ? { wordSpacing: '0.2em', letterSpacing: '0.02em' } : {}}>
                {t("about.partners.title") as string}
              </h2>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {partners.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center text-center gap-3">
                  <div className="flex items-center justify-center h-24 w-32">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
                      width={200}
                      height={128}
                      sizes="(min-width: 1024px) 18vw, 50vw"
                    />
                  </div>
                  <p className="font-medium text-black dark:text-white text-sm md:text-base">
                    {partner.name}
                  </p>
                </div>
              ))}

              <div className="flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-center h-24 w-32">
                  <Image
                    src={specialPartner.logo}
                    alt={specialPartner.name}
                    className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    width={160}
                    height={160}
                    sizes="(min-width: 1024px) 18vw, 50vw"
                  />
                </div>
                <p className="font-medium text-black dark:text-white text-sm md:text-base">
                  {specialPartner.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-[#f8faf8]/70"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e7e34]/30 via-[#1e7e34]/80 to-[#1e7e34]/30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1e7e34]/5 rounded-full"></div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white relative z-10">
              {t("about.cta.title") as string}
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 relative z-10">
              {t("about.cta.subtitle") as string}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center relative z-10">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#1e7e34] text-white hover:bg-[#1e7e34]/90 dark:bg-[#1e7e34] dark:text-white dark:hover:bg-[#1e7e34]/90"
                >
                  {t("about.cta.contact") as string}
                  <ArrowRight className={`${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4 transition-transform group-hover:translate-x-1`} />
                </Button>
              </Link>
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-white text-[#1e7e34] border-2 border-[#1e7e34] hover:bg-[#1e7e34] hover:text-white dark:bg-gray-900 dark:text-[#1e7e34] dark:border-[#1e7e34] dark:hover:bg-[#1e7e34] dark:hover:text-white"
                >
                  {t("about.cta.support") as string}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

