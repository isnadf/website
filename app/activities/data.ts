export interface Activity {
  id: number
  title: string
  date: string
  location: string
  description: string
  full_description: string
  image: string
  category: string
  featured: boolean
  year: number
}

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: "Networking Event & Scholarships for Palestinian Students in Turkey",
    date: "June 15-17, 2023",
    location: "İstanbul, Türkiye",
    description: "The Palestinian Student Support Fund organized a networking event with Palestinian students in Turkey, aiming to better understand their circumstances and needs and to work towards addressing them within its future plans. Scholarships and financial aid were also distributed during the event, reflecting the Fund's commitment to supporting Palestinian students.",
    full_description: "As part of its efforts to strengthen engagement with Palestinian students abroad, the Palestinian Student Support Fund organized a networking event with Palestinian students in Turkey. The event aimed to closely assess their academic and living conditions, listen to their various needs and demands, and work to incorporate these insights into the Fund's future plans. The gathering marked an important milestone in launching a new phase of support and follow-up for Palestinian students in Turkey, through providing psychological, social, and educational assistance, and by strengthening communication channels with them.During the event, a number of scholarships and financial aids were distributed to the attending students, reflecting the Fund's ongoing commitment to supporting the educational journey of Palestinian youth and creating favorable conditions for them to complete their university studies.",
    image: "/one/PHOTO-2025-04-20-18-03-47 5.jpg?height=400&width=600",
    category: "Conference",
    featured: true,
    year: 2023,
  },
  {
    id: 2,
    title: "Supporting Palestinian Female Students in Turkey with Scholarships",
    date: "March 18, 2023",
    location: "İstanbul, Türkiye",
    description: "The Palestinian Student Support Fund organized a networking event with Palestinian female students in Turkey, aiming to understand their needs and introduce them to its supportive mission.This initiative comes as part of efforts to strengthen communication and build future cooperation that would support their academic journey.During the event, a number of financial scholarships were awarded to all participating students.",
    full_description: "As part of its efforts to strengthen communication with Palestinian students abroad, the Palestinian Student Support Fund organized, on (…), a special networking event for Palestinian female students in Turkey.The event aimed to closely learn about their academic and living experiences and to listen to their needs. It also included an introduction to the Fund's mission and its goals in supporting the educational journey.The meeting provided a space for open dialogue and exchange of perspectives, in a step aimed at building future bridges of cooperation to further support the students and their academic endeavors.During the event, a number of scholarships and financial aids were distributed to the attending students, reflecting the Fund's commitment to supporting the educational journey of the Palestinian people and ensuring favorable conditions for them to complete their university studies.",
    image: "/two/PHOTO-2025-04-20-18-04-03.jpg?height=400&width=600",
    category: "Cultural Event",
    featured: true,
    year: 2023,
  },
  {
    id: 3,
    title: "Strengthening Support & Communication with Students in Malaysia",
    date: "November 5-6, 2022",
    location: "Kuala Lumpur, Malaysia",
    description: "The Palestinian Student Support Fund organized a networking event with Palestinian students in Malaysia, aiming to foster connections, listen to their needs, and introduce them to the Fund's mission and its role in supporting their academic journey, reaffirming its commitment to supporting students wherever they may be.",
    full_description: "As part of its vision to reach Palestinian students wherever they are, the Palestinian Student Support Fund organized a networking event with Palestinian students in Malaysia, aiming to strengthen direct communication, foster connections, and listen to their academic and living aspirations and needs. During the event, representatives of the Fund provided a comprehensive overview of its mission, goals, and its role in supporting Palestinian students and enabling them to pursue higher education in a stable and secure environment. The Fund also emphasized that its support for students knows no geographical boundaries. In addition, scholarships and financial aid were awarded to the Palestinian students who participated in the event.",
    image: "/three/PHOTO-2025-04-20-18-04-18.jpg?height=400&width=600",
    category: "Education Fair",
    featured: true,
    year: 2022,
  },
  {
    id: 4,
    title: "Networking Event & Financial Scholarships in Kyrgyzstan",
    date: "August 10-12, 2022",
    location: "Bishkek, Kyrgyzstan",
    description: "The Palestinian Student Support Fund organized a networking event with Palestinian students in Kyrgyzstan to learn about their experiences and needs, introduce them to the Fund's mission, and provide financial scholarships to all attendees.",
    full_description: "As part of its ongoing efforts to reach Palestinian students around the world, the Palestinian Student Support Fund organized a networking event with Palestinian students in Kyrgyzstan.The event aimed to foster connections, listen to the students' experiences and needs, and introduce them to the vital role the Fund plays in supporting their academic journeys and helping them overcome the challenges they face. The gathering also included a fraternal meal, designed to enhance the spirit of friendliness and direct engagement between the students and the Fund's representatives. This initiative contributed to strengthening community bonds and promoting a spirit of cooperation and belonging among Palestinian students abroad. At the conclusion of the event, financial scholarships were distributed to all participating students, reaffirming the Fund's unwavering commitment to supporting Palestinian students wherever they are and its dedication to accompanying them throughout their journey of learning and success, thereby enhancing their opportunities to achieve their academic goals.",
    image: "/four/PHOTO-2025-04-26-22-18-22 2.jpg?height=400&width=600",
    category: "Workshop",
    featured: false,
    year: 2022,
  },
  {
    id: 5,
    title: "Friendly Football Match with Palestinian Students in Turkey",
    date: "April 22-23, 2022",
    location: "İstanbul, Türkiye",
    description: "The Palestinian Student Support Fund organized a friendly football match that brought together a number of Palestinian students in istanbul , Turkey.The event aimed to strengthen bonds and foster friendly interaction, creating a space for networking and communication in an informal atmosphere, while also introducing the Fund's mission and activities.",
    full_description: "As part of its efforts to strengthen engagement with Palestinian students abroad, the Palestinian Student Support Fund organized a friendly football match on (...) in istanbul , bringing together a number of Palestinian students in Turkey amid an atmosphere of energy and interaction.This sports initiative came within the Fund's broader efforts to build direct relationships with students, create a supportive environment that fosters networking and breaks down formal barriers, and to present a lively image of the Fund's activities and its mission of support for students. The match received a positive response from the participants, who expressed their happiness with the initiative, appreciating the opportunity it provided for social bonding and for getting to know the Fund's activities in a friendly and informal setting.",
    image: "/five/DSC07508.jpg?height=400&width=600",
    category: "Seminar",
    featured: false,
    year: 2022,
  },
  {
    id: 6,
    title: "Meeting Palestinian Students in Egypt with Financial Support",
    date: "October 15-17, 2021",
    location: "Cairo, Eygpt",
    description: "The Palestinian Student Support Fund organized a networking event with Palestinian students in Egypt, aiming to foster connections and listen to their views and needs.During the event, financial scholarships were distributed to the attendees, who expressed their appreciation for the Fund's role in supporting their educational journey.",
    full_description: "As part of its ongoing efforts to enhance communication with Palestinian students abroad, the Palestinian Student Support Fund organized a networking event in the Arab Republic of Egypt, bringing together a number of Palestinian students to engage directly with each other and learn about their educational and living needs. During the meeting, the Fund provided several financial grants to the students in attendance, supporting their academic journeys and alleviating their living burdens. This initiative was met with positive feedback from those present, who expressed their gratitude and appreciation to the Fund, praising its role in accompanying them throughout their educational journeys and its commitment to reaching Palestinian students wherever they are. The participating students also invited their Palestinian colleagues to learn more about the Fund's mission and benefit from its programs, emphasizing that the Palestinian Student Support Fund constitutes a true pillar of support for students at home and abroad, enhancing their opportunities for academic success.",
    image: "/six/PHOTO-2025-04-26-22-24-15.jpg?height=400&width=600",
    category: "Networking",
    featured: false,
    year: 2021,
  },
  {
    id: 7,
    title: "Palestinian Student Meeting in Mauritania with Monthly Grants",
    date: "October 15-17, 2021",
    location: "Nouakchott, mauritania",
    description: "As part of its efforts to reach the largest number of Palestinian students, the Palestinian Student Support Fund organized a networking meeting in Mauritania bringing together Palestinian students with Mauritanian and Palestinian figures. Financial grants were distributed during the meeting, along with an agreement to provide recurring monthly grants to support Palestinian students there.",
    full_description: "As part of expanding its efforts to support Palestinian students around the world, the Palestinian Student Support Fund organized a networking meeting in Mauritania, attended by a number of Palestinian students, along with prominent Mauritanian and Palestinian figures. The meeting provided an important platform for acquaintance, strengthening ties, and exchanging views on ways to support Palestinian students residing in Mauritania. During the meeting, direct financial grants were distributed to a number of students, demonstrating the Fund's commitment to providing practical and sustainable support to students abroad. An agreement was also announced to provide recurring monthly grants to Palestinian students in Mauritania, a qualitative development in the Fund's efforts to enhance the stability of support and expand its scope. The meeting was widely welcomed by attendees, who praised the initiative and considered it a strong boost to students' educational progress and an example of the true partnership between the Palestinian and Mauritanian peoples in supporting education and human dignity.",
    image: "/seven/1.jpeg?height=400&width=600",
    category: "Networking",
    featured: false,
    year: 2021,
  }
]