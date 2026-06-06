import { SiGithub, SiGmail, SiLeetcode, SiLinkedin } from "react-icons/si";
import { PROFILE } from "@/content/profile";

export const SOCIALS_CONTENT = [
  {
    name: "GitHub",
    link: "https://github.com/RahulRana0707",
    icon: SiGithub,
    iconClassName: "text-gray-800 dark:text-white",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/rahul-rana-663877241/",
    icon: SiLinkedin,
    iconClassName: "text-blue-600",
  },
  {
    name: "LeetCode",
    link: "https://leetcode.com/Rahul_Rana07/",
    icon: SiLeetcode,
    iconClassName: "text-yellow-600",
  },
  {
    name: "Email",
    link: `mailto:${PROFILE.email}`,
    icon: SiGmail,
    iconClassName: "text-red-600",
  },
];
