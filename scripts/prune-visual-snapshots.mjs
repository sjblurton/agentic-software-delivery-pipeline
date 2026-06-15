import { promises as fs } from "node:fs";
import path from "node:path";

const indexPath = path.resolve("storybook-static/index.json");
const snapshotDir = path.resolve(
  "tests/visual/storybook.visual.spec.ts-snapshots",
);

function writeLine(message) {
  process.stdout.write(`${message}\n`);
}

function toSnapshotName(entry) {
  const importPath = entry.importPath ?? "";
  const normalizedImportPath = importPath
    .replace(/^\.\//, "")
    .replace(/^src\//, "")
    .replace(/\.stories\.[^/.]+$/, "");
  const separatorIndex = entry.id.indexOf("--");
  const storySlug =
    separatorIndex === -1 ? entry.id : entry.id.slice(separatorIndex + 2);
  const directoryName = path.posix.dirname(normalizedImportPath);
  const baseName = path.posix.basename(normalizedImportPath);
  const fileName = `${baseName}--${storySlug}-chromium.png`;

  if (directoryName === ".") {
    return fileName;
  }

  return path.posix.join(directoryName, fileName);
}

async function findSnapshotFiles(directoryPath, parent = "") {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const snapshotFiles = [];

  for (const entry of entries) {
    const relativePath = parent ? path.join(parent, entry.name) : entry.name;

    if (entry.isDirectory()) {
      snapshotFiles.push(
        ...(await findSnapshotFiles(
          path.join(directoryPath, entry.name),
          relativePath,
        )),
      );
      continue;
    }

    snapshotFiles.push(relativePath);
  }

  return snapshotFiles;
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
      .map((entry) => toSnapshotName(entry)),
  );

  let existingSnapshotNames = [];
  try {
    existingSnapshotNames = await findSnapshotFiles(snapshotDir);
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
