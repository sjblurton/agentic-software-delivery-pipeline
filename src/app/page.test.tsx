import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.hoisted(() => vi.fn());
const createClientMock = vi.hoisted(() => vi.fn());
const getUserMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ redirect: redirectMock }));
vi.mock("@/lib/supabase/server", () => ({ createClient: createClientMock }));
vi.mock("@/features/bootstrap/components/bootstrap-status", () => ({
  BootstrapStatus: () => null,
}));
vi.mock("@/features/auth/components/auth-status-toast", () => ({
  AuthStatusToast: () => null,
}));
vi.mock("@/features/auth/components/sign-out-button", () => ({
  SignOutButton: () => null,
}));

import Home from "./page";

describe("Home page auth guard", () => {
  beforeEach(() => {
    redirectMock.mockReset();
    getUserMock.mockReset();
    createClientMock.mockReset();
  });

  it("redirects to /auth/sign-in when not authenticated", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({ data: { user: null } }),
      },
    });

    await Home({});

    expect(redirectMock).toHaveBeenCalledWith("/auth/sign-in");
  });

  it("does not redirect when authenticated", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({
          data: { user: { id: "user-1", email: "test@example.com" } },
        }),
      },
    });

    await Home({});

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
