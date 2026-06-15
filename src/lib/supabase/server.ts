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

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            try {
              cookieStore.set(name, value, options);
            } catch (error) {
              if (!isReadonlyCookieStoreError(error)) {
                throw error;
              }
            }
          }
        },
      },
    },
  );
}
