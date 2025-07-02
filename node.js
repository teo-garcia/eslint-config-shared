import globals from "globals";

export default [
  // Node-specific configuration
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
