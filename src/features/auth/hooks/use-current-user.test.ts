import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCurrentUser } from "./use-current-user";

const fetchMock = vi.fn();

vi.stubGlobal("fetch", fetchMock);

describe("useCurrentUser", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("returns isLoading true initially then user when authenticated", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: "user-1", email: "test@example.com" }),
    });

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toEqual({
      id: "user-1",
      email: "test@example.com",
    });
    expect(result.current.isError).toBe(false);
    expect(fetchMock).toHaveBeenCalledWith("/api/v1/me");
  });

  it("returns null user when unauthenticated (401)", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: "Unauthorized" }),
    });

    const { result } = renderHook(() => useCurrentUser());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toBeNull();
    expect(result.current.isError).toBe(false);
  });

  it("returns isError true when fetch throws", async () => {
    fetchMock.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCurrentUser());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toBeNull();
    expect(result.current.isError).toBe(true);
  });
});
