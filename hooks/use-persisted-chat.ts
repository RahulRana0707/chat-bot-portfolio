"use client";

import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-chat-messages";
const MAX_MESSAGES = 100;

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-MAX_MESSAGES) as UIMessage[];
  } catch {
    return [];
  }
}

function saveMessages(messages: UIMessage[]) {
  if (typeof window === "undefined") return;
  try {
    const toStore = messages.slice(-MAX_MESSAGES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // ignore quota / parse errors
  }
}

/**
 * useChat with localStorage persistence. Messages are loaded on mount and
 * saved whenever they change (popover close, navigate away, or new messages).
 */
export function usePersistedChat() {
  const [initialMessages] = useState<UIMessage[]>(loadMessages);
  const chat = useChat({ messages: initialMessages });

  useEffect(() => {
    saveMessages(chat.messages);
  }, [chat.messages]);

  return chat;
}
