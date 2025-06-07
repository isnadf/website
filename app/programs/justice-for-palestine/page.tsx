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
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from "next/image"
import StatsCounter from "@/components/stats-counter"

export default function JusticeForPalestinePage() {

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-red-50 via-white to-black dark:from-red-950 dark:via-black dark:to-green-950">
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
          <GSAPTextReveal className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent font-sora drop-shadow-lg">
            Justice for Palestine
          </GSAPTextReveal>
          <GSAPTextReveal element="h2" className="text-2xl md:text-3xl font-bold text-red-700 dark:text-red-400 mt-2">
            Advocacy Scholarship Program
          </GSAPTextReveal>
          <p className="mt-4 text-lg md:text-xl text-black dark:text-red-300 font-medium max-w-2xl mx-auto">
            ⚖️ Preparing Palestinian Leaders for Global Advocacy 🇵🇸
          </p>
        </div>
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <StatsCounter number={200} label="Scholarships" />
          <StatsCounter number={2} label="Key Fields" />
          <StatsCounter number={5} label="Years" />
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <h2 className="text-xl font-bold text-red-700 mb-2 flex items-center justify-center gap-2">
            <Scale className="text-red-600 animate-pulse" size={28} />
            <span>About the Justice Program</span>
            <Gavel className="text-black animate-bounce" size={28} />
          </h2>
          <p className="text-gray-800 dark:text-gray-100 text-base md:text-lg text-center">
            <span className="font-semibold text-red-800">"Justice for Palestine"</span> is a specialized graduate scholarship program designed to <span className="font-bold text-red-700">provide 200 full scholarships in political science and international relations</span> to Palestinian students. The program aims to prepare qualified Palestinian professionals for political, diplomatic, and international advocacy roles.
          </p>
          <div className="flex justify-center mt-6">
            <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-full shadow-xl hover:from-black hover:to-red-600 transition-all duration-300 text-lg hover:scale-105 hover:shadow-2xl">
              <Scale size={22} className="-ml-1 animate-pulse" /> Apply for Justice Scholarship
            </a>
          </div>
        </div>
      </section>



      {/* Mission Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">Our Mission</GSAPTextReveal>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-lg text-gray-800 dark:text-gray-100 font-medium mb-4">
              Preparing qualified Palestinian professionals for <span className="font-bold text-red-700">political, diplomatic, international, and crisis management roles</span> to enable them to <span className="font-bold text-blue-700">advocate for Palestine globally</span> and advance the Palestinian cause on the international stage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GSAPReveal animation="scale"><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Globe className="text-red-700 mb-3" size={40} />
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">Global Advocacy</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-base">Prepare leaders for international advocacy and diplomatic roles to advance Palestinian interests worldwide.</p>
            </div></GSAPReveal>
            <GSAPReveal animation="scale" delay={0.1}><div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-transform duration-300">
              <Shield className="text-blue-700 mb-3" size={40} />
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Crisis Management</h3>
              <p className="text-center text-gray-700 dark:text-gray-200 text-base">Develop expertise in emergency response, humanitarian coordination, and conflict mediation.</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>



      {/* Fields of Study Section */}
      <section className="py-16 px-4 md:px-0 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">Fields of Study</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Gavel className="text-red-700 mb-4" size={48} />
              <h3 className="text-xl font-bold text-center text-red-800 dark:text-red-300 mb-4">Political Science</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                Advanced studies in political theory, governance, public policy, and political analysis to develop expertise in understanding political systems.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Political Theory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Public Policy Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Comparative Politics</span>
                </div>
              </div>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center min-h-[300px] justify-center hover:scale-105 transition-transform duration-300">
              <Globe className="text-blue-700 mb-4" size={48} />
              <h3 className="text-xl font-bold text-center text-blue-800 dark:text-blue-300 mb-4">International Relations</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                Comprehensive training in diplomacy, international law, conflict resolution, and global governance for international advocacy roles.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Diplomatic Studies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">International Law</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">Conflict Resolution</span>
                </div>
              </div>
            </div></GSAPReveal>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 md:px-0 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-5xl mx-auto">
          <GSAPTextReveal element="h2" className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10">Requirements</GSAPTextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GSAPReveal animation="slide-up"><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Flag className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">Palestinian Nationality</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.1}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">Bachelor's Degree</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">In political science, law, or related field</p>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.2}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <Award className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">GPA 3.0+</h3>
            </div></GSAPReveal>
            <GSAPReveal animation="slide-up" delay={0.3}><div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col items-center min-h-[180px] justify-center hover:scale-105 transition-transform duration-300">
              <MessageSquare className="text-red-700 mb-2" size={32} />
              <h3 className="text-lg font-bold text-center text-red-800 dark:text-red-300 mb-1">Language Skills</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Multilingual proficiency preferred</p>
            </div></GSAPReveal>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="py-10 bg-gradient-to-r from-red-100/40 via-white to-blue-100/40 dark:from-red-900/30 dark:via-black dark:to-blue-900/30">
        <div className="max-w-2xl mx-auto text-center">
          <GSAPTextReveal element="h3" className="text-xl font-bold text-red-800 mb-2">Contact Us</GSAPTextReveal>
          <p className="text-gray-700 dark:text-gray-200 mb-4">For more information, reach out to us:</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
            <a href="mailto:info@isnadf.org" className="flex items-center gap-2 text-red-700 hover:underline"><Mail className="text-red-700" size={22} /> info@isnadf.org</a>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <a href="tel:+90539430726" className="flex items-center gap-2 text-red-700 hover:underline"><Phone className="text-red-700" size={22} /> +90 539 430 07 26</a>
          </div>
        </div>

        <div className="flex justify-center my-8">
          <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-red-500 transition-colors duration-300 text-xl">
            <UserPlus size={26} className="-ml-1" /> Apply Now
          </a>
        </div>
      </section>
    </main>
  );
}
