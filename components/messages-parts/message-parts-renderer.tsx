import type { MessagePayloadType } from "@/types/message";

import {
  RenderSkills,
  RenderProjects,
  RenderExperience,
  RenderEducation,
  RenderSocials,
  RenderPersonalDetails,
  RenderResumeDownloadButton,
} from "@/components/messages-parts/messages";

export interface IMessageRendererProps {
  generatedText: string;
}

export interface IMessagePartsRenderer {
  type: MessagePayloadType;
  payload: IMessageRendererProps;
}

const MessagePartMapper: Record<
  MessagePayloadType,
  React.FC<IMessageRendererProps>
> = {
  skills: RenderSkills,
  projects: RenderProjects,
  experiences: RenderExperience,
  education: RenderEducation,
  socials: RenderSocials,
  personal_info: RenderPersonalDetails,
  resume: RenderResumeDownloadButton,
};

export const MessagePartsRenderer = ({
  type,
  payload,
}: IMessagePartsRenderer) => {
  const Component = MessagePartMapper[type];
  if (!Component) return null;
  return <Component {...payload} />;
};
