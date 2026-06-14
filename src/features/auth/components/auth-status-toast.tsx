"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

type AuthStatusToastProps = {
  authStatus?: string;
};

const successMessageByStatus: Record<string, string> = {
  "sign-in-success": "Signed in successfully.",
  "sign-up-success": "Account created successfully.",
  "sign-out-success": "Signed out successfully.",
};

export function AuthStatusToast({ authStatus }: AuthStatusToastProps) {
  const shownStatus = useRef<string | null>(null);

  useEffect(() => {
    if (!authStatus) {
      return;
    }

    const successMessage = successMessageByStatus[authStatus];
    if (!successMessage || shownStatus.current === authStatus) {
      return;
    }

    shownStatus.current = authStatus;
    toast.success(successMessage);
  }, [authStatus]);

  return null;
}
