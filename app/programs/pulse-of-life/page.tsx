"use client"

import {
  GraduationCap,
  Award,
  BookOpen,
  Globe,
  Target,
  UserPlus,
  Stethoscope,
  Hospital,
  Microscope,
  Home,
  Phone,
  Mail,
  Heart,
  Wallet,
  Laptop
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"

export default function PulseOfLifePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-red-50 via-pink-50 to-white dark:from-red-950 dark:via-gray-900 dark:to-black">
      {/* Medical-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-red-600/10 via-pink-500/10 to-red-700/10 dark:from-red-900/20 dark:via-pink-900/20 dark:to-red-800/20 shadow-lg border-b-4 border-red-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <Stethoscope size={48} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Heart size={16} className="text-red-500 animate-bounce" />
            </div>
          </div>
          <GSAPTextReveal element="h1" className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-sora drop-shadow-lg">
            Pulse of Life
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className="text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400 mt-2">
            Medical Scholarship Program
          </GSAPTextReveal>
          <p className="mt-4 text-lg md:text-xl text-red-800 dark:text-red-300 font-medium max-w-2xl mx-auto">
            🩺 The Health of Palestine... Our Responsibility 🏥
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={1000} label="Scholarships" />
          <StatsCounter number={5} label="Years" />
          <StatsCounter number={3} label="Support Pillars" />
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <h2 className="text-xl font-bold text-red-700 mb-2 flex items-center justify-center gap-2">
            <Heart className="text-red-500 animate-bounce" size={20} />
            <span>About the Program</span>
            <Heart className="text-red-500 animate-bounce" size={20} />
          </h2>
          <p className="text-gray-800 dark:text-gray-100 text-base md:text-lg text-center">
            <span className="font-semibold text-red-800">"Pulse of Life"</span> is a bold national initiative launched by the Isnad Foundation, aiming to <span className="font-bold text-red-700">provide 1,000 full scholarships in medicine and health sciences</span> to Palestinian students inside and outside Palestine—especially in rare and critical specializations. The program is designed to run over a <span className="font-bold text-red-700">period of 5 years</span>.
          </p>
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full shadow-xl hover:from-pink-600 hover:to-red-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl">
              <Stethoscope size={22} className="-ml-1 animate-pulse" /> Apply for Medical Scholarship
            </a>
            <div className="flex gap-3">
              <a href="/ProgramsFiles/Pulse of Life Scholarship-EN.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> Download Program (EN)
              </a>
              <a href="/ProgramsFiles/Pulse of Life Scholarship-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Why Pulse of Life Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-red-100/40 dark:from-green-900/30 dark:via-black dark:to-red-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Why Pulse of Life?</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[340px] min-w-[250px] w-full justify-start hover:scale-105 transition-transform duration-300">
              <Stethoscope className="text-green-700 mb-2" size={32} />
              <span className="text-3xl font-bold text-red-700 mb-2">01</span>
              <h3 className="text-xl font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Shortage of Medical Personnel</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">There is a critical lack of qualified medical and healthcare professionals, which limits service delivery and reduces the quality of care in health institutions.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[340px] min-w-[250px] w-full justify-start hover:scale-105 transition-transform duration-300">
              <Microscope className="text-green-700 mb-2" size={32} />
              <span className="text-3xl font-bold text-red-700 mb-2">02</span>
              <h3 className="text-xl font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Lack of Specialized Fields</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">The local healthcare system suffers from a shortage of specialists in key medical fields, further straining the Ministry of Health and limiting advanced care options.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[340px] min-w-[250px] w-full justify-start hover:scale-105 transition-transform duration-300">
              <Hospital className="text-green-700 mb-2" size={32} />
              <span className="text-3xl font-bold text-red-700 mb-2">03</span>
              <h3 className="text-xl font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Shortage in Hospital Capacity</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">A lack of hospital beds and essential resources means many patients cannot receive timely care, leading to higher mortality rates and overwhelming existing facilities.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[340px] min-w-[250px] w-full justify-start hover:scale-105 transition-transform duration-300">
              <Home className="text-green-700 mb-2" size={32} />
              <span className="text-3xl font-bold text-red-700 mb-2">04</span>
              <h3 className="text-xl font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Poor Healthcare Infrastructure</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Many medical devices are out of service, and essential resources to run healthcare facilities efficiently are missing, making it difficult to provide adequate care.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center h-full min-h-[340px] min-w-[250px] w-full justify-start hover:scale-105 transition-transform duration-300">
              <Target className="text-green-700 mb-2" size={32} />
              <span className="text-3xl font-bold text-red-700 mb-2">05</span>
              <h3 className="text-xl font-bold tracking-wide text-center text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-600 pb-1 uppercase">Impact of the Israeli Occupation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Since 2023, ongoing Israeli attacks have destroyed numerous health facilities, severely limiting the ability to deliver services and reducing the overall capacity of the healthcare system.</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>



      {/* Goals Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">Our Goals</GSAPTextReveal>
          <ul className="space-y-4 text-lg text-gray-800 dark:text-gray-100 font-medium mb-8">
            <li className="flex items-center gap-3"><UserPlus className="text-green-700" size={24} /><span>Train <span className="font-bold">1,000 students in medicine and health sciences</span> through full scholarships.</span></li>
            <li className="flex items-center gap-3"><Stethoscope className="text-green-700" size={24} /><span>Support local healthcare by integrating graduates into the system.</span></li>
            <li className="flex items-center gap-3"><Home className="text-green-700" size={24} /><span>Reach underserved areas through mobile clinics and awareness efforts.</span></li>
          </ul>
          <div className="bg-gradient-to-br from-green-50/80 to-red-50/80 dark:from-green-900/40 dark:to-red-900/40 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-8 text-center flex items-center justify-center gap-3">
              <Award className="text-green-700 dark:text-green-400" size={28} />
              Pulse of Life Scholarship Financial Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GSAPReveal animation="scale">
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                      <GraduationCap className="text-green-700 dark:text-green-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-green-800 dark:text-green-300">Education Support</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Full coverage of medical education costs</p>
                    <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">$5,600</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">per academic year</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.1}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-lg">
                      <Wallet className="text-pink-700 dark:text-pink-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-pink-800 dark:text-pink-300">Monthly Stipend</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Monthly living expenses support</p>
                    <div className="bg-gradient-to-r from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">$200</span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">monthly ($2,400/year)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>

              <GSAPReveal animation="scale" delay={0.2}>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                      <Laptop className="text-blue-700 dark:text-blue-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">Technology Grant</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">One-time device purchase support</p>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg">
                      <p className="text-center">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">$300</span>
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
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-green-100/40 via-white to-red-100/40 dark:from-green-900/30 dark:via-black dark:to-red-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Requirements</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Globe className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Palestinian Nationality</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">High School Average ≥ 90%</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Award className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">GPA 3.00+</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <BookOpen className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">English Proficiency Preferred</h3>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Fields of Study</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Stethoscope className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Human Medicine</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <BookOpen className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Dentistry</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Microscope className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Pharmacy</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <UserPlus className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Allied Health Professions</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.4}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Home className="text-green-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-green-800 dark:text-green-300 mb-1">Nursing</h3>
            </div></GSAPReveal>
          </div>
        </div>

        <div className="flex justify-center my-8 gap-4 flex-wrap">
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-red-600 hover:to-green-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/ProgramsFiles/Pulse of Life Scholarship-EN.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> Download Program (EN)
            </a>
            <a href="/ProgramsFiles/Pulse of Life Scholarship-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
            </a>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-green-100/40 via-white to-red-100/40 dark:from-green-900/30 dark:via-black dark:to-red-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className="text-xl font-bold text-green-800 mb-2">Contact Us</GSAPTextReveal>
          <p className="text-gray-700 dark:text-gray-200 mb-4">For more information, reach out to us:</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
            <a href="mailto:Palestinian.pssf@gmail.com" className="flex items-center gap-2 text-green-700 hover:underline"><Mail className="text-green-700" size={22} /> Palestinian.pssf@gmail.com</a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className="flex items-center gap-2 text-green-700 hover:underline"><Phone className="text-green-700" size={22} /> +90 539 430 07 26</a>
          </div>
        </div>

        <div className="flex justify-center my-8 gap-4 flex-wrap">
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:from-red-600 hover:to-green-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/ProgramsFiles/Pulse of Life Scholarship-EN.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> Download Program (EN)
            </a>
            <a href="/ProgramsFiles/Pulse of Life Scholarship-AR.pdf" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> تحميل البرنامج (AR)
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
