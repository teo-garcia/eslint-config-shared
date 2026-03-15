import { fixupPluginRules } from '@eslint/compat'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactNativePlugin from 'eslint-plugin-react-native'

/**
 * Shared ESLint config for React Native / Expo projects.
 *
 * Differences from the web React config:
 * - jsx-a11y is omitted: React Native uses its own accessibility model
 *   (accessible, accessibilityLabel, accessibilityRole props), not ARIA.
 * - react-refresh is omitted: Metro handles hot reload natively.
 * - eslint-plugin-react-native adds RN-specific rules and globals
 *   (StyleSheet, Platform, __DEV__, etc.).
 */
export default [
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      'react-native': fixupPluginRules(reactNativePlugin),
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        jsxPragma: null,
      },
      globals: {
        // React Native globals
        __DEV__: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        XMLHttpRequest: 'readonly',
      },
    },

    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      // RN-specific: warn on inline styles (prefer StyleSheet.create)
      'react-native/no-inline-styles': 'warn',
      // RN-specific: catch color literals that bypass theming
      'react-native/no-color-literals': 'warn',
      // RN-specific: enforce platform-specific extensions where appropriate
      'react-native/split-platform-components': 'warn',
    },
  },
  {
    files: [
      '**/components/**/*.tsx',
      '**/features/**/*.tsx',
      'src/components/**/*.tsx',
      'src/features/**/*.tsx',
    ],
    rules: {
      // No react-refresh here — Metro handles HMR without module boundary rules
    },
  },
]
