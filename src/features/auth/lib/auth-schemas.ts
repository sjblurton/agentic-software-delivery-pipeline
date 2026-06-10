import { z } from "zod";

export type AuthCredentials = {
  email: string;
  password: string;
};

const authCredentialsSchema: z.ZodType<AuthCredentials> = z.object({
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be at most 72 characters."),
});

export type AuthFieldErrors = Partial<Record<keyof AuthCredentials, string[]>>;

type ParseAuthCredentialsSuccess = {
  ok: true;
  credentials: AuthCredentials;
};

type ParseAuthCredentialsFailure = {
  ok: false;
  fieldErrors: AuthFieldErrors;
};

export type ParseAuthCredentialsResult =
  | ParseAuthCredentialsSuccess
  | ParseAuthCredentialsFailure;

export function parseAuthCredentials(
  formData: FormData,
): ParseAuthCredentialsResult {
  const parsedCredentials = authCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedCredentials.success) {
    return {
      ok: false,
      fieldErrors: parsedCredentials.error.flatten().fieldErrors,
    };
  }

  return {
    ok: true,
    credentials: parsedCredentials.data,
  };
}
