import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { BootstrapStatus } from "@/features/bootstrap/components/bootstrap-status";

type DashboardPageProps = {
  searchParams?: Promise<{
    auth?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
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
