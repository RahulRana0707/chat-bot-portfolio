"use client";

import { useCallback, useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";

import {
  PromptInput,
  PromptInputActionMenu,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { ChatWelcome } from "./chat-welcome";
import { ThemeToggler } from "../theme-toggler";

export const ChatAppView = () => {
  const { messages, sendMessage } = useChat({});

  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const doesChatHasMessages = messages.length > 0;

  const onPromptSelectHandler = useCallback((prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  console.log("Chat Messages:", messages);

  return (
    <div className="w-full h-full flex flex-col justify-start overflow-hidden">
      <div className="flex-1 hidden-scrollbar flex flex-col-reverse">
        {!doesChatHasMessages ? (
          <ChatWelcome onPromptSelect={onPromptSelectHandler} />
        ) : (
          <div className="flex flex-col justify-end space-y-2">
            {messages.map((message) => (
              <Message
                key={message.id}
                from={message.role === "user" ? "user" : "assistant"}
              >
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text": // we don't use any reasoning or tool calls in this example
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
          </div>
        )}
      </div>

      <PromptInput
        onSubmit={() => {
          sendMessage({
            text: inputValue,
          });
          setInputValue("");
        }}
        className="mt-4 relative"
      >
        <PromptInputBody>
          <PromptInputTextarea
            ref={textareaRef}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            placeholder="Ask anything about me......"
          />
        </PromptInputBody>
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputActionMenu>
              <ThemeToggler />
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit disabled={!inputValue} status={"ready"} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};
