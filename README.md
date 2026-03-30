<div align="center">

# @teo-garcia/eslint-config-shared

**Shared ESLint flat-config presets for TypeScript, React, and Node.js
projects**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@teo-garcia/eslint-config-shared?color=blue)](https://www.npmjs.com/package/@teo-garcia/eslint-config-shared)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org)

Part of the [@teo-garcia/templates](https://github.com/teo-garcia/templates)
ecosystem

</div>

---

## Presets

| Preset    | Includes                                                                 |
| --------- | ------------------------------------------------------------------------ |
| **base**  | TypeScript, Unicorn, SonarJS, import sorting, Prettier integration       |
| **react** | React, React Hooks, JSX a11y, Testing Library, Playwright, React Refresh |
| **node**  | Node.js globals, ESM enforcement                                         |

---

## Requirements

- Node.js 24+
- ESLint 9+

---

## Exports

| Export                                   | Description             |
| ---------------------------------------- | ----------------------- |
| `@teo-garcia/eslint-config-shared`       | Base config (default)   |
| `@teo-garcia/eslint-config-shared/base`  | TypeScript + core rules |
| `@teo-garcia/eslint-config-shared/react` | React-specific rules    |
| `@teo-garcia/eslint-config-shared/node`  | Node.js-specific rules  |

---

## Notes

- Requires a `tsconfig.json` in the project root for TypeScript rules
- React plugins are optional and produce no warnings in Node.js projects
- Uses ESLint flat config format (ESLint 9+)

---

## Related Packages

| Package                              | Description         |
| ------------------------------------ | ------------------- |
| `@teo-garcia/prettier-config-shared` | Prettier formatting |
| `@teo-garcia/tsconfig-shared`        | TypeScript settings |
| `@teo-garcia/vitest-config-shared`   | Test configuration  |

---

## License

MIT

---

<div align="center">
  <sub>Built by <a href="https://github.com/teo-garcia">teo-garcia</a></sub>
</div>
