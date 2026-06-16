import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createStarterRecord,
  listStarterRecords,
} from "./starter-records-repository";

const orderByMock = vi.hoisted(() => vi.fn());
const fromMock = vi.hoisted(() => vi.fn());
const selectMock = vi.hoisted(() => vi.fn());
const returningMock = vi.hoisted(() => vi.fn());
const valuesMock = vi.hoisted(() => vi.fn());
const insertMock = vi.hoisted(() => vi.fn());

describe("listStarterRecords", () => {
  beforeEach(() => {
    orderByMock.mockReset();
    fromMock.mockReset();
    selectMock.mockReset();
    returningMock.mockReset();
    valuesMock.mockReset();
    insertMock.mockReset();
  });

  it("queries starter records with a stable created-at display order", async () => {
    const database = {
      select: selectMock.mockReturnValue({
        from: fromMock.mockReturnValue({
          orderBy: orderByMock.mockResolvedValue([]),
        }),
      }),
    };

    await listStarterRecords(database as never);

    expect(selectMock).toHaveBeenCalled();
    expect(fromMock).toHaveBeenCalled();
    expect(orderByMock).toHaveBeenCalledTimes(1);
    expect(orderByMock.mock.calls[0]).toHaveLength(2);
  });

  it("creates a starter record and returns the inserted row", async () => {
    const insertedRow = {
      id: "7ce52787-34be-4947-a6c4-ac0f32b6f228",
      name: "Starter row",
      createdAt: new Date("2026-06-16T09:00:00.000Z"),
    };
    const database = {
      insert: insertMock.mockReturnValue({
        values: valuesMock.mockReturnValue({
          returning: returningMock.mockResolvedValue([insertedRow]),
        }),
      }),
    };

    const result = await createStarterRecord(database as never, {
      name: "Starter row",
    });

    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(valuesMock).toHaveBeenCalledWith({ name: "Starter row" });
    expect(returningMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(insertedRow);
  });
});
