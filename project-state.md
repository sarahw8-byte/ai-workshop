# Project state
Last updated: 2026-10-14

## Works
- Live Next.js site deployed on Vercel at ai-workshop-gamma-three.vercel.app. Vercel publishes the main branch.
- Slice 1, sign up and log in (pull request #4, merged 2026-10-14). Sarah tested done-criteria (a) to (d) on the Vercel preview against the real Supabase project; all passed.
- Sign-in talks to Supabase Auth with plain fetch in app/auth.ts. No Supabase library is installed.

## Broken or flaky
- Nothing known.

## Environment notes
- Next.js 16.3.5, React 19.3.0, TypeScript 5.9.3.
- Vercel environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY exist for Production. For previews they are set only for the branch claude/bold-galileo-28m13k (Vercel's edit screen did not offer a general Preview option). New branches' previews will show "The site is missing its Supabase settings." until this is fixed.
- GitHub's default branch is claude/sarah-wong-personal-site-qf2h6k, a leftover from the personal site. It should be main. Sarah changes this in GitHub settings.
- package.json scripts: dev, build, start. There is no lint or test script.
- The name in package.json is still "sarah-wong-personal-site". Harmless; rename only if Sarah asks.
- Supabase email confirmation appears to be off: sign-up with test1@example.com signed in straight away.

## Next session
- Start slice 2: Add tasks that stay. It needs a tasks table in Supabase with row-level security on.
- Make Supabase settings available to all preview branches in Vercel, so slice 2's preview can sign in.
- Switch GitHub's default branch to main.
