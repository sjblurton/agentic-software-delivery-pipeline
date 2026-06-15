import { beforeEach, describe, expect, it, vi } from "vitest";

const createClientMock = vi.hoisted(() => vi.fn());
const getUserMock = vi.hoisted(() => vi.fn());

vi.mock("./server", () => ({
  createClient: createClientMock,
}));

import { getCurrentUser } from "./get-current-user";

describe("getCurrentUser", () => {
  beforeEach(() => {
    delete process.env.CI;
    delete process.env.E2E_AUTH_MODE;
    delete process.env.E2E_TEST_USER_ID;
    delete process.env.E2E_TEST_USER_EMAIL;

    createClientMock.mockReset();
    getUserMock.mockReset();
  });

  it("treats an invalid refresh token as logged out", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockRejectedValue(
          new Error("Invalid Refresh Token: Refresh Token Not Found"),
        ),
      },
    });

    await expect(getCurrentUser()).resolves.toBeNull();
  });

  it("rethrows unexpected auth errors", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockRejectedValue(new Error("network down")),
      },
    });

    await expect(getCurrentUser()).rejects.toThrow("network down");
  });
});
