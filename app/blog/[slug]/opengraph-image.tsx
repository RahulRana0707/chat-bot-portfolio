import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/mdx";

export const alt = "Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + "...";
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#1a1a1a",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Post not found
        </div>
      ),
      { ...size }
    );
  }

  const title = truncate(post.frontmatter.title, 80);
  const description = truncate(post.frontmatter.description ?? "", 120);

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom, #1a1a1a, #2d2d2d)",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 28,
              opacity: 0.85,
              textAlign: "center",
              maxWidth: 1000,
            }}
          >
            {description}
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 48,
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          Rahul Rana · Blog
        </div>
      </div>
    ),
    { ...size }
  );
}
