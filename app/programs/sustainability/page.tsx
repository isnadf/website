"use client"

import {
  Leaf,
  Zap,
  Sprout,
  Sun,
  Droplets,
  Globe,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  UserPlus,
  TreePine,
  Recycle,
  DollarSign,
  Users
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import StatsCounter from "@/components/stats-counter"

export default function SustainabilityScholarshipPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 dark:from-green-950 dark:via-emerald-900 dark:to-green-800">
      {/* Header Section */}
      <section className="relative py-16 md:py-24 flex flex-col items-center text-center bg-gradient-to-r from-green-200 via-emerald-100 to-green-100 dark:from-green-900 dark:via-emerald-900 dark:to-green-800 shadow-lg border-b-4 border-green-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
              <TreePine size={48} className="text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Leaf size={16} className="text-green-500 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Recycle size={16} className="text-emerald-500 animate-spin" />
            </div>
          </div>
          <GSAPTextReveal element="h1" className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-sora drop-shadow-lg">
            Sustainability Scholarship Program
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className="text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">
            Towards Global Sovereignty and a Society Driving Its Own Development
          </GSAPTextReveal>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={200} label="Scholarships" />
          <StatsCounter number={3} label="Years" />
          <StatsCounter number={5} label="Majors" />
        </div>
      </section>

      {/* About the Program */}
      <section className="py-10 px-4 md:px-0 bg-gradient-to-r from-green-100 via-emerald-50 to-green-200 dark:from-green-900 dark:via-emerald-900 dark:to-green-800 border-b border-green-100 dark:border-green-900">
        <div className="max-w-3xl mx-auto text-center">
          <GSAPTextReveal element="h2" className="text-2xl font-bold text-green-700 mb-4">About the Program</GSAPTextReveal>
          <p className="text-gray-800 dark:text-gray-100 text-base md:text-lg mb-4 leading-relaxed">
            The Sustainability Scholarship Program for Graduate Studies is a national initiative by the Isnad Foundation to support Palestinian students. It aims to qualify Palestinian talents in vital fields including sustainable energy, agriculture, and natural resources, to achieve national sovereignty in energy and food, and promote sustainable development in Palestine.
          </p>
        </div>
      </section>

      {/* Why the Program? */}
      <section className="py-12 px-4 md:px-0 bg-gradient-to-r from-green-100 via-emerald-50 to-green-200 dark:from-green-900 dark:via-emerald-900 dark:to-green-800 border-b border-green-100 dark:border-green-900">
        <div className="max-w-6xl mx-auto">
          <GSAPTextReveal element="h2" className="text-2xl font-bold text-green-700 mb-8 text-center">Why the Sustainability Scholarship?</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GSAPReveal animation="slide-up"><div className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl shadow p-6 min-h-[220px]">
              <Zap className="text-green-700 mb-3" size={36} />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Heavy Reliance on Imported Energy</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">Palestine relies on imported energy for 87.4% of its needs, making it vulnerable to crises and affecting economic and social development.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl shadow p-6 min-h-[220px]">
              <Sun className="text-yellow-600 mb-3" size={36} />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Low Contribution of Renewable Energy</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">Despite Palestine's significant natural potential for renewable energy, its contribution to local production does not exceed 4.7%.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl shadow p-6 min-h-[220px]">
              <Sprout className="text-emerald-700 mb-3" size={36} />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Agricultural Sector Challenges</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">The Palestinian agricultural sector faces major challenges related to water scarcity, declining cultivated areas, and weak use of modern technologies in plant, animal, and food production.</p>
            </div></GSAPReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <GSAPReveal animation="slide-up" delay={0.3}><div className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl shadow p-6 min-h-[220px]">
              <Droplets className="text-blue-600 mb-3" size={36} />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Impact of Occupation on Natural Resources</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">The occupation depletes Palestinian natural resources and limits the ability of Palestinians to invest in them.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}><div className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl shadow p-6 min-h-[220px]">
              <BookOpen className="text-green-700 mb-3" size={36} />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Lack of Specialized Academic Programs</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">There are few specialized academic programs in the fields of energy, agriculture, and natural resources.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.5}><div className="flex flex-col items-center bg-white/90 dark:bg-gray-900 rounded-xl shadow p-6 min-h-[220px]">
              <Award className="text-green-700 mb-3" size={36} />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Lack of Applied Scientific Research</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-sm">There is a lack of applied research that contributes to developing practical solutions to local problems.</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-10 px-4 md:px-0 bg-gradient-to-r from-green-100 via-emerald-50 to-green-200 dark:from-green-900 dark:via-emerald-900 dark:to-green-800 border-b border-green-100 dark:border-green-900">
        <div className="max-w-4xl mx-auto">
          <GSAPTextReveal element="h2" className="text-2xl font-bold text-green-700 mb-4 text-center">Our Objectives</GSAPTextReveal>
          <p className="text-lg text-emerald-800 dark:text-emerald-200 font-semibold text-center mb-8">Empowering a new generation to lead Palestine's sustainable future. Here's what we're striving for:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <li className="flex items-start gap-4 bg-white/80 dark:bg-gray-900 rounded-lg shadow p-5 hover:scale-105 transition-transform duration-300 border-l-4 border-green-500">
              <Award className="text-green-600 mt-1 flex-shrink-0" size={28} />
              <span className="text-green-900 dark:text-green-200 font-medium">Award 200 full scholarships to outstanding Palestinian students in energy, agriculture, and natural resources—fueling the next wave of changemakers.</span>
            </li>
            <li className="flex items-start gap-4 bg-white/80 dark:bg-gray-900 rounded-lg shadow p-5 hover:scale-105 transition-transform duration-300 border-l-4 border-emerald-500">
              <BookOpen className="text-emerald-600 mt-1 flex-shrink-0" size={28} />
              <span className="text-green-900 dark:text-green-200 font-medium">Ignite applied scientific research that delivers real solutions for a greener, more resilient Palestine.</span>
            </li>
            <li className="flex items-start gap-4 bg-white/80 dark:bg-gray-900 rounded-lg shadow p-5 hover:scale-105 transition-transform duration-300 border-l-4 border-blue-400">
              <Globe className="text-blue-500 mt-1 flex-shrink-0" size={28} />
              <span className="text-green-900 dark:text-green-200 font-medium">Boost Palestinian knowledge and innovation, connecting research to national priorities and real-world impact.</span>
            </li>
            <li className="flex items-start gap-4 bg-white/80 dark:bg-gray-900 rounded-lg shadow p-5 hover:scale-105 transition-transform duration-300 border-l-4 border-yellow-400">
              <GraduationCap className="text-yellow-500 mt-1 flex-shrink-0" size={28} />
              <span className="text-green-900 dark:text-green-200 font-medium">Inspire and graduate leaders ready to drive sustainable development and positive change across Palestine.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Financial Support Section */}
      <section className="py-10 px-4 md:px-0 bg-gradient-to-r from-green-100 via-emerald-50 to-green-200 dark:from-green-900 dark:via-emerald-900 dark:to-green-800 border-b border-green-100 dark:border-green-900">
        <div className="max-w-4xl mx-auto">
          <GSAPTextReveal element="h2" className="text-2xl font-bold text-green-700 mb-6 text-center">Financial Support</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GSAPReveal animation="scale">
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                    <DollarSign className="text-green-700 dark:text-green-400" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-green-800 dark:text-green-300">Annual Tuition Fees</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">The scholarship covers annual tuition fees.</p>
                  <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg">
                    <p className="text-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">$3,000</span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">per academic year</span>
                    </p>
                  </div>
                </div>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="scale" delay={0.1}>
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-lg">
                    <Users className="text-emerald-700 dark:text-emerald-400" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Annual Living Support</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Students receive a monthly living stipend.</p>
                  <div className="bg-gradient-to-r from-emerald-100 to-green-50 dark:from-emerald-900/30 dark:to-green-800/30 p-4 rounded-lg">
                    <p className="text-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">$200</span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">per month ($2,400/year)</span>
                    </p>
                  </div>
                </div>
              </div>
            </GSAPReveal>
            <GSAPReveal animation="scale" delay={0.2}>
              <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">
                    <Globe className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-green-800 dark:text-green-300">Housing Support</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">If needed, the scholarship provides annual housing support.</p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                    <p className="text-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$2,400</span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">per year</span>
                    </p>
                  </div>
                </div>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-green-100 via-emerald-50 to-green-200 dark:from-green-900 dark:via-emerald-900 dark:to-green-800">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className="text-xl font-bold text-green-800 mb-2">Contact Us</GSAPTextReveal>
          <p className="text-gray-700 dark:text-gray-200 mb-4">For more information, please contact us:</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
            <a href="mailto:info@isnadf.org" className="flex items-center gap-2 text-green-700 hover:underline"><Mail className="text-green-700" size={22} /> info@isnadf.org</a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className="flex items-center gap-2 text-green-700 hover:underline"><Phone className="text-green-700" size={22} /> +90 539 430 07 26</a>
          </div>
        </div>
        <div className="flex justify-center my-8">
          <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:from-emerald-600 hover:to-green-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/ProgramsFiles/Sustainability Scholarship-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
