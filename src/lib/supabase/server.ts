import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function isReadonlyCookieStoreError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.includes(
      "Cookies can only be modified in a Server Action or Route Handler",
    )
  );
}

function setCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  name: string,
  value: string,
  options: Parameters<typeof cookieStore.set>[2],
) {
  try {
    cookieStore.set(name, value, options);
  } catch (error) {
    if (!isReadonlyCookieStoreError(error)) {
      throw error;
    }
  }
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            setCookie(cookieStore, name, value, options);
          }
        },
      },
    },
  );
}
