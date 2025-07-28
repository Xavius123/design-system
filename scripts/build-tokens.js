import StyleDictionary from 'style-dictionary';
import styleConfig from '../config/style-dictionary.config.js';
import '../config/formats/scss-getters.js';

console.log('Building design tokens...');

// Build all platforms
const dictionary = new StyleDictionary(styleConfig);

await dictionary.buildAllPlatforms();

console.log('✅ Design tokens built successfully!');
