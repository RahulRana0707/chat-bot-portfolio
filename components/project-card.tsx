import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { SkillMapper, type Skill } from "@/components/all-skills";

const PLACEHOLDER_IMAGE = "/file.svg";
const MAX_VISIBLE_TECHS = 3;

export type ProjectCardItem = {
  title: string;
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
  description?: string[];
  technologies?: Skill[];
};

export function ProjectCard({ project }: { project: ProjectCardItem }) {
  const imageSrc = project.image ?? PLACEHOLDER_IMAGE;
  const description = project.description?.[0] ?? "";
  const techs = project.technologies ?? [];
  const visibleTechs = techs.slice(0, MAX_VISIBLE_TECHS);
  const remaining = techs.length - visibleTechs.length;

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          unoptimized={imageSrc.endsWith(".svg")}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
          {project.title}
        </h3>
        {description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        ) : null}
        {techs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {visibleTechs.map((skill) => {
              const data = SkillMapper[skill];
              return (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium"
                >
                  {data?.icon ?? null}
                  <span>{data?.name ?? skill}</span>
                </span>
              );
            })}
            {remaining > 0 ? (
              <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                +{remaining} more
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="flex items-center gap-3 pt-1 text-sm">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
            >
              <ExternalLink className="size-4 shrink-0" />
              Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
            >
              <Github className="size-4 shrink-0" />
              Repo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Loading skeleton matching ProjectCard layout. */
export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-video w-full bg-muted/50 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-4/5 rounded bg-muted animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded bg-muted/80 animate-pulse" />
          <div className="h-3.5 w-2/3 rounded bg-muted/80 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-muted/80 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-muted/80 animate-pulse" />
          <div className="h-6 w-14 rounded-full bg-muted/80 animate-pulse" />
        </div>
        <div className="flex gap-3 pt-1">
          <div className="h-4 w-16 rounded bg-muted/80 animate-pulse" />
          <div className="h-4 w-12 rounded bg-muted/80 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
