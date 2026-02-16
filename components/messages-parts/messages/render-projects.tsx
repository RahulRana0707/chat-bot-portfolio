import { Link } from "lucide-react";
import { Fragment } from "react";
import { SiGithub } from "react-icons/si";
import { SkillsRenderer } from "@/components/skills-renderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PROJECTS_CONTENT } from "@/content/projects";

export const RenderProjects = () => {
  return (
    <div className="w-full h-max flex flex-col gap-2">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {PROJECTS_CONTENT.map((project, index) => {
          return (
            <div key={project.title} className="flex flex-col mt-2">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="flex gap-2">
                  {project.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 text-balance">
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="gap-2 cursor-pointer"
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiGithub size={14} />
                        Github
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="gap-2 cursor-pointer"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link size={14} />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                  {project.description.map((point, idx) => (
                    <Fragment key={`${point}-point`}>
                      <p>
                        {idx + 1}. {point}
                      </p>
                    </Fragment>
                  ))}
                  <SkillsRenderer skills={project.technologies} />
                </AccordionContent>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};
