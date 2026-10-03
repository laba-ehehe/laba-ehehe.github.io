// All site content lives here (static site, no backend). **text** renders bold.
window.PORTFOLIO = {
  name: "Lan Anh Do",
  email: "lananhdo2905@gmail.com",
  github: "https://github.com/laba-ehehe",
  linkedin: "https://www.linkedin.com/in/lananhnguyendo/",
  resume: "/assets/Lan-Anh-Do-Resume.pdf",

  modules: [
    { id: "profile",    label: "Profile",    kicker: "meet my human",   title: "Profile",    code: "01", tag: "nice to meet you", cat: { fur: "white",  costume: "bow",      pose: "wave" }, say: "nya~ that's my human! nice to meet you ♡" },
    { id: "skills",     label: "Skills",     kicker: "spells learned",  title: "Skills",     code: "02", tag: "magic: unlocked",  cat: { fur: "orange", costume: "wizard" },                say: "these are all the spells she knows ✦" },
    { id: "experience", label: "Experience", kicker: "where she's been", title: "Experience", code: "03", tag: "paw-sitions: 6",   cat: { fur: "grey",   costume: "tie" },                   say: "so many paw-sitions... i mean positions" },
    { id: "projects",   label: "Projects",   kicker: "things she made", title: "Projects",   code: "04", tag: "hard hats on",     cat: { fur: "cream",  costume: "hardhat" },               say: "built with love and a lot of fish treats" },
    { id: "leadership", label: "Leadership", kicker: "herding cats",    title: "Leadership", code: "05", tag: "crown: earned",    cat: { fur: "black",  costume: "crown" },                 say: "herding cats, professionally 👑" },
    { id: "contact",    label: "Contact",    kicker: "say hello",       title: "Contact",    code: "06", tag: "mailbox open",     cat: { fur: "white",  costume: "envelope" },              say: "send a letter! i'll deliver it by paw" }
  ],

  profile: {
    role: "Software Engineer · Product Builder",
    facts: [
      ["school", "University of Florida"],
      ["studying", "Computer Engineering + Economics"],
      ["class of", "May 2027"],
      ["based in", "Gainesville, FL"]
    ],
    tagline: "professional tech yapper :D",
    about: [
      "Hello! I'm Lan Anh, a Computer Engineering and Economics student at UF who believes great technology happens when technical excellence meets human understanding.",
      "When I'm not coding, you'll find me leading product workshops at UF Product Space, organizing inclusive hackathons at UF WiNGHacks, or helping students through data structures, digital logic and C++ as a teaching assistant.",
      "I like problems where data, product strategy and real people meet, whether that's an AI tool for fraud investigators or a route planner for a stadium crowd."
    ],
    stats: [
      ["3.94", "GPA"],
      ["100+", "students taught"],
      ["1st", "place, ShellHacks"]
    ],
    education: {
      school: "University of Florida (UF)",
      dates: "Aug 2023 – May 2027",
      degrees: [
        "B.S. in **Computer Engineering**",
        "B.A. in **Economics**"
      ],
      certificates: ["Engineering Project Management", "Econometric & Data Analysis"]
    }
  },

  skills: [
    { name: "Languages", items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "Swift", "SQL", "R", "MATLAB", "SystemVerilog", "Assembly", "HTML/CSS"] },
    { name: "Frameworks", items: ["FastAPI", "Flask", "Spring", "React", "React Native", "Next.js", "Express.js", "Node.js", "Bootstrap", "SwiftUI"] },
    { name: "Developer Tools", items: ["Git", "Docker", "Kubernetes", "Kafka", "MySQL", "AWS", "GCP", "Azure", "MongoDB", "Jenkins", "Bazel", "Jira", "Figma"] },
    { name: "AI / ML", items: ["Model Context Protocol (MCP)", "OpenCV", "PyTorch", "TensorFlow", "Scikit-learn", "NumPy", "pandas", "Claude Code"] }
  ],

  experience: [
    {
      role: "Security Software Engineering Intern", org: "Intuit Inc.", dates: "May 2026 – Aug 2026",
      stat: ["−97%", "investigation time"],
      bullets: [
        "Architected an AI-powered identity lookup platform (**MCP, Python, FastAPI, Spring Boot**) enabling 20+ investigators to query linked accounts and fraud history across 6 products, cutting investigation time by 97% and saving 200+ hours weekly",
        "Engineered an account-linking pipeline (**Numaflow, EventBus, DynamoDB, Docker**) that automatically processes 5,000+ weekly sanctions alerts, keeping customer identity connections current as new events stream across partner systems",
        "Collaborated with cross-functional teams to obtain sensitive-data access, enabling compliant production deployment"
      ]
    },
    {
      role: "Teaching Assistant", org: "University of Florida", dates: "Aug 2024 – Present",
      sub: "Data Structures and Algorithms · Digital Logic and Computer Systems · Computer Organization · Programming Fundamentals",
      stat: ["+22%", "exam averages"],
      bullets: [
        "Instructed 100+ students across sections, achieved 100% completion of **C++** programming challenges and hardware labs",
        "Coordinated 8+ weekly office hours to offer code reviews and debugging support; boosted exam averages by 22%",
        "Developed course content (30+ assignments, 15 hardware demos, 6 exams, and automated testing suite) for 1200+ students"
      ]
    },
    {
      role: "Software Engineering Fellow", org: "Uber Technologies Inc.", dates: "Feb 2025 – Aug 2025",
      stat: ["2.3%", "acceptance rate"],
      bullets: [
        "Selected for Uber Career Prep Fellowship (2.3% acceptance rate) by demonstrating data structures and algorithms skills",
        "Accelerated algorithmic proficiency by working with Uber engineers 1:1 to solve 70+ technical interview problems"
      ]
    },
    {
      role: "Product Management Intern", org: "M_Service", dates: "May 2025 – Aug 2025",
      stat: ["−80%", "rule deploy time"],
      bullets: [
        "Spearheaded end-to-end development of an automation tool on MoMo's digital lending platform (40M+ users), enforced builds with Bazel and CI/CD with Jenkins, cutting lending rule deployment by 80% and reducing manual errors by 70%",
        "Analyzed user behavior data from 2M+ transactions using **BigQuery/SQL** and A/B testing to prioritize 5 key features, accelerating feature delivery by 15% and improving 30-day retention rate by 32%",
        "Facilitated Scrum ceremonies and tracked scope in **Jira/Confluence** to launch mobile-web parity features across 3 platforms"
      ]
    },
    {
      role: "Research Intern", org: "Fudan University · Institute of Science and Technology for Brain-inspired Intelligence (ISTBI)", dates: "Jun 2025 – Aug 2025",
      stat: ["85%", "neuromodulation accuracy"],
      bullets: [
        "Processed 50+ LFP recordings identifying Parkinson's biomarkers, achieving 85% accuracy in neuromodulation predictions",
        "Built **Python** data pipelines analyzing beta-band coherence features across 100+ hours of data, reducing analysis time by 65%",
        "Validated stimulation-response dynamics comparing 30+ DBS/non-DBS trial pairs, informing future clinical studies"
      ]
    },
    {
      role: "Product Management Intern", org: "Nami Technology", dates: "Jun 2024 – Aug 2024",
      stat: ["−38%", "ticket resolution"],
      bullets: [
        "Spearheaded the development of an NLP conversation-analysis tool (**scikit-learn, pandas**) with a **Flask REST API** and **DynamoDB** storage for customer service, adopted by 3 enterprise clients and reduced ticket resolution time by 38%",
        "Identified 10+ critical usability issues in client's digital retail management systems by utilizing market research, SWOT analysis, and usability testing, reducing client onboarding time by 24% and lifting customers' satisfaction scores by 18%",
        "Redesigned UI/UX prototypes using Figma with user-centered design and A/B testing, driving 36% increase in active users"
      ]
    }
  ],

  projects: [
    {
      name: "transPEAKtation", emoji: "🚦", badge: "🏆 1st Place, ShellHacks",
      role: "Software Engineer & Team Lead", dates: "Sep 2026 – Present",
      desc: "Event-aware routing platform that re-ranks routes before congestion forms, unifying live traffic and event data from 6+ sources.",
      points: [
        "372K-parameter transformer forecasting travel time across 26,400+ road segments, cutting error by 33%",
        "PPO load-balancing service that cut riders' trip time up to 59% in a SUMO simulation of a 7,000-vehicle exodus"
      ],
      tags: ["Python", "FastAPI", "Next.js", "PyTorch", "MongoDB", "Tiger Data"],
      links: [["GitHub", "https://github.com/No-Way-Mo/transpeaktation"]]
    },
    {
      name: "ChompCourse", img: "/assets/img/gator.jpg", role: "Software Engineer & Product Lead", dates: "Aug 2024 – May 2025",
      desc: "Full-stack app that builds personalized semester-by-semester course roadmaps for each student's major, interests and preferences. Tested with 100+ users.",
      points: ["Selenium scraper keeps 1,000+ UF course entries up to date, with prerequisite graphing"],
      tags: ["Flask", "React", "Firebase", "Expo", "Selenium"],
      links: [["GitHub", "https://github.com/katieboetig/ChompCourse"]]
    },
    {
      name: "SET Dumpy", img: "/assets/img/set.jpg", role: "Electrical Engineer & Product Lead", dates: "Aug 2023 – May 2024",
      desc: "Trash-detecting robot built with a 27-person SASE team, with 90% navigation accuracy and 88% grasp success.",
      points: ["Arduino microprocessors, LiDAR, linear actuators and motors, with tuned control loops"],
      tags: ["Python", "OpenCV", "Arduino", "LiDAR"],
      links: [["GitHub", "https://github.com/laba-ehehe/SET2023"]]
    },
    {
      name: "Moodify", img: "/assets/img/moodify.jpg", side: true,
      desc: "Turns your mood into a Spotify playlist: pick happy, calm, romantic or dreamy and go.",
      tags: ["Spotify", "Full-stack"],
      links: [["GitHub", "https://github.com/laba-ehehe/moodify"]]
    },
    {
      name: "Ship Detection", img: "/assets/img/ship.gif", side: true,
      desc: "Detecting ships in satellite imagery with machine learning.",
      tags: ["Machine Learning"],
      links: [["GitHub", "https://github.com/laba-ehehe/ship-detection"]]
    },
    {
      name: "Flower Classification & Car Detection", img: "/assets/img/neural.jpg", side: true,
      desc: "Artificial neural networks for flower classification and car detection.",
      tags: ["Neural Networks"],
      links: [["GitHub", "https://github.com/laba-ehehe/ann-flower-classification-car-detection"]]
    },
    {
      name: "Supermarket Sales Analytics", img: "/assets/img/supermarket.jpg", side: true,
      desc: "Analyzing supermarket sales data to find patterns.",
      tags: ["Data Analysis"],
      links: [["GitHub", "https://github.com/laba-ehehe/supermarket-sales-analytics"]]
    }
  ],

  leadership: [
    {
      role: "Director of Professional Development", org: "UF Product Space", dates: "Jun 2025 – Present",
      stat: ["14", "projects delivered"],
      bullets: [
        "Spearheaded 6 workshops for 100+ members on product management skillset, developed tailored training resources",
        "Coordinated a product management fellowship matching 40+ fellows with 6 local startups; organized project scoping, matching, and sponsor check-ins across 8-week sprints; delivered 14 company-approved projects with 100% completion"
      ]
    },
    {
      role: "Director of Awards", org: "UF WiNGHacks", dates: "Jul 2024 – Present",
      stat: ["120+", "hackers"],
      bullets: [
        "Collaborated with 15 committee heads and directors to oversee seamless operations of WiNGHacks 2025, UF's first hackathon focused on uplifting women, nonbinary people, and gender minorities, attended by 120+ hackers",
        "Directed 2 committee members to develop unique awards categories, manage $10,000+ in prize funding, and recruit 30+ judges",
        "Coordinated with MLH, faculty, and sponsors to ensure a transparent judging process, increasing participant satisfaction by 28%"
      ]
    }
  ]
};
