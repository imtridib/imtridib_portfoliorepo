// import type { Project } from '../types'

// Put screenshots in /public/images/projects and reference them like '/images/projects/project-1.png'
//
// category decides which filter tab the project appears under:
//   'ai-ml'          -> "AI/ML Projects"
//   'ai-automation'  -> "AI Automation"
//   'other'          -> "Others"
//
// Every link (liveUrl, codeUrl, youtubeUrl) is optional: leave out the ones a project doesn't have.
// '#' is a placeholder: the link stays on the page and does nothing. Replace it with the real URL later.
// stack: one entry per technology, each starting with an emoji.

import type { Project } from '../types'

const capstoneMedia = [
  {
    type: 'image',
    src: 'images/projects/vqa-capstone-image-1.png',
    alt: 'Multilingual VQA system interface',
    caption: 'Main application interface',
  },
  {
    type: 'image',
    src: 'images/projects/vqa-capstone-image-2.png',
    alt: 'VQA system answering a question about a Bangladeshi heritage site',
    caption: 'Question and answer example',
  },
  {
    type: 'image',
    src: 'images/projects/vqa-capstone-image-3.png',
    alt: 'VQA system output in Bangla',
    caption: 'Bangla-language response',
  },
  {
    type: 'image',
    src: 'images/projects/vqa-capstone-image-4.png',
    alt: 'System design and architecture diagram',
    caption: 'System architecture',
  },
  {
    type: 'youtube',
    src: 'https://www.youtube.com/embed/ZrcLAsQvwKI',
    alt: 'Project demonstration video',
    caption: 'Watch the project demo',
  },
] as const

const TEXT =
  'A short description of the project: what problem it solves, the stack you used and what you learned building it.'
const SUMMARY = 'One or two lines that appear on the small grid card.'

export const projects: Project[] = [
  {
    id: 'multilingual-heritage-vqa',
    title: 'Multilingual Visual Question Answering for Cultural Heritage Sites of Bangladesh',
    summary:
      'A fine-tuned BLIP VQA system that answers questions about Bangladeshi heritage images in English and Bangla, with answer refinement using Groq LLaMA 3.3 70B.',
    description:
      'Built a multilingual Visual Question Answering system for cultural heritage sites of Bangladesh. Users provide a heritage image and ask a question in English or Bangla. A fine-tuned BLIP VQA model generates the answer, which is refined with Groq LLaMA 3.3 70B. Language detection and translation help return the response in the question’s language.',
    category: 'ai-ml',
    tag: 'Capstone Project',
    image: capstoneMedia[0].src,
    media: [...capstoneMedia],
    info: [
      { label: 'Year', value: '2025' },
      { label: 'Role', value: 'Capstone project; model fine-tuning and application development' },
      { label: 'Languages', value: 'English and Bangla' },
    ],
    stack: [
      'Python',
      'PyTorch',
      'Hugging Face Transformers',
      'BLIP VQA',
      'Groq LLaMA 3.3 70B',
      'Streamlit',
      'Google Translator',
      'Pillow',
    ],
    codeUrl: 'https://github.com/imtridib/Capstone-Project',
    youtubeUrl: 'https://youtu.be/ZrcLAsQvwKI',
  },
  {
    id: 'project-3',
    title: 'Other project title',
    description: TEXT,
    summary: SUMMARY,
    category: 'other',
    tag: 'Challenge',
    image: '/images/projects/project-3.png',
    info: [
      { label: 'Year', value: '2024' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    stack: ['⚛️ React', '🟦 TypeScript', '🎨 Tailwind CSS', '⚡ Vite'],
    codeUrl: '#',
    youtubeUrl: '#',
  },
  {
    id: 'project-4',
    title: 'Second AI/ML project title',
    description: TEXT,
    summary: SUMMARY,
    category: 'ai-ml',
    image: '/images/projects/project-4.png',
    info: [
      { label: 'Year', value: '2024' },
      { label: 'Role', value: 'AI/ML Engineer' },
    ],
    stack: ['🐍 Python', '🧪 scikit-learn', '📊 Pandas', '🔥 PyTorch'],
    codeUrl: '#',
  },
  {
    id: 'project-5',
    title: 'Second AI automation project title',
    description: TEXT,
    summary: SUMMARY,
    category: 'ai-automation',
    image: '/images/projects/project-5.png',
    info: [
      { label: 'Year', value: '2024' },
      { label: 'Role', value: 'Automation Engineer' },
    ],
    stack: ['🔗 n8n', '🧩 API Orchestration', '📬 Webhooks', '☁️ Cloud Deployment'],
    liveUrl: '#',
    youtubeUrl: '#',
  },
  {
    id: 'project-6',
    title: 'Third AI/ML project title',
    description: TEXT,
    summary: SUMMARY,
    category: 'ai-ml',
    image: '/images/projects/project-6.png',
    info: [
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'AI/ML Engineer' },
    ],
    stack: ['🐍 Python', '🗣️ NLP', '🤗 Hugging Face', '🎛️ Model Fine-Tuning'],
    codeUrl: '#',
  },
  {
    id: 'project-7',
    title: 'Second other project title',
    description: TEXT,
    summary: SUMMARY,
    category: 'other',
    image: '/images/projects/project-7.png',
    info: [
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Full-stack Developer' },
    ],
    stack: ['⚛️ React', '🟢 Node.js', '🐘 PostgreSQL'],
    liveUrl: '#',
  },
]
