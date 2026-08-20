// Career GPS — curated seed dataset.
// Safe to run without a live DB: exits 0 with a warning when DATABASE_URL is missing.
// Idempotent: Career upserts on `slug`, CareerSkill upserts on `(careerId, skillId)`,
// Mentors upsert on `name` (via findFirst, since name is not unique in the schema),
// Resources are re-synced per career (no unique key exists).
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.warn(
    "[seed] DATABASE_URL is not set — skipping seed (no database configured).",
  );
  process.exit(0);
}

type Importance = "High" | "Medium";
type SkillInput = { name: string; importance: Importance; weight: number };
type ResourceKind = "course" | "article" | "video" | "project";
type ResourceInput = { title: string; kind: ResourceKind; url: string; free: boolean };
type CareerInput = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  industry: string;
  level: "Entry" | "Mid";
  demandLevel: "High" | "Medium";
  salaryMin: number;
  salaryMax: number;
  growth: string;
  skills: SkillInput[];
  resources: ResourceInput[];
};
type MentorInput = {
  name: string;
  role: string;
  org: string;
  matchScore: number;
  featured: boolean;
};

// Skill names are a shared vocabulary across careers so skill-gap analysis
// can compare any user profile against any target career.
const careers: CareerInput[] = [
  {
    slug: "data-analyst",
    title: "Data Analyst",
    summary:
      "Turn raw data into clear insights that help organizations make better decisions. A great entry point into tech for people who like numbers, patterns, and problem-solving.",
    description:
      "Data analysts collect, clean, and interpret data using tools like SQL, Excel, and Python, then present findings through charts and dashboards. You do not need a computer-science degree to start — many analysts enter through free courses, bootcamps, or related degrees. Demand is strong across nearly every industry, from finance to healthcare to retail.",
    industry: "Technology & Data",
    level: "Entry",
    demandLevel: "High",
    salaryMin: 55000,
    salaryMax: 85000,
    growth:
      "Above-average growth expected as more organizations rely on data for everyday decisions.",
    skills: [
      { name: "SQL", importance: "High", weight: 1.0 },
      { name: "Excel", importance: "High", weight: 0.9 },
      { name: "Statistics", importance: "High", weight: 0.9 },
      { name: "Data Visualization", importance: "High", weight: 0.9 },
      { name: "Data Cleaning", importance: "Medium", weight: 0.7 },
      { name: "Python", importance: "Medium", weight: 0.7 },
      { name: "Communication", importance: "Medium", weight: 0.6 },
      { name: "Critical Thinking", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Intro to SQL — Khan Academy",
        kind: "course",
        url: "https://www.khanacademy.org/computing/computer-programming/sql",
        free: true,
      },
      {
        title: "Data Analysis with Python — freeCodeCamp",
        kind: "course",
        url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
        free: true,
      },
      {
        title: "Data Visualization — Kaggle Learn",
        kind: "course",
        url: "https://www.kaggle.com/learn/data-visualization",
        free: true,
      },
      {
        title: "Excel Tutorial — W3Schools",
        kind: "course",
        url: "https://www.w3schools.com/excel/",
        free: true,
      },
    ],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    summary:
      "Use statistics, machine learning, and programming to build models that predict outcomes and uncover deep insights. A step beyond data analysis for people who love math and coding.",
    description:
      "Data scientists design experiments, build machine-learning models, and communicate results to business leaders. Most roles prefer a background in statistics, math, or computer science, but strong self-taught portfolios are increasingly accepted. The field pays well and continues to grow as AI and analytics expand.",
    industry: "Technology & Data",
    level: "Mid",
    demandLevel: "High",
    salaryMin: 70000,
    salaryMax: 110000,
    growth:
      "Very high demand; data science roles are among the fastest-growing technical careers.",
    skills: [
      { name: "Python", importance: "High", weight: 1.0 },
      { name: "Statistics", importance: "High", weight: 1.0 },
      { name: "Machine Learning", importance: "High", weight: 1.0 },
      { name: "SQL", importance: "High", weight: 0.8 },
      { name: "Data Cleaning", importance: "High", weight: 0.8 },
      { name: "Data Visualization", importance: "Medium", weight: 0.7 },
      { name: "Communication", importance: "Medium", weight: 0.6 },
      { name: "Git", importance: "Medium", weight: 0.5 },
    ],
    resources: [
      {
        title: "Intro to Machine Learning — Kaggle Learn",
        kind: "course",
        url: "https://www.kaggle.com/learn/intro-to-machine-learning",
        free: true,
      },
      {
        title: "Machine Learning Specialization (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        free: true,
      },
      {
        title: "StatQuest — Statistics & ML explained (YouTube)",
        kind: "video",
        url: "https://www.youtube.com/@statquest",
        free: true,
      },
      {
        title: "Data Analysis with Python — freeCodeCamp",
        kind: "course",
        url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
        free: true,
      },
    ],
  },
  {
    slug: "software-engineer",
    title: "Software Engineer",
    summary:
      "Design, build, and maintain the applications and systems the world runs on. One of the most flexible careers — you can work in any industry, anywhere.",
    description:
      "Software engineers write and test code, design systems, and collaborate with teams to ship products. You can enter through a degree, bootcamp, or a strong self-built portfolio of projects. Remote work and global opportunities make this a high-reward path for self-motivated learners.",
    industry: "Technology",
    level: "Mid",
    demandLevel: "High",
    salaryMin: 65000,
    salaryMax: 105000,
    growth:
      "Consistently high demand; software development remains one of the largest growing occupations.",
    skills: [
      { name: "JavaScript", importance: "High", weight: 1.0 },
      { name: "Python", importance: "High", weight: 0.9 },
      { name: "Git", importance: "High", weight: 0.9 },
      { name: "APIs", importance: "High", weight: 0.8 },
      { name: "Problem Solving", importance: "High", weight: 0.8 },
      { name: "React", importance: "Medium", weight: 0.7 },
      { name: "HTML/CSS", importance: "Medium", weight: 0.7 },
      { name: "Testing & Debugging", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "JavaScript Algorithms and Data Structures — freeCodeCamp",
        kind: "course",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        free: true,
      },
      {
        title: "CS50x: Introduction to Computer Science — Harvard",
        kind: "course",
        url: "https://cs50.harvard.edu/x/",
        free: true,
      },
      {
        title: "The Odin Project — Full-Stack Curriculum",
        kind: "course",
        url: "https://www.theodinproject.com/",
        free: true,
      },
      {
        title: "Git and GitHub for Beginners (YouTube) — freeCodeCamp",
        kind: "video",
        url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        free: true,
      },
    ],
  },
  {
    slug: "web-developer",
    title: "Web Developer",
    summary:
      "Build and maintain websites and web applications using HTML, CSS, and JavaScript. A practical, project-based career that is friendly to self-taught learners.",
    description:
      "Web developers create responsive, accessible sites and connect them to databases and services. The career is very accessible — many developers learn free with The Odin Project, freeCodeCamp, or MDN and build portfolios to land first jobs. Freelancing and remote work are common entry routes.",
    industry: "Technology",
    level: "Entry",
    demandLevel: "High",
    salaryMin: 55000,
    salaryMax: 90000,
    growth: "Steady demand as every business needs a web presence.",
    skills: [
      { name: "HTML/CSS", importance: "High", weight: 1.0 },
      { name: "JavaScript", importance: "High", weight: 1.0 },
      { name: "Responsive Design", importance: "High", weight: 0.8 },
      { name: "Git", importance: "High", weight: 0.8 },
      { name: "APIs", importance: "Medium", weight: 0.7 },
      { name: "React", importance: "Medium", weight: 0.7 },
      { name: "Testing & Debugging", importance: "Medium", weight: 0.6 },
      { name: "SEO", importance: "Medium", weight: 0.5 },
    ],
    resources: [
      {
        title: "Learn Web Development — MDN Web Docs",
        kind: "course",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
        free: true,
      },
      {
        title: "Responsive Web Design — freeCodeCamp",
        kind: "course",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        free: true,
      },
      {
        title: "The Odin Project — Foundations",
        kind: "course",
        url: "https://www.theodinproject.com/",
        free: true,
      },
      {
        title: "HTML Tutorial — W3Schools",
        kind: "course",
        url: "https://www.w3schools.com/html/",
        free: true,
      },
    ],
  },
  {
    slug: "mobile-app-developer",
    title: "Mobile App Developer",
    summary:
      "Create the apps people use on their phones every day, for Android and iOS. Combine programming with design to build products used by millions.",
    description:
      "Mobile developers build apps with tools like React Native, Kotlin, or Flutter, and publish them to app stores. You can start with free official documentation and small personal apps that double as a portfolio. The field offers strong pay and many freelance or startup opportunities.",
    industry: "Technology",
    level: "Mid",
    demandLevel: "High",
    salaryMin: 60000,
    salaryMax: 100000,
    growth: "Continued growth as mobile usage keeps expanding worldwide.",
    skills: [
      { name: "Mobile Development", importance: "High", weight: 1.0 },
      { name: "JavaScript", importance: "High", weight: 0.9 },
      { name: "APIs", importance: "High", weight: 0.8 },
      { name: "UI Design", importance: "Medium", weight: 0.7 },
      { name: "Testing & Debugging", importance: "Medium", weight: 0.6 },
      { name: "Git", importance: "Medium", weight: 0.6 },
      { name: "Problem Solving", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "React Native — Official Docs & Tutorial",
        kind: "course",
        url: "https://reactnative.dev/docs/getting-started",
        free: true,
      },
      {
        title: "Android Basics — Google Developers",
        kind: "course",
        url: "https://developer.android.com/courses",
        free: true,
      },
      {
        title: "Kotlin for Android — Google Developers",
        kind: "course",
        url: "https://developer.android.com/kotlin",
        free: true,
      },
      {
        title: "Flutter — Get Started",
        kind: "course",
        url: "https://docs.flutter.dev/get-started",
        free: true,
      },
    ],
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    summary:
      "Design digital products that are easy and enjoyable to use, by researching users and testing ideas. A creative-technical career at the heart of modern apps and websites.",
    description:
      "UX designers study how people use products, sketch and prototype solutions in tools like Figma, and work closely with developers and product teams. No design degree is required — strong portfolios built through free courses and personal projects open doors. It blends psychology, creativity, and problem-solving.",
    industry: "Design",
    level: "Entry",
    demandLevel: "High",
    salaryMin: 55000,
    salaryMax: 90000,
    growth: "Growing demand as companies invest more in product experience.",
    skills: [
      { name: "Figma", importance: "High", weight: 1.0 },
      { name: "UX Research", importance: "High", weight: 0.9 },
      { name: "Prototyping", importance: "High", weight: 0.9 },
      { name: "UI Design", importance: "High", weight: 0.9 },
      { name: "Communication", importance: "Medium", weight: 0.6 },
      { name: "Critical Thinking", importance: "Medium", weight: 0.6 },
      { name: "HTML/CSS", importance: "Medium", weight: 0.5 },
    ],
    resources: [
      {
        title: "Google UX Design Certificate (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        free: true,
      },
      {
        title: "Figma — Resource Library",
        kind: "article",
        url: "https://www.figma.com/resource-library/",
        free: true,
      },
      {
        title: "Nielsen Norman Group — UX Articles",
        kind: "article",
        url: "https://www.nngroup.com/articles/",
        free: true,
      },
      {
        title: "Figma on YouTube — Design Tutorials",
        kind: "video",
        url: "https://www.youtube.com/@Figma",
        free: true,
      },
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    summary:
      "Communicate ideas visually through logos, posters, social media, and branding. A versatile creative career you can grow through practice and a strong portfolio.",
    description:
      "Graphic designers use tools like Adobe Photoshop, Illustrator, and Canva to create visual content for print and digital media. You can start with free tutorials and build a portfolio from personal or volunteer projects. Freelance work is a common and flexible entry point.",
    industry: "Creative & Design",
    level: "Entry",
    demandLevel: "Medium",
    salaryMin: 40000,
    salaryMax: 65000,
    growth:
      "Steady demand; skills in digital and social design are especially valued.",
    skills: [
      { name: "Adobe Photoshop", importance: "High", weight: 0.9 },
      { name: "Canva", importance: "High", weight: 0.9 },
      { name: "Typography", importance: "High", weight: 0.8 },
      { name: "Color Theory", importance: "Medium", weight: 0.7 },
      { name: "Figma", importance: "Medium", weight: 0.6 },
      { name: "Communication", importance: "Medium", weight: 0.6 },
      { name: "Time Management", importance: "Medium", weight: 0.5 },
    ],
    resources: [
      {
        title: "Graphic Design Specialization (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/specializations/graphic-design",
        free: true,
      },
      {
        title: "Canva Design School",
        kind: "article",
        url: "https://www.canva.com/learn/",
        free: true,
      },
      {
        title: "Practical Typography",
        kind: "article",
        url: "https://practicaltypography.com/",
        free: true,
      },
      {
        title: "Adobe Photoshop on YouTube — Tutorials",
        kind: "video",
        url: "https://www.youtube.com/@Photoshop",
        free: true,
      },
    ],
  },
  {
    slug: "digital-marketer",
    title: "Digital Marketer",
    summary:
      "Grow brands and businesses online using SEO, content, ads, and analytics. A people-plus-data career with many entry paths.",
    description:
      "Digital marketers plan and run campaigns across search, social, email, and websites, then measure what works. Free certifications from Google and HubSpot are widely recognized by employers, making this one of the most accessible careers to enter. It combines creativity with measurable results.",
    industry: "Marketing",
    level: "Entry",
    demandLevel: "High",
    salaryMin: 45000,
    salaryMax: 75000,
    growth: "Strong growth as marketing budgets shift further online.",
    skills: [
      { name: "SEO", importance: "High", weight: 0.9 },
      { name: "Copywriting", importance: "High", weight: 0.9 },
      { name: "Marketing Analytics", importance: "High", weight: 0.8 },
      { name: "Social Media Marketing", importance: "High", weight: 0.8 },
      { name: "Excel", importance: "Medium", weight: 0.6 },
      { name: "Canva", importance: "Medium", weight: 0.6 },
      { name: "Communication", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Fundamentals of Digital Marketing — Google Digital Garage",
        kind: "course",
        url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
        free: true,
      },
      {
        title: "Digital Marketing — HubSpot Academy",
        kind: "course",
        url: "https://academy.hubspot.com/courses/digital-marketing",
        free: true,
      },
      {
        title: "Beginner's Guide to SEO — Moz",
        kind: "article",
        url: "https://moz.com/beginners-guide-to-seo",
        free: true,
      },
      {
        title: "Google Analytics Academy",
        kind: "course",
        url: "https://analytics.google.com/analytics/academy/",
        free: true,
      },
    ],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    summary:
      "Plan, create, and manage content across social platforms to grow audiences and build communities. A fun, fast-moving career for creative communicators.",
    description:
      "Social media managers craft content calendars, write engaging posts, track performance, and respond to communities. A personal account or small-business page you grow yourself can prove your skills to employers. Creativity, consistency, and analytics all matter here.",
    industry: "Marketing",
    level: "Entry",
    demandLevel: "Medium",
    salaryMin: 40000,
    salaryMax: 65000,
    growth: "Steady demand as brands keep investing in social channels.",
    skills: [
      { name: "Social Media Marketing", importance: "High", weight: 1.0 },
      { name: "Content Strategy", importance: "High", weight: 0.9 },
      { name: "Copywriting", importance: "High", weight: 0.8 },
      { name: "Communication", importance: "High", weight: 0.8 },
      { name: "Canva", importance: "High", weight: 0.8 },
      { name: "Community Management", importance: "Medium", weight: 0.7 },
      { name: "Marketing Analytics", importance: "Medium", weight: 0.7 },
      { name: "Video Editing", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Social Media Marketing — HubSpot Academy",
        kind: "course",
        url: "https://academy.hubspot.com/courses/social-media",
        free: true,
      },
      {
        title: "Meta Blueprint — Free Marketing Training",
        kind: "course",
        url: "https://www.facebook.com/business/learn",
        free: true,
      },
      {
        title: "Canva Design School — Social Media",
        kind: "article",
        url: "https://www.canva.com/learn/social-media/",
        free: true,
      },
      {
        title: "Buffer — Social Media Resources & Blog",
        kind: "article",
        url: "https://buffer.com/resources/",
        free: true,
      },
    ],
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    summary:
      "Write clear, useful, and engaging content for websites, blogs, and products. A flexible career that rewards strong writing and research.",
    description:
      "Content writers produce articles, guides, emails, and web copy that help people and rank well in search engines. You can build a portfolio with a simple blog or guest posts, and many writers start freelance. SEO and editing skills increase both quality and pay.",
    industry: "Media & Content",
    level: "Entry",
    demandLevel: "Medium",
    salaryMin: 38000,
    salaryMax: 60000,
    growth:
      "Steady demand; writers with SEO and technical skills are in higher demand.",
    skills: [
      { name: "Copywriting", importance: "High", weight: 1.0 },
      { name: "SEO", importance: "High", weight: 0.9 },
      { name: "Research", importance: "High", weight: 0.8 },
      { name: "Communication", importance: "High", weight: 0.8 },
      { name: "Content Strategy", importance: "Medium", weight: 0.7 },
      { name: "Editing & Proofreading", importance: "Medium", weight: 0.7 },
      { name: "Time Management", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Content Marketing — HubSpot Academy",
        kind: "course",
        url: "https://academy.hubspot.com/courses/content-marketing",
        free: true,
      },
      {
        title: "General Writing Resources — Purdue OWL",
        kind: "article",
        url: "https://owl.purdue.edu/owl/general_writing/index.html",
        free: true,
      },
      {
        title: "SEO Copywriting Guide — Ahrefs Blog",
        kind: "article",
        url: "https://ahrefs.com/blog/copywriting/",
        free: true,
      },
      {
        title: "Creative Writing Specialization (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/specializations/creative-writing",
        free: true,
      },
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    summary:
      "Own the vision, strategy, and roadmap of a product, guiding teams to build things people love. A bridge between business, design, and technology.",
    description:
      "Product managers discover what users need, prioritize what to build, and coordinate engineers and designers. Many PMs start in other roles and move into product with demonstrated leadership and communication. It is a high-impact career that rewards curiosity and strategic thinking.",
    industry: "Technology & Business",
    level: "Mid",
    demandLevel: "High",
    salaryMin: 70000,
    salaryMax: 110000,
    growth: "Growing demand as product-led companies expand.",
    skills: [
      { name: "Communication", importance: "High", weight: 1.0 },
      { name: "Product Strategy", importance: "High", weight: 1.0 },
      { name: "Project Management", importance: "High", weight: 0.8 },
      { name: "Agile & Scrum", importance: "High", weight: 0.8 },
      { name: "UX Research", importance: "Medium", weight: 0.6 },
      { name: "Data Analysis", importance: "Medium", weight: 0.6 },
      { name: "Teamwork", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Product Management Specialization (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/specializations/product-management",
        free: true,
      },
      {
        title: "The Scrum Guide",
        kind: "article",
        url: "https://scrumguides.org/",
        free: true,
      },
      {
        title: "Product School — Free Resources",
        kind: "article",
        url: "https://www.productschool.com/resources",
        free: true,
      },
      {
        title: "Mind the Product — Product Articles",
        kind: "article",
        url: "https://www.mindtheproduct.com/",
        free: true,
      },
    ],
  },
  {
    slug: "hr-specialist",
    title: "HR Specialist",
    summary:
      "Help organizations hire, support, and develop their people. A people-focused career with clear paths into management.",
    description:
      "HR specialists manage recruitment, onboarding, employee relations, and record-keeping. Strong communication, organization, and empathy matter more than a specific degree. Certifications like SHRM can accelerate growth and pay.",
    industry: "Business & Human Resources",
    level: "Entry",
    demandLevel: "Medium",
    salaryMin: 45000,
    salaryMax: 70000,
    growth: "Steady demand across every industry with employees.",
    skills: [
      { name: "Communication", importance: "High", weight: 1.0 },
      { name: "Teamwork", importance: "High", weight: 0.8 },
      { name: "Excel", importance: "High", weight: 0.8 },
      { name: "Documentation", importance: "High", weight: 0.7 },
      { name: "Attention to Detail", importance: "Medium", weight: 0.6 },
      { name: "Empathy", importance: "Medium", weight: 0.6 },
      { name: "Project Management", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "SHRM — HR Knowledge Resources",
        kind: "article",
        url: "https://www.shrm.org/",
        free: true,
      },
      {
        title: "Human Resource Management Specialization (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/specializations/human-resource-management",
        free: true,
      },
      {
        title: "HR Fundamentals — LinkedIn Learning (free trial)",
        kind: "course",
        url: "https://www.linkedin.com/learning/topics/human-resources",
        free: false,
      },
      {
        title: "Indeed Career Guide — HR Advice",
        kind: "article",
        url: "https://www.indeed.com/career-advice/",
        free: true,
      },
    ],
  },
  {
    slug: "accountant",
    title: "Accountant",
    summary:
      "Track, analyze, and report on money so businesses and people make sound financial decisions. A stable career with strong earning growth.",
    description:
      "Accountants prepare financial statements, manage books, handle taxes, and advise on budgets. You can enter with a related degree or move up through bookkeeping roles and certifications. Accuracy and ethics are the core of the profession.",
    industry: "Finance",
    level: "Entry",
    demandLevel: "Medium",
    salaryMin: 50000,
    salaryMax: 80000,
    growth:
      "Steady demand; specialization (tax, audit, analytics) increases opportunities.",
    skills: [
      { name: "Financial Accounting", importance: "High", weight: 1.0 },
      { name: "Excel", importance: "High", weight: 1.0 },
      { name: "Bookkeeping", importance: "High", weight: 0.9 },
      { name: "Attention to Detail", importance: "High", weight: 0.8 },
      { name: "Tax Preparation", importance: "Medium", weight: 0.7 },
      { name: "Budgeting", importance: "Medium", weight: 0.6 },
      { name: "Communication", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Principles of Accounting — OpenStax",
        kind: "article",
        url: "https://openstax.org/details/books/principles-financial-accounting",
        free: true,
      },
      {
        title: "Introduction to Financial Accounting (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/learn/wharton-accounting",
        free: true,
      },
      {
        title: "AccountingCoach — Free Accounting Lessons",
        kind: "course",
        url: "https://www.accountingcoach.com/",
        free: true,
      },
      {
        title: "Finance & Capital Markets — Khan Academy",
        kind: "course",
        url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
        free: true,
      },
    ],
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    summary:
      "Provide hands-on patient care, education, and support in hospitals and clinics. One of the most trusted and in-demand careers in healthcare.",
    description:
      "Registered nurses assess patients, administer treatments, and coordinate care with doctors and families. Entry requires an accredited nursing diploma or degree plus licensing, with many scholarship and sponsorship paths available. The work is demanding but deeply meaningful and stable.",
    industry: "Healthcare",
    level: "Mid",
    demandLevel: "High",
    salaryMin: 60000,
    salaryMax: 90000,
    growth:
      "Very high demand with projected long-term shortages in many regions.",
    skills: [
      { name: "Patient Care", importance: "High", weight: 1.0 },
      { name: "Communication", importance: "High", weight: 0.9 },
      { name: "Empathy", importance: "High", weight: 0.9 },
      { name: "Critical Thinking", importance: "High", weight: 0.8 },
      { name: "Medical Terminology", importance: "High", weight: 0.8 },
      { name: "Attention to Detail", importance: "High", weight: 0.8 },
      { name: "Teamwork", importance: "Medium", weight: 0.7 },
    ],
    resources: [
      {
        title: "Health & Medicine — Khan Academy",
        kind: "course",
        url: "https://www.khanacademy.org/science/health-and-medicine",
        free: true,
      },
      {
        title: "Anatomy & Physiology 2e — OpenStax",
        kind: "article",
        url: "https://openstax.org/details/books/anatomy-and-physiology-2e",
        free: true,
      },
      {
        title: "Anatomy Specialization (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/specializations/anatomy",
        free: true,
      },
      {
        title: "RegisteredNurseRN — Nursing Lessons (YouTube)",
        kind: "video",
        url: "https://www.youtube.com/@RegisteredNurseRN",
        free: true,
      },
    ],
  },
  {
    slug: "healthcare-assistant",
    title: "Healthcare Assistant",
    summary:
      "Support nurses and patients with daily care, comfort, and practical help. An accessible entry point into the healthcare sector.",
    description:
      "Healthcare assistants help with personal care, mobility, meals, and monitoring, working alongside nurses and doctors. Training is often short and can be sponsored by employers, making it a great first step toward nursing or other clinical roles. It is people-centered and consistently in demand.",
    industry: "Healthcare",
    level: "Entry",
    demandLevel: "High",
    salaryMin: 28000,
    salaryMax: 42000,
    growth: "Consistently strong demand as healthcare systems expand.",
    skills: [
      { name: "Patient Care", importance: "High", weight: 1.0 },
      { name: "Caregiving", importance: "High", weight: 1.0 },
      { name: "Empathy", importance: "High", weight: 0.9 },
      { name: "Communication", importance: "High", weight: 0.8 },
      { name: "Medical Terminology", importance: "Medium", weight: 0.6 },
      { name: "Teamwork", importance: "Medium", weight: 0.6 },
      { name: "Time Management", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Health & Medicine — Khan Academy",
        kind: "course",
        url: "https://www.khanacademy.org/science/health-and-medicine",
        free: true,
      },
      {
        title: "NHS Health Careers — Explore Healthcare Roles",
        kind: "article",
        url: "https://www.healthcareers.nhs.uk/explore-roles",
        free: true,
      },
      {
        title: "Social Care — OpenLearn (Open University)",
        kind: "course",
        url: "https://www.open.edu/openlearn/health-sports-psychology/social-care",
        free: true,
      },
      {
        title: "First Aid Training — American Red Cross",
        kind: "course",
        url: "https://www.redcross.org/take-a-class/first-aid",
        free: true,
      },
    ],
  },
  {
    slug: "customer-support-specialist",
    title: "Customer Support Specialist",
    summary:
      "Help customers solve problems and feel valued through support channels. A people-first career with clear growth into many other roles.",
    description:
      "Customer support specialists answer questions, troubleshoot issues, and document feedback across chat, email, and phone. Strong communication and patience are the core skills, and many companies provide full training. It is a common gateway into operations, sales, and product roles.",
    industry: "Customer Service",
    level: "Entry",
    demandLevel: "Medium",
    salaryMin: 32000,
    salaryMax: 50000,
    growth: "Steady demand; remote roles are increasingly common.",
    skills: [
      { name: "Communication", importance: "High", weight: 1.0 },
      { name: "Customer Service", importance: "High", weight: 1.0 },
      { name: "Active Listening", importance: "High", weight: 0.9 },
      { name: "Problem Solving", importance: "High", weight: 0.8 },
      { name: "Empathy", importance: "High", weight: 0.8 },
      { name: "CRM", importance: "Medium", weight: 0.7 },
      { name: "Documentation", importance: "Medium", weight: 0.6 },
    ],
    resources: [
      {
        title: "Help Scout Blog — Customer Support Guides",
        kind: "article",
        url: "https://www.helpscout.com/blog/",
        free: true,
      },
      {
        title: "Indeed Career Guide — Customer Service Skills",
        kind: "article",
        url: "https://www.indeed.com/career-advice/career-development/customer-service-skills",
        free: true,
      },
      {
        title: "Customer Relationship Management (free audit) — Coursera",
        kind: "course",
        url: "https://www.coursera.org/learn/customer-relationship-management",
        free: true,
      },
    ],
  },
];

const mentors: MentorInput[] = [
  {
    name: "Amara Okafor",
    role: "Senior Software Engineer",
    org: "Andela",
    matchScore: 92,
    featured: true,
  },
  {
    name: "James Chen",
    role: "Product Manager",
    org: "Google",
    matchScore: 95,
    featured: true,
  },
  {
    name: "Sofia Ramirez",
    role: "UX Designer",
    org: "IDEO",
    matchScore: 90,
    featured: true,
  },
  {
    name: "David Mensah",
    role: "Senior Data Analyst",
    org: "Safaricom",
    matchScore: 88,
    featured: false,
  },
  {
    name: "Priya Sharma",
    role: "Registered Nurse",
    org: "NHS",
    matchScore: 85,
    featured: false,
  },
  {
    name: "Fatima Al-Sayed",
    role: "Digital Marketing Manager",
    org: "Unilever",
    matchScore: 86,
    featured: false,
  },
  {
    name: "Omar Haddad",
    role: "Financial Accountant",
    org: "PwC",
    matchScore: 82,
    featured: false,
  },
  {
    name: "Grace Adeyemi",
    role: "HR Business Partner",
    org: "Deloitte",
    matchScore: 80,
    featured: false,
  },
  {
    name: "Lucas Silva",
    role: "Creative Director & Graphic Designer",
    org: "Independent Studio",
    matchScore: 78,
    featured: false,
  },
];

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
});

async function seedCareer(career: CareerInput): Promise<void> {
  const saved = await prisma.career.upsert({
    where: { slug: career.slug },
    update: {
      title: career.title,
      summary: career.summary,
      description: career.description,
      industry: career.industry,
      level: career.level,
      demandLevel: career.demandLevel,
      salaryMin: career.salaryMin,
      salaryMax: career.salaryMax,
      growth: career.growth,
    },
    create: {
      slug: career.slug,
      title: career.title,
      summary: career.summary,
      description: career.description,
      industry: career.industry,
      level: career.level,
      demandLevel: career.demandLevel,
      salaryMin: career.salaryMin,
      salaryMax: career.salaryMax,
      growth: career.growth,
    },
  });

  for (const skill of career.skills) {
    await prisma.careerSkill.upsert({
      where: {
        careerId_skillId: { careerId: saved.id, skillId: skill.name },
      },
      update: { importance: skill.importance, weight: skill.weight },
      create: {
        careerId: saved.id,
        skillId: skill.name,
        importance: skill.importance,
        weight: skill.weight,
      },
    });
  }

  // Resource has no unique key, so re-sync the curated list per career.
  await prisma.resource.deleteMany({ where: { careerId: saved.id } });
  await prisma.resource.createMany({
    data: career.resources.map((resource) => ({
      ...resource,
      careerId: saved.id,
    })),
  });
}

// Mentor.name is not unique in the schema, so idempotency is handled manually.
async function seedMentor(mentor: MentorInput): Promise<void> {
  const data = { ...mentor, email: null };
  const existing = await prisma.mentor.findFirst({
    where: { name: mentor.name },
  });
  if (existing) {
    await prisma.mentor.update({ where: { id: existing.id }, data });
  } else {
    await prisma.mentor.create({ data });
  }
}

async function main(): Promise<void> {
  console.log(`[seed] Seeding ${mentors.length} mentors...`);
  for (const mentor of mentors) {
    await seedMentor(mentor);
  }

  console.log(`[seed] Seeding ${careers.length} careers...`);
  for (const career of careers) {
    await seedCareer(career);
  }

  console.log("[seed] Done.");
}

main()
  .catch((error: unknown) => {
    console.error("[seed] Failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });