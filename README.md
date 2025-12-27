<div align="center">

# @teo-garcia/eslint-config-shared

**Shared ESLint flat-config presets for TypeScript, React, and Node.js projects**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@teo-garcia/eslint-config-shared?color=blue)](https://www.npmjs.com/package/@teo-garcia/eslint-config-shared)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org)

Part of the [@teo-garcia/templates](https://github.com/teo-garcia/templates) ecosystem

</div>

---

## Features

| Preset | Includes |
|--------|----------|
| **base** | TypeScript, Unicorn, SonarJS, import sorting, Prettier integration |
| **react** | React, React Hooks, JSX a11y, Testing Library, Playwright, React Refresh |
| **node** | Node.js globals, ESM enforcement |

## Requirements

- Node.js 21+
- ESLint 9+

## Quick Start

```bash
# Install the package
pnpm add -D @teo-garcia/eslint-config-shared eslint
```

### React Projects

```javascript
// eslint.config.js
import base from '@teo-garcia/eslint-config-shared/base'
import react from '@teo-garcia/eslint-config-shared/react'

export default [...base, ...react]
```

### Node.js Projects

```javascript
// eslint.config.js
import base from '@teo-garcia/eslint-config-shared/base'
import node from '@teo-garcia/eslint-config-shared/node'

export default [...base, ...node]
```

### TypeScript Only

```javascript
// eslint.config.js
import base from '@teo-garcia/eslint-config-shared/base'

export default [...base]
```

## Exports

| Export | Description |
|--------|-------------|
| `@teo-garcia/eslint-config-shared` | Base config (default) |
| `@teo-garcia/eslint-config-shared/base` | TypeScript + core rules |
| `@teo-garcia/eslint-config-shared/react` | React-specific rules |
| `@teo-garcia/eslint-config-shared/node` | Node.js-specific rules |

## Extending

Override rules as needed:

```javascript
// eslint.config.js
import base from '@teo-garcia/eslint-config-shared/base'
import react from '@teo-garcia/eslint-config-shared/react'

export default [
  ...base,
  ...react,
  {
    rules: {
      // Your custom overrides
      'unicorn/filename-case': 'off',
    },
  },
]
```

## Notes

- Requires a `tsconfig.json` in the project root for TypeScript rules
- React plugins are optional (no warnings in Node.js projects)
- Uses ESLint flat config format (ESLint 9+)

## Related Packages

| Package | Description |
|---------|-------------|
| [@teo-garcia/prettier-config-shared](https://github.com/teo-garcia/prettier-config-shared) | Prettier formatting |
| [@teo-garcia/tsconfig-shared](https://github.com/teo-garcia/tsconfig-shared) | TypeScript settings |
| [@teo-garcia/vitest-config-shared](https://github.com/teo-garcia/vitest-config-shared) | Test configuration |

## License

MIT

---

<div align="center">
  <sub>Built by <a href="https://github.com/teo-garcia">teo-garcia</a></sub>
</div>
