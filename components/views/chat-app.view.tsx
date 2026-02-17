"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionMenu,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { MessagePartsRenderer } from "@/components/messages-parts";
import { parseMessage } from "@/lib/parse-message";
import { ThemeToggler } from "../theme-toggler";
import { ChatWelcome } from "./chat-welcome";

export const ChatAppView = () => {
  const { messages, sendMessage, error } = useChat();

  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const doesChatHasMessages = messages.length > 0;

  const onPromptSelectHandler = useCallback((prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error("Something didn’t work as expected", {
      description:
        "The issue has been logged. You can also report it with one click.",
      action: {
        label: "Report",
        onClick: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success("Issue Reported", {
            description: "Thanks for helping us improve the experience!",
          });
        },
      },
    });
  }, [error]);

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
                    if (part.type === "text") {
                      const parsedText = parseMessage(part.text);
                      return (
                        <div key={`${message.id}-${i}`} className="space-y-2">
                          {parsedText.map((parsedPart, i) => {
                            if (parsedPart.type === "text") {
                              if (parsedPart.content.trim() === "") return null;
                              return (
                                <Response key={`${message.id}-${i}`}>
                                  {parsedPart.content}
                                </Response>
                              );
                            } else if (parsedPart.type === "json") {
                              return (
                                <MessagePartsRenderer
                                  key={`${message.id}-${i}`}
                                  type={parsedPart?.content?.type}
                                  payload={{
                                    generatedText: part.text,
                                  }}
                                />
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      );
                    }
                    return null;
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
