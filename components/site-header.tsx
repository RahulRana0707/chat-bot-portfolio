"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "@/components/theme-toggler";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center px-4 pt-4 sm:px-6 sm:pt-6">
      <div
        className={cn(
          "flex h-14 w-full max-w-[52rem] items-center justify-between gap-4 rounded-full border border-border/60 px-4 shadow-lg",
          "bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="Home"
        >
          <Image
            src="/rahul-bot-logo.png"
            alt="Rahul Rana"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover object-top"
          />
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-foreground bg-muted/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
