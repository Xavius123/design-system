import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Change 'design-system' to your repository name
  base: process.env.NODE_ENV === 'production' ? '/design-system/' : '/',
  
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});

