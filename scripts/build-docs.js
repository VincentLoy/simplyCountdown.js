import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(__dirname);

async function buildDocs() {
  // 1. Prepare docs directory
  await fs.emptyDir(path.join(rootDir, 'docs'));
  
  // 2. Create css directory
  await fs.mkdir(path.join(rootDir, 'docs/css'));
  
  // 3. Copy specific CSS files
  const cssFiles = [
    'demo.css',
    'simplyCountdown.theme.custom.css',
    'simplyCountdown.theme.default.css',
    'simplyCountdown.theme.losange.css'
  ];
  
  for (const file of cssFiles) {
    await fs.copy(
      path.join(rootDir, 'demo/css', file),
      path.join(rootDir, 'docs/css', file)
    );
  }
  
  // Copy demo-only directory
  await fs.copy(
    path.join(rootDir, 'demo/css/demo-only'),
    path.join(rootDir, 'docs/css/demo-only')
  );
  
  // 4. Copy index.html
  await fs.copy(
    path.join(rootDir, 'demo/index.html'),
    path.join(rootDir, 'docs/index.html')
  );
  
  // 5. Copy dist files
  await fs.copy(
    path.join(rootDir, 'dist'),
    path.join(rootDir, 'docs/dist')
  );

  // 6. Update script path in docs/index.html
  const indexPath = path.join(rootDir, 'docs/index.html');
  let content = await fs.readFile(indexPath, 'utf-8');
  content = content.replace(
    '../src/simplyCountdown.js',
    './dist/simplyCountdown.iife.js'
  );
  await fs.writeFile(indexPath, content);
}

buildDocs().catch(console.error);
