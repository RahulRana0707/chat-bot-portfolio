import { motion } from "framer-motion";
import { type Skill, SkillMapper } from "@/components/all-skills";
import { Badge } from "@/components/ui/badge";

interface ISkillsRendererProps {
  skills: Skill[];
}

export const SkillsRenderer = ({ skills }: ISkillsRendererProps) => {
  return (
    <div className="w-full h-max flex flex-wrap gap-1.5">
      {skills.map((skillName, index) => {
        const skill = SkillMapper[skillName];
        return (
          <motion.div
            key={`${skill.name}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
          >
            <Badge
              variant="outline"
              className="rounded-sm px-2 py-1 text-foreground flex items-center"
            >
              {skill.icon}
              {skill.name}
            </Badge>
          </motion.div>
        );
      })}
    </div>
  );
};
