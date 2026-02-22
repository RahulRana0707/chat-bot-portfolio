import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Children } from "react";
import { CodeBlock } from "@/components/ui/code-block";

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
    <p {...props} className="text-foreground/90 mb-4 leading-[1.7]" />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="list-disc pl-6 mb-4 space-y-1 text-foreground/90" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className="list-decimal pl-6 mb-4 space-y-1 text-foreground/90" />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} className="leading-[1.7]" />,
  a: (props: ComponentProps<"a">) => (
    <a
      {...props}
      className="text-primary underline underline-offset-2 hover:no-underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
  Image: (props: ComponentProps<typeof Image>) => (
    <Image
      {...props}
      className="rounded-lg border border-border my-4"
      sizes="(max-width: 768px) 100vw, 800px"
    />
  ),
  CodeBlock,
};
