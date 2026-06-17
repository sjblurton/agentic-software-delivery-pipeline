import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAuth } from "@/features/auth/lib/route-guards";
import { DatabaseStarterPageShell } from "@/features/database-starter/components/database-starter-page/database-starter-page-shell";
import { listStarterRecords } from "@/features/database-starter/lib/starter-records-repository";
import { db } from "@/lib/db/client";

export default async function DatabaseStarterPage() {
  await requireAuth();
  const records = await listStarterRecords(db);

  return (
    <main
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-6
        md:p-10"
    >
      <Link
        href="/dashboard"
        className="inline-flex w-fit items-center gap-2 text-sm
          text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
      <DatabaseStarterPageShell records={records} />
    </main>
  );
}
