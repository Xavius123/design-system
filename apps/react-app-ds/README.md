# Design System Demo App

A fully functional demo application showcasing the design system with AppShell layout, responsive behavior, and theme switching.

## 🎯 Purpose

This demo app serves multiple purposes:

1. **Seed Project** - Clone and customize for your own projects
2. **DS Development** - Test components before extracting to npm
3. **Documentation** - Show how to use the design system
4. **Reference** - Example implementation patterns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# From repository root
npm install

# Run demo app
npm run dev --workspace=apps/react-app-ds
```

Visit: http://localhost:5173

## 📁 Structure

```
apps/react-app-ds/
├── src/
│   ├── tokens/              # Design tokens (CSS vars)
│   │   ├── tokens.css       # Core tokens (spacing, sizing, etc.)
│   │   ├── themes.css       # Light/dark theme colors
│   │   └── breakpoints.ts   # Responsive breakpoints
│   │
│   ├── hooks/               # Utility hooks
│   │   ├── useMediaQuery.ts
│   │   └── useBreakpoint.ts
│   │
│   ├── ui/                  # UI Components
│   │   ├── Button/
│   │   └── Drawer/
│   │
│   ├── framework/           # Layout Framework
│   │   └── AppShell/        # Main responsive layout
│   │
│   ├── pages/               # Demo pages
│   │   ├── HomePage.tsx
│   │   ├── ComponentsPage.tsx
│   │   ├── DocsPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── styles/              # Global styles
│   │   └── globals.css
│   │
│   ├── App.tsx              # Main app with routing
│   └── main.tsx             # Entry point
│
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Key Features

### AppShell Layout Framework

Fully customizable responsive layout:

```typescript
<AppShell
  // Header customization
  headerStart={<YourLogo />}
  headerCenter={<YourSearch />}
  headerEnd={<YourActions />}
  
  // Navigation
  navItems={yourNavItems}
  navTop={<YourBranding />}
  navBottom={<YourVersion />}
  
  // Optional footer
  footer={<YourFooter />}
>
  {children}
</AppShell>
```

**Responsive Behavior:**
- **Mobile (< 768px)**: Burger menu → Drawer overlay
- **Desktop (≥ 768px)**: Permanent sidebar
- **CSS-driven** - No JavaScript for breakpoint switching

### Design Tokens

All tokens scoped to `[data-ds-root]` to prevent CSS bleed:

```css
[data-ds-root] {
  --ds-space-4: 16px;
  --ds-radius-md: 6px;
  --ds-sidebar-width: 240px;
  --ds-header-height: 64px;
}

[data-ds-root][data-theme="light"] {
  --ds-color-background: #ffffff;
  --ds-color-accent: #eb0a1e;
}
```

### Theme Switching

Light/dark theme toggle included:

```typescript
const [theme, setTheme] = useState<'light' | 'dark'>('light');

<div data-ds-root data-theme={theme}>
  <App />
</div>
```

## 🛠️ Customization

### Change Colors

Edit `src/tokens/themes.css`:

```css
[data-ds-root][data-theme="light"] {
  --ds-color-accent: #your-brand-color;
}
```

### Change Layout Sizes

Edit `src/tokens/tokens.css`:

```css
[data-ds-root] {
  --ds-sidebar-width: 280px;  /* Wider sidebar */
  --ds-header-height: 72px;   /* Taller header */
}
```

### Change Breakpoint

Edit `src/framework/AppShell/AppShell.module.css`:

```css
@media (min-width: 1024px) {  /* Changed from 768px */
  .permanentSidebar { display: flex; }
}
```

### Add Custom Pages

1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Add nav item to `navItems` array

## 📦 Build & Deploy

### Build for Production

```bash
npm run build --workspace=apps/react-app-ds
```

Output in `dist/` folder.

### Deploy

The app is automatically deployed to GitHub Pages on push to `main`.

### Manual Deploy

```bash
# Build
npm run build --workspace=apps/react-app-ds

# Deploy to your hosting
# Copy dist/ folder to your server
```

## 🧪 Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Dev Workflow

1. Run dev server: `npm run dev`
2. Make changes to components/pages
3. Hot reload updates automatically
4. Build when ready: `npm run build`

## 🎓 Learning Resources

### Key Concepts

**AppShell Props:**
- `headerStart`, `headerCenter`, `headerEnd` - Header slots
- `navItems` - Navigation menu items
- `navTop`, `navBottom` - Sidebar header/footer
- `footer` - Optional app-wide footer
- `children` - Main content area

**Responsive Hooks (Optional):**
- `useMediaQuery(query)` - Match media queries
- `useBreakpointUp(bp)` - Check if above breakpoint
- `useBreakpointDown(bp)` - Check if below breakpoint

**Note:** Layout is CSS-driven. Hooks are utilities only.

## 🔄 Extracting to NPM

Once you've tested and refined components:

1. Move `src/framework/` to `packages/react-ui/src/framework/`
2. Move `src/ui/` to `packages/react-ui/src/ui/`
3. Move `src/tokens/` to `packages/react-ui/src/tokens/`
4. Build and publish npm package
5. Import back: `import { AppShell } from '@your-org/react-ui'`

## 🐛 Troubleshooting

### Dev server won't start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading

Check that CSS imports are in correct order in `main.tsx`:

```typescript
import './tokens/tokens.css';  // 1. Core tokens first
import './tokens/themes.css';  // 2. Theme colors
import './styles/globals.css'; // 3. Global styles last
```

### Responsive layout not working

Check browser width - breakpoint is at 768px:
- Mobile: < 768px
- Desktop: ≥ 768px

## 📄 License

ISC

## 🤝 Contributing

This is a seed project - fork and customize for your needs!

