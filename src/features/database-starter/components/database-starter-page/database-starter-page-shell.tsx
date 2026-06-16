"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { DatabaseStarterContainer } from "../database-starter/database-starter-container";

type StarterRecordRow = {
  id: string;
  name: string;
  createdAt: Date;
};

type DatabaseStarterPageShellProps = {
  records: StarterRecordRow[];
};

export function DatabaseStarterPageShell({
  records,
}: DatabaseStarterPageShellProps) {
  const router = useRouter();
  const refreshRecords = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <DatabaseStarterContainer
      records={records}
      onSuccessfulCreate={refreshRecords}
    />
  );
}
