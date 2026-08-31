/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { files } from "./base.js";

export default [
  { ...react.configs.flat.recommended, files },
  { ...react.configs.flat["jsx-runtime"], files },
  { ...reactHooks.configs.flat.recommended, files },
  {
    // Playwright fixtures take a callback named `use`, which the hooks plugin
    // treats as the React 19 `use` hook.
    files: ["**/e2e/**"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    // Storybook `render` functions use hooks; they are components in practice
    // but the rule only accepts component-cased names.
    files: ["**/*.stories.{ts,tsx}"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // More trouble than it's worth.
      "react/no-unescaped-entities": "off",
      // TypeScript handles prop validation.
      "react/prop-types": "off",
      // Allow the empty-interface-extending-a-base-type pattern used for
      // component props.
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends",
        },
      ],
    },
  },
];
