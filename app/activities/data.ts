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
      en: "Isnad Foundation organizes a networking meeting with Palestinian students in Turkey and offers them a number of scholarships",
      ar: "مؤسسة إسناد تنظم لقاء تواصليا  مع الطلاب الفلسطينيين في تركيا وتقدم لهم عددا من المنح"
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
      en: "The Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Turkey, aiming to understand their conditions and needs and work on meeting them within its future plans, while distributing scholarships and financial assistance, in a step that reflects the Foundation's commitment to supporting Palestinian students.",
      ar: "نظمت مؤسسة إسناد لدعم  الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في تركيا، بهدف التعرف على أوضاعهم واحتياجاتهم والعمل على تلبيتها ضمن خططه المستقبلية، مع توزيع منح ومساعدات مالية، في خطوة تعكس التزام المؤسسة بدعم الطلبة الفلسطينيين."
    },
    full_description: {
      en: "As part of its efforts to strengthen communication with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Turkey, aiming to closely understand their academic and living conditions, listen to their various needs and demands, in preparation for including them within the future plans that the Foundation is working to accomplish.\n\nThe meeting constituted an important station for launching a new phase of support and follow-up for Palestinian students in Turkey, through providing psychological, social, and educational support, and strengthening communication channels with them.\n\nDuring the meeting, a number of scholarships and financial assistance were distributed to the attending students, in a step that reflects the Foundation's commitment to supporting the educational journey of the Palestinian people, and providing suitable conditions for completing their university studies.",
      ar: "في إطار جهودها لتعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت  مؤسسة إسناد لدعم  الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في تركيا، بهدف التعرف عن كثب على أوضاعهم الأكاديمية والمعيشية، والاستماع إلى احتياجاتهم ومطالبهم المختلفة، تمهيدًا لتضمينها ضمن الخطط المستقبلية التي تعمل  المؤسسة على إنجازها.\n\nوشكّل اللقاء محطة هامة لتدشين مرحلة جديدة من الاحتضان والمتابعة للطلبة الفلسطينيين في تركيا، من خلال توفير الدعم النفسي والاجتماعي والتربوي، وتعزيز قنوات الاتصال معهم.\n\nوخلال اللقاء، تم توزيع مجموعة من المنح والمساعدات المالية على الطلاب الحاضرين، في خطوة تعكس التزام المؤسسة بدعم المسيرة التعليمية لأبناء الشعب الفلسطيني، وتوفير الظروف الملائمة لاستكمال دراستهم الجامعية."
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
      en: "Isnad Foundation meets with Palestinian female students in Turkey and offers them a number of scholarships",
      ar: "مؤسسة اسناد تلتقي بالطالبات الفلسطينيات في تركيا وتقدم لهن عددا من المنح"
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
      en: "The Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian female students in Turkey, to understand their needs and introduce them to its supportive mission, within the framework of strengthening communication and building future cooperation that serves their academic journey, and during the meeting, a number of financial scholarships were provided to all participating female students.",
      ar: "نظمت مؤسسة اسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطالبات الفلسطينيات في تركيا، للتعرف على احتياجاتهن وتعريفهن برسالته الداعمة، في إطار تعزيز التواصل وبناء تعاون مستقبلي يخدم مسيرتهن الأكاديمية، كما تم خلال اللقاء تقديم عدد من المنح المالية لجميع الطالبات المشاركات فيه."
    },
    full_description: {
      en: "In the context of strengthening communication with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) organized on (...) a special networking meeting for Palestinian female students in Turkey, aiming to closely understand their academic and living experiences, and listen to their needs. The meeting also included an introduction to the Foundation's mission and goals in supporting the educational journey. The meeting provided a space for open dialogue and exchange of opinions, in a step aimed at building future bridges of cooperation that enhance support for female students and their academic journey.\n\nDuring the meeting, a number of scholarships and financial assistance were distributed to the attending female students, in a step that reflects the Foundation's commitment to supporting the educational journey of the Palestinian people, and providing suitable conditions for completing their university studies.",
      ar: "في سياق تعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت مؤسسة اسناد لدعم الطالب الفلسطيني بتاريخ 18 مارس 2023 لقاءً تواصليًا خاصًا بالطالبات الفلسطينيات في تركيا، بهدف التعرف على تجاربهن الأكاديمية والمعيشية عن قرب، والاستماع إلى احتياجاتهن. كما تضمن اللقاء تعريفًا برسالة المؤسسة وأهدافها في دعم المسيرة التعليمية. وشكّل اللقاء مساحة للحوار المفتوح وتبادل الآراء، في خطوة تهدف إلى بناء جسور تعاون مستقبلية تعزز من دعم الطالبات ومسيرتهن الأكاديمية.\n\nوخلال اللقاء، تم توزيع مجموعة من المنح والمساعدات المالية على الطالبات الحاضرات، في خطوة تعكس التزام المؤسسة بدعم المسيرة التعليمية لأبناء الشعب الفلسطيني، وتوفير الظروف الملائمة لاستكمال دراستهم الجامعية."
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
      en: "Isnad Foundation meets with Palestinian students in Malaysia to strengthen support and communication",
      ar: "مؤسسة إسناد تلتقي مع طلبة فلسطين في ماليزيا لتعزيز الدعم والتواصل"
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
      en: "The Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Malaysia, aiming to get acquainted and listen to their needs, and introduce them to the Foundation's mission and its role in supporting their academic journey, reaffirming its commitment to supporting students wherever they may be.",
      ar: "نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في ماليزيا، بهدف التعارف والاستماع لاحتياجاتهم، وتعريفهم برسالة المؤسسة ودورها في دعم مسيرتهم الأكاديمية، تأكيدًا على التزامها بدعم الطلبة أينما وجدوا."
    },
    full_description: {
      en: "As part of its vision aimed at reaching Palestinian students in various places of their presence, the Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Malaysia, aiming to strengthen direct communication and acquaintance, and listen to their aspirations and academic and living needs.\n\nDuring the meeting, the Foundation's representatives provided a comprehensive introduction to its mission and goals, and its role in supporting Palestinian students and enabling them to continue their higher education in a stable and secure environment. The Foundation also emphasized that its support for students is not limited by geography.\n\nDuring the meeting, the Foundation provided scholarships and financial assistance to the Palestinian students participating in the meeting.",
      ar: "في إطار رؤيتها الهادفة إلى الوصول للطلبة الفلسطينيين في مختلف أماكن تواجدهم، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في ماليزيا، بهدف تعزيز التواصل والتعارف المباشر، والاستماع إلى تطلعاتهم واحتياجاتهم الأكاديمية والمعيشية.\n\nوخلال اللقاء، قدّم ممثلو المؤسسة تعريفًا شاملاً برسالتها وأهدافها، ودورها في دعم الطلبة الفلسطينيين وتمكينهم من مواصلة تعليمهم العالي في بيئة مستقرة وآمنة. كما شددت المؤسسة على أن دعمها للطلبة لا تحدّه الجغرافيا.\n\nوخلال اللقاء قدمت المؤسسة منحا ومساعدات مالية إلى الطلبة الفلسطينيين المشاركين في اللقاء."
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
      en: "A networking meeting held by the Isnad Foundation with Palestinian students during which it provided a number of financial scholarships",
      ar: "لقاء تواصلي عقدته مؤسسة إسناد مع الطلبة الفلسطينيين قدمت خلاله عددا من المنح المالية"
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
      en: "The Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Kyrgyzstan to understand their experiences and needs, and introduce them to the Foundation's mission, while providing financial scholarships to all attendees.",
      ar: "نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في قرغيزستان للتعرف على تجاربهم واحتياجاتهم، وتعريفهم برسالة المؤسسة ، مع تقديم منح مالية لجميع الحاضرين."
    },
    full_description: {
      en: "As part of its continuous pursuit to reach Palestinian students around the world, the Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Kyrgyzstan. The meeting aimed to get acquainted and listen to the students' experiences and needs, and introduce them to the role that the Palestinian Student Support Fund (Isnad) plays in supporting their academic journey, and helping them overcome the challenges they face.\n\nThe meeting also included an invitation to a fraternal meal, in an effort to enhance the atmosphere of friendship and direct communication between students and Foundation representatives, which contributes to strengthening community bonds and promoting a spirit of cooperation and belonging among Palestinian students abroad.\n\nAt the conclusion of the meeting, financial scholarships were provided to all attending male and female students, reaffirming the Foundation's continuous commitment to supporting them everywhere, and its keenness to accompany them on their journey of learning and success, which enhances their opportunities to achieve their academic goals.",
      ar: "في إطار سعيها المستمر للوصول إلى الطلبة الفلسطينيين في مختلف أنحاء العالم، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في قرغيزستان. وهدف اللقاء إلى التعارف والاستماع إلى تجارب الطلبة واحتياجاتهم، وتعريفهم بالدور الذي تلعبه مؤسسة إسناد لدعم الطالب الفلسطيني في دعم مسيرتهم الأكاديمية، ومساعدتهم على تجاوز التحديات التي يواجهونها\n\nكما تخلل اللقاء دعوة إلى مأدبة طعام أخوية، حرصًا على تعزيز أجواء الود والتواصل المباشر بين الطلبة وممثلي المؤسسة ، وهو ما يساهم في تقوية الروابط المجتمعية وتعزيز روح التعاون والانتماء بين الطلبة الفلسطينيين في الخارج.\n\nوفي ختام اللقاء، تم تقديم منح مالية لجميع الطلبة والطالبات الحاضرين، تأكيدًا على التزام المؤسسة المستمر بدعمهم في كل مكان، وحرصها على مرافقتهم في رحلة العلم والنجاح، بما يعزز من فرصهم في تحقيق أهدافهم الأكاديمية."
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
      en: "In a recreational step to strengthen communication with Palestinian students, the Isnad Foundation organizes a friendly match with Palestinian students in Turkey",
      ar: "في خطوة ترفيهية لتعزيز التواصل مع الطلاب الفلسطينبين مؤسسة إسناد تنظم مباراة ودية مع الطلبة الفلسطينيين في تركيا"
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
      en: "The Palestinian Student Support Fund (Isnad) organized a friendly football match that brought together a number of Palestinian students in Turkey, Istanbul, aiming to strengthen bonds and foster brotherly interaction, and create a space for acquaintance and communication in informal atmospheres, while introducing the Foundation's mission and activities.",
      ar: "نظمت مؤسسة إسناد لدعم الطالب الفلسطيني مباراة كرة قدم ودية جمعت عددًا من الطلبة الفلسطينيين في تركيا، اسطنبول ، بهدف تعزيز الروابط والتفاعل الأخوي، وخلق مساحة للتعارف والتواصل في أجواء غير رسمية، مع التعريف برسالة المؤسسة وأنشطتها."
    },
    full_description: {
      en: "As part of its efforts to strengthen communication with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) organized a friendly football match on April 22 in Istanbul, bringing together a number of Palestinian students in Turkey, amid an atmosphere of interaction and vitality.\n\nThis sports initiative came within the framework of the Foundation's pursuit to build direct relationships with students, and create a supportive environment that allows them to get acquainted and break barriers away from formal frameworks, in addition to presenting a lively image of the Foundation's activities and the supportive message it carries for students.\n\nThe match received positive interaction from the participants, who expressed their happiness with the initiative, for the opportunity it provided for social bonding, and getting to know the Foundation's activities in a spontaneous and appealing manner.",
      ar: "في إطار جهودها لتعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني مباراة كرة قدم ودية بتاريخ 22 أبريل في اسطنبول، جمعت عددًا من الطلبة الفلسطينيين في تركيا، وسط أجواء من التفاعل والحيوية.\n\nوجاءت هذه المبادرة الرياضية في سياق سعي المؤسسة إلى بناء علاقات مباشرة مع الطلبة، وخلق بيئة داعمة تتيح لهم التعارف وكسر الحواجز بعيدًا عن الأطر الرسمية، إضافة إلى تقديم صورة حيوية عن أنشطة المؤسسة ورسالة الدعم التي يحملها للطلبة.\n\nوقد لاقت المباراة تفاعلًا إيجابيًا من المشاركين، الذين عبّروا عن سعادتهم بالمبادرة، لما أتاحته من فرصة للترابط الاجتماعي، والتعرف على أنشطة المؤسسة بشكل عفوي ومحبّب."
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
      en: "Isnad Foundation meets with Palestinian students in Egypt and provides them with financial scholarships",
      ar: "مؤسسة إسناد تلتقي طلبة فلسطين في مصر وتقدم لهم منحا مالية"
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
      en: "The Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Egypt, aiming to get acquainted and listen to their opinions and needs, and during which financial scholarships were distributed to the attendees, who expressed their appreciation for the Foundation's role in supporting their educational journey.",
      ar: "نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في مصر، بهدف التعارف والاستماع لآرائهم واحتياجاتهم، وتم خلاله توزيع منح مالية على الحاضرين، الذين عبّروا عن تقديرهم لدور المؤسسة في دعم مسيرتهم التعليمية."
    },
    full_description: {
      en: "As part of its continuous efforts to strengthen communication with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) organized a networking meeting in the Arab Republic of Egypt, bringing together a number of Palestinian male and female students, aiming for direct acquaintance and understanding of their opinions and educational and living needs.\n\nDuring the meeting, the Foundation provided a number of financial scholarships to the attending students, in support of their academic journey and to alleviate their living burdens. This initiative received positive interaction from the attendees, who expressed in their words their thanks and gratitude to the Foundation, praising its role in accompanying them during their educational journey, and its keenness to reach Palestinian students in various places of their presence.\n\nThe participating students also invited their Palestinian colleagues to learn more about the Foundation's mission and benefit from its programs, emphasizing that the Palestinian Student Support Fund (Isnad) constitutes a true pillar of support for students at home and abroad, and enhances their opportunities to achieve academic success.",
      ar: "ضمن جهودها المتواصلة لتعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا في جمهورية مصر العربية، جمع عددًا من الطلبة والطالبات الفلسطينيين، بهدف التعارف المباشر والاطلاع على آرائهم واحتياجاتهم التعليمية والمعيشية.\n\nوخلال اللقاء، قدّمت المؤسسة عددًا من المنح المالية للطلبة الحاضرين، دعمًا لمسيرتهم الأكاديمية وتخفيفًا من أعبائهم المعيشية. وقد لاقت هذه المبادرة تفاعلًا إيجابيًا من الحاضرين، الذين عبّروا في كلمات لهم عن شكرهم وامتنانهم للمؤسسة ، مشيدين بدورها في مرافقتهم خلال مسيرتهم التعليمية، وبحرصها على الوصول إلى الطلبة الفلسطينيين في مختلف أماكن تواجدهم.\n\nكما دعا المشاركون من الطلبة زملاءهم الفلسطينيين إلى التعرف أكثر على رسالة المؤسسة والاستفادة من برامجها، مؤكدين أن مؤسسة إسناد لدعم الطالب الفلسطيني يشكل ركيزة حقيقية لدعم الطلبة في الداخل والخارج، وتعزيز فرصهم في تحقيق النجاح الأكاديمي."
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
      en: "Isnad Foundation in Mauritania organizes a meeting with Palestinian students and provides them with financial scholarships",
      ar: "مؤسسة إسناد في موريتانيا تنظم لقاء مع الطلاب الفلسطينيين وتقدم لهم منحا مالية"
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
      en: "As part of its pursuit to reach the largest number of Palestinian students, the Palestinian Student Support Fund (Isnad) organized a networking meeting in Mauritania bringing together Palestinian students with Mauritanian and Palestinian figures, and during which financial scholarships were distributed, along with an agreement to provide regular monthly scholarships to support Palestinian students there.",
      ar: "ضمن سعيها للوصول إلى أكبر عدد من الطلاب الفلسطينين، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا في موريتانيا جمع طلبة فلسطينيين مع شخصيات موريتانية وفلسطينية، وتم خلاله توزيع منح مالية، إلى جانب الاتفاق على صرف منح شهرية دورية لدعم الطلبة الفلسطينيين هناك."
    },
    full_description: {
      en: "As part of expanding its efforts to support Palestinian students around the world, the Palestinian Student Support Fund (Isnad) organized a networking meeting in Mauritania, attended by a number of Palestinian students along with prominent Mauritanian and Palestinian figures. The meeting constituted an important platform for acquaintance and strengthening bonds, and exchanging visions on ways to support Palestinian students residing in Mauritania.\n\nDuring the meeting, direct financial scholarships were distributed to a number of students, in a step that expresses the Foundation's commitment to providing practical and sustainable support to students outside their homeland. An agreement was also announced to provide regular monthly scholarships to Palestinian students in Mauritania, which represents a qualitative development in the Foundation's efforts to enhance the stability of support and expand its umbrella.\n\nThe meeting received wide welcome from the attendees, who praised this initiative and considered it a strong boost to the students' educational journey, and an example of the true partnership between the Palestinian and Mauritanian peoples in supporting educational issues and human dignity.",
      ar: "في إطار توسيع جهودها لدعم الطلبة الفلسطينيين في مختلف أنحاء العالم، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا في موريتانيا، حضره عدد من الطلبة الفلسطينيين إلى جانب شخصيات موريتانية وفلسطينية بارزة. وقد شكّل اللقاء منصة مهمة للتعارف وتعزيز الروابط، وتبادل الرؤى حول سبل دعم الطلبة الفلسطينيين المقيمين في موريتانيا.\n\nوخلال اللقاء، تم توزيع منح مالية مباشرة على عدد من الطلبة، في خطوة تعبّر عن التزام المؤسسة بتقديم الدعم العملي والمستدام للطلبة خارج الوطن. كما أُعلن عن اتفاق يقضي بصرف منح شهرية دورية للطلبة الفلسطينيين في موريتانيا، ما يُعد تطورًا نوعيًا في جهود المؤسسة لتعزيز استقرارية الدعم وتوسيع مظلتها.\n\nوقد لاقى اللقاء ترحيبًا واسعًا من الحضور، الذين أشادوا بهذه المبادرة واعتبروها دفعة قوية للمسيرة التعليمية للطلبة، ومثالًا على الشراكة الحقيقية بين الشعبين الفلسطيني والموريتاني في دعم قضايا التعليم والكرامة الإنسانية."
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