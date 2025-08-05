import StyleDictionary from 'style-dictionary';
import '../config/formats/typescript-colors.js';

console.log('Building TypeScript files...');

// Create a custom configuration for TypeScript
const typescriptConfig = {
  source: ['tokens/*.json'],
  platforms: {
    typescript: {
      transformGroup: 'css',
      buildPath: 'build/typescript/',
      files: [
        {
          destination: 'colors.ts',
          format: 'typescript/colors',
          filter: (token) =>
            token.filePath.includes('colors-light') ||
            token.filePath.includes('colors-dark'),
        },
      ],
    },
  },
};

// Build all platforms
const dictionary = new StyleDictionary(typescriptConfig);

await dictionary.buildAllPlatforms();

console.log('✅ TypeScript files built successfully!'); 