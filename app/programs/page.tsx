"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Star,
  Leaf,
  Scale,
  Brain,
  ChevronDown,
  Stethoscope
} from "lucide-react"
import Image from "next/image"

export default function ProgramsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const programsRef = useRef<HTMLElement>(null)

  return (
    <main className="relative overflow-hidden text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[calc(100vh-96px)] mt-24 flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-blue-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          {/* Palestinian Flag */}
          <div className="mb-12 relative">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <Image
                src="/Flag_of_Palestine.svg"
                alt="Palestinian Flag"
                fill
                className="object-contain drop-shadow-2xl animate-pulse"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-blue-400 font-sora">
              Scholarship
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-green-400 font-sora -mt-4">
              Programs
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed">
            Empowering <span className="text-green-400 font-semibold">Palestinian Students</span> Through Education Excellence
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-white/60" />
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="relative h-1 bg-gradient-to-r from-green-900 via-blue-900 to-green-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.2)_0%,transparent_70%)]"></div>
      </div>

      {/* Programs Section */}
      <section
        ref={programsRef}
        className="relative pt-32 pb-16 bg-gradient-to-br from-black via-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Our Programs
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Choose your path to educational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Undergraduate Programs */}
            <div className="group relative">
              <Link href="/programs/pulse-of-life" className="block">
                <div className="p-12 bg-gradient-to-br from-red-900/20 to-black/40 rounded-3xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                      <Stethoscope size={48} className="text-white animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Undergraduate Programs</h3>
                    <h4 className="text-xl text-red-400 mb-6">Pulse of Life Scholarship</h4>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      Full scholarships in medicine and health sciences for Palestinian students. Supporting 1,000 students over 5 years.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-red-400 group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Palestinian Talented */}
            <div className="group relative">
              <Link href="/programs/palestinian-talented" className="block">
                <div className="p-12 bg-gradient-to-br from-blue-900/20 to-black/40 rounded-3xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                      <Star size={48} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Undergraduate Programs</h3>
                    <h4 className="text-xl text-blue-400 mb-6">Palestinian Talented Student</h4>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      Supporting outstanding Palestinian students across various academic fields. 1,000 scholarships for exceptional leaders.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-blue-400 group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Postgraduate Programs */}
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 mb-4">
              Postgraduate Programs
            </h3>
            <p className="text-lg text-gray-400">Advanced degrees for specialized expertise</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sustainability */}
            <div className="group relative">
              <Link href="/programs/sustainability" className="block">
                <div className="p-8 bg-gradient-to-br from-green-900/20 to-black/40 rounded-3xl border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                      <Leaf size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Sustainability</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      200 scholarships in energy and agricultural engineering for Palestine's green future.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-green-400 group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Justice for Palestine */}
            <div className="group relative">
              <Link href="/programs/justice-for-palestine" className="block">
                <div className="p-8 bg-gradient-to-br from-red-900/20 to-black/40 rounded-3xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                      <Scale size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Justice for Palestine</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      200 scholarships in political science and international relations for global advocacy.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-red-400 group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Ibn Khaldun */}
            <div className="group relative">
              <Link href="/programs/ibn-khaldun" className="block">
                <div className="p-8 bg-gradient-to-br from-purple-900/20 to-black/40 rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center">
                      <Brain size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Ibn Khaldun</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      200 scholarships in sociology and psychology for understanding Palestinian society.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-purple-400 group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

