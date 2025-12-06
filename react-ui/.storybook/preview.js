import React from 'react';
import '../src/styles/global.css';
import { initTheme } from '../src/utils/theme';

// Initialize theme on Storybook load
if (typeof window !== 'undefined') {
  initTheme();
}

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Ensure theme is initialized
      if (typeof window !== 'undefined') {
        initTheme();
      }
      return React.createElement(Story);
    },
  ],
};

export default preview;

