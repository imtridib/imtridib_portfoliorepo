import type { Project } from "../types";

/** priority = your own project numbers (first load), latest/oldest = by date */
export type SortMode = "priority" | "latest" | "oldest";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface Parts {
  y: number;
  m?: number;
  d?: number;
}

/** '2025-06-20', '2025-06' or '2025' -> its parts. Anything else -> null. */
function parse(s?: string): Parts | null {
  const m = s?.trim().match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
  if (!m) return null;
  return { y: Number(m[1]), m: m[2] ? Number(m[2]) : undefined, d: m[3] ? Number(m[3]) : undefined };
}

/** { y: 2025, m: 6, d: 20 } -> '20 Jun 2025' (day/month are left out if you didn't give them) */
function show(p: Parts): string {
  const out: (string | number)[] = [];
  if (p.d) out.push(p.d);
  if (p.m && p.m >= 1 && p.m <= 12) out.push(MONTHS[p.m - 1]);
  out.push(p.y);
  return out.join(" ");
}


export function formatTimeline(p: Project): string {
  const s = parse(p.startDate);
  const e = parse(p.endDate);
  if (s && e) return `${show(s)} – ${show(e)}`;
  if (e) return `Completed ${show(e)}`;
  if (s) return `${show(s)} – Present`;
  return "";
}


export function withTimeline(p: Project): Project {
  const text = formatTimeline(p);
  if (!text) return p;
  const rest = (p.info ?? []).filter((i) => !/^(year|timeline)$/i.test(i.label));
  return { ...p, info: [{ label: "Timeline", value: text }, ...rest] };
}

/** The moment a project is sorted by: its end date, or its start date if that is all it has. */
function timeOf(p: Project): number | null {
  const d = parse(p.endDate) ?? parse(p.startDate);
  return d ? Date.UTC(d.y, (d.m ?? 1) - 1, d.d ?? 1) : null;
}


export function sortProjects(list: Project[], mode: SortMode): Project[] {
  const prio = (p: Project) => p.priority ?? Number.MAX_SAFE_INTEGER;
  return [...list].sort((a, b) => {
    if (mode !== "priority") {
      const ta = timeOf(a);
      const tb = timeOf(b);
      if (ta === null || tb === null) {
        if (ta !== tb) return ta === null ? 1 : -1;
      } else if (ta !== tb) {
        return mode === "latest" ? tb - ta : ta - tb;
      }
    }
    return prio(a) - prio(b);
  });
}