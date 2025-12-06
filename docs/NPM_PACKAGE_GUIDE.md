# NPM Package Distribution Guide

## Package Structure for NPM

### Recommended Directory Structure

```
design-system/
├── package.json
├── README.md
├── LICENSE
├── .npmignore
├── .gitignore
├── src/                    # Source files (not published)
│   ├── index.js
│   ├── components/
│   └── styles/
├── dist/                   # Built files (published)
│   ├── index.esm.js        # ESM format
│   ├── index.cjs.js        # CommonJS format
│   ├── index.d.ts          # TypeScript definitions
│   ├── index.css           # All styles
│   └── tokens/
│       ├── light.css
│       └── dark.css
├── .storybook/             # Dev only (not published)
└── node_modules/
```

---

## Package.json Configuration

### Complete Package.json Template

```json
{
  "name": "@your-org/design-system",
  "version": "1.0.0",
  "description": "Toyota-branded React design system components",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css",
    "./tokens/light": "./dist/tokens/light.css",
    "./tokens/dark": "./dist/tokens/dark.css",
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": [
    "**/*.css",
    "dist/index.css",
    "dist/tokens/*.css"
  ],
  "scripts": {
    "build": "vite build",
    "build:storybook": "storybook build",
    "prepublishOnly": "npm run build && npm run test",
    "prepack": "npm run build"
  },
  "keywords": [
    "design-system",
    "react",
    "components",
    "ui",
    "toyota",
    "radix-ui",
    "css-modules"
  ],
  "author": "Your Organization",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/design-system.git"
  },
  "bugs": {
    "url": "https://github.com/your-org/design-system/issues"
  },
  "homepage": "https://github.com/your-org/design-system#readme",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4"
  },
  "devDependencies": {
    "@storybook/react": "^8.4.7",
    "@storybook/react-vite": "^8.4.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^6.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Build Configuration

### Vite Build Config for Library Mode

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'DesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
```

---

## .npmignore Configuration

```
# Source files
src/
components/
tokens/
scripts/
config/

# Development files
.storybook/
*.stories.jsx
*.test.jsx
*.spec.jsx
*.test.ts
*.spec.ts

# Config files
vite.config.js
.storybook/
.eslintrc*
.prettierrc*
tsconfig.json
jest.config.*

# Build tools
node_modules/
.git/
.gitignore
.npmignore

# Documentation (keep README.md)
docs/
*.md
!README.md

# Only publish dist/ and essential files
```

---

## CSS Distribution Strategy

### Option 1: Single CSS File (Recommended)

```js
// dist/index.css
@import './tokens/light.css';
@import './tokens/dark.css';

/* Component styles are in JS (CSS Modules) */
```

**Usage:**
```jsx
import '@your-org/design-system/styles';
```

### Option 2: Separate Token Files

```jsx
// Import only what you need
import '@your-org/design-system/tokens/light';
import '@your-org/design-system/tokens/dark';
```

### Option 3: CSS-in-JS (Not Recommended)

- Adds runtime overhead
- Breaks tree-shaking
- Harder to theme

---

## TypeScript Support

### Generate Type Definitions

```bash
# Using vite-plugin-dts
npm install -D vite-plugin-dts

# Types will be generated in dist/index.d.ts
```

### Manual Type Definitions

```typescript
// dist/index.d.ts
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  asChild?: boolean;
}

export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;

// ... other component types
```

---

## Publishing Workflow

### 1. Pre-Publish Checklist

```bash
# Build the package
npm run build

# Run tests
npm test

# Build Storybook (optional, for documentation site)
npm run build:storybook

# Check package size
npm pack --dry-run

# Verify files to be published
npm pack
tar -xzf *.tgz
ls package/
```

### 2. Version Management

```bash
# Patch release (bug fixes)
npm version patch
# 1.0.0 -> 1.0.1

# Minor release (new features)
npm version minor
# 1.0.0 -> 1.1.0

# Major release (breaking changes)
npm version major
# 1.0.0 -> 2.0.0
```

### 3. Publishing

```bash
# Login to npm
npm login

# Publish (public)
npm publish --access public

# Publish (scoped package)
npm publish

# Publish beta
npm publish --tag beta
```

---

## Consumer Usage Patterns

### Next.js

```jsx
// app/layout.js or pages/_app.js
import '@your-org/design-system/styles';

// Component usage
import { Button, Input } from '@your-org/design-system';

export default function Page() {
  return <Button>Click me</Button>;
}
```

### Vite

```jsx
// main.jsx
import '@your-org/design-system/styles';
import { Button } from '@your-org/design-system';
```

### Create React App

```jsx
// src/index.js
import '@your-org/design-system/styles';

// Component usage
import { Button } from '@your-org/design-system';
```

### With TypeScript

```tsx
import { Button, Input } from '@your-org/design-system';
import '@your-org/design-system/styles';

// Full type safety
const MyComponent = () => {
  return (
    <Button variant="primary" size="md">
      Click
    </Button>
  );
};
```

---

## Package Size Optimization

### 1. Tree Shaking

```js
// ✅ GOOD: Named exports
export { Button } from './Button';
export { Input } from './Input';

// ❌ BAD: Default export (harder to tree-shake)
export default { Button, Input };
```

### 2. External Dependencies

```js
// vite.config.js
rollupOptions: {
  external: ['react', 'react-dom', '@radix-ui/react-checkbox'],
}
```

### 3. CSS Optimization

- Use CSS Modules (scoped, no global pollution)
- Separate token files (import only what you need)
- Minify CSS in production build

---

## Versioning Strategy

### Semantic Versioning Rules

**MAJOR (2.0.0):**
- Breaking API changes
- Removed props
- Changed component structure
- Removed CSS variables

**MINOR (1.1.0):**
- New components
- New props (backward compatible)
- New CSS variables
- New features

**PATCH (1.0.1):**
- Bug fixes
- Performance improvements
- Documentation updates
- Internal refactoring

### Changelog Template

```markdown
# Changelog

## [1.1.0] - 2024-01-15

### Added
- New Card component
- Support for `asChild` prop on Button

### Changed
- Improved focus styles for better accessibility

### Fixed
- Input error state styling issue

## [1.0.1] - 2024-01-10

### Fixed
- Button hover state in dark theme
```

---

## Testing in Different Environments

### Test Matrix

Before publishing, test in:

- [ ] Next.js 13+ (App Router)
- [ ] Next.js 12 (Pages Router)
- [ ] Vite + React
- [ ] Create React App
- [ ] Remix
- [ ] Gatsby

### Test Checklist

```bash
# Create test projects
npx create-next-app@latest test-nextjs
npx create-vite@latest test-vite --template react
npx create-react-app test-cra

# Install your package
cd test-nextjs && npm install @your-org/design-system

# Test imports
# Test CSS loading
# Test component rendering
# Test theme switching
```

---

## Documentation Site

### Option 1: Storybook Static Build

```bash
npm run build:storybook
# Deploy dist/storybook/ to GitHub Pages, Netlify, Vercel
```

### Option 2: Dedicated Docs Site

- Docusaurus
- VitePress
- Next.js docs

---

## Common Issues & Solutions

### Issue: CSS Not Loading

**Solution:**
```jsx
// Ensure CSS is imported
import '@your-org/design-system/styles';
```

### Issue: TypeScript Errors

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Issue: Tree Shaking Not Working

**Solution:**
- Use named exports
- Mark side effects in package.json
- Ensure ESM format is available

---

## Best Practices Summary

1. **Keep it lightweight** - Only essential dependencies
2. **Support all formats** - ESM + CJS
3. **TypeScript support** - Generate .d.ts files
4. **CSS flexibility** - Separate token files
5. **Clear documentation** - README + Storybook
6. **Version carefully** - Follow semver
7. **Test widely** - Multiple environments
8. **Optimize size** - Tree-shakeable exports

Following this guide ensures your design system is production-ready and easily consumable across any React environment.

