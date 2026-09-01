# @microbit/eslint-config

Shared ESLint config for Micro:bit Educational Foundation TypeScript
projects. Flat config, ESLint 10, with type-aware linting via
typescript-eslint's project service.

Two entry points:

- `@microbit/eslint-config` — base config for TypeScript projects:
  `eslint:recommended`, typescript-eslint `recommended-type-checked`, and
  our shared rule adjustments, with `eslint-config-prettier` last so
  formatting is left to Prettier.
- `@microbit/eslint-config/react` — the base config plus
  [eslint-react](https://eslint-react.xyz) (`recommended-type-checked`)
  and `eslint-plugin-react-hooks`.

Both apply only to TypeScript files (`.ts`, `.tsx`, `.mts`, `.cts`), and
both ignore generated output common to our repos (`dist`, `build`,
`coverage`, Playwright reports, Storybook builds, Panda's `styled-system`
output and `panda.config.ts`) plus `.storybook` and `.claude` directories.

### React rule choices

We use eslint-react rather than `eslint-plugin-react`, which has had no
release since April 2025 and crashes on ESLint 10. eslint-react covers
the same ground with more rules and no compatibility workarounds.

Both eslint-react and `eslint-plugin-react-hooks` implement the hooks and
React Compiler rules. We keep the React team's versions and switch off
eslint-react's equivalents, so a given problem is reported once.

`naming-convention-*` (ref, context and id naming) is off. It is house
style rather than correctness, and we have no shared position on it.

Rules that depend on the React version follow the React resolved from the
linted project. Libraries supporting a range of React versions should pin
the setting to the oldest they support, or they will be told to adopt
APIs their consumers may not have:

```js
{
  settings: {
    "react-x": {
      version: "17.0.0",
    },
  },
}
```

The react config switches `react-hooks/rules-of-hooks` off in two places
where it misfires on established idioms: under `e2e` directories, where
Playwright fixtures take a callback named `use` that the hooks plugin
treats as the React 19 `use` hook, and in `*.stories.{ts,tsx}` files,
whose `render` functions are components in practice but not
component-cased.

## Usage

Install alongside ESLint:

```bash
npm i -D eslint @microbit/eslint-config
```

Create `eslint.config.js`:

```js
import microbit from "@microbit/eslint-config/react";

export default [
  {
    // Project-specific ignores, e.g. build scripts kept in plain JS.
    ignores: ["bin", "deployment.cjs"],
  },
  ...microbit,
  {
    // Project-specific rule overrides, ideally temporary ones on the way
    // to the shared config. Keep divergence visible here rather than
    // adding it to the shared config.
    rules: {},
  },
];
```

Suggested lint script:

```json
"lint": "eslint . --max-warnings 0"
```

Unused `eslint-disable` directives are reported as errors by the shared
config, so the old `--report-unused-disable-directives` flag is not needed.

### TypeScript project resolution

Type-aware rules resolve types using the nearest `tsconfig.json` to each
linted file (typescript-eslint's `projectService`). Files that no
`tsconfig.json` includes fail with a parse error; either extend the
tsconfig, add an ignore, or allow specific files:

```js
{
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.config.ts"],
      },
    },
  },
}
```

## Development

`npm run ci` runs lint, format check, and tests. The tests run ESLint
programmatically against fixtures in `test/fixtures`.

To try an unreleased version in a consuming project, use a file
dependency from a sibling checkout:

```bash
npm i -D ../eslint-config
```

or `npm link` if you prefer.

## Releases

Create a GitHub release; CI publishes to npm with the version derived
from the tag.

## License

[MIT](LICENSE.md)
