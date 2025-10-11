# @teo-garcia/eslint-config-shared

Shared ESLint flat-config presets for JavaScript, TypeScript, React, and Node.js projects.

## Installation

```bash
npm install --save-dev @teo-garcia/eslint-config-shared eslint
```

## Usage

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

### JavaScript Only

```javascript
// eslint.config.js
import base from '@teo-garcia/eslint-config-shared/base'

export default [...base]
```

## Available Exports

- **base** - Core shared rules (JS/TS, import sorting, unicorn, sonarjs)
- **react** - React-specific rules (JSX, hooks, a11y, testing-library, playwright)
- **node** - Node-specific rules and globals

## Notes

The base preset expects a `tsconfig.json` file in the project root for TypeScript rules to operate correctly.

## License

MIT
