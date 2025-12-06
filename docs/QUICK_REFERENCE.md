# Design System Quick Reference

## Component Checklist

Before considering a component "done":

- [ ] Uses design tokens (no hardcoded values)
- [ ] Forward refs implemented
- [ ] PropTypes or TypeScript types defined
- [ ] className prop supported
- [ ] All HTML attributes forwarded
- [ ] Accessible (ARIA, keyboard nav, focus states)
- [ ] Storybook stories for all variants
- [ ] Responsive behavior tested
- [ ] Works in isolation
- [ ] CSS Modules used (no global styles)
- [ ] Documentation in README

---

## Token Usage Pattern

```css
/* ✅ ALWAYS use tokens */
.component {
  font-family: var(--token-light-typography-font-family-body);
  font-size: var(--token-light-typography-font-size-small);
  padding: var(--token-light-spacing-sm) var(--token-light-spacing-md);
  border-radius: var(--token-light-border-radius-button);
  background-color: var(--color-light-accent-primary);
  color: var(--color-light-text-primary);
  box-shadow: var(--token-light-shadow-button);
}

/* ❌ NEVER hardcode */
.component {
  font-family: Arial;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #eb0a1e;
}
```

---

## Component Template

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ComponentName.module.css';

const ComponentName = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}, ref) => {
  const classes = [
    styles.component,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';

ComponentName.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ComponentName;
```

---

## Story Template

```jsx
import ComponentName from './ComponentName';

export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};

export const Default = {
  args: {
    children: 'Default Component',
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
  },
};
```

---

## NPM Package Checklist

- [ ] package.json configured (main, module, types, exports)
- [ ] .npmignore configured
- [ ] Build outputs to dist/
- [ ] ESM and CJS formats
- [ ] TypeScript definitions generated
- [ ] CSS files properly exported
- [ ] README.md with usage examples
- [ ] LICENSE file
- [ ] Peer dependencies declared
- [ ] No runtime dependencies (except React)
- [ ] Version follows semver
- [ ] Tested in multiple environments

---

## Common Patterns

### Forward Refs
```jsx
const Component = React.forwardRef((props, ref) => {
  return <div ref={ref} {...props} />;
});
```

### Class Name Merging
```jsx
const classes = [
  styles.base,
  styles[variant],
  className
].filter(Boolean).join(' ');
```

### Design Token Reference
```css
/* Colors */
var(--color-light-accent-primary)
var(--color-light-text-primary)
var(--color-light-border-primary)

/* Typography */
var(--token-light-typography-font-family-body)
var(--token-light-typography-font-size-small)
var(--token-light-typography-font-weight-medium)

/* Spacing */
var(--token-light-spacing-xs)  /* 4px */
var(--token-light-spacing-sm)  /* 8px */
var(--token-light-spacing-md)  /* 16px */
var(--token-light-spacing-lg)  /* 24px */

/* Border Radius */
var(--token-light-border-radius-button)  /* 6px */
var(--token-light-border-radius-input)   /* 6px */

/* Shadows */
var(--token-light-shadow-button)
var(--token-light-shadow-focus)
```

---

## File Structure Quick Reference

```
design-system/
├── components/
│   └── ComponentName/
│       ├── ComponentName.jsx
│       ├── ComponentName.module.css
│       ├── ComponentName.stories.jsx
│       └── index.js
├── tokens/
│   ├── colors.json           # Global brand colors
│   ├── colors-light.json     # Light theme aliases
│   ├── colors-dark.json      # Dark theme aliases
│   ├── typography.json       # Font tokens
│   ├── spaces.json           # Spacing tokens
│   ├── shadows.json          # Shadow tokens
│   ├── border-radius.json    # Radius tokens
│   ├── theme-light.json      # Light theme tokens
│   └── theme-dark.json        # Dark theme tokens
├── src/
│   └── styles/
│       └── global.css         # Global styles + token imports
├── build/
│   └── css/
│       ├── light.css         # Light theme CSS variables
│       └── dark.css         # Dark theme CSS variables
├── dist/                     # Built package (for npm)
└── .storybook/              # Storybook config
```

---

## Build Commands

```bash
# Build design tokens
npm run build:token

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Build package (for npm)
npm run build
```

---

## Import Patterns

### In Your App
```jsx
// Import components
import { Button, Input, Checkbox } from '@your-org/design-system';

// Import styles
import '@your-org/design-system/styles';
// OR
import '@your-org/design-system/tokens/light';
import '@your-org/design-system/tokens/dark';
```

### In Components
```jsx
// Import CSS Module
import styles from './Component.module.css';

// Use tokens in CSS
.button {
  color: var(--color-light-accent-primary);
}
```

---

## Accessibility Quick Reference

### Required ARIA for Inputs
```jsx
<Input
  id="input-id"
  label="Label"
  error={hasError}
  errorMessage={errorMessage}
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-id' : 'helper-id'}
/>
```

### Required ARIA for Buttons
```jsx
<Button
  aria-label="Action description"  // If no visible text
  aria-pressed={isPressed}          // For toggle buttons
  aria-disabled={disabled}          // For disabled state
>
  Button Text
</Button>
```

### Keyboard Support
- Enter/Space: Activate button
- Tab: Navigate between interactive elements
- Escape: Close modals/dialogs
- Arrow keys: Navigate lists/menus

---

## Token Naming Convention

```
Format: {category}-{theme}-{property}-{variant}

Examples:
- color-light-accent-primary
- token-light-typography-font-size-body
- token-light-spacing-md
- token-light-border-radius-button
- token-light-shadow-focus
```

---

## Versioning Quick Guide

- **PATCH** (1.0.1): Bug fixes, no breaking changes
- **MINOR** (1.1.0): New features, backward compatible
- **MAJOR** (2.0.0): Breaking changes

**Breaking Changes:**
- Removed props
- Changed prop types
- Removed CSS variables
- Changed component structure

---

This quick reference should be your go-to guide when building components and preparing for npm distribution.

