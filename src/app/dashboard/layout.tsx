import { requireAuth } from "@/features/auth/lib/route-guards";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  await requireAuth();
  return children;
}
