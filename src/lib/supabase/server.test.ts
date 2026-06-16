import { beforeEach, describe, expect, it, vi } from "vitest";

const createServerClientMock = vi.hoisted(() => vi.fn());
const cookiesMock = vi.hoisted(() => vi.fn());
const cookieStoreSetMock = vi.hoisted(() => vi.fn());
const cookieStoreGetAllMock = vi.hoisted(() => vi.fn());

vi.mock("@/env", () => ({
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://project.example.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
  },
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: createServerClientMock,
}));

vi.mock("next/headers", () => ({
  cookies: cookiesMock,
}));

import { createClient } from "./server";

describe("createClient cookies bridge", () => {
  beforeEach(() => {
    createServerClientMock.mockReset();
    cookiesMock.mockReset();
    cookieStoreSetMock.mockReset();
    cookieStoreGetAllMock.mockReset();

    cookieStoreGetAllMock.mockReturnValue([]);
    cookiesMock.mockResolvedValue({
      getAll: cookieStoreGetAllMock,
      set: cookieStoreSetMock,
    });
  });

  it("ignores the known cookie mutation error outside actions and handlers", async () => {
    cookieStoreSetMock.mockImplementation(() => {
      throw new Error(
        "Cookies can only be modified in a Server Action or Route Handler.",
      );
    });

    const client = { auth: {} };
    createServerClientMock.mockImplementation((_url, _key, options) => {
      options.cookies.setAll([
        { name: "sb-test", value: "token", options: {} },
      ]);
      return client;
    });

    await expect(createClient()).resolves.toBe(client);
  });

  it("rethrows unexpected cookie write errors", async () => {
    cookieStoreSetMock.mockImplementation(() => {
      throw new Error("unexpected write failure");
    });

    createServerClientMock.mockImplementation((_url, _key, options) => {
      options.cookies.setAll([
        { name: "sb-test", value: "token", options: {} },
      ]);
      return { auth: {} };
    });

    await expect(createClient()).rejects.toThrow("unexpected write failure");
  });
});
