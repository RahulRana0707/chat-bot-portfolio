import { ACHIEVEMENTS_CONTENT } from "@/content/achievements";
import { EDUCATION_CONTENT } from "@/content/education";
import { EXPERIENCES_CONTENT } from "@/content/experience";
import { PROFILE } from "@/content/profile";
import { PROJECTS_CONTENT } from "@/content/projects";
import { SKILLS_CONTENT } from "@/content/skills";
import { SOCIALS_CONTENT } from "@/content/socials";

/** Serialize portfolio content into prompt context for the AI assistant. */
export function buildKnowledgeContext(): string {
  const socialLines = SOCIALS_CONTENT.map(
    (social) => `**${social.name}**: ${social.link}`,
  ).join("\n");

  const skillLines = SKILLS_CONTENT.map(
    (group) =>
      `- ${group.name}: ${group.skills.map((skill) => skill).join(", ")}`,
  ).join("\n");

  const experienceLines = EXPERIENCES_CONTENT.map((experience) => {
    const bullets = experience.responsibilities
      .map((point) => `  - ${point}`)
      .join("\n");
    return `- *${experience.role}, ${experience.name}* (${experience.duration})\n${bullets}`;
  }).join("\n\n");

  const projectLines = PROJECTS_CONTENT.map((project) => {
    const details = [
      project.repoUrl ? `GitHub: ${project.repoUrl}` : null,
      project.liveUrl ? `Live: ${project.liveUrl}` : null,
      `Tech: ${project.technologies.join(", ")}`,
      `Features: ${project.description.join(" ")}`,
    ]
      .filter(Boolean)
      .map((line) => `  - ${line}`)
      .join("\n");
    return `- *${project.title}*\n${details}`;
  }).join("\n\n");

  const achievementLines = ACHIEVEMENTS_CONTENT.map(
    (achievement) =>
      `- ${achievement.title}: ${achievement.description} ${achievement.impact}`,
  ).join("\n");

  const educationLines = EDUCATION_CONTENT.map(
    (education) =>
      `- *${education.degree}, ${education.institution}* (${education.duration}), CGPA: ${education.cgpa}`,
  ).join("\n");

  return `(Use this information for context — do not copy directly. Always paraphrase naturally.)

**Location**: ${PROFILE.location}
**Email**: ${PROFILE.email}
**Phone**: ${PROFILE.phone}
${socialLines}

**About**
${PROFILE.about}

**Technical Skills**
${skillLines}

**Experience**
${experienceLines}

**Projects**
${projectLines}

**Achievements**
${achievementLines}

**Education**
${educationLines}`;
}