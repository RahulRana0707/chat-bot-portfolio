export default function BlogPostLoading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 animate-pulse">
        {/* Back link */}
        <div className="mb-6 h-4 w-24 rounded bg-muted/60" />

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 h-9 w-full max-w-2xl rounded bg-muted/70" />
          <div className="h-4 w-28 rounded bg-muted/50" />
        </header>

        {/* Hero image placeholder */}
        <div className="mb-10 aspect-[2/1] w-full rounded-lg border border-border bg-muted/50" />

        {/* TOC placeholder */}
        <div className="mb-10 space-y-2 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
          <div className="mb-2 h-4 w-28 rounded bg-muted/50" />
          <div className="h-3 w-full rounded bg-muted/40" />
          <div className="h-3 w-4/5 rounded bg-muted/40" />
          <div className="h-3 w-3/4 rounded bg-muted/40" />
        </div>

        {/* Body */}
        <div className="min-w-0 w-full space-y-4">
          <div className="h-4 w-full rounded bg-muted/50" />
          <div className="h-4 w-full rounded bg-muted/50" />
          <div className="h-4 w-4/5 rounded bg-muted/50" />
          <div className="mt-6 h-4 w-full rounded bg-muted/50" />
          <div className="h-4 w-full rounded bg-muted/50" />
          <div className="h-4 w-3/4 rounded bg-muted/50" />
          <div className="mt-6 h-4 w-full rounded bg-muted/50" />
          <div className="h-4 w-full rounded bg-muted/50" />
          <div className="h-4 w-5/6 rounded bg-muted/50" />
        </div>
      </div>
    </div>
  );
}
