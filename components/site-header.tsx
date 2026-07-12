"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { usePortfolioChat } from "@/components/portfolio-chat-provider";
import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/theme-toggler";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
] as const;

/** Past this scroll Y (px), morph into full-width sticky bar. */
const STICK_THRESHOLD = 24;

export function SiteHeader() {
  const pathname = usePathname();
  const { openChat } = usePortfolioChat();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > STICK_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        // Outer shell: floating inset → flush full-width
        "transition-[padding,background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        stuck
          ? "border-b border-border/60 bg-background/70 px-0 pt-0 shadow-sm shadow-black/5 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/55 dark:shadow-black/20"
          : "border-b border-transparent bg-transparent px-4 pt-4 sm:pt-6",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 w-full items-center justify-between gap-3",
          "transition-[max-width,border-radius,border-color,background-color,box-shadow,padding,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          stuck
            ? "max-w-3xl rounded-none border border-transparent bg-transparent px-4 shadow-none backdrop-blur-none"
            : [
                "max-w-3xl rounded-full border border-border/60 px-3 shadow-lg sm:px-4",
                "bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50",
              ],
        )}
      >
        <nav
          className="flex min-w-0 flex-1 items-center gap-0.5 sm:gap-1"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4",
                  isActive
                    ? "bg-muted/80 text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            onClick={openChat}
            className="h-auto rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground sm:px-4"
          >
            Chat
          </Button>
        </nav>

        <div className="flex shrink-0 items-center">
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
