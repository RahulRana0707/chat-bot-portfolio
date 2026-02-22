"use client";

import type { ComponentType } from "react";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SOCIAL_LUCIDE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code,
  Email: Mail,
};

export function PortfolioSocialLinks({
  links,
}: {
  links: { name: string; link: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {links.map((s) => {
        const Icon = SOCIAL_LUCIDE_ICONS[s.name];
        return (
          <Tooltip key={s.name}>
            <TooltipTrigger asChild>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center"
                aria-label={s.name}
              >
                {Icon ? (
                  <Icon className="size-5" />
                ) : (
                  <Mail className="size-5" />
                )}
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6}>
              <p>{s.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
