import { AuthFormContainer } from "@/features/auth/components/auth-form-container";
import { AuthStatusToast } from "@/features/auth/components/auth-status-toast";

type SignUpPageProps = {
  searchParams?: {
    auth?: string;
  };
};

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  return (
    <main
      className="mx-auto flex w-full max-w-4xl flex-1 items-center
        justify-center p-6 md:p-10"
    >
      <AuthStatusToast authStatus={searchParams?.auth} />
      <AuthFormContainer mode="sign-up" />
    </main>
  );
}
