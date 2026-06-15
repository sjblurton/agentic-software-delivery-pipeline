import { beforeEach, describe, expect, it, vi } from "vitest";

const requireGuestMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/lib/route-guards", () => ({
  requireGuest: requireGuestMock,
}));
vi.mock("@/features/auth/components/auth-form-container", () => ({
  AuthFormContainer: () => null,
}));
vi.mock("@/features/auth/components/auth-status-toast", () => ({
  AuthStatusToast: () => null,
}));

import SignInPage from "./page";

describe("SignInPage auth guard", () => {
  beforeEach(() => {
    requireGuestMock.mockReset();
  });

  it("uses the reusable guest guard", async () => {
    await SignInPage({});

    expect(requireGuestMock).toHaveBeenCalled();
  });
});
