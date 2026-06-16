import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const uiRoot = join(process.cwd(), "src", "components", "ui");
const atoms = ["button", "input", "card", "table"] as const;

describe("UI atom co-location", () => {
  it("stores each atom implementation and story in a co-located folder", () => {
    for (const atom of atoms) {
      expect(existsSync(join(uiRoot, atom, `${atom}.tsx`))).toBe(true);
      expect(existsSync(join(uiRoot, atom, `${atom}.stories.tsx`))).toBe(true);
    }
  });

  it("removes legacy flat component files", () => {
    for (const atom of atoms) {
      expect(existsSync(join(uiRoot, `${atom}.tsx`))).toBe(false);
    }
  });
});
