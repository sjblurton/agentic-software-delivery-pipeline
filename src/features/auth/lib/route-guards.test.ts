import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.hoisted(() => vi.fn());
const getCurrentUserMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/lib/supabase/get-current-user", () => ({
  getCurrentUser: getCurrentUserMock,
}));

import { requireAuth, requireGuest } from "./route-guards";

describe("route guards", () => {
  beforeEach(() => {
    getCurrentUserMock.mockReset();
    redirectMock.mockReset();
  });

  it("redirects guests to sign-in for requireAuth", async () => {
    getCurrentUserMock.mockResolvedValue(null);

    await requireAuth();

    expect(redirectMock).toHaveBeenCalledWith("/auth/sign-in");
  });

  it("returns the current user for requireAuth when authenticated", async () => {
    const user = { id: "user-1", email: "person@example.com" };
    getCurrentUserMock.mockResolvedValue(user);

    const result = await requireAuth();

    expect(result).toEqual(user);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("redirects authenticated users away from guest pages", async () => {
    getCurrentUserMock.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
    });

    await requireGuest();

    expect(redirectMock).toHaveBeenCalledWith("/dashboard");
  });

  it("allows guests on guest pages", async () => {
    getCurrentUserMock.mockResolvedValue(null);

    await requireGuest();

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
