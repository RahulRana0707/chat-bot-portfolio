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
    <div className="h-full w-full flex flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold">👋 Hi, I&apos;m Rahul</h1>
        <p className="text-lg text-muted-foreground max-w-[500px]">
          I&apos;m a Full Stack Developer passionate about building interactive
          apps and AI-driven tools.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[500px]">
        <p className="text-sm text-muted-foreground">Try asking me about:</p>
        <div className="grid gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <Suggestion
              key={prompt.id}
              suggestion={prompt.text}
              onClick={onPromptSelect}
              className="text-sm"
              size="lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
