import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/lib/route-guards", () => ({
  requireAuth: requireAuthMock,
}));
vi.mock("@/features/bootstrap/components/bootstrap-status", () => ({
  BootstrapStatus: () => null,
}));
vi.mock("@/features/auth/components/auth-status-toast", () => ({
  AuthStatusToast: () => null,
}));
vi.mock("@/features/auth/components/sign-out-button", () => ({
  SignOutButton: () => null,
}));

import DashboardPage from "./page";

describe("Dashboard page auth guard", () => {
  beforeEach(() => {
    requireAuthMock.mockReset();
  });

  it("uses the reusable auth guard", async () => {
    requireAuthMock.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
    });

    await DashboardPage({});

    expect(requireAuthMock).toHaveBeenCalled();
  });
});
