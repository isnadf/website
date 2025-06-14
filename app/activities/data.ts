export interface Activity {
  id: number
  title: {
    en: string
    ar: string
  }
  date: {
    en: string
    ar: string
  }
  location: {
    en: string
    ar: string
  }
  description: {
    en: string
    ar: string
  }
  full_description: {
    en: string
    ar: string
  }
  image: string
  category: {
    en: string
    ar: string
  }
  featured: boolean
  year: number
}

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: {
      en: "The Fund organizes a networking event with Palestinian students in Turkey and offers them a number of scholarships",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل مع الطلاب الفلسطينيين في تركيا ويقدم لهم عدداً من المنح الدراسية"
    },
    date: {
      en: "June 15-17, 2023",
      ar: "15-17 يونيو 2023"
    },
    location: {
      en: "İstanbul, Türkiye",
      ar: "إسطنبول، تركيا"
    },
    description: {
      en: "The Palestinian Student Support Fund organized a networking event with Palestinian students in Turkey, providing scholarships and introducing them to the Fund's mission of supporting their academic journey. The event strengthened connections and built future cooperation.",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل مع الطلاب الفلسطينيين في تركيا، قدم خلالها منحاً دراسية وعرفهم برسالة المؤسسة في دعم مسيرتهم الأكاديمية. عززت الفعالية الروابط وبناء تعاون مستقبلي"
    },
    full_description: {
      en: "The Palestinian Student Support Fund organized a networking event with Palestinian students in Turkey, aiming to better understand their circumstances and needs and to work towards addressing them within its future plans. Scholarships and financial aid were also distributed during the event, reflecting the Fund's commitment to supporting Palestinian students.\n\nAs part of its efforts to strengthen engagement with Palestinian students abroad, the Palestinian Student Support Fund organized a networking event with Palestinian students in Turkey.\nThe event aimed to closely assess their academic and living conditions, listen to their various needs and demands, and work to incorporate these insights into the Fund's future plans.\nThe gathering marked an important milestone in launching a new phase of support and follow-up for Palestinian students in Turkey, through providing psychological, social, and educational assistance, and by strengthening communication channels with them.\nDuring the event, a number of scholarships and financial aids were distributed to the attending students, reflecting the Fund's ongoing commitment to supporting the educational journey of Palestinian youth and creating favorable conditions for them to complete their university studies.",
      ar: "تنظم مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل مع الطلاب الفلسطينيين في تركيا ويقدم لهم عدداً من المنح الدراسية\n\nنظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل مع الطلاب الفلسطينيين في تركيا، بهدف فهم ظروفهم واحتياجاتهم بشكل أفضل والعمل على معالجتها ضمن خططها المستقبلية. كما تم توزيع منح دراسية ومساعدات مالية خلال الفعالية، مما يعكس التزام المؤسسة بدعم الطلاب الفلسطينيين\n\nكجزء من جهودها لتعزيز التواصل مع الطلاب الفلسطينيين في الخارج، نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل مع الطلاب الفلسطينيين في تركيا.\nهدفت الفعالية إلى تقييم أوضاعهم الأكاديمية والمعيشية عن كثب، والاستماع إلى احتياجاتهم ومطالبهم المختلفة، والعمل على دمج هذه الرؤى في خطط المؤسسة المستقبلية.\nشكل اللقاء علامة فارقة مهمة في إطلاق مرحلة جديدة من الدعم والمتابعة للطلاب الفلسطينيين في تركيا، من خلال تقديم المساعدة النفسية والاجتماعية والتعليمية، وتعزيز قنوات التواصل معهم.\nخلال الفعالية، تم توزيع عدد من المنح الدراسية والمساعدات المالية على الطلاب الحاضرين، مما يعكس التزام المؤسسة المستمر بدعم المسيرة التعليمية للشباب الفلسطيني وتهيئة الظروف المواتية لهم لإكمال دراستهم الجامعية"
    },
    image: "/one/PHOTO-2025-04-20-18-03-47 5.jpg?height=400&width=600",
    category: {
      en: "Conference",
      ar: "مؤتمر"
    },
    featured: true,
    year: 2023,
  },
  {
    id: 2,
    title: {
      en: "The Palestinian Student Support Fund meets with Palestinian female students in Turkey and offers them a number of scholarships",
      ar: "تلتقي مؤسسة إسنَاد لدعم الطالب الفلسطيني مع الطالبات الفلسطينيات في تركيا ويقدم لهن عدداً من المنح الدراسية"
    },
    date: {
      en: "March 18, 2023",
      ar: "18 مارس 2023"
    },
    location: {
      en: "İstanbul, Türkiye",
      ar: "إسطنبول، تركيا"
    },
    description: {
      en: "The Palestinian Student Support Fund organized a special networking event for Palestinian female students in Turkey, providing scholarships and creating a space for dialogue about their academic and living needs. The event strengthened community bonds and future cooperation.",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل خاصة مع الطالبات الفلسطينيات في تركيا، قدم خلالها منحاً دراسية وخلق مساحة للحوار حول احتياجاتهن الأكاديمية والمعيشية. عززت الفعالية روابط المجتمع والتعاون المستقبلي"
    },
    full_description: {
      en: "The Palestinian Student Support Fund meets with Palestinian female students in Turkey and offers them a number of scholarships.\n\nThe Palestinian Student Support Fund organized a networking event with Palestinian female students in Turkey, aiming to understand their needs and introduce them to its supportive mission. This initiative comes as part of efforts to strengthen communication and build future cooperation that would support their academic journey. During the event, a number of financial scholarships were awarded to all participating students.\n\nAs part of its efforts to strengthen communication with Palestinian students abroad, the Palestinian Student Support Fund organized, on (...), a special networking event for Palestinian female students in Turkey.\nThe event aimed to closely learn about their academic and living experiences and to listen to their needs. It also included an introduction to the Fund's mission and its goals in supporting the educational journey.\nThe meeting provided a space for open dialogue and exchange of perspectives, in a step aimed at building future bridges of cooperation to further support the students and their academic endeavors.\nDuring the event, a number of scholarships and financial aids were distributed to the attending students, reflecting the Fund's commitment to supporting the educational journey of the Palestinian people and ensuring favorable conditions for them to complete their university studies.",
      ar: "يلتقي صندوق دعم الطلاب الفلسطينيين مع الطالبات الفلسطينيات في تركيا ويقدم لهن عدداً من المنح الدراسية\n\nنظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل مع الطالبات الفلسطينيات في تركيا، بهدف فهم احتياجاتهن والتعريف برسالته الداعمة. تأتي هذه المبادرة كجزء من الجهود الرامية إلى تعزيز التواصل وبناء تعاون مستقبلي يدعم مسيرتهن الأكاديمية. خلال الفعالية، تم منح عدد من المنح الدراسية المالية لجميع الطالبات المشاركات\n\nكجزء من جهوده لتعزيز التواصل مع الطلاب الفلسطينيين في الخارج، نظم صندوق دعم الطلاب الفلسطينيين، في (...)، فعالية تواصل خاصة مع الطالبات الفلسطينيات في تركيا.\nهدفت الفعالية إلى التعرف عن كثب على تجاربهن الأكاديمية والمعيشية والاستماع إلى احتياجاتهن. كما تضمنت تعريفاً برسالة الصندوق وأهدافه في دعم المسيرة التعليمية.\nوفر اللقاء مساحة للحوار المفتوح وتبادل وجهات النظر، في خطوة تهدف إلى بناء جسور تعاون مستقبلية لدعم الطالبات ومساعيهن الأكاديمية بشكل أكبر.\nخلال الفعالية، تم توزيع عدد من المنح الدراسية والمساعدات المالية على الطالبات الحاضرات، مما يعكس التزام الصندوق بدعم المسيرة التعليمية للشعب الفلسطيني وضمان الظروف المواتية لإكمال دراستهن الجامعية"
    },
    image: "/two/PHOTO-2025-04-20-18-04-03.jpg?height=400&width=600",
    category: {
      en: "Cultural Event",
      ar: "فعالية ثقافية"
    },
    featured: true,
    year: 2023,
  },
  {
    id: 3,
    title: {
      en: "The Palestinian Student Support Fund meets with Palestinian students to strengthen support and communication",
      ar: "تلتقي مؤسسة إسنَاد لدعم الطالب الفلسطيني مع الطلاب الفلسطينيين لتعزيز الدعم والتواصل"
    },
    date: {
      en: "November 5-6, 2022",
      ar: "5-6 نوفمبر 2022"
    },
    location: {
      en: "Kuala Lumpur, Malaysia",
      ar: "كوالالمبور، ماليزيا"
    },
    description: {
      en: "The Palestinian Student Support Fund organized a networking event in Malaysia, providing scholarships and financial aid to Palestinian students. The event strengthened direct communication and emphasized the Fund's commitment to supporting students worldwide.",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل في ماليزيا، قدم خلالها منحاً دراسية ومساعدات مالية للطلاب الفلسطينيين. عززت الفعالية التواصل المباشر وأكدت التزام المؤسسة بدعم الطلاب حول العالم."
    },
    full_description: {
      en: "Malaysia: The Palestinian Student Support Fund meets with Palestinian students to strengthen support and communication.\n\nThe Palestinian Student Support Fund organized a networking event with Palestinian students in Malaysia, aiming to foster connections, listen to their needs, and introduce them to the Fund's mission and its role in supporting their academic journey, reaffirming its commitment to supporting students wherever they may be.\n\nAs part of its vision to reach Palestinian students wherever they are, the Palestinian Student Support Fund organized a networking event with Palestinian students in Malaysia, aiming to strengthen direct communication, foster connections, and listen to their academic and living aspirations and needs.\nDuring the event, representatives of the Fund provided a comprehensive overview of its mission, goals, and its role in supporting Palestinian students and enabling them to pursue higher education in a stable and secure environment. The Fund also emphasized that its support for students knows no geographical boundaries.\nIn addition, scholarships and financial aid were awarded to the Palestinian students who participated in the event.",
      ar: " يلتقي صندوق دعم الطلاب الفلسطينيين مع الطلاب الفلسطينيين لتعزيز الدعم والتواصل\n\nنظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل مع الطلاب الفلسطينيين في ماليزيا، بهدف تعزيز الروابط والاستماع إلى احتياجاتهم والتعريف برسالة الصندوق ودوره في دعم مسيرتهم الأكاديمية، مؤكداً التزامه بدعم الطلاب أينما كانوا\n\nكجزء من رؤيته للوصول إلى الطلاب الفلسطينيين أينما كانوا، نظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل مع الطلاب الفلسطينيين في ماليزيا، بهدف تعزيز التواصل المباشر وبناء الروابط والاستماع إلى تطلعاتهم واحتياجاتهم الأكاديمية والمعيشية.\nخلال الفعالية، قدم ممثلو الصندوق نظرة شاملة عن رسالته وأهدافه ودوره في دعم الطلاب الفلسطينيين وتمكينهم من متابعة التعليم العالي في بيئة مستقرة وآمنة. كما أكد الصندوق أن دعمه للطلاب لا يعرف حدوداً جغرافية.\nكما تم منح منح دراسية ومساعدات مالية للطلاب الفلسطينيين الذين شاركوا في الفعالية"
    },
    image: "/three/PHOTO-2025-04-20-18-04-18.jpg?height=400&width=600",
    category: {
      en: "Education Fair",
      ar: "معرض تعليمي"
    },
    featured: true,
    year: 2022,
  },
  {
    id: 4,
    title: {
      en: "A networking event organized by the Palestinian Student Support Fund with Palestinian students, during which a number of financial scholarships were awarded",
      ar: "فعالية تواصل تنظمها مؤسسة إسنَاد لدعم الطالب الفلسطيني مع الطلاب الفلسطينيين، تم خلالها تقديم عدد من المنح الدراسية المالية"
    },
    date: {
      en: "August 10-12, 2022",
      ar: "10-12 أغسطس 2022"
    },
    location: {
      en: "Bishkek, Kyrgyzstan",
      ar: "بيشكيك، قيرغيزستان"
    },
    description: {
      en: "The Palestinian Student Support Fund organized a networking event in Kyrgyzstan, including a fraternal meal and financial scholarships. The event strengthened community bonds and promoted cooperation among Palestinian students abroad.",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل في قيرغيزستان، تضمنت وجبة غداء ومنحاً دراسية مالية. عززت الفعالية روابط المجتمع وشجعت التعاون بين الطلاب الفلسطينيين في الخارج."
    },
    full_description: {
      en: "Kyrgyzstan: A networking event organized by the Palestinian Student Support Fund with Palestinian students, during which a number of financial scholarships were awarded.\n\nThe Palestinian Student Support Fund organized a networking event with Palestinian students in Kyrgyzstan to learn about their experiences and needs, introduce them to the Fund's mission, and provide financial scholarships to all attendees.\n\nAs part of its ongoing efforts to reach Palestinian students around the world, the Palestinian Student Support Fund organized a networking event with Palestinian students in Kyrgyzstan.\nThe event aimed to foster connections, listen to the students' experiences and needs, and introduce them to the vital role the Fund plays in supporting their academic journeys and helping them overcome the challenges they face.\nThe gathering also included a fraternal meal, designed to enhance the spirit of friendliness and direct engagement between the students and the Fund's representatives. This initiative contributed to strengthening community bonds and promoting a spirit of cooperation and belonging among Palestinian students abroad.\nAt the conclusion of the event, financial scholarships were distributed to all participating students, reaffirming the Fund's unwavering commitment to supporting Palestinian students wherever they are and its dedication to accompanying them throughout their journey of learning and success, thereby enhancing their opportunities to achieve their academic goals.",
      ar: "قيرغيزستان: فعالية تواصل نظمها صندوق دعم الطلاب الفلسطينيين مع الطلاب الفلسطينيين، تم خلالها تقديم عدد من المنح الدراسية المالية\n\nنظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل مع الطلاب الفلسطينيين في قيرغيزستان للتعرف على تجاربهم واحتياجاتهم، والتعريف برسالة الصندوق، وتقديم منح دراسية مالية لجميع الحضور\n\nكجزء من جهوده المستمرة للوصول إلى الطلاب الفلسطينيين حول العالم، نظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل مع الطلاب الفلسطينيين في قيرغيزستان.\nهدفت الفعالية إلى تعزيز الروابط والاستماع إلى تجارب الطلاب واحتياجاتهم، والتعريف بالدور الحيوي الذي يلعبه الصندوق في دعم مسيرتهم الأكاديمية ومساعدتهم في تجاوز التحديات التي يواجهونها.\nكما تضمن اللقاء وجبة إخاء، صممت لتعزيز روح الود والتفاعل المباشر بين الطلاب وممثلي الصندوق. ساهمت هذه المبادرة في تعزيز روابط المجتمع وتعزيز روح التعاون والانتماء بين الطلاب الفلسطينيين في الخارج.\nفي ختام الفعالية، تم توزيع منح دراسية مالية على جميع الطلاب المشاركين، مؤكداً التزام الصندوق الثابت بدعم الطلاب الفلسطينيين أينما كانوا وتفانيه في مرافقتهم طوال رحلة التعلم والنجاح، مما يعزز فرصهم في تحقيق أهدافهم الأكاديمية"
    },
    image: "/four/PHOTO-2025-04-26-22-18-22 2.jpg?height=400&width=600",
    category: {
      en: "Workshop",
      ar: "ورشة عمل"
    },
    featured: false,
    year: 2022,
  },
  {
    id: 5,
    title: {
      en: "The Palestinian Student Support Fund organizes a friendly match with Palestinian students in Turkey, as a recreational initiative to strengthen engagement with the students",
      ar: "تنظم مؤسسة إسنَاد لدعم الطالب الفلسطيني مباراة ودية مع الطلاب الفلسطينيين في تركيا، كمبادرة ترفيهية لتعزيز التواصل مع الطلاب"
    },
    date: {
      en: "April 22-23, 2022",
      ar: "22-23 أبريل 2022"
    },
    location: {
      en: "İstanbul, Türkiye",
      ar: "إسطنبول، تركيا"
    },
    description: {
      en: "The Palestinian Student Support Fund organized a friendly football match in Istanbul, bringing together Palestinian students in a relaxed atmosphere. The event strengthened bonds and provided an opportunity to introduce the Fund's mission in an informal setting.",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني مباراة ودية في إسطنبول، جمعت الطلاب الفلسطينيين في أجواء مريحة. عززت الفعالية الروابط ووفرت فرصة للتعريف برسالة المؤسسة في إطار غير رسمي."
    },
    full_description: {
      en: "The Palestinian Student Support Fund organizes a friendly match with Palestinian students in Turkey, as a recreational initiative to strengthen engagement with the students.\n\nThe Palestinian Student Support Fund organized a friendly football match that brought together a number of Palestinian students in istanbul, Turkey. The event aimed to strengthen bonds and foster friendly interaction, creating a space for networking and communication in an informal atmosphere, while also introducing the Fund's mission and activities.\n\nAs part of its efforts to strengthen engagement with Palestinian students abroad, the Palestinian Student Support Fund organized a friendly football match on (...) in istanbul, bringing together a number of Palestinian students in Turkey amid an atmosphere of energy and interaction.\nThis sports initiative came within the Fund's broader efforts to build direct relationships with students, create a supportive environment that fosters networking and breaks down formal barriers, and to present a lively image of the Fund's activities and its mission of support for students.\nThe match received a positive response from the participants, who expressed their happiness with the initiative, appreciating the opportunity it provided for social bonding and for getting to know the Fund's activities in a friendly and informal setting.",
      ar: "ينظم صندوق دعم الطلاب الفلسطينيين مباراة ودية مع الطلاب الفلسطينيين في تركيا، كمبادرة ترفيهية لتعزيز التواصل مع الطلاب\n\nنظم صندوق دعم الطلاب الفلسطينيين مباراة ودية جمعت عدداً من الطلاب الفلسطينيين في إسطنبول، تركيا. هدفت الفعالية إلى تعزيز الروابط وتعزيز التفاعل الودي، وخلق مساحة للتواصل والشبكات في أجواء غير رسمية، مع التعريف برسالة الصندوق وأنشطته\n\nكجزء من جهوده لتعزيز التواصل مع الطلاب الفلسطينيين في الخارج، نظم صندوق دعم الطلاب الفلسطينيين مباراة ودية في (...) في إسطنبول، جمعت عدداً من الطلاب الفلسطينيين في تركيا وسط أجواء من الطاقة والتفاعل.\nجاءت هذه المبادرة الرياضية ضمن جهود الصندوق الأوسع لبناء علاقات مباشرة مع الطلاب، وخلق بيئة داعمة تعزز التواصل وتكسر الحواجز الرسمية، وتقديم صورة حية لأنشطة الصندوق ورسالته الداعمة للطلاب.\nلقيت المباراة استجابة إيجابية من المشاركين، الذين أعربوا عن سعادتهم بالمبادرة، مع تقديرهم للفرصة التي وفرتها للتواصل الاجتماعي والتعرف على أنشطة الصندوق في إطار ودي وغير رسمي."
    },
    image: "/five/DSC07508.jpg?height=400&width=600",
    category: {
      en: "Seminar",
      ar: "ندوة"
    },
    featured: false,
    year: 2022,
  },
  {
    id: 6,
    title: {
      en: "The Palestinian Student Support Fund meets with Palestinian students in Egypt and provides them with financial scholarships",
      ar: "تلتقي مؤسسة إسنَاد لدعم الطالب الفلسطيني مع الطلاب الفلسطينيين في مصر ويقدم لهم منحاً دراسية مالية"
    },
    date: {
      en: "October 15-17, 2021",
      ar: "15-17 أكتوبر 2021"
    },
    location: {
      en: "Cairo, Eygpt",
      ar: "القاهرة، مصر"
    },
    description: {
      en: "The Palestinian Student Support Fund organized a networking event in Egypt, providing financial grants and fostering connections between Palestinian students. The event highlighted the Fund's role as a pillar of support for students' academic success.",
      ar: "نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني فعالية تواصل في مصر، قدم خلالها منحاً مالية وعزز الروابط بين الطلاب الفلسطينيين. أبرزت الفعالية دور المؤسسة كركيزة دعم لنجاح الطلاب الأكاديمي."
    },
    full_description: {
      en: "The Palestinian Student Support Fund meets with Palestinian students in Egypt and provides them with financial scholarships.\n\nThe Palestinian Student Support Fund organized a networking event with Palestinian students in Egypt, aiming to foster connections and listen to their views and needs. During the event, financial scholarships were distributed to the attendees, who expressed their appreciation for the Fund's role in supporting their educational journey.\n\nAs part of its ongoing efforts to enhance communication with Palestinian students abroad, the Palestinian Student Support Fund organized a networking event in the Arab Republic of Egypt, bringing together a number of Palestinian students to engage directly with each other and learn about their educational and living needs.\nDuring the meeting, the Fund provided several financial grants to the students in attendance, supporting their academic journeys and alleviating their living burdens. This initiative was met with positive feedback from those present, who expressed their gratitude and appreciation to the Fund, praising its role in accompanying them throughout their educational journeys and its commitment to reaching Palestinian students wherever they are.\nThe participating students also invited their Palestinian colleagues to learn more about the Fund's mission and benefit from its programs, emphasizing that the Palestinian Student Support Fund constitutes a true pillar of support for students at home and abroad, enhancing their opportunities for academic success.",
      ar: "يلتقي صندوق دعم الطلاب الفلسطينيين مع الطلاب الفلسطينيين في مصر ويقدم لهم منحاً دراسية مالية\n\nنظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل مع الطلاب الفلسطينيين في مصر، بهدف تعزيز الروابط والاستماع إلى آرائهم واحتياجاتهم. خلال الفعالية، تم توزيع منح دراسية مالية على الحضور، الذين أعربوا عن تقديرهم لدور الصندوق في دعم مسيرتهم التعليمية\n\nكجزء من جهوده المستمرة لتعزيز التواصل مع الطلاب الفلسطينيين في الخارج، نظم صندوق دعم الطلاب الفلسطينيين فعالية تواصل في جمهورية مصر العربية، جمعت عدداً من الطلاب الفلسطينيين للتواصل المباشر مع بعضهم البعض والتعرف على احتياجاتهم التعليمية والمعيشية.\nخلال اللقاء، قدم الصندوق عدة منح مالية للطلاب الحاضرين، دعماً لمسيرتهم الأكاديمية وتخفيفاً لأعبائهم المعيشية. لقيت هذه المبادرة استجابة إيجابية من الحاضرين، الذين أعربوا عن امتنانهم وتقديرهم للصندوق، مشيدين بدوره في مرافقتهم طوال مسيرتهم التعليمية والتزامه بالوصول إلى الطلاب الفلسطينيين أينما كانوا.\nكما دعا الطلاب المشاركون زملاءهم الفلسطينيين للتعرف أكثر على رسالة الصندوق والاستفادة من برامجه، مؤكدين أن صندوق دعم الطلاب الفلسطينيين يشكل ركيزة دعم حقيقية للطلاب في الداخل والخارج، مما يعزز فرص نجاحهم الأكاديمي."
    },
    image: "/six/PHOTO-2025-04-26-22-24-15.jpg?height=400&width=600",
    category: {
      en: "Networking",
      ar: "تواصل"
    },
    featured: false,
    year: 2021,
  },
  {
    id: 7,
    title: {
      en: "The Palestinian Student Support Fund in Mauritania Organizes a Meeting with Palestinian Students",
      ar: "مؤسسة إسنَاد لدعم الطالب الفلسطيني في موريتانيا تنظم لقاء مع الطلاب الفلسطينيين"
    },
    date: {
      en: "October 15-17, 2021",
      ar: "15-17 أكتوبر 2021"
    },
    location: {
      en: "Nouakchott, mauritania",
      ar: "نواكشوط، موريتانيا"
    },
    description: {
      en: "As part of its efforts to reach the largest number of Palestinian students, the Palestinian Student Support Fund organized a networking meeting in Mauritania bringing together Palestinian students with Mauritanian and Palestinian figures. Financial grants were distributed during the meeting, along with an agreement to provide recurring monthly grants to support Palestinian students there.",
      ar: "كجزء من جهودها للوصول إلى أكبر عدد من الطلاب الفلسطينيين، نظمت مؤسسة إسنَاد لدعم الطالب الفلسطيني لقاء تواصل في موريتانيا جمع الطلاب الفلسطينيين مع شخصيات موريتانية وفلسطينية. تم توزيع منح مالية خلال اللقاء، إلى جانب اتفاقية لتقديم منح شهرية متكررة لدعم الطلاب الفلسطينيين هناك"
    },
    full_description: {
      en: "The Palestinian Student Support Fund in Mauritania Organizes a Meeting with Palestinian Students\n\nAs part of its efforts to reach the largest number of Palestinian students, the Palestinian Student Support Fund organized a networking meeting in Mauritania bringing together Palestinian students with Mauritanian and Palestinian figures. Financial grants were distributed during the meeting, along with an agreement to provide recurring monthly grants to support Palestinian students there.\n\nAs part of expanding its efforts to support Palestinian students around the world, the Palestinian Student Support Fund organized a networking meeting in Mauritania, attended by a number of Palestinian students, along with prominent Mauritanian and Palestinian figures. The meeting provided an important platform for acquaintance, strengthening ties, and exchanging views on ways to support Palestinian students residing in Mauritania.\nDuring the meeting, direct financial grants were distributed to a number of students, demonstrating the Fund's commitment to providing practical and sustainable support to students abroad. An agreement was also announced to provide recurring monthly grants to Palestinian students in Mauritania, a qualitative development in the Fund's efforts to enhance the stability of support and expand its scope.\nThe meeting was widely welcomed by attendees, who praised the initiative and considered it a strong boost to students' educational progress and an example of the true partnership between the Palestinian and Mauritanian peoples in supporting education and human dignity.",
      ar: "صندوق دعم الطلاب الفلسطينيين في موريتانيا ينظم لقاء مع الطلاب الفلسطينيين\n\nكجزء من جهوده للوصول إلى أكبر عدد من الطلاب الفلسطينيين، نظم صندوق دعم الطلاب الفلسطينيين لقاء تواصل في موريتانيا جمع الطلاب الفلسطينيين مع شخصيات موريتانية وفلسطينية. تم توزيع منح مالية خلال اللقاء، إلى جانب اتفاقية لتقديم منح شهرية متكررة لدعم الطلاب الفلسطينيين هناك\n\nكجزء من توسيع جهوده لدعم الطلاب الفلسطينيين حول العالم، نظم صندوق دعم الطلاب الفلسطينيين لقاء تواصل في موريتانيا، حضرته مجموعة من الطلاب الفلسطينيين، إلى جانب شخصيات بارزة من موريتانيا وفلسطين. وفر اللقاء منصة مهمة للتعارف وتعزيز الروابط وتبادل الآراء حول سبل دعم الطلاب الفلسطينيين المقيمين في موريتانيا.\nخلال اللقاء، تم توزيع منح مالية مباشرة على عدد من الطلاب، مما يعكس التزام الصندوق بتقديم دعم عملي ومستدام للطلاب في الخارج. كما تم الإعلان عن اتفاقية لتقديم منح شهرية متكررة للطلاب الفلسطينيين في موريتانيا، وهو تطور نوعي في جهود الصندوق لتعزيز استقرار الدعم وتوسيع نطاقه.\nلقيت المبادرة ترحيباً واسعاً من الحاضرين، الذين أشادوا بالمبادرة واعتبروها دفعة قوية لتقدم الطلاب التعليمي ومثالاً على الشراكة الحقيقية بين الشعبين الفلسطيني والموريتاني في دعم التعليم والكرامة الإنسانية"
    },
    image: "/seven/1.jpeg?height=400&width=600",
    category: {
      en: "Networking",
      ar: "تواصل"
    },
    featured: false,
    year: 2021,
  }
]