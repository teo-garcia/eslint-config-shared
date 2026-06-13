import angular from 'angular-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['.angular/**'],
  },
  ...angular.configs.tsRecommended,
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
  },
])
