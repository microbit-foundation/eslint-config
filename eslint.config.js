/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";

// This package is plain JS, so it lints itself with just the JS layer.
// Fixtures contain deliberate errors and are covered by the tests instead.
export default [
  { ignores: ["test/fixtures"] },
  js.configs.recommended,
  {
    languageOptions: { globals: globals.node },
    linterOptions: { reportUnusedDisableDirectives: "error" },
  },
  prettier,
];
