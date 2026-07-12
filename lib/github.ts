import { GITHUB } from "@/content/github";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

type GraphQLContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: GraphQLContributionLevel;
            }[];
          }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
};

const LEVEL_MAP: Record<GraphQLContributionLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CONTRIBUTION_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch the real GitHub contribution calendar for the portfolio homepage.
 * Returns null when the token is missing, the request fails, or the user is not found.
 * Never throws — callers should render a fallback UI.
 */
export async function getContributionCalendar(
  username: string = GITHUB.username,
): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[github] GITHUB_TOKEN is not set — contribution calendar will use fallback UI.",
      );
    }
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "rahul-bot-portfolio",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { login: username },
      }),
      // Cache for 1 hour — contribution graphs do not need real-time freshness
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        `[github] GraphQL HTTP ${response.status}: ${response.statusText}`,
      );
      return null;
    }

    const json = (await response.json()) as GraphQLResponse;

    if (json.errors?.length) {
      console.error("[github] GraphQL errors:", json.errors);
      return null;
    }

    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      console.error("[github] No contribution calendar in response");
      return null;
    }

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        })),
      })),
    };
  } catch (error) {
    console.error("[github] Failed to fetch contribution calendar:", error);
    return null;
  }
}
