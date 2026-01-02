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
    id: 0,
    title: {
      en: "Pulse of Life Scholarship Supports Medical Students in Gaza in Partnership with Biman Foundation",
      ar: "منحة نبض الحياة تدعم طلبة الطب في غزة بالشراكة مع مؤسسة بيمان"
    },
    date: {
      en: "January 1, 2026",
      ar: "1 يناير 2026"
    },
    location: {
      en: "Gaza Strip, Palestine",
      ar: "قطاع غزة، فلسطين"
    },
    description: {
      en: "As part of the \"Pulse of Life\" Scholarship, Isnad Foundation for Supporting Palestinian Students continues its humanitarian and educational efforts to empower Palestinian youth, in cooperation with Biman Foundation, through the provision of scholarships dedicated to medical students in the Gaza Strip.",
      ar: "في إطار منحة «نبض الحياة»، تواصل مؤسسة إسناد لدعم الطالب الفلسطيني جهودها الحثيثة في تمكين الطلبة الفلسطينيين ودعم مسيرتهم التعليمية، وذلك بالتعاون مع مؤسسة بيمان، من خلال تقديم منح دراسية مخصصة لطلبة الطب في قطاع غزة."
    },
    full_description: {
      en: "As part of the \"Pulse of Life\" Scholarship, Isnad Foundation for Supporting Palestinian Students continues its humanitarian and educational efforts to empower Palestinian youth, in cooperation with Biman Foundation, through the provision of scholarships dedicated to medical students in the Gaza Strip.\n\nThis initiative aims to support students' academic journeys and enhance their ability to continue their education despite the severe humanitarian, economic, and academic challenges imposed by the current conditions.\n\nThe scholarship targets outstanding medical students who face financial hardships, ensuring continuity in their studies and helping safeguard the future of the healthcare sector in Gaza. By investing in medical education, the program contributes to building a resilient generation capable of serving their community in times of crisis and recovery.\n\nIsnad Foundation for Supporting Palestinian Students is a non-profit organization dedicated to supporting Palestinian university students through scholarships and educational programs. The foundation works to expand access to higher education and empower talented students to achieve academic excellence.\n\nTogether, we plant hope and build a future our students truly deserve.",
      ar: "في إطار منحة «نبض الحياة»، تواصل مؤسسة إسناد لدعم الطالب الفلسطيني جهودها الحثيثة في تمكين الطلبة الفلسطينيين ودعم مسيرتهم التعليمية، وذلك بالتعاون مع مؤسسة بيمان، من خلال تقديم منح دراسية مخصصة لطلبة الطب في قطاع غزة.\n\nوتهدف هذه المنح إلى مساندة الطلبة أكاديميًا، وتخفيف الأعباء المالية عنهم، وتعزيز قدرتهم على الاستمرار في التعليم الجامعي رغم الظروف الإنسانية والاقتصادية الصعبة التي يعيشها القطاع.\n\nوتأتي هذه المبادرة انطلاقًا من إيمان المؤسستين بأهمية الاستثمار في التعليم، لا سيما في القطاع الطبي، باعتباره ركيزة أساسية في بناء المجتمعات وتعزيز صمودها، حيث تسعى المنحة إلى توفير بيئة تعليمية أكثر استقرارًا للطلبة، وتمكينهم من استكمال دراستهم وتحقيق طموحاتهم العلمية والمهنية.\n\nوتُعد مؤسسة إسناد لدعم الطالب الفلسطيني مؤسسة إنسانية تعليمية تُعنى بدعم طلبة الجامعات الفلسطينيين داخل فلسطين وخارجها، من خلال برامج منح دراسية ومشاريع تمكين أكاديمي وتنموي تهدف إلى بناء جيل متعلم وقادر على قيادة المستقبل.\n\nمعًا نزرع الأمل، ونصنع مستقبلًا يستحقه طلابنا."
    },
    image: "/1-1-2026/6.jpeg",
    category: {
      en: "Scholarships",
      ar: "المنح الدراسية"
    },
    featured: true,
    year: 2026,
  },
  {
    id: 1,
    title: {
      en: "Isnad Foundation Organizes Networking Meeting with Palestinian Students in Turkey and Offers Scholarships",
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
      en: "As part of its ongoing efforts to strengthen communication with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) held a networking meeting with Palestinian students in Turkey. The event aimed to gain a deeper understanding of their academic and living conditions, and to listen to their diverse needs and concerns—preparing to include them in the Foundation’s future plans.\n\nThe meeting marked an important milestone in launching a new phase of support and follow-up for Palestinian students in Turkey, focusing on psychological, social, and educational assistance, as well as strengthening communication channels.\n\nDuring the meeting, several scholarships and financial assistance were awarded to the attending students, reflecting the Foundation’s commitment to supporting the educational journey of the Palestinian people and ensuring favorable conditions for completing their university studies.",
      ar: "في إطار جهودها لتعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت  مؤسسة إسناد لدعم  الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في تركيا، بهدف التعرف عن كثب على أوضاعهم الأكاديمية والمعيشية، والاستماع إلى احتياجاتهم ومطالبهم المختلفة، تمهيدًا لتضمينها ضمن الخطط المستقبلية التي تعمل  المؤسسة على إنجازها.\n\nوشكّل اللقاء محطة هامة لتدشين مرحلة جديدة من الاحتضان والمتابعة للطلبة الفلسطينيين في تركيا، من خلال توفير الدعم النفسي والاجتماعي والتربوي، وتعزيز قنوات الاتصال معهم.\n\nوخلال اللقاء، تم توزيع مجموعة من المنح والمساعدات المالية على الطلاب الحاضرين، في خطوة تعكس التزام المؤسسة بدعم المسيرة التعليمية لأبناء الشعب الفلسطيني، وتوفير الظروف الملائمة لاستكمال دراستهم الجامعية."
    },
    image: "/one/PHOTO-2025-04-20-18-03-47 5.jpg",
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
      en: "Isnad Foundation Meets with Palestinian Female Students in Turkey, Offering Scholarships",
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
      en: "As part of its ongoing efforts to strengthen ties with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) held a special networking meeting on (…) for Palestinian female students in Turkey. The gathering aimed to better understand their academic and daily life experiences and respond to their needs and aspirations. The event featured an introduction to the Foundation’s mission and goals in supporting students throughout their educational journey. It also provided a space for open dialogue and the exchange of ideas—an important step toward building future bridges of cooperation that will enhance support for female students and their pursuit of academic excellence.\n\nDuring the meeting, several scholarships and financial assistance were awarded to the attending female students. This step reflects the Foundation’s commitment to supporting the educational journey of the Palestinian community and creating the right conditions for completing their university studies.",
      ar: "في سياق تعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت مؤسسة اسناد لدعم الطالب الفلسطيني بتاريخ 18 مارس 2023 لقاءً تواصليًا خاصًا بالطالبات الفلسطينيات في تركيا، بهدف التعرف على تجاربهن الأكاديمية والمعيشية عن قرب، والاستماع إلى احتياجاتهن. كما تضمن اللقاء تعريفًا برسالة المؤسسة وأهدافها في دعم المسيرة التعليمية. وشكّل اللقاء مساحة للحوار المفتوح وتبادل الآراء، في خطوة تهدف إلى بناء جسور تعاون مستقبلية تعزز من دعم الطالبات ومسيرتهن الأكاديمية.\n\nوخلال اللقاء، تم توزيع مجموعة من المنح والمساعدات المالية على الطالبات الحاضرات، في خطوة تعكس التزام المؤسسة بدعم المسيرة التعليمية لأبناء الشعب الفلسطيني، وتوفير الظروف الملائمة لاستكمال دراستهم الجامعية."
    },
    image: "/two/PHOTO-2025-04-20-18-04-03.jpg",
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
      en: "Isnad Foundation Meets with Palestinian Students in Malaysia to Strengthen Support and Communication",
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
      en: "As part of its mission to reach Palestinian students wherever they are, the Palestinian Student Support Fund (Isnad) held a networking meeting with Palestinian students in Malaysia. The gathering aimed to strengthen direct communication, foster connections, and listen to the students’ aspirations as well as their academic and daily living needs..\n\nDuring the meeting, Isnad representatives outlined the Foundation’s mission and vision, highlighting its commitment to helping Palestinian students pursue higher education in a stable and secure environment.\n\nThey also emphasized that the Foundation’s dedication to students knows no geographical boundaries. As part of the event, scholarships and financial assistance were provided to the Palestinian students in attendance.",
      ar: "في إطار رؤيتها الهادفة إلى الوصول للطلبة الفلسطينيين في مختلف أماكن تواجدهم، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في ماليزيا، بهدف تعزيز التواصل والتعارف المباشر، والاستماع إلى تطلعاتهم واحتياجاتهم الأكاديمية والمعيشية.\n\nوخلال اللقاء، قدّم ممثلو المؤسسة تعريفًا شاملاً برسالتها وأهدافها، ودورها في دعم الطلبة الفلسطينيين وتمكينهم من مواصلة تعليمهم العالي في بيئة مستقرة وآمنة. كما شددت المؤسسة على أن دعمها للطلبة لا تحدّه الجغرافيا.\n\nوخلال اللقاء قدمت المؤسسة منحا ومساعدات مالية إلى الطلبة الفلسطينيين المشاركين في اللقاء."
    },
    image: "/three/PHOTO-2025-04-20-18-04-18.jpg",
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
      en: "Isnad Foundation Hosts Networking Meeting with Palestinian Students in Kyrgyzstan and Offers Financial Scholarships",
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
      en: "As part of its ongoing efforts to connect with Palestinian students worldwide, the Palestinian Student Support Fund (Isnad) organized a networking meeting with Palestinian students in Kyrgyzstan. The meeting provided an opportunity to hear firsthand about their experiences and needs, while introducing the vital role Isnad plays in supporting their academic journeys and helping them overcome challenges.\n\nThe meeting also included an invitation to a communal meal, fostering an atmosphere of friendship and direct communication between students and Foundation representatives. This gathering helped strengthen community bonds and promote a spirit of cooperation and belonging among Palestinian students abroad.\n\nAt the conclusion of the meeting, financial scholarships were awarded to all attending male and female students, reaffirming the Foundation’s ongoing commitment to supporting them everywhere. This support reflects Isnad’s dedication to accompanying students on their journey toward learning and success, enhancing their opportunities to achieve their academic goals.",
      ar: "في إطار سعيها المستمر للوصول إلى الطلبة الفلسطينيين في مختلف أنحاء العالم، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا مع الطلبة الفلسطينيين في قرغيزستان. وهدف اللقاء إلى التعارف والاستماع إلى تجارب الطلبة واحتياجاتهم، وتعريفهم بالدور الذي تلعبه مؤسسة إسناد لدعم الطالب الفلسطيني في دعم مسيرتهم الأكاديمية، ومساعدتهم على تجاوز التحديات التي يواجهونها\n\nكما تخلل اللقاء دعوة إلى مأدبة طعام أخوية، حرصًا على تعزيز أجواء الود والتواصل المباشر بين الطلبة وممثلي المؤسسة ، وهو ما يساهم في تقوية الروابط المجتمعية وتعزيز روح التعاون والانتماء بين الطلبة الفلسطينيين في الخارج.\n\nوفي ختام اللقاء، تم تقديم منح مالية لجميع الطلبة والطالبات الحاضرين، تأكيدًا على التزام المؤسسة المستمر بدعمهم في كل مكان، وحرصها على مرافقتهم في رحلة العلم والنجاح، بما يعزز من فرصهم في تحقيق أهدافهم الأكاديمية."
    },
    image: "/four/PHOTO-2025-04-26-22-18-22 2.jpg",
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
      en: "Isnad Foundation Organizes Friendly Football Match to Strengthen Bonds with Palestinian Students in Turkey",
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
      en: "As part of its ongoing efforts to connect with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) organized a friendly football match on April 22 in Istanbul. The event brought together a number of Palestinian students in Turkey, creating a lively and engaging atmosphere.\n\nThis sports initiative is part of the Foundation’s commitment to building direct relationships with students and creating a supportive environment where they can connect and break down barriers outside formal settings. It also highlights the vibrant nature of the Foundation’s activities and reinforces its message of support and solidarity for Palestinian students.\n\nThe match received enthusiastic responses from participants, who valued the opportunity to bond socially and learn about the Foundation’s activities in a relaxed and engaging way.",
      ar: "في إطار جهودها لتعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني مباراة كرة قدم ودية بتاريخ 22 أبريل في اسطنبول، جمعت عددًا من الطلبة الفلسطينيين في تركيا، وسط أجواء من التفاعل والحيوية.\n\nوجاءت هذه المبادرة الرياضية في سياق سعي المؤسسة إلى بناء علاقات مباشرة مع الطلبة، وخلق بيئة داعمة تتيح لهم التعارف وكسر الحواجز بعيدًا عن الأطر الرسمية، إضافة إلى تقديم صورة حيوية عن أنشطة المؤسسة ورسالة الدعم التي يحملها للطلبة.\n\nوقد لاقت المباراة تفاعلًا إيجابيًا من المشاركين، الذين عبّروا عن سعادتهم بالمبادرة، لما أتاحته من فرصة للترابط الاجتماعي، والتعرف على أنشطة المؤسسة بشكل عفوي ومحبّب."
    },
    image: "/five/DSC07508.jpg",
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
      en: "Isnad Foundation Meets with Palestinian Students in Egypt and Provides Financial Scholarships",
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
      en: "As part of its ongoing efforts to strengthen ties with Palestinian students abroad, the Palestinian Student Support Fund (Isnad) organized a networking meeting in the Arab Republic of Egypt. The event brought together Palestinian male and female students, aiming to establish direct connections and gain insight into their opinions, as well as their educational and living needs.\n\nDuring the meeting, the Foundation awarded several financial scholarships to the attending students, aiming to support their academic journeys and ease their financial challenges. The initiative was met with positive feedback from attendees, who expressed their heartfelt gratitude for the Foundation’s dedicated support throughout their educational journey and its commitment to reaching Palestinian students wherever they are.\n\nThe participating students also encouraged their Palestinian peers to learn more about the Foundation’s mission and take advantage of its programs, emphasizing that the Palestinian Student Support Fund (Isnad) serves as a vital pillar of support for students both at home and abroad, enhancing their opportunities for academic success.",
      ar: "ضمن جهودها المتواصلة لتعزيز التواصل مع الطلبة الفلسطينيين في الخارج، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا في جمهورية مصر العربية، جمع عددًا من الطلبة والطالبات الفلسطينيين، بهدف التعارف المباشر والاطلاع على آرائهم واحتياجاتهم التعليمية والمعيشية.\n\nوخلال اللقاء، قدّمت المؤسسة عددًا من المنح المالية للطلبة الحاضرين، دعمًا لمسيرتهم الأكاديمية وتخفيفًا من أعبائهم المعيشية. وقد لاقت هذه المبادرة تفاعلًا إيجابيًا من الحاضرين، الذين عبّروا في كلمات لهم عن شكرهم وامتنانهم للمؤسسة ، مشيدين بدورها في مرافقتهم خلال مسيرتهم التعليمية، وبحرصها على الوصول إلى الطلبة الفلسطينيين في مختلف أماكن تواجدهم.\n\nكما دعا المشاركون من الطلبة زملاءهم الفلسطينيين إلى التعرف أكثر على رسالة المؤسسة والاستفادة من برامجها، مؤكدين أن مؤسسة إسناد لدعم الطالب الفلسطيني يشكل ركيزة حقيقية لدعم الطلبة في الداخل والخارج، وتعزيز فرصهم في تحقيق النجاح الأكاديمي."
    },
    image: "/six/PHOTO-2025-04-26-22-24-15.jpg",
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
      en: "Isnad Foundation in Mauritania Organizes Meeting with Palestinian Students and Provides Financial Scholarships",
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
      en: "As part of its expanding efforts to support Palestinian students worldwide, the Palestinian Student Support Fund (Isnad) organized a networking meeting in Mauritania. The event brought together a number of Palestinian students along with prominent Mauritanian and Palestinian figures. It served as an important platform for building connections, strengthening bonds, and exchanging ideas on how best to support Palestinian students residing in Mauritania.\n\nDuring the meeting, direct financial scholarships were awarded to several students, demonstrating the Foundation’s commitment to providing practical and sustainable support to Palestinians studying abroad. Additionally, an agreement was announced to offer regular monthly scholarships to Palestinian students in Mauritania—a significant step that marks a qualitative advancement in the Foundation’s efforts to enhance the stability and reach of its support.\n\nThe meeting was warmly welcomed by attendees, who praised the initiative as a significant boost to students’ educational journeys and a powerful example of the genuine partnership between the Palestinian and Mauritanian peoples in supporting education and human dignity.",
      ar: "في إطار توسيع جهودها لدعم الطلبة الفلسطينيين في مختلف أنحاء العالم، نظمت مؤسسة إسناد لدعم الطالب الفلسطيني لقاءً تواصليًا في موريتانيا، حضره عدد من الطلبة الفلسطينيين إلى جانب شخصيات موريتانية وفلسطينية بارزة. وقد شكّل اللقاء منصة مهمة للتعارف وتعزيز الروابط، وتبادل الرؤى حول سبل دعم الطلبة الفلسطينيين المقيمين في موريتانيا.\n\nوخلال اللقاء، تم توزيع منح مالية مباشرة على عدد من الطلبة، في خطوة تعبّر عن التزام المؤسسة بتقديم الدعم العملي والمستدام للطلبة خارج الوطن. كما أُعلن عن اتفاق يقضي بصرف منح شهرية دورية للطلبة الفلسطينيين في موريتانيا، ما يُعد تطورًا نوعيًا في جهود المؤسسة لتعزيز استقرارية الدعم وتوسيع مظلتها.\n\nوقد لاقى اللقاء ترحيبًا واسعًا من الحضور، الذين أشادوا بهذه المبادرة واعتبروها دفعة قوية للمسيرة التعليمية للطلبة، ومثالًا على الشراكة الحقيقية بين الشعبين الفلسطيني والموريتاني في دعم قضايا التعليم والكرامة الإنسانية."
    },
    image: "/seven/1.jpeg",
    category: {
      en: "Networking",
      ar: "تواصل"
    },
    featured: false,
    year: 2021,
  }
]