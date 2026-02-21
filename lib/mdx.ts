import { compileMDX } from "next-mdx-remote/rsc";
import path from "node:path";
import fs from "node:fs";
import GitHubSlugger from "github-slugger";
import { mdxComponents } from "@/mdx-components";
import type { MDXComponents } from "mdx/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogTocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
}

export interface BlogPost {
  slug: string;
  content: string;
  frontmatter: BlogPostMeta;
  toc: BlogTocEntry[];
}

/** Extract h2/h3 headings from raw MDX content for table of contents. */
export function getHeadingsFromContent(content: string): BlogTocEntry[] {
  const slugger = new GitHubSlugger();
  const entries: BlogTocEntry[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugger.slug(text);
    entries.push({ id, text, level });
  }
  return entries;
}

/** Compile raw MDX source to a React node. Use for rendering blog body. */
export async function compileBlogContent(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      blockJS: false,
    },
    components: mdxComponents as MDXComponents,
  });
  return content;
}

function getSlugFromFilename(filename: string): string {
  const match = filename.match(/^(?:\d+-)?(.+)\.mdx$/);
  return match ? match[1] : filename.replace(/\.mdx$/, "");
}

/** Get all blog posts (metadata only). */
export async function getAllBlogPosts(): Promise<
  { slug: string; frontmatter: BlogPostMeta }[]
> {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: { slug: string; frontmatter: BlogPostMeta }[] = [];
  for (const file of files) {
    const slug = getSlugFromFilename(file);
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatterMatch) continue;
    const front = frontmatterMatch[1];
    const title = front.match(/title:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? slug;
    const date = front.match(/date:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? "";
    const description = front.match(/description:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? "";
    const image = front.match(/image:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim();
    const imageAlt = front.match(/imageAlt:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim();
    let tags: string[] = [];
    const tagsMatch = front.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch) {
      tags = tagsMatch[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""));
    }
    posts.push({
      slug,
      frontmatter: { title, date, description, tags, image, imageAlt },
    });
  }
  posts.sort((a, b) => (b.frontmatter.date || "").localeCompare(a.frontmatter.date || ""));
  return posts;
}

/** Get a single blog post by slug. */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!fs.existsSync(BLOG_DIR)) return undefined;
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const file = files.find((f) => getSlugFromFilename(f) === slug);
  if (!file) return undefined;
  const fullPath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(fullPath, "utf-8");
  const bodyMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  const body = bodyMatch ? bodyMatch[1].trim() : content;
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) return undefined;
  const front = frontmatterMatch[1];
  const title = front.match(/title:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? slug;
  const date = front.match(/date:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? "";
  const description = front.match(/description:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? "";
  const image = front.match(/image:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim();
  const imageAlt = front.match(/imageAlt:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim();
  let tags: string[] = [];
  const tagsMatch = front.match(/tags:\s*\[([^\]]*)\]/);
  if (tagsMatch) {
    tags = tagsMatch[1].split(",").map((t) => t.trim().replace(/^["']|["']$/g, ""));
  }
  const frontmatter: BlogPostMeta = { title, date, description, tags, image, imageAlt };
  const toc = getHeadingsFromContent(body);
  return { slug, content: body, frontmatter, toc };
}
