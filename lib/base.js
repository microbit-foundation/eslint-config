/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export const files = ["**/*.{ts,tsx,mts,cts}"];

export default tseslint.config({
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
