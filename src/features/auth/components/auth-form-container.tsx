"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  initialAuthActionState,
  type AuthActionState,
} from "../lib/auth-action-state";
import { signInAction, signUpAction } from "../actions/auth-actions";
import { AuthFormView } from "./auth-form-view";

type AuthMode = "sign-in" | "sign-up";

type AuthFormContainerProps = {
  mode: AuthMode;
};

const authActionByMode: Record<
  AuthMode,
  (
    _previousState: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>
> = {
  "sign-in": signInAction,
  "sign-up": signUpAction,
};

const defaultErrorMessageByMode: Record<AuthMode, string> = {
  "sign-in": "Sign in failed. Please review your details and try again.",
  "sign-up": "Sign up failed. Please review your details and try again.",
};

export function AuthFormContainer({ mode }: AuthFormContainerProps) {
  const [state, formAction, isPending] = useActionState(
    authActionByMode[mode],
    initialAuthActionState,
  );
  const currentState = state ?? initialAuthActionState;
  const previousToastMessage = useRef<string | null>(null);

  useEffect(() => {
    if (currentState.status !== "error") {
      return;
    }

    const errorMessage =
      currentState.message ?? defaultErrorMessageByMode[mode];
    if (previousToastMessage.current === errorMessage) {
      return;
    }

    previousToastMessage.current = errorMessage;
    toast.error(errorMessage);
  }, [currentState, mode]);

  return (
    <form action={formAction}>
      <AuthFormView
        mode={mode}
        isPending={isPending}
        fieldErrors={currentState.fieldErrors}
        message={currentState.message}
      />
    </form>
  );
}
