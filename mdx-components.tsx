import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import type { ComponentProps } from "react";
import { Children } from "react";
import { CodeBlock } from "@/components/ui/code-block";

/** Slugify heading text to match getHeadingsFromContent (GitHub-style). Used for TOC links and scroll-spy. */
function slugifyHeading(children: React.ReactNode): string {
  const text = Children.toArray(children)
    .flatMap((c) => (typeof c === "string" ? c : []))
    .join("")
    .trim();
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Define components to be used in MDX files (exported for next-mdx-remote compileMDX)
export const mdxComponents: MDXComponents = {
    h1: (props: ComponentProps<"h1">) => (
        <h1
            {...props}
            className="text-3xl md:text-4xl font-extrabold tracking-tight mt-10 mb-5 text-foreground"
        />
    ),
    h2: (props: ComponentProps<"h2">) => {
        const id = slugifyHeading(props.children);
        return (
            <h2
                {...props}
                id={id || undefined}
                className="text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4 text-foreground scroll-mt-24"
            />
        );
    },
    h3: (props: ComponentProps<"h3">) => {
        const id = slugifyHeading(props.children);
        return (
            <h3
                {...props}
                id={id || undefined}
                className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-3 text-foreground scroll-mt-24"
            />
        );
    },
    p: (props: ComponentProps<"p">) => (
        <p
            {...props}
            className="text-base md:text-lg leading-8 [&:not(:first-child)]:mt-5 text-foreground/90"
        />
    ),
    ul: (props: ComponentProps<"ul">) => (
        <ul
            {...props}
            className="my-5 ml-6 list-disc [&>li]:mt-2 text-base md:text-lg text-foreground/90 space-y-1"
        />
    ),
    ol: (props: ComponentProps<"ol">) => (
        <ol
            {...props}
            className="my-5 ml-6 list-decimal [&>li]:mt-2 text-base md:text-lg text-foreground/90 space-y-1"
        />
    ),
    li: (props: ComponentProps<"li">) => <li {...props} className="leading-8" />,
    blockquote: (props: ComponentProps<"blockquote">) => (
        <blockquote
            {...props}
            className="mt-6 mb-6 border-l-4 border-primary/40 pl-6 py-1 text-lg italic text-muted-foreground"
        />
    ),
    code: (props: ComponentProps<"code">) => {
        return (
            <code
                {...props}
                className="relative rounded bg-muted px-[0.35rem] py-[0.2rem] font-mono text-[0.9em] font-semibold text-primary"
            />
        );
    },
    // Custom components available in MDX files
    CodeBlock: CodeBlock,
    Image: (props: ImageProps) => (
        <Image
            {...props}
            alt={props.alt ?? ""}
            className="rounded-lg border border-border my-6 shadow-sm"
        />
    ),
};

export function useMDXComponents(overrides: MDXComponents): MDXComponents {
    return {
        ...overrides,
        ...mdxComponents,
    };
}
