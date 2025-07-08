export default {
  source: ['tokens/colors-*.json'],
  platforms: {
    light: {
      buildPath: 'build/scss/',
      transformGroup: 'scss',
      files: [
        {
          destination: '_variables-light.scss',
          format: 'scss/theme-variables',
          filter: (token) => token.filePath.includes('colors-light'),
        },
      ],
    },
    dark: {
      buildPath: 'build/scss/',
      transformGroup: 'scss',
      files: [
        {
          destination: '_variables-dark.scss',
          format: 'scss/theme-variables',
          filter: (token) => token.filePath.includes('colors-dark'),
        },
      ],
    },
  },
};
