import vitest from "@vitest/eslint-plugin";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import noBarrelFiles from "eslint-plugin-no-barrel-files";
import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  ...noBarrelFiles.configs.recommended,
  vitest.configs.recommended,
  sonarjs.configs.recommended,
  {
    rules: {
      "no-console": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    ".workspaces/**",
    ".worktrees/**",
    // Additional ignores:
    "node_modules/**",
    "dist/**",
    "coverage/**",
    "public/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
