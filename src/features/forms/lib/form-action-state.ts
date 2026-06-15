export type FormActionState<T = never> = {
  status: "success" | "error" | "idle";
  fieldErrors: Record<string, string[]>;
  message?: string;
  data?: T;
};
