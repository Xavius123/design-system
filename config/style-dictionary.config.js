import { transformGroups } from 'style-dictionary/enums';

export default {
  source: ['packages/tokens/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'packages/tokens/dist/css/',
      files: [
        {
          destination: 'light.css',
          format: 'css/variables',
          selector: ':root[data-theme="light"]',
          filter: (token) => 
            token.filePath.includes('colors-light') || 
            token.filePath.includes('theme-light') ||
            token.filePath.includes('z-index') ||
            (!token.filePath.includes('colors-dark') && !token.filePath.includes('theme-dark')),
        },
        {
          destination: 'dark.css',
          format: 'css/variables',
          selector: ':root[data-theme="dark"]',
          filter: (token) => 
            token.filePath.includes('colors-dark') || 
            token.filePath.includes('theme-dark') ||
            token.filePath.includes('z-index') ||
            (!token.filePath.includes('colors-light') && !token.filePath.includes('theme-light')),
        },
      ],
    },
    javascript: {
      transformGroup: 'js',
      buildPath: 'packages/tokens/dist/js/',
      files: [
        {
          destination: 'light.js',
          format: 'javascript/es6',
          filter: (token) => 
            token.filePath.includes('colors-light') || 
            token.filePath.includes('theme-light'),
        },
        {
          destination: 'dark.js',
          format: 'javascript/es6',
          filter: (token) => 
            token.filePath.includes('colors-dark') || 
            token.filePath.includes('theme-dark'),
        },
      ],
    },
  },
};
