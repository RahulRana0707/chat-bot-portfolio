import { GraduationCap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { EDUCATION_CONTENT } from "@/content/education";

export const RenderEducation = () => {
  return (
    <div className="w-full h-max flex flex-col gap-2">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {EDUCATION_CONTENT.map((education, index) => (
          <div key={education.institution} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap size={16} />
              <Label className="text-sm">{education.institution}</Label>
            </div>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="flex gap-2">
                {education.degree}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 text-balance">
                <p className="text-sm text-muted-foreground">
                  {education.duration} · CGPA: {education.cgpa}
                </p>
                {education.highlights.map((highlight) => (
                  <p key={highlight}>{highlight}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};