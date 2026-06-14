"use server";

import type { User } from "@supabase/supabase-js";
import { createClient } from "./server";

export const getCurrentUser = async () => {
  const authMode = process.env.E2E_AUTH_MODE;
  const shouldBypassAuth = process.env.CI === "true" && Boolean(authMode);

  if (shouldBypassAuth && authMode === "logged-out") {
    return null;
  }

  if (shouldBypassAuth && authMode === "logged-in") {
    return {
      id: process.env.E2E_TEST_USER_ID ?? "e2e-user-id",
      email: process.env.E2E_TEST_USER_EMAIL ?? "e2e@example.com",
    } as User;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
