const StyleDictionary = require('style-dictionary');
const config = require('../config/style-dictionary.config.js');

// Register custom format (optional)
StyleDictionary.registerFormat({
  name: 'scss/variables',
  formatter: function ({ dictionary }) {
    return dictionary.allProperties
      .map((token) => `$${token.name}: ${token.value};`)
      .join('\n');
  },
});

const sd = StyleDictionary.extend(config);

sd.buildAllPlatforms();
console.log('✅ SCSS variables built!');
