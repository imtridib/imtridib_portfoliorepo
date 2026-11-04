import type { ComponentType, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type Theme = "dark" | "light";
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** when you started: 'YYYY-MM-DD' (month and day optional: '2025-06' or '2025'). Leave out if you only know the end. */
// startDate?: string
/** when you finished, same format. Leave out if the project is still going. */
// endDate?: string
/** your project number: 1 = shown first when the page loads. Never shown on the page. */
// priority?: number

export type SkillIcon = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number;
    color?: string;
    strokeWidth?: number;
  }
>;

export interface NavItem {
  id: string;
  label: string;
  icon: IconComponent;
}

export interface InfoItem {
  label: string;
  value: string;
}

/** which tab of the project filter a project belongs to */
export type ProjectCategory = "ai-ml" | "ai-automation" | "other";

export interface ProjectMedia {
  type: "image" | "youtube";
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  /** short text for the grid card (falls back to description, clamped) */
  summary?: string;
  category: ProjectCategory;
  /** when you started: 'YYYY-MM-DD' (month and day optional: '2025-06' or '2025'). Leave out if you only know the end. */
  startDate?: string;
  /** when you finished, same format. Leave out if the project is still going. */
  endDate?: string;
  /** your project number: 1 = shown first when the page loads. Never shown on the page. */
  priority?: number;
  tag?: string;
  image?: string;
  /** Additional images and an optional YouTube video for the project gallery */
  media?: ProjectMedia[];
  info: InfoItem[];
  /** tech stack, one item per entry, each starting with an emoji: '⚛️ React' */
  stack?: string[];
  liveUrl?: string;
  codeUrl?: string;
  youtubeUrl?: string;
}
export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface SkillGroup {
  title: string;
  /** shows a "Core focus" badge */
  focus?: boolean;
  skills: Skill[];
}

/** One research paper. Anything you don't know stays null (or []): empty fields are hidden. */
export interface ResearchPaper {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  thumbnail: string | null;
  authors: string[];
  venue: string | null;
  year: number | null;
  publicationStatus: string | null;
  doi: string | null;
  paperUrl: string | null;
  codeUrl: string | null;
  detailsUrl: string | null;
}
