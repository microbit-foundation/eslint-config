# @microbit/eslint-config

Shared ESLint config for Micro:bit Educational Foundation TypeScript
projects. Flat config, ESLint 9, with type-aware linting via
typescript-eslint's project service.

Two entry points:

- `@microbit/eslint-config` — base config for TypeScript projects:
  `eslint:recommended`, typescript-eslint `recommended-type-checked`, and
  our shared rule adjustments, with `eslint-config-prettier` last so
  formatting is left to Prettier.
- `@microbit/eslint-config/react` — the base config plus
  `eslint-plugin-react` (recommended + jsx-runtime) and
  `eslint-plugin-react-hooks`.

Both apply only to TypeScript files (`.ts`, `.tsx`, `.mts`, `.cts`).

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
    // Project-specific ignores, e.g. generated output.
    ignores: ["dist", "styled-system"],
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
