import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const authMode = process.env.E2E_AUTH_MODE ?? "logged-out";

function createPageIssueTrackers(page: Page) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("requestfailed", (request) => {
    failedRequests.push(request.url());
  });

  return { pageErrors, consoleErrors, failedRequests };
}

test("home page loads for authenticated user", async ({ page }) => {
  test.skip(authMode !== "logged-in", "Requires logged-in auth mode.");

  const { pageErrors, consoleErrors, failedRequests } =
    createPageIssueTrackers(page);

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /bootstrap baseline completed/i }),
  ).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test("home redirects to sign-in when unauthenticated", async ({ page }) => {
  test.skip(authMode !== "logged-out", "Requires logged-out auth mode.");

  const { pageErrors, consoleErrors, failedRequests } =
    createPageIssueTrackers(page);

  await page.goto("/");

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page.getByRole("heading", { name: /^sign in$/i })).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
