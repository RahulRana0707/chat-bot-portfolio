import { Skill } from "@/components/all-skills";

export const SKILLS_CONTENT = [
  {
    name: "Frontend",
    skills: [
      Skill.REACT,
      Skill.NEXTJS,
      Skill.TYPESCRIPT,
      Skill.JAVASCRIPT,
      Skill.HTML,
      Skill.CSS,
      Skill.TAILWIND,
      Skill.REDUX,
      Skill.BOOTSTRAP,
      Skill.SASS,
    ],
  },
  {
    name: "Backend",
    skills: [
      Skill.NODEJS,
      Skill.EXPRESS,
      Skill.REST,
      Skill.PRISMA,
      Skill.POSTGRESQL,
      Skill.MONGODB,
      Skill.JWT,
    ],
  },
  {
    name: "DevOps",
    skills: [
      Skill.GIT,
      Skill.GITHUB_ACTIONS,
      Skill.CICD,
      Skill.DOCKER,
      Skill.AWS_AMPLIFY,
      Skill.AWS_S3,
      Skill.AWS_CLOUDFRONT,
    ],
  },
  {
    name: "Testing",
    skills: [Skill.PLAYWRIGHT, Skill.JEST],
  },
  {
    name: "Tools & Other",
    skills: [
      Skill.VITE,
      Skill.WEBPACK,
      Skill.NPM,
    ],
  },
  {
    name: "AI",
    skills: [Skill.OPENAI, Skill.LANGCHAIN, Skill.WORKFLOW_AUTOMATION],
  },
];
