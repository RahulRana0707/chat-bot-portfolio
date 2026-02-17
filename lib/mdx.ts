import fs from "node:fs";
import path from "node:path";
import type { MDXComponents } from "mdx/types";
import GitHubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";

const BLOG_CONTENT_PATH = path.join(process.cwd(), "content/blog");

export type BlogTocEntry = {
  level: 2 | 3;
  text: string;
  id: string;
};

/** Extract h2/h3 headings from raw MDX content for table of contents. Uses same slug algorithm as rehype-slug. */
export function getHeadingsFromContent(content: string): BlogTocEntry[] {
  const slugger = new GitHubSlugger();
  const entries: BlogTocEntry[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\s*\{#[\w-]+\}\s*$/, "").trim();
    if (!text) continue;
    const id = slugger.slug(text);
    entries.push({ level, text, id });
  }
  return entries;
}

export type BlogPost = {
  slug: string;
  id: string;
  meta: {
    title: string;
    description: string;
    date: string;
    image?: string;
    imageAlt?: string;
    tags?: string[];
  };
  content: string;
  filename: string;
};

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const files = fs.readdirSync(BLOG_CONTENT_PATH);

  // Find the file that matches the slug (ignoring the ID prefix)
  const file = files.find(
    (f) => f.endsWith(`-${slug}.mdx`) || f === `${slug}.mdx`,
  );

  if (!file) {
    return undefined;
  }

  const filePath = path.join(BLOG_CONTENT_PATH, file);

  const source = fs.readFileSync(filePath, "utf8");

  const { frontmatter } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    image?: string;
    imageAlt?: string;
    tags?: string[];
  }>({
    source,
    options: { parseFrontmatter: true },
  });

  // Extract ID if present (assuming format: 001-slug.mdx)
  const idMatch = file.match(/^(\d+)-/);
  const id = idMatch ? idMatch[1] : "000";

  return {
    slug,
    id,
    meta: frontmatter,
    content: source,
    filename: file,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    // Extract slug by removing ID prefix and extension
    // Matches "001-slug.mdx" -> "slug"
    // Also handles "slug.mdx" -> "slug" for backward compatibility
    const slugMatch = file.match(/^(?:\d+-)?(.+)\.mdx$/);
    if (!slugMatch) continue;

    const slug = slugMatch[1];

    const post = await getBlogPost(slug);
    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((a, b) =>
    new Date(a.meta.date) > new Date(b.meta.date) ? -1 : 1,
  );
}

/** Compile raw MDX source (with optional frontmatter) to a React node. Use for rendering blog body. */
export async function compileBlogContent(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      blockJS: false, // allow JSX attribute expressions so <CodeBlock code={`...`} /> works
    },
    components: mdxComponents as MDXComponents,
  });
  return content;
}
