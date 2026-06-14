import { BootstrapStatus } from "@/features/bootstrap/components/bootstrap-status";
import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type HomePageProps = {
  searchParams?: Promise<{
    auth?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  const resolvedSearchParams = await searchParams;
  return (
    <main
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-6
        md:p-10"
    >
      <AuthStatusToast authStatus={resolvedSearchParams?.auth} />
      <div className="flex justify-end">
        <SignOutButton />
      </div>
      <BootstrapStatus />
    </main>
  );
}
