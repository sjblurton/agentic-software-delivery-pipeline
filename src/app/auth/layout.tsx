import { requireGuest } from "@/features/auth/lib/route-guards";

type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await requireGuest();
  return children;
}
