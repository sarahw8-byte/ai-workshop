"use client";

import { FormEvent, useEffect, useState } from "react";
import { SKILLS, Skill, Task, TaskError, addTask, listTasks } from "./tasks";

const MAX_TITLE = 200;

function friendlyError(err: unknown, fallback: string): string {
  if (err instanceof TaskError) {
    if (err.code === "PGRST205" || err.code === "42P01") {
      return "The tasks table is not set up in Supabase yet.";
    }
    return err.message;
  }
  return fallback;
}

// The signed-in person's tasks. page.tsx gives it a key of the person's
// email, so it starts fresh whenever a different person signs in.
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState<Skill | "">("");
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    listTasks()
      .then(setTasks)
      .catch((err) => setLoadError(friendlyError(err, "Could not load your tasks.")))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const text = title.trim();
    if (!text && !skill) {
      setFormError("Type a task and pick a skill.");
      return;
    }
    if (!text) {
      setFormError("Type a task first.");
      return;
    }
    if (!skill) {
      setFormError("Pick a skill first.");
      return;
    }

    setFormError("");
    setBusy(true);
    try {
      const task = await addTask(text, skill);
      setTasks((current) => [task, ...current]);
      setTitle("");
      setSkill("");
    } catch (err) {
      setFormError(friendlyError(err, "Could not add the task. Try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <h2>Your tasks</h2>

      <form onSubmit={handleAdd} noValidate>
        <label>
          Task
          <input
            type="text"
            maxLength={MAX_TITLE}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Skill
          <select value={skill} onChange={(e) => setSkill(e.target.value as Skill | "")}>
            <option value="">Pick a skill</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        {formError && (
          <p className="error" role="alert">
            {formError}
          </p>
        )}
        <button type="submit" disabled={busy}>
          {busy ? "Adding…" : "Add"}
        </button>
      </form>

      {loading ? (
        <p className="muted">Loading tasks…</p>
      ) : loadError ? (
        <p className="error" role="alert">
          {loadError}
        </p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <span className="skill-label">{task.skill}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
