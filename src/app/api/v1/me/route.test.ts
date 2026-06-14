import { beforeEach, describe, expect, it, vi } from "vitest";

const createClientMock = vi.hoisted(() => vi.fn());
const getUserMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({ createClient: createClientMock }));

import { GET } from "./route";

describe("GET /api/v1/me", () => {
  beforeEach(() => {
    createClientMock.mockReset();
    getUserMock.mockReset();
  });

  it("returns 200 with id and email when authenticated", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({
          data: { user: { id: "user-1", email: "test@example.com" } },
        }),
      },
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ id: "user-1", email: "test@example.com" });
  });

  it("returns 401 when not authenticated", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({
          data: { user: null },
        }),
      },
    });

    const response = await GET();

    expect(response.status).toBe(401);
  });

  it("returns 401 when getUser returns an error", async () => {
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock.mockResolvedValue({
          data: { user: null },
          error: { message: "Session expired" },
        }),
      },
    });

    const response = await GET();

    expect(response.status).toBe(401);
  });
});
