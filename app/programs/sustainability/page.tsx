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
  Users,
  Download,
  ExternalLink,
  ChevronDown
} from "lucide-react"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import StatsCounter from "@/components/stats-counter"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function SustainabilityScholarshipPage() {
  const { t, language } = useLanguage()

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-900 dark:to-teal-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/90 to-teal-900/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-teal-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Icon Section */}
          <GSAPReveal animation="scale">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                  <TreePine size={64} className="text-white animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Leaf size={24} className="text-green-500" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-spin">
                  <Recycle size={24} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </GSAPReveal>

          {/* Title */}
          <GSAPTextReveal element="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 font-sora">
              {t("sustainability.title")}
            </span>
          </GSAPTextReveal>

          {/* Subtitle */}
          <GSAPTextReveal element="h2" className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t("sustainability.subtitle")}
          </GSAPTextReveal>

          {/* Stats */}
          <GSAPReveal animation="slide-up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <StatsCounter number={200} label={t("sustainability.scholarships")} />
              </div>
              <div className="text-center">
                <StatsCounter number={3} label={t("sustainability.years")} />
              </div>
              <div className="text-center">
                <StatsCounter number={5} label={t("sustainability.majors")} />
              </div>
            </div>
          </GSAPReveal>

          {/* CTA Buttons */}
          <GSAPReveal animation="slide-up" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer">
                  <UserPlus className="mr-2 h-5 w-5" />
                  {t("sustainability.apply")}
                </a>
              </Button>

              {/* Program Downloads Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent group"
                  >
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    {language === 'ar' ? 'تحميل البرنامج' : 'Download Program'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-white/20">
                  <DropdownMenuItem asChild>
                    <a href="/ProgramsFiles/Sustainability Scholarship-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                      <Download className="h-4 w-4" />
                      English (EN)
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/ProgramsFiles/Sustainability Scholarship-AR.pdf" download className="flex items-center gap-2 cursor-pointer">
                      <Download className="h-4 w-4" />
                      العربية (AR)
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </GSAPReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About the Program */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <GSAPReveal animation="slide-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t("sustainability.about.title")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>
            </div>
          </GSAPReveal>

          <GSAPReveal animation="slide-up" delay={0.2}>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-xl">
              <CardContent className="p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Globe size={80} className="text-white" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <TreePine size={32} className="text-green-500" />
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-center lg:text-left">
                      {t("sustainability.about.desc")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </GSAPReveal>
        </div>
      </section>

      {/* Why the Program? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900">
        <div className="max-w-7xl mx-auto">
          <GSAPReveal animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t("sustainability.why.title")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
            </div>
          </GSAPReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Energy Card */}
            <GSAPReveal animation="slide-up" delay={0.1}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.why.energy.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {t("sustainability.why.energy.desc")}
                  </p>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Renewable Energy Card */}
            <GSAPReveal animation="slide-up" delay={0.2}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sun size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.why.renewable.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {t("sustainability.why.renewable.desc")}
                  </p>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Agriculture Card */}
            <GSAPReveal animation="slide-up" delay={0.3}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sprout size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.why.agriculture.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {t("sustainability.why.agriculture.desc")}
                  </p>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Occupation Impact Card */}
            <GSAPReveal animation="slide-up" delay={0.4}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Droplets size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.why.occupation.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {t("sustainability.why.occupation.desc")}
                  </p>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Academic Programs Card */}
            <GSAPReveal animation="slide-up" delay={0.5}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.why.programs.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {t("sustainability.why.programs.desc")}
                  </p>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Research Card */}
            <GSAPReveal animation="slide-up" delay={0.6}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.why.research.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {t("sustainability.why.research.desc")}
                  </p>
                </CardContent>
              </Card>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <GSAPReveal animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t("sustainability.objectives.title")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                {t("sustainability.objectives.subtitle")}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
            </div>
          </GSAPReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scholarship Objective */}
            <GSAPReveal animation="slide-up" delay={0.1}>
              <Card className="group h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">200 Full Scholarships</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t("sustainability.objectives.scholarships")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Research Objective */}
            <GSAPReveal animation="slide-up" delay={0.2}>
              <Card className="group h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Applied Research</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t("sustainability.objectives.research")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Knowledge Objective */}
            <GSAPReveal animation="slide-up" delay={0.3}>
              <Card className="group h-full bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Globe size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Knowledge & Innovation</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t("sustainability.objectives.knowledge")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Leadership Objective */}
            <GSAPReveal animation="slide-up" delay={0.4}>
              <Card className="group h-full bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Future Leaders</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t("sustainability.objectives.leaders")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Financial Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900">
        <div className="max-w-6xl mx-auto">
          <GSAPReveal animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t("sustainability.financial.title")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto"></div>
            </div>
          </GSAPReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tuition Support */}
            <GSAPReveal animation="scale" delay={0.1}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <DollarSign size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.financial.tuition.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t("sustainability.financial.tuition.desc")}
                  </p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {t("sustainability.financial.tuition.amount")}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t("sustainability.financial.tuition.period")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Living Support */}
            <GSAPReveal animation="scale" delay={0.2}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.financial.living.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t("sustainability.financial.living.desc")}
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      {t("sustainability.financial.living.amount")}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t("sustainability.financial.living.period")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>

            {/* Housing Support */}
            <GSAPReveal animation="scale" delay={0.3}>
              <Card className="group h-full bg-white dark:bg-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t("sustainability.financial.housing.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t("sustainability.financial.housing.desc")}
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      {t("sustainability.financial.housing.amount")}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t("sustainability.financial.housing.period")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Contact & Download Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <GSAPReveal animation="slide-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {t("sustainability.contact.title")}
              </h2>
              <p className="text-xl text-green-100 mb-8">
                {t("sustainability.contact.desc")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lg">
                <a
                  href="mailto:info@isnadf.org"
                  className="flex items-center gap-3 text-green-200 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  info@isnadf.org
                </a>

                <div className="hidden sm:block w-px h-8 bg-white/20"></div>

                <a
                  href="tel:+90539430726"
                  className="flex items-center gap-3 text-green-200 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  +90 539 430 07 26
                </a>
              </div>
            </div>
          </GSAPReveal>

          {/* Action Buttons */}
          <GSAPReveal animation="slide-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Apply Button */}
              <Button
                asChild
                size="lg"
                className="bg-white text-green-900 hover:bg-green-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg group"
              >
                <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer">
                  <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  {t("sustainability.apply")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>

              {/* Download Section */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Program Downloads Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold bg-transparent group"
                    >
                      <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      {language === 'ar' ? 'تحميل البرنامج' : 'Download Program'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-white/20">
                    <DropdownMenuItem asChild>
                      <a href="/ProgramsFiles/Sustainability Scholarship-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                        <Download className="h-4 w-4" />
                        English (EN)
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/ProgramsFiles/Sustainability Scholarship-AR.pdf" download className="flex items-center gap-2 cursor-pointer">
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
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold bg-transparent group"
                    >
                      <BookOpen className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      {language === 'ar' ? 'تحميل البرشور' : 'Download Brochure'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border-white/20">
                    <DropdownMenuItem asChild>
                      <a href="/ProgramsFiles/Sustainability Scholarship-BR-EN.pdf" download className="flex items-center gap-2 cursor-pointer">
                        <Download className="h-4 w-4" />
                        English (EN)
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/ProgramsFiles/Sustainability Scholarship-BR-AR.pdf" download className="flex items-center gap-2 cursor-pointer">
                        <Download className="h-4 w-4" />
                        العربية (AR)
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </GSAPReveal>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </section>
    </main>
  );
}
