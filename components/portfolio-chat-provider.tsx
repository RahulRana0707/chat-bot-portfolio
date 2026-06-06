"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PortfolioChatTrigger } from "@/components/portfolio-chat-trigger";

type PortfolioChatContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openChat: () => void;
};

const PortfolioChatContext = createContext<PortfolioChatContextValue | null>(
  null,
);

export function PortfolioChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);

  const value = useMemo(
    () => ({ open, setOpen, openChat }),
    [open, openChat],
  );

  return (
    <PortfolioChatContext.Provider value={value}>
      {children}
      <PortfolioChatTrigger />
    </PortfolioChatContext.Provider>
  );
}

export function usePortfolioChat() {
  const context = useContext(PortfolioChatContext);
  if (!context) {
    throw new Error("usePortfolioChat must be used within PortfolioChatProvider");
  }
  return context;
}