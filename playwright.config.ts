import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

/**
 * BDD: genera specs en `src/runner` (espejo de `features/`, alineado con ADR-001).
 */
const testDir = defineBddConfig({
  featuresRoot: "features",
  features: "features/**/*.feature",
  steps: ["features/**/*.steps.ts", "src/fixtures/bddFixtures.ts"],
  outputDir: "src/runner",
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    baseURL: "https://opensource-demo.orangehrmlive.com",
  },
  /**
   * Demo público: un solo proyecto reduce carga y falsos negativos por rate limiting.
   * Para ampliar navegadores, descomenta firefox/webkit.
   */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
