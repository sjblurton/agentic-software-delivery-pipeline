"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  initialStarterRecordActionState,
  submitStarterRecordAction,
} from "../actions/starter-record-actions";
import { DatabaseStarterView } from "./database-starter-view";

type StarterRecordRow = {
  id: string;
  name: string;
  createdAt: Date;
};

type DatabaseStarterContainerProps = {
  records: StarterRecordRow[];
  onSuccessfulCreate: () => void;
};

export function DatabaseStarterContainer({
  records,
  onSuccessfulCreate,
}: DatabaseStarterContainerProps) {
  const [state, formAction, isPending] = useActionState(
    submitStarterRecordAction,
    initialStarterRecordActionState,
  );
  const refreshedRecordId = useRef<string | null>(null);

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    const createdRecordId = state.data?.recordId ?? null;
    if (!createdRecordId || refreshedRecordId.current === createdRecordId) {
      return;
    }

    refreshedRecordId.current = createdRecordId;
    onSuccessfulCreate();
  }, [onSuccessfulCreate, state]);

  return (
    <DatabaseStarterView
      records={records}
      formFieldErrors={state.fieldErrors}
      formStatus={state.status}
      formMessage={state.message}
      isSubmitting={isPending}
      formAction={formAction}
    />
  );
}
