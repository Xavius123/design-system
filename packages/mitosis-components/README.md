# @redhorn/mitosis-components

Multi-framework components source using [Mitosis](https://mitosis.builder.io/). Write components once, compile to React, Angular, Vue, Svelte, and more.

## Overview

This package contains the **source** Mitosis components (`.lite.tsx` files) that compile to framework-specific implementations. These are NOT meant to be used directly - they generate the actual components in other packages.

**Generated Outputs:**
- `@redhorn/react-ui-generated` - React components
- `@redhorn/angular-ui` - Angular components
- `@redhorn/vue-ui` - Vue 3 components

## Current Components

- **Button** - Multi-variant button with sizes
- **Input** - Text input with label, error states, and helper text

## Development

### Prerequisites

```bash
npm install
```

### Building

```bash
# Build all framework outputs
npm run build

# Watch mode for development
npm run watch
```

### Project Structure

```
src/
└── components/
    ├── Button/
    │   ├── Button.lite.tsx       # Mitosis source
    │   └── Button.module.css     # Styles
    └── Input/
        ├── Input.lite.tsx        # Mitosis source
        └── Input.module.css      # Styles
```

## Adding New Components

See [MITOSIS_GUIDELINES.md](../../docs/MITOSIS_GUIDELINES.md) for detailed instructions.

**Quick Start:**

1. Create component directory: `src/components/NewComponent/`
2. Write `.lite.tsx` file following Mitosis constraints
3. Copy CSS Module from React version
4. Run `npm run build` to generate framework outputs
5. Test generated components in each framework

## Mitosis Constraints

Mitosis uses a restricted subset of JSX:

✅ **Allowed:**
- Basic JSX elements
- `useStore` for state
- Event handlers
- CSS Modules
- Conditional rendering
- Simple computations

❌ **Not Allowed:**
- React hooks (`useEffect`, `useRef`, etc.)
- Complex logic in JSX
- Prop spreading
- Context API
- Async operations

## Configuration

See `mitosis.config.js` for build configuration:

```js
export default {
  files: 'src/**/*.lite.tsx',
  targets: ['react', 'angular', 'vue3'],
  options: {
    react: { stylesType: 'style-tag', typescript: true },
    angular: { standalone: true, typescript: true },
    vue3: { typescript: true, api: 'composition' }
  },
  dest: '../'
}
```

## Resources

- [Mitosis Documentation](https://mitosis.builder.io/)
- [Design System Docs](../../docs/MITOSIS_GUIDELINES.md)
- [Migration Agent Skill](../../agent/design-system-migration/SKILL.md)

## License

ISC
