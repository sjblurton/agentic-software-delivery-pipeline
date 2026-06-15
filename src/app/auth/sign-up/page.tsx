import { AuthFormContainer } from "@/features/auth/components/auth-form-container";
import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";
import { requireGuest } from "@/features/auth/lib/route-guards";

type SignUpPageProps = {
  searchParams?: Promise<{
    auth?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  await requireGuest();

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
