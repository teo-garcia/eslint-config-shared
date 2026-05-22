<div align="center">

# @teo-garcia/eslint-config-shared

**Shared ESLint flat-config presets for TypeScript, React, and Node.js
projects**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@teo-garcia/eslint-config-shared?color=blue)](https://www.npmjs.com/package/@teo-garcia/eslint-config-shared)
[![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)](https://eslint.org)

Part of the [@teo-garcia/templates](https://github.com/teo-garcia/templates)
ecosystem

</div>

---

## Presets

| Preset           | Includes                                                            |
| ---------------- | ------------------------------------------------------------------- |
| **base**         | TypeScript, import validation, import sorting, Prettier integration |
| **react**        | React, React Hooks, JSX a11y, React Refresh                         |
| **react-native** | React Native, React Hooks, React Native rules                       |
| **playwright**   | Playwright E2E rules for `e2e/**`                                   |
| **node**         | Node.js globals                                                     |

---

## Requirements

- Node.js 24+
- ESLint 10+

---

## Exports

| Export                                          | Description               |
| ----------------------------------------------- | ------------------------- |
| `@teo-garcia/eslint-config-shared`              | Base config (default)     |
| `@teo-garcia/eslint-config-shared/base`         | TypeScript + core rules   |
| `@teo-garcia/eslint-config-shared/react`        | React-specific rules      |
| `@teo-garcia/eslint-config-shared/react-native` | React Native / Expo rules |
| `@teo-garcia/eslint-config-shared/playwright`   | Playwright E2E rules      |
| `@teo-garcia/eslint-config-shared/node`         | Node.js-specific rules    |

---

## Notes

- Import validation is provided by `eslint-plugin-import`; unresolved import
  checks stay off by default because framework and TypeScript path aliases are
  consumer-owned
- Type-aware TypeScript linting is intentionally not enabled in `base`
- Framework plugins are optional and only required when their export is used
- Uses ESLint flat config format (ESLint 10+)

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
