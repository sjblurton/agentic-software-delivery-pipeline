export type FormActionState<T = void> = {
  status: "success" | "error" | "idle";
  fieldErrors: Record<string, string[]>;
  message?: string;
  data?: T;
};
