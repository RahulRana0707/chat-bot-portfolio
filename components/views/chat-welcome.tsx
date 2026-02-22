"use client";

import { Suggestion } from "@/components/ai-elements/suggestion";

interface ChatWelcomeProps {
  onPromptSelect: (prompt: string) => void;
}

const STARTER_PROMPTS = [
  {
    id: "connect",
    text: "How can I connect with Rahul?",
  },
  {
    id: "skills",
    text: "What skills does Rahul have?",
  },
  {
    id: "resume",
    text: "Can I see Rahul's resume?",
  },
  {
    id: "projects",
    text: "Tell me about his projects",
  },
  {
    id: "blog",
    text: "Show me Rahul's blog",
  },
] as const;

export const ChatWelcome = ({ onPromptSelect }: ChatWelcomeProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 overflow-auto px-3 py-4 text-center">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">👋 Hi, I&apos;m Rahul</h2>
        <p className="text-sm text-muted-foreground max-w-[320px]">
          I&apos;m a Full Stack Developer passionate about building interactive
          apps and AI-driven tools.
        </p>
      </div>
      <div className="flex w-full max-w-[320px] flex-col gap-2">
        <p className="text-xs text-muted-foreground">Try asking me about:</p>
        <div className="grid gap-1.5">
          {STARTER_PROMPTS.map((prompt) => (
            <Suggestion
              key={prompt.id}
              suggestion={prompt.text}
              onClick={onPromptSelect}
              className="text-xs"
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
