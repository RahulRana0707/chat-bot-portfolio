"use client";

import { useMemo, useState, useCallback } from "react";
import { Search, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ProjectCard } from "@/components/project-card";
import type { ProjectCardItem } from "@/components/project-card";
import { SkillMapper, type Skill } from "@/components/all-skills";

export function ProjectListWithFilters({
  projects,
}: {
  projects: ProjectCardItem[];
}) {
  const [search, setSearch] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());

  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      for (const t of p.technologies ?? []) {
        set.add(t);
      }
    }
    return Array.from(set).sort(
      (a, b) => (SkillMapper[a as Skill]?.name ?? a).localeCompare(SkillMapper[b as Skill]?.name ?? b),
    );
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      if (q) {
        const title = (p.title ?? "").toLowerCase();
        const descText = (p.description ?? []).join(" ").toLowerCase();
        if (!title.includes(q) && !descText.includes(q)) return false;
      }
      if (selectedTechs.size > 0) {
        const projectTechs = new Set((p.technologies ?? []).map(String));
        const hasMatch = [...selectedTechs].some((t) => projectTechs.has(t));
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [projects, search, selectedTechs]);

  const addTech = useCallback((tech: string) => {
    setSelectedTechs((prev) => new Set(prev).add(tech));
  }, []);
  const removeTech = useCallback((tech: string) => {
    setSelectedTechs((prev) => {
      const next = new Set(prev);
      next.delete(tech);
      return next;
    });
  }, []);

  const selectedTechsList = useMemo(
    () => Array.from(selectedTechs).sort(),
    [selectedTechs],
  );
  const availableTechs = useMemo(
    () => allTechnologies.filter((t) => !selectedTechs.has(t)),
    [allTechnologies, selectedTechs],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects by title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search projects"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground shrink-0">
            Technologies
          </span>
          <div className="flex flex-wrap items-center gap-2 min-h-9">
            {selectedTechsList.map((tech) => (
              <span
                key={tech}
                className="inline-flex h-8 items-center gap-1 rounded-full border border-primary/50 bg-primary/10 pl-2.5 pr-1 text-xs font-medium text-primary"
              >
                {SkillMapper[tech as Skill]?.name ?? tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="rounded-full p-0.5 hover:bg-primary/20"
                  aria-label={`Remove ${tech}`}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-dashed border-input bg-background px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Add technology filter"
                >
                  <Plus className="size-3.5" />
                  Add tech
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search technologies…" />
                  <CommandList>
                    <CommandEmpty>No technology found.</CommandEmpty>
                    <CommandGroup>
                      {availableTechs.map((tech) => (
                        <CommandItem
                          key={tech}
                          value={SkillMapper[tech as Skill]?.name ?? tech}
                          onSelect={() => addTech(tech)}
                        >
                          {SkillMapper[tech as Skill]?.name ?? tech}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {filtered.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No projects match your filters. Try a different search or clear
          technologies.
        </p>
      ) : null}
    </div>
  );
}
