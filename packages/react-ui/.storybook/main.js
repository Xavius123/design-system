import { mergeConfig } from 'vite';
import { resolve } from 'path';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    './addons/design-tokens-panel/register.js',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
          '@tokens': resolve(__dirname, '../../../packages/tokens/dist/css'),
        },
      },
      css: {
        modules: {
          localsConvention: 'camelCase',
        },
      },
    });
  },
};

export default config;
