import { execFileSync } from 'node:child_process'
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)
const packageJson = JSON.parse(
  readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
)
const tempRoot = path.join(packageRoot, '.consumer-smoke')
const tarballDir = path.join(tempRoot, 'tarballs')
const consumerDir = path.join(tempRoot, 'consumer')

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function writeFixture(relativePath, source) {
  const filePath = path.join(consumerDir, relativePath)
  mkdirSync(path.dirname(filePath), { recursive: true })
  writeFileSync(filePath, source)
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd ?? consumerDir,
    stdio: options.stdio ?? 'inherit',
  })
}

function expectLintFailure(configFile, targetFile) {
  try {
    run(
      'pnpm',
      [
        'exec',
        'eslint',
        '--max-warnings',
        '0',
        '--config',
        configFile,
        targetFile,
      ],
      {
        stdio: 'pipe',
      }
    )
  } catch {
    return
  }

  throw new Error(`${targetFile} unexpectedly passed ${configFile}`)
}

function printConfig(configFile, targetFile) {
  const output = run(
    'pnpm',
    ['exec', 'eslint', '--config', configFile, '--print-config', targetFile],
    {
      stdio: 'pipe',
    }
  )

  return JSON.parse(output.toString('utf8'))
}

function assertRule(config, ruleName) {
  if (!Object.hasOwn(config.rules ?? {}, ruleName)) {
    throw new Error(`Expected ${ruleName} in printed config`)
  }
}

function assertNoRulePrefix(config, rulePrefix) {
  const activeRuleNames = Object.entries(config.rules ?? {})
    .filter(([, value]) => {
      const severity = Array.isArray(value) ? value[0] : value

      return severity !== 0 && severity !== 'off'
    })
    .map(([ruleName]) => ruleName)

  if (activeRuleNames.some((ruleName) => ruleName.startsWith(rulePrefix))) {
    throw new Error(`Did not expect ${rulePrefix} rules in printed config`)
  }
}

rmSync(tempRoot, { force: true, recursive: true })
mkdirSync(tarballDir, { recursive: true })
mkdirSync(consumerDir)

run('pnpm', ['pack', '--pack-destination', tarballDir], {
  cwd: packageRoot,
})

const tarballName = readdirSync(tarballDir).find((file) =>
  file.endsWith('.tgz')
)

if (!tarballName) {
  throw new Error('pnpm pack did not create a tarball')
}

writeJson(path.join(consumerDir, 'package.json'), {
  private: true,
  type: 'module',
  dependencies: {
    [packageJson.name]: `file:${path.join(tarballDir, tarballName)}`,
    ...packageJson.peerDependencies,
    '@playwright/test': '^1.50.0',
    '@types/react': '^19.0.0',
    react: '^19.0.0',
    typescript: '^5.8.3',
  },
})

writeJson(path.join(consumerDir, 'tsconfig.json'), {
  compilerOptions: {
    jsx: 'react-jsx',
    module: 'NodeNext',
    moduleResolution: 'NodeNext',
    noEmit: true,
    strict: true,
    target: 'ES2022',
  },
  include: ['src/**/*.ts', 'src/**/*.tsx', 'e2e/**/*.ts'],
})

writeFixture(
  'eslint.base.config.mjs',
  "import base from '@teo-garcia/eslint-config-shared/base'\n\nexport default base\n"
)
writeFixture(
  'eslint.node.config.mjs',
  "import base from '@teo-garcia/eslint-config-shared/base'\nimport node from '@teo-garcia/eslint-config-shared/node'\n\nexport default [...base, ...node]\n"
)
writeFixture(
  'eslint.react.config.mjs',
  "import base from '@teo-garcia/eslint-config-shared/base'\nimport react from '@teo-garcia/eslint-config-shared/react'\n\nexport default [...base, ...react]\n"
)
writeFixture(
  'eslint.react-native.config.mjs',
  "import base from '@teo-garcia/eslint-config-shared/base'\nimport reactNative from '@teo-garcia/eslint-config-shared/react-native'\n\nexport default [...base, ...reactNative]\n"
)
writeFixture(
  'eslint.playwright.config.mjs',
  "import base from '@teo-garcia/eslint-config-shared/base'\nimport playwright from '@teo-garcia/eslint-config-shared/playwright'\n\nexport default [...base, ...playwright]\n"
)

writeFixture(
  'src/base/math.ts',
  'export function add(left: number, right: number): number {\n  return left + right\n}\n'
)
writeFixture(
  'src/base/bad-import.ts',
  "import { add } from './math'\nimport { add as addAgain } from './math'\n\nexport const value = add(1, 2) + addAgain(3, 4)\n"
)
writeFixture(
  'src/node/server.ts',
  "import process from 'node:process'\n\nexport const port = Number(process.env.PORT ?? 3000)\n"
)
writeFixture(
  'src/react/component.tsx',
  'export function Button(): React.ReactElement {\n  return <button type="button">Save</button>\n}\n'
)
writeFixture(
  'src/react/bad-hooks.tsx',
  "import { useEffect } from 'react'\n\nexport function BadHooks({ enabled }: { enabled: boolean }): null {\n  if (enabled) {\n    useEffect(() => {}, [])\n  }\n\n  return null\n}\n"
)
writeFixture(
  'src/native/app.tsx',
  "const View = 'View'\n\nexport function App(): React.ReactElement {\n  return <View />\n}\n"
)
writeFixture(
  'src/native/bad-inline-style.tsx',
  "const View = 'View'\n\nexport function App(): React.ReactElement {\n  return <View style={{ color: 'red' }} />\n}\n"
)
writeFixture(
  'e2e/smoke.spec.ts',
  "test('home page', async ({ page }) => {\n  await page.goto('/')\n  await expect(page).toHaveURL(/.*/)\n})\n"
)
writeFixture(
  'e2e/focused.spec.ts',
  "test.only('focused page', async ({ page }) => {\n  await page.goto('/')\n})\n"
)

run('pnpm', ['install', '--ignore-scripts'])

for (const specifier of [
  '@teo-garcia/eslint-config-shared',
  '@teo-garcia/eslint-config-shared/base',
  '@teo-garcia/eslint-config-shared/node',
  '@teo-garcia/eslint-config-shared/playwright',
  '@teo-garcia/eslint-config-shared/react',
  '@teo-garcia/eslint-config-shared/react-native',
]) {
  run('pnpm', [
    'exec',
    'node',
    '--input-type=module',
    '--eval',
    `await import(${JSON.stringify(specifier)})`,
  ])
}

const passingFixtures = [
  ['eslint.base.config.mjs', 'src/base/math.ts'],
  ['eslint.node.config.mjs', 'src/node/server.ts'],
  ['eslint.react.config.mjs', 'src/react/component.tsx'],
  ['eslint.react-native.config.mjs', 'src/native/app.tsx'],
  ['eslint.playwright.config.mjs', 'e2e/smoke.spec.ts'],
]

for (const [configFile, targetFile] of passingFixtures) {
  run('pnpm', [
    'exec',
    'eslint',
    '--max-warnings',
    '0',
    '--config',
    configFile,
    targetFile,
  ])
}

expectLintFailure('eslint.base.config.mjs', 'src/base/bad-import.ts')
expectLintFailure('eslint.react.config.mjs', 'src/react/bad-hooks.tsx')
expectLintFailure(
  'eslint.react-native.config.mjs',
  'src/native/bad-inline-style.tsx'
)
expectLintFailure('eslint.playwright.config.mjs', 'e2e/focused.spec.ts')

const basePrintedConfig = printConfig(
  'eslint.base.config.mjs',
  'src/base/math.ts'
)
assertRule(basePrintedConfig, 'import/no-duplicates')
assertRule(basePrintedConfig, 'simple-import-sort/imports')
assertNoRulePrefix(basePrintedConfig, 'sonarjs/')
assertNoRulePrefix(basePrintedConfig, 'unicorn/')

assertRule(
  printConfig('eslint.react.config.mjs', 'src/react/component.tsx'),
  'react-hooks/rules-of-hooks'
)
assertRule(
  printConfig('eslint.react-native.config.mjs', 'src/native/app.tsx'),
  'react-native/no-inline-styles'
)
assertRule(
  printConfig('eslint.playwright.config.mjs', 'e2e/smoke.spec.ts'),
  'playwright/no-focused-test'
)

console.log('eslint packed consumer fixture smoke ok')
