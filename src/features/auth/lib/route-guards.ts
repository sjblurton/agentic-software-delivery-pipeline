import { getCurrentUser } from "@/lib/supabase/get-current-user";
import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  return user;
}

export async function requireGuest() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }
}
