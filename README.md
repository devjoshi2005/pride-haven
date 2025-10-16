# Pride Haven

## Purpose

Many LGBTQ+ youth in our community face isolation and stigma. Pride Haven is a digital safe space designed to foster belonging and resilience through:

- Moderated forums that prioritize safety, respect, and inclusion
- Mental health resources and crisis information
- Upcoming events and community meetups
- Articles and stories written by peers
- Anonymous Q&A sections for sensitive questions
- Prominent emergency contact links
- A potential chat feature with trained volunteers

Our guiding principles are to be welcoming, secure, and privacy‑preserving. We aim to protect user identity, practice trauma‑informed moderation, and provide an inclusive digital environment where LGBTQ+ people—especially youth—can connect, learn, and thrive.

A modern, accessible React + TypeScript single-page app built with Vite, Tailwind CSS, and shadcn/ui. It includes pages for community resources, mental health support, and an optional Supabase-powered Q&A section.


## Tech Stack

- React 18 + TypeScript (Vite)
- Tailwind CSS (+ tailwind-merge, tailwindcss-animate)
- shadcn/ui components (Radix UI under the hood)
- React Router v6
- TanStack Query (data fetching)
- Supabase JS (optional Q&A backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Vite will print a local URL. Open it in your browser while you edit files in `src/` for instant HMR.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

If you plan to enable the Q&A features backed by Supabase, create a `.env` file in the project root and add:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

Without these variables, the core static pages work, but Q&A features will be disabled/unavailable.

## Supabase Setup (Optional, for Q&A)

Follow the step-by-step guide in `SUPABASE_SETUP.md` to:

1. Create a Supabase project
2. Apply the schema from `database-schema.sql`
3. Configure the env vars shown above
4. Run the app and test posting a question

## Project Structure

```
public/                # static assets
src/
  assets/              # images and media
  components/          # shared UI and site components
    ui/                # shadcn/ui primitives
  hooks/               # shared hooks
  lib/                 # client libs (e.g., Supabase client)
  pages/               # routed pages (Index, About, Resources, QA, NotFound)
  App.tsx              # router and app shell
  main.tsx             # app entry
```

Notable files:

- `src/lib/supabase.ts`: Supabase client initialization (reads VITE_ env vars)
- `database-schema.sql`: SQL for Q&A tables, policies, and indexes
- `SUPABASE_SETUP.md`: End-to-end Supabase configuration guide

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm run build:dev`: Development-mode build (faster, less optimized)
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

## Key Pages & Features

- Home (`Index`): Hero, overview, quick links
- Resources: Curated links and support information
- About: Project purpose and mission
- Q&A (optional): Community questions and replies backed by Supabase
- 404: Not Found fallback

## UI / Styling

- Tailwind classes live in `src/index.css` and `tailwind.config.ts`
- shadcn/ui components in `src/components/ui/` provide accessible primitives

## Conventions

- TypeScript for all React components
- Keep components focused and composable; colocate styles and tests when applicable
- Prefer TanStack Query for async data/state that comes from APIs

## Troubleshooting

- Missing Supabase env vars: ensure `.env` contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then restart `npm run dev`
- Q&A errors: confirm `database-schema.sql` was applied and RLS policies are present (see `SUPABASE_SETUP.md`)

## License

MIT


