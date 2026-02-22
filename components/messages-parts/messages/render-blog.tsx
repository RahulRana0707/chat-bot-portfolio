"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPostItem {
  slug: string;
  frontmatter: {
    title: string;
    date?: string;
    description?: string;
  };
}

export const RenderBlog = () => {
  const [posts, setPosts] = useState<BlogPostItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: { posts: BlogPostItem[] }) => {
        setPosts(data.posts ?? []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading blog links…</p>
    );
  }

  if (error || posts === null) {
    return (
      <div className="w-full h-max flex flex-wrap gap-2">
        <Button asChild variant="outline" className="gap-2 cursor-pointer">
          <Link href="/blog">View blog</Link>
        </Button>
        <span className="text-sm text-muted-foreground">
          Could not load blog list.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-max flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" className="gap-2 cursor-pointer">
          <Link href="/blog">All posts</Link>
        </Button>
      </div>
      <ul className="flex flex-col gap-2">
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <Button asChild variant="outline" className="h-auto justify-start text-left cursor-pointer">
              <Link href={`/blog/${slug}`} className="block w-full py-2">
                <span className="font-medium">{frontmatter.title}</span>
                {frontmatter.date ? (
                  <span className="text-muted-foreground text-xs ml-2">
                    {frontmatter.date}
                  </span>
                ) : null}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
