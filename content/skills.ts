import { Skill } from "@/components/all-skills";

export const SKILLS_CONTENT = [
  {
    name: "Frontend",
    skills: [
      Skill.JAVASCRIPT,
      Skill.TYPESCRIPT,
      Skill.REACT,
      Skill.NEXTJS,
      Skill.TAILWIND,
      Skill.BOOTSTRAP,
      Skill.SASS,
      Skill.REDUX,
      Skill.HTML,
      Skill.CSS,
      Skill.WEBPACK,
    ],
  },
  {
    name: "Backend",
    skills: [
      Skill.POSTGRESQL,
      Skill.MONGODB,
      Skill.EXPRESS,
      Skill.PRISMA,
      Skill.NODEJS,
      Skill.REST,
      Skill.JWT,
      Skill.SYSTEMS_DESIGN,
      Skill.OOP,
    ],
  },
  {
    name: "DevOps",
    skills: [Skill.DOCKER, Skill.GIT, Skill.GITHUB_ACTIONS],
  },
  {
    name: "Testing",
    skills: [Skill.JEST, Skill.PLAYWRIGHT],
  },
  {
    name: "AI",
    skills: [Skill.OPENAI, Skill.LANGCHAIN, Skill.WORKFLOW_AUTOMATION],
  },
];
