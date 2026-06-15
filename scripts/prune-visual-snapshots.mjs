import { promises as fs } from "node:fs";
import path from "node:path";

const indexPath = path.resolve("storybook-static/index.json");
const snapshotDir = path.resolve(
  "tests/visual/auth-form-view.visual.spec.ts-snapshots",
);

function writeLine(message) {
  process.stdout.write(`${message}\n`);
}

async function main() {
  const indexRaw = await fs.readFile(indexPath, "utf8");
  const indexData = JSON.parse(indexRaw);
  const entries = Object.values(indexData.entries ?? {});

  const expectedSnapshotNames = new Set(
    entries
      .filter((entry) => entry.type === "story")
      .filter((entry) => entry.tags?.includes("test"))
      .filter((entry) => !entry.tags?.includes("skip-visual"))
      .map((entry) => `${entry.id}-chromium.png`),
  );

  let existingSnapshotNames = [];
  try {
    existingSnapshotNames = await fs.readdir(snapshotDir);
  } catch {
    writeLine("No snapshot directory found to prune.");
    return;
  }

  const staleSnapshots = existingSnapshotNames.filter((fileName) => {
    if (!fileName.endsWith("-chromium.png")) {
      return false;
    }

    return !expectedSnapshotNames.has(fileName);
  });

  for (const fileName of staleSnapshots) {
    await fs.unlink(path.join(snapshotDir, fileName));
  }

  if (staleSnapshots.length === 0) {
    writeLine("No stale snapshots found.");
    return;
  }

  writeLine("Removed stale snapshots:");
  for (const fileName of staleSnapshots) {
    writeLine(`- ${fileName}`);
  }
}

await main();
