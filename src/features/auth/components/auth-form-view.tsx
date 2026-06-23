import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Input } from "@/components/ui/input/input";
import type { AuthFieldErrors } from "../lib/auth-schemas";
import { FieldLabel } from "@/components/ui/field-label/field-label";

type AuthMode = "sign-in" | "sign-up";

type AuthFormViewProps = {
  mode: AuthMode;
  isPending: boolean;
  fieldErrors: AuthFieldErrors;
  message?: string;
};

const contentByMode: Record<
  AuthMode,
  {
    title: string;
    description: string;
    submitLabel: string;
    alternateLabel: string;
    alternateHref: string;
  }
> = {
  "sign-in": {
    title: "Sign in",
    description: "Use your email and password to continue.",
    submitLabel: "Sign in with email",
    alternateLabel: "Need an account? Sign up",
    alternateHref: "/auth/sign-up",
  },
  "sign-up": {
    title: "Create account",
    description: "Create a new account with email and password.",
    submitLabel: "Create account",
    alternateLabel: "Already have an account? Sign in",
    alternateHref: "/auth/sign-in",
  },
};

export function AuthFormView({
  mode,
  isPending,
  fieldErrors,
  message,
}: AuthFormViewProps) {
  const content = contentByMode[mode];
  const emailError = fieldErrors.email?.[0];
  const passwordError = fieldErrors.password?.[0];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {message ? (
            <p className="text-destructive text-sm" role="alert">
              {message}
            </p>
          ) : null}
          <div className="flex flex-col gap-2">
            <FieldLabel data-invalid={Boolean(emailError)} htmlFor="email">
              Email
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
              required
            />
            {emailError ? (
              <p className="text-destructive text-sm" role="alert">
                {emailError}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel
              data-invalid={Boolean(passwordError)}
              htmlFor="password"
            >
              Password
            </FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === "sign-in" ? "current-password" : "new-password"
              }
              aria-invalid={Boolean(passwordError)}
              required
            />
            {passwordError ? (
              <p className="text-destructive text-sm" role="alert">
                {passwordError}
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3">
        <Button type="submit" disabled={isPending}>
          {content.submitLabel}
        </Button>
        <a
          href={content.alternateHref}
          className="text-muted-foreground text-center text-sm
            underline-offset-4 hover:underline"
        >
          {content.alternateLabel}
        </a>
      </CardFooter>
    </Card>
  );
}
