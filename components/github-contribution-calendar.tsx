"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type {
  ContributionCalendar,
  ContributionDay,
  ContributionLevel,
} from "@/lib/github";

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

/** Space reserved for Mon/Wed/Fri column (px). */
const WEEKDAY_COL_WIDTH = 28;
/** Gap between cells (px). */
const CELL_GAP = 3;
/** Floor for cell size before we allow horizontal scroll. */
const MIN_CELL = 9;
/** Cap so cells never look oversized on very wide layouts. */
const MAX_CELL = 14;

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-muted border border-border/60",
  1: "bg-primary/25",
  2: "bg-primary/45",
  3: "bg-primary/70",
  4: "bg-primary",
};

function formatContributionDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCountLabel(count: number): string {
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count.toLocaleString()} contributions`;
}

/** Month label positions: first week index where that month appears. */
function getMonthLabels(weeks: ContributionCalendar["weeks"]) {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    // Prefer mid-week day for stable month detection (GitHub weeks start on Sunday)
    const day = week.days[3] ?? week.days[0];
    if (!day) return;
    const month = new Date(`${day.date}T00:00:00`).getMonth();
    if (month !== lastMonth) {
      labels.push({
        label: new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
          month: "short",
        }),
        weekIndex,
      });
      lastMonth = month;
    }
  });

  return labels;
}

/**
 * Fit all weeks into the available width when possible.
 * Only fall below MIN_CELL → overflow scroll on very small screens.
 */
function computeCellSize(containerWidth: number, weekCount: number): number {
  if (containerWidth <= 0 || weekCount <= 0) return MIN_CELL;
  const gaps = Math.max(0, weekCount - 1) * CELL_GAP;
  const available = containerWidth - WEEKDAY_COL_WIDTH - gaps;
  const raw = available / weekCount;
  return Math.max(MIN_CELL, Math.min(MAX_CELL, Math.floor(raw)));
}

function DayCell({
  day,
  size,
  weekIndex,
  dayIndex,
}: {
  day: ContributionDay;
  size: number;
  weekIndex: number;
  dayIndex: number;
}) {
  const delayMs = Math.min(weekIndex * 8 + dayIndex * 2, 400);

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "shrink-0 rounded-[2px] transition-transform duration-150",
            "hover:scale-125 hover:ring-1 hover:ring-primary/50 hover:ring-offset-1 hover:ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
            "animate-in fade-in-0 zoom-in-95 fill-mode-both",
            LEVEL_CLASS[day.level],
          )}
          style={{
            width: size,
            height: size,
            animationDelay: `${delayMs}ms`,
            animationDuration: "280ms",
          }}
          aria-label={`${formatCountLabel(day.count)} on ${formatContributionDate(day.date)}`}
        />
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        <p className="font-medium">{formatCountLabel(day.count)}</p>
        <p className="text-muted-foreground">
          {formatContributionDate(day.date)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export function GitHubContributionCalendar({
  calendar,
}: {
  calendar: ContributionCalendar;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(MIN_CELL);
  const [containerWidth, setContainerWidth] = useState(0);

  const weekCount = calendar.weeks.length;
  const monthLabels = useMemo(
    () => getMonthLabels(calendar.weeks),
    [calendar.weeks],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      setContainerWidth(width);
      setCellSize(computeCellSize(width, weekCount));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [weekCount]);

  const step = cellSize + CELL_GAP;
  const gridWidth =
    weekCount * cellSize + Math.max(0, weekCount - 1) * CELL_GAP;
  // Scroll only when a full year cannot fit at the minimum cell size
  const needsScroll =
    containerWidth > 0 && WEEKDAY_COL_WIDTH + gridWidth > containerWidth + 0.5;

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <div
        className={cn(
          "pb-1",
          // Scroll only when the year cannot fit at MIN_CELL (small phones)
          needsScroll
            ? "overflow-x-auto [scrollbar-width:thin]"
            : "overflow-x-hidden",
        )}
      >
        <div
          className="inline-block"
          style={{
            // At least fill container; grow only when we must scroll
            minWidth: "100%",
            width: needsScroll ? WEEKDAY_COL_WIDTH + gridWidth : "100%",
          }}
        >
          {/* Month labels — aligned to week columns (offset by weekday gutter) */}
          <div className="mb-1.5 flex">
            <div
              className="shrink-0"
              style={{ width: WEEKDAY_COL_WIDTH }}
              aria-hidden
            />
            <div className="relative h-4 flex-1" style={{ width: gridWidth }}>
              {monthLabels.map(({ label, weekIndex }) => (
                <span
                  key={`${label}-${weekIndex}`}
                  className="absolute top-0 text-[10px] leading-none text-muted-foreground"
                  style={{ left: weekIndex * step }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex" style={{ gap: 0 }}>
            {/* Weekday labels — sticky so they stay visible if the user must scroll */}
            <div
              className="sticky left-0 z-10 flex shrink-0 flex-col bg-background/95 pr-1 backdrop-blur-[2px]"
              style={{ width: WEEKDAY_COL_WIDTH, gap: CELL_GAP }}
            >
              {WEEKDAY_LABELS.map((label, i) => (
                <div
                  key={`wd-${i}`}
                  className="flex items-center justify-end"
                  style={{ height: cellSize }}
                >
                  {label ? (
                    <span className="text-[10px] leading-none text-muted-foreground">
                      {label}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Weeks × days — fills remaining width via sized cells */}
            <div className="flex" style={{ gap: CELL_GAP }}>
              {calendar.weeks.map((week, weekIndex) => (
                <div
                  key={week.days[0]?.date ?? weekIndex}
                  className="flex flex-col"
                  style={{ gap: CELL_GAP }}
                >
                  {week.days.map((day, dayIndex) => (
                    <DayCell
                      key={day.date}
                      day={day}
                      size={cellSize}
                      weekIndex={weekIndex}
                      dayIndex={dayIndex}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
          <span
            key={level}
            className={cn("rounded-[2px]", LEVEL_CLASS[level])}
            style={{ width: cellSize, height: cellSize }}
            aria-hidden
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
