import { AuthFormContainer } from "@/features/auth/components/auth-form-container";
import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";
import { getCurrentUser } from "@/lib/supabase/get-current-user";
import { redirect } from "next/navigation";

type SignUpPageProps = {
  searchParams?: Promise<{
    auth?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;
  return (
    <main
      className="mx-auto flex w-full max-w-4xl flex-1 items-center
        justify-center p-6 md:p-10"
    >
      <AuthStatusToast authStatus={resolvedSearchParams?.auth} />
      <AuthFormContainer mode="sign-up" />
    </main>
  );
}
