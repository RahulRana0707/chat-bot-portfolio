import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export type BlogCardFrontmatter = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
};

export function formatBlogDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  } catch {
    return dateStr;
  }
}

const MAX_VISIBLE_TAGS = 3;

export function BlogCard({
  slug,
  frontmatter,
}: {
  slug: string;
  frontmatter: BlogCardFrontmatter;
}) {
  const tags = frontmatter.tags ?? [];
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = tags.length - visibleTags.length;
  const dateFormatted = formatBlogDate(frontmatter.date);

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/blog/${slug}`} className="block">
        {frontmatter.image ? (
          <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
            <Image
              src={frontmatter.image}
              alt={frontmatter.imageAlt ?? ""}
              fill
              className="object-cover transition-transform group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted/30" />
        )}
        <div className="p-5 space-y-3">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
            {frontmatter.title}
          </h3>
          {frontmatter.description ? (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {frontmatter.description}
            </p>
          ) : null}
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
              {remaining > 0 ? (
                <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  +{remaining} more
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="flex items-center justify-between pt-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4 shrink-0" />
              {dateFormatted}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-foreground group-hover:text-primary">
              Read more
              <ArrowRight className="size-4 shrink-0" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Loading skeleton matching BlogCard layout (rounded-xl, image area, title, description, tags, footer). */
export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-video w-full bg-muted/50 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-4/5 rounded bg-muted animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded bg-muted/80 animate-pulse" />
          <div className="h-3.5 w-2/3 rounded bg-muted/80 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-muted/80 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-muted/80 animate-pulse" />
          <div className="h-6 w-14 rounded-full bg-muted/80 animate-pulse" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-4 w-24 rounded bg-muted/80 animate-pulse" />
          <div className="h-4 w-20 rounded bg-muted/80 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
