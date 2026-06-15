"use client";

import { Button } from "@/components/ui/button/button";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { signOutAction } from "../actions/auth-actions";
import { initialAuthActionState } from "../lib/auth-action-state";

export function SignOutButton() {
  const [state, signOutFormAction, isPending] = useActionState(
    signOutAction,
    initialAuthActionState,
  );
  const currentState = state ?? initialAuthActionState;
  const previousToastMessage = useRef<string | null>(null);

  useEffect(() => {
    if (currentState.status !== "error") {
      return;
    }

    const errorMessage =
      currentState.message ?? "Sign out failed. Please try again in a moment.";
    if (previousToastMessage.current === errorMessage) {
      return;
    }

    previousToastMessage.current = errorMessage;
    toast.error(errorMessage);
  }, [currentState]);

  return (
    <form action={signOutFormAction}>
      <Button type="submit" variant="secondary" disabled={isPending}>
        Sign out
      </Button>
    </form>
  );
}
