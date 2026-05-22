import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default defineConfig([
  // Default ignores for all projects
  {
    ignores: [
      '.next/**/*',
      '.react-router/**/*',
      '**/*.d.ts',
      'build/**',
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'playwright-report/**',
      'public/**/*',
      'test-results/**',
    ],
  },

  // Base recommended rule set from ESLint
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    rules: {
      'import/no-unresolved': 'off',
    },
  },

  // Shared TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,
      'import/no-unresolved': 'off',
      'no-undef': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  // Shared JavaScript rules
  {
    files: ['**/*.{cjs,mjs,js,jsx}'],

    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },

    rules: {
      'import/no-unresolved': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  eslintConfigPrettier,
])
