"use client";

import React from "react";

import { SKILLS_CONTENT } from "@/content/skills";
import { Label } from "@/components/ui/label";
import { SkillsRenderer } from "@/components/skills-renderer";

export const RenderSkills = () => {
  return (
    <div className="w-full h-max flex flex-col gap-3">
      {SKILLS_CONTENT.map((section) => (
        <div key={section.name} className="flex flex-col gap-2">
          <Label>{section.name}</Label>
          <SkillsRenderer skills={section.skills} />
        </div>
      ))}
    </div>
  );
};
