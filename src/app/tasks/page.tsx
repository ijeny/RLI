import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/types/database.types";

export default async function TasksPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, description, status, due_date, projects(name)")
    .order("created_at", { ascending: true });

  type Task = Database["public"]["Tables"]["tasks"]["Row"];
  type TaskWithProject = Task & { projects: { name: string } | null };
  const tasks = (data as TaskWithProject[] | null) ?? [];

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Kembali ke overview
        </Link>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-primary">Execution layer</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Dashboard tugas</h1>
          </div>
          <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
            {error ? "Database unavailable" : `${tasks.length} tasks synced`}
          </span>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-wrap items-center gap-4 border-b border-border p-5 last:border-b-0">
              <span className={`size-2 rounded-full ${task.status === "done" ? "bg-emerald-500" : task.status === "in_progress" ? "bg-amber-500" : "bg-primary"}`} />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{task.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{task.projects?.name ?? "Unassigned project"}</p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{task.status.replace("_", " ")}</span>
            </div>
          ))}
          {!tasks.length && <p className="p-8 text-sm text-muted-foreground">Belum ada task untuk ditampilkan.</p>}
        </div>
      </div>
    </main>
  );
}
