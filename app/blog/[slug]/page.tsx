import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost, compileBlogContent } from "@/lib/mdx";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SITE_URL } from "@/lib/site-url";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getAllBlogPosts } = await import("@/lib/mdx");
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  const title = post.frontmatter.title;
  const description = post.frontmatter.description ?? "";
  const canonical = `/blog/${slug}`;
  const images = post.frontmatter.image
    ? [{ url: post.frontmatter.image, alt: post.frontmatter.imageAlt ?? title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.frontmatter.date || undefined,
      authors: ["Rahul Rana"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const postContent =
    typeof post.content === "string"
      ? await compileBlogContent(post.content)
      : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description ?? undefined,
    datePublished: post.frontmatter.date || undefined,
    author: {
      "@type": "Person",
      name: "Rahul Rana",
      url: SITE_URL,
    },
    image: post.frontmatter.image
      ? `${SITE_URL}${post.frontmatter.image.startsWith("/") ? post.frontmatter.image : `/${post.frontmatter.image}`}`
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Rahul Rana",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/rahul-bot-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Same column as nav / homepage: max-w-3xl + px-4 */}
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary mb-6 inline-block"
        >
          ← Back to blog
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.date ? (
            <time
              dateTime={post.frontmatter.date}
              className="text-muted-foreground text-sm mt-2 block"
            >
              {post.frontmatter.date}
            </time>
          ) : null}
        </header>

        {post.frontmatter.image ? (
          <div className="relative mb-10 aspect-2/1 w-full overflow-hidden rounded-lg border border-border">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.imageAlt ?? post.frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : null}

        <TableOfContents entries={post.toc} className="mb-10 w-full max-w-none" />

        <div className="min-w-0 w-full font-reading prose prose-invert max-w-none">
          {postContent}
        </div>
      </article>
    </div>
  );
}
