import type { AuthFieldErrors } from "./auth-schemas";

export type AuthActionState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors: AuthFieldErrors;
};

export const initialAuthActionState: AuthActionState = {
  status: "idle",
  fieldErrors: {},
};
