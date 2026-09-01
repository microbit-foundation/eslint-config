/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import { files } from "./base.js";

// eslint-react ships its own implementations of the hooks and React Compiler
// rules that eslint-plugin-react-hooks owns. Both would report the same code
// under different rule names, so we defer to the React team's versions.
const ownedByReactHooks = [
  "error-boundaries",
  "exhaustive-deps",
  "purity",
  "rules-of-hooks",
  "set-state-in-effect",
  "set-state-in-render",
  "static-components",
  "unsupported-syntax",
  "use-memo",
];

export default [
  { ...eslintReact.configs["recommended-type-checked"], files },
  // Ref and context naming is a house-style question we have no position on.
  { ...eslintReact.configs["disable-naming-convention"], files },
  { ...reactHooks.configs.flat.recommended, files },
  {
    files,
    rules: Object.fromEntries(
      ownedByReactHooks.map((rule) => [`@eslint-react/${rule}`, "off"]),
    ),
  },
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
    rules: {
      // The correctness half of this rule (lazy initialisers, destructuring)
      // is worth having; the setter naming half is house style, which we
      // leave alone here as we do with naming-convention.
      "@eslint-react/use-state": ["warn", { enforceSetterName: false }],
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
