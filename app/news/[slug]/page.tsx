"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GSAPReveal from "@/components/gsap-reveal"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

// Define the type for article data
type ArticleData = {
  title: {
    en: string
    ar: string
  }
  date: string
  author: string
  category: {
    en: string
    ar: string
  }
  image?: string
  heroImage?: string
  heroVideo?: string
  content: {
    en: string[]
    ar: string[]
  }
}

// Mock news articles data with bilingual support
const newsArticles: Record<string, ArticleData> = {
  "isnad-support-tour": {
    title: {
      en: "Isnad Conducts Support Tours in Six Countries and Provides Educational Grants to Gaza Students",
      ar: "إسناد تنفذ جولات دعم في ست دول وتقدم منحًا تعليمية لطلاب غزة"
    },
    date: "June 06, 2024",
    author: "Isnad Foundation",
    category: {
      en: "Education & Humanitarian Support",
      ar: "التعليم والدعم الإنساني"
    },
    image: "/LastNews/new3.jpeg",
    heroImage: "/LastNews/new3.jpeg",
    content: {
      en: [
        "Since the beginning of the genocidal war on Gaza, the Isnad Foundation for Supporting the Palestinian Student has carried out a series of meetings and urgent support missions in six countries — Turkey, Egypt, Mauritania, Kyrgyzstan, Malaysia, and Gaza itself — as part of its urgent response to the humanitarian and educational needs of Palestinian students affected by the ongoing genocide since October 2023.",
        "These tours aimed to engage directly with students, assess their academic and living conditions, and provide psychological and emotional support amid the severe hardship and trauma many are facing, including the loss of their family members and the collapse of essential support systems.",
        "During these meetings, the Foundation also announced the provision of direct educational grants to several students, offering immediate assistance to ease their burdens and help ensure the continuation of their academic journey. The Isnad Foundation has also worked to establish partnerships with local institutions in the countries it visited, with the goal of securing additional sustainable grants for Palestinian students and expanding educational opportunities in safe and supportive environments.",
        "The Foundation confirmed that these efforts are part of a rapid response plan launched at the beginning of the war, aimed at providing comprehensive support to students — educationally, psychologically, and socially — with a special focus on Gaza’s students, many of whom are facing catastrophic conditions under the ongoing aggression.",
        "The Isnad Foundation for Supporting the Palestinian Student is a Palestinian civil society organization established in Turkey. It is committed to empowering Palestinian students both academically and socially by offering educational grants, psychological and social support, and contributing to the creation of an educational environment that embraces Palestinian students — whether inside Palestine, in refugee camps, or across the diaspora — through sustainable local and international partnerships."
      ],
      ar: [
        "نفذت مؤسسة إسناد لدعم الطالب الفلسطيني منذ بدء حرب الإبادة في قطاع غزة سلسلة من اللقاءات والفعاليات في عدد من الدول شملت تركيا، مصر، موريتانيا، قرغيزستان، ماليزيا، وقطاع غزة، وذلك في إطار استجابتها العاجلة لاحتياجات الطلبة الفلسطينيين المتضررين من الحرب المستمرة على قطاع غزة منذ أكتوبر 2023.",
        "وهدفت هذه الجولات إلى التواصل المباشر مع الطلبة، والاطلاع على أوضاعهم المعيشية والتعليمية، وتقديم الدعم النفسي والمعنوي لهم، في ظل ما يعانونه من صعوبات معيشية وضغوط نفسية نتيجة فقدان ذويهم أو انقطاع سبل الدعم.",
        "وخلال اللقاءات، أعلنت المؤسسة عن تقديم منح تعليمية مباشرة لعدد من الطلبة، كمساهمة عاجلة لتخفيف العبء عنهم وضمان استمرارية تحصيلهم الأكاديمي. كما عملت \"إسناد\" على إبرام شراكات مع مؤسسات محلية في الدول التي تمت زيارتها، بهدف تأمين منح إضافية مستدامة للطلبة الفلسطينيين، وتعزيز فرص التعليم في بيئة آمنة وداعمة.",
        "وأكدت المؤسسة أن هذه الجهود تأتي ضمن خطة استجابة سريعة أطلقتها منذ بداية الحرب، وتهدف إلى تقديم دعم متكامل للطلبة من مختلف الجوانب النفسية والتعليمية والاجتماعية، مع التركيز على طلبة غزة في ظل الظروف الكارثية التي يمر بها القطاع.",
        "ومؤسسة إسناد لدعم الطالب الفلسطيني هي هيئة مجتمع مدني فلسطينية أُسست في تركيا، تهدف إلى تمكين الطلبة الفلسطينيين أكاديميًا ومجتمعيًا من خلال تقديم المنح التعليمية، وتوفير الدعم النفسي والاجتماعي، والمساهمة في بناء بيئة تعليمية حاضنة للطلبة الفلسطينيين داخل فلسطين وفي مناطق اللجوء والشتات، عبر شراكات محلية ودولية مستدامة."
      ]
    }
  },
  "nabd-al-hayat-grant-interviews": {
    title: {
      en: "Launch of First Phase Interviews for Pulse of Life Scholarship – Istanbul / Turkey",
      ar: "انطلاق مقابلات المرحلة الأولى من منحة نبض الحياة"
    },
    date: "May 5, 2025",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    image: "/LastNews/pulseOfLife-start.png",
    heroImage: "/LastNews/pulseOfLife-start.png",
    content: {
      en: [
        "Istanbul / Turkey",
        "On Tuesday, the Isnad Palestinian Student Fund began the first phase of interviews for the Pulse of Life scholarship. Conducted online, these interviews involved dozens of Palestinian students pursuing medical studies who had already passed the initial electronic registration and selection process. Through these sessions, the foundation gained deeper insight into each candidate’s background and needs. Successful candidates will receive various forms of support, including financial grants, educational placements, and essential equipment such as tablets and computers.",
        "It is worth noting that 'Pulse of Life' is one of the most prominent scholarship programs launched by the Isnad Palestinian Student Fund, which aims to provide scholarships to Palestinian students who wish to or are pursuing their studies in medical specialties.",
        "The Pulse of Life scholarship is one of the Isnad Foundation’s most prominent programs, aimed at providing scholarships to Palestinian students studying or wishing to study in medical fields. The program’s goal is to support 1,000 Palestinian students over a five-year plan.",
        "The Isnad Palestinian Student Fund is an independent Palestinian developmental non-profit organization dedicated to supporting higher education in Palestine by investing in young academic talent through scholarships based on a comprehensive developmental vision."
      ],
      ar: [
        "اسطنبول/ تركيا",
        "انطلقت اليوم الثلاثاء، أولى مقابلات الخاصة بمنحة نبض الحياة، التي دشنتها مؤسسة إسناد الطالب الفلسطيني.",
        "وشهدت المقابلات التي عقدها الصندوق عبر الانترنت، مشاركة عشرات الطلبة الفلسطينيين الذين يتابعون دراستهم في تخصصات طبية.",
        "وخلال المقابلات، تعرفت المؤسسة على الطلبة الذين اجتازوا المقابلات الأولى بعد التسجيل الالكتروني في المنحة.",
        "وسيحصل الناجحون في المقابلات ضمن منحة نبض الحياة، على مساعدات تتنوع بين منح مالية وتوفير مقاعد دراسية واقتناء معدات تعليمية وأجهزة لوحية وحواسيب.",
        "يذكر أن \"نبض الحياة\" يعتبر من أبرز برامج المنح التي أطلقتها مؤسسة إسنَاد لدعم الطالب الفلسطيني، والذي يستهدف تقديم منح للطلاب الفلسطينيين الذي يرغبون أو يتابعون دراستهم في أحد التخصصات الطبية.",
        "ويسعى البرنامج إلى تقديم منح ومساعدات إلى 1000 طالب فلسطيني، ضمن خطة عمل تمتد إلى خمس سنوات.",
        "ومؤسسة إسناد الطالب الفلسطيني هي منظمة فلسطينية تنموية مستقلة وغير ربحية، تهدف إلى دعم مسيرة التعليم العالي في فلسطين، من خلال الاستثمار في الطاقات الشبابية الأكاديمية، عبر توفير منح دراسية ضمن رؤية تنموية شاملة."
      ]
    }
  },
  "nabd-al-hayat-scholarship-interviews": {
    title: {
      en: "Completion of First Phase of Pulse of Life Scholarship Interviews – Istanbul / Turkey",
      ar: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة"
    },
    date: "May 25, 2025",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    image: "/LastNews/pulseOfLife-end.png",
    heroImage: "/LastNews/pulseOfLife-end.png",
    content: {
      en: [
        "Istanbul / Turkey",
        "On Saturday, May 25, 2025, the Isnad Foundation for Supporting the Palestinian Student successfully concluded the first phase of interviews for the Pulse of Life scholarship. This initial phase, conducted remotely over three weeks starting May 5, involved dozens of outstanding Palestinian students specializing in human medicine — both graduates and applicants from Gaza Strip universities.",
        "The purpose of the interviews was to assess each student's academic performance and living conditions to determine their eligibility for support, following their successful completion of the electronic registration and initial screening.",
        "In this phase, launched in strategic partnership with Alkhidmat Europe, the Isnad Foundation provides accepted students with monthly financial support for a full year — a step aimed at easing their academic burdens and enabling them to continue their higher education despite ongoing challenges.",
        "The Pulse of Life scholarship is one of the Isnad Foundation’s leading programs, dedicated to supporting Palestinian students in medical fields — particularly those from the Gaza Strip, whose educational paths have been severely affected by harsh humanitarian conditions, prolonged blockade, and repeated wars.",
        "As part of this ambitious five-year initiative, the program seeks to support around 1,000 Palestinian students in completing their medical studies — investing in young scientific talent and preparing a qualified generation of doctors committed to serving Palestinian society and strengthening its resilience.",
        "The Isnad Foundation is an independent Palestinian non-profit organization committed to supporting higher education in Palestine by providing sustainable educational and developmental scholarships. Guided by a comprehensive vision, the Foundation aims to build and empower the Palestinian individual through science and knowledge."
      ],
      ar: [
        "إسطنبول / تركيا",
        "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري، من خريجي ومقيدي جامعات قطاع غزة.",
        "وقد جرت المقابلات عن بُعد عبر الإنترنت، وهدفت إلى التعرف عن كثب على الظروف الأكاديمية والمعيشية للطلبة، وتقييم مدى استحقاقهم للدعم، وذلك بعد اجتيازهم مرحلة التصفية الأولية من خلال التسجيل الإلكتروني.",
        "وتمنح مؤسسة إسناد، في هذه المرحلة التي أُطلقت بشراكة استراتيجية مع مؤسسة الخدمت يوروب (Alkhidmat Europe)، دعماً مالياً شهرياً لمدة 12 شهراً للطلبة المقبولين، في خطوة تهدف إلى التخفيف من أعبائهم الدراسية وتمكينهم من مواصلة تعليمهم العالي في ظل التحديات القائمة.",
        "وتُعد منحة \"نبض الحياة\" من أبرز البرامج التي أطلقتها مؤسسة إسنَاد والتي تركز بشكل خاص على دعم الطلبة الفلسطينيين في التخصصات الطبية، ولا سيما من قطاع غزة، الذين تأثرت مسيرتهم التعليمية جراء الأوضاع الإنسانية القاسية والحصار والحروب المتكررة.",
        "ويستهدف البرنامج في مراحله المتتالية تمكين نحو 1000 طالب فلسطيني من استكمال دراستهم الطبية، ضمن خطة طموحة تمتد على خمس سنوات، تُعنى بالاستثمار في الكفاءات العلمية الشابة، وإعداد جيل طبي مؤهل يساهم في خدمة المجتمع الفلسطيني وتعزيز صموده.",
        "وتُعد مؤسسة إسنَاد مؤسسة فلسطينية مستقلة غير ربحية، تُكرّس جهودها لدعم التعليم العالي في فلسطين، من خلال تقديم منح دراسية وتنموية مستدامة، ترتكز على رؤية شاملة لبناء الإنسان الفلسطيني وتمكينه من خلال العلم والمعرفة."
      ]
    }
  },
  "pulse-of-life-disbursement": {
    title: {
      en: "Disbursements of the first phase of the Pulse of Life program have begin in Türkiye.",
      ar: "بدء صرف منح المرحلة الأولى من برنامج نبض الحياة في تركيا"
    },
    date: "June 06, 2024",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    heroImage: "/LastNews/latestnews4.jpeg",
    content: {
      en: [
        "Istanbul / Turkey",
        "On May 1, 2025, the Isnad Foundation for Supporting the Palestinian Student announced the start of scholarship disbursements for students benefiting from the first phase of the Pulse of Life program. This phase was launched in partnership with, and with the generous support of, the Turkish National Youth Foundation (MGV – Milli Gençlik Vakfı).",
        "The initial phase includes ten Palestinian students pursuing degrees in human medicine at universities in Türkiye. The first two monthly scholarship payments have been disbursed, marking a practical step toward ensuring their academic and living stability and helping them overcome the significant challenges they face.",
        "The Foundation also met with several students benefiting from the program and documented video messages in which the students expressed their gratitude to supporting partners and encouraged fellow Palestinian students to register and benefit from this opportunity.",
        "Pulse of Life is one of the pioneering initiatives launched by the Isnad Foundation in cooperation with multiple institutions. It aims to provide sustainable financial support to 1,000 Palestinian students in medical fields over a five-year period — empowering them to complete their education and contribute to serving their communities and homeland.",
        "The Isnad Foundation confirmed that it is continuing to accept registration applications for the program’s upcoming phases, as part of its broader vision to strengthen the resilience of Palestinian students and provide a supportive, secure educational environment that nurtures academic excellence and creativity."
      ],
      ar: [
        "إسطنبول / تركيا",
        "أعلنت مؤسسة إسناد لدعم الطالب الفلسطيني عن بدء صرف المنح الدراسية للطلبة المستفيدين ضمن المرحلة الأولى من برنامج \"نبض الحياة\"، وذلك اعتبارًا من 1 مايو 2025، بالشراكة والدعم الكريم من جمعية الشباب الوطني التركي (MGV - Milli Gençlik Vakfı).",
        "وشملت المرحلة الأولية عشرة طلاب فلسطينيين يدرسون في الجامعات التركية في تخصصات الطب البشري، حيث تم صرف أول دفعتين من المنحة الشهرية، في خطوة عملية تهدف إلى دعم استقرارهم الأكاديمي والمعيشي، ومساندتهم في تجاوز التحديات التي يواجهونها.",
        "وفي هذا السياق، التقت المؤسسة بعدد من الطلبة المستفيدين، وقامت بتوثيق مقاطع فيديو خاصة عبّروا فيها عن امتنانهم للجهات الداعمة، كما دعوا زملاءهم الطلبة إلى التسجيل في البرنامج والاستفادة من هذه الفرصة النوعية.",
        "ويُعد \"نبض الحياة\" من المبادرات الرائدة التي أطلقتها مؤسسة إسنَاد بالشراكة مع  عدد من المؤسسات، ويستهدف تقديم منح مالية مستدامة لألف طالب فلسطيني في التخصصات الطبية، بهدف تمكينهم من مواصلة دراستهم والمساهمة في خدمة مجتمعهم ووطنهم، ضمن خطة دعم تصل إلى خمس سنوات.",
        "وأكدت مؤسسة إسنَاد أنها مستمرة في استقبال طلبات التسجيل للمرحلة المقبلة من البرنامج، في إطار رؤيتها لتعزيز صمود الطلبة الفلسطينيين وتوفير بيئة تعليمية آمنة تدعم التميز الأكاديمي والإبداع."
      ]
    }
  },
  "pulse-of-life-gaza-medical-scholarships": {
    title: {
      en: "Isnad Begins Monthly Scholarship Disbursements for Medical Students in Gaza Under 'Pulse of Life' Program",
      ar: "إسناد تبدأ صرف منح شهرية لطلبة الطب البشري في غزة ضمن برنامج \"نبض الحياة\""
    },
    date: "January 15, 2025",
    author: "Isnad Foundation",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    image: "/hero-cover.jpg",
    heroImage: "/hero-cover.jpg",
    content: {
      en: [
        "Gaza – The Isnad Foundation for Palestinian Student Support launched the new phase of the 'Pulse of Life' scholarship program, specifically designed for medical students in the Gaza Strip. The foundation has begun disbursing monthly scholarships for a full year, renewable, aiming to enable students to continue their education amid the exceptional circumstances facing the sector.",
        "In this context, scholarship contracts were signed between the benefiting students and the foundation, in a step that reflects Isnad's commitment to ensuring regular financial support for them, covering their academic and living needs during the scholarship period.",
        "The scholarship-winning students addressed words of thanks to the foundation and supporters, and presented the difficulties they face in their academic journey under siege and aggression, within documentary videos prepared by the foundation to document the reality of medical sector students in Gaza who won the scholarship, and highlight their determination to complete their studies and serve their community.",
        "The foundation confirmed that these scholarships come within the framework of its commitment to investing in Palestinian medical cadres, and providing an educational environment that qualifies them to provide distinguished health service to their people, especially in light of the urgent need for doctors within the sector.",
        "The 'Pulse of Life' scholarship is one of the most prominent programs launched by the Isnad Foundation, which focuses specifically on supporting Palestinian students in medical specialties, especially from the Gaza Strip, whose educational path has been affected by harsh humanitarian conditions, siege, and repeated wars.",
        "The program aims in its successive stages to enable about 1,000 Palestinian students to complete their medical studies, within an ambitious five-year plan, concerned with investing in young scientific talents, and preparing a qualified medical generation that contributes to serving Palestinian society and strengthening its resilience.",
        "The Isnad Foundation is an independent Palestinian non-profit organization, dedicated to supporting higher education in Palestine, through providing sustainable educational and developmental scholarships, based on a comprehensive vision for building the Palestinian individual and empowering them through science and knowledge."
      ],
      ar: [
        "غزة – أطلقت مؤسسة إسناد لدعم الطالب الفلسطيني المرحلة الجديدة من برنامج \"منحة نبض الحياة\"، والمخصصة لطلبة الطب البشري في قطاع غزة، حيث بدأت بصرف منح شهرية لمدة عام كامل قابلة للتجديد، بهدف تمكين الطلبة من مواصلة تعليمهم وسط الظروف الاستثنائية التي يعيشها القطاع.",
        "وفي ذات السياق تم توقيع عقود المنح بين الطلبة المستفيدين والمؤسسة، في خطوة تعكس التزام إسناد بضمان الدعم المالي المنتظم لهم، بما يغطي احتياجاتهم الدراسية والمعيشية خلال فترة المنحة.",
        "وتوجّه الطلبة الفائزين بالمنحة بكلمات، عبّروا فيها عن شكرهم للمؤسسة والداعمين، واستعرضوا الصعوبات التي تواجههم في مسيرتهم الأكاديمية في ظل الحصار والعدوان، وذلك ضمن فيديوهات توثيقية أعدّتها المؤسسة لرصد واقع طلبة القطاع الطبي في غزة الفائزين بالمنحة، وإبراز إصرارهم على استكمال دراستهم وخدمة مجتمعهم.",
        "وأكدت المؤسسة أن هذه المنح تأتي في إطار التزامها بالاستثمار في الكوادر الطبية الفلسطينية، وتوفير البيئة التعليمية التي تؤهلهم لتقديم خدمة صحية متميزة لشعبهم، خاصة في ظل الحاجة الماسة للأطباء داخل القطاع.",
        "وتُعد منحة \"نبض الحياة\" من أبرز البرامج التي أطلقتها مؤسسة إسناد والتي تركز بشكل خاص على دعم الطلبة الفلسطينيين في التخصصات الطبية، ولا سيما من قطاع غزة، الذين تأثرت مسيرتهم التعليمية جراء الأوضاع الإنسانية القاسية والحصار والحروب المتكررة.",
        "ويستهدف البرنامج في مراحله المتتالية تمكين نحو 1000 طالب فلسطيني من استكمال دراستهم الطبية، ضمن خطة طموحة تمتد على خمس سنوات، تُعنى بالاستثمار في الكفاءات العلمية الشابة، وإعداد جيل طبي مؤهل يساهم في خدمة المجتمع الفلسطيني وتعزيز صموده.",
        "وتُعد مؤسسة إسناد مؤسسة فلسطينية مستقلة غير ربحية، تُكرّس جهودها لدعم التعليم العالي في فلسطين، من خلال تقديم منح دراسية وتنموية مستدامة، ترتكز على رؤية شاملة لبناء الإنسان الفلسطيني وتمكينه من خلال العلم والمعرفة."
      ]
    }
  }
}

// Categories for the sidebar
const categories = [
  { value: "Scholarships", label: { en: "Scholarships", ar: "المنح الدراسية" } },
  { value: "Partnerships", label: { en: "Partnerships", ar: "الشراكات" } },
  { value: "Events", label: { en: "Events", ar: "الفعاليات" } },
  { value: "Success Stories", label: { en: "Success Stories", ar: "قصص النجاح" } },
  { value: "Grants", label: { en: "Grants", ar: "المنح" } },
  { value: "Announcements", label: { en: "Announcements", ar: "الإعلانات" } },
  { value: "Reports", label: { en: "Reports", ar: "التقارير" } }
]

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const { language, t } = useLanguage()
  const isRTL = language === "ar"

  // Get article data or use default if not found
  const article = newsArticles[slug as keyof typeof newsArticles] || {
    title: {
      en: "Article Not Found",
      ar: "المقال غير موجود"
    },
    date: "",
    author: "",
    category: {
      en: "",
      ar: ""
    },
    image: "/placeholder.svg?height=600&width=1200",
    heroImage: "/placeholder.svg?height=600&width=1200",
    heroVideo: undefined,
    content: {
      en: ["The requested article could not be found."],
      ar: ["لم يتم العثور على المقال المطلوب."]
    }
  }

  // Get related articles (excluding current article)
  const dynamicRelatedArticles = Object.entries(newsArticles)
    .filter(([key]) => key !== slug)
    .map(([key, article]) => ({
      id: key,
      title: article.title[language],
      excerpt: article.content[language][0],
      date: article.date,
      category: article.category[language],
      href: `/news/${key}`
    }))

  // Share handlers
  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = article.title[language]
    const text = article.content[language][0]

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'general':
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              text,
              url
            })
          } catch (err) {
            // Only log actual errors, not user cancellations
            if (err instanceof Error && err.name !== 'AbortError') {
              console.error('Error sharing:', err)
            }
          }
        } else {
          // Fallback for browsers that don't support the Web Share API
          try {
            await navigator.clipboard.writeText(url)
            alert(t("news.linkCopied"))
          } catch (err) {
            console.error('Error copying to clipboard:', err)
          }
        }
        break
    }
  }

  // Video loading states
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoInView, setVideoInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!videoContainerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(videoContainerRef.current)

    return () => observer.disconnect()
  }, [])

  // Video event handlers
  const handleVideoCanPlayThrough = () => {
    setVideoLoaded(true)
  }

  const handleVideoError = () => {
    // Fallback to show video anyway after error
    setVideoLoaded(true)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Add any GSAP animations here if needed
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="flex min-h-screen flex-col" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero Section */}
      <section className="relative h-[calc(70vh)] sm:h-[calc(60vh)] md:h-[calc(70vh)] lg:h-[calc(80vh)] xl:h-[calc(85vh)] w-full overflow-hidden mt-24">
        <div className="absolute inset-0 z-0" ref={videoContainerRef}>
          {article.heroVideo ? (
            <div className="relative w-full h-full">
              {/* Video Skeleton */}
              {!videoLoaded && (
                <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="text-gray-400 dark:text-gray-500 text-sm">
                      {language === 'ar' ? 'جاري تحميل الفيديو...' : 'Loading video...'}
                    </div>
                  </div>
                </div>
              )}

              {/* Video Element */}
              {videoInView && (
                <video
                  ref={videoRef}
                  src={article.heroVideo}
                  poster={article.image || "/latestnews4.jpeg?height=600&width=1200"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlayThrough={handleVideoCanPlayThrough}
                  onError={handleVideoError}
                  className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </div>
          ) : (
            <Image
              src={article.heroImage || article.image || "/cover3.png"}
              alt={article.title[language]}
              className="h-full w-full object-contain object-center"
              width={1920}
              height={1080}
            />
          )}
        </div>
        {/* Page Indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className="text-white text-xs sm:text-sm font-medium">{t("news.latest")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link href="/news" className="mb-6 inline-flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className={`mr-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  {t("news.backToNews")}
                </Link>
                <h1 
                  className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {article.title[language]}
                </h1>
                <div 
                  className="flex flex-wrap items-center gap-4 text-muted-foreground"
                  style={{ 
                    justifyContent: isRTL ? 'flex-end' : 'flex-start',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}
                >
                  {article.date && (
                    <div className="flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Calendar className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      <span>{article.date}</span>
                    </div>
                  )}
                  {article.author && (
                    <div className="flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <User className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      <span>{article.author}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <Tag className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      <span>{article.category[language]}</span>
                    </div>
                  )}
                </div>
              </div>
              <GSAPReveal animation="fade">
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  {article.content[language].map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </GSAPReveal>

              {/* Share Section */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm font-medium">{t("news.share")}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-sky-50 hover:text-sky-600"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-gray-50 hover:text-gray-600"
                    onClick={() => handleShare('general')}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="space-y-8">
                {/* Categories */}
                <GSAPReveal animation="slide-left">
                  <Card>
                    <CardContent className="p-6">
                      <h3 
                        className="mb-4 text-lg font-bold"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {t("news.categories")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge 
                            key={category.value} 
                            variant="outline" 
                            className="bg-primary/10 text-primary"
                          >
                            {category.label[language]}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </GSAPReveal>

                {/* Related Articles */}
                {dynamicRelatedArticles && dynamicRelatedArticles.length > 0 && (
                  <GSAPReveal animation="slide-left" delay={0.1}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 
                          className="mb-4 text-lg font-bold"
                          style={{ textAlign: isRTL ? 'right' : 'left' }}
                        >
                          {t("news.relatedArticles")}
                        </h3>
                        <div className="space-y-4">
                          {dynamicRelatedArticles.map((related) => (
                            <Link key={related.id} href={related.href} className="group block">
                              <div className="flex gap-3">
                                <div>
                                  <h4 
                                    className="line-clamp-2 font-medium group-hover:text-primary"
                                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                                  >
                                    {related.title}
                                  </h4>
                                  <p 
                                    className="text-xs text-muted-foreground"
                                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                                  >
                                    {related.date}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </GSAPReveal>
                )}

                {/* Call to Action */}
                <GSAPReveal animation="slide-left" delay={0.2}>
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <h3 
                        className="mb-2 text-lg font-bold"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {t("news.explorePrograms")}
                      </h3>
                      <p 
                        className="mb-4 text-primary-foreground/90"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {t("news.exploreProgramsDesc")}
                      </p>
                      <Link href="/programs">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">
                          {t("news.viewPrograms")}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </GSAPReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section - Full Width */}
      {(slug === "pulse-of-life-disbursement" || slug === "pulse-of-life-gaza-medical-scholarships") && (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <GSAPReveal animation="fade" delay={0.2}>
                <div className="text-center mb-12">
                  <h3
                    className="text-2xl font-bold mb-6"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {language === 'ar' ? 'أحدث الفيديوهات' : 'Latest Videos'}
                  </h3>
                </div>
                <div className={`grid gap-6 ${slug === "pulse-of-life-gaza-medical-scholarships" ? "md:grid-cols-2" : "md:grid-cols-4"}`}>
                  {/* Video 1 */}
                  <div className={`group relative rounded-lg border-2 border-[#1e7e34]/20 transition-all hover:shadow-lg ${slug === "pulse-of-life-gaza-medical-scholarships" ? "" : ""}`}>
                    <video
                      className={`w-full transition-opacity duration-700 ${slug === "pulse-of-life-gaza-medical-scholarships" ? "h-[500px] object-cover" : "max-h-[400px] object-contain"}`}
                      controls
                      preload="metadata"
                    >
                      <source src={slug === "pulse-of-life-gaza-medical-scholarships" ? "/newsVid[1]/vid1.mp4" : "/newVid/lastnews1.mp4"} type="video/mp4" />
                      {language === 'ar'
                        ? 'متصفحك لا يدعم تشغيل الفيديو'
                        : 'Your browser does not support the video tag.'
                      }
                    </video>
                  </div>

                  {/* Video 2 */}
                  <div className={`group relative rounded-lg border-2 border-[#1e7e34]/20 transition-all hover:shadow-lg ${slug === "pulse-of-life-gaza-medical-scholarships" ? "" : ""}`}>
                    <video
                      className={`w-full transition-opacity duration-700 ${slug === "pulse-of-life-gaza-medical-scholarships" ? "h-[500px] object-cover" : "max-h-[400px] object-contain"}`}
                      controls
                      preload="metadata"
                    >
                      <source src={slug === "pulse-of-life-gaza-medical-scholarships" ? "/newsVid[1]/vid2.mp4" : "/newVid/lastnews2.mp4"} type="video/mp4" />
                      {language === 'ar'
                        ? 'متصفحك لا يدعم تشغيل الفيديو'
                        : 'Your browser does not support the video tag.'
                      }
                    </video>
                  </div>
                  {/* Video 3 */}
                  <div className={`group relative rounded-lg border-2 border-[#1e7e34]/20 transition-all hover:shadow-lg ${slug === "pulse-of-life-gaza-medical-scholarships" ? "" : ""}`}>
                    <video
                      className={`w-full transition-opacity duration-700 ${slug === "pulse-of-life-gaza-medical-scholarships" ? "h-[500px] object-cover" : "max-h-[400px] object-contain"}`}
                      controls
                      preload="metadata"
                    >
                      <source src={slug === "pulse-of-life-gaza-medical-scholarships" ? "/newsVid[1]/vid3.mp4" : "/newVid/new4Vid.mp4"} type="video/mp4" />
                      {language === 'ar'
                        ? 'متصفحك لا يدعم تشغيل الفيديو'
                        : 'Your browser does not support the video tag.'
                      }
                    </video>
                  </div>
                  {/* Video 4 - Only for pulse-of-life-disbursement */}
                  {slug === "pulse-of-life-disbursement" && (
                    <div className="group relative rounded-lg border-2 border-[#1e7e34]/20 transition-all hover:shadow-lg">
                      <video
                        className="w-full max-h-[400px] object-contain transition-opacity duration-700"
                        controls
                        preload="metadata"
                      >
                        <source src="/newVid/nabd-alyha2.mp4" type="video/mp4" />
                        {language === 'ar'
                          ? 'متصفحك لا يدعم تشغيل الفيديو'
                          : 'Your browser does not support the video tag.'
                        }
                      </video>
                    </div>
                  )}
                </div>
              </GSAPReveal>
            </div>
          </div>
        </section>
      )}

      {/* More News Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                {t("news.moreNews")}
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
                {t("news.moreNewsDesc")}
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dynamicRelatedArticles.slice(0, 3).map((related, index) => (
              <GSAPReveal key={related.id} animation="slide-up" delay={0.1 * index}>
                <Link href={related.href} className="group block">
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
                    <div className="p-4">
                      <Badge 
                        variant="outline" 
                        className="mb-2 bg-primary/10 text-primary"
                        style={{ 
                          display: 'inline-block',
                          marginLeft: isRTL ? 'auto' : '0',
                          marginRight: isRTL ? '0' : 'auto'
                        }}
                      >
                        {related.category}
                      </Badge>
                      <h3 
                        className="mb-2 line-clamp-2 text-xl font-bold group-hover:text-primary"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {related.title}
                      </h3>
                      <p 
                        className="mb-4 line-clamp-2 text-muted-foreground"
                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                      >
                        {related.excerpt}
                      </p>
                      <div 
                        className="flex items-center text-sm text-muted-foreground"
                        style={{ 
                          justifyContent: isRTL ? 'flex-end' : 'flex-start',
                          flexDirection: isRTL ? 'row-reverse' : 'row',
                          width: '100%'
                        }}
                      >
                        <Calendar className={`${isRTL ? 'ml-1' : 'mr-1'} h-3 w-3`} />
                        <span style={{ textAlign: isRTL ? 'right' : 'left' }}>{related.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
