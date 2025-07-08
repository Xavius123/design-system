import StyleDictionary from 'style-dictionary';
import config from '../config/style-dictionary.config.js';

StyleDictionary.registerFormat({
  name: 'scss/theme-variables',
  formatter: ({ dictionary }) =>
    dictionary.allProperties
      .map((prop) => `$${prop.name}: ${prop.value};`)
      .join('\n'),
});

const sd = new StyleDictionary(config);
sd.buildAllPlatforms();
console.log('✅ Built SCSS variables!');
