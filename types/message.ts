export enum MessageSender {
  User = "user",
  Agent = "agent",
}

export interface IMessage {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export enum MessagePayloadType {
  Skills = "skills",
  Projects = "projects",
  Experiences = "experiences",
  Education = "education",
  Socials = "socials",
  PersonalInfo = "personal_info",
  Resume = "resume",
  Booking = "booking",
  Blog = "blog",
}
