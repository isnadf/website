"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, GraduationCap, MapPin, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GSAPReveal from "@/components/gsap-reveal"
import GSAPTextReveal from "@/components/gsap-text-reveal"

// Mock success story data
const successStories = {
  "ahmed-hassan": {
    name: "Ahmed Hassan",
    degree: "PhD in Computer Science",
    university: "Istanbul Technical University",
    graduationYear: 2022,
    hometown: "Gaza, Palestine",
    image: "/placeholder.svg?height=600&width=600",
    coverImage: "/placeholder.svg?height=600&width=1200",
    quote:
      "The support from the Isnad Foundation transformed my academic journey and opened doors I never thought possible.",
    story: [
      "Growing up in Gaza, I always had a passion for technology and computing, but the opportunities to pursue advanced education in this field were severely limited due to both financial constraints and the ongoing conflict in the region.",
      "After completing my bachelor's degree in Computer Engineering at Al-Azhar University in Gaza with top honors, I dreamed of continuing my education abroad, but the financial barriers seemed insurmountable. My family had already made significant sacrifices to support my undergraduate studies, and further education seemed out of reach.",
      "Everything changed when I learned about the Isnad Foundation. I applied for their PhD scholarship program with hope but realistic expectations. When I received the news that I had been selected for a full scholarship to pursue my doctorate at Istanbul Technical University, it was a life-changing moment not just for me, but for my entire family.",
      "The transition to life in Turkey came with its challenges – cultural differences, language barriers, and adapting to a new academic environment. However, the IFPPS provided more than just financial support. Their mentorship program connected me with other Palestinian scholars and Turkish academics who helped me navigate these challenges.",
      "My research focused on developing machine learning algorithms for resource-constrained environments, work that I hope will have practical applications in areas with limited technological infrastructure – including Palestine. Throughout my studies, I was able to publish several papers in top-tier conferences and journals, and even secured an internship at a leading tech company in Istanbul.",
      "Beyond academics, the IFPPS community became like a second family. The cultural events, networking opportunities, and sense of belonging they fostered helped me overcome homesickness and stay focused on my goals.",
      "After completing my PhD in 2022, I accepted a position as an assistant professor at Istanbul Technical University, where I now have the opportunity to mentor other students, including fellow Palestinians. I'm also collaborating with tech initiatives in Gaza, working to establish remote learning programs and internship opportunities for promising students there.",
      "My journey from Gaza to becoming a computer science PhD and educator would not have been possible without the Isnad Foundation. They didn't just fund my education; they invested in my potential and empowered me to create a ripple effect of positive change for others from similar backgrounds.",
    ],
    achievements: [
      "Published 5 papers in top-tier computer science conferences",
      "Received the Outstanding Graduate Student Award at Istanbul Technical University",
      "Developed an open-source machine learning library optimized for low-resource environments",
      "Secured a patent for a novel algorithm in distributed computing",
      "Established a mentorship program connecting Turkish tech companies with Palestinian students",
    ],
    testimonial:
      "The scholarship wasn't just financial support – it was someone believing in my potential when circumstances made it hard to believe in myself.",
    relatedStories: [
      {
        id: 4,
        name: "Nour Al-Jabari",
        degree: "PhD in Biochemistry",
        university: "Sabancı University",
        quote:
          "The mentorship program connected me with leading researchers in my field, helping me publish my work in international journals.",
        image: "/placeholder.svg?height=300&width=300",
        href: "/success-stories/nour-al-jabari",
      },
      {
        id: 7,
        name: "Kareem Nasser",
        degree: "PhD in Political Science",
        university: "Koç University",
        quote:
          "My research on conflict resolution was made possible through this scholarship. I'm now working with international organizations on peace initiatives.",
        image: "/placeholder.svg?height=300&width=300",
        href: "/success-stories/kareem-nasser",
      },
      {
        id: 3,
        name: "Omar Khalidi",
        degree: "Bachelor's in Mechanical Engineering",
        university: "Boğaziçi University",
        quote:
          "From refugee camps to engineering labs, my journey would not have been possible without the foundation's unwavering support.",
        image: "/placeholder.svg?height=300&width=300",
        href: "/success-stories/omar-khalidi",
      },
    ],
  },
  "layla-mahmoud": {
    name: "Layla Mahmoud",
    degree: "Master's in Public Health",
    university: "Ankara University",
    graduationYear: 2021,
    hometown: "Ramallah, Palestine",
    image: "/placeholder.svg?height=600&width=600",
    coverImage: "/placeholder.svg?height=600&width=1200",
    quote:
      "Thanks to the scholarship program, I was able to pursue my dream of working in healthcare policy to help communities in need.",
    story: [
      "My journey into public health began in the clinics of Ramallah, where I volunteered during my undergraduate years. I witnessed firsthand the challenges facing our healthcare system – limited resources, restricted access to medical supplies, and the impact of ongoing conflict on community health.",
      "After completing my bachelor's degree in Biology at Birzeit University, I was determined to gain the knowledge and skills needed to address these systemic healthcare challenges. However, opportunities for specialized graduate education in public health were limited in Palestine, and international programs seemed financially out of reach.",
      "The Isnad Foundation changed everything for me. Their scholarship program not only covered my tuition and living expenses at Ankara University but also provided language support to help me adapt to studying in Turkish. The transition was challenging, but the foundation's support network made it manageable.",
      "During my master's program, I focused my research on healthcare access in conflict zones, drawing from both academic knowledge and my personal experiences. My professors were supportive and encouraged me to publish my findings, which led to presentations at several international health policy conferences.",
      "One of the most valuable aspects of the IFPPS program was the professional development opportunities. Through their network, I secured an internship with the World Health Organization's regional office, which gave me practical experience in international health policy and program implementation.",
      "After graduating in 2021, I joined a healthcare NGO that operates across the Middle East, where I now help design and implement community health programs for vulnerable populations. The skills and perspectives I gained through my education allow me to contribute meaningfully to improving healthcare access for those who need it most.",
      "My story is just one example of how educational investment can transform not just an individual life but entire communities. The Isnad Foundation didn't just help me achieve my academic goals – they empowered me to become an agent of change in a field that desperately needs innovative solutions.",
    ],
    achievements: [
      "Published research on healthcare access in conflict zones in the International Journal of Public Health",
      "Completed an internship with the World Health Organization's regional office",
      "Received the Dean's Award for Academic Excellence at Ankara University",
      "Helped establish three mobile health clinics serving underserved communities",
      "Currently mentors 15 young Palestinian women pursuing careers in healthcare",
    ],
    testimonial:
      "Education is powerful not just for what it teaches you from books, but for how it transforms your ability to create meaningful change in the world.",
    relatedStories: [
      {
        id: 9,
        name: "Yousef Darwish",
        degree: "Bachelor's in Medicine",
        university: "Hacettepe University",
        quote:
          "Becoming a doctor was my childhood dream. Now I can return to Gaza with the skills to help my community's healthcare system.",
        image: "/placeholder.svg?height=300&width=300",
        href: "/success-stories/yousef-darwish",
      },
      {
        id: 8,
        name: "Leila Hamdan",
        degree: "Master's in Environmental Engineering",
        university: "Yıldız Technical University",
        quote:
          "Studying environmental engineering has equipped me with the knowledge to address water scarcity issues in Palestine.",
        image: "/placeholder.svg?height=300&width=300",
        href: "/success-stories/leila-hamdan",
      },
      {
        id: 5,
        name: "Sami Barakat",
        degree: "Master's in Architecture",
        university: "Middle East Technical University",
        quote:
          "Studying architecture has given me the tools to envision rebuilding my homeland. This scholarship was the foundation of that dream.",
        image: "/placeholder.svg?height=300&width=300",
        href: "/success-stories/sami-barakat",
      },
    ],
  },
}

export default function SuccessStoryPage() {
  const params = useParams()
  const slug = params.slug as string

  // Get story data or use default if not found
  const story = successStories[slug as keyof typeof successStories] || {
    name: "Story Not Found",
    degree: "",
    university: "",
    graduationYear: "",
    hometown: "",
    image: "/placeholder.svg?height=600&width=600",
    coverImage: "/placeholder.svg?height=600&width=1200",
    quote: "",
    story: ["The requested success story could not be found."],
    achievements: [],
    testimonial: "",
    relatedStories: [],
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
    <main className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-primary/90 to-primary/70 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50" />
          <img src={story.coverImage || "/placeholder.svg"} alt={story.name} className="h-full w-full object-cover" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Link href="/success-stories" className="mb-6 inline-flex items-center text-white/80 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Success Stories
            </Link>
            <GSAPTextReveal element="h1" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {story.name}
            </GSAPTextReveal>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
              {story.degree && (
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{story.degree}</span>
                </div>
              )}
              {story.university && (
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{story.university}</span>
                </div>
              )}
              {story.graduationYear && (
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Class of {story.graduationYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <GSAPReveal animation="fade">
                <div className="mb-8 flex items-center justify-center">
                  <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="mb-8 rounded-lg bg-muted/30 p-6 text-center">
                  <Quote className="mx-auto mb-4 h-8 w-8 text-primary/40" />
                  <p className="text-xl font-medium italic">{story.quote}</p>
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {story.story.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {story.achievements && story.achievements.length > 0 && (
                  <div className="mt-12">
                    <h2 className="mb-4 text-2xl font-bold">Key Achievements</h2>
                    <ul className="list-inside list-disc space-y-2">
                      {story.achievements.map((achievement, index) => (
                        <li key={index} className="text-muted-foreground">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {story.testimonial && (
                  <div className="mt-12 rounded-lg bg-primary/10 p-6">
                    <Quote className="mb-4 h-8 w-8 text-primary/40" />
                    <p className="text-xl font-medium italic">{story.testimonial}</p>
                    <p className="mt-4 text-right font-medium">— {story.name}</p>
                  </div>
                )}
              </GSAPReveal>

              {/* Share Section */}
              <GSAPReveal animation="fade" delay={0.2}>
                <div className="mt-12 rounded-lg border bg-muted/20 p-6">
                  <h3 className="mb-4 flex items-center text-lg font-bold">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share This Story
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
                {/* About the Program */}
                <GSAPReveal animation="slide-left">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-lg font-bold">About Our Programs</h3>
                      <p className="text-muted-foreground">
                        The Isnad Foundation provides comprehensive scholarships, mentorship, and
                        professional development opportunities to talented Palestinian students worldwide.
                      </p>
                      <div className="mt-4">
                        <Link href="/programs">
                          <Button variant="outline" className="w-full">
                            Explore Our Programs
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </GSAPReveal>

                {/* Apply Now */}
                <GSAPReveal animation="slide-left" delay={0.1}>
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-lg font-bold">Apply for a Scholarship</h3>
                      <p className="mb-4 text-primary-foreground/90">
                        Take the first step toward your educational journey with our comprehensive scholarship programs.
                      </p>
                      <Link href="/apply">
                        <Button className="w-full bg-white text-primary hover:bg-gray-100">Apply Now</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </GSAPReveal>

                {/* Share Your Story */}
                <GSAPReveal animation="slide-left" delay={0.2}>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-lg font-bold">Share Your Story</h3>
                      <p className="mb-4 text-muted-foreground">
                        Are you a scholarship recipient with a story to tell? We'd love to feature your journey.
                      </p>
                      <Link href="/contact">
                        <Button variant="outline" className="w-full">
                          Submit Your Story
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

      {/* Related Stories */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <GSAPReveal animation="slide-up">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">More Success Stories</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
                Discover more inspiring journeys from our scholarship recipients.
              </p>
            </div>
          </GSAPReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {story.relatedStories &&
              story.relatedStories.map((related, index) => (
                <GSAPReveal key={related.id} animation="slide-up" delay={0.1 * index}>
                  <Link href={related.href}>
                    <div className="group relative h-full overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={related.image || "/placeholder.svg"}
                          alt={related.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 text-xl font-bold group-hover:text-primary">{related.name}</h3>
                        <p className="text-primary">{related.degree}</p>
                        <p className="mb-3 text-sm text-muted-foreground">{related.university}</p>
                        <p className="italic text-muted-foreground">"{related.quote.substring(0, 100)}..."</p>
                      </div>
                    </div>
                  </Link>
                </GSAPReveal>
              ))}
          </div>

          <GSAPReveal animation="fade" delay={0.3}>
            <div className="mt-12 text-center">
              <Link href="/success-stories">
                <Button variant="outline" className="group">
                  View All Success Stories
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <GSAPReveal animation="slide-up">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Be Inspired by Our Scholars</h2>
              <p className="mt-4 text-xl text-primary-foreground/90">
                Discover how our programs have helped students achieve their educational dreams.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/programs">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Explore Programs
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
