import { expect, test } from "@playwright/test";

const stories = [
  "features-auth-authformview--sign-in-default",
  "features-auth-authformview--sign-in-with-errors",
  "features-auth-authformview--sign-up-default",
] as const;

test.describe("AuthFormView visual baselines", () => {
  for (const storyId of stories) {
    test(`matches baseline for ${storyId}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);

      await expect(page.getByTestId("auth-form-view-story-root")).toBeVisible();
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
