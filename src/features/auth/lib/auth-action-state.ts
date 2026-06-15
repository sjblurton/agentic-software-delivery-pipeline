import type { FormActionState } from "@/features/forms/lib/form-action-state";

export type AuthActionState = FormActionState;

export const initialAuthActionState: AuthActionState = {
  status: "idle",
  fieldErrors: {},
};
