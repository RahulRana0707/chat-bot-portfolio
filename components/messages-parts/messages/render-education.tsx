import { GraduationCap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export const RenderEducation = () => {
  return (
    <div className="w-full h-max flex flex-col gap-2">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <div className="flex items-center gap-2 text-sm">
          <GraduationCap size={16} />
          <Label className="text-sm">University of Mumbai</Label>
        </div>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex gap-2">
            Bachelor of Science in Information Technology
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1 text-balance">
            <p>
              Developed a solid foundation in modern programming practices,
              system architecture, and problem-solving.
            </p>
            <p>
              Studied Software Engineering and Database Systems with a strong
              emphasis on building secure applications and robust data
              management.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
