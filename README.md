# @teo-garcia/eslint-config-shared

Shared flat-config ESLint presets used across the React template projects.

## Available exports

- `@teo-garcia/eslint-config-shared/base` - Core shared rules (JS/TS, import sorting, unicorn, sonarjs)
- `@teo-garcia/eslint-config-shared/react` - React-specific rules (JSX, hooks, a11y, testing-library, playwright)
- `@teo-garcia/eslint-config-shared/node` - Node-specific rules and globals

---

### Notes

- The base preset expects a `tsconfig.json` file in the project root so that the TypeScript rules can operate correctly.
- It adds Prettier integration out-of-the-box (`plugin:prettier/recommended`).
- Consumers compose the configs explicitly, giving full control over the rule application order.
