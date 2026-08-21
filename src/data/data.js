import {
  JavascriptOriginal,
  PythonOriginal,
  Html5Original,
  Css3Original,
  ExpressOriginal,
  ReactOriginal,
  NextjsOriginal,
  TailwindcssOriginal,
  BootstrapPlain,
  NodejsOriginal,
  MongodbPlain,
  PostmanPlain,
  CPlain,
  DjangoPlain,
  MysqlOriginalWordmark,
  PostgresqlOriginal,
  PhotoshopOriginal,
  FigmaOriginal,
  BlenderOriginal,
} from "devicons-react";

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
    name: "VisionCrafter",
    category: "Generative AI",
    year: 2024,
    techUsed: ["Python", "PyTorch", "GANs", "OpenCV"],
    description: "An image generation model powered by Generative Adversarial Networks (GANs). Users provide text prompts to generate high-quality, creative images, blending deep learning with intuitive user interaction.",
    githubLink: `${githubLink}/VisionCrafter`,
  },
  {
    name: "SyncUp",
    category: "AI + Social",
    year: 2024,
    techUsed: ["Flutter", "Python", "Jarvis AI"],
    description: "A social media application supercharged with Jarvis AI. Users can use natural language commands to interact with posts, reels, stories and other social-media functionality in a hands-free and intelligent way.",
    githubLink: `${githubLink}/sync_up`,
  },
  {
    name: "HealOps",
    category: "MLOps / Healthcare",
    year: 2025,
    techUsed: ["Python", "FastAPI", "MLflow", "scikit-learn"],
    description: "A modern healthcare management backend built with FastAPI, designed to provide secure, scalable and efficient healthcare services with real-time notifications.",
    githubLink: `${githubLink}/HealOPS`,
  },
  {
    name: "BlinkSense",
    category: "Computer Vision",
    year: 2026,
    techUsed: ["Python", "OpenCV", "dlib", "TensorFlow"],
    description: "A real-time drowsiness detection ML system that monitors eye-blink patterns and facial landmarks to detect driver fatigue and provide alerts.",
    githubLink: `${githubLink}/BlinkSense`,
  },
];

// Education Experience (Empty for now, can be populated later)
export const educationExperience = [];

const iconSize = 15;
const iconClass = "mx-auto";

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
    icon: "/images/apps/recyclebin.png",
    action: "mail",
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
