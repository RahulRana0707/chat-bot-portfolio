import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost, compileBlogContent } from "@/lib/mdx";
import { TableOfContents } from "@/components/blog/table-of-contents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.frontmatter.title} | Rahul Rana`,
    description: post.frontmatter.description,
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

  return (
    <div className="min-h-screen">
      <article className="mx-auto max-w-4xl px-4 py-12">
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
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden border border-border mb-10">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.imageAlt ?? post.frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        ) : null}

        <div className="flex gap-8">
          <div className="min-w-0 flex-1 max-w-prose font-reading prose prose-invert">
            {postContent}
          </div>
          <TableOfContents entries={post.toc} />
        </div>
      </article>
    </div>
  );
}
