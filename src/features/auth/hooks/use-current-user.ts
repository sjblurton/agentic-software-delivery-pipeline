"use client";

import { useEffect, useState } from "react";

interface CurrentUser {
  id: string;
  email: string | undefined;
}

interface UseCurrentUserResult {
  user: CurrentUser | null;
  isLoading: boolean;
  isError: boolean;
}

export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/v1/me")
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json() as Promise<CurrentUser>;
      })
      .then((data) => {
        if (!cancelled) {
          setUser(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, isLoading, isError };
}
