import { formats, transformGroups } from 'style-dictionary/enums';

export default {
  source: ['tokens/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors'),
        },
      ],
    },
    scssLight: {
      transformGroup: transformGroups.scss,
      buildPath: 'build/scss/',
      files: [
        {
          destination: 'theme/variables-light.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors-light'),
        },
      ],
    },
    scssDark: {
      transformGroup: transformGroups.scss,
      buildPath: 'build/scss/',
      files: [
        {
          destination: 'theme/variables-dark.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors-dark'),
        },
      ],
    },
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables-light.css',
          format: 'css/variables',
          selector: ':root[data-theme="light"]',
          filter: (token) => token.filePath.includes('colors-light'),
        },
        {
          destination: 'variables-dark.css',
          format: 'css/variables',
          selector: ':root[data-theme="dark"]',
          filter: (token) => token.filePath.includes('colors-dark'),
        },
      ],
    },
  },
};
