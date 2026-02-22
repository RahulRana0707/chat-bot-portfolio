import { Skill } from "@/components/all-skills";

export const EXPERIENCES_CONTENT = [
  {
    name: "Instinct Innovations",
    logoPath: "/compony-logo/instinct-innovations-logo.svg",
    location: "Andheri, Maharashtra, India",
    duration: "Oct 2023 - Present",
    role: "Software Engineer (Frontend)",
    responsibilities: [
      "Re-architected the Playwright automation framework using Page Object Model (POM) in TypeScript, improving scalability and developer experience; reduced maintenance efforts by 70% across 500+ test cases.",
      "Engineered Tiny Forms from the ground up, a core component of the Tiny Command automation suite, utilizing React, TypeScript, and an Atomic Design System. Built a flow-based interface enabling users to create highly customized forms.",
      "Developed the Connection Module, an internal platform tool that allowed developers to rapidly integrate with 100+ third-party services. Streamlined secure API credential management, accelerating integrations and enhancing authentication flows.",
      "Optimized website performance, reducing load time by 30%, resulting in a faster and smoother user experience. Achieved this through techniques such as code-splitting, image optimization, caching strategies, and lazy loading of components.",
      "Mentored junior developers in leveraging AI tools to accelerate product development, achieving a 40% increase in efficiency.",
    ],
    skills: [
      Skill.REACT,
      Skill.JAVASCRIPT,
      Skill.TYPESCRIPT,
      Skill.BOOTSTRAP,
      Skill.CSS,
      Skill.DOCKER,
      Skill.GITHUB_ACTIONS,
      Skill.PLAYWRIGHT,
      Skill.GIT,
      Skill.JWT,
      Skill.NEXTJS,
      Skill.REDUX,
      Skill.OPENAI,
      Skill.SYSTEMS_DESIGN,
      Skill.WORKFLOW_AUTOMATION,
    ],
  },
  {
    name: "Sensys Technologies Pvt. Ltd",
    logoPath: "/compony-logo/sensys-technologies-logo.jpeg",
    location: "Goregaon, Mumbai, India",
    duration: "Mar 2023 - Oct 2023",
    role: "Programmer",
    responsibilities: [
      "Developed responsive user interfaces in React from Figma/UX designs, ensuring they were pixel-perfect, performant, and user-friendly. Consistently delivered projects on time.",
      "Collaborated with team to resolve frontend performance bottlenecks, improving platform load time by 40%. Directly contributed to a faster and more seamless user experience.",
    ],
    skills: [
      Skill.REACT,
      Skill.JAVASCRIPT,
      Skill.TYPESCRIPT,
      Skill.MONGODB,
      Skill.NODEJS,
      Skill.TAILWIND,
    ],
  },
];
