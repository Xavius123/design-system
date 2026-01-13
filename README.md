# Design System Monorepo

A comprehensive design system with token management, React UI components, and demo application.

**Live Demo**: https://YOUR-USERNAME.github.io/design-system/

## 📦 Packages

### `packages/tokens/`
Design tokens generated from JSON using Style Dictionary.

- **Source**: JSON token files (Token Studio format)
- **Output**: CSS variables (light/dark themes)
- **Build**: `npm run build:token`

### `packages/react-ui/`
React component library with Radix UI and CSS Modules.

- **Components**: Button, Checkbox, Input, Toast, Tooltip
- **Storybook**: `npm run storybook --workspace=packages/react-ui`
- **Build**: `npm run build --workspace=packages/react-ui`

### `packages/react-native-ui/`
React Native component library.

- **Components**: Button, Checkbox, Input
- **Platform**: iOS, Android

### `packages/core/`
TypeScript types and metadata shared across packages.

- **Types**: Component props, design tokens
- **Enums**: Component variants, states
- **Build**: Automatic TypeScript compilation

## 🚀 Apps

### `apps/react-app-ds/`
**Live Demo**: https://YOUR-USERNAME.github.io/design-system/

Full-featured demo application showcasing the design system.

- **AppShell**: Responsive layout framework
- **Routing**: React Router with multiple pages
- **Themes**: Light/dark mode switching
- **Start**: `npm run dev --workspace=apps/react-app-ds`

See [apps/react-app-ds/README.md](apps/react-app-ds/README.md) for details.

## 🏃 Quick Start

```bash
# Install all dependencies
npm install

# Build design tokens
npm run build:token

# Run demo app
npm run dev --workspace=apps/react-app-ds

# Run Storybook
npm run storybook --workspace=packages/react-ui
```

## 🛠️ Development

### Monorepo Structure

```
design-system/
├── packages/              # Published npm packages
│   ├── tokens/           # Design tokens
│   ├── core/             # Shared types
│   ├── react-ui/         # React components
│   └── react-native-ui/  # React Native components
│
├── apps/                 # Demo applications (not published)
│   └── react-app-ds/     # Web demo
│
├── scripts/              # Build scripts
├── docs/                 # Documentation
└── package.json          # Root workspace config
```

### Common Commands

```bash
# Install dependencies
npm install

# Build design tokens
npm run build:token

# Validate tokens
npm run validate:tokens

# Build React UI package
npm run build --workspace=packages/react-ui

# Run Storybook
npm run storybook --workspace=packages/react-ui

# Build Storybook
npm run build-storybook --workspace=packages/react-ui

# Run demo app
npm run dev --workspace=apps/react-app-ds

# Format all code
npm run format

# Lint all code
npm run lint
```

## 📚 Documentation

- [Component Architecture](docs/COMPONENT_ARCHITECTURE.md)
- [Multi-Brand Support](docs/MULTI_BRAND.md)
- [CSS Import Safety](docs/CSS_IMPORT_SAFETY_GUIDE.md)
- [Chromatic Visual Testing](docs/CHROMATIC.md)
- [Storybook Addons](docs/STORYBOOK_ADDONS.md)
- [NPM Package Guide](docs/NPM_PACKAGE_GUIDE.md)
- [Repository Improvements](docs/REPO_IMPROVEMENTS.md)
- [Style Isolation](docs/STYLE_ISOLATION.md)
- [Design System Best Practices](docs/DESIGN_SYSTEM_BEST_PRACTICES.md)
- [Quick Reference](docs/QUICK_REFERENCE.md)

## 🎨 Design System Features

### Token System
- JSON source tokens (Token Studio format)
- Style Dictionary transformation
- CSS variables output
- Light/dark theme support

### Component Library
- React components with TypeScript
- Radix UI primitives
- CSS Modules for styling
- Storybook documentation
- Visual regression testing (Chromatic - when configured)

### AppShell Framework
- Responsive layout (mobile/desktop)
- CSS-driven breakpoints
- Customizable header/footer/nav
- Theme switching

## 🚢 Deployment

### Demo App (GitHub Pages)

Automatically deployed on push to `main`:

```bash
# Trigger deployment
git push origin main

# View live demo
# https://YOUR-USERNAME.github.io/design-system/
```

### NPM Packages

```bash
# Build packages
npm run build --workspace=packages/react-ui

# Publish (when ready)
cd packages/react-ui
npm publish
```

## 📖 Using the React UI Package

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

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run tests and linters
4. Create pull request
5. Review visual changes (if Chromatic configured)
6. Merge when approved

## 📄 License

ISC
