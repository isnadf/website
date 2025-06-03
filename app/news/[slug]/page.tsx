"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"

// Define the type for article data
type ArticleData = {
  title: string
  date: string
  author: string
  category: string
  image: string
  heroImage?: string
  content: string[]
  relatedArticles: {
    id: number
    title: string
    date: string
    excerpt: string
    image: string
    href: string
    category: string
  }[]
}

// Mock news article data
const newsArticles: Record<string, ArticleData> = {
  "nabd-al-hayat-scholarship-interviews": {
    title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
    date: "May 25, 2025",
    author: "Isnad Foundation",
    category: "Scholarships",
    image: "/LastNews/pulseOFLife-end.png",
    heroImage: "/LastNews/pulseOFLife-end.png",
    content: [
      "إسطنبول / تركيا",
      "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو، بمشاركة عشرات الطلبة الفلسطينيين المتفوقين في تخصص الطب البشري، من خريجي ومقيدي جامعات قطاع غزة.",
      "وقد جرت المقابلات عن بُعد عبر الإنترنت، وهدفت إلى التعرف عن كثب على الظروف الأكاديمية والمعيشية للطلبة، وتقييم مدى استحقاقهم للدعم، وذلك بعد اجتيازهم مرحلة التصفية الأولية من خلال التسجيل الإلكتروني.",
      "وتمنح مؤسسة إسناد، في هذه المرحلة التي أُطلقت بشراكة استراتيجية مع مؤسسة الخدمت يوروب (Alkhidmat Europe)، دعماً مالياً شهرياً لمدة 12 شهراً للطلبة المقبولين، في خطوة تهدف إلى التخفيف من أعبائهم الدراسية وتمكينهم من مواصلة تعليمهم العالي في ظل التحديات القائمة.",
      "وتُعد منحة \"نبض الحياة\" من أبرز البرامج التي أطلقتها مؤسسة إسناد والتي تركز بشكل خاص على دعم الطلبة الفلسطينيين في التخصصات الطبية، ولا سيما من قطاع غزة، الذين تأثرت مسيرتهم التعليمية جراء الأوضاع الإنسانية القاسية والحصار والحروب المتكررة.",
      "ويستهدف البرنامج في مراحله المتتالية تمكين نحو 1000 طالب فلسطيني من استكمال دراستهم الطبية، ضمن خطة طموحة تمتد على خمس سنوات، تُعنى بالاستثمار في الكفاءات العلمية الشابة، وإعداد جيل طبي مؤهل يساهم في خدمة المجتمع الفلسطيني وتعزيز صموده.",
      "وتُعد مؤسسة إسناد مؤسسة فلسطينية مستقلة غير ربحية، تُكرّس جهودها لدعم التعليم العالي في فلسطين، من خلال تقديم منح دراسية وتنموية مستدامة، ترتكز على رؤية شاملة لبناء الإنسان الفلسطيني وتمكينه من خلال العلم والمعرفة."
    ],
    relatedArticles: [
      {
        id: 1,
        title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
        date: "May 25, 2025",
        excerpt: "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو.",
        image: "/LastNews/1.png",
        href: "/news/nabd-al-hayat-scholarship-interviews",
        category: "Scholarships",
      },
      {
        id: 6,
        title: "New Research Grant Opportunities",
        date: "February 15, 2023",
        excerpt: "Announcing new research grant opportunities for Palestinian scholars in STEM fields.",
        image: "/cover3.png",
        href: "/news/research-grant-opportunities",
        category: "Grants",
      },
      {
        id: 3,
        title: "Partnership with Istanbul University",
        date: "May 28, 2023",
        excerpt: "We're excited to announce our new partnership with Istanbul University to provide more opportunities.",
        image: "/cover3.png",
        href: "/news/istanbul-university-partnership",
        category: "Partnerships",
      },
    ],
  },
  "nabd-al-hayat-grant-interviews": {
    title: "استمرار مقابلات المرحلة الأولى من منحة نبض الحياة لاختيار 100 طالب من غزة للاستفادة من البرنامج",
    date: "May 5, 2025",
    author: "Isnad Foundation",
    category: "Scholarships",
    image: "/LastNews/pulseOFLife-start.png",
    heroImage: "/LastNews/pulseOFLife-start.png",
    content: [
      "إسطنبول/ تركيا – الإثنين 5 أيار 2025",
      "تواصلت اليوم الإثنين مقابلات المرحلة الأولى من برنامج منحة نبض الحياة، الذي ينفذه صندوق إسناد الطالب الفلسطيني بالشراكة مع مؤسسة الخدمات أوروبا (Alkhidmat Europe)، والتي تستهدف طلبة الطب الفلسطينيين خاصة في قطاع غزة.",
      "وجاءت هذه المقابلات امتداداً لتلك التي انعقدت الثلاثاء الماضي، حيث أجريت عبر الإنترنت بمشاركة نخبة من الطلبة الفلسطينيين الذين اجتازوا مرحلة الانتقاء الأولي، ويواصلون دراستهم في تخصصات الطب البشري في الجامعات الفلسطينية، في قطاع غزة.",
      "وسيتم ضمن المرحلة الأولى اختيار 100 طالب للاستفادة من منحة نبض الحياة، التي تقدم دعماً مالياً شهرياً على مدى 12 شهراً، إلى جانب فرص دعم أخرى تشمل أجهزة تعليمية وتغطية جزئية للرسوم الدراسية.",
      "وتأتي هذه المبادرة في إطار رؤية تنموية تهدف إلى تمكين الطلبة الفلسطينيين من مواصلة مسيرتهم الأكاديمية رغم الظروف القاسية التي خلفتها الحرب، لا سيما في ظل النزوح، وتدمير البيوت، والضغوط النفسية والاقتصادية التي يعاني منها الطلبة وأسرهم.",
      "يُشار إلى أن برنامج نبض الحياة هو أحد أبرز برامج صندوق إسناد الطالب الفلسطيني، والذي يسعى من خلاله إلى دعم أكثر من 1000 طالب خلال خمس سنوات، عبر شراكات محلية ودولية فاعلة.",
      "وصندوق إسناد هو مؤسسة فلسطينية تنموية مستقلة وغير ربحية، تُعنى بتعزيز فرص التعليم العالي للفلسطينيين من خلال تقديم منح دراسية ودعم أكاديمي للطلبة في التخصصات الحيوية، وخاصة التخصصات الطبية."
    ],
    relatedArticles: [
      {
        id: 1,
        title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
        date: "May 25, 2025",
        excerpt: "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو.",
        image: "/LastNews/1.png",
        href: "/news/nabd-al-hayat-scholarship-interviews",
        category: "Scholarships",
      },
      {
        id: 6,
        title: "New Research Grant Opportunities",
        date: "February 15, 2023",
        excerpt: "Announcing new research grant opportunities for Palestinian scholars in STEM fields.",
        image: "/cover3.png",
        href: "/news/research-grant-opportunities",
        category: "Grants",
      },
      {
        id: 3,
        title: "Partnership with Istanbul University",
        date: "May 28, 2023",
        excerpt: "We're excited to announce our new partnership with Istanbul University to provide more opportunities.",
        image: "/cover3.png",
        href: "/news/istanbul-university-partnership",
        category: "Partnerships",
      },
    ],
  },
  "new-scholarship-program": {
    title: "New Scholarship Program Launched",
    date: "June 15, 2023",
    author: "Dr. Mahmoud Abbas",
    category: "Scholarships",
    image: "/cover3.png",
    content: [
      "The Isnad Foundation is proud to announce the launch of our new scholarship program specifically designed for undergraduate students in engineering and medical fields. This initiative aims to address the growing demand for skilled professionals in these critical sectors while providing opportunities for talented Palestinian students to pursue their educational dreams.",
      "The program will offer comprehensive financial support covering tuition fees, accommodation, living expenses, and educational materials for the entire duration of the undergraduate degree. Additionally, recipients will benefit from our mentorship program, connecting them with established professionals in their fields of study.",
      '"Education is the most powerful tool we can provide to empower the next generation of Palestinian leaders," said Dr. Layla Khalid, Academic Director of the Isnad Foundation. "This new scholarship program represents our commitment to investing in fields that will drive innovation and improve quality of life in Palestinian communities."',
      "The scholarship will be available to Palestinian students worldwide who demonstrate academic excellence, financial need, and a commitment to contributing to their communities. The application process will open on July 1, 2023, with the first cohort of scholars beginning their studies in the fall semester of 2023.",
      "Eligibility criteria include Palestinian nationality or heritage, a strong academic record with a minimum GPA of 3.5 or equivalent, demonstrated financial need, and proficiency in the language of instruction at the target institution.",
      "The launch of this program follows months of consultation with educational experts, partner universities, and potential employers to ensure that the scholarship addresses real needs and provides pathways to meaningful employment after graduation.",
      "For more information about the application process, eligibility requirements, and covered institutions, please visit our Scholarships page or contact our academic advisors at info@isnadf.org.",
    ],
    relatedArticles: [
      {
        id: 5,
        title: "New Research Grant Opportunities",
        date: "February 15, 2023",
        excerpt: "Announcing new research grant opportunities for Palestinian scholars in STEM fields.",
        image: "/cover3.png",
        href: "/news/research-grant-opportunities",
        category: "Grants",
      },
      {
        id: 2,
        title: "Partnership with Istanbul University",
        date: "May 28, 2023",
        excerpt:
          "We're excited to announce our new partnership with Istanbul University to provide more opportunities.",
        image: "/cover3.png",
        href: "/news/istanbul-university-partnership",
        category: "Partnerships",
      },
      {
        id: 4,
        title: "Student Success Story: Layla's Journey",
        date: "March 22, 2023",
        excerpt: "Read about Layla's inspiring journey from Gaza to completing her PhD in Environmental Science.",
        image: "/cover3.png",
        href: "/news/student-success-layla",
        category: "Success Stories",
      },
    ],
  },
  "istanbul-university-partnership": {
    title: "Partnership with Istanbul University",
    date: "May 28, 2023",
    author: "Omar Farooq",
    category: "Partnerships",
    image: "/cover3.png",
    content: [
      "We are thrilled to announce a new strategic partnership between the Isnad Foundation and Istanbul University, one of Turkey's most prestigious educational institutions. This collaboration marks a significant milestone in our mission to expand educational opportunities for Palestinian students.",
      "The partnership will create dedicated pathways for Palestinian students to access undergraduate and graduate programs at Istanbul University, with special consideration for those facing financial barriers or displacement due to conflict.",
      '"This partnership represents a meaningful step forward in our commitment to providing quality education for Palestinian students," said Dr. Mahmoud Abbas, Executive Director of the Isnad Foundation. "Istanbul University\'s academic excellence and inclusive approach make them an ideal partner in this mission."',
      "Key components of the partnership include:",
      "• Reserved spots for qualified Palestinian students across various academic departments",
      "• Joint scholarship programs covering tuition and living expenses",
      "• Collaborative research opportunities for faculty and graduate students",
      "• Cultural exchange initiatives to foster understanding and connection",
      "• Language support programs to help students transition to Turkish-language instruction",
      'Professor Mehmet Yılmaz, Rector of Istanbul University, expressed enthusiasm about the collaboration: "We are honored to partner with the Isnad Foundation to provide educational opportunities for talented students who have faced significant challenges. This partnership aligns with our university\'s values of academic excellence, diversity, and social responsibility."',
      "The first cohort of students under this partnership will begin their studies in the Fall 2023 semester. Information sessions about available programs and application procedures will be held virtually in the coming weeks.",
      "For more information about this partnership and how to apply for the joint scholarship programs, please visit our Partnerships page or contact our academic advisors at info@isnadf.org.",
    ],
    relatedArticles: [
      {
        id: 1,
        title: "New Scholarship Program Launched",
        date: "June 15, 2023",
        excerpt: "Announcing our new scholarship program for undergraduate students in engineering and medical fields.",
        image: "/cover3.png",
        href: "/news/new-scholarship-program",
        category: "Scholarships",
      },
      {
        id: 7,
        title: "Foundation Expands Support to Lebanon",
        date: "December 12, 2022",
        excerpt: "Our foundation is expanding its support programs to reach Palestinian students in Lebanon.",
        image: "/cover3.png",
        href: "/news/lebanon-expansion",
        category: "Announcements",
      },
      {
        id: 3,
        title: "Annual Conference Success",
        date: "April 10, 2023",
        excerpt: "Our annual conference brought together students, educators, and partners from around the world.",
        image: "/cover3.png",
        href: "/news/annual-conference",
        category: "Events",
      },
    ],
  },
  "scholarships-academic-support": {
    title: "Scholarships and Academic Support",
    date: "May 15, 2024",
    author: "Isnad Foundation",
    category: "Scholarships",
    image: "/cover3.png",
    content: [
      "The Isnad Foundation is proud to announce our comprehensive scholarship and academic support program for Palestinian students. This initiative aims to provide both full and partial scholarships to talented Palestinian youth in specializations that are crucial for the labor market and society, both within Palestine and abroad.",
      "Our scholarship program covers various academic levels, from undergraduate to postgraduate studies, with a particular focus on fields that contribute to the development of Palestinian society. We work closely with partner universities and institutions to ensure our students receive the highest quality education and support.",
      "In addition to financial support, our program includes:",
      "• Academic mentoring and guidance",
      "• Career development workshops",
      "• Research opportunities",
      "• Networking events with professionals",
      "• Language support programs",
      "The program has already supported hundreds of students in achieving their educational goals, and we continue to expand our reach to help more Palestinian students access quality education.",
    ],
    relatedArticles: [
      {
        id: 1,
        title: "New Scholarship Program Launched",
        date: "June 15, 2023",
        excerpt: "Announcing our new scholarship program for undergraduate students in engineering and medical fields.",
        image: "/cover3.png",
        href: "/news/new-scholarship-program",
        category: "Scholarships",
      },
      {
        id: 2,
        title: "Partnership with Istanbul University",
        date: "May 28, 2023",
        excerpt: "We're excited to announce our new partnership with Istanbul University to provide more opportunities.",
        image: "/cover3.png",
        href: "/news/istanbul-university-partnership",
        category: "Partnerships",
      },
      {
        id: 3,
        title: "Student Success Story: Layla's Journey",
        date: "March 22, 2023",
        excerpt: "Read about Layla's inspiring journey from Gaza to completing her PhD in Environmental Science.",
        image: "/cover3.png",
        href: "/news/student-success-layla",
        category: "Success Stories",
      },
    ],
  },
  "capacity-building": {
    title: "Capacity Building and Professional Development",
    date: "May 10, 2024",
    author: "Isnad Foundation",
    category: "Professional Development",
    image: "/secondCard.png",
    content: [
      "The Isnad Foundation is committed to empowering Palestinian youth through comprehensive capacity building and professional development programs. Our initiatives focus on preparing young professionals for the competitive job market while enhancing their leadership and technical skills.",
      "Our capacity building program includes:",
      "• Professional training workshops",
      "• Leadership development programs",
      "• Technical skills enhancement",
      "• Career counseling and guidance",
      "• Industry-specific certifications",
      "• Networking opportunities with professionals",
      "These programs are designed to bridge the gap between academic education and professional requirements, ensuring our beneficiaries are well-equipped to succeed in their chosen careers.",
      "Through partnerships with industry leaders and educational institutions, we provide practical training and real-world experience that complements academic learning.",
    ],
    relatedArticles: [
      {
        id: 1,
        title: "Leadership Workshop Success",
        date: "April 15, 2024",
        excerpt: "Our recent leadership workshop trained 50 young professionals in essential management skills.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/leadership-workshop",
        category: "Professional Development",
      },
      {
        id: 2,
        title: "New Technical Training Program",
        date: "March 10, 2024",
        excerpt: "Launching a new technical training program in collaboration with leading tech companies.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/technical-training",
        category: "Professional Development",
      },
      {
        id: 3,
        title: "Career Fair 2024",
        date: "February 20, 2024",
        excerpt: "Our annual career fair connected 200 students with potential employers.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/career-fair-2024",
        category: "Events",
      },
    ],
  },
  "scientific-research": {
    title: "Scientific Research and Knowledge Contribution",
    date: "May 5, 2024",
    author: "Isnad Foundation",
    category: "Research",
    image: "/thirdCard.png?height=600&width=1200",
    content: [
      "The Isnad Foundation is dedicated to advancing scientific research and knowledge contribution in Palestine. Our research program supports innovative projects that address critical challenges facing Palestinian society while contributing to global scientific knowledge.",
      "Our research initiatives include:",
      "• Funding for applied research projects",
      "• Research grants for graduate students",
      "• Collaboration with international research institutions",
      "• Publication support and academic writing workshops",
      "• Research methodology training",
      "• Annual research symposium",
      "We particularly focus on research areas that can contribute to sustainable development in Palestine, including:",
      "• Environmental science and sustainability",
      "• Public health and medical research",
      "• Technology and innovation",
      "• Social sciences and policy research",
      "Through our partnerships with universities and research centers, we create opportunities for Palestinian researchers to contribute to global scientific discourse while addressing local challenges.",
    ],
    relatedArticles: [
      {
        id: 1,
        title: "Research Grant Winners Announced",
        date: "April 20, 2024",
        excerpt: "Congratulations to the winners of our annual research grant program.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/research-grant-winners",
        category: "Research",
      },
      {
        id: 2,
        title: "International Research Partnership",
        date: "March 15, 2024",
        excerpt: "New partnership with leading international research institutions.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/research-partnership",
        category: "Partnerships",
      },
      {
        id: 3,
        title: "Research Symposium 2024",
        date: "February 10, 2024",
        excerpt: "Our annual research symposium showcased groundbreaking Palestinian research.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/research-symposium-2024",
        category: "Events",
      },
    ],
  },
  "national-identity": {
    title: "Strengthening National Identity and Community Participation",
    date: "April 28, 2024",
    author: "Isnad Foundation",
    category: "Community",
    image: "/fourCard.png?height=600&width=1200",
    content: [
      "The Isnad Foundation is committed to strengthening national identity and promoting active community participation among Palestinian youth. Our programs aim to instill national values while encouraging meaningful engagement in public life.",
      "Our initiatives include:",
      "• Cultural awareness programs",
      "• Community leadership training",
      "• Youth empowerment workshops",
      "• Cultural heritage preservation projects",
      "• Community service initiatives",
      "• National identity workshops",
      "Through these programs, we work to:",
      "• Preserve and promote Palestinian cultural heritage",
      "• Develop leadership skills among youth",
      "• Foster community engagement",
      "• Strengthen national identity",
      "• Encourage active citizenship",
      "Our approach combines traditional values with modern methods of community engagement, ensuring that Palestinian youth remain connected to their heritage while actively contributing to society's development.",
    ],
    relatedArticles: [
      {
        id: 1,
        title: "Cultural Heritage Festival",
        date: "April 15, 2024",
        excerpt: "Successful cultural heritage festival brings together communities.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/cultural-festival",
        category: "Community",
      },
      {
        id: 2,
        title: "Youth Leadership Summit",
        date: "March 20, 2024",
        excerpt: "Annual youth leadership summit empowers young community leaders.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/youth-summit",
        category: "Community",
      },
      {
        id: 3,
        title: "Community Service Day",
        date: "February 25, 2024",
        excerpt: "Hundreds of volunteers participate in community service initiatives.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/community-service",
        category: "Events",
      },
    ],
  },
  "palestinian-network": {
    title: "Building a Network of Palestinian Competencies",
    date: "April 20, 2024",
    author: "Isnad Foundation",
    category: "Network",
    image: "/fifthCard.png?height=600&width=1200",
    content: [
      "The Isnad Foundation is dedicated to building and strengthening a network of Palestinian competencies worldwide. Our network initiative connects Palestinian professionals, academics, and researchers, creating a powerful platform for collaboration and knowledge exchange.",
      "Our network program includes:",
      "• Professional networking events",
      "• Academic collaboration platforms",
      "• Research partnerships",
      "• Mentorship programs",
      "• Knowledge sharing forums",
      "• Industry-specific networking groups",
      "The network serves multiple purposes:",
      "• Connecting Palestinian professionals globally",
      "• Facilitating knowledge transfer",
      "• Creating opportunities for collaboration",
      "• Supporting career development",
      "• Strengthening the Palestinian professional community",
      "Through this network, we aim to create a strong, interconnected community of Palestinian professionals who can support each other and contribute to the development of Palestinian society.",
    ],
    relatedArticles: [
      {
        id: 1,
        title: "Global Network Conference",
        date: "April 10, 2024",
        excerpt: "Successful conference connects Palestinian professionals worldwide.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/network-conference",
        category: "Network",
      },
      {
        id: 2,
        title: "Mentorship Program Launch",
        date: "March 5, 2024",
        excerpt: "New mentorship program connects experienced professionals with young graduates.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/mentorship-launch",
        category: "Network",
      },
      {
        id: 3,
        title: "Industry Networking Event",
        date: "February 15, 2024",
        excerpt: "Successful networking event brings together professionals from various industries.",
        image: "/placeholder.svg?height=200&width=300",
        href: "/news/industry-networking",
        category: "Events",
      },
    ],
  },
  "isnad-support-tours": {
    title: "إسناد تنفذ جولات دعم في ست دول وتقدم منحًا تعليمية لطلاب غزة",
    date: "March 15, 2024",
    author: "Isnad Foundation",
    category: "Announcements",
    image: "/LastNews/1.png",
    content: [
      "نفذت مؤسسة إسناد لدعم الطالب الفلسطيني منذ بدء حرب الإبادة في قطاع غزة سلسلة من اللقاءات والفعاليات في عدد من الدول شملت تركيا، مصر، موريتانيا، قرغيزستان، ماليزيا، وقطاع غزة، وذلك في إطار استجابتها العاجلة لاحتياجات الطلبة الفلسطينيين المتضررين من الحرب المستمرة على قطاع غزة منذ أكتوبر 2023.",
      "وهدفت هذه الجولات إلى التواصل المباشر مع الطلبة، والاطلاع على أوضاعهم المعيشية والتعليمية، وتقديم الدعم النفسي والمعنوي لهم، في ظل ما يعانونه من صعوبات معيشية وضغوط نفسية نتيجة فقدان ذويهم أو انقطاع سبل الدعم.",
      "وخلال اللقاءات، أعلنت المؤسسة عن تقديم منح تعليمية مباشرة لعدد من الطلبة، كمساهمة عاجلة لتخفيف العبء عنهم وضمان استمرارية تحصيلهم الأكاديمي. كما عملت \"إسناد\" على إبرام شراكات مع مؤسسات محلية في الدول التي تمت زيارتها، بهدف تأمين منح إضافية مستدامة للطلبة الفلسطينيين، وتعزيز فرص التعليم في بيئة آمنة وداعمة.",
      "وأكدت المؤسسة أن هذه الجهود تأتي ضمن خطة استجابة سريعة أطلقتها منذ بداية الحرب، وتهدف إلى تقديم دعم متكامل للطلبة من مختلف الجوانب النفسية والتعليمية والاجتماعية، مع التركيز على طلبة غزة في ظل الظروف الكارثية التي يمر بها القطاع.",
      "ومؤسسة إسناد لدعم الطالب الفلسطيني هي هيئة مجتمع مدني فلسطينية أُسست في تركيا، تهدف إلى تمكين الطلبة الفلسطينيين أكاديميًا ومجتمعيًا من خلال تقديم المنح التعليمية، وتوفير الدعم النفسي والاجتماعي، والمساهمة في بناء بيئة تعليمية حاضنة للطلبة الفلسطينيين داخل فلسطين وفي مناطق اللجوء والشتات، عبر شراكات محلية ودولية مستدامة."
    ],
    relatedArticles: [
      {
        id: 1,
        title: "انتهاء المرحلة الأولى من مقابلات منحة نبض الحياة",
        date: "May 25, 2025",
        excerpt: "اختتمت مؤسسة إسناد لدعم الطالب الفلسطيني، يوم السبت الموافق 25 مايو 2025، المرحلة الأولى من مقابلات منحة \"نبض الحياة\"، والتي امتدت على مدار ثلاثة أسابيع بدءًا من الخامس من مايو.",
        image: "/LastNews/1.png",
        href: "/news/nabd-al-hayat-scholarship-interviews",
        category: "Scholarships",
      },
      {
        id: 2,
        title: "Partnership with Istanbul University",
        date: "May 28, 2023",
        excerpt: "We're excited to announce our new partnership with Istanbul University to provide more opportunities.",
        image: "/LastNews/1.png",
        href: "/news/istanbul-university-partnership",
        category: "Partnerships",
      },
      {
        id: 3,
        title: "Foundation Expands Support to Lebanon",
        date: "December 12, 2022",
        excerpt: "Our foundation is expanding its support programs to reach Palestinian students in Lebanon.",
        image: "/LastNews/1.png",
        href: "/news/lebanon-expansion",
        category: "Announcements",
      },
    ],
  },
}

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  // Get article data or use default if not found
  const article = newsArticles[slug as keyof typeof newsArticles] || {
    title: "Article Not Found",
    date: "",
    author: "",
    category: "",
    image: "/placeholder.svg?height=600&width=1200",
    heroImage: "/placeholder.svg?height=600&width=1200",
    content: ["The requested article could not be found."],
    relatedArticles: [],
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
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={article.heroImage || article.image}
            alt={article.title}
            className="h-full w-full object-contain object-center"
          />
        </div>
        {/* Page Indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1e7e34]"></div>
              <span className="text-white text-xs sm:text-sm font-medium">Latest News</span>
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
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {article.date && (
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  )}
                  {article.author && (
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>{article.category}</span>
                    </div>
                  )}
                </div>
              </div>
              <GSAPReveal animation="fade">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </GSAPReveal>

              {/* Share Section */}
              <GSAPReveal animation="fade" delay={0.2}>
                <div className="mt-12 rounded-lg border bg-muted/20 p-6">
                  <h3 className="mb-4 flex items-center text-lg font-bold">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share This Article
                  </h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </GSAPReveal>
            </div>

            {/* Sidebar */}
            <div>
              <div className="space-y-8">
                {/* Categories */}
                <GSAPReveal animation="slide-left">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-bold">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Scholarships
                        </Badge>
                        <Badge variant="outline">Partnerships</Badge>
                        <Badge variant="outline">Events</Badge>
                        <Badge variant="outline">Success Stories</Badge>
                        <Badge variant="outline">Grants</Badge>
                        <Badge variant="outline">Announcements</Badge>
                        <Badge variant="outline">Reports</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </GSAPReveal>

                {/* Related Articles */}
                {article.relatedArticles && article.relatedArticles.length > 0 && (
                  <GSAPReveal animation="slide-left" delay={0.1}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-bold">Related Articles</h3>
                        <div className="space-y-4">
                          {article.relatedArticles.map((related) => (
                            <Link key={related.id} href={related.href} className="group block">
                              <div className="flex gap-3">
                                <div>
                                  <h4 className="line-clamp-2 font-medium group-hover:text-primary">{related.title}</h4>
                                  <p className="text-xs text-muted-foreground">{related.date}</p>
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
                      <h3 className="mb-2 text-lg font-bold">Explore Our Programs</h3>
                      <p className="mb-4 text-primary-foreground/90">
                        Discover our comprehensive scholarship programs and find the perfect opportunity for your educational journey.
                      </p>
                      <Link href="/programs">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">View Programs</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </GSAPReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More News Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">More News</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
                Discover more updates and stories from the Isnad Foundation.
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {article.relatedArticles &&
              article.relatedArticles.slice(0, 3).map((related, index) => (
                <GSAPReveal key={related.id} animation="slide-up" delay={0.1 * index}>
                  <Link href={related.href} className="group block">
                    <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 bg-primary/10 text-primary">
                          {related.category}
                        </Badge>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold group-hover:text-primary">
                          {related.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">{related.excerpt}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {related.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                </GSAPReveal>
              ))}
          </div>

          <GSAPReveal animation="fade" delay={0.3}>
            <div className="mt-12 text-center">
              <Link href="/news">
                <Button variant="outline" className="group">
                  View All News
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>
    </main>
  )
}
