// import type { Project } from '../types'

// // Put screenshots in /public/images/projects and reference them like '/images/projects/project-1.png'
// export const projects: Project[] = [
//   {
//     id: 'project-1',
//     title: 'Project title goes here',
//     description:
//       'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
//     tag: 'Conceptual Work',
//     image: '/images/projects/project-1.png',
//     info: [
//       { label: 'Year', value: '2023' },
//       { label: 'Role', value: 'Front-end Developer' },
//     ],
//     liveUrl: '#',
//     codeUrl: '#',
//   },
//   {
//     id: 'project-2',
//     title: 'Project title goes here',
//     description:
//       'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
//     image: '/images/projects/project-2.png',
//     info: [
//       { label: 'Client', value: 'Client name' },
//       { label: 'Year', value: '2023' },
//       { label: 'Role', value: 'Front-end Developer' },
//     ],
//     liveUrl: '#',
//   },
//   {
//     id: 'project-3',
//     title: 'Project title goes here',
//     description:
//       'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
//     tag: 'Challenge',
//     image: '/images/projects/project-3.png',
//     info: [
//       { label: 'Year', value: '2023' },
//       { label: 'Role', value: 'Front-end Developer' },
//     ],
//     liveUrl: '#',
//     codeUrl: '#',
//   },
// ]

import type { Project } from '../types'

// Put screenshots in /public/images/projects and reference them like '/images/projects/project-1.png'
// Every link (liveUrl, codeUrl, youtubeUrl) is optional: leave out the ones a project doesn't have.
// stack: one entry per technology, each starting with an emoji.
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project title goes here',
    description:
      'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
    summary: 'One or two lines that appear on the small grid card.',
    tag: 'Conceptual Work',
    image: '/images/projects/project-1.png',
    info: [
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    stack: ['⚛️ React', '🟦 TypeScript', '🎨 Tailwind CSS', '⚡ Vite', '🔥 Firebase', '🧪 Vitest', '🚀 Vercel'],
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/',
    youtubeUrl: 'https://youtube.com/',
  },
  {
    id: 'project-2',
    title: 'Project title goes here',
    description:
      'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
    summary: 'One or two lines that appear on the small grid card.',
    image: '/images/projects/project-2.png',
    info: [
      { label: 'Client', value: 'Client name' },
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    stack: ['🟩 Vue', '🍃 MongoDB', '🟢 Node.js', '🛠️ Express', '📦 Docker', '🐙 GitHub Actions'],
    liveUrl: 'https://example.com',
  },
  {
    id: 'project-3',
    title: 'Project title goes here',
    description:
      'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
    summary: 'One or two lines that appear on the small grid card.',
    tag: 'Challenge',
    image: '/images/projects/project-3.png',
    info: [
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    stack: ['⚛️ React', '🧭 React Router', '🎞️ Framer Motion', '🧰 Zustand', '🎨 Sass'],
    codeUrl: 'https://github.com/',
    youtubeUrl: 'https://youtube.com/',
  },
]
