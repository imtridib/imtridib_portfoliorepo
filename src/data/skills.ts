// import {
//   ArrowLeftRight, Binary, Bot, BrainCircuit, Cloud, Container, Database, FileSearch, Flame,
//   Languages, Layers, Link2, MessageSquareText, Network, Rocket, ScanEye, SlidersHorizontal,
//   Smile, Webhook, Workflow, Wrench, Zap, CodeXml,
// } from 'lucide-react'
// import type { SkillGroup } from '../types'

// // Order = order on the page. focus: true adds the "Core focus" badge.
// // To add a skill: add { name, icon } to a group. Icons come from https://lucide.dev/icons
// export const skillGroups: SkillGroup[] = [
//   {
//     title: 'AI Automation',
//     focus: true,
//     skills: [
//       { name: 'n8n', icon: Workflow },
//       { name: 'AI Agents', icon: Bot },
//       { name: 'Workflow Automation', icon: Zap },
//       { name: 'API Orchestration', icon: Network },
//       { name: 'Webhooks', icon: Webhook },
//     ],
//   },
//   {
//     title: 'LLM Engineering',
//     focus: true,
//     skills: [
//       { name: 'LLMs', icon: BrainCircuit },
//       { name: 'RAG', icon: FileSearch },
//       { name: 'LangChain', icon: Link2 },
//       { name: 'Prompt Engineering', icon: MessageSquareText },
//       { name: 'Embeddings', icon: Binary },
//       { name: 'Tool Calling', icon: Wrench },
//     ],
//   },
//   {
//     title: 'AI/ML',
//     focus: true,
//     skills: [
//       { name: 'Python', icon: CodeXml },
//       { name: 'PyTorch', icon: Flame },
//       { name: 'Hugging Face', icon: Smile },
//       { name: 'Computer Vision', icon: ScanEye },
//       { name: 'NLP', icon: Languages },
//       { name: 'Model Fine-Tuning', icon: SlidersHorizontal },
//     ],
//   },
//   {
//     title: 'Production Engineering',
//     skills: [
//       { name: 'FastAPI', icon: Rocket },
//       { name: 'REST APIs', icon: ArrowLeftRight },
//       { name: 'Docker', icon: Container },
//       { name: 'PostgreSQL', icon: Database },
//       { name: 'Vector Databases', icon: Layers },
//       { name: 'Cloud Deployment', icon: Cloud },
//     ],
//   },
// ]

// improvised

import {
  Bot,
  BrainCircuit,
  CloudUpload,
  Database,
  FileSearch,
  Languages,
  MessageSquareText,
  Network,
  ScanEye,
  SlidersHorizontal,
  Webhook,
  Workflow,
  Wrench,
  Binary,
  Route,
} from 'lucide-react'

import {
  SiN8n,
  SiLangchain,
  SiPython,
  SiPytorch,
  SiHuggingface,
  SiFastapi,
  SiDocker,
  SiPostgresql,
} from '@icons-pack/react-simple-icons'

import type { SkillGroup } from '../types'

// Order = order on the page.
// focus: true adds the "Core focus" badge.

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI Automation',
    focus: true,
    skills: [
      { name: 'n8n', icon: SiN8n },
      { name: 'AI Agents', icon: Bot },
      { name: 'Workflow Automation', icon: Workflow },
      { name: 'API Orchestration', icon: Network },
      { name: 'Webhooks', icon: Webhook },
    ],
  },

  {
    title: 'LLM Engineering',
    focus: true,
    skills: [
      { name: 'LLMs', icon: BrainCircuit },
      { name: 'RAG', icon: FileSearch },
      { name: 'LangChain', icon: SiLangchain },
      { name: 'Prompt Engineering', icon: MessageSquareText },
      { name: 'Embeddings', icon: Binary },
      { name: 'Tool Calling', icon: Wrench },
    ],
  },

  {
    title: 'AI/ML',
    focus: true,
    skills: [
      { name: 'Python', icon: SiPython },
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'Hugging Face', icon: SiHuggingface },
      { name: 'Computer Vision', icon: ScanEye },
      { name: 'NLP', icon: Languages },
      { name: 'Model Fine-Tuning', icon: SlidersHorizontal },
    ],
  },

  {
    title: 'Production Engineering',
    skills: [
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'REST APIs', icon: Route },
      { name: 'Docker', icon: SiDocker },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Vector Databases', icon: Database },
      { name: 'Cloud Deployment', icon: CloudUpload },
    ],
  },
]
