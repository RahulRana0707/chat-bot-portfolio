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
