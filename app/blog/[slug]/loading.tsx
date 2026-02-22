export default function BlogPostLoading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 animate-pulse">
        {/* Back link */}
        <div className="h-4 w-24 rounded bg-muted/60 mb-6" />

        {/* Header */}
        <header className="mb-10">
          <div className="h-9 w-full max-w-2xl rounded bg-muted/70 mb-3" />
          <div className="h-4 w-28 rounded bg-muted/50" />
        </header>

        {/* Hero image placeholder */}
        <div className="w-full aspect-[2/1] rounded-lg bg-muted/50 border border-border mb-10" />

        {/* Content + sidebar */}
        <div className="flex gap-8">
          <div className="min-w-0 flex-1 max-w-prose space-y-4">
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-4/5 rounded bg-muted/50" />
            <div className="h-4 w-full rounded bg-muted/50 mt-6" />
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-3/4 rounded bg-muted/50" />
            <div className="h-4 w-full rounded bg-muted/50 mt-6" />
            <div className="h-4 w-full rounded bg-muted/50" />
            <div className="h-4 w-5/6 rounded bg-muted/50" />
          </div>
          <aside className="hidden lg:block w-48 shrink-0 space-y-2">
            <div className="h-4 w-32 rounded bg-muted/50 mb-4" />
            <div className="h-3 w-full rounded bg-muted/40" />
            <div className="h-3 w-4/5 rounded bg-muted/40" />
            <div className="h-3 w-full rounded bg-muted/40" />
            <div className="h-3 w-3/4 rounded bg-muted/40" />
            <div className="h-3 w-full rounded bg-muted/40" />
          </aside>
        </div>
      </div>
    </div>
  );
}
