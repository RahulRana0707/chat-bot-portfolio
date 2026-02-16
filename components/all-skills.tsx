import type { ReactNode } from "react";
import {
  FaCode,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  SiBootstrap,
  SiExpress,
  SiGithubactions,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";
import { PlaywrightIcon } from "@/assets/icons/playwright-icon";

/** Step 1: Define your enum */
export enum Skill {
  JAVASCRIPT = "JavaScript",
  TYPESCRIPT = "TypeScript",
  POSTGRESQL = "PostgreSQL",
  MONGODB = "MongoDB",
  REACT = "React.js",
  NEXTJS = "Next.js",
  PLAYWRIGHT = "Playwright",
  EXPRESS = "Express.js",
  PRISMA = "Prisma",
  TAILWIND = "Tailwind CSS",
  BOOTSTRAP = "Bootstrap",
  SASS = "SASS",
  NODEJS = "Node.js",
  GIT = "Git",
  DOCKER = "Docker",
  REST = "RESTful APIs",
  WEBPACK = "Webpack",
  GITHUB_ACTIONS = "GitHub Actions",
  LANGCHAIN = "LangChain",
  JWT = "JWT & OAuth",
  SYSTEMS_DESIGN = "Systems Design",
  OOP = "OOP",
  OPENAI = "OpenAI API",
  HTML = "HTML",
  CSS = "CSS",
  REDUX = "Redux",
  WORKFLOW_AUTOMATION = "Workflow Automation",
  JEST = "Jest",
}

/** Step 2: Define the structure */
export type SkillData = {
  name: string;
  icon: ReactNode;
};

/** Step 3: Create a mapper */
export const SkillMapper: Record<Skill, SkillData> = {
  [Skill.JAVASCRIPT]: {
    name: Skill.JAVASCRIPT,
    icon: <SiJavascript className="text-yellow-400" />,
  },
  [Skill.TYPESCRIPT]: {
    name: Skill.TYPESCRIPT,
    icon: <SiTypescript className="text-blue-600" />,
  },
  [Skill.POSTGRESQL]: {
    name: Skill.POSTGRESQL,
    icon: <SiPostgresql className="text-blue-700" />,
  },
  [Skill.MONGODB]: {
    name: Skill.MONGODB,
    icon: <SiMongodb className="text-green-600" />,
  },
  [Skill.REACT]: {
    name: Skill.REACT,
    icon: <SiReact className="text-sky-500" />,
  },
  [Skill.NEXTJS]: {
    name: Skill.NEXTJS,
    icon: <SiNextdotjs className="text-black dark:text-white" />,
  },
  [Skill.REDUX]: {
    name: Skill.REDUX,
    icon: <SiRedux style={{ color: "#ba8fff" }} />,
  },
  [Skill.PLAYWRIGHT]: {
    name: Skill.PLAYWRIGHT,
    icon: <PlaywrightIcon height={24} width={24} />,
  },
  [Skill.JEST]: {
    name: Skill.JEST,
    icon: <SiJest className="text-red-400" />,
  },
  [Skill.EXPRESS]: {
    name: Skill.EXPRESS,
    icon: <SiExpress className="text-gray-700" />,
  },
  [Skill.PRISMA]: {
    name: Skill.PRISMA,
    icon: <SiPrisma className="text-indigo-600" />,
  },
  [Skill.TAILWIND]: {
    name: Skill.TAILWIND,
    icon: <SiTailwindcss className="text-cyan-400" />,
  },
  [Skill.BOOTSTRAP]: {
    name: Skill.BOOTSTRAP,
    icon: <SiBootstrap className="text-purple-700" />,
  },
  [Skill.SASS]: {
    name: Skill.SASS,
    icon: <SiSass className="text-pink-400" />,
  },
  [Skill.NODEJS]: {
    name: Skill.NODEJS,
    icon: <SiNodedotjs className="text-green-700" />,
  },
  [Skill.GIT]: {
    name: Skill.GIT,
    icon: <FaGitAlt className="text-orange-600" />,
  },
  [Skill.DOCKER]: {
    name: Skill.DOCKER,
    icon: <FaDocker className="text-blue-400" />,
  },
  [Skill.REST]: {
    name: Skill.REST,
    icon: <SiPostman className="text-orange-500" />,
  },
  [Skill.WEBPACK]: {
    name: Skill.WEBPACK,
    icon: <SiWebpack className="text-blue-400" />,
  },
  [Skill.GITHUB_ACTIONS]: {
    name: Skill.GITHUB_ACTIONS,
    icon: <SiGithubactions className="text-gray-700" />,
  },
  [Skill.JWT]: {
    name: Skill.JWT,
    icon: <SiJsonwebtokens className="text-yellow-600" />,
  },
  [Skill.LANGCHAIN]: {
    name: Skill.LANGCHAIN,
    icon: <SiLangchain className="text-emerald-600" />,
  },
  [Skill.SYSTEMS_DESIGN]: {
    name: Skill.SYSTEMS_DESIGN,
    icon: <FaProjectDiagram className="text-purple-600" />,
  },
  [Skill.OOP]: { name: Skill.OOP, icon: <FaCode className="text-gray-700" /> },

  [Skill.OPENAI]: {
    name: Skill.OPENAI,
    icon: <SiOpenai className="text-gray-700" />,
  },
  [Skill.HTML]: {
    name: Skill.HTML,
    icon: <FaHtml5 className="text-orange-500" />,
  },
  [Skill.CSS]: {
    name: Skill.CSS,
    icon: <FaCss3Alt className="text-blue-500" />,
  },
  [Skill.WORKFLOW_AUTOMATION]: {
    name: Skill.WORKFLOW_AUTOMATION,
    icon: <></>,
  },
};

/** Step 4: Export an array if needed */
export const ALL_SKILLS: SkillData[] = Object.values(SkillMapper);
