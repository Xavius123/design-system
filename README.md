# Design System Monorepo

Toyota-branded design system with design tokens and React UI components.

## Structure

```
design-system/
├── tokens/              # Design tokens (colors, typography, spacing, etc.)
│   ├── *.json          # Token definitions
│   └── dist/css/       # Generated CSS variables
├── react-ui/           # React UI component library (npm package)
│   ├── src/
│   │   ├── components/ # React components
│   │   └── styles/     # Global styles
│   └── dist/           # Built package
├── config/             # Style Dictionary configuration
├── scripts/            # Build and utility scripts
└── docs/               # Documentation
```

## Packages

### Tokens

Design tokens built with Style Dictionary. Generates CSS variables for light and dark themes.

**Build tokens:**
```bash
npm run build:token
```

**Output:** `tokens/dist/css/light.css` and `tokens/dist/css/dark.css`

### React UI

React component library built with Radix UI and CSS Modules.

**Development:**
```bash
npm run storybook --workspace=react-ui
```

**Build:**
```bash
npm run build --workspace=react-ui
```

**Publish:**
```bash
cd react-ui
npm publish
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build tokens:**
   ```bash
   npm run build:token
   ```

3. **Start Storybook:**
   ```bash
   npm run storybook
   ```

## Using React UI Package

```bash
npm install @your-org/react-ui
```

```jsx
import { Button, Input, Checkbox } from '@your-org/react-ui';
import '@your-org/react-ui/styles';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Documentation

See `docs/` directory for:
- Design System Best Practices
- Component Architecture Guide
- Storybook Best Practices
- NPM Package Guide
- Quick Reference

## License

ISC
