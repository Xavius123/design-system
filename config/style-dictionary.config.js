import { transformGroups } from 'style-dictionary/enums';

export default {
  source: ['tokens/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      files: [
        {
          destination: 'light.css',
          format: 'css/variables',
          selector: ':root[data-theme="light"]',
          filter: (token) => 
            token.filePath.includes('colors-light') || 
            token.filePath.includes('theme-light'),
        },
        {
          destination: 'dark.css',
          format: 'css/variables',
          selector: ':root[data-theme="dark"]',
          filter: (token) => 
            token.filePath.includes('colors-dark') || 
            token.filePath.includes('theme-dark'),
        },
      ],
    },
  },
};
