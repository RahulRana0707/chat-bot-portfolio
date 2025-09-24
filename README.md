"use client";


import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hey! How's it going?",
        sender: "other",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: 2,
        text: "Hi there! I'm doing great, thanks for asking. How about you?",
        sender: "user",
        timestamp: new Date(Date.now() - 240000),
      },
      {
        id: 3,
        text: "Pretty good! Just working on some projects. What have you been up to lately?",
        sender: "other",
        timestamp: new Date(Date.now() - 180000),
      },
    ]);
  }, []);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      // Auto-resize textarea back to original size
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-screen mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
        <div className="flex flex-col justify-end space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground border border-border"
                }`}
              >
                <p className="text-sm leading-relaxed text-balance">
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Rahul......"
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground text-sm leading-relaxed bg-transparent scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent [&::-webkit-scrollbar]:opacity-0 [&::-webkit-scrollbar-track]:opacity-0 [&::-webkit-scrollbar-thumb]:opacity-0"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
