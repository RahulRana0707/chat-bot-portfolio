import { SiGithub } from "react-icons/si";
import { GitHubContributionCalendar } from "@/components/github-contribution-calendar";
import { GITHUB } from "@/content/github";
import type { ContributionCalendar } from "@/lib/github";

function ContributionFallback() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">
        Contribution activity is temporarily unavailable.
      </p>
      <a
        href={GITHUB.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        <SiGithub className="size-4" aria-hidden />
        View activity on GitHub
      </a>
    </div>
  );
}

export function GitHubContributionSection({
  calendar,
}: {
  calendar: ContributionCalendar | null;
}) {
  return (
    <section className="py-6">
      <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Activity</h2>
          {calendar ? (
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {calendar.totalContributions.toLocaleString()}
              </span>{" "}
              contributions in the last year
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              GitHub contribution calendar
            </p>
          )}
        </div>
        <a
          href={GITHUB.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <SiGithub className="size-3.5" aria-hidden />@{GITHUB.username}
        </a>
      </div>

      <div className="mt-5">
        {calendar ? (
          <GitHubContributionCalendar calendar={calendar} />
        ) : (
          <ContributionFallback />
        )}
      </div>
    </section>
  );
}
