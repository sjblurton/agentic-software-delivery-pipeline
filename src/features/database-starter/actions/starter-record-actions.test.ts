import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  initialStarterRecordActionState,
  submitStarterRecordAction,
} from "./starter-record-actions";

const revalidatePathMock = vi.hoisted(() => vi.fn());
const createStarterRecordMock = vi.hoisted(() => vi.fn());
const dbMock = vi.hoisted(() => ({}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("../lib/starter-records-repository", () => ({
  createStarterRecord: createStarterRecordMock,
}));

vi.mock("@/lib/db/client", () => ({
  db: dbMock,
}));

function createStarterRecordFormData(name: string) {
  const formData = new FormData();
  formData.set("name", name);
  return formData;
}

describe("submitStarterRecordAction", () => {
  beforeEach(() => {
    createStarterRecordMock.mockReset();
    revalidatePathMock.mockReset();
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
    expect(createStarterRecordMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("creates a record, returns success state, and revalidates dashboard", async () => {
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
    expect(revalidatePathMock).toHaveBeenCalledWith("/dashboard");
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
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
