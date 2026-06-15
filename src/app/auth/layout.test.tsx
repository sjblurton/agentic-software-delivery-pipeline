import { beforeEach, describe, expect, it, vi } from "vitest";

const requireGuestMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/lib/route-guards", () => ({
  requireGuest: requireGuestMock,
}));

import AuthLayout from "./layout";

describe("Auth layout guard", () => {
  beforeEach(() => {
    requireGuestMock.mockReset();
  });

  it("uses the reusable guest guard", async () => {
    await AuthLayout({ children: <div>Auth content</div> });

    expect(requireGuestMock).toHaveBeenCalled();
  });
});
