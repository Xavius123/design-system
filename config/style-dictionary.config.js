import { formats, transformGroups } from 'style-dictionary/enums';

export default {
  source: ['tokens/*.json'],
  platforms: {
    scssLight: {
      transformGroup: transformGroups.scss,
      buildPath: 'build/scss/',
      files: [
        {
          destination: '_variables-light.scss',
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
          destination: '_variables-dark.scss',
          format: 'scss/variables',
          filter: (token) => token.filePath.includes('colors-dark'),
        },
      ],
    },
  },
};
