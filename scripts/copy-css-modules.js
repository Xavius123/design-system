import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const sourceDir = join(rootDir, 'source', 'redhorn-components', 'src', 'components');
const targets = ['react', 'angular', 'vue']; // React Native uses overrides with StyleSheet

function copyCSS(srcPath, componentName) {
  const cssFile = `${componentName}.module.css`;
  const cssPath = join(srcPath, cssFile);
  
  if (existsSync(cssPath)) {
    targets.forEach(target => {
      const destDir = join(rootDir, 'packages', target, 'src', 'components', componentName);
      if (existsSync(destDir)) {
        const destPath = join(destDir, cssFile);
        copyFileSync(cssPath, destPath);
        console.log(`✓ Copied ${cssFile} to ${target}/src/components/${componentName}/`);
      }
    });
  }
}

function walkComponents(dir) {
  const items = readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      copyCSS(fullPath, item);
    }
  });
}

console.log('📦 Copying CSS modules to generated packages...\n');
walkComponents(sourceDir);
console.log('\n✅ CSS modules copied successfully!');
