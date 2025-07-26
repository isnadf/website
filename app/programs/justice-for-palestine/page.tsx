"use client"

import {
  Scale,
  Globe,
  Shield,
  Flag,
  GraduationCap,
  Award,
  Mail,
  Phone,
  Gavel,
  MessageSquare,
  UserPlus,
  Sword,
  BookOpen,
  Users,
  Download,
  ChevronDown,
  Lightbulb,
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function JusticeForPalestinePage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Palestinian Flag-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-red-600/10 via-white/10 to-black/10 dark:from-red-900/20 dark:via-gray-900/20 dark:to-green-800/20 shadow-lg border-b-4 border-red-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-black rounded-full flex items-center justify-center shadow-xl">
              <Scale size={48} className="text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Flag size={16} className="text-red-500 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Gavel size={16} className="text-black animate-pulse" />
            </div>
          </div>
          <GSAPTextReveal className={`text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent font-sora drop-shadow-lg pt-5 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.title")}
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className={`text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400 mt-2 h-10 ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.subtitle")}
          </GSAPTextReveal>
          <p className={`mt-4 text-lg md:text-xl text-black dark:text-red-300 font-medium max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.tagline")}
          </p>
        </div>
        <div className={`flex justify-center gap-8 mt-8 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <StatsCounter number={200} label={t("justice.scholarships") as string} />
          <StatsCounter number={2} label={t("justice.fields") as string} />
          <StatsCounter number={5} label={t("justice.years") as string} />
        </div>
        <div className="max-w-4xl mx-auto mt-8 px-4">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-flex items-center gap-2 text-2xl font-bold text-red-700 mb-2">
              <Lightbulb className="text-yellow-400" size={28} />
              {isRTL ? 'حول البرنامج' : 'About the Program'}
            </span>
            <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-black mb-6 rounded-full"></div>
          </div>
          <div className={`text-gray-800 dark:text-gray-100 text-lg md:text-xl text-center font-medium ${isRTL ? 'font-arabic' : ''}`}
            style={{lineHeight: 1.7, letterSpacing: isRTL ? '0.01em' : '0.02em'}}>
            {isRTL ? (
              <>برنامج منحة العدالة لفلسطين هو مبادرة وطنية استراتيجية أطلقتها مؤسسة إسناد لدعم الطالب الفلسطيني (IFPSS) لتأهيل كفاءات فلسطينية متميزة في العلوم السياسية، العلاقات الدولية، والقانون الدولي، ويقدم 200 منحة دراسية ممولة بالكامل لطلبة الماجستير والدكتوراه من فلسطين والشتات للدراسة في جامعات فلسطينية أو عربية أو دولية مرموقة، بهدف تمكين الباحثين الفلسطينيين من التأثير الفاعل في الساحة السياسية والدبلوماسية الدولية والمساهمة في تطوير السياسات العامة والقانونية المتعلقة بالقضية الفلسطينية.</>
            ) : (
              <>The Justice for Palestine Scholarship is a national strategic initiative by the Isnad Foundation (IFPSS) to empower outstanding Palestinian talents in political science, international relations, and international law. The program offers 200 fully funded scholarships for master's and doctoral students from Palestine and the diaspora to study at leading Palestinian, Arab, or international universities, aiming to enable Palestinian researchers to have a real impact in the political and diplomatic arena and contribute to the development of public and legal policies related to the Palestinian cause.</>
            )}
          </div>
          <div className={`flex justify-center mt-6 gap-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full shadow-xl hover:from-black hover:to-red-600 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
              <Scale size={22} className={`${isRTL ? 'order-2' : '-ml-1'} animate-pulse`} /> {t("justice.apply")}
            </a>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Program Downloads Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="border-red-700 text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold bg-transparent group"
                  >
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    {isRTL ? 'تحميل البرنامج' : 'Download Program'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-red-200 dark:border-red-800">
                  <DropdownMenuItem asChild>
                    <a href="/ProgramsFiles/JusticeForPalestine-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                      <Download className="h-4 w-4" />
                      English (EN)
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/ProgramsFiles/JusticeForPalestine-AR.pdf" download className="flex items-center gap-2 cursor-pointer">
                      <Download className="h-4 w-4" />
                      العربية (AR)
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Brochure Downloads Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="border-blue-700 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold bg-transparent group"
                  >
                    <BookOpen className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    {isRTL ? 'تحميل البروشور' : 'Download Brochure'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-blue-200 dark:border-blue-800">
                  <DropdownMenuItem asChild>
                    <a href="/ProgramsFiles/JusticeForPalestine-brochure-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                      <Download className="h-4 w-4" />
                      English (EN)
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/ProgramsFiles/JusticeForPalestine-brochure.pdf" download className="flex items-center gap-2 cursor-pointer">
                      <Download className="h-4 w-4" />
                      العربية (AR)
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-red-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.mission.title")}</GSAPTextReveal>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className={`text-lg text-gray-800 dark:text-gray-100 font-medium mb-4 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>
              {t("justice.mission.desc")}
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <GSAPReveal animation="scale"><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Globe className="text-red-700 mb-3" size={40} />
              <h3 className={`text-xl font-bold text-red-800 dark:text-red-300 mb-2 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.international.title")}</h3>
              <p className={`text-center text-gray-700 dark:text-gray-200 text-base tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.international.desc")}</p>
            </div></GSAPReveal>
            <GSAPReveal animation="scale" delay={0.1}><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Shield className="text-blue-700 mb-3" size={40} />
              <h3 className={`text-xl font-bold text-blue-800 dark:text-blue-300 mb-2 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.political.title")}</h3>
              <p className={`text-center text-gray-700 dark:text-gray-200 text-base tracking-wide ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.political.desc")}</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Why this Program Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-red-700 h-40 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'لماذا برنامج منحة العدالة لفلسطين؟' : 'Why the Justice for Palestine Scholarship?'}</GSAPTextReveal>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch`}>
            <GSAPReveal animation="slide-up">
              <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
                <Flag className="text-red-600 mb-4" size={38} />
                <h3 className={`text-lg font-bold text-center text-red-800 dark:text-red-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'ضعف التمثيل الفلسطيني في المحافل الدولية' : 'Weak Palestinian representation in international forums'}</h3>
                <p className={`text-gray-900 dark:text-gray-200 text-sm text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تعاني القضية الفلسطينية من ضعف التمثيل في المحافل الدولية، مما يحد من إيصال صوت الشعب الفلسطيني إلى العالم.' : 'The Palestinian cause suffers from weak representation in international forums, limiting the ability to convey the voice of the Palestinian people to the world.'}</p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
                <Gavel className="text-blue-700 mb-4" size={38} />
                <h3 className={`text-lg font-bold text-center text-red-800 dark:text-red-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'غياب الكوادر المتخصصة في العلوم السياسية والعلاقات الدولية' : 'Lack of specialized cadres in political science and international relations'}</h3>
                <p className={`text-gray-900 dark:text-gray-200 text-sm text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'يواجه المجتمع الفلسطيني نقصاً في الكفاءات المتخصصة في مجالات العلوم السياسية والدبلوماسية والعلاقات الدولية.' : 'The Palestinian community faces a shortage of specialists in political science, diplomacy, and international relations.'}</p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
                <Award className="text-yellow-600 mb-4" size={38} />
                <h3 className={`text-lg font-bold text-center text-red-800 dark:text-red-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تدني الاستثمار في التعليم السياسي والدبلوماسي' : 'Low investment in political and diplomatic education'}</h3>
                <p className={`text-gray-900 dark:text-gray-200 text-sm text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'لا تحظى التخصصات السياسية والدبلوماسية بالاستثمار الكافي مقارنة بالتخصصات الأخرى، مما يضعف من حضور الكفاءات الفلسطينية في هذا المجال.' : 'Political and diplomatic specializations do not receive sufficient investment compared to other fields, weakening Palestinian presence in this area.'}</p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
                <BookOpen className="text-green-700 mb-4" size={38} />
                <h3 className={`text-lg font-bold text-center text-red-800 dark:text-red-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'ضعف الارتباط بين المخرج الأكاديمي والإعلام والدعوة' : 'Weak links between academic output and media/advocacy'}</h3>
                <p className={`text-gray-900 dark:text-gray-200 text-sm text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'هناك فجوة بين مخرجات التعليم الأكاديمي في العلوم السياسية والعلاقات الدولية وبين العمل الإعلامي والدعوي.' : 'There is a gap between academic output in political science/international relations and work in media and advocacy.'}</p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
                <Globe className="text-blue-600 mb-4" size={38} />
                <h3 className={`text-lg font-bold text-center text-red-800 dark:text-red-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'غياب برامج وطنية للدعوة الدولية' : 'Lack of national programs for international advocacy'}</h3>
                <p className={`text-gray-900 dark:text-gray-200 text-sm text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تفتقر فلسطين إلى برامج وطنية متخصصة في إعداد كفاءات للدعوة الدولية والدبلوماسية.' : 'Palestine lacks national programs specialized in preparing cadres for international advocacy and diplomacy.'}</p>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.5}>
              <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
                <Shield className="text-red-700 mb-4" size={38} />
                <h3 className={`text-lg font-bold text-center text-red-800 dark:text-red-300 mb-2 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تحديات إقليمية وعالمية تواجه القضية الفلسطينية' : 'Regional and global challenges facing the Palestinian cause'}</h3>
                <p className={`text-gray-900 dark:text-gray-200 text-sm text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تواجه القضية الفلسطينية تحديات إقليمية ودولية تتطلب كفاءات قادرة على التعامل مع الإعلام والمؤسسات الدولية.' : 'The Palestinian cause faces regional and international challenges that require cadres capable of dealing with media and international institutions.'}</p>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Financial Support Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-red-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'الدعم المالي' : 'Financial Support'}</GSAPTextReveal>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center`}>
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[180px] justify-center">
              <Award className="text-red-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-red-800 dark:text-red-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'مقاعد دراسية' : 'Annual Tuition Fees'}</h3>
              <p className={`text-gray-700 dark:text-gray-200 text-base ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تغطي المنحة الرسوم الجامعية السنوية بمتوسط 3,000 دولار أمريكي لكل طالب.' : 'The scholarship covers annual tuition fees, averaging $3,000 per student.'}</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[180px] justify-center">
              <Award className="text-red-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-red-800 dark:text-red-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'منحة شهرية' : 'Monthly Stipend'}</h3>
              <p className={`text-gray-700 dark:text-gray-200 text-base ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'يحصل الطالب على منحة شهرية بمتوسط 200 دولار أمريكي (بمجموع 2,400 دولار سنوياً).' : 'Students receive a monthly stipend averaging $200 (totaling $2,400 per year).'}</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[180px] justify-center">
              <Award className="text-red-700 mb-2" size={32} />
              <h3 className={`text-lg font-bold text-red-800 dark:text-red-300 mb-1 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'دعم السكن' : 'Housing Support'}</h3>
              <p className={`text-gray-700 dark:text-gray-200 text-base ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'توفر المنحة دعماً سنوياً للسكن بمتوسط 2,400 دولار أمريكي للطالب عند الحاجة.' : 'The scholarship provides annual housing support averaging $2,400 per student if needed.'}</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="text-4xl font-bold px-6 py-2 text-red-800  rounded-xl">{isRTL ? 'أهدافنا' : 'Our Objectives'}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
              <Award className="text-red-600 mb-4" size={40} />
              <p className={`text-lg text-gray-900 dark:text-gray-100 font-semibold text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تقديم 200 منحة دراسية للطلبة الفلسطينيين المتفوقين في مجالات السياسة والعلاقات الدولية والقانون الدولي.' : 'Provide 200 scholarships for outstanding Palestinian students in political science, international relations, and international law.'}</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
              <Users className="text-blue-700 mb-4" size={40} />
              <p className={`text-lg text-gray-900 dark:text-gray-100 font-semibold text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'بناء كوادر علمية متخصصة تدعم التمثيل الفلسطيني، وتساهم في الدفاع عن الحقوق الوطنية في المحافل العالمية.' : 'Build specialized academic cadres to support Palestinian representation and contribute to defending national rights in global forums.'}</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 via-white to-blue-100 dark:from-red-900 dark:via-gray-900 dark:to-blue-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center h-full transition-transform hover:scale-105">
              <BookOpen className="text-green-700 mb-4" size={40} />
              <p className={`text-lg text-gray-900 dark:text-gray-100 font-semibold text-center ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'تعزيز إنتاج المعرفة السياسية والقانونية الفلسطينية وربطها بصناعة القرار الدولي.' : 'Promote the production of Palestinian political and legal knowledge and link it to international decision-making.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className={`text-3xl md:text-4xl font-bold text-center text-red-700 mb-10 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.title")}</GSAPTextReveal>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Gavel className="text-red-700 mb-4" size={48} />
              <h3 className={`text-xl font-bold text-center text-red-800 dark:text-red-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.political.title")}</h3>
              <p className={`text-gray-600 dark:text-gray-300 text-sm text-center mb-4 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                {t("justice.fields.political.desc")}
              </p>
              <div className={`space-y-2 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                {(t("justice.fields.political.points") as string[]).map((point, index) => (
                  <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <div className={`w-2 h-2 bg-red-500 rounded-full ${isRTL ? 'order-2' : ''}`}></div>
                    <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic text-right' : ''}`}>{point}</span>
                  </div>
                ))}
              </div>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Globe className="text-blue-700 mb-4" size={48} />
              <h3 className={`text-xl font-bold text-center text-blue-800 dark:text-blue-300 mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t("justice.fields.international.title")}</h3>
              <p className={`text-gray-600 dark:text-gray-300 text-sm text-center mb-4 tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                {t("justice.fields.international.desc")}
              </p>
              <div className={`space-y-2 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                {(t("justice.fields.international.points") as string[]).map((point, index) => (
                  <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    <div className={`w-2 h-2 bg-blue-500 rounded-full ${isRTL ? 'order-2' : ''}`}></div>
                    <span className={`text-gray-600 dark:text-gray-300 ${isRTL ? 'font-arabic text-right' : ''}`}>{point}</span>
                  </div>
                ))}
              </div>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">{t("justice.requirements.title")}</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Flag className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.nationality")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.degree")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Award className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.gpa")}</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <MessageSquare className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">{t("justice.requirements.interest")}</h3>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-red-100/40 via-white to-black/40 dark:from-red-900/30 dark:via-black dark:to-green-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className={`text-xl font-bold text-red-800 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.contact.title")}
          </GSAPTextReveal>
          <p className={`text-gray-700 dark:text-gray-200 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t("justice.contact.description")}
          </p>
          <div className={`flex flex-col md:flex-row justify-center items-center gap-4 text-lg ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <a href="mailto:info@isnadf.org" className={`flex items-center gap-2 text-red-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Mail className="text-red-700" size={22} /> info@isnadf.org
            </a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className={`flex items-center gap-2 text-red-700 hover:underline ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
              <Phone className="text-red-700" size={22} /> <span dir="ltr">+90 539 430 07 26</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
