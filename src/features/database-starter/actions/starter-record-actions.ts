"use server";

import type { FormActionState } from "@/features/forms/lib/form-action-state";
import { db } from "@/lib/db/client";
import { revalidatePath } from "next/cache";
import { createStarterRecord } from "../lib/starter-records-repository";
import { parseStarterRecordInput } from "../lib/starter-record-schemas";

export const initialStarterRecordActionState: FormActionState<{
  recordId: string;
}> = {
  status: "idle",
  fieldErrors: {},
};

export async function submitStarterRecordAction(
  _previousState: FormActionState<{ recordId: string }>,
  formData: FormData,
): Promise<FormActionState<{ recordId: string }>> {
  const parsedInput = parseStarterRecordInput(formData);

  if (!parsedInput.ok) {
    return {
      status: "error",
      fieldErrors: parsedInput.fieldErrors,
    };
  }

  const createdStarterRecord = await createStarterRecord(db, parsedInput.input);

  revalidatePath("/dashboard");

  return {
    status: "success",
    fieldErrors: {},
    message: "Starter record created.",
    data: { recordId: createdStarterRecord.id },
  };
}
