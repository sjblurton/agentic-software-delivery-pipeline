import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.hoisted(() => vi.fn());
const createClientMock = vi.hoisted(() => vi.fn());
const getUserMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ redirect: redirectMock }));
vi.mock("@/lib/supabase/server", () => ({ createClient: createClientMock }));
vi.mock("@/features/auth/components/auth-form-container", () => ({
  AuthFormContainer: () => null,
}));
vi.mock("@/features/auth/components/auth-status-toast", () => ({
  AuthStatusToast: () => null,
}));

import SignInPage from "./page";

describe("SignInPage auth guard", () => {
  beforeEach(() => {
    redirectMock.mockReset();
    getUserMock.mockReset();
    createClientMock.mockReset();
  });

  it("redirects to / when already authenticated", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({
          data: { user: { id: "user-1", email: "test@example.com" } },
        }),
      },
    });

    await SignInPage({});

    expect(redirectMock).toHaveBeenCalledWith("/");
  });

  it("does not redirect when not authenticated", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({ data: { user: null } }),
      },
    });

    await SignInPage({});

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
