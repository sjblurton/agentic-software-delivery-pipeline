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

test("database starter persists created rows for authenticated user", async ({
  page,
}) => {
  test.skip(authMode !== "logged-in", "Requires logged-in auth mode.");

  const { pageErrors, consoleErrors, failedRequests } =
    createPageIssueTrackers(page);
  const recordName = `e2e-record-${Date.now()}`;

  await page.goto("/starter/database");
  await expect(
    page.getByRole("heading", { name: /database starter records/i }),
  ).toBeVisible();

  await page.getByLabel("Record name").fill(recordName);
  await page.getByRole("button", { name: /^add row$/i }).click();

  const createdRowCell = page.getByRole("cell", { name: recordName });
  await expect(createdRowCell).toBeVisible();

  await page.reload();
  await expect(
    page.getByRole("heading", { name: /database starter records/i }),
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: recordName })).toBeVisible();

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test("database starter redirects unauthenticated users to sign-in", async ({
  page,
}) => {
  test.skip(authMode !== "logged-out", "Requires logged-out auth mode.");

  const { pageErrors, consoleErrors, failedRequests } =
    createPageIssueTrackers(page);

  await page.goto("/starter/database");

  await expect(page).toHaveURL(/\/auth\/sign-in/);
  await expect(page.getByRole("heading", { name: /^sign in$/i })).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
