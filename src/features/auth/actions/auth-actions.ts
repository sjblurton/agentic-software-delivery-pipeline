"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { AuthActionState } from "../lib/auth-action-state";
import { parseAuthCredentials } from "../lib/auth-schemas";

export async function signInAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsedCredentials = parseAuthCredentials(formData);
  if (!parsedCredentials.ok) {
    return {
      status: "error",
      fieldErrors: parsedCredentials.fieldErrors,
    };
  }

  const supabaseClient = await createClient();
  const signInResult = await supabaseClient.auth.signInWithPassword(
    parsedCredentials.credentials,
  );

  if (signInResult.error) {
    return {
      status: "error",
      message: signInResult.error.message,
      fieldErrors: {},
    };
  }

  redirect("/dashboard?auth=sign-in-success");
}

export async function signUpAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsedCredentials = parseAuthCredentials(formData);
  if (!parsedCredentials.ok) {
    return {
      status: "error",
      fieldErrors: parsedCredentials.fieldErrors,
    };
  }

  const supabaseClient = await createClient();
  const signUpResult = await supabaseClient.auth.signUp(
    parsedCredentials.credentials,
  );

  if (signUpResult.error) {
    return {
      status: "error",
      message: signUpResult.error.message,
      fieldErrors: {},
    };
  }

  redirect("/dashboard?auth=sign-up-success");
}

export async function signOutAction(
  previousState: AuthActionState,
): Promise<AuthActionState> {
  const supabaseClient = await createClient();
  const signOutResult = await supabaseClient.auth.signOut();

  if (signOutResult.error) {
    return {
      status: "error",
      message: signOutResult.error.message,
      fieldErrors: previousState.fieldErrors,
    } satisfies AuthActionState;
  }

  redirect("/auth/sign-in?auth=sign-out-success");
}
