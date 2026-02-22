"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SkillMapper, type Skill } from "@/components/all-skills";
import { PortfolioExperienceLogo } from "@/components/portfolio-experience-logo";

export type ExperienceEntry = {
  name: string;
  logoPath: string;
  location: string;
  duration: string;
  role: string;
  responsibilities: string[];
  skills: Skill[];
};

function isCurrent(exp: ExperienceEntry) {
  return exp.duration.includes("Present");
}

/** Match Skills section chip styling: rounded-full, px-3 py-1, text-sm */
function TechnologiesChips({ skills }: { skills: Skill[] }) {
  if (!skills?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const data = SkillMapper[skill];
        return (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
          >
            {data?.icon ?? null}
            <span>{data?.name ?? skill}</span>
          </span>
        );
      })}
    </div>
  );
}

function WorkingChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-working-dot"
        aria-hidden
      />
      Working
    </span>
  );
}

export function PortfolioExperienceSection({
  experiences,
  summaries,
}: {
  experiences: ExperienceEntry[];
  summaries?: Record<string, string[]>;
}) {
  const currentIndex = experiences.findIndex(isCurrent);
  const current =
    currentIndex >= 0 ? experiences[currentIndex] : null;
  const past = experiences.filter((_, i) => i !== currentIndex);

  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <section>
      <div className="mb-2 text-sm font-medium text-muted-foreground">
        Featured
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-4">
        Experience
      </h2>

      {/* Featured (current) experience: hidden company name, Working chip, techs, bullets. No links. */}
      {current && (
        <div className="mb-10 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <PortfolioExperienceLogo
                logoPath={current.logoPath}
                width={48}
                height={48}
              />
              {/* Company name hidden for current role */}
              <span className="font-medium text-muted-foreground select-none blur-sm">
                {current.name}
              </span>
              <span className="text-muted-foreground">—</span>
              <span className="font-medium">{current.role}</span>
              <WorkingChip />
            </div>
            <div className="text-sm text-muted-foreground text-left sm:text-right">
              <span>{current.duration}</span>
              <span className="mx-1.5">·</span>
              <span>{current.location}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Technologies &amp; Tools
            </p>
            <TechnologiesChips skills={current.skills} />
          </div>

          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85 leading-relaxed">
            {current.responsibilities.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Past experiences: same header layout as featured, accordion icon only, no card. */}
      <ul className="space-y-10">
        {past.map((exp) => {
          const open = expanded.has(exp.name);
          const summaryBullets =
            summaries?.[exp.name] ?? exp.responsibilities.slice(0, 2);

          return (
            <li key={exp.name}>
              <button
                type="button"
                onClick={() => toggle(exp.name)}
                className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-y-2 text-left hover:opacity-90 transition-opacity"
                aria-expanded={open}
              >
                <div className="flex items-center gap-3 flex-wrap min-w-0">
                  <PortfolioExperienceLogo
                    logoPath={exp.logoPath}
                    width={48}
                    height={48}
                  />
                  <span className="font-medium">{exp.name}</span>
                  <span className="text-muted-foreground">—</span>
                  <span className="font-medium">{exp.role}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {exp.duration}
                    <span className="mx-1.5">·</span>
                    {exp.location}
                  </span>
                  <span className="shrink-0 text-muted-foreground" aria-hidden>
                    {open ? (
                      <ChevronUp className="size-5" />
                    ) : (
                      <ChevronDown className="size-5" />
                    )}
                  </span>
                </div>
              </button>

              {/* Smooth accordion: grid transition on height */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="mt-6 space-y-6 pl-0">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Technologies &amp; Tools
                      </p>
                      <TechnologiesChips skills={exp.skills} />
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85 leading-relaxed">
                      {summaryBullets.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
