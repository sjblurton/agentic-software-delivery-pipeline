import { defineConfig, devices } from "@playwright/test";

const baseURL =
  process.env.PLAYWRIGHT_VISUAL_BASE_URL ?? "http://127.0.0.1:6006";
const webServerCommand =
  process.env.PLAYWRIGHT_VISUAL_WEB_SERVER_COMMAND ??
  "pnpm storybook --ci --port 6006 --host 127.0.0.1";

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
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "desktop-chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
    command: webServerCommand,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
