"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, GraduationCap, MapPin, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Quote, Link as LinkIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"
import Image from 'next/image'
import { useLanguage } from "@/components/language-provider"

type Language = 'en' | 'ar'

interface TranslatedText {
  en: string
  ar: string
}

interface TranslatedArray {
  en: string[]
  ar: string[]
}

interface SuccessStory {
  id: string
  slug: string
  name: TranslatedText
  degree: TranslatedText
  university: TranslatedText
  graduationYear: string
  hometown: TranslatedText
  quote: TranslatedText
  story: TranslatedArray
  achievements: TranslatedArray
  testimonial: TranslatedText
  relatedStories: SuccessStory[]
}

// Mock success story data with translations
const successStories: Record<string, SuccessStory> = {
  "ahmed-hassan": {
    id: "ahmed-hassan",
    slug: "ahmed-hassan",
    name: {
      en: "Ahmed Hassan",
      ar: "أحمد حسن"
    },
    degree: {
      en: "PhD in Computer Science",
      ar: "دكتوراه في علوم الحاسوب"
    },
    university: {
      en: "Istanbul Technical University",
      ar: "جامعة إسطنبول التقنية"
    },
    graduationYear: "2022",
    hometown: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين"
    },
    quote: {
      en: "The support from the Palestinian Student Fund transformed my academic journey and opened doors I never thought possible.",
      ar: "دعم مؤسسة إسنَاد لدعم الطالب الفلسطيني غير مسيرتي الأكاديمية وفتح أمامي أبواباً لم أكن أتخيلها ممكنة."
    },
    story: {
      en: [
        "Growing up in Gaza, I always had a passion for technology and computing, but the opportunities to pursue advanced education in this field were severely limited due to both financial constraints and the ongoing conflict in the region.",
        "After completing my bachelor's degree in Computer Engineering at Al-Azhar University in Gaza with top honors, I dreamed of continuing my education abroad, but the financial barriers seemed insurmountable. My family had already made significant sacrifices to support my undergraduate studies, and further education seemed out of reach.",
        "Everything changed when I learned about the Palestinian Student Fund. I applied for their PhD scholarship program with hope but realistic expectations. When I received the news that I had been selected for a full scholarship to pursue my doctorate at Istanbul Technical University, it was a life-changing moment not just for me, but for my entire family.",
        "The transition to life in Turkey came with its challenges – cultural differences, language barriers, and adapting to a new academic environment. However, the PSF provided more than just financial support. Their mentorship program connected me with other Palestinian scholars and Turkish academics who helped me navigate these challenges.",
        "My research focused on developing machine learning algorithms for resource-constrained environments, work that I hope will have practical applications in areas with limited technological infrastructure – including Palestine. Throughout my studies, I was able to publish several papers in top-tier conferences and journals, and even secured an internship at a leading tech company in Istanbul.",
        "Beyond academics, the PSF community became like a second family. The cultural events, networking opportunities, and sense of belonging they fostered helped me overcome homesickness and stay focused on my goals.",
        "After completing my PhD in 2022, I accepted a position as an Assistant Professor at Istanbul Technical University, where I now have the opportunity to mentor other students, including Palestinians. I'm also collaborating with tech initiatives in Gaza, working to create distance learning programs and training opportunities for promising students there.",
        "My journey from Gaza to becoming a PhD in Computer Science and an educator wouldn't have been possible without the Palestinian Student Fund. They didn't just fund my education – they invested in my potential and enabled me to create a positive ripple effect for others from similar backgrounds."
      ],
      ar: [
        "نشأت في غزة، وكنت دائماً شغوفاً بالتكنولوجيا والحوسبة، لكن الفرص لمتابعة التعليم المتقدم في هذا المجال كانت محدودة بشدة بسبب القيود المالية والنزاع المستمر في المنطقة.",
        "بعد إكمال درجة البكالوريوس في الهندسة الكهربائية بالجامعة الإسلامية في غزة بأعلى درجات، حلمت بمتابعة التعليم الجامعي خارج البلد، لكن الباريرات المالية تبدو غير قابلة للتغلب عليها، فأصبحت الدفعة الجامعية التي أدفعها أهلي على خطرها من التعليم الجامعي، وبالتالي التعليم الجامعي المتقدم خارج البلد غير ممكن.",
        "كل شيء تغير عندما تعلمت عن مؤسسة إسنَاد لدعم الطالب الفلسطيني. طلبت منهم برنامج الدكتوراه بأمل بسعادة وتوقعات واقعية. عندما أطلع على أني تم تحديد لمنحة كاملة لمتابعة الدكتوراه في جامعة إسطنبول التقنية، كانت لحياة مغيرة لي ولعائلتي.",
        "جاء الانتقال إلى الحياة في تركيا مع تحدياته – الاختلافات الثقافية، حواجز اللغة، والتكيف مع بيئة أكاديمية جديدة. ومع ذلك، قدمت مؤسسة إسنَاد لدعم الطالب الفلسطيني أكثر من مجرد دعم مالي. ربطني برنامج الإرشاد الخاص بهم بباحثين فلسطينيين آخرين وأكاديميين أتراك ساعدوني في تخطي هذه التحديات.",
        "بالإضافة إلى الأكاديميين، أصبح مجتمع مؤسسة إسنَاد لدعم الطالب الفلسطيني مثل عائلة ثانية. ساعدت الأحداث الثقافية وفرص التواصل والشعور بالانتماء الذي عززوه في التغلب على الحنين إلى الوطن والبقاء مركزاً على أهدافي.",
        "بعد إكمال الدكتوراه في عام 2022، قبلت منصب أستاذ مساعد في جامعة إسطنبول التقنية، حيث لدي الآن الفرصة لتوجيه الطلاب الآخرين، بما في ذلك الفلسطينيين. أنا أيضاً أتعاون مع مبادرات تقنية في غزة، وأعمل على إنشاء برامج تعليم عن بعد وفرص تدريب للطلاب الواعدين هناك.",
        "لم تكن رحلتي من غزة إلى أن أصبحت حاصلاً على الدكتوراه في علوم الحاسوب ومعلماً ممكنة بدون مؤسسة إسنَاد لدعم الطالب الفلسطيني. لم يمولوا تعليمي فحسب؛ بل استثمروا في إمكاناتي ومكنوني من خلق تأثير إيجابي متتالٍ للآخرين من خلفيات مماثلة."
      ]
    },
    achievements: {
      en: [
        "Published 5 papers in top-tier computer science conferences",
        "Received the Outstanding Graduate Student Award at Istanbul Technical University",
        "Developed an open-source machine learning library optimized for low-resource environments",
        "Secured a patent for a novel algorithm in distributed computing",
        "Established a mentorship program connecting Turkish tech companies with Palestinian students"
      ],
      ar: [
        "نشر 5 أوراق بحثية في مؤتمرات علوم الحاسوب الرائدة",
        "حصل على جائزة الطالب المتميز في جامعة إسطنبول التقنية",
        "طور مكتبة تعلم آلي مفتوحة المصدر مخصصة للبيئات محدودة الموارد",
        "حصل على براءة اختراع لخوارزمية جديدة في الحوسبة الموزعة",
        "أسس برنامج إرشاد يربط شركات التكنولوجيا التركية بالطلاب الفلسطينيين"
      ]
    },
    testimonial: {
      en: "The scholarship wasn't just financial support – it was someone believing in my potential when circumstances made it hard to believe in myself.",
      ar: "لم تكن المنحة مجرد دعم مالي – بل كانت إيماناً بقدراتي عندما جعلت الظروف من الصعب الإيمان بنفسي."
    },
    relatedStories: [
      {
        id: "sami-barakat",
        slug: "sami-barakat",
        name: {
          en: "Sami Barakat",
          ar: "سامي بركات"
        },
        degree: {
          en: "Master's in Architecture",
          ar: "ماجستير في الهندسة المعمارية"
        },
        university: {
          en: "Middle East Technical University",
          ar: "جامعة خليج الشرق الأوسط التقنية"
        },
        graduationYear: "2022",
        hometown: {
          en: "Jerusalem, Palestine",
          ar: "القدس، فلسطين"
        },
        quote: {
          en: "Studying architecture has given me the tools to envision rebuilding my homeland. This scholarship was the foundation of that dream.",
          ar: "دراسة الهندسة المعمارية أعطاني الأدوات لتخيل بناء بلدي. كانت هذه المنحة الأساسية لهذا الحلم."
        },
        story: {
          en: ["Sample story"],
          ar: ["قصة نموذجية"]
        },
        achievements: {
          en: ["Sample achievement"],
          ar: ["إنجاز نموذجي"]
        },
        testimonial: {
          en: "Sample testimonial",
          ar: "شهادة نموذجية"
        },
        relatedStories: []
      }
    ]
  },
  "layla-mahmoud": {
    id: "layla-mahmoud",
    slug: "layla-mahmoud",
    name: {
      en: "Layla Mahmoud",
      ar: "ليلى محمود"
    },
    degree: {
      en: "Master's in Public Health",
      ar: "ماجستير في الصحة العامة"
    },
    university: {
      en: "Ankara University",
      ar: "جامعة أنقرة"
    },
    graduationYear: "2021",
    hometown: {
      en: "Ramallah, Palestine",
      ar: "رام الله، فلسطين"
    },
    quote: {
      en: "Thanks to the scholarship program, I was able to pursue my dream of working in healthcare policy to help communities in need.",
      ar: "بفضل برنامج المنح الدراسية، تمكنت من تحقيق حلمي في العمل في سياسات الرعاية الصحية لمساعدة المجتمعات المحتاجة."
    },
    story: {
      en: [
        "My journey into public health began in the clinics of Ramallah, where I volunteered during my undergraduate years. I witnessed firsthand the challenges facing our healthcare system – limited resources, restricted access to medical supplies, and the impact of ongoing conflict on community health.",
        "After completing my bachelor's degree in Biology at Birzeit University, I was determined to gain the knowledge and skills needed to address these systemic healthcare challenges. However, opportunities for specialized graduate education in public health were limited in Palestine, and international programs seemed financially out of reach.",
        "The Palestinian Student Fund changed everything for me. Their scholarship program not only covered my tuition and living expenses at Ankara University but also provided language support to help me adapt to studying in Turkish. The transition was challenging, but the foundation's support network made it manageable.",
        "During my master's program, I focused my research on healthcare access in conflict zones, drawing from both academic knowledge and my personal experiences. My professors were supportive and encouraged me to publish my findings, which led to presentations at several international health policy conferences.",
        "One of the most valuable aspects of the PSF program was the professional development opportunities. Through their network, I secured an internship with the World Health Organization's regional office, which gave me practical experience in international health policy and program implementation.",
        "After graduating in 2021, I joined a healthcare NGO that operates across the Middle East, where I now help design and implement community health programs for vulnerable populations. The skills and perspectives I gained through my education allow me to contribute meaningfully to improving healthcare access for those who need it most.",
        "My story is just one example of how educational investment can transform not just individual lives but entire communities. The Palestinian Student Fund didn't just help me achieve my academic goals – they enabled me to become an agent of change in a field that desperately needs innovative solutions."
      ],
      ar: [
        "بدأت رحلتي في الصحة العامة في عيادات رام الله، حيث تطوعت خلال سنوات دراستي الجامعية. شاهدت مباشرة التحديات التي تواجه نظام الرعاية الصحية لدينا – الموارد المحدودة، والوصول المقيد إلى الإمدادات الطبية، وتأثير النزاع المستمر على صحة المجتمع.",
        "بعد إكمال درجة البكالوريوس في علم الأحياء في جامعة بيرزيت، كنت مصممة على اكتساب المعرفة والمهارات اللازمة لمعالجة تحديات الرعاية الصحية النظامية هذه. ومع ذلك، كانت فرص التعليم العالي المتخصص في الصحة العامة محدودة في فلسطين، وبدت البرامج الدولية بعيدة المنال مالياً.",
        "غير صندوق الطلاب الفلسطينيين كل شيء بالنسبة لي. لم يغط برنامج المنح الدراسية الخاص بهم الرسوم الدراسية ومصاريف المعيشة في جامعة أنقرة فحسب، بل قدم أيضاً دعم اللغة لمساعدتي في التكيف مع الدراسة باللغة التركية. كان الانتقال صعباً، لكن شبكة الدعم التابعة للمؤسسة جعلته قابلاً للإدارة.",
        "خلال برنامج الماجستير، ركزت بحثي على الوصول إلى الرعاية الصحية في مناطق النزاع، مستمدة من كل من المعرفة الأكاديمية وتجربتي الشخصية. كان أساتذتي داعمين وشجعوني على نشر نتائجي، مما أدى إلى تقديم عروض في عدة مؤتمرات دولية لسياسة الصحة.",
        "كان أحد أكثر جوانب برنامج صندوق الطلاب الفلسطينيين قيمة هو فرص التطوير المهني. من خلال شبكتهم، حصلت على تدريب في المكتب الإقليمي لمنظمة الصحة العالمية، مما منحني خبرة عملية في سياسة الصحة الدولية وتنفيذ البرامج.",
        "بعد التخرج في عام 2021، انضممت إلى منظمة غير حكومية للرعاية الصحية تعمل في جميع أنحاء الشرق الأوسط، حيث أساعد الآن في تصميم وتنفيذ برامج الصحة المجتمعية للسكان الضعفاء. تسمح لي المهارات والمنظورات التي اكتسبتها من خلال تعليمي بالمساهمة بشكل هادف في تحسين الوصول إلى الرعاية الصحية لمن هم في أمس الحاجة إليها.",
        "قصتي هي مجرد مثال واحد على كيف يمكن للاستثمار التعليمي أن يحول ليس فقط حياة الفرد ولكن المجتمعات بأكملها. لم يساعدني صندوق الطلاب الفلسطينيين في تحقيق أهدافي الأكاديمية فحسب – بل مكنني من أن أصبح عاملاً للتغيير في مجال يحتاج بشدة إلى حلول مبتكرة."
      ]
    },
    achievements: {
      en: [
        "Published research on healthcare access in conflict zones in the International Journal of Public Health",
        "Completed an internship with the World Health Organization's regional office",
        "Received the Dean's Award for Academic Excellence at Ankara University",
        "Helped establish three mobile health clinics serving underserved communities",
        "Currently mentors 15 young Palestinian women pursuing careers in healthcare"
      ],
      ar: [
        "نشرت بحثاً عن الوصول إلى الرعاية الصحية في مناطق النزاع في المجلة الدولية للصحة العامة",
        "أكملت تدريباً في المكتب الإقليمي لمنظمة الصحة العالمية",
        "حصلت على جائزة العميد للتميز الأكاديمي في جامعة أنقرة",
        "ساعدت في إنشاء ثلاث عيادات صحية متنقلة تخدم المجتمعات المحرومة",
        "تقوم حالياً بتوجيه 15 شابة فلسطينية يسعين لممارسة مهن في مجال الرعاية الصحية"
      ]
    },
    testimonial: {
      en: "Education is powerful not just for what it teaches you from books, but for how it transforms your ability to create meaningful change in the world.",
      ar: "التعليم قوي ليس فقط لما يعلمك إياه من الكتب، ولكيفية تحويل قدرتك على خلق تغيير هادف في العالم."
    },
    relatedStories: [
      {
        id: "yousef-darwish",
        slug: "yousef-darwish",
        name: {
          en: "Yousef Darwish",
          ar: "يوسف درويش"
        },
        degree: {
          en: "Bachelor's in Medicine",
          ar: "بكالوريوس في الطب"
        },
        university: {
          en: "Hacettepe University",
          ar: "جامعة حسيتيب"
        },
        graduationYear: "2022",
        hometown: {
          en: "Gaza, Palestine",
          ar: "غزة، فلسطين"
        },
        quote: {
          en: "Becoming a doctor was my childhood dream. Now I can return to Gaza with the skills to help my community's healthcare system.",
          ar: "كون طبيباً كان حلمي منذ الطفولة. الآن يمكنني العودة إلى غزة بالمهارات لمساعدة نظام الرعاية الصحية في مجتمعي."
        },
        story: {
          en: ["Sample story"],
          ar: ["قصة نموذجية"]
        },
        achievements: {
          en: ["Sample achievement"],
          ar: ["إنجاز نموذجي"]
        },
        testimonial: {
          en: "Sample testimonial",
          ar: "شهادة نموذجية"
        },
        relatedStories: []
      }
    ]
  },
  "omar-khalidi": {
    id: "omar-khalidi",
    slug: "omar-khalidi",
    name: {
      en: "Omar Khalidi",
      ar: "عمر خليدي"
    },
    degree: {
      en: "Bachelor's in Mechanical Engineering",
      ar: "بكالوريوس في الهندسة الميكانيكية"
    },
    university: {
      en: "Boğaziçi University",
      ar: "جامعة بوغازيشي"
    },
    graduationYear: "2023",
    hometown: {
      en: "Jenin, Palestine",
      ar: "جنين، فلسطين"
    },
    quote: {
      en: "From refugee camps to engineering labs, my journey would not have been possible without the foundation's unwavering support.",
      ar: "من مخيمات الهجرة إلى أبحاث الهندسة الميكانيكية، لم تكن رحلتي ممكنة بدون دعم الأساسي المستمر."
    },
    story: {
      en: [
        "Growing up in a refugee camp in Jenin, I developed a fascination with how things work and a desire to build a better future through engineering. Despite the challenging circumstances, I excelled in my studies and dreamed of pursuing higher education in mechanical engineering.",
        "The Palestinian Student Fund's scholarship program opened the door to Boğaziçi University, one of Turkey's most prestigious institutions. The transition from refugee camp to university life was challenging, but the foundation's comprehensive support system helped me adapt and thrive.",
        "During my studies, I focused on sustainable energy solutions, particularly relevant to the energy challenges faced in Palestine. My final year project, which developed a low-cost solar water heating system, won recognition at the university's engineering fair.",
        "The foundation's mentorship program connected me with Palestinian engineers working in Turkey, providing valuable guidance and networking opportunities. These connections led to an internship at a leading renewable energy company in Istanbul.",
        "After graduating in 2023, I returned to Palestine with new skills and knowledge, ready to contribute to the development of sustainable energy solutions in my community. I'm now working with local organizations to implement renewable energy projects in refugee camps.",
        "My journey from refugee camp to engineering graduate demonstrates the transformative power of education and the importance of organizations like the Palestinian Student Fund in creating opportunities for young Palestinians."
      ],
      ar: [
        "نشأت في مخيم للاجئين في جنين، طورت شغفاً بكيفية عمل الأشياء ورغبة في بناء مستقبل أفضل من خلال الهندسة. على الرغم من الظروف الصعبة، تفوقت في دراستي وحلمت بمتابعة التعليم العالي في الهندسة الميكانيكية.",
        "فتح برنامج المنح الدراسية التابع لصندوق الطلاب الفلسطينيين الباب أمام جامعة بوغازيشي، إحدى أعرق المؤسسات في تركيا. كان الانتقال من مخيم اللاجئين إلى الحياة الجامعية صعباً، لكن نظام الدعم الشامل التابع للمؤسسة ساعدني على التكيف والازدهار.",
        "خلال دراستي، ركزت على حلول الطاقة المستدامة، وخاصة المتعلقة بتحديات الطاقة التي تواجهها فلسطين. فاز مشروع السنة النهائية الخاص بي، الذي طور نظام تسخين المياه بالطاقة الشمسية منخفض التكلفة، بالاعتراف في معرض الهندسة بالجامعة.",
        "ربطني برنامج الإرشاد التابع للمؤسسة بمهندسين فلسطينيين يعملون في تركيا، مما وفر رؤى قيمة حول نهج مختلفة للحفاظ المعماري والتطوير الحضري.",
        "بعد التخرج في عام 2023، عدت إلى فلسطين بمهارات ومعرفة جديدة، مستعداً للمساهمة في تطوير حلول الطاقة المستدامة في مجتمعي. أعمل الآن مع منظمات محلية لتنفيذ مشاريع الطاقة المتجددة في مخيمات اللاجئين.",
        "تظهر رحلتي من مخيم اللاجئين إلى خريج الهندسة القوة التحويلية للتعليم وأهمية منظمات مثل صندوق الطلاب الفلسطينيين في خلق فرص للشباب الفلسطينيين."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  },
  "nour-al-jabari": {
    id: "nour-al-jabari",
    slug: "nour-al-jabari",
    name: {
      en: "Nour Al-Jabari",
      ar: "نور الجباري"
    },
    degree: {
      en: "PhD in Biochemistry",
      ar: "دكتوراه في الكيمياء الحيوية"
    },
    university: {
      en: "Sabancı University",
      ar: "جامعة صباحكي"
    },
    graduationYear: "2020",
    hometown: {
      en: "Hebron, Palestine",
      ar: "الخليل، فلسطين"
    },
    quote: {
      en: "The mentorship program connected me with leading researchers in my field, helping me publish my work in international journals.",
      ar: "برنامج الإشراف الذي سمح لي بالتواصل مع الباحثين المتقدمين في مجالي، مساعدتي في نشر عملي في المجلات الدولية."
    },
    story: {
      en: [
        "My passion for biochemistry began in the laboratories of Hebron University, where I first discovered the fascinating world of molecular biology. Despite limited resources, I pursued my interest in research, which led to several publications during my undergraduate years.",
        "The opportunity to pursue a PhD at Sabancı University through the Palestinian Student Fund's scholarship program was a turning point in my academic career. The university's state-of-the-art facilities and international research environment provided the perfect setting for my studies.",
        "My research focused on developing new methods for early cancer detection, particularly relevant to the healthcare challenges in Palestine. The PSF's mentorship program connected me with leading researchers in the field, which significantly enhanced my research capabilities.",
        "During my PhD, I published several papers in high-impact journals and presented my work at international conferences. The foundation's support extended beyond academics, helping me navigate the challenges of living and researching in a new country.",
        "After completing my PhD in 2020, I joined a research team at a leading medical center in Turkey, where I continue to work on developing accessible diagnostic tools for cancer detection. I also maintain connections with research institutions in Palestine, contributing to capacity building in the local scientific community.",
        "The Palestinian Student Fund not only supported my academic journey but also helped me become part of a global scientific community. Their investment in my education has enabled me to contribute to both international research and the development of scientific capabilities in Palestine."
      ],
      ar: [
        "بدأ شغفي بالكيمياء الحيوية في مختبرات جامعة الخليل، حيث اكتشفت لأول مرة عالم البيولوجيا الجزيئية الرائع. على الرغم من الموارد المحدودة، تابعت اهتمامي بالبحث، مما أدى إلى عدة منشورات خلال سنوات دراستي الجامعية.",
        "كانت الفرصة لمتابعة الدكتوراه في جامعة صباحكي من خلال برنامج المنح الدراسية التابع لصندوق الطلاب الفلسطينيين نقطة تحول في مسيرتي الأكاديمية. وفرت مرافق الجامعة المتطورة وبيئة البحث الدولية الإعداد المثالي لدراستي.",
        "ركز بحثي على تطوير طرق جديدة للكشف المبكر عن السرطان، وخاصة المتعلقة بتحديات الرعاية الصحية في فلسطين. ربطني برنامج الإرشاد التابع لصندوق الطلاب الفلسطينيين بباحثين رائدين في المجال، مما عزز بشكل كبير قدراتي البحثية.",
        "خلال الدكتوراه، نشرت عدة أوراق في مجلات عالية التأثير وعرضت عملي في مؤتمرات دولية. امتد دعم المؤسسة إلى ما هو أبعد من الأكاديميين، مما ساعدني في تخطي تحديات العيش والبحث في بلد جديد.",
        "بعد إكمال الدكتوراه في عام 2020، انضممت إلى فريق بحثي في مركز طبي رائد في تركيا، حيث أواصل العمل على تطوير أدوات تشخيصية متاحة للكشف عن السرطان. أحافظ أيضاً على اتصالات مع مؤسسات البحث في فلسطين، مما يساهم في بناء القدرات في المجتمع العلمي المحلي.",
        "لم يدعم صندوق الطلاب الفلسطينيين رحلتي الأكاديمية فحسب، بل ساعدني أيضاً في أن أصبح جزءاً من المجتمع العلمي العالمي. مكن استثمارهم في تعليمي من المساهمة في كل من البحث الدولي وتطوير القدرات العلمية في فلسطين."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  },
  "sami-barakat": {
    id: "sami-barakat",
    slug: "sami-barakat",
    name: {
      en: "Sami Barakat",
      ar: "سامي بركات"
    },
    degree: {
      en: "Master's in Architecture",
      ar: "ماجستير في الهندسة المعمارية"
    },
    university: {
      en: "Middle East Technical University",
      ar: "جامعة خليج الشرق الأوسط التقنية"
    },
    graduationYear: "2022",
    hometown: {
      en: "Jerusalem, Palestine",
      ar: "القدس، فلسطين"
    },
    quote: {
      en: "Studying architecture has given me the tools to envision rebuilding my homeland. This scholarship was the foundation of that dream.",
      ar: "دراسة الهندسة المعمارية أعطاني الأدوات لتخيل بناء بلدي. كانت هذه المنحة الأساسية لهذا الحلم."
    },
    story: {
      en: [
        "Growing up in Jerusalem, I developed a deep appreciation for the city's architectural heritage and a desire to contribute to its preservation and development. My interest in architecture was shaped by the contrast between the city's historic buildings and modern developments.",
        "The Palestinian Student Fund's scholarship enabled me to pursue my master's degree at Middle East Technical University, where I focused on sustainable architecture and urban planning. The program's emphasis on both traditional and modern architectural approaches was particularly relevant to my goals.",
        "During my studies, I specialized in heritage conservation and adaptive reuse of historic buildings. My thesis project, which proposed a sustainable approach to preserving Jerusalem's architectural heritage, received recognition from the university's architecture department.",
        "The foundation's network connected me with Palestinian architects working in Turkey and internationally, providing valuable insights into different approaches to architectural preservation and urban development.",
        "After graduating in 2022, I returned to Jerusalem with new skills and perspectives. I now work with local organizations on projects that combine traditional architectural elements with modern sustainable practices, contributing to the preservation of the city's unique character while addressing contemporary needs.",
        "The Palestinian Student Fund's support not only helped me achieve my academic goals but also enabled me to contribute to the preservation and development of Jerusalem's architectural heritage, which is crucial for maintaining the city's cultural identity."
      ],
      ar: [
        "نشأت في القدس، طورت تقديراً عميقاً للتراث المعماري للمدينة ورغبة في المساهمة في الحفاظ عليها وتطويرها. تشكل اهتمامي بالهندسة المعمارية من خلال التباين بين المباني التاريخية للمدينة والتطورات الحديثة.",
        "مكنت منحة صندوق الطلاب الفلسطينيين من متابعة درجة الماجستير في جامعة الشرق الأوسط التقنية، حيث ركزت على الهندسة المعمارية المستدامة والتخطيط الحضري. كان تركيز البرنامج على كل من النهج المعمارية التقليدية والحديثة مناسباً بشكل خاص لأهدافي.",
        "خلال دراستي، تخصصت في الحفاظ على التراث وإعادة استخدام المباني التاريخية. حصل مشروع أطروحتي، الذي اقترح نهجاً مستداماً للحفاظ على التراث المعماري للقدس، على اعتراف من قسم الهندسة المعمارية بالجامعة.",
        "ربطتني شبكة المؤسسة بمهندسين معماريين فلسطينيين يعملون في تركيا ودولياً، مما وفر رؤى قيمة حول نهج مختلفة للحفاظ المعماري والتطوير الحضري.",
        "بعد التخرج في عام 2022، عدت إلى القدس بمهارات ووجهات نظر جديدة. أعمل الآن مع منظمات محلية على مشاريع تجمع بين العناصر المعمارية التقليدية والممارسات المستدامة الحديثة، مما يساهم في الحفاظ على الطابع الفريد للمدينة مع معالجة الاحتياجات المعاصرة.",
        "لم يساعد دعم صندوق الطلاب الفلسطينيين في تحقيق أهدافي الأكاديمية فحسب، بل مكنني أيضاً من المساهمة في الحفاظ على التراث المعماري للقدس وتطويره، وهو أمر حاسم للحفاظ على الهوية الثقافية للمدينة."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  },
  "rania-abed": {
    id: "rania-abed",
    slug: "rania-abed",
    name: {
      en: "Rania Abed",
      ar: "رانيا عبد"
    },
    degree: {
      en: "Bachelor's in Computer Engineering",
      ar: "بكالوريوس في الهندسة الكمبيوترية"
    },
    university: {
      en: "Bilkent University",
      ar: "جامعة بيلكنت"
    },
    graduationYear: "2021",
    hometown: {
      en: "Nablus, Palestine",
      ar: "نابلس، فلسطين"
    },
    quote: {
      en: "As a woman in STEM, I faced many challenges. The foundation provided not just financial support, but a community that believed in me.",
      ar: "كانت الهندسة الكمبيوترية مجالًا صعبًا للإنسان، لكن الأساسية توفرت عليّ دعمًا غير ماليًا بالإضافة إلى مجموعة تؤمن بي."
    },
    story: {
      en: [
        "My interest in computer engineering began in Nablus, where I first discovered the power of technology to solve real-world problems. Despite societal expectations and limited resources, I pursued my passion for technology and programming.",
        "The Palestinian Student Fund's scholarship program opened the door to Bilkent University, where I could fully immerse myself in computer engineering. The transition was challenging, but the foundation's support network helped me overcome cultural and academic barriers.",
        "During my studies, I focused on artificial intelligence and machine learning, areas that I believe can have significant impact in Palestine. My final year project, which developed an AI-based system for early detection of plant diseases, won recognition at the university's engineering fair.",
        "The foundation's mentorship program connected me with other Palestinian women in STEM, providing valuable guidance and creating a supportive community. These connections helped me navigate the challenges of being a woman in a male-dominated field.",
        "After graduating in 2021, I joined a tech startup in Turkey, where I work on developing AI solutions for agricultural applications. I also maintain connections with tech initiatives in Palestine, contributing to efforts to increase women's participation in STEM fields.",
        "The Palestinian Student Fund not only supported my education but also helped me become part of a community of women in STEM. Their investment in my journey has enabled me to break barriers and inspire other young Palestinian women to pursue careers in technology."
      ],
      ar: [
        "بدأ اهتمامي بالهندسة الكمبيوترية في نابلس، حيث اكتشفت لأول مرة قوة التكنولوجيا في حل مشاكل العالم الحقيقي. على الرغم من التوقعات المجتمعية والموارد المحدودة، تابعت شغفي بالتكنولوجيا والبرمجة.",
        "فتح برنامج المنح الدراسية التابع لصندوق الطلاب الفلسطينيين الباب أمام جامعة بيلكنت، حيث يمكنني الانغماس الكامل في الهندسة الكمبيوترية. كان الانتقال صعباً، لكن شبكة الدعم التابعة للمؤسسة ساعدتني في التغلب على الحواجز الثقافية والأكاديمية.",
        "خلال دراستي، ركزت على الذكاء الاصطناعي والتعلم الآلي، وهي مجالات أعتقد أنها يمكن أن يكون لها تأثير كبير في فلسطين. فاز مشروع السنة النهائية الخاص بي، الذي طور نظاماً قائماً على الذكاء الاصطناعي للكشف المبكر عن أمراض النباتات، بالاعتراف في معرض الهندسة بالجامعة.",
        "ربطتني شبكة المؤسسة بمهندسين بيئيين يعملون في تركيا ودولياً، مما وفر رؤى قيمة حول نهج مختلفة لإدارة المياه وحماية البيئة.",
        "بعد التخرج في عام 2021، عدت إلى غزة بمهارات ومعرفة جديدة، مستعدة للمساهمة في معالجة التحديات البيئية في المنطقة. أعمل الآن مع منظمات محلية على مشاريع تنفذ حلول إدارة المياه المستدامة.",
        "لم يدعم صندوق الطلاب الفلسطينيين أهدافي الأكاديمية فحسب، بل مكنني أيضاً من المساهمة في جهود حماية البيئة في غزة. مكن استثمارهم في تعليمي من تطوير حلول عملية للتحديات البيئية الحرجة."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  },
  "kareem-nasser": {
    id: "kareem-nasser",
    slug: "kareem-nasser",
    name: {
      en: "Kareem Nasser",
      ar: "كريم ناصر"
    },
    degree: {
      en: "PhD in Political Science",
      ar: "دكتوراه في العلوم السياسية"
    },
    university: {
      en: "Koç University",
      ar: "جامعة خوك"
    },
    graduationYear: "2019",
    hometown: {
      en: "Bethlehem, Palestine",
      ar: "بيت لحم، فلسطين"
    },
    quote: {
      en: "My research on conflict resolution was made possible through this scholarship. I'm now working with international organizations on peace initiatives.",
      ar: "دراستي على حل الصراعات كانت ممكنة بفضل هذه المنحة، وأنا الآن أعمل مع منظمات دولية لتنفيذ مبادرات السلام."
    },
    story: {
      en: [
        "My interest in political science and conflict resolution began in Bethlehem, where I witnessed firsthand the impact of political dynamics on daily life. This experience shaped my desire to understand and contribute to peace-building processes.",
        "The Palestinian Student Fund's scholarship enabled me to pursue my PhD at Koç University, where I focused on conflict resolution and peace studies. The program's international perspective and emphasis on practical solutions aligned perfectly with my research interests.",
        "During my doctoral studies, I conducted extensive research on peace-building initiatives in the Middle East, with a particular focus on youth engagement in conflict resolution. My work was published in several international journals and presented at major conferences.",
        "The foundation's network connected me with scholars and practitioners in the field of conflict resolution, providing valuable insights and opportunities for collaboration. These connections were instrumental in developing my research and professional network.",
        "After completing my PhD in 2019, I joined an international peace-building organization, where I work on developing and implementing conflict resolution programs in the Middle East. I also maintain academic connections, teaching courses on peace studies and conflict resolution.",
        "The Palestinian Student Fund's support not only helped me achieve my academic goals but also enabled me to contribute to peace-building efforts in the region. Their investment in my education has allowed me to bridge the gap between academic research and practical peace-building initiatives."
      ],
      ar: [
        "بدأ اهتمامي بالعلوم السياسية وحل النزاعات في بيت لحم، حيث شهدت مباشرة تأثير الديناميكيات السياسية على الحياة اليومية. شكلت هذه التجربة رغبتي في فهم والمساهمة في عمليات بناء السلام.",
        "مكنت منحة صندوق الطلاب الفلسطينيين من متابعة الدكتوراه في جامعة خوك، حيث ركزت على حل النزاعات ودراسات السلام. كان المنظور الدولي للبرنامج وتركيزه على الحلول العملية متوافقاً تماماً مع اهتماماتي البحثية.",
        "خلال دراستي الدكتوراه، أجريت بحثاً مكثفاً حول مبادرات بناء السلام في الشرق الأوسط، مع التركيز بشكل خاص على مشاركة الشباب في حل النزاعات. نُشر عملي في عدة مجلات دولية وعُرض في مؤتمرات رئيسية.",
        "ربطتني شبكة المؤسسة بباحثين وممارسين في مجال حل النزاعات، مما وفر رؤى قيمة وفرص للتعاون. كانت هذه الاتصالات مفيدة في تطوير بحثي وشبكتي المهنية.",
        "بعد إكمال الدكتوراه في عام 2019، انضممت إلى منظمة دولية لبناء السلام، حيث أعمل على تطوير وتنفيذ برامج حل النزاعات في الشرق الأوسط. أحافظ أيضاً على اتصالات أكاديمية، وأدرس دورات في دراسات السلام وحل النزاعات.",
        "لم يدعم صندوق الطلاب الفلسطينيين أهدافي الأكاديمية فحسب، بل مكنني أيضاً من المساهمة في جهود بناء السلام في المنطقة. مكن استثمارهم في تعليمي من سد الفجوة بين البحث الأكاديمي ومبادرات بناء السلام العملية."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  },
  "leila-hamdan": {
    id: "leila-hamdan",
    slug: "leila-hamdan",
    name: {
      en: "Leila Hamdan",
      ar: "ليلى حمدان"
    },
    degree: {
      en: "Master's in Environmental Engineering",
      ar: "ماجستير في الهندسة البيئية"
    },
    university: {
      en: "Yıldız Technical University",
      ar: "جامعة إيلديز التقنية"
    },
    graduationYear: "2020",
    hometown: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين"
    },
    quote: {
      en: "Studying environmental engineering has equipped me with the knowledge to address water scarcity issues in Palestine.",
      ar: "دراسة الهندسة البيئية أعطتني المعرفة لمعالجة أزمة نقص المياه في فلسطين."
    },
    story: {
      en: [
        "Growing up in Gaza, I witnessed the critical environmental challenges facing our community, particularly water scarcity and pollution. These experiences inspired my interest in environmental engineering and sustainable solutions.",
        "The Palestinian Student Fund's scholarship program enabled me to pursue my master's degree at Yıldız Technical University, where I focused on water resource management and environmental protection. The program's emphasis on practical solutions was particularly relevant to the challenges in Gaza.",
        "During my studies, I specialized in water treatment and recycling systems, developing solutions that could be implemented in resource-constrained environments. My thesis project, which proposed an innovative approach to water purification in Gaza, received recognition from the university's engineering department.",
        "The foundation's network connected me with environmental engineers working in Turkey and internationally, providing valuable insights into different approaches to water management and environmental protection.",
        "After graduating in 2020, I returned to Gaza with new skills and knowledge, ready to contribute to addressing the region's environmental challenges. I now work with local organizations on projects that implement sustainable water management solutions.",
        "The Palestinian Student Fund's support not only helped me achieve my academic goals but also enabled me to contribute to environmental protection efforts in Gaza. Their investment in my education has allowed me to develop practical solutions to critical environmental challenges."
      ],
      ar: [
        "نشأت في غزة، شهدت التحديات البيئية الحرجة التي تواجه مجتمعنا، وخاصة ندرة المياه والتلوث. ألهمتني هذه التجارب اهتمامي بالهندسة البيئية والحلول المستدامة.",
        "مكن برنامج المنح الدراسية التابع لصندوق الطلاب الفلسطينيين من متابعة درجة الماجستير في جامعة إيلديز التقنية، حيث ركزت على إدارة الموارد المائية وحماية البيئة. كان تركيز البرنامج على الحلول العملية مناسباً بشكل خاص للتحديات في غزة.",
        "خلال دراستي، تخصصت في أنظمة معالجة المياه وإعادة التدوير، وتطوير حلول يمكن تنفيذها في البيئات محدودة الموارد. حصل مشروع أطروحتي، الذي اقترح نهجاً مبتكراً لتنقية المياه في غزة، على اعتراف من قسم الهندسة بالجامعة.",
        "ربطتني شبكة المؤسسة بمهندسين بيئيين يعملون في تركيا ودولياً، مما وفر رؤى قيمة حول نهج مختلفة لإدارة المياه وحماية البيئة.",
        "بعد التخرج في عام 2020، عدت إلى غزة بمهارات ومعرفة جديدة، مستعدة للمساهمة في معالجة التحديات البيئية في المنطقة. أعمل الآن مع منظمات محلية على مشاريع تنفذ حلول إدارة المياه المستدامة.",
        "لم يدعم صندوق الطلاب الفلسطينيين أهدافي الأكاديمية فحسب، بل مكنني أيضاً من المساهمة في جهود حماية البيئة في غزة. مكن استثمارهم في تعليمي من تطوير حلول عملية للتحديات البيئية الحرجة."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  },
  "yousef-darwish": {
    id: "yousef-darwish",
    slug: "yousef-darwish",
    name: {
      en: "Yousef Darwish",
      ar: "يوسف درويش"
    },
    degree: {
      en: "Bachelor's in Medicine",
      ar: "بكالوريوس في الطب"
    },
    university: {
      en: "Hacettepe University",
      ar: "جامعة حسيتيب"
    },
    graduationYear: "2022",
    hometown: {
      en: "Gaza, Palestine",
      ar: "غزة، فلسطين"
    },
    quote: {
      en: "Becoming a doctor was my childhood dream. Now I can return to Gaza with the skills to help my community's healthcare system.",
      ar: "كون طبيباً كان حلمي منذ الطفولة، والآن أستطيع أن أعود إلى غزة مع المهارات لمساعدة نظام الرعاية الصحية في مجتمعي."
    },
    story: {
      en: [
        "My journey to becoming a doctor began in Gaza, where I witnessed the critical need for healthcare professionals. The challenges faced by the healthcare system in Gaza, particularly during times of crisis, inspired my commitment to medicine.",
        "The Palestinian Student Fund's scholarship program enabled me to pursue my medical degree at Hacettepe University, one of Turkey's leading medical schools. The program's comprehensive curriculum and clinical training provided an excellent foundation for my medical career.",
        "During my studies, I focused on emergency medicine and trauma care, areas that are particularly relevant to the healthcare needs in Gaza. My clinical rotations in various departments gave me valuable experience in different medical specialties.",
        "The foundation's support extended beyond academics, helping me navigate the challenges of studying medicine in a foreign country. Their network connected me with Palestinian doctors working in Turkey, providing valuable mentorship and guidance.",
        "After graduating in 2022, I returned to Gaza with new skills and knowledge, ready to contribute to the healthcare system. I now work in a major hospital in Gaza, where I apply my training to help patients in need.",
        "The Palestinian Student Fund not only supported my education but also helped me achieve my dream of becoming a doctor. Their investment in my journey has enabled me to contribute to healthcare in Gaza, making a difference in the lives of my community."
      ],
      ar: [
        "بدأت رحلتي لتصبح طبيباً في غزة، حيث شهدت الحاجة الحرجة لمهنيي الرعاية الصحية. ألهمتني التحديات التي تواجهها أنظمة الرعاية الصحية في غزة، وخاصة خلال أوقات الأزمات، بالتزامي بالطب.",
        "مكن برنامج المنح الدراسية التابع لصندوق الطلاب الفلسطينيين من متابعة درجة الطب في جامعة حسيتيب، إحدى كليات الطب الرائدة في تركيا. وفر المنهج الشامل للبرنامج والتدريب السريري أساساً ممتازاً لمهنتي الطبية.",
        "خلال دراستي، ركزت على طب الطوارئ ورعاية الصدمات، وهي مجالات ذات صلة خاصة باحتياجات الرعاية الصحية في غزة. أعطتني دوراتي السريرية في مختلف الأقسام خبرة قيمة في التخصصات الطبية المختلفة.",
        "امتد دعم المؤسسة إلى ما هو أبعد من الأكاديميين، مما ساعدني في تخطي تحديات دراسة الطب في بلد أجنبي. ربطتني شبكتهم بأطباء فلسطينيين يعملون في تركيا، مما وفر إرشادات وتوجيهات قيمة.",
        "بعد التخرج في عام 2022، عدت إلى غزة بمهارات ومعرفة جديدة، مستعداً للمساهمة في نظام الرعاية الصحية. أعمل الآن في مستشفى رئيسي في غزة، حيث أطبق تدريبي لمساعدة المرضى المحتاجين.",
        "لم يدعم صندوق الطلاب الفلسطينيين تعليمي فحسب، بل ساعدني أيضاً في تحقيق حلمي في أن أصبح طبيباً. مكن استثمارهم في رحلتي من المساهمة في الرعاية الصحية في غزة، مما أحدث فرقاً في حياة مجتمعي."
      ]
    },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  }
}

export default function SuccessStoryPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const isRTL = language === 'ar'
  const slug = params.slug as string

  // Find the story based on the English slug
  const story = successStories[slug] || {
    id: "not-found",
    slug: "not-found",
    name: { en: "Story Not Found", ar: "القصة غير موجودة" },
    degree: { en: "", ar: "" },
    university: { en: "", ar: "" },
    graduationYear: "",
    hometown: { en: "", ar: "" },
    quote: { en: "", ar: "" },
    story: { en: [""], ar: [""] },
    achievements: { en: [""], ar: [""] },
    testimonial: { en: "", ar: "" },
    relatedStories: []
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize progress bar
    const progressBar = document.querySelector(".progress-bar")
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-[#f8faf8]">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <GSAPTextReveal className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${isRTL ? 'font-arabic' : ''} text-gray-900`}>
              {story.name[language]}
            </GSAPTextReveal>
            <GSAPReveal animation="fade" delay={0.2}>
              <p className={`mt-4 text-xl text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {story.degree[language]} • {story.university[language]}
              </p>
              <p className={`mt-2 text-lg text-[#1e7e34] ${isRTL ? 'font-arabic' : ''}`}>
                {story.hometown[language]} • {story.graduationYear}
              </p>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <GSAPReveal animation="fade">
              <div className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? 'font-arabic text-right' : ''}`}>
                <blockquote className="border-l-4 border-[#1e7e34] pl-4 italic text-xl">
                  "{story.quote[language]}"
                </blockquote>
                {story.story[language].map((paragraph, index) => (
                  <p key={index} className="mt-6">{paragraph}</p>
                ))}
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Back to Stories Button */}
      <section className="py-16 md:py-24 bg-[#f8faf8]">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <GSAPReveal animation="fade">
              <Link href="/success-stories">
                <Button variant="outline" className={`${isRTL ? 'font-arabic' : ''}`}>
                  <ArrowLeft className={`${isRTL ? 'ml-2 rotate-180' : 'mr-2'} h-4 w-4`} />
                  {t("success_stories.back_to_stories") as string}
                </Button>
              </Link>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
