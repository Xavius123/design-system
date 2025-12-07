# Redhorn Design System

Modern design system with design tokens and cross-platform UI components (React Web & React Native).

## Structure

```
design-system/
├── packages/
│   ├── tokens/              # Design tokens (colors, typography, spacing, etc.)
│   │   ├── *.json          # Token definitions
│   │   └── dist/           # Generated outputs (css/, js/)
│   ├── react-ui/           # React UI component library (npm package)
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   └── styles/     # Global styles
│   │   ├── dist/           # Built package (generated)
│   │   └── .storybook/     # Storybook configuration
│   └── react-native-ui/    # React Native UI component library (npm package)
│       └── src/
│           └── components/ # React Native components
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
npm install @redhorn/react-ui
```

```jsx
import { Button, Input, Checkbox } from '@redhorn/react-ui';
import '@redhorn/react-ui/styles';

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

- **[Repository Improvements](docs/REPO_IMPROVEMENTS.md)** - 7 essential tools to improve code quality, speed, and collaboration
- **[Multi-Brand Architecture](docs/MULTI_BRAND.md)** - Managing multiple brands with token-based theming
- **[MCP Setup Guide](docs/MCP_SETUP.md)** - Configure Model Context Protocol for AI-assisted development
- [Storybook Addons Guide](docs/STORYBOOK_ADDONS.md)
- [Chromatic Visual Regression Testing](docs/CHROMATIC.md)
- [Advanced Improvements Guide](docs/ADVANCED_IMPROVEMENTS.md)
- [Design System Best Practices](docs/DESIGN_SYSTEM_BEST_PRACTICES.md)
- [Component Architecture Guide](docs/COMPONENT_ARCHITECTURE.md)
- [NPM Package Guide](docs/NPM_PACKAGE_GUIDE.md)
- [Quick Reference](docs/QUICK_REFERENCE.md)

## License

ISC
