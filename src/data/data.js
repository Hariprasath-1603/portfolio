// Constants
const githubLink = "https://github.com/Hariprasath-1603";

// Profile Description
export const profileDescription = [
  "Hari Prasath is a passionate Data Science student specializing in Machine Learning & AI. He builds intelligent models, trains neural networks, and turns raw data into meaningful insights.",
  "When not training models, he explores ML research, experiments with new datasets and architectures, contributes to projects, and continuously develops his skills in AI and software engineering.",
];

// Work Experience Template (Empty for now, can be populated later)
export const workExperienceTemplate = [];

// GitHub Repositories (Hari's Projects)
export const githubRepos = [
  {
    name: "InjectShield",
    category: "Security / LLMs",
    year: 2026,
    techUsed: ["Python", "FastAPI", "AWS ECS", "llama-3.1-8b"],
    description: "AI-driven prompt injection detection system built on AgentDojo. Uses a behavioral baseline profiler and four-component anomaly scorer to flag malicious agent inputs in real time. Achieved 96.7% mock accuracy and 100% recall.",
    githubLink: `${githubLink}/InjectShield`,
    liveURL: `${githubLink}/InjectShield`
  },
  {
    name: "AgentScholar",
    category: "AI Agents / NLP",
    year: 2026,
    techUsed: ["LangGraph", "Llama 3", "FAISS", "Tavily"],
    description: "Multi-agent research automation pipeline that coordinates specialized agents (Planner, Searcher, Synthesizer, Report Writer) to autonomously research and write reports. Includes hallucination scoring and SQLite checkpointing.",
    githubLink: `${githubLink}/AgentScholar`,
    liveURL: `${githubLink}/AgentScholar`
  },
  {
    name: "HealOPS",
    category: "Healthcare / Full-Stack",
    year: 2025,
    techUsed: ["Python", "FastAPI", "Flutter", "JWT"],
    description: "Full-stack healthcare management system covering the patient lifecycle from registration to appointment scheduling. Features JWT authentication, record management, and a clean REST API layer.",
    githubLink: `${githubLink}/HealOPS`,
    liveURL: `${githubLink}/HealOPS`
  },
  {
    name: "videosnatcherz",
    category: "Video Processing",
    year: 2025,
    techUsed: ["Python", "ffmpeg", "YouTube API"],
    description: "A fast, efficient tool to download and process videos from various sources with custom formatting options.",
    githubLink: `${githubLink}/videosnatcherz`,
    liveURL: `${githubLink}/videosnatcherz`
  },
  {
    name: "BudgetShield",
    category: "MLOps / Cost Governance",
    year: 2026,
    techUsed: ["Postgres", "Python", "REST API"],
    description: "LLM cost-governance proxy enforcing spending limits via atomic metering. Returns HTTP 402 for exceeded budgets and auto-pauses runaway agents. Includes model-substitution routing and an admin dashboard.",
    githubLink: `${githubLink}/BudgetShield`,
    liveURL: `${githubLink}/BudgetShield`
  },
  {
    name: "UrbanShield",
    category: "Smart City",
    year: 2025,
    techUsed: ["Python", "IoT", "Data Analysis"],
    description: "Urban infrastructure monitoring system utilizing IoT sensors and data analytics to optimize city services.",
    githubLink: `${githubLink}/UrbanShield`,
    liveURL: `${githubLink}/UrbanShield`
  },
  {
    name: "portfolio",
    category: "Web Development",
    year: 2026,
    techUsed: ["React", "TailwindCSS", "Framer Motion"],
    description: "My personal portfolio website built as a Windows 11 desktop experience in the browser.",
    githubLink: `${githubLink}/portfolio`,
    liveURL: `https://hariprasath1603.netlify.app`
  },
  {
    name: "VisionCrafter",
    category: "Generative AI",
    year: 2024,
    techUsed: ["Python", "TensorFlow", "Keras", "GANs"],
    description: "Conditional GAN built for text-to-image synthesis, featuring a custom generator-discriminator training loop. Trained on COCO with a full image synthesis pipeline. Patent filed on the underlying approach.",
    githubLink: `${githubLink}/VisionCrafter`,
    liveURL: `${githubLink}/VisionCrafter`
  },
  {
    name: "langgraph",
    category: "AI / LLMs",
    year: 2025,
    techUsed: ["Python", "LangChain"],
    description: "Implementations and experiments using LangGraph to create stateful, multi-actor applications with LLMs.",
    githubLink: `${githubLink}/langgraph`,
    liveURL: `${githubLink}/langgraph`
  },
  {
    name: "redrob_ai_challenge",
    category: "Hackathon",
    year: 2025,
    techUsed: ["Python", "AI", "NLP"],
    description: "My submission for the RedRob AI Challenge, focusing on advanced prompt engineering and NLP tasks.",
    githubLink: `${githubLink}/redrob_ai_challenge`,
    liveURL: `${githubLink}/redrob_ai_challenge`
  },
  {
    name: "SyncUp",
    category: "Social Networking",
    year: 2024,
    techUsed: ["Flutter", "Dart", "Supabase", "Provider"],
    description: "Social networking app supporting real-time posts, comments, likes, and profile management for active users. Includes PKCE auth, GoRouter navigation, and a hybrid recommendation engine.",
    githubLink: `${githubLink}/sync_up`,
    liveURL: `${githubLink}/sync_up`
  },
  {
    name: "Langchain",
    category: "AI / LLMs",
    year: 2024,
    techUsed: ["Python", "LLMs"],
    description: "Explorations and advanced workflows built on top of the LangChain framework for intelligent AI systems.",
    githubLink: `${githubLink}/Langchain`,
    liveURL: `${githubLink}/Langchain`
  },
  {
    name: "BlinkSense",
    category: "Computer Vision",
    year: 2026,
    techUsed: ["Python", "OpenCV", "dlib"],
    description: "Real-time driver drowsiness detection system using the Eye Aspect Ratio (EAR) algorithm on live webcam video. Triggers audible and visual alerts when fatigue is detected.",
    githubLink: `${githubLink}/BlinkSense`,
    liveURL: `${githubLink}/BlinkSense`
  },
  {
    name: "RideR",
    category: "Mobile App",
    year: 2026,
    techUsed: ["Flutter", "Dart"],
    description: "Solo-built ride-hailing app in Flutter/Dart, part of a two-app suite (rider + captain sides) modeled on real-world ride-hailing UX. Covers core booking and matching flows.",
    githubLink: `${githubLink}/RideR`,
    liveURL: `${githubLink}/RideR`
  },
  {
    name: "KrishiMitra (fork)",
    category: "AgriTech",
    year: 2024,
    techUsed: ["React", "Node.js"],
    description: "Contributed to KrishiMitra, an agricultural platform designed to empower farmers with real-time data.",
    githubLink: `${githubLink}/KrishiMitra`,
    liveURL: `${githubLink}/KrishiMitra`
  },
  {
    name: "Weather",
    category: "Mobile App",
    year: 2025,
    techUsed: ["Flutter", "OpenWeatherMap API"],
    description: "Flutter weather app pulling real-time and forecasted data. Displays current temperature, conditions, humidity, and wind speed through a clean, intuitive UI.",
    githubLink: `${githubLink}/weather`,
    liveURL: `${githubLink}/weather`
  }
];

// Education Experience (Empty for now, can be populated later)
export const educationExperience = [];




export const skills = [
  // Languages & Core
  { key: 1, name: "Python", category: "Languages & Core" },
  { key: 2, name: "Dart", category: "Languages & Core" },
  { key: 3, name: "C", category: "Languages & Core" },

  // Web Technologies
  { key: 4, name: "HTML", category: "Web Technologies" },
  { key: 5, name: "CSS", category: "Web Technologies" },
  { key: 6, name: "JavaScript", category: "Web Technologies" },

  // AI/ML & Deep Learning
  { key: 7, name: "PyTorch", category: "AI/ML & Deep Learning" },
  { key: 8, name: "TensorFlow", category: "AI/ML & Deep Learning" },
  { key: 9, name: "LangChain", category: "AI/ML & Deep Learning" },
  { key: 10, name: "LangGraph", category: "AI/ML & Deep Learning" },
  { key: 11, name: "Groq API", category: "AI/ML & Deep Learning" },
  { key: 12, name: "Prompt Engineering", category: "AI/ML & Deep Learning" },
  { key: 13, name: "Agentic Pipelines", category: "AI/ML & Deep Learning" },
  { key: 14, name: "FAISS", category: "AI/ML & Deep Learning" },
  { key: 15, name: "ChromaDB", category: "AI/ML & Deep Learning" },
  { key: 16, name: "GANs (Conditional GAN)", category: "AI/ML & Deep Learning" },
  { key: 17, name: "Drift Detection (PSI/KS-test)", category: "AI/ML & Deep Learning" },
  { key: 18, name: "NER/Token Classification", category: "AI/ML & Deep Learning" },
  { key: 19, name: "Hallucination Scoring", category: "AI/ML & Deep Learning" },
  { key: 20, name: "RAG", category: "AI/ML & Deep Learning" },

  // Backend & APIs
  { key: 21, name: "FastAPI", category: "Backend & APIs" },
  { key: 22, name: "REST API Design", category: "Backend & APIs" },
  { key: 23, name: "SQL (Views, Functions, Window Functions, Joins, CTEs)", category: "Backend & APIs" },

  // Mobile Development
  { key: 24, name: "Flutter", category: "Mobile Development" },
  { key: 25, name: "State Management: Provider", category: "Mobile Development" },
  { key: 26, name: "Routing: GoRouter (ShellRoute)", category: "Mobile Development" },
  { key: 27, name: "Auth: PKCE", category: "Mobile Development" },

  // Databases & Storage
  { key: 28, name: "PostgreSQL", category: "Databases & Storage" },
  { key: 29, name: "Supabase", category: "Databases & Storage" },
  { key: 30, name: "SQLite", category: "Databases & Storage" },

  // DevOps & Cloud
  { key: 31, name: "Docker", category: "DevOps & Cloud" },
  { key: 32, name: "Docker Compose", category: "DevOps & Cloud" },
  { key: 33, name: "AWS (ECS Fargate, ECR, ALB)", category: "DevOps & Cloud" },

  // Data Structures & Algorithms
  { key: 34, name: "Graph Algorithms (BFS/DFS, Topological Sort, Dijkstra's)", category: "Data Structures & Algorithms" },
  { key: 35, name: "Trees (AVL, BSTs, Heaps)", category: "Data Structures & Algorithms" },
  { key: 36, name: "Kruskal's Algorithm + DSU", category: "Data Structures & Algorithms" },
  { key: 37, name: "Backtracking", category: "Data Structures & Algorithms" },
  { key: 38, name: "600+ LeetCode Problems Solved", category: "Data Structures & Algorithms" },
  { key: 39, name: "LeetCode Contest Rating: 1,656", category: "Data Structures & Algorithms" },

  // Security
  { key: 40, name: "Prompt-Injection Detection", category: "Security" },
  { key: 41, name: "LLM Cost Governance / Abuse Detection", category: "Security" },
];

const appsData = [
  {
    id: 1,
    name: "About Me",
    icon: "/images/apps/folder.png",
    action: "explorer",
    subAction: "about",
    size: "w-14 h-14",
  },
  {
    id: 2,
    name: "Projects",
    icon: "/images/apps/folder.png",
    action: "explorer",
    subAction: "projects",
    size: "w-14 h-14",
  },
  {
    id: 3,
    name: "AI Lab",
    icon: "/images/apps/folder.png",
    action: "explorer",
    subAction: "AI Lab",
    size: "w-14 h-14",
  },
  {
    id: 4,
    name: "Terminal",
    icon: "/images/apps/terminal.png",
    action: "app",
    subAction: "terminal",
    size: "w-10 h-10",
  },
  {
    id: 5,
    name: "Skills",
    icon: "/images/apps/folder.png",
    action: "explorer",
    subAction: "Skills",
    size: "w-14 h-14",
  },
  {
    id: 6,
    name: "Resume",
    icon: "/images/apps/folder.png",
    action: "explorer",
    subAction: "Resume",
    size: "w-14 h-14",
  },
  {
    id: 7,
    name: "Browser",
    icon: "/images/apps/chrome.png",
    action: "browser",
    subAction: "chrome",
    size: "w-11 h-11",
  },
  {
    id: 8,
    name: "Calculator",
    icon: "/images/apps/calculator.png",
    action: "calculator",
    size: "w-11 h-11",
  },
  {
    id: 9,
    name: "Control Panel",
    icon: "/images/apps/switch.png",
    action: "control_panel",
    size: "w-11 h-11",
  },
  {
    id: 10,
    name: "Contact",
    icon: "/images/apps/contact.svg",
    action: "contact",
    size: "w-11 h-11",
  },
  {
    id: 11,
    name: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    action: "app",
    subAction: "spotify",
    size: "w-11 h-11",
  },
  {
    id: 12,
    name: "Emoji TicTacToe",
    icon: "https://laaouatni.github.io/w11CSS/images/vs-normal.ico",
    action: "app",
    subAction: "emoji",
    size: "w-11 h-11",
  },
  {
    id: 13,
    name: "Epstein Files",
    icon: "/images/apps/folder.png",
    action: "app",
    subAction: "epstein",
    size: "w-14 h-14",
  },
  {
    id: 14,
    name: "Recycle Bin",
    icon: "/images/apps/recyclebin.png",
    action: "recycle",
    size: "w-11 h-11",
  },
  {
    id: 15,
    name: "Desktop Destroyer",
    icon: "https://em-content.zobj.net/thumbs/120/microsoft/319/hammer_1f528.png",
    action: "destroyer",
    size: "w-11 h-11",
  },
];

// Export default data
export default appsData;

// Social Media Links
export const socialMediaLinks = {
  linkedin: "https://www.linkedin.com/in/hari-prasath-sm",
  github: githubLink,
  leetcode: "https://leetcode.com/u/hariprasath-sm/",
  email: "mailto:sm.hariprasath16@gmail.com",
};





export const aiResearchHighlights = [
  {
    title: "VisionCrafter",
    description: "Conditional GAN for text-to-image generation, trained on COCO.",
    note: "",
    chips: ["Patent Filed", "TensorFlow/Keras", "Custom GAN Architecture"],
    githubLink: "https://github.com/Hariprasath-1603/VisionCrafter"
  },
  {
    title: "InjectShield",
    description: "Prompt injection detection built on ETH Zurich's AgentDojo, four-component anomaly scorer, FastAPI + Groq live inference, deployed on AWS ECS Fargate.",
    note: "Known limitation: live-inference false positives due to baseline/model mismatch — documented in repo.",
    chips: ["96.7% Accuracy", "100% Recall", "AWS ECS Fargate"],
    githubLink: "https://github.com/Hariprasath-1603/InjectShield"
  },
  {
    title: "AgentScholar",
    description: "4-agent LangGraph research pipeline (Planner ? Searcher ? Synthesizer ? Report Writer), FAISS/ChromaDB retrieval, hallucination + source-credibility scoring.",
    note: "",
    chips: ["LangGraph", "Multi-Agent Orchestration", "FAISS/ChromaDB"],
    githubLink: "https://github.com/Hariprasath-1603/AgentScholar",
    hasDiagram: true
  },
  {
    title: "BudgetShield",
    description: "LLM cost-governance proxy, concurrency-safe atomic Postgres CTE metering, 402 budget enforcement, runaway-agent detector.",
    note: "",
    chips: ["Postgres CTE Metering", "402 Enforcement", "Runaway Detection"],
    githubLink: "https://github.com/Hariprasath-1603/BudgetShield"
  }
];

export const aiTechStack = [
  { category: "Generation", tools: ["Groq", "Llama 3.1"] },
  { category: "Retrieval", tools: ["FAISS", "ChromaDB", "Tavily"] },
  { category: "Orchestration", tools: ["LangGraph", "LangChain"] },
  { category: "Deployment", tools: ["FastAPI", "Docker", "AWS ECS Fargate"] }
];
