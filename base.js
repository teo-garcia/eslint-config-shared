import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import unicornPlugin from "eslint-plugin-unicorn";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for re-using legacy "extends" configs inside the flat-config world
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // Default ignores for all projects
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/*.d.ts",
      "**/build/**",
      "**/coverage/**",
      "public/**/*",
      ".react-router/**/*",
    ],
  },

  // Base recommended rule set from ESLint
  js.configs.recommended,

  unicornPlugin.configs["flat/recommended"],
  sonarjsPlugin.configs.recommended,

  // Shared TypeScript rules
  {
    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: [path.join(process.cwd(), "tsconfig.json")],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,
      "no-undef": "off",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unicorn/expiring-todo-comments": "off",
      "unicorn/prevent-abbreviations": "off",
      "sonarjs/todo-tag": "warn",
    },
  },

  // Shared JavaScript rules
  {
    files: ["**/*.{cjs,mjs,js,jsx}"],

    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unicorn/expiring-todo-comments": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  eslintConfigPrettier,
];
