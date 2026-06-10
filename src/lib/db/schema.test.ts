import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { profiles } from "./schema";

describe("profiles table schema", () => {
  it("uses auth.users(id) as the profile identifier", () => {
    const profilesConfig = getTableConfig(profiles);
    const idColumn = profilesConfig.columns.find(
      (column) => column.name === "id",
    );

    expect(idColumn?.hasDefault).toBe(false);
    expect(profilesConfig.foreignKeys).toHaveLength(1);

    const foreignKeyReference = profilesConfig.foreignKeys[0]?.reference();

    expect(foreignKeyReference).toBeDefined();
    expect(foreignKeyReference?.columns.map((column) => column.name)).toEqual([
      "id",
    ]);
    expect(getTableConfig(foreignKeyReference!.foreignTable).schema).toBe(
      "auth",
    );
    expect(getTableConfig(foreignKeyReference!.foreignTable).name).toBe(
      "users",
    );
    expect(
      foreignKeyReference?.foreignColumns.map((column) => column.name),
    ).toEqual(["id"]);
  });
});
