import StyleDictionary from 'style-dictionary/lib/StyleDictionary.js';
import config from '../config/style-dictionary.config.js';

console.log('Building design tokens...');

// Build all platforms
StyleDictionary.extend(config).buildAllPlatforms();

console.log('✅ Design tokens built successfully!');
console.log('\nGenerated files:');
console.log('- build/scss/variables.scss (Base variables)');
console.log('- build/scss/theme/variables-light.scss (Light theme SCSS variables)');
console.log('- build/scss/theme/variables-dark.scss (Dark theme SCSS variables)');
console.log('- build/scss/theme/getters.scss (SCSS getter functions)');
console.log('- build/css/variables-light.css (Light theme CSS variables)');
console.log('- build/css/variables-dark.css (Dark theme CSS variables)');
