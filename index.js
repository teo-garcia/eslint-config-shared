import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for re-using legacy "extends" configs inside the flat-config world
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  // Base recommended rule set from ESLint
  js.configs.recommended,

  // Shared TypeScript rules
  {
    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
      "@typescript-eslint": tsPlugin,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        // Expect the consumer project to have a tsconfig.json in the root
        project: ["./tsconfig.json"],
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

      // Prefer import consistency
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",

      // TypeScript already handles undefined checks
      "no-undef": "off",
    },
  },

  // Shared JavaScript rules
  {
    files: ["**/*.js", "**/*.jsx"],

    plugins: {
      import: fixupPluginRules(_import),
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
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
    },
  },

  // Allow consumers to keep using "extends" based presets if needed
  ...compat.extends("plugin:prettier/recommended"),
];
