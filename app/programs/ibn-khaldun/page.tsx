"use client"

import {
  Brain,
  Users,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  Eye,
  UserPlus,
  Scroll,
  Library,
  Microscope
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"

export default function IbnKhaldunScholarshipPage() {

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-indigo-50 to-white dark:from-purple-950 dark:via-indigo-900 dark:to-black">
      {/* Scholarly/Academic-themed Header Section */}
      <section className="relative py-20 md:py-28 flex flex-col items-center text-center bg-gradient-to-r from-purple-400/10 via-indigo-500/10 to-purple-600/10 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-purple-800/20 shadow-lg border-b-4 border-purple-500">
        <div className="mb-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-xl">
              <Library size={48} className="text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Brain size={16} className="text-purple-500 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Scroll size={16} className="text-indigo-500 animate-pulse" />
            </div>
          </div>
          <GSAPTextReveal element="h1" className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-sora drop-shadow-lg">
            Ibn Khaldun
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400 mt-2">
            Social Sciences Scholarship Program
          </GSAPTextReveal>
          <p className="mt-4 text-lg md:text-xl text-purple-800 dark:text-purple-300 font-medium max-w-2xl mx-auto">
            📚 Understanding Palestinian Society through Social Sciences 🧠
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={200} label="Scholarships" />
          <StatsCounter number={2} label="Key Fields" />
          <StatsCounter number={5} label="Years" />
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <h2 className="text-xl font-bold text-indigo-700 mb-2 flex items-center justify-center gap-2">
            <Brain className="text-purple-600 animate-pulse" size={28} />
            <span>About the Academic Program</span>
            <Library className="text-indigo-600 animate-bounce" size={28} />
          </h2>
          <p className="text-gray-800 dark:text-gray-100 text-base md:text-lg text-center">
            <span className="font-semibold text-purple-800">"Ibn Khaldun"</span> is a specialized graduate scholarship program designed to <span className="font-bold text-purple-700">provide 200 full scholarships in sociology and psychology</span> to Palestinian students. The program aims to develop competencies that can understand and analyze the social and psychological realities of Palestinians to formulate solutions and public policies.
          </p>
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:from-indigo-600 hover:to-purple-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl">
              <GraduationCap size={22} className="-ml-1 animate-pulse" /> Apply for Ibn Khaldun Scholarship
            </a>
            <div className="flex gap-3">
              <a href="/ProgramsFiles/Ibn Khaldun Scholarship.docx" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
                <BookOpen size={20} className="-ml-1" /> Download Program
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Mission Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-purple-100/40 via-white to-indigo-100/40 dark:from-purple-900/30 dark:via-black dark:to-indigo-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">Our Mission</GSAPTextReveal>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-lg text-gray-800 dark:text-gray-100 font-medium mb-4">
              Supporting and developing competencies that can <span className="font-bold text-purple-700">understand and analyze the social and psychological realities</span> of Palestinians to <span className="font-bold text-indigo-700">formulate solutions and public policies</span> that uplift Palestinian society.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GSAPReveal animation="scale"><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Eye className="text-purple-700 mb-3" size={40} />
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">Social Analysis</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-base">Comprehensive study of social structures, institutions, and dynamics within Palestinian society.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="scale" delay={0.1}><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Lightbulb className="text-indigo-700 mb-3" size={40} />
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">Policy Solutions</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-base">Develop evidence-based social policies that address community challenges and promote development.</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>



      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">Fields of Study</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Users className="text-blue-700 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-center text-blue-800 dark:text-blue-300 mb-4">Sociology</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                Comprehensive study of social structures, institutions, and dynamics within Palestinian society to understand community relationships and cultural patterns.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Social Theory & Research</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Community Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Cultural Studies</span>
                </div>
              </div>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Brain className="text-purple-700 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-center text-purple-800 dark:text-purple-300 mb-4">Psychology</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                Advanced study of individual and collective psychological processes, trauma recovery, and mental health interventions tailored to Palestinian experiences.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Clinical Psychology</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Trauma & Resilience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Community Psychology</span>
                </div>
              </div>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-purple-100/40 via-white to-indigo-100/40 dark:from-purple-900/30 dark:via-black dark:to-indigo-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">Requirements</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Globe className="text-purple-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1">Palestinian Nationality</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-purple-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1">Bachelor's Degree</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">In social sciences or related field</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Award className="text-purple-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1">GPA 3.0+</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <BookOpen className="text-purple-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-purple-800 dark:text-purple-300 mb-1">Research Interest</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">In Palestinian social research</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-purple-100/40 via-white to-indigo-100/40 dark:from-purple-900/30 dark:via-black dark:to-indigo-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className="text-xl font-bold text-purple-800 mb-2">Contact Us</GSAPTextReveal>
          <p className="text-gray-700 dark:text-gray-200 mb-4">For more information, reach out to us:</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
            <a href="mailto:info@isnadf.org" className="flex items-center gap-2 text-purple-700 hover:underline"><Mail className="text-purple-700" size={22} /> info@isnadf.org</a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className="flex items-center gap-2 text-purple-700 hover:underline"><Phone className="text-purple-700" size={22} /> +90 539 430 07 26</a>
          </div>
        </div>

        <div className="flex justify-center my-8 gap-4 flex-wrap">
          <a href="https://forms.gle/Xotxaubs4VyNN2We6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
          <div className="flex gap-3">
            <a href="/ProgramsFiles/Ibn Khaldun Scholarship.docx" download className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 text-lg hover:scale-105 hover:shadow-xl">
              <BookOpen size={20} className="-ml-1" /> Download Program
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
