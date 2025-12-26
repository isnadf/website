"use client"
import HexagonTwo from "@/components/HexagonTwo"
import { useLanguage } from "@/components/language-provider"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { Target, Rocket } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <main className="flex min-h-screen flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
              {/* Left: Video Component */}
              <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} w-full flex justify-center lg:justify-start`}>
                <div className="w-full max-w-xl lg:max-w-2xl">
                  <HexagonTwo />
                </div>
              </div>

              {/* Right: Our Story Content */}
              <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} w-full flex justify-center lg:justify-start`}>
                <div 
                  className="w-full max-w-xl lg:max-w-2xl"
                  style={{
                    aspectRatio: '1213/667'
                  }}
                >
                  <div className="h-full flex flex-col justify-start space-y-2.5 md:space-y-3">
                    {/* Tag */}
                    <div>
                      <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-blue-400">
                        {t("about.foundation.tag") as string}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {t("about.foundation.title") as string}
                    </h1>

                    {/* Content Paragraphs */}
                    <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                      <p>
                        <strong>{t("about.foundation.text1") as string}</strong>
                      </p>
                      <p>
                        {t("about.foundation.text2") as string}
                      </p>
                      <p>
                        {t("about.foundation.text3") as string}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900 dark:text-white">
                {t("about.purpose.title") as string}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission Card */}
              <CardContainer className="w-full" containerClassName="py-0">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-8 border">
                  <CardItem
                    translateZ="50"
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10"
                  >
                    <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </CardItem>
                  <CardItem
                    translateZ="70"
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {t("about.mission.title") as string}
                  </CardItem>

                  <CardItem
                    translateZ="80"
                    className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                  >
                    {t("about.mission.text") as string}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src="/aboutus-new-desgin/our-mission.webp"
                      alt="Mission"
                      height={1000}
                      width={1000}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>

              {/* Vision Card */}
              <CardContainer className="w-full" containerClassName="py-0">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-8 border">
                  <CardItem
                    translateZ="50"
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10"
                  >
                    <Rocket className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </CardItem>
                  <CardItem
                    translateZ="70"
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  >
                    {t("about.vision.title") as string}
                  </CardItem>

                  <CardItem
                    translateZ="80"
                    className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                  >
                    {t("about.vision.text") as string}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src="/aboutus-new-desgin/our-vision.webp"
                      alt="Vision"
                      height={1000}
                      width={1000}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className={`text-lg md:text-xl lg:text-2xl font-semibold uppercase tracking-wider text-green-600 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                {t("about.values.badge") as string}
              </div>
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>
                {t("about.title") as string}
              </h2>
            </div>

            {/* First Row: 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Value 1 */}
              <div className={`${isRTL ? 'md:order-3 text-right' : 'md:order-1 text-left'}`}>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("about.identity") as string}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-base ${isRTL ? 'font-arabic' : ''}`}>
                  {t("about.identity.desc") as string}
                </p>
              </div>

              {/* Value 2 */}
              <div className={`${isRTL ? 'md:order-2 text-right' : 'md:order-2 text-left'}`}>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("about.identity2") as string}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-base ${isRTL ? 'font-arabic' : ''}`}>
                  {t("about.identity2.desc") as string}
                </p>
              </div>

              {/* Value 3 */}
              <div className={`${isRTL ? 'md:order-1 text-right' : 'md:order-3 text-left'}`}>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {t("about.identity3") as string}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-base ${isRTL ? 'font-arabic' : ''}`}>
                  {t("about.identity3.desc") as string}
                </p>
              </div>
            </div>

            {/* Second Row: 2 columns centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                {/* Value 4 */}
                <div className={`${isRTL ? 'md:order-2 text-right' : 'md:order-1 text-left'}`}>
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                    {t("about.identity4") as string}
                  </h3>
                  <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-base ${isRTL ? 'font-arabic' : ''}`}>
                    {t("about.identity4.desc") as string}
                  </p>
                </div>

                {/* Value 5 */}
                <div className={`${isRTL ? 'md:order-1 text-right' : 'md:order-2 text-left'}`}>
                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                    {t("about.identity5") as string}
                  </h3>
                  <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-base ${isRTL ? 'font-arabic' : ''}`}>
                    {t("about.identity5.desc") as string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t border-gray-400 dark:border-gray-600"></div>

      {/* Registration Footer Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <div className="flex-1 relative min-h-[120px] md:min-h-[140px]">
                {/* Opening Quote - Top Left for English, Top Right for Arabic */}
                <div className={`absolute ${isRTL ? 'top-0 right-0' : 'top-0 left-0'} ${isRTL ? 'scale-x-[-1]' : ''} z-0`}>
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 48 48" 
                    className="text-green-600 dark:text-green-400 md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
                    fill="currentColor"
                  >
                    <path d="m37,37c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.88-.52h-2c-.27,0-.54.11-.73.31-5.14,5.41-11.27,14.26-11.27,25.69,0,6.07,4.93,10.99,11,11h0Zm-26,0c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.87-.52h-2c-.27,0-.54.11-.73.31C6.13,5.72,0,14.57,0,26c0,6.07,4.93,10.99,11,11h0Zm0,0" />
                  </svg>
                </div>
                
                {/* Text with padding for quotes - centered */}
                <div className={`relative z-10 flex items-center justify-center min-h-full ${isRTL ? 'pr-12 pl-4 md:pr-16 md:pl-6' : 'pl-12 pr-4 md:pl-16 md:pr-6'} py-8 md:py-12`}>
                  <p className={`text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-relaxed text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("about.foundation.text3") as string}
                  </p>
                </div>
                
                {/* Closing Quote - Bottom Right for English, Bottom Left for Arabic */}
                <div className={`absolute ${isRTL ? 'bottom-0 left-0 scale-x-[-1]' : 'bottom-0 right-0'} z-0`}>
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 48 48" 
                    className="text-green-600 dark:text-green-400 scale-x-[-1] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
                    fill="currentColor"
                  >
                    <path d="m37,37c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.88-.52h-2c-.27,0-.54.11-.73.31-5.14,5.41-11.27,14.26-11.27,25.69,0,6.07,4.93,10.99,11,11h0Zm-26,0c6.07,0,11-4.93,11-11s-4.93-11-11-11c-.32,0-.63.02-.94.05.54-4.81,2.18-9.43,4.79-13.52.19-.31.2-.7.03-1.01-.18-.32-.51-.52-.87-.52h-2c-.27,0-.54.11-.73.31C6.13,5.72,0,14.57,0,26c0,6.07,4.93,10.99,11,11h0Zm0,0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

