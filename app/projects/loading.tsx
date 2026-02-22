import { ProjectCardSkeleton } from "@/components/project-card";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="h-9 w-32 rounded bg-muted/80 animate-pulse mb-2" />
      <div className="h-5 w-64 rounded bg-muted/60 animate-pulse mb-6" />
      <div className="space-y-4 mb-6">
        <div className="h-10 w-full rounded-md bg-muted/50 animate-pulse" />
        <div className="flex flex-wrap gap-2">
          <div className="h-8 w-12 rounded-full bg-muted/50 animate-pulse" />
          <div className="h-8 w-24 rounded-md bg-muted/50 animate-pulse" />
        </div>
      </div>
      <div className="h-4 w-24 rounded bg-muted/50 animate-pulse mb-4" />
      <ul className="grid gap-6 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <li key={i}>
            <ProjectCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
