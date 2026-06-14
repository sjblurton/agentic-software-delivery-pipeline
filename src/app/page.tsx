import { BootstrapStatus } from "@/features/bootstrap/components/bootstrap-status";
import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

type HomePageProps = {
  searchParams?: Promise<{
    auth?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
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
