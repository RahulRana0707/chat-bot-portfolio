# SEO Guide for This Portfolio

This document explains **what SEO is**, **how we implement it** in this Next.js app, and **what each part does** so you can reason about and improve it over time.

---

## What is SEO?

**SEO (Search Engine Optimization)** is the practice of making your site easy for search engines (Google, Bing, etc.) to **discover**, **understand**, and **rank**. The goal is to get your pages shown for relevant searches (e.g. "Rahul Rana developer", "React design systems blog") and to look good when shared on social media or in chat (preview title, description, image).

SEO is not one feature—it’s a set of **signals** you give to crawlers and platforms:

1. **What this page is about** (title, description, headings).
2. **How to reach it** (sitemap, clean URLs).
3. **How it should look when shared** (Open Graph, Twitter cards).
4. **Who wrote it and when** (authors, dates, structured data).

We implement these using **Next.js metadata**, **sitemap/robots**, and **structured data (JSON-LD)**.

---

## Concepts and How We Achieve Them

### 1. Title and description (meta tags)

- **What:** The `<title>` and `<meta name="description">` that show in browser tabs and in search results.
- **Why:** Clear titles and descriptions help both users and search engines understand the page. Good titles improve click-through from search.
- **How:** In Next.js we use the **Metadata API** in `layout.tsx` and in each `page.tsx` (or `generateMetadata` for dynamic pages). Next.js turns these into the correct `<title>` and `<meta>` tags.

**In this project:**

- **Root layout** (`app/layout.tsx`): Sets a default title and a **title template** (`%s | Rahul Rana`). Child pages only set their part (e.g. `"Blog"`), and the final title becomes `"Blog | Rahul Rana"`.
- **Blog list** (`app/blog/page.tsx`): Sets `title: "Blog"` and a description focused on your blog topics.
- **Blog post** (`app/blog/[slug]/page.tsx`): Uses `generateMetadata` to set `title: post.meta.title` (template adds `| Rahul Rana`) and `description: post.meta.description` from frontmatter.

---

### 2. metadataBase and absolute URLs

- **What:** A base URL (e.g. `https://rahul-bot.vercel.app`) used to build **absolute** URLs for Open Graph, sitemap, canonical, etc.
- **Why:** Many SEO and social features require full URLs. If you use relative paths, some platforms may not resolve them correctly.
- **How:** We set `metadataBase: new URL(SITE_URL)` in the root layout. `SITE_URL` comes from `lib/site.ts` and can be overridden with `NEXT_PUBLIC_SITE_URL` in `.env`.

---

### 3. Open Graph (OG) and Twitter cards

- **What:** Extra meta tags that control how a link looks when shared (e.g. on LinkedIn, Twitter, Slack): title, description, image, URL.
- **Why:** Without these, the link might show a generic or wrong preview. With them, you get a clear title, description, and image.
- **How:** We set `openGraph` and `twitter` in the Metadata API. Next.js emits the right `<meta property="og:...">` and `<meta name="twitter:...">` tags.

**In this project:**

- **Root layout:** `openGraph` and `twitter` for the home page (title, description, `url`, `siteName`).
- **Blog list:** `openGraph` and `twitter` with `url: ${SITE_URL}/blog`.
- **Blog post:** `generateMetadata` sets `openGraph` with `type: "article"`, `publishedTime`, `authors`, and `images` (from post frontmatter or default). Twitter uses the same info for a large image card.

---

### 4. Canonical URL

- **What:** The “official” URL for this page. Tells search engines “treat this URL as the main one” and reduces duplicate-content issues (e.g. with or without `www`, or with query params).
- **How:** We set `alternates.canonical` in metadata to the full URL of the page (e.g. `https://rahul-bot.vercel.app/blog/design-systems`).

**In this project:** Blog list and each blog post set `alternates.canonical` to their exact URL.

---

### 5. Sitemap (sitemap.xml)

- **What:** An XML file that lists important URLs and (optionally) when they were last updated. Crawlers use it to discover and prioritize pages.
- **Why:** Helps search engines find all your pages, especially new or less-linked ones (e.g. new blog posts).
- **How:** In Next.js we add `app/sitemap.ts` that returns an array of `{ url, lastModified, changeFrequency, priority }`. Next.js serves this at `/sitemap.xml`.

**In this project:** `app/sitemap.ts` includes the home page, `/blog`, and every `/blog/[slug]` from your MDX content. `lastModified` for posts uses the post’s date.

---

### 6. Robots (robots.txt)

- **What:** A small file that tells crawlers which paths they are allowed or not allowed to crawl, and where the sitemap is.
- **Why:** You want crawlers to index your content but not your API routes or internal endpoints.
- **How:** We add `app/robots.ts` that returns `allow: "/"`, `disallow: ["/api/"]`, and `sitemap: ${SITE_URL}/sitemap.xml`. Next.js serves this at `/robots.txt`.

---

### 7. Structured data (JSON-LD)

- **What:** A JSON block that describes the page in a standard format (Schema.org). For example, an **Article** has headline, author, date, image.
- **Why:** Search engines can use this to show rich results (e.g. article snippet with author and date in Google).
- **How:** We output a `<script type="application/ld+json">` with the Article schema in the blog post page. The object includes headline, description, datePublished, author, publisher, url, and image when available.

**In this project:** Each blog post page renders this script with data from the post’s frontmatter and `SITE_URL`.

---

### 8. Viewport and themeColor

- **What:** Viewport meta tag (mobile scaling) and theme-color (browser UI color).
- **Why:** Good for mobile UX and branding; some platforms use theme color in previews.
- **How:** We export `viewport` from the root layout (width, initialScale, themeColor for light/dark). Next.js emits the corresponding meta tags.

---

## Summary: What We Did Per Page

| Page           | Title / description      | Open Graph / Twitter | Canonical | Sitemap | Other                    |
|----------------|--------------------------|----------------------|-----------|---------|--------------------------|
| Root layout    | Default + template       | Yes (home)           | —         | —       | metadataBase, viewport, robots |
| Home (/)       | Uses layout default      | Uses layout          | —         | Yes     | —                        |
| /blog          | Blog + description       | Yes, url /blog       | Yes       | Yes     | —                        |
| /blog/[slug]   | From frontmatter         | Yes, article + image | Yes       | Yes     | JSON-LD Article          |
| —              | —                        | —                    | —         | —       | robots.txt, sitemap.xml |

---

## How to Extend SEO Later

1. **Per-post OG image:** Add `app/blog/[slug]/opengraph-image.tsx` and use `next/og` (ImageResponse) to generate a 1200×630 image with the post title. That image will be used when the post is shared.
2. **Default OG image:** Add `app/opengraph-image.tsx` for the rest of the site (home, /blog) so every shared link has an image.
3. **Production URL:** Set `NEXT_PUBLIC_SITE_URL=https://your-production-domain.com` in production so all absolute URLs (sitemap, canonical, OG) point to the real site.
4. **More structured data:** Add a `WebSite` or `Person` schema in the root layout if you want richer knowledge-panel or sitelinks-style results.

---

## References

- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js Sitemap & Robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Open Graph protocol](https://ogp.me/)
- [Schema.org Article](https://schema.org/Article)
