import type { MessagePayloadType } from "@/types/message";

type Part =
  | { type: "text"; content: string }
  | {
      type: "json";
      content: {
        type: MessagePayloadType;
      };
    };

export function parseMessage(message: string): Part[] {
  const regex = /<\|BEGIN_JSON\|>([\s\S]*?)<\|END_JSON\|>/g;
  let match = regex.exec(message);
  let lastIndex = 0;
  const parts: Part[] = [];

  while (match !== null) {
    // Add text before JSON
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: message.slice(lastIndex, match.index).trim(),
      });
    }

    // Add parsed JSON
    try {
      const parsed = JSON.parse(match[1].trim());
      parts.push({ type: "json", content: parsed });
    } catch (e) {
      console.error("Invalid JSON block:", e);
    }

    lastIndex = regex.lastIndex;
    match = regex.exec(message);
  }

  // Add remaining text after last JSON
  if (lastIndex < message.length) {
    parts.push({
      type: "text",
      content: message.slice(lastIndex).trim(),
    });
  }

  return parts;
}
