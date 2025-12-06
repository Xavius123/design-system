import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const requiredTokenFiles = [
  'packages/tokens/dist/css/light.css',
  'packages/tokens/dist/css/dark.css',
];

const requiredTokenFilesExist = requiredTokenFiles.every((file) => {
  const filePath = resolve(__dirname, '..', file);
  const exists = existsSync(filePath);
  if (!exists) {
    console.error(`❌ Missing required token file: ${file}`);
  }
  return exists;
});

if (!requiredTokenFilesExist) {
  console.error('❌ Token validation failed. Please run: npm run build:token');
  process.exit(1);
}

// Validate CSS files contain variables
let hasVariables = true;
for (const file of requiredTokenFiles) {
  const filePath = resolve(__dirname, '..', file);
  const content = readFileSync(filePath, 'utf8');
  if (!content.includes('--') || content.trim().length === 0) {
    console.error(`❌ Token file ${file} appears to be empty or invalid`);
    hasVariables = false;
  }
}

if (!hasVariables) {
  console.error('❌ Token validation failed. Token files are invalid.');
  process.exit(1);
}

console.log('✅ Token validation passed');

