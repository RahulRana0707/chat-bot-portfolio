import { Skill } from "@/components/all-skills";

export const PROJECTS_CONTENT = [
  {
    title: "Crypto Castle",
    repoUrl: "https://github.com/RahulRana0707/Crypto-Project",
    liveUrl: "https://crypto-castle.vercel.app/",
    description: [
      "Developed a cryptocurrency tracking platform with an intuitive UI for viewing crypto prices and exchange listings.",
      "Implemented dynamic pagination to efficiently handle 100+ data entries per page, improving usability and performance.",
      "Integrated search functionality, enabling quick lookup of cryptocurrencies for enhanced user experience.",
      "Deployed the platform on Vercel with a CI/CD pipeline, ensuring seamless updates and accessibility.",
    ],
    technologies: [Skill.REACT, Skill.SASS, Skill.REST],
  },
];
