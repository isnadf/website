// Define the testimonial interface
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization?: string;
  quote: string;
  videoFileName: string;
  type: 'student' | 'public_figure';
}

// Student testimonials data
export const studentTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tasnim mosa",
    role: "Master's Student",
    organization: "Environmental Engineering",
    quote: "The Annual Scholarship Conference was an incredible opportunity to connect with other students and learn about educational opportunities. I gained valuable insights that will help me in my academic journey.",
    videoFileName: "moritania.mp4",
    type: 'student'
  },
  {
    id: 2,
    name: "Hassan Albirok",
    role: "Bachelor's Student",
    organization: "Mechanical Engineering",
    quote: "The Cultural Exchange Festival was a highlight of my year. It gave me a chance to share my heritage with the local community and feel connected to our Palestinian roots.",
    videoFileName: "hassan.mp4",
    type: 'student'
  },
  {
    id: 3,
    name: "Atia Algadi",
    role: "PhD Student",
    organization: "Biochemistry",
    quote: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
    videoFileName: "atia.mp4",
    type: 'student'
  },
  {
    id: 4,
    name: "Omer Qadih",
    role: "PhD Student",
    organization: "Biochemistry",
    quote: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
    videoFileName: "omer.mp4",
    type: 'student'
  },
  {
    id: 5,
    name: "Mohammed Algodra",
    role: "PhD Student",
    organization: "Biochemistry",
    quote: "The International Education Fair opened doors for me that I never thought possible. I was able to connect with universities from around the world and find scholarship opportunities.",
    videoFileName: "mohammed.mp4",
    type: 'student'
  }
];

// Public figure testimonials data
export const publicFigureTestimonials: Testimonial[] = [
  {
    id: 6,
    name: "Dr. Ahmed Yousef",
    role: "Professor",
    organization: "Istanbul University",
    quote: "The work that the Isnad Foundation is doing is vital for the future of our youth. Education is the most powerful tool we can give to the next generation.",
    videoFileName: "1.mp4",
    type: 'public_figure'
  },
  {
    id: 7,
    name: "Mona Rashid",
    role: "Director",
    organization: "Education Without Borders",
    quote: "I've seen firsthand how the Fund's programs transform lives. These students are not just receiving an education; they're becoming ambassadors for Palestine.",
    videoFileName: "2.mp4",
    type: 'public_figure'
  },
  {
    id: 8,
    name: "Ibrahim Al-Khatib",
    role: "Minister of Education",
    organization: "Palestinian Authority",
    quote: "The partnership between our ministry and the Fund has been instrumental in developing our educational infrastructure and supporting our brightest minds.",
    videoFileName: "3.mp4",
    type: 'public_figure'
  }
];

// Combined testimonials for convenience
export const allTestimonials = [...studentTestimonials, ...publicFigureTestimonials];
