import { CheckCircle2 } from "lucide-react";
import { BootstrapDemoActions } from "./bootstrap-demo-actions";

const checks = [
  "Next.js App Router + TypeScript strict baseline",
  "pnpm package manager and baseline scripts",
  "Supabase client/server helpers scaffolded",
  "Drizzle config and schema scaffolded",
  "Tailwind + shadcn/ui atom baseline (Button)",
  "Form and boundary validation dependencies installed",
];

export function BootstrapStatus() {
  return (
    <section
      className="bg-card text-card-foreground w-full rounded-xl border p-6
        shadow-sm md:p-8"
    >
      <p className="text-muted-foreground text-sm font-medium">Issue #8</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
        Bootstrap baseline completed
      </h1>
      <p className="text-muted-foreground mt-3 max-w-3xl">
        This repository now has the runnable baseline needed for tracer slices #
        2 through #7.
      </p>

      <ul className="mt-6 space-y-3">
        {checks.map((check) => (
          <li
            key={check}
            className="flex items-center gap-3 text-sm md:text-base"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{check}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <BootstrapDemoActions />
      </div>
    </section>
  );
}
