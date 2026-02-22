import { getAllBlogPosts } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ posts });
  } catch (e) {
    console.error("Blog list API error:", e);
    return NextResponse.json(
      { error: "Failed to load blog list" },
      { status: 500 },
    );
  }
}
