import { fixupPluginRules } from "@eslint/compat";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import playwrightPlugin from "eslint-plugin-playwright";

export default [
  // React specific linting
  {
    files: ["**/*.jsx", "**/*.tsx"],

    plugins: {
      react: fixupPluginRules(reactPlugin),
      "react-hooks": fixupPluginRules(reactHooksPlugin),
      "react-refresh": fixupPluginRules(reactRefreshPlugin),
      "jsx-a11y": fixupPluginRules(jsxA11yPlugin),
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        jsxPragma: null, // using the new transform
      },
    },

    settings: {
      react: {
        version: "detect",
        runtime: "automatic",
      },
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
    },
  },

  // Jest rules for unit tests
  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/test/**/*",
      "**/tests/**/*",
    ],
    plugins: {
      jest: fixupPluginRules(jestPlugin),
      "testing-library": fixupPluginRules(testingLibraryPlugin),
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
    },
  },

  // Playwright rules for e2e
  {
    files: ["**/e2e/**/*", "**/*.e2e.{js,ts}"],
    plugins: {
      playwright: fixupPluginRules(playwrightPlugin),
    },
    rules: {
      ...playwrightPlugin.configs["playwright-test"].rules,
    },
  },
];
