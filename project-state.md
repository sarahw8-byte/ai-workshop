# Project state
Last updated: 2026-09-23

## Works
- Live Next.js site deployed on Vercel at ai-workshop-gamma-three.vercel.app.
- A Supabase project exists and is linked to the repo (Sarah's report; not checked by Claude).

## Broken or flaky
- Nothing known. The site does not use Supabase yet, so nothing that talks to Supabase has been tested.

## Environment notes
- Next.js 16.3.5, React 19.3.0, TypeScript 5.9.3 (from package.json on main, 2026-09-23).
- No Supabase library is installed yet. Slice 1 needs one; ask Sarah before adding it.
- package.json scripts: dev, build, start. There is no lint or test script.
- The name in package.json is still "sarah-wong-personal-site", left over from an earlier project. Harmless; rename only if Sarah asks.
- Not yet confirmed where the Supabase project URL and key live: Vercel environment variables, .env.local, or both.

## Next session
- Start slice 1: Sign up and log in.
- Decide whether to turn off Supabase email confirmation (recommended: off, so fake test emails work).
- Approve or reject adding the Supabase libraries @supabase/supabase-js and @supabase/ssr.
- Confirm the Supabase project URL and key are set in Vercel and in .env.local.
