import globals from "globals";
import sonarjsPlugin from "eslint-plugin-sonarjs";

export default [
  // Node-specific configuration
  ...sonarjsPlugin.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      globals: {
        // Only node globals, no browser
        ...globals.node,
      },
    },
    rules: {
      // Node-specific rules that differ from base defaults
      "unicorn/prefer-module": "error",
      "unicorn/prefer-node-protocol": "error",
    },
  },
];
