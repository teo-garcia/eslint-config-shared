import { execFileSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
)
const packageJson = JSON.parse(
  readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
)
const tempRoot = mkdtempSync(path.join(tmpdir(), 'teo-eslint-consumer-'))
const tarballDir = path.join(tempRoot, 'tarballs')
const consumerDir = path.join(tempRoot, 'consumer')

mkdirSync(tarballDir)
mkdirSync(path.join(consumerDir, 'src'), { recursive: true })

execFileSync('pnpm', ['pack', '--pack-destination', tarballDir], {
  cwd: packageRoot,
  stdio: 'inherit',
})

const tarballName = readdirSync(tarballDir).find((file) =>
  file.endsWith('.tgz')
)

if (!tarballName) {
  throw new Error('pnpm pack did not create a tarball')
}

writeFileSync(
  path.join(consumerDir, 'package.json'),
  `${JSON.stringify(
    {
      private: true,
      type: 'module',
      dependencies: {
        [packageJson.name]: `file:${path.join(tarballDir, tarballName)}`,
        ...packageJson.peerDependencies,
      },
      devDependencies: {
        typescript: '^5.8.3',
      },
    },
    null,
    2
  )}\n`
)

writeFileSync(
  path.join(consumerDir, 'eslint.config.mjs'),
  "import config from '@teo-garcia/eslint-config-shared/base'\n\nexport default config\n"
)

writeFileSync(
  path.join(consumerDir, 'tsconfig.json'),
  `${JSON.stringify(
    {
      compilerOptions: {
        noEmit: true,
        strict: true,
        target: 'ES2022',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
      },
      include: ['src/**/*.ts'],
    },
    null,
    2
  )}\n`
)

writeFileSync(
  path.join(consumerDir, 'src/index.ts'),
  'export function add(left: number, right: number): number {\n  return left + right\n}\n'
)

execFileSync('pnpm', ['install', '--ignore-scripts'], {
  cwd: consumerDir,
  stdio: 'inherit',
})

for (const specifier of [
  '@teo-garcia/eslint-config-shared',
  '@teo-garcia/eslint-config-shared/base',
  '@teo-garcia/eslint-config-shared/node',
  '@teo-garcia/eslint-config-shared/playwright',
  '@teo-garcia/eslint-config-shared/react',
  '@teo-garcia/eslint-config-shared/react-native',
]) {
  await import(specifier)
}

execFileSync('pnpm', ['exec', 'eslint', 'src/index.ts'], {
  cwd: consumerDir,
  stdio: 'inherit',
})

console.log('eslint packed consumer smoke ok')
