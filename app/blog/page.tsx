import React from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog | Rahul Rana",
  description: "Articles and guides by Rahul Rana.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-2">Blog</h1>
      <p className="text-muted-foreground mb-8">
        Articles and step-by-step guides.
      </p>
      <ul className="space-y-6">
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="block rounded-lg border border-border bg-background/80 p-4 transition-colors hover:bg-muted/50"
            >
              <h2 className="text-xl font-semibold text-foreground">
                {frontmatter.title}
              </h2>
              {frontmatter.date ? (
                <time
                  dateTime={frontmatter.date}
                  className="text-sm text-muted-foreground"
                >
                  {frontmatter.date}
                </time>
              ) : null}
              {frontmatter.description ? (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {frontmatter.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
