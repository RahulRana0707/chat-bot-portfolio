"use client";

import { usePersistedChat } from "@/hooks/use-persisted-chat";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Message, MessageAvatar, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";
import { MessagePartsRenderer } from "@/components/messages-parts";
import { parseMessage } from "@/lib/parse-message";
import { ChatWelcome } from "./chat-welcome";

export const ChatAppView = () => {
  const { messages, sendMessage, error } = usePersistedChat();

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
                <MessageAvatar
                  src={message.role === "assistant" ? "/rahul-bot-logo.png" : ""}
                  name={message.role === "user" ? "You" : "Rahul"}
                />
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
        className="mt-3 flex flex-row items-center gap-3 divide-y-0 rounded-lg border bg-background p-3 shadow-sm"
      >
        <PromptInputBody className="min-w-0 flex-1 self-center">
          <PromptInputTextarea
            ref={textareaRef}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            placeholder="Ask anything about me......"
            className="min-h-10 max-h-32 resize-none"
          />
        </PromptInputBody>
        <PromptInputSubmit disabled={!inputValue} status={"ready"} className="shrink-0 self-center" />
      </PromptInput>
    </div>
  );
};
