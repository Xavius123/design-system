import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@tokens': resolve(__dirname, '../../tokens/dist/css'),
    },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
    }),
    // Bundle CSS with token imports resolved
    {
      name: 'bundle-css',
      writeBundle() {
        try {
          mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
          
          // Read token CSS files
          const lightCss = readFileSync(
            resolve(__dirname, '../../tokens/dist/css/light.css'),
            'utf8'
          );
          const darkCss = readFileSync(
            resolve(__dirname, '../../tokens/dist/css/dark.css'),
            'utf8'
          );
          
          // Read global CSS
          let globalCss = readFileSync(
            resolve(__dirname, 'src/styles/global.css'),
            'utf8'
          );
          
           // Replace imports with actual content (supports both alias and relative paths)
           globalCss = globalCss.replace(
             /@import\s+['"]@tokens\/light\.css['"];?\s*/g,
             lightCss + '\n'
           );
           globalCss = globalCss.replace(
             /@import\s+['"]@tokens\/dark\.css['"];?\s*/g,
             darkCss + '\n'
           );
           // Also handle relative paths for compatibility
           globalCss = globalCss.replace(
             /@import\s+['"].*tokens\/dist\/css\/light\.css['"];?\s*/g,
             lightCss + '\n'
           );
           globalCss = globalCss.replace(
             /@import\s+['"].*tokens\/dist\/css\/dark\.css['"];?\s*/g,
             darkCss + '\n'
           );
          
          // Write bundled CSS
          writeFileSync(
            resolve(__dirname, 'dist/index.css'),
            globalCss
          );
        } catch (err) {
          console.error('Error bundling CSS:', err);
          throw err;
        }
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    outDir: 'dist',
  },
});
