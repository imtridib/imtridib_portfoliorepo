import type { Project } from "../types";
import { withTimeline } from "../lib/projectDates";

const capstoneMedia = [
  {
    type: "image",
    src: "images/projects/vqa-capstone-image-1.png",
    alt: "Multilingual VQA system interface",
    caption: "Main application interface",
  },
  {
    type: "image",
    src: "images/projects/vqa-capstone-image-2.png",
    alt: "VQA system answering a question about a Bangladeshi heritage site",
    caption: "Question and answer example",
  },
  {
    type: "image",
    src: "images/projects/vqa-capstone-image-3.png",
    alt: "VQA system output in Bangla",
    caption: "Bangla-language response",
  },
  {
    type: "image",
    src: "images/projects/vqa-capstone-image-4.png",
    alt: "System design and architecture diagram",
    caption: "System architecture",
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/ZrcLAsQvwKI",
    alt: "Project demonstration video",
    caption: "Watch the project demo",
  },
] as const;

const wasteDetectionMedia = [
  {
    type: "image",
    src: "images/projects/robot2.webp",
    alt: "Autonomous plastic bottle collector robot during an outdoor demonstration",
    caption: "Autonomous Waste Collection Robot",
  },
  {
    type: "image",
    src: "images/projects/robot5.webp",
    alt: "Internal architecture and components of the waste collection robot",
    caption: "Robot Architecture",
  },
  {
    type: "image",
    src: "images/projects/robot3.webp",
    alt: "Plastic waste detection demonstration using the robot's vision system",
    caption: "Plastic Detection",
  },
  {
    type: "image",
    src: "images/projects/robot4.webp",
    alt: "Plastic waste identification during a practical robot demonstration",
    caption: "Real-World Detection",
  },
  {
    type: "image",
    src: "images/projects/robot1.webp",
    alt: "Autonomous plastic bottle collector robot during testing",
    caption: "Robot Testing",
  },
  {
    type: "image",
    src: "images/projects/waste-detection-results-collage.png",
    alt: "YOLOv8n waste detection results showing bounding boxes and predictions across waste categories",
    caption: "YOLOv8n Detection Results",
  },
] as const;

const movieRecMedia = [
  {
    type: "image",
    src: "images/projects/Sample_Demo7.png",
    alt: "Movie Selection Interface",
    caption: "Selecting a target movie from the dropdown",
  },
  {
    type: "image",
    src: "images/projects/Sample_Demo1.png",
    alt: "Tangled movie recommendations",
    caption:
      "Model inference retrieving top 5 visually matched recommendations",
  },

  {
    type: "image",
    src: "images/projects/Sample_Demo2.png",
    alt: "Good Will Hunting movie recommendations",
    caption: "Will Hunting similarity recommendations",
  },

  {
    type: "image",
    src: "images/projects/Sample_Demo3.png",
    alt: "Avatar movie recommendations",
    caption: "Sci-Fi similarity recommendations",
  },
  {
    type: "image",
    src: "images/projects/Sample_Demo5.png",
    alt: "The Dark Knight Rises recommendations",
    caption: "Action/Superhero similarity recommendations",
  },
] as const;

const TEXT =
  "A short description of the project: what problem it solves, the stack you used and what you learned building it.";
const SUMMARY = "One or two lines that appear on the small grid card.";

const rawProjects: Project[] = [
  {
    id: "multilingual-heritage-vqa",
    priority: 1,
    startDate: "2025-01-10",
    endDate: "2025-06-20",
    title:
      "Multilingual Visual Question Answering for Cultural Heritage Sites of Bangladesh",
    summary:
      "A fine-tuned BLIP VQA system that answers questions about Bangladeshi heritage images in English and Bangla, with answer refinement using Groq LLaMA 3.3 70B.",
    description:
      "Built a multilingual Visual Question Answering system for cultural heritage sites of Bangladesh. Users provide a heritage image and ask a question in English or Bangla. A fine-tuned BLIP VQA model generates the answer, which is refined with Groq LLaMA 3.3 70B. Language detection and translation help return the response in the question’s language.",
    category: "ai-ml",
    tag: "Capstone Project",
    image: capstoneMedia[0].src,
    media: [...capstoneMedia],
    info: [
      {
        label: "Role",
        value:
          "Capstone project; model fine-tuning and application development",
      },
      { label: "Languages", value: "English and Bangla" },
    ],
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "BLIP VQA",
      "Groq LLaMA 3.3 70B",
      "Streamlit",
      "Google Translator",
      "Pillow",
    ],
    codeUrl: "https://github.com/imtridib/Capstone-Project",
    youtubeUrl: "https://youtu.be/ZrcLAsQvwKI",
  },
  {
    id: "yolov8n-waste-detection-robot",
    priority: 2,
    startDate: "2024-11-05",
    endDate: "2025-01-30",

    title: "YOLOv8n-Based Waste Detection & Autonomous Collection System",

    summary:
  "Fine-tuned a YOLOv8n model to detect five waste categories, then applied my AI/ML expertise to support plastic detection in an autonomous waste collection robot.",

description:
  "Developed and fine-tuned a YOLOv8n model to detect five waste categories: Plastic, Paper, Metal, Glass, and Contamination. Trained and evaluated the model on approximately 4,959 images, achieving 89.6% precision and 81.3% mAP@50.\n\n" +

  "Later, from February 6 to September 15, 2026, I collaborated as an AI/ML consultant on an Autonomous Plastic Bottle Collector developed by my campus mate, Niaz Morshed Razon. I contributed to developing and training the plastic detection model and provided technical guidance for integrating computer vision into the robot's waste collection workflow.\n\n" +

  "This project demonstrates the practical application of computer vision in autonomous waste collection. Special thanks to Niaz Morshed Razon for developing the robotic system and collaborating on its implementation.",
   
  category: "ai-ml",
    tag: "Computer Vision",

    image: wasteDetectionMedia[5].src,
    media: [...wasteDetectionMedia],

    info: [
      {
        label: "Role",
        value: "AI/ML Engineer – YOLOv8n Model Development & Training",
      },
      {
        label: "Model Development",
        value: "November 5, 2024 – January 30, 2025",
      },
      {
        label: "Robotics Collaboration",
        value: "February 6, 2026 – September 15, 2026",
      },
      {
        label: "Dataset",
        value: "Approximately 4,959 images | 5 waste categories",
      },
      {
        label: "Robot Project Developer",
        value: "Niaz Morshed Razon",
      },
    ],

    stack: [
      "Python",
      "Ultralytics YOLOv8n",
      "PyTorch",
      "OpenCV",
      "Computer Vision",
      "Object Detection",
      "Matplotlib",
      "Kaggle",
    ],

    codeUrl: "https://github.com/imtridib/Fine-tunerd-yolov8n-waste-detection",

    liveUrl:
      "https://www.kaggle.com/code/imtridibchakraborty/waste-detection-using-yolov8n-final",
  },
  {
    id: "movie-recommendation-system",
    priority: 3,
    startDate: "2024-03-01",
    endDate: "2024-05-15",
    title: "AI-Powered Movie Recommendation System",
    summary:
      "A machine learning-based content recommendation engine utilizing TF-IDF and Cosine Similarity to suggest visually appealing and contextually relevant movies.",
    description:
      "Cleaned and processed 5,000+ TMDB movie records to extract and combine relevant textual and categorical content features. Applied TF-IDF vectorization and Cosine Similarity to construct a highly accurate similarity matrix. Developed a low-latency Streamlit frontend to perform real-time model inference and dynamic poster fetching via the TMDB API.",
    category: "ai-ml",
    tag: "Machine Learning",
    image: movieRecMedia[0].src,
    media: [...movieRecMedia],
    info: [{ label: "Role", value: "AI/ML Engineer" }],
    stack: [
      "Python",
      "Streamlit",
      "TF-IDF Vectorization",
      "Cosine Similarity",
      "Pandas",
      "TMDB API",
    ],
    codeUrl: "https://github.com/imtridib/movieRecomendation",
    liveUrl: "https://movie-recommendation-system-x7rl.onrender.com/",
  },
  {
    id: "project-5",
    priority: 4,
    startDate: "2024-10-05",
    title: "Second AI automation project title",
    description: TEXT,
    summary: SUMMARY,
    category: "ai-automation",
    image: "/images/projects/project-5.png",
    info: [{ label: "Role", value: "Automation Engineer" }],
    stack: [
      "🔗 n8n",
      "🧩 API Orchestration",
      "📬 Webhooks",
      "☁️ Cloud Deployment",
    ],
    liveUrl: "#",
    youtubeUrl: "#",
  },
  {
    id: "project-6",
    priority: 5,
    startDate: "2024-02-12",
    endDate: "2024-04-20",
    title: "Third AI/ML project title",
    description: TEXT,
    summary: SUMMARY,
    category: "ai-ml",
    image: "/images/projects/project-6.png",
    info: [{ label: "Role", value: "AI/ML Engineer" }],
    stack: ["🐍 Python", "🗣️ NLP", "🤗 Hugging Face", "🎛️ Model Fine-Tuning"],
    codeUrl: "#",
  },
  {
    id: "project-7",
    priority: 6,
    endDate: "2025-03-18",
    title: "Second other project title",
    description: TEXT,
    summary: SUMMARY,
    category: "other",
    image: "/images/projects/project-7.png",
    info: [{ label: "Role", value: "Full-stack Developer" }],
    stack: ["⚛️ React", "🟢 Node.js", "🐘 PostgreSQL"],
    liveUrl: "#",
  },
];

// Builds the "Timeline" row from startDate/endDate (see lib/projectDates.ts)
export const projects: Project[] = rawProjects.map(withTimeline);
