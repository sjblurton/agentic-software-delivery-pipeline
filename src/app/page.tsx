import { BootstrapStatus } from "@/features/bootstrap/components/bootstrap-status";
import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

type HomePageProps = {
  searchParams?: {
    auth?: string;
  };
};

export default function Home({ searchParams }: HomePageProps) {
  return (
    <main
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 p-6
        md:p-10"
    >
      <AuthStatusToast authStatus={searchParams?.auth} />
      <div className="flex justify-end">
        <SignOutButton />
      </div>
      <BootstrapStatus />
    </main>
  );
}
