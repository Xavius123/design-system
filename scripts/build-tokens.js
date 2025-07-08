import StyleDictionary from 'style-dictionary';
import config from '../config/style-dictionary.config.js';

// Register your custom SCSS format
StyleDictionary.registerFormat({
  name: 'scss/theme-variables',
  formatter: ({ dictionary }) =>
    dictionary.allProperties
      .map((prop) => `$${prop.name}: ${prop.value};`)
      .join('\n'),
});

// Use the extend() method to create an instance
const sd = StyleDictionary.extend(config);

// Build all platforms
sd.buildAllPlatforms();
console.log('✅ Built SCSS variables!');
