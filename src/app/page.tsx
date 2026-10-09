import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import type {
  Database,
  ProjectStatus,
} from "@/types/database.types";

const statusLabel: Record<ProjectStatus, string> = {
  todo: "Planned",
  in_progress: "In progress",
  done: "Delivered",
};

const statusStyle: Record<ProjectStatus, string> = {
  todo: "border-border bg-muted text-muted-foreground",
  in_progress: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  done: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

export default async function HomePage() {
  const supabase = await createClient();
  const [
    { data: projects, error: projectsError },
    { count: taskCount },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("id, name, description, budget, status")
      .order("created_at", { ascending: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
  ]);

  const typedProjects =
    (projects as Database["public"]["Tables"]["projects"]["Row"][] | null) ??
    [];
  const totalBudget = typedProjects.reduce(
    (sum, project) => sum + Number(project.budget),
    0,
  );
  const hasConnection = !projectsError;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-0 h-[540px] bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/.18),transparent_42%),radial-gradient(circle_at_20%_20%,hsl(var(--accent)/.12),transparent_30%)]" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">S</span>
          <span>Serverless Odyssey</span>
        </Link>
        <Link href="/tasks" className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:block">
          Task workspace <span aria-hidden="true">↗</span>
        </Link>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="flex flex-col justify-center">
          <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className={`size-1.5 rounded-full ${hasConnection ? "bg-emerald-500" : "bg-red-500"}`} />
            {hasConnection ? "Supabase connection verified" : "Supabase connection unavailable"}
          </div>
          <p className="mb-5 text-sm font-medium uppercase tracking-[.24em] text-primary">The Serverless Odyssey</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-7xl">
            Ship ideas with a <span className="bg-gradient-to-r from-primary via-violet-500 to-cyan-500 bg-clip-text text-transparent">calmer</span> data layer.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            A focused command center for turning ambitious serverless products into deliberate, observable progress.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/tasks" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl">
              Buka Dashboard Tugas <span aria-hidden="true">→</span>
            </Link>
            <a href="#architecture" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground transition hover:border-primary/40">
              Lihat arsitektur
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-md rounded-[2rem] border border-border bg-card/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs uppercase tracking-[.18em] text-muted-foreground">Live portfolio</p>
                <p className="mt-1 text-xl font-semibold">Mission control</p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">2026</span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-5">
              <Metric label="Active projects" value={String(typedProjects.length).padStart(2, "0")} />
              <Metric label="Tracked tasks" value={String(taskCount ?? 0).padStart(2, "0")} />
            </div>
            <div className="space-y-3">
              {typedProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{project.name}</p>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-medium ${statusStyle[project.status]}`}>
                      {statusLabel[project.status]}
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${project.status === "done" ? "w-full bg-emerald-500" : project.status === "in_progress" ? "w-2/3 bg-amber-500" : "w-1/3 bg-primary"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="relative border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-8 sm:grid-cols-3 lg:px-8">
          <ArchitectureItem index="01" name="profiles" detail="Identity & ownership" />
          <ArchitectureItem index="02" name="projects" detail="Budgets & delivery" />
          <ArchitectureItem index="03" name="tasks" detail="Execution & momentum" />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-primary">From the database</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Projects in motion</h2>
          </div>
          <p className="text-sm text-muted-foreground">Total planned budget · ${totalBudget.toLocaleString("en-US")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {typedProjects.map((project) => (
            <article key={project.id} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">/{project.name.toLowerCase().replaceAll(" ", "-")}</span>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusStyle[project.status]}`}>{statusLabel[project.status]}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold">{project.name}</h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">{project.description}</p>
              <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                Budget <span className="float-right font-semibold text-card-foreground">${Number(project.budget).toLocaleString("en-US")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-border bg-background/70 p-4"><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>;
}

function ArchitectureItem({ index, name, detail }: { index: string; name: string; detail: string }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 p-4"><span className="font-mono text-xs text-primary">{index}</span><div><p className="font-mono text-sm">{name}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div></div>;
}
