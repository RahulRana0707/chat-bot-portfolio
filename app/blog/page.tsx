import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Blog",
  description:
    "Writing about web development, AI, design systems, React Server Components, and engineering. Thoughts and ideas by Rahul Rana.",
  keywords: [
    "blog",
    "web development",
    "React",
    "Next.js",
    "design systems",
    "AI",
    "engineering",
  ],
  openGraph: {
    title: "Blog | Rahul Rana",
    description:
      "Writing about web development, AI, design systems, and engineering.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Rahul Rana",
    description:
      "Writing about web development, AI, design systems, and engineering.",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const BLOG_PLACEHOLDER_IMAGE = "/blog/placeholder.svg";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container max-w-3xl py-16 lg:py-24 mx-auto px-6">
      <header className="flex flex-col gap-3 mb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Thoughts & Ideas
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Exploring the intersection of design, engineering, and artificial
          intelligence.
        </p>
      </header>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="overflow-hidden transition-colors hover:bg-muted/40 border-border">
              <div className="flex flex-col sm:flex-row sm:items-stretch">
                <div className="relative w-full sm:w-36 sm:shrink-0 aspect-[2/1] sm:aspect-square overflow-hidden bg-muted">
                  <Image
                    src={post.meta.image ?? BLOG_PLACEHOLDER_IMAGE}
                    alt={post.meta.imageAlt ?? post.meta.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <CardHeader className="p-4 sm:p-5 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={post.meta.date}>
                        {new Date(post.meta.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      {post.meta.tags && post.meta.tags.length > 0 && (
                        <>
                          <span className="text-border">·</span>
                          <div className="flex flex-wrap gap-1.5">
                            {post.meta.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs font-medium text-primary/90"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.meta.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground line-clamp-2 leading-snug">
                      {post.meta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-5 pt-0">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      Read post
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
