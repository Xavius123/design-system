import { transformGroups } from 'style-dictionary/enums';
import scopedCSSFormat from './formats/scoped-css.js';

export default {
  source: ['packages/tokens/*.json'],
  // Register custom format
  format: {
    'css/scoped': scopedCSSFormat,
  },
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'packages/tokens/dist/css/',
      files: [
        // Legacy global versions (backward compatibility)
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
        // NEW: Scoped versions (collision-proof)
        {
          destination: 'light-scoped.css',
          format: 'css/scoped',
          options: {
            selector: '.redhorn-theme',
            theme: 'light',
          },
          filter: (token) => 
            token.filePath.includes('colors-light') || 
            token.filePath.includes('theme-light'),
        },
        {
          destination: 'dark-scoped.css',
          format: 'css/scoped',
          options: {
            selector: '.redhorn-theme',
            theme: 'dark',
          },
          filter: (token) => 
            token.filePath.includes('colors-dark') || 
            token.filePath.includes('theme-dark'),
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
