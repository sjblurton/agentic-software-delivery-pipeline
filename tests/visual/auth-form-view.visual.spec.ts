import type { APIRequestContext } from "@playwright/test";
import { expect, test } from "@playwright/test";

type StorybookIndexEntry = {
  id: string;
  type?: string;
  tags?: string[];
};

async function getVisualStoryIds(request: APIRequestContext) {
  const indexResponse = await request.get("/index.json");
  expect(indexResponse.ok()).toBeTruthy();
  const indexData = (await indexResponse.json()) as {
    entries: Record<string, StorybookIndexEntry>;
  };

  return Object.values(indexData.entries)
    .filter((entry) => entry.type === "story")
    .filter((entry) => entry.tags?.includes("test"))
    .filter((entry) => !entry.tags?.includes("skip-visual"))
    .map((entry) => entry.id)
    .sort();
}

test.describe("Storybook visual baselines", () => {
  test("matches baseline for every testable Storybook story", async ({
    page,
    request,
  }) => {
    const storyIds = await getVisualStoryIds(request);
    expect(storyIds.length).toBeGreaterThan(0);

    for (const storyId of storyIds) {
      await test.step(`snapshot ${storyId}`, async () => {
        await page.emulateMedia({ colorScheme: "dark" });
        await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);

        await expect(page.locator("#storybook-root > *")).toBeVisible();
        await expect
          .poll(async () => {
            return page.evaluate(
              () => getComputedStyle(document.body).backgroundColor,
            );
          })
          .not.toBe("rgb(255, 255, 255)");
        await expect(page).toHaveScreenshot(`${storyId}.png`, {
          animations: "disabled",
          fullPage: true,
        });
      });
    }
  });
});
