"use client";

import { useMemo, useState, useCallback } from "react";
import { Search, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogCard } from "@/components/blog-card";
import { cn } from "@/lib/utils";

export type BlogPostItem = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    image?: string;
    imageAlt?: string;
  };
};

function getYearFromDate(dateStr: string): string | null {
  if (!dateStr) return null;
  try {
    const y = new Date(dateStr).getFullYear();
    return isNaN(y) ? null : String(y);
  } catch {
    return null;
  }
}

export function BlogListWithFilters({ posts }: { posts: BlogPostItem[] }) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [year, setYear] = useState<string>("all");

  const { allTags, allYears } = useMemo(() => {
    const tagSet = new Set<string>();
    const yearSet = new Set<string>();
    for (const p of posts) {
      for (const t of p.frontmatter.tags ?? []) {
        if (t.trim()) tagSet.add(t.trim());
      }
      const y = getYearFromDate(p.frontmatter.date);
      if (y) yearSet.add(y);
    }
    return {
      allTags: Array.from(tagSet).sort(),
      allYears: Array.from(yearSet).sort((a, b) => b.localeCompare(a)),
    };
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      if (q) {
        const title = (p.frontmatter.title ?? "").toLowerCase();
        const desc = (p.frontmatter.description ?? "").toLowerCase();
        if (!title.includes(q) && !desc.includes(q)) return false;
      }
      if (selectedTags.size > 0) {
        const postTags = new Set((p.frontmatter.tags ?? []).map((t) => t.trim()));
            const hasMatch = [...selectedTags].some((t) => postTags.has(t));
        if (!hasMatch) return false;
      }
      if (year !== "all") {
        const postYear = getYearFromDate(p.frontmatter.date);
        if (postYear !== year) return false;
      }
      return true;
    });
  }, [posts, search, selectedTags, year]);

  const addTag = useCallback((tag: string) => {
    setSelectedTags((prev) => new Set(prev).add(tag));
  }, []);
  const removeTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.delete(tag);
      return next;
    });
  }, []);

  const selectedTagsList = useMemo(
    () => Array.from(selectedTags).sort(),
    [selectedTags],
  );
  const availableTags = useMemo(
    () => allTags.filter((t) => !selectedTags.has(t)),
    [allTags, selectedTags],
  );

  return (
    <div className="space-y-6">
      {/* Search + filters row */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search posts by title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search posts"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground shrink-0">
            Tags
          </span>
          <div className="flex flex-wrap items-center gap-2 min-h-9">
            {selectedTagsList.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-8 items-center gap-1 rounded-full border border-primary/50 bg-primary/10 pl-2.5 pr-1 text-xs font-medium text-primary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded-full p-0.5 hover:bg-primary/20"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-dashed border-input bg-background px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Add tag filter"
                >
                  <Plus className="size-3.5" />
                  Add tag
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search tags…" />
                  <CommandList>
                    <CommandEmpty>No tag found.</CommandEmpty>
                    <CommandGroup>
                      {availableTags.map((tag) => (
                        <CommandItem
                          key={tag}
                          value={tag}
                          onSelect={() => addTag(tag)}
                        >
                          {tag}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger size="sm" className="h-8 w-[7rem]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              {allYears.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count + list */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} post{filtered.length !== 1 ? "s" : ""}
      </p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {filtered.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <BlogCard slug={slug} frontmatter={frontmatter} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No posts match your filters. Try a different search or clear filters.
        </p>
      ) : null}
    </div>
  );
}
