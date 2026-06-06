"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioChat } from "@/components/portfolio-chat-provider";
import { cn } from "@/lib/utils";

type PortfolioChatOpenButtonProps = {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
};

export function PortfolioChatOpenButton({
  variant = "default",
  size = "default",
  className,
  children,
  showIcon = true,
}: PortfolioChatOpenButtonProps) {
  const { openChat } = usePortfolioChat();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      onClick={openChat}
    >
      {showIcon ? <MessageCircle className="size-4" /> : null}
      {children ?? "Chat with me"}
    </Button>
  );
}