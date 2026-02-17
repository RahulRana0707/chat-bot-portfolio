import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cache } from "react";

import {
  compileBlogContent,
  getBlogPost,
  getBlogPosts,
  getHeadingsFromContent,
} from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPostBackground } from "@/components/blog/blog-post-background";
import { TableOfContents } from "@/components/blog/table-of-contents";

const getCachedBlogPost = cache(getBlogPost);

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);
  if (!post) return;

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = post.meta.image?.startsWith("http")
    ? post.meta.image
    : post.meta.image
      ? `${SITE_URL}${post.meta.image}`
      : undefined;

  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: post.meta.tags,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: postUrl,
      type: "article",
      publishedTime: post.meta.date,
      authors: ["Rahul Rana"],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.meta.imageAlt ?? post.meta.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

const BLOG_PLACEHOLDER_IMAGE = "/blog/placeholder.svg";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getCachedBlogPost(slug);

  if (!post || typeof post.content !== "string") {
    notFound();
  }

  const postContent = await compileBlogContent(post.content);
  const heroSrc = post.meta.image ?? BLOG_PLACEHOLDER_IMAGE;
  const heroAlt = post.meta.imageAlt ?? post.meta.title;
  const tocEntries = getHeadingsFromContent(post.content);

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = post.meta.image?.startsWith("http")
    ? post.meta.image
    : post.meta.image
      ? `${SITE_URL}${post.meta.image}`
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      "@type": "Person",
      name: "Rahul Rana",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Rahul Rana",
      url: SITE_URL,
    },
    url: postUrl,
    ...(imageUrl && { image: imageUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostBackground />
      <article className="relative min-h-screen">
        <div className="container mx-auto px-6 pt-14 pb-20 lg:pt-20 lg:pb-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start lg:justify-center">
            <div className="min-w-0 flex-1 max-w-3xl">
              <Button
                variant="ghost"
                size="sm"
                className="mb-8 -ml-2 text-muted-foreground hover:text-primary"
                asChild
              >
                <Link href="/blog" className="inline-flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg border border-border bg-muted mb-8">
                <Image
                  src={heroSrc}
                  alt={heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col gap-5 mb-12">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.meta.date}>
                    {new Date(post.meta.date).toLocaleDateString("en-US", {
                      month: "long",
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
                            className="font-medium text-primary/90"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-foreground">
                  {post.meta.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.meta.description}
                </p>
              </div>

              <div className="space-y-6 max-w-none">{postContent}</div>
            </div>

            <TableOfContents entries={tocEntries} />
          </div>
        </div>
      </article>
    </>
  );
}
