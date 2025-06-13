// Define the testimonial interface
export interface Testimonial {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  organization: {
    en: string;
    ar: string;
  };
  quote: {
    en: string;
    ar: string;
  };
  videoFileName: string;
  type: 'student' | 'public_figure';
}

// Student testimonials data
export const studentTestimonials: Testimonial[] = [
  {
    id: 1,
    name: {
      en: "Tasnim mosa",
      ar: "تسنيم موسى"
    },
    role: {
      en: "Master's Student",
      ar: "طالبة ماجستير"
    },
    organization: {
      en: "Environmental Engineering",
      ar: "الهندسة البيئية"
    },
    quote: {
      en: "The Annual Scholarship Conference was an incredible opportunity to connect with other students and learn about educational opportunities. I gained valuable insights that will help me in my academic journey",
      ar: "كان مؤتمر المنح الدراسية السنوي فرصة رائعة للتواصل مع الطلاب الآخرين والتعرف على الفرص التعليمية. اكتسبت رؤى قيمة ستساعدني في رحلتي الأكاديمية"
    },
    videoFileName: "moritania.mp4",
    type: 'student'
  },
  {
    id: 2,
    name: {
      en: "Hassan Albirok",
      ar: "حسن البيارق"
    },
    role: {
      en: "Bachelor's Student",
      ar: "طالب بكالوريوس"
    },
    organization: {
      en: "Mechanical Engineering",
      ar: "الهندسة الميكانيكية"
    },
    quote: {
      en: "The Cultural Exchange Festival was a highlight of my year. It gave me a chance to share my heritage with the local community and feel connected to our Palestinian roots.",
      ar: "كان مهرجان التبادل الثقافي من أبرز أحداث عامي. أتاح لي الفرصة لمشاركة تراثي مع المجتمع المحلي والشعور بالتواصل مع جذورنا الفلسطينية"
    },
    videoFileName: "hassan.mp4",
    type: 'student'
  },
  {
    id: 3,
    name: {
      en: "Atia Algadi",
      ar: "عطية القاضي"
    },
    role: {
      en: "PhD Student",
      ar: "طالب دكتوراه"
    },
    organization: {
      en: "Biochemistry",
      ar: "الكيمياء الحيوية"
    },
    quote: {
      en: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
      ar: "فتح معرض التعليم الدولي أمامي أبواباً لم أكن أتخيلها ممكنة. تمكنت من التواصل مع جامعات من جميع أنحاء العالم والعثور على فرص منح دراسية"
    },
    videoFileName: "atia.mp4",
    type: 'student'
  },
  {
    id: 4,
    name: {
      en: "Omer Qadih",
      ar: "عمر قاضي"
    },
    role: {
      en: "PhD Student",
      ar: "طالب دكتوراه"
    },
    organization: {
      en: "Biochemistry",
      ar: "الكيمياء الحيوية"
    },
    quote: {
      en: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
      ar: "فتح معرض التعليم الدولي أمامي أبواباً لم أكن أتخيلها ممكنة. تمكنت من التواصل مع جامعات من جميع أنحاء العالم والعثور على فرص منح دراسية"
    },
    videoFileName: "omer.mp4",
    type: 'student'
  },
  {
    id: 5,
    name: {
      en: "Mohammed Algodra",
      ar: "محمد الجدع"
    },
    role: {
      en: "PhD Student",
      ar: "طالب دكتوراه"
    },
    organization: {
      en: "Biochemistry",
      ar: "الكيمياء الحيوية"
    },
    quote: {
      en: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
      ar: "فتح معرض التعليم الدولي أمامي أبواباً لم أكن أتخيلها ممكنة. تمكنت من التواصل مع جامعات من جميع أنحاء العالم والعثور على فرص منح دراسية"
    },
    videoFileName: "mohammed.mp4",
    type: 'student'
  }
];

// Public figure testimonials data
export const publicFigureTestimonials: Testimonial[] = [
  {
    id: 6,
    name: {
      en: "محيي الدين علي القرة داغي",
      ar: "محيي الدين علي القرة داغي"
    },
    role: {
      en: "امين عام الاتحاد العالمي لعلماء المسلمين",
      ar: "امين عام الاتحاد العالمي لعلماء المسلمين"
    },
    organization: {
      en: "",
      ar: ""
    },
    quote: {
      en: "The work that the Isnad Foundation is doing is vital for the future of our youth. Education is the most powerful tool we can give to the next generation.",
      ar: "العمل الذي تقوم به مؤسسة إسناد حيوي لمستقبل شبابنا. التعليم هو أقوى أداة يمكننا تقديمها للجيل القادم"
    },
    videoFileName: "1.mp4",
    type: 'public_figure'
  },
  {
    id: 7,
    name: {
      en: "محيي الدين علي القرة داغي",
      ar: "محيي الدين علي القرة داغي"
    },
    role: {
      en: "امين عام الاتحاد العالمي لعلماء المسلمين",
      ar: "امين عام الاتحاد العالمي لعلماء المسلمين"
    },
    organization: {
      en: "",
      ar: ""
    },
    quote: {
      en: "I've seen firsthand how the Fund's programs transform lives. These students are not just receiving an education; they're becoming ambassadors for Palestine.",
      ar: "لقد رأيت بنفسي كيف تحول برامج الصندوق حياة الطلاب. هؤلاء الطلاب لا يتلقون التعليم فحسب، بل أصبحوا سفراء لفلسطين"
    },
    videoFileName: "2.mp4",
    type: 'public_figure'
  },
  {
    id: 8,
    name: {
      en: "محمد الصغير",
      ar: "محمد الصغير"
    },
    role: {
      en: "الأمين العام للهيئة العالمية لأنصار النبي",
      ar: "الأمين العام للهيئة العالمية لأنصار النبي"
    },
    organization: {
      en: "",
      ar: ""
    },
    quote: {
      en: "The partnership between our ministry and the Fund has been instrumental in developing our educational infrastructure and supporting our brightest minds.",
      ar: "كانت الشراكة بين وزارتنا والصندوق عاملاً أساسياً في تطوير البنية التحتية التعليمية لدينا ودعم عقولنا المتميزة"
    },
    videoFileName: "3.mp4",
    type: 'public_figure'
  }
];

// Combined testimonials for convenience
export const allTestimonials = [...studentTestimonials, ...publicFigureTestimonials];
