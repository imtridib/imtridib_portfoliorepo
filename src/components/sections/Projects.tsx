import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, ArrowUpDown } from "lucide-react";
import { projects } from "../../data/projects";
import { sortProjects, type SortMode } from "../../lib/projectDates";
import { ChevronDownIcon, GridIcon, ListIcon } from "../../icons";
import type { Project, ProjectCategory } from "../../types";
import Container from "../ui/Container";
import ProjectCard from "../ui/ProjectCard";
import ProjectGridCard from "../ui/ProjectGridCard";
import ProjectModal from "../ui/ProjectModal";
import { ScrollCard, ScrollText } from "../ui/ScrollMotion";

type View = "list" | "grid";
type Filter = "all" | ProjectCategory;
type Sort = SortMode; // 'priority' | 'latest' | 'oldest'

// The text navbar under the heading. Delete the 'all' line if you only want the three category tabs.
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI/ML Projects" },
  { id: "ai-automation", label: "AI Automation" },
  { id: "other", label: "Others" },
];

// How many projects show before "See more"
const LIMIT: Record<View, number> = { list: 3, grid: 3 };

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  const base =
    "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-bold uppercase transition-colors";
  const on = "bg-primary text-ink";
  const off = "text-muted hover:text-fg";
  return (
    <div
      role="group"
      aria-label="Project layout"
      className="inline-flex rounded-full border border-line bg-card p-1"
    >
      <button
        type="button"
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
        className={`${base} ${view === "list" ? on : off}`}
      >
        <ListIcon className="h-4 w-4" />
        List
      </button>
      <button
        type="button"
        aria-pressed={view === "grid"}
        onClick={() => onChange("grid")}
        className={`${base} ${view === "grid" ? on : off}`}
      >
        <GridIcon className="h-4 w-4" />
        Grid
      </button>
    </div>
  );
}

function FilterNav({
  filter,
  onChange,
  className = "",
}: {
  filter: Filter;
  onChange: (f: Filter) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="Filter projects"
      className={`flex flex-wrap justify-center gap-x-10 gap-y-2 ${className}`}
    >
      {FILTERS.map(({ id, label }) => {
        const active = filter === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className="group relative cursor-pointer px-1 pb-3 pt-1 font-body text-base"
          >
            {/* text: turns bold + highlighted on hover, and stays that way when selected */}
            <span
              className={`block transition-[font-weight,color] duration-200 motion-reduce:transition-none ${
                active
                  ? "font-bold text-accent"
                  : "font-medium text-muted group-hover:font-bold group-hover:text-accent"
              }`}
            >
              {label}
            </span>
            {/* invisible bold copy: reserves the bold width so the row never jumps when the text turns bold */}
            <span
              aria-hidden="true"
              className="invisible block h-0 overflow-hidden font-bold"
            >
              {label}
            </span>
            {/* line that opens from the centre outwards */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-0.5 origin-center bg-accent transition-transform duration-300 motion-reduce:transition-none ${
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

/** Tablet + mobile version of the category filter: a dropdown ("All ˅" on tablet, just "˅" on mobile). */
function FilterDropdown({
  filter,
  onChange,
}: {
  filter: Filter;
  onChange: (f: Filter) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Filter projects: ${current.label}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex cursor-pointer items-center gap-3 px-1 py-2 font-body text-base text-fg"
      >
        {/* selected label: hidden on phones (chevron only), shown with underline from tablet up */}
        <span className="hidden border-b-2 border-accent pb-1 font-bold text-accent sm:block">
          {current.label}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Project categories"
          className="absolute right-0 top-full z-30 mt-3 min-w-[210px] rounded-2xl border border-line bg-card p-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        >
          {FILTERS.map(({ id, label }) => {
            const active = filter === id;
            return (
              <li key={id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(id);
                    setOpen(false);
                  }}
                  className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-left font-body text-sm transition-colors ${
                    active
                      ? "bg-primary font-bold text-ink"
                      : "font-medium text-muted hover:bg-tile hover:text-accent"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Sort bar: [sort icon | Latest | Oldest]. While the page is in its first "project number" order, neither is highlighted. */
function SortBar({
  sort,
  onChange,
}: {
  sort: Sort;
  onChange: (s: Sort) => void;
}) {
  const base =
    "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors sm:px-6 sm:text-base";
  const on = "bg-primary text-ink";
  const off = "text-muted hover:text-fg";
  return (
    <div
      role="group"
      aria-label="Sort projects by time"
      className="inline-flex items-center rounded-full border border-accent/60 bg-card p-1.5 shadow-[0_0_18px_rgba(56,189,248,0.25)]"
    >
      <span
        aria-hidden="true"
        className="flex items-center gap-3 pl-3 pr-3 text-accent sm:pl-4 sm:pr-4"
      >
        <ArrowUpDown className="h-5 w-5" />
        <span className="h-6 w-px bg-line" />
      </span>
      <button
        type="button"
        aria-pressed={sort === "latest"}
        onClick={() => onChange("latest")}
        className={`${base} ${sort === "latest" ? on : off}`}
      >
        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
        Latest
      </button>
      <button
        type="button"
        aria-pressed={sort === "oldest"}
        onClick={() => onChange("oldest")}
        className={`${base} ${sort === "oldest" ? on : off}`}
      >
        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
        Oldest
      </button>
    </div>
  );
}
const initialView = (): View =>
  typeof window === "undefined" ||
  window.matchMedia("(min-width: 1024px)").matches
    ? "list"
    : "grid";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [view, setView] = useState<View>(initialView);
  const [filter, setFilter] = useState<Filter>("all");
  // First look = your own project numbers ('priority'). It switches to 'latest' on the first category click.
  const [sort, setSort] = useState<Sort>("priority");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<{
    project: Project;
    rect: DOMRect;
  } | null>(null);

  // filter first, then sort (the sorting rules live in lib/projectDates.ts)
  const byCategory =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const filtered = sortProjects(byCategory, sort);
  const limit = LIMIT[view];
  const visible = expanded ? filtered : filtered.slice(0, limit);
  const canExpand = filtered.length > limit;

  // Changing the layout, the filter or the sort always goes back to the short list
  const changeView = (v: View) => {
    setView(v);
    setExpanded(false);
  };
  const changeFilter = (f: Filter) => {
    if (f === filter) return; // clicking the tab you are already on does nothing
    setFilter(f);
    setSort((s) => (s === "priority" ? "latest" : s)); // leave the project-number order, newest first
    setExpanded(false);
  };
  const changeSort = (s: Sort) => {
    setSort(s);
    setExpanded(false);
  };
  const toggleExpanded = () => {
    if (expanded) {
      setExpanded(false);
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }); // don't leave the reader stranded at the bottom
    } else {
      setExpanded(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-b border-line py-20 pb-[140px] lg:pb-20"
    >
      <Container>
        <div>
          <h2 className="font-display text-[clamp(52px,6vw,76px)] font-normal leading-none">
            Featured Projects
          </h2>
          <ScrollText order={1}>
            <p className="mt-2 max-w-[600px] text-muted">
              Here are some of the selected projects that showcase my passion
              for AI, machine learning and automation engineering.
            </p>
          </ScrollText>
        </div>

        {/* Toolbar: layout toggle + category filter (tabs on desktop, dropdown on tablet/mobile) */}
        <div className="mt-10 border-b border-line pb-5">
          <div className="flex items-center gap-4 lg:gap-10">
            <ViewToggle view={view} onChange={changeView} />

            {/* desktop: text tabs */}
            <FilterNav
              filter={filter}
              onChange={changeFilter}
              className="hidden flex-1 lg:flex"
            />

            {/* tablet + mobile: dropdown (a thin divider shows on phones only) */}
            <div className="ml-auto flex items-center gap-4 lg:hidden">
              <span aria-hidden="true" className="h-8 w-px bg-line sm:hidden" />
              <FilterDropdown filter={filter} onChange={changeFilter} />
            </div>
          </div>
        </div>

        {/* Sort bar: Latest / Oldest */}
        <div className="mt-8 flex justify-center">
          <SortBar sort={sort} onChange={changeSort} />
        </div>

        {/* key remounts the cards (replaying their reveal) whenever the layout, the filter or the sort changes */}
        <div key={`${view}-${filter}-${sort}`} className="mt-12">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-muted">
              No projects in this category yet.
            </p>
          ) : view === "list" ? (
            <div className="flex flex-col gap-20 lg:gap-[120px]">
              {visible.map((p, i) => (
                // odd ones put the image card on the right
                <ScrollCard key={p.id}>
                  <ProjectCard project={p} reverse={i % 2 === 1} />
                </ScrollCard>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <ScrollCard key={p.id} className="h-full" order={i % limit}>
                  <ProjectGridCard
                    project={p}
                    onOpen={(project, rect) => setSelected({ project, rect })}
                  />
                </ScrollCard>
              ))}
            </div>
          )}
        </div>

        {canExpand && (
          <ScrollText className="mt-14 flex flex-col items-center gap-3">
            <p className="font-body text-sm text-muted">
              Showing {visible.length} of {filtered.length}
            </p>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={toggleExpanded}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent px-6 py-3 font-body text-sm font-bold uppercase text-accent transition-colors hover:bg-primary hover:text-ink"
            >
              {expanded ? "See less" : "See more"}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </ScrollText>
        )}

        <ProjectModal
          project={selected?.project ?? null}
          fromRect={selected?.rect ?? null}
          onClose={() => setSelected(null)}
        />
      </Container>
    </section>
  );
}