import path from "node:path";
import type { APIRequestContext } from "@playwright/test";
import { expect, test } from "@playwright/test";

type StorybookIndexEntry = {
  id: string;
  type?: string;
  tags?: string[];
  importPath?: string;
};

type VisualStory = {
  id: string;
  snapshotPathSegments: string[];
};

function toSnapshotPathSegments(entry: StorybookIndexEntry) {
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
  const fileName = `${baseName}--${storySlug}.png`;

  if (directoryName === ".") {
    return ["__snapshots__", fileName];
  }

  return [directoryName, "__snapshots__", fileName];
}

async function getVisualStories(
  request: APIRequestContext,
): Promise<VisualStory[]> {
  const indexResponse = await request.get("/index.json");
  expect(indexResponse.ok()).toBeTruthy();
  const indexData = (await indexResponse.json()) as {
    entries: Record<string, StorybookIndexEntry>;
  };

  return Object.values(indexData.entries)
    .filter((entry) => entry.type === "story")
    .filter((entry) => entry.tags?.includes("test"))
    .filter((entry) => !entry.tags?.includes("skip-visual"))
    .map((entry) => ({
      id: entry.id,
      snapshotPathSegments: toSnapshotPathSegments(entry),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

test.describe("Storybook visual baselines", () => {
  test("matches baseline for every testable Storybook story", async ({
    page,
    request,
  }) => {
    const stories = await getVisualStories(request);
    expect(stories.length).toBeGreaterThan(0);

    for (const story of stories) {
      await test.step(`snapshot ${story.id}`, async () => {
        await page.emulateMedia({ colorScheme: "dark" });
        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

        await expect(page.locator("#storybook-root > *")).toBeVisible();
        await expect
          .poll(async () => {
            return page.evaluate(
              () => getComputedStyle(document.body).backgroundColor,
            );
          })
          .not.toBe("rgb(255, 255, 255)");
        await expect(page).toHaveScreenshot(story.snapshotPathSegments, {
          animations: "disabled",
          fullPage: true,
        });
      });
    }
  });
});
