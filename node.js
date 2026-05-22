import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  // Node-specific configuration
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      globals: {
        // Only node globals, no browser
        ...globals.node,
      },
    },
    rules: {
      // Node-specific rule overrides belong here as the baseline matures.
    },
  },
])
