import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { google } from "@ai-sdk/google";
import { AI_CHAT_BOT_SYSTEM_PROMPT } from "@/prompt/system-prompt";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToModelMessages(messages),
    system: AI_CHAT_BOT_SYSTEM_PROMPT,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
