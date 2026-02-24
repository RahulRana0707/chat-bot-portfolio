"use client";

import { Check, Code, Copy } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

const LANG_DISPLAY: Record<string, string> = {
  text: "Plain text",
  plaintext: "Plain text",
  typescript: "TypeScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  bash: "Bash",
  shell: "Shell",
  sql: "SQL",
  python: "Python",
  py: "Python",
  markdown: "Markdown",
  md: "Markdown",
};

function getLangDisplayName(lang: string): string {
  const normalized = lang.toLowerCase().trim();
  return LANG_DISPLAY[normalized] ?? normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

interface CodeBlockHeaderProps {
  lang: string;
  filename?: string;
  code: string;
  className?: string;
}

export function CodeBlockHeader({ lang, filename, code, className }: CodeBlockHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    } catch {
      setCopied(false);
    }
  }, [code]);

  const displayLang = getLangDisplayName(lang);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs font-mono text-muted-foreground",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Code className="size-3.5 shrink-0" aria-hidden />
        <span className="truncate">{displayLang}</span>
        {filename ? (
          <span className="truncate text-muted-foreground/80" title={filename}>
            {filename}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Check className="size-3.5 text-primary" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
