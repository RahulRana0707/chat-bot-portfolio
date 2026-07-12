import { Skill } from "@/components/all-skills";

export const EXPERIENCES_CONTENT = [
  {
    name: "Instinct Innovations",
    logoPath: "/compony-logo/instinct-innovations-logo.svg",
    location: "Mumbai, India",
    duration: "Oct 2023 - Present",
    role: "Associate Software Engineer",
    // Full detail — used for AI knowledge context (and chat when full detail is preferred)
    responsibilities: [
      "Contributed to the end-to-end evolution of a low-code automation and integration platform, working across product design, frontend architecture, developer tooling, and deployment, treating the platform as a long-term, production-grade system rather than isolated features.",
      "Contributed to the architecture and development of a highly configurable Form Builder system with conditional routing, dynamic data resolution, and a node-based visual workflow engine, enabling non-technical users to model complex logic without custom code.",
      "Designed and implemented a modular Connection and Integration framework that standardized how third-party services (Slack, Airtable, internal APIs) were onboarded, resulting in 100+ reusable integrations and establishing a scalable pattern for future connectors.",
      "Took ownership of frontend performance and reliability, improving LCP, TTI, and Lighthouse scores through lazy loading, code splitting, caching strategies, and render-path optimization across large, dynamic React applications.",
      "Rebuilt the Playwright automation framework using TypeScript + POM, scaling it to 500+ test cases and cutting test maintenance effort by 70%.",
      "Managed and maintained AWS Amplify deployments for multiple web applications, ensuring smooth CI/CD pipelines, environment consistency, and reliable production rollouts.",
      "Mentored junior developers in leveraging AI tools to accelerate product development, achieving a 40% increase in efficiency.",
    ],
    // Short one-liners — homepage / UI only
    homepageSummary: [
      "Built and evolved a production-grade low-code automation platform end-to-end (frontend, tooling, deployment).",
      "Architected a configurable Form Builder with conditional routing and a node-based visual workflow engine.",
      "Designed a modular integration framework powering 100+ reusable third-party connectors.",
      "Owned frontend performance — improved LCP, TTI, and Lighthouse via lazy loading, code splitting, and caching.",
      "Rebuilt Playwright (TypeScript + POM) to 500+ tests, cutting maintenance effort by 70%.",
      "Managed AWS Amplify CI/CD for multiple web apps with reliable production rollouts.",
      "Mentored juniors on AI-assisted development, boosting team efficiency by ~40%.",
    ],
    skills: [
      Skill.REACT,
      Skill.JAVASCRIPT,
      Skill.TYPESCRIPT,
      Skill.CSS,
      Skill.DOCKER,
      Skill.GITHUB_ACTIONS,
      Skill.PLAYWRIGHT,
      Skill.GIT,
      Skill.NEXTJS,
      Skill.REDUX,
      Skill.AWS_AMPLIFY,
      Skill.CICD,
      Skill.WORKFLOW_AUTOMATION,
    ],
  },
  {
    name: "Sensys Technologies Pvt. Ltd",
    logoPath: "/compony-logo/sensys-technologies-logo.jpeg",
    location: "Mumbai, India",
    duration: "Mar 2023 - Oct 2023",
    role: "Programmer (Frontend)",
    responsibilities: [
      "Developed responsive user interfaces in React from Figma/UX designs, ensuring pixel-perfect, performant, and user-friendly implementations. Consistently delivered projects on time.",
      "Collaborated with the team to resolve frontend performance bottlenecks, improving platform load time by 40%. Directly contributed to a faster and more seamless user experience.",
    ],
    skills: [
      Skill.REACT,
      Skill.JAVASCRIPT,
      Skill.TYPESCRIPT,
      Skill.MONGODB,
      Skill.NODEJS,
      Skill.TAILWIND,
    ],
    homepageSummary: [
      "Shipped pixel-perfect React UIs from Figma/UX designs; delivered on time.",
      "Resolved frontend performance bottlenecks, improving platform load time by 40%.",
    ],
  },
];
