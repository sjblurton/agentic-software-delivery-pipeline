import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/lib/route-guards", () => ({
  requireAuth: requireAuthMock,
}));

import DashboardLayout from "./layout";

describe("Dashboard layout guard", () => {
  beforeEach(() => {
    requireAuthMock.mockReset();
  });

  it("uses the reusable auth guard", async () => {
    requireAuthMock.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
    });

    await DashboardLayout({ children: <div>Dashboard content</div> });

    expect(requireAuthMock).toHaveBeenCalled();
  });
});
