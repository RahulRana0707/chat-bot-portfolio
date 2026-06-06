"use client";

import { usePortfolioChat } from "@/components/portfolio-chat-provider";
import { Button } from "@/components/ui/button";

export function PortfolioChatIntroLink() {
  const { openChat } = usePortfolioChat();

  return (
    <Button
      type="button"
      variant="link"
      onClick={openChat}
      className="h-auto p-0 font-medium text-foreground underline underline-offset-4 decoration-muted-foreground/50 transition-colors hover:text-foreground hover:decoration-foreground"
    >
      ask my AI assistant
    </Button>
  );
}