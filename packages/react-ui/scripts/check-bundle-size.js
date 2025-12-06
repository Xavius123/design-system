import { readFileSync, statSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const MAX_BUNDLE_SIZE = 100 * 1024; // 100KB
const MAX_CSS_SIZE = 50 * 1024; // 50KB

const distPath = resolve(__dirname, '..', 'dist');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function checkFileSize(filePath, maxSize, fileType) {
  try {
    const stats = statSync(filePath);
    const size = stats.size;
    const formatted = formatBytes(size);
    
    if (size > maxSize) {
      console.error(`❌ ${fileType} bundle too large: ${formatted} (max: ${formatBytes(maxSize)})`);
      return false;
    } else {
      console.log(`✅ ${fileType}: ${formatted}`);
      return true;
    }
  } catch (error) {
    console.warn(`⚠️  Could not check ${fileType}: ${error.message}`);
    return true;
  }
}

console.log('📦 Checking bundle sizes...\n');

const jsFiles = ['index.esm.js', 'index.cjs.js'];
const cssFile = 'index.css';

let allPassed = true;

// Check JS bundles
for (const file of jsFiles) {
  const filePath = resolve(distPath, file);
  if (!checkFileSize(filePath, MAX_BUNDLE_SIZE, file)) {
    allPassed = false;
  }
}

// Check CSS bundle
const cssPath = resolve(distPath, cssFile);
if (!checkFileSize(cssPath, MAX_CSS_SIZE, 'CSS')) {
  allPassed = false;
}

console.log('');

if (!allPassed) {
  console.error('❌ Bundle size check failed. Please optimize your bundle.');
  process.exit(1);
} else {
  console.log('✅ All bundle sizes within limits');
}

