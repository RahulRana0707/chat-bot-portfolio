import { PROJECTS_CONTENT } from "@/content/projects";
import { ProjectListWithFilters } from "@/components/project-list-with-filters";

export const metadata = {
  title: "Projects | Rahul Rana",
  description: "Projects and demos by Rahul Rana.",
};

export default function ProjectsPage() {
  const projects = PROJECTS_CONTENT.map((p) => ({
    title: p.title,
    image: "image" in p ? p.image : undefined,
    repoUrl: "repoUrl" in p ? p.repoUrl : undefined,
    liveUrl: "liveUrl" in p ? p.liveUrl : undefined,
    description: p.description,
    technologies: p.technologies,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
      <p className="text-muted-foreground mb-6">
        Apps and demos I’ve built.
      </p>
      <ProjectListWithFilters projects={projects} />
    </div>
  );
}
