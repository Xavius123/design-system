import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧹 Removing Mitosis JSX pragmas from generated components...');

const frameworks = [
  { name: 'react', ext: '.tsx' },
  { name: 'angular', ext: '.ts' },
  { name: 'vue', ext: '.vue' }
];

let fixedCount = 0;

frameworks.forEach(({ name, ext }) => {
  const componentsDir = join(__dirname, `../packages/${name}/src/components`);
  
  if (!existsSync(componentsDir)) {
    console.warn(`⚠ Components directory not found: ${componentsDir}`);
    return;
  }

  const components = readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  components.forEach(component => {
    const filePath = join(componentsDir, component, `${component}${ext}`);
    
    if (existsSync(filePath)) {
      try {
        let content = readFileSync(filePath, 'utf8');
        
        // Remove the Mitosis JSX pragma
        const originalContent = content;
        content = content.replace(/\/\*\* @jsxImportSource @builder\.io\/mitosis \*\/\n?/g, '');
        
        if (content !== originalContent) {
          writeFileSync(filePath, content, 'utf8');
          console.log(`✓ Cleaned ${name}/${component}${ext}`);
          fixedCount++;
        }
      } catch (error) {
        console.error(`✗ Failed to clean ${name}/${component}${ext}:`, error.message);
      }
    }
  });
});

console.log(`\n✅ Cleaned ${fixedCount} component file(s)!\n`);
