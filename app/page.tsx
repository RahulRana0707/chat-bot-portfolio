import Image from "next/image";
import Link from "next/link";
import { FileDown, Send } from "lucide-react";
import { getAllBlogPosts } from "@/lib/mdx";
import { EXPERIENCES_CONTENT } from "@/content/experience";
import { PROJECTS_CONTENT } from "@/content/projects";
import { SKILLS_CONTENT } from "@/content/skills";
import { SOCIALS_CONTENT } from "@/content/socials";
import { SkillMapper, Skill, type Skill as SkillType } from "@/components/all-skills";
import { PortfolioExperienceSection } from "@/components/portfolio-experience-section";
import { PortfolioSocialLinks } from "@/components/portfolio-social-links";
import { BlogCard } from "@/components/blog-card";
import { ProjectCard } from "@/components/project-card";
import { PortfolioChatTrigger } from "@/components/portfolio-chat-trigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Skills shown inline in the header sentence (first three + "and" + one more) */
const HEADER_SKILLS: Skill[] = [Skill.REACT, Skill.TYPESCRIPT, Skill.NEXTJS];
const HEADER_SKILL_AND: Skill = Skill.POSTGRESQL;
const RESUME_URL = "/rahul_rana_wd_resume.pdf";
const RESUME_DOWNLOAD_NAME = "Rahul_Rana_Resume.pdf";

/** Condensed summary per experience (not full resume copy). */
const EXPERIENCE_SUMMARIES: Record<string, string[]> = {
  "Instinct Innovations": [
    "Re-architected Playwright framework (POM, TypeScript); reduced maintenance across 500+ tests.",
    "Built Tiny Forms (React, Atomic Design) and Connection Module for 100+ integrations; cut load time 30%; mentored juniors on AI tooling.",
  ],
  "Sensys Technologies Pvt. Ltd": [
    "Shipped pixel-perfect React UIs from Figma; delivered on time.",
    "Improved platform load time by 40% by resolving frontend bottlenecks.",
  ],
};

export const metadata = {
  title: "Rahul Rana | Portfolio",
  description:
    "A public thinking surface. Work, writing, and ideas — frontend engineer focused on React, TypeScript, and clean systems.",
};

export default async function RootPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="font-reading min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 space-y-8 sm:space-y-10">
        {/* Header: avatar on top, then heading, paragraph, CTAs, socials (left-aligned) */}
        <header className="space-y-6 text-left pb-6">
          <div>
            <Image
              src="/avatar.svg"
              alt=""
              width={140}
              height={140}
              className="h-28 w-28 object-contain sm:h-36 sm:w-36"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="text-foreground">Hi, I&apos;m Rahul</span>
              <span className="text-muted-foreground">
                {" "}
                — A Full Stack web developer.
              </span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-prose">
              I build interactive web apps using{" "}
              {HEADER_SKILLS.map((skill) => {
                const data = SkillMapper[skill];
                return (
                  <span key={skill} className="inline-flex align-middle">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium mx-0.5",
                      )}
                    >
                      {data?.icon ?? null}
                      <span>{data?.name ?? skill}</span>
                    </span>
                  </span>
                );
              })}{" "}
              and{" "}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium",
                )}
              >
                {SkillMapper[HEADER_SKILL_AND]?.icon}
                <span>{SkillMapper[HEADER_SKILL_AND]?.name}</span>
              </span>
              . With a focus on <strong className="text-foreground">clean UI</strong>. Enthusiastic about{" "}
              <strong className="text-foreground">developer experience</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="default" className="gap-2">
                <a
                  href={RESUME_URL}
                  download={RESUME_DOWNLOAD_NAME}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="size-4" />
                  Resume / CV
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="gap-2">
                <a href="mailto:rahul.dev.240801@gmail.com" title="Email">
                  <Send className="size-4" />
                  Get in touch
                </a>
              </Button>
            </div>
          </div>
          <PortfolioSocialLinks
            links={SOCIALS_CONTENT.map(({ name, link }) => ({ name, link }))}
          />
        </header>

        <div className="py-6">
          <PortfolioExperienceSection
            experiences={EXPERIENCES_CONTENT}
            summaries={EXPERIENCE_SUMMARIES}
          />
        </div>

        <section className="py-6">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Skills
          </h2>
          <div className="space-y-6">
            {SKILLS_CONTENT.map((group) => (
              <div key={group.name}>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {group.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const data = SkillMapper[skill as SkillType];
                    return (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
                      >
                        {data?.icon ?? null}
                        <span>{data?.name ?? skill}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-6">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Projects
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {PROJECTS_CONTENT.map((project) => (
              <li key={project.title}>
                <ProjectCard
                  project={{
                    title: project.title,
                    image: "image" in project ? project.image : undefined,
                    repoUrl: "repoUrl" in project ? project.repoUrl : undefined,
                    liveUrl: "liveUrl" in project ? project.liveUrl : undefined,
                    description: project.description,
                    technologies: project.technologies,
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="outline" size="default">
              <Link href="/projects">Show all projects</Link>
            </Button>
          </div>
        </section>

        <section className="py-6">
          <div className="mb-2 text-sm font-medium text-muted-foreground">
            Featured
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Blogs
          </h2>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            <>
              <ul className="grid gap-6 sm:grid-cols-2">
                {posts.map(({ slug, frontmatter }) => (
                  <li key={slug}>
                    <BlogCard slug={slug} frontmatter={frontmatter} />
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center">
                <Button asChild variant="outline" size="default">
                  <Link href="/blog">Show all blogs</Link>
                </Button>
              </div>
            </>
          )}
        </section>

        <footer className="pt-6 pb-4 text-center text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Rahul Rana</span>
            {" · "}
            <a
              href="mailto:rahul.dev.240801@gmail.com"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Get in touch
            </a>
          </p>
        </footer>
      </div>
      <PortfolioChatTrigger />
    </main>
  );
}
