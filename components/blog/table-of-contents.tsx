"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { BlogTocEntry } from "@/lib/mdx";

interface TableOfContentsProps {
  entries: BlogTocEntry[];
  className?: string;
}

function getHashId() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return hash || null;
}

export function TableOfContents({ entries, className }: TableOfContentsProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  const updateHash = useCallback((id: string) => {
    const url = `${pathname}#${id}`;
    window.history.replaceState(null, "", url);
    setActiveId(id);
  }, [pathname]);

  useEffect(() => {
    setActiveId(getHashId());
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => setActiveId(getHashId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );
        if (visible[0]) {
          const id = visible[0].target.id;
          setActiveId(id);
          window.history.replaceState(null, "", `${pathname}#${id}`);
        }
      },
      {
        rootMargin: "-80px 0% -70% 0%",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries, pathname]);

  if (entries.length === 0) return null;

  return (
    <aside
      className={cn(
        "hidden w-52 shrink-0 self-start text-sm lg:block",
        "sticky top-24 max-h-[calc(100vh-6rem)] overflow-visible",
        className,
      )}
      aria-label="On this page"
    >
      <p className="mb-3 font-semibold text-foreground">On this page</p>
      <nav className="space-y-1">
        {entries.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              "block rounded-md py-1 pr-2 transition-colors hover:text-primary",
              level === 3 && "pl-3",
              activeId === id
                ? "font-medium text-primary"
                : "text-muted-foreground",
            )}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                updateHash(id);
              }
            }}
          >
            {text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
