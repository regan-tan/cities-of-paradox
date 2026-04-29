import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const require = createRequire(import.meta.url);
const vitePackageJson = require.resolve('vite/package.json');
const viteRoot = path.dirname(vitePackageJson);
const viteBin = path.join(viteRoot, 'bin', 'vite.js');

const result = spawnSync(process.execPath, [viteBin, 'build'], {
  stdio: 'inherit'
});

process.exit(result.status ?? 1);
