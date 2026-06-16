import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { requireAuth } from "@/features/auth/lib/route-guards";
import { DatabaseStarterPageShell } from "@/features/database-starter/components/database-starter-page-shell";
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
      <div className="flex justify-end">
        <SignOutButton />
      </div>
      <DatabaseStarterPageShell records={records} />
    </main>
  );
}
