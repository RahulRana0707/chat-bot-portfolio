"use client";

export function BlogPostBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="blog-gradient-blob absolute -top-1/2 -right-1/2 h-[80vh] w-[80vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, var(--primary) 0%, transparent 55%)",
        }}
      />
      <div
        className="blog-gradient-blob blog-gradient-blob--delay absolute -bottom-1/2 -left-1/2 h-[80vh] w-[80vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, var(--primary) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
