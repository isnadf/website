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
  quote: string;
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
    quote: "The Annual Scholarship Conference was an incredible opportunity to connect with other students and learn about educational opportunities. I gained valuable insights that will help me in my academic journey.",
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
    quote: "The Cultural Exchange Festival was a highlight of my year. It gave me a chance to share my heritage with the local community and feel connected to our Palestinian roots.",
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
    quote: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
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
    quote: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
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
    quote: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
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
    quote: "The work that the Isnad Foundation is doing is vital for the future of our youth. Education is the most powerful tool we can give to the next generation.",
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
    quote: "I've seen firsthand how the Fund's programs transform lives. These students are not just receiving an education; they're becoming ambassadors for Palestine.",
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
    quote: "The partnership between our ministry and the Fund has been instrumental in developing our educational infrastructure and supporting our brightest minds.",
    videoFileName: "3.mp4",
    type: 'public_figure'
  }
];

// Combined testimonials for convenience
export const allTestimonials = [...studentTestimonials, ...publicFigureTestimonials];
