import { PROFILE } from "@/content/profile";

export const PERSONAL_DETAILS_CONTENT = [
  { name: "Email", value: PROFILE.email },
  { name: "Phone", value: PROFILE.phone },
  { name: "Location", value: PROFILE.location },
] as const;