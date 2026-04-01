import { defineConfig } from 'eslint/config'
import playwright from 'eslint-plugin-playwright'

export default defineConfig([
  {
    ...playwright.configs['flat/recommended'],
    files: ['e2e/**'],
  },
])
