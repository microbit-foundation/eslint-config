/**
 * (c) 2026, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { ESLint } from "eslint";
import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import base from "../index.js";
import react from "../react.js";

const fixtures = fileURLToPath(new URL("./fixtures/", import.meta.url));

const lint = async (config, file) => {
  const eslint = new ESLint({
    cwd: fixtures,
    overrideConfigFile: true,
    overrideConfig: config,
  });
  const [result] = await eslint.lintFiles([file]);
  return result;
};

test("base flags recommended and type-aware issues", async () => {
  const result = await lint(base, "base-invalid.ts");
  const rules = result.messages.map((m) => m.ruleId);
  assert.ok(rules.includes("@typescript-eslint/no-floating-promises"), rules);
  assert.ok(rules.includes("@typescript-eslint/no-unused-vars"), rules);
});

test("base accepts idiomatic code", async () => {
  const result = await lint(base, "base-valid.ts");
  assert.deepEqual(result.messages, []);
});

test("react flags hooks misuse", async () => {
  const result = await lint(react, "react-invalid.tsx");
  const rules = result.messages.map((m) => m.ruleId);
  assert.ok(rules.includes("react-hooks/rules-of-hooks"), rules);
});

test("react reports a hooks problem once, not once per plugin", async () => {
  const result = await lint(react, "react-invalid.tsx");
  const rules = result.messages.map((m) => m.ruleId);
  assert.ok(!rules.includes("@eslint-react/rules-of-hooks"), rules);
});

test("react flags eslint-react issues but not naming conventions", async () => {
  const result = await lint(react, "react-plugin.tsx");
  const rules = result.messages.map((m) => m.ruleId);
  assert.ok(rules.includes("@eslint-react/no-array-index-key"), rules);
  assert.ok(
    !rules.some((rule) => rule?.startsWith("@eslint-react/naming-convention-")),
    rules,
  );
});

test("react keeps use-state correctness checks but not setter naming", async () => {
  const result = await lint(react, "react-plugin.tsx");
  const messages = result.messages
    .filter((message) => message.ruleId === "@eslint-react/use-state")
    .map((message) => message.message);
  assert.ok(
    messages.some((message) => message.includes("lazy initial state")),
    messages,
  );
  assert.ok(
    !messages.some((message) => message.includes("setter should be named")),
    messages,
  );
});

test("react accepts idiomatic component code", async () => {
  const result = await lint(react, "react-valid.tsx");
  assert.deepEqual(result.messages, []);
});

test("react exempts e2e directories from rules-of-hooks only", async () => {
  const result = await lint(react, "e2e/fixtures.tsx");
  const rules = result.messages.map((m) => m.ruleId);
  assert.ok(!rules.includes("react-hooks/rules-of-hooks"), rules);
});

test("react exempts story render functions from rules-of-hooks", async () => {
  const result = await lint(react, "demo.stories.tsx");
  const rules = result.messages.map((m) => m.ruleId);
  assert.ok(!rules.includes("react-hooks/rules-of-hooks"), rules);
});
