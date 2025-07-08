import StyleDictionary from 'style-dictionary';
import config from '../config/style-dictionary.config.js';

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
console.log('✅ Tokens built using v5!');
