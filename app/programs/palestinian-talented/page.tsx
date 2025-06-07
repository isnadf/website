"use client"

import {
  GraduationCap,
  Award,
  BookOpen,
  Lightbulb,
  Globe,
  Users,
  Calendar,
  CheckSquare,
  DollarSign,
  Briefcase,
  Target,
  UserPlus,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Shield,
  Brain,
  Eye,
  Building,
  Trophy,
  Crown,
  Sparkles,
  Wallet,
  Laptop
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"

export default function PalestinianTalentedScholarshipPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-yellow-50 via-blue-50 to-white dark:from-yellow-950 dark:via-blue-900 dark:to-black">
      {/* Excellence-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-yellow-600/10 dark:from-yellow-900/20 dark:via-blue-900/20 dark:to-yellow-800/20 shadow-lg border-b-4 border-yellow-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
              <Crown size={48} className="text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Sparkles size={16} className="text-yellow-500 animate-spin" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Trophy size={16} className="text-blue-500 animate-pulse" />
            </div>
          </div>
          <GSAPTextReveal className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent font-sora drop-shadow-lg">
            Palestinian Talented
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 mt-2">
            Excellence Scholarship Program
          </GSAPTextReveal>
          <p className="mt-4 text-lg md:text-xl text-yellow-800 dark:text-yellow-300 font-medium max-w-2xl mx-auto">
            🌟 Supporting Palestinian Talent: Our Collective Responsibility ⭐
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={1000} label="Scholarships" />
          <StatsCounter number={8} label="Support Areas" />
          <StatsCounter number={3} label="Financial Pillars" />
        </div>
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-50/90 to-blue-50/90 dark:bg-gradient-to-r dark:from-yellow-900/80 dark:to-blue-900/80 rounded-xl shadow-xl p-6 mt-4 border border-yellow-300">
          <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center justify-center gap-2">
            <Star className="text-yellow-500 animate-pulse" size={28} />
            <span>About the Excellence Program</span>
            <Star className="text-yellow-500 animate-pulse" size={28} />
          </h2>
          <p className="text-gray-800 dark:text-gray-100 text-base md:text-lg">
            The <span className="font-semibold text-yellow-800">"Palestinian Talented Student Scholarship Program"</span> is a national
            initiative launched by the Isnad Foundation, offering <span className="font-bold text-blue-700">1,000 scholarships</span> to outstanding students within Palestine across various
            academic fields. The program is designed to <span className="font-bold text-yellow-700">develop exceptional leaders</span> across different academic fields
            and enable youth to achieve their full potential and serve society.
          </p>
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-red-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl">
              <Award size={22} className="-ml-1 animate-pulse" /> Apply for Talented Scholarship
            </a>
            <div className="flex gap-3">
              <a href="/ProgramsFiles/Talented Excellence Scholarship Program-EN.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> Download Program (EN)
              </a>
              <a href="/ProgramsFiles/Talented Excellence Scholarship Program-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Palestinian Talent Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-blue-100/40 dark:from-green-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Why Support Palestinian Talent?</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Lack of Specialized Programs</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">There are no comprehensive national programs that support outstanding students and help them realize their potential in academic excellence and innovative projects.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <TrendingUp className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Deprivation of an Appropriate Educational Environment</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Due to the lack of educational infrastructure in Palestine, many students are unable to access the resources and tools they need for development and academic success.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Users className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Brain Drain and Early Talent Loss</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">The absence of early support mechanisms for exceptional students leads to the loss of many talented individuals who could have contributed to their communities.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Shield className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Lack of Talent Development Programs</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Gifted Palestinian students often lack access to specialized programs that can nurture their talents and help them develop their skills and contribute to society.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Eye className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Occupation Practices Negatively Affect Well-being and Educational Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">The ongoing occupation has a negative impact on the psychological and educational well-being of students. The constant stress and uncertainty make it difficult to focus on educational goals.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.5}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <DollarSign className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Challenging Economic Conditions Limit Access to Higher Education</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Financial constraints and challenging economic conditions prevent many Palestinian students from pursuing higher education and achieving their dreams.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.6}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Brain className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Outstanding Achievement is Difficult to Achieve Without Marginalized Support</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">To achieve outstanding results, students need comprehensive support that includes financial assistance, mentorship, and access to advanced educational resources.</p>
              </div>
            </GSAPReveal>

            <GSAPReveal animation="slide-up" delay={0.7}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[300px] justify-start hover:scale-105 transition-transform duration-300">
                <Building className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Limited Access to Quality Educational Infrastructure</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Many Palestinian students lack access to modern educational facilities, advanced laboratories, and cutting-edge technology that are essential for academic excellence and innovation.</p>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">Our Goals</GSAPTextReveal>
          <ul className="space-y-4 text-lg text-gray-800 dark:text-gray-100 font-medium mb-8">
            <li className="flex items-center gap-3">
              <Award className="text-green-700" size={24} />
              <span>Award <span className="font-bold">1,000 full scholarships</span> to outstanding Palestinian students</span>
            </li>
            <li className="flex items-center gap-3">
              <Users className="text-green-700" size={24} />
              <span>Develop exceptional leaders across different academic fields</span>
            </li>
            <li className="flex items-center gap-3">
              <Target className="text-green-700" size={24} />
              <span>Enable youth to achieve their full potential and serve society</span>
            </li>
          </ul>

          <div className="bg-gradient-to-br from-yellow-50/80 to-blue-50/80 dark:from-yellow-900/40 dark:to-blue-900/40 rounded-2xl shadow-xl p-8 border border-yellow-200/50 dark:border-yellow-800/50">
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center flex items-center justify-center gap-3">
              <span className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Trophy className="text-yellow-600 dark:text-yellow-400" size={28} />
              </span>
              Excellence Scholarship Financial Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GSAPReveal animation="scale">
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                      <GraduationCap className="text-yellow-600 dark:text-yellow-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-yellow-800 dark:text-yellow-300">Academic Excellence</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Full coverage of academic excellence program costs</p>
                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">$2,500</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">per academic year</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.1}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                      <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">Monthly Stipend</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Monthly living expenses support</p>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">$200</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">monthly ($2,400/year)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.2}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-blue-500"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-yellow-100 to-blue-100 dark:from-yellow-900/50 dark:to-blue-900/50 p-3 rounded-lg">
                      <Laptop className="text-gradient-to-r from-yellow-600 to-blue-600 dark:from-yellow-400 dark:to-blue-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">Technology Grant</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">One-time device purchase support</p>
                    <div className="bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">$300</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">one-time grant</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-blue-100/40 dark:from-green-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Requirements</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Globe className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Palestinian Nationality</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <GraduationCap className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">High School Average ≥ 90%</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Award className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">GPA 3.00+</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">English Proficiency Preferred</h3>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Fields of Study</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <GSAPReveal animation="slide-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Briefcase className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Business Administration</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Lightbulb className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Engineering</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Education</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Users className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Social Sciences</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Target className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Computer Science</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.5}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Globe className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">International Relations</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.6}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <DollarSign className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Economics</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.7}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <CheckSquare className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Law</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.8}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Brain className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Psychology</h3>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.9}>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
                <Calendar className="text-green-700 mb-2" size={32} />
                <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Media & Communications</h3>
              </div>
            </GSAPReveal>
          </div>
        </div>

        <div className="flex justify-center my-8 gap-4 flex-wrap">
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-red-600 hover:to-green-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/ProgramsFiles/Talented Excellence Scholarship Program-EN.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> Download Program (EN)
            </a>
            <a href="/ProgramsFiles/Talented Excellence Scholarship Program-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-green-100/40 via-white to-blue-100/40 dark:from-green-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className="text-xl font-bold text-green-800 mb-2">Contact Us</GSAPTextReveal>
          <p className="text-gray-700 dark:text-gray-200 mb-4">For more information, reach out to us:</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
            <a href="mailto:info@isnadf.org" className="flex items-center gap-2 text-green-700 hover:underline">
              <Mail className="text-green-700" size={22} /> info@isnadf.org
            </a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className="flex items-center gap-2 text-green-700 hover:underline">
              <Phone className="text-green-700" size={22} /> +90 539 430 07 26
            </a>
          </div>
        </div>

        <div className="flex justify-center my-8 gap-4 flex-wrap">
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-red-600 hover:to-green-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/ProgramsFiles/Talented Excellence Scholarship Program-EN.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> Download Program (EN)
            </a>
            <a href="/ProgramsFiles/Talented Excellence Scholarship Program-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
