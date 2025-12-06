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
│   ├── dist/           # Built package (generated)
│   └── .storybook/     # Storybook configuration
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

React component library built with Radix UI and CSS Modules. This package will be published to npm.

**Development:**
```bash
npm run storybook
```

**Build:**
```bash
npm run build
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

4. **Build React UI package:**
   ```bash
   npm run build
   ```

## Using React UI Package

Once published, install the package:

```bash
npm install @your-org/react-ui
```

```jsx
import { Button, Input, Checkbox } from '@your-org/react-ui';
import '@your-org/react-ui/styles';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input label="Email" placeholder="Enter email" />
      <Checkbox label="Accept terms" />
    </div>
  );
}
```

## Workspace Scripts

From the root directory:

- `npm run build:token` - Build design tokens
- `npm run build` - Build tokens and react-ui package
- `npm run storybook` - Start Storybook (runs in react-ui workspace)

## Documentation

See `docs/` directory for:
- Design System Best Practices
- Component Architecture Guide
- Storybook Best Practices
- NPM Package Guide
- Quick Reference

## License

ISC
