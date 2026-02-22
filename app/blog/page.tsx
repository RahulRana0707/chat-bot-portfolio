import { getAllBlogPosts } from "@/lib/mdx";
import { BlogListWithFilters } from "@/components/blog-list-with-filters";

export const metadata = {
  title: "Blog | Rahul Rana",
  description: "Articles and guides by Rahul Rana.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Blog</h1>
      <p className="text-muted-foreground mb-6">
        Articles and step-by-step guides.
      </p>
      <BlogListWithFilters posts={posts} />
    </div>
  );
}
