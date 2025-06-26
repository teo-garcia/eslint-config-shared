# @acme/eslint-config-shared

Shared flat-config ESLint presets used across the React template projects.

## Install

```sh
# with pnpm
pnpm add -D @acme/eslint-config-shared eslint

# or with npm
yarn add -D @acme/eslint-config-shared eslint
```

You also need to install the peer dependencies expected by the preset; the quickest way is with `pnpm`:

```sh
pnpm add -D $(pnpm info @acme/eslint-config-shared peerDependencies --json | jq -r 'keys | join(" ")')
```

## Usage – base (JS/TS)

```js
// eslint.config.mjs (flat-config)
import shared from "@acme/eslint-config-shared";

export default [
  ...shared,
  // project-specific additions here
];
```

## Usage – React flavour

```js
import sharedReact from "@acme/eslint-config-shared/react";

export default [...sharedReact];
```

---

### Notes

- The preset expects a `tsconfig.json` file in the project root so that the TypeScript rules can operate correctly.
- It adds Prettier integration out-of-the-box (`plugin:prettier/recommended`).
