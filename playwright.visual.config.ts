import { defineConfig, devices } from "@playwright/test";

if (!process.env.CI) {
  throw new Error(
    "playwright.visual.config.ts is CI-only. Run visual regression in CI.",
  );
}

const baseURL =
  process.env.PLAYWRIGHT_VISUAL_BASE_URL ?? "http://127.0.0.1:6006";
const webServerCommand =
  process.env.PLAYWRIGHT_VISUAL_WEB_SERVER_COMMAND ??
  "python3 -m http.server 6006 --directory storybook-static --bind 127.0.0.1";

export default defineConfig({
  testDir: "./tests/visual",
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  outputDir: "./test-results/visual",
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  webServer: {
    command: webServerCommand,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
