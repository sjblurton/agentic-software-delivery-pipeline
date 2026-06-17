import type { FormActionState } from "@/features/forms/lib/form-action-state";

export const initialStarterRecordActionState: FormActionState<{
  recordId: string;
}> = {
  status: "idle",
  fieldErrors: {},
};
