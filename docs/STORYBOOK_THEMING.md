# Storybook Theming Guide

Complete guide to theme management in Storybook for the Toyota Design System.

## Overview

Our Storybook setup supports both light and dark themes using CSS variables and a custom theme switcher integrated with the design system's theme utilities.

## Theme Architecture

### CSS Variables

All theme values are defined as CSS variables:

```css
/* Light Theme */
:root[data-theme="light"] {
  --color-light-accent-primary: #EB0A1E;
  --color-light-text-primary: #000000;
  /* ... */
}

/* Dark Theme */
:root[data-theme="dark"] {
  --color-dark-accent-primary: #EB0A1E;
  --color-dark-text-primary: #ffffff;
  /* ... */
}
```

### Theme Switching

Themes are switched by setting the `data-theme` attribute on the document:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

## Storybook Configuration

### Global Theme Type

```javascript
// .storybook/preview.js
globalTypes: {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'circlehollow' },
        { value: 'dark', title: 'Dark', icon: 'circle' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
}
```

### Theme Decorator

```javascript
decorators: [
  (Story, context) => {
    const theme = context.globals.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    initTheme();
    return React.createElement(Story);
  },
],
```

## Using Themes in Stories

### Automatic Theme Switching

All components automatically adapt to the selected theme via CSS variables. No additional code needed in stories.

### Testing Both Themes

1. Use the theme selector in the Storybook toolbar
2. Components automatically update
3. Test all variants in both themes

### Story-Specific Theme

```jsx
export const DarkTheme = {
  parameters: {
    theme: 'dark',
  },
  decorators: [
    (Story) => {
      document.documentElement.setAttribute('data-theme', 'dark');
      return <Story />;
    },
  ],
};
```

## Component Theme Support

### CSS Module Pattern

All components support themes using CSS variable fallbacks:

```css
.button {
  background-color: var(--color-light-accent-primary, #EB0A1E);
  color: var(--color-light-text-inverse, #ffffff);
}

[data-theme="dark"] .button {
  background-color: var(--color-dark-accent-primary, #EB0A1E);
  color: var(--color-dark-text-inverse, #ffffff);
}
```

### Design Token Usage

Always use design tokens, never hardcoded values:

```css
/* ✅ GOOD */
.button {
  color: var(--color-light-text-primary);
  padding: var(--token-light-spacing-md);
}

/* ❌ BAD */
.button {
  color: #000000;
  padding: 16px;
}
```

## Theme Utilities

### useTheme Hook

```jsx
import { useTheme } from '@toyota/react-ui';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Theme Functions

```jsx
import { getTheme, setTheme, initTheme, toggleTheme } from '@toyota/react-ui';

// Get current theme
const currentTheme = getTheme(); // 'light' or 'dark'

// Set theme
setTheme('dark');

// Initialize theme (reads from localStorage or system preference)
initTheme();

// Toggle between themes
toggleTheme();
```

## Custom Storybook Branding

### Manager Configuration

Create `.storybook/manager.js` to customize Storybook UI:

```javascript
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Toyota Design System',
    brandUrl: 'https://toyota.com',
    brandImage: '/logo.svg',
    colorPrimary: '#EB0A1E',
    colorSecondary: '#C00818',
  },
});
```

## Testing Themes

### Checklist

- [ ] All components render correctly in light theme
- [ ] All components render correctly in dark theme
- [ ] Theme switcher works from toolbar
- [ ] Theme preference persists (if using localStorage)
- [ ] No hardcoded colors (all use CSS variables)
- [ ] Proper contrast ratios in both themes
- [ ] Focus indicators visible in both themes

### Common Issues

**Theme Not Applying:**
- Check `data-theme` attribute is set
- Verify CSS variables are loaded
- Ensure component CSS includes dark mode selectors

**Colors Not Updating:**
- Verify CSS variables are defined in token files
- Check component CSS uses variables, not hardcoded values
- Ensure dark mode selectors are correct

**Theme Switcher Not Working:**
- Check globalTypes configuration
- Verify decorator is setting data-theme
- Restart Storybook server

## Best Practices

1. **Always Test Both Themes**
   - Every component should work in light and dark
   - Test all variants in both themes
   - Verify contrast and visibility

2. **Use Design Tokens**
   - Never hardcode colors
   - Always use CSS variables
   - Reference design tokens in documentation

3. **Document Theme Behavior**
   - Note any theme-specific behavior
   - Document theme requirements
   - Show examples in both themes

4. **Maintain Consistency**
   - Use consistent token naming
   - Follow theme structure patterns
   - Keep theme values in sync

## Resources

- [Design Tokens Documentation](../tokens/README.md)
- [Theme Utilities Source](../../react-ui/src/utils/theme.js)
- [Storybook Theming Docs](https://storybook.js.org/docs/react/configure/theming)

