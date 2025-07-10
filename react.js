import { fixupPluginRules } from "@eslint/compat";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

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
      ...reactRefreshPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
    },
  },
  {
    files: [
      "**/components/**/*.tsx",
      "**/features/**/*.tsx",
      "src/components/**/*.tsx",
      "src/features/**/*.tsx",
      "src/app/components/**/*.tsx",
      "src/app/features/**/*.tsx",
    ],
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
];
