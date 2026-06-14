# Rahul Rana — Interactive AI Portfolio

This repository hosts an interactive portfolio built with Next.js and TypeScript that includes an AI-powered chat interface to explore projects, skills, experience, education, and more.

Live demo: https://rahul-bot.vercel.app/

![Preview](./public/chat-bot-preview.png)

## Key Features

- Conversational AI assistant for the portfolio (structured + natural responses)
- Browse projects, work experience, education, and social links via chat
- Rich MDX blog support with generated table-of-contents
- Theme switching and accessible components
- Small, focused component library in `components/` and `ui/`

## Project Structure (high level)

- `app/` — Next.js App Router pages and API routes
- `components/` — UI and feature components (chat, header, cards, etc.)
- `content/` — Structured content for profile, projects, blog, skills, experience
- `lib/` — helper utilities (MDX compilation, site URL, parsing)
- `assets/` & `public/` — icons, images, and static files
- `prompt/` — system prompt & AI configuration
- `types/` — shared TypeScript types

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Vercel for deployment

## Local Development

1. Install dependencies (uses pnpm):

```bash
pnpm install
```

2. Run the dev server:

```bash
pnpm dev
```

3. Visit `http://localhost:3000`

Notes:

- Content for the site is driven from `content/` and MDX files under `content/blog/`.
- The chat assistant prompt and behavior live under `prompt/` and `lib/parse-message.ts`.

## Adding or Removing Assets

- Static assets live in `public/` (images, logos, PDFs). Component icons are under `assets/icons/`.
- If you remove an asset, search the codebase for references to its filename before deleting.

## Deployment

Deploy to Vercel (recommended). The site is configured for static and server-rendered pages via Next.js app router.

## Troubleshooting Link Previews

- To ensure social previews include the image, add Open Graph/Twitter metadata in `app/layout.tsx` and redeploy.
- Use platform validators to refresh caches:
  - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator: https://cards-dev.twitter.com/validator

## Contributing

- Open a PR with changes. Follow existing code style and TypeScript types.

## License

MIT
