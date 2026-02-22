"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChatAppView } from "@/components/views/chat-app.view";

const DESKTOP_POPOVER_WIDTH = 420;
const DESKTOP_POPOVER_HEIGHT = 560;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function PortfolioChatTrigger() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const triggerButton = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Open chat"
    >
      <MessageCircle className="size-7" />
    </button>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {triggerButton}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            showCloseButton={true}
            className="fixed inset-0 z-50 h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-none border-0 p-0"
          >
            <DialogTitle className="sr-only">Chat</DialogTitle>
            <div className="flex h-full min-h-0 flex-col p-3">
              <ChatAppView />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          sideOffset={12}
          className="overflow-hidden p-0"
          style={{
            width: DESKTOP_POPOVER_WIDTH,
            height: DESKTOP_POPOVER_HEIGHT,
            maxHeight: "70vh",
          }}
        >
          <div className="flex h-full min-h-0 flex-col p-3">
            <ChatAppView />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
