const path = require('path');

module.exports = {
  source: ['tokens/*.json'],
  platforms: {
    scssLight: {
      buildPath: 'build/scss/',
      transformGroup: 'scss',
      files: [
        {
          destination: '_variables-light.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors-light'),
        },
      ],
    },
    scssDark: {
      buildPath: 'build/scss/',
      transformGroup: 'scss',
      files: [
        {
          destination: '_variables-dark.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors-dark'),
        },
      ],
    },
  },
};
