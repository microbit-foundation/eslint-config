/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export const files = ["**/*.{ts,tsx,mts,cts}"];

// Generated output and tooling directories common to our repos. Harmless
// where a path does not exist.
const ignores = {
  ignores: [
    "**/dist",
    "**/build",
    "**/coverage",
    "**/playwright-report",
    "**/test-results",
    "**/storybook-static",
    // Panda's generated output: gitignored, and its .d.ts files carry
    // eslint-disable directives this config reports as unused.
    "**/styled-system",
    // Outside the tsconfig the type-aware rules parse against, so linting it
    // is an error rather than a lint.
    "**/panda.config.ts",
    // The project service does not discover files in dot-directories even
    // when a tsconfig includes them.
    "**/.storybook",
    // Claude Code worktrees and settings.
    "**/.claude",
  ],
};

export default tseslint.config(ignores, {
  files,
  extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: "error",
  },
  rules: {
    // False positives from library imports.
    "@typescript-eslint/unbound-method": "off",
    // Passing async functions where void returns are expected is common in
    // event handler props and the errors are rarely actionable.
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
});
