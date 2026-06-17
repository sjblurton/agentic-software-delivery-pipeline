import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialStarterRecordActionState } from "./starter-record-action-state";
import { submitStarterRecordAction } from "./starter-record-actions";

const createStarterRecordMock = vi.hoisted(() => vi.fn());
const dbMock = vi.hoisted(() => ({}));
const requireAuthMock = vi.hoisted(() => vi.fn());

vi.mock("../lib/starter-records-repository", () => ({
  createStarterRecord: createStarterRecordMock,
}));

vi.mock("@/lib/db/client", () => ({
  db: dbMock,
}));

vi.mock("@/features/auth/lib/route-guards", () => ({
  requireAuth: requireAuthMock,
}));

function createStarterRecordFormData(name: string) {
  const formData = new FormData();
  formData.set("name", name);
  return formData;
}

describe("submitStarterRecordAction", () => {
  beforeEach(() => {
    createStarterRecordMock.mockReset();
    requireAuthMock.mockReset();
    requireAuthMock.mockResolvedValue({
      id: "user-1",
      email: "person@example.com",
    });
  });

  it("returns field errors when the name is blank at the boundary", async () => {
    const result = await submitStarterRecordAction(
      initialStarterRecordActionState,
      createStarterRecordFormData(""),
    );

    expect(result).toEqual({
      status: "error",
      fieldErrors: {
        name: ["Please enter a name."],
      },
    });
    expect(requireAuthMock).toHaveBeenCalledTimes(1);
    expect(createStarterRecordMock).not.toHaveBeenCalled();
  });

  it("creates a record and returns success state", async () => {
    createStarterRecordMock.mockResolvedValue({
      id: "8b07b697-57e7-4464-8bb2-c9db49f4db16",
      name: "My record",
      createdAt: new Date("2026-06-16T09:30:00.000Z"),
    });

    const result = await submitStarterRecordAction(
      initialStarterRecordActionState,
      createStarterRecordFormData("My record"),
    );

    expect(createStarterRecordMock).toHaveBeenCalledWith(expect.any(Object), {
      name: "My record",
    });
    expect(requireAuthMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: "success",
      fieldErrors: {},
      message: "Starter record created.",
      data: { recordId: "8b07b697-57e7-4464-8bb2-c9db49f4db16" },
    });
  });

  it("returns an actionable error state when record creation fails", async () => {
    createStarterRecordMock.mockRejectedValue(
      new Error("Database temporarily unavailable."),
    );

    const result = await submitStarterRecordAction(
      initialStarterRecordActionState,
      createStarterRecordFormData("My record"),
    );

    expect(result).toEqual({
      status: "error",
      fieldErrors: {},
      message: "Database temporarily unavailable.",
    });
  });

  it("requires authentication before attempting record creation", async () => {
    requireAuthMock.mockRejectedValue(new Error("Unauthorized"));

    await expect(
      submitStarterRecordAction(
        initialStarterRecordActionState,
        createStarterRecordFormData("My record"),
      ),
    ).rejects.toThrow("Unauthorized");
    expect(createStarterRecordMock).not.toHaveBeenCalled();
  });
});
