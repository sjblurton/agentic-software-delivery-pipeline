import { describe, expect, it, vi } from "vitest";

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

describe("DashboardPage", () => {
  it("renders its page content", async () => {
    const result = await DashboardPage({});
    expect(result).toBeTruthy();
  });
});
