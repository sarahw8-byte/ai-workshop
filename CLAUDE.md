# CLAUDE.md
Rules for working in the AI Workshop repo (sarahw8-byte/AI-Workshop). Sarah directs and reviews all work here and has no coding background, so explain everything in plain language.

## Stack
- Next.js 16 with the App Router, TypeScript, plain CSS (no Tailwind, no CSS frameworks).
- Supabase for sign-in and storing tasks.
- Deployed on Vercel; every merge to main redeploys the live site at ai-workshop-gamma-three.vercel.app.

## Commands
- `npm install` installs the libraries listed in package.json.
- `npm run dev` runs the site locally at http://localhost:3000.
- `npm run build` checks the site builds. Run it before every pull request; it must pass.
- `npm run start` runs the built site locally.
- There is no lint or test script. Do not add one without asking.

## Never
- Add a dependency without asking first.
- Edit .env, .env.local, or any environment variable, locally or in Vercel.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders.
- Put passwords, API keys, or connection strings in code, commits, or chat.
- Use real personal data. Fake names and example.com emails only.
- Commit or merge unless Sarah's prompt says to. Otherwise, show what changed and stop.
- Work on anything outside the slice marked ACTIVE in roadmap.md.

## Conventions
- Before showing code, explain each change in plain language and define technical terms in a few words.
- Keep changes small: one pull request per piece of work.
- Every Supabase table has row-level security turned on, so each user can read and change only their own rows.
- Skills are a fixed list: Reading, Writing, Listening, Speaking, Vocabulary, Grammar.
- When a change ships or breaks something, say which lines of project-state.md or roadmap.md should change.

## Current focus
See roadmap.md, work only on the slice marked ACTIVE.
