import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesDir = join(__dirname, '../source/redhorn-components/templates/react-native');
const outputDir = join(__dirname, '../packages/react-native/src/components');

console.log('🔧 Fixing React Native components with proper StyleSheet...');

// Get all component folders in templates
const components = readdirSync(templatesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let fixedCount = 0;

components.forEach(component => {
  const templateFile = join(templatesDir, component, `${component}.tsx`);
  const outputFile = join(outputDir, component, `${component}.tsx`);

  if (existsSync(templateFile) && existsSync(outputFile)) {
    try {
      const templateContent = readFileSync(templateFile, 'utf8');
      writeFileSync(outputFile, templateContent, 'utf8');
      console.log(`✓ Fixed ${component}.tsx with StyleSheet implementation`);
      fixedCount++;
    } catch (error) {
      console.error(`✗ Failed to fix ${component}.tsx:`, error.message);
    }
  } else {
    if (!existsSync(templateFile)) {
      console.warn(`⚠ Template not found: ${templateFile}`);
    }
    if (!existsSync(outputFile)) {
      console.warn(`⚠ Output file not found: ${outputFile}`);
    }
  }
});

console.log(`\n✅ Fixed ${fixedCount} React Native component(s)!\n`);
