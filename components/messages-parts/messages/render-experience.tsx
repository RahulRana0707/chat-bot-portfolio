import { Code } from "lucide-react";
import { Fragment } from "react";
import { SkillsRenderer } from "@/components/skills-renderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { EXPERIENCES_CONTENT } from "@/content/experience";

export const RenderExperience = () => {
  return (
    <div className="w-full h-max flex flex-col gap-2">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {EXPERIENCES_CONTENT.map((experience, index) => {
          return (
            <div key={experience.name} className="flex flex-col mt-2">
              <div className="flex items-center gap-2 text-sm">
                <Label className="text-sm">{experience.name}</Label>
              </div>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="flex gap-2">
                  <div className="flex gap-4 items-center justify-start">
                    <Code />
                    <div className="flex flex-col gap-2">
                      <Label>{experience.role}</Label>
                      <Label className="text-muted-foreground">
                        {experience.location} | {experience.duration}
                      </Label>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 text-balance">
                  {experience.responsibilities.map((point, idx) => (
                    <Fragment key={`${experience.name}-point-${idx}`}>
                      <p>
                        {idx + 1}. {point}
                      </p>
                    </Fragment>
                  ))}
                  <SkillsRenderer skills={experience.skills} />
                </AccordionContent>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};
