// Loads and adds study tasks in Supabase's "tasks" table, using plain fetch
// calls like app/auth.ts does. Every request carries the signed-in person's
// access token; Supabase's row-level security rules use it to return and
// accept only that person's own tasks.

import { loadSession } from "./auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const SKILLS = [
  "Reading",
  "Writing",
  "Listening",
  "Speaking",
  "Vocabulary",
  "Grammar",
] as const;

export type Skill = (typeof SKILLS)[number];

export type Task = {
  id: number;
  title: string;
  skill: Skill;
  created_at: string;
};

export class TaskError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
  }
}

async function callTasks(query: string, init: RequestInit = {}): Promise<Task[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new TaskError("The site is missing its Supabase settings.", "config");
  }
  // loadSession refreshes the access token first if it has expired, so a tab
  // left open for hours still works.
  const session = await loadSession();
  if (!session) {
    throw new TaskError("Your sign-in has expired. Log out and log in again.", "signed_out");
  }

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/rest/v1/tasks?${query}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${session.accessToken}`,
        Prefer: "return=representation",
      },
    });
  } catch {
    throw new TaskError("Could not reach the server. Try again.", "network");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new TaskError(data?.message ?? "Something went wrong.", data?.code ?? "unknown");
  }
  return data as Task[];
}

const COLUMNS = "select=id,title,skill,created_at";

// Newest first.
export async function listTasks(): Promise<Task[]> {
  return callTasks(`${COLUMNS}&order=created_at.desc,id.desc`);
}

// Supabase fills in user_id itself from the access token.
export async function addTask(title: string, skill: Skill): Promise<Task> {
  const rows = await callTasks(COLUMNS, {
    method: "POST",
    body: JSON.stringify({ title, skill }),
  });
  return rows[0];
}
