"use server";

import type { FormActionState } from "@/features/forms/lib/form-action-state";
import { db } from "@/lib/db/client";
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

  let createdStarterRecord;
  try {
    createdStarterRecord = await createStarterRecord(db, parsedInput.input);
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        fieldErrors: {},
        message: error.message,
      };
    }

    throw error;
  }

  return {
    status: "success",
    fieldErrors: {},
    message: "Starter record created.",
    data: { recordId: createdStarterRecord.id },
  };
}
