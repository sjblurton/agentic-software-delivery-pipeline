import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { profiles, starterRecords } from "./schema";

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

  describe("starter_records table schema", () => {
    it("stores a generated id, a name, and a created timestamp", () => {
      const tableConfig = getTableConfig(starterRecords);

      const idColumn = tableConfig.columns.find(
        (column) => column.name === "id",
      );
      const nameColumn = tableConfig.columns.find(
        (column) => column.name === "name",
      );
      const createdAtColumn = tableConfig.columns.find(
        (column) => column.name === "created_at",
      );

      expect(tableConfig.name).toBe("starter_records");
      expect(idColumn?.notNull).toBe(true);
      expect(idColumn?.hasDefault).toBe(true);
      expect(nameColumn?.notNull).toBe(true);
      expect(createdAtColumn?.notNull).toBe(true);
      expect(createdAtColumn?.hasDefault).toBe(true);
    });
  });
});
