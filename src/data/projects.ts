import type { Project } from '../types'

// Put screenshots in /public/images/projects and reference them like '/images/projects/project-1.png'
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project title goes here',
    description:
      'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
    tag: 'Conceptual Work',
    image: '/images/projects/project-1.png',
    info: [
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Project title goes here',
    description:
      'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
    image: '/images/projects/project-2.png',
    info: [
      { label: 'Client', value: 'Client name' },
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    liveUrl: '#',
  },
  {
    id: 'project-3',
    title: 'Project title goes here',
    description:
      'A short description of the project: what problem it solves, the stack you used and what you learned building it.',
    tag: 'Challenge',
    image: '/images/projects/project-3.png',
    info: [
      { label: 'Year', value: '2023' },
      { label: 'Role', value: 'Front-end Developer' },
    ],
    liveUrl: '#',
    codeUrl: '#',
  },
]
