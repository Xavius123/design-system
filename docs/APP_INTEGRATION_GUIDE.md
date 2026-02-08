# App Integration Guide

How to use Redhorn Design System components in your applications.

## Quick Start by Framework

### React Apps

#### 1. Install Packages

```bash
npm install @redhorn/design-tokens @redhorn/react
```

#### 2. Import Tokens (in your main file)

```tsx
// src/main.tsx or src/index.tsx
import '@redhorn/design-tokens/css/light';
import '@redhorn/design-tokens/css/dark';
```

#### 3. Use Components

```tsx
import { Button, Input } from '@redhorn/react';

function LoginForm() {
  return (
    <form>
      <Input 
        label="Email" 
        type="email" 
        required
        placeholder="you@example.com"
      />
      <Input 
        label="Password" 
        type="password" 
        required
      />
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </form>
  );
}
```

### Angular Apps

#### 1. Install Packages

```bash
npm install @redhorn/design-tokens @redhorn/angular
```

#### 2. Import Tokens (in styles.css)

```css
/* src/styles.css */
@import '@redhorn/design-tokens/css/light';
@import '@redhorn/design-tokens/css/dark';
```

#### 3. Import Components

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@redhorn/angular/button';
import { InputComponent } from '@redhorn/angular/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  template: `
    <form>
      <app-input 
        label="Email" 
        type="email" 
        [required]="true"
        placeholder="you@example.com">
      </app-input>
      
      <app-input 
        label="Password" 
        type="password" 
        [required]="true">
      </app-input>
      
      <app-button variant="primary" type="submit">
        Log In
      </app-button>
    </form>
  `
})
export class LoginComponent {}
```

### React Native Apps

#### 1. Install Packages

```bash
npm install @redhorn/design-tokens @redhorn/react-native
```

#### 2. Import Tokens

```tsx
// App.tsx
import { tokens } from '@redhorn/design-tokens/js/light';
```

#### 3. Use Components

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Input } from '@redhorn/react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Input 
        label="Email" 
        placeholder="you@example.com"
        type="email"
      />
      <Input 
        label="Password" 
        type="password"
        required
      />
      <Button variant="primary" onClick={handleLogin}>
        Log In
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

## Available Components

### Current (v1.0.0)

- **Button** - Multi-variant button with sizes
  - Variants: primary, secondary, ghost, outline
  - Sizes: sm, md, lg
  - Props: variant, size, disabled, onClick

- **Input** - Text input with label and error states
  - Types: text, email, password, number, tel, url, search
  - Sizes: sm, md, lg
  - Props: label, type, size, error, errorMessage, helperText, required, fullWidth

### Coming Soon (v1.1.0+)

- Checkbox
- Radio
- Switch
- Badge
- Tag
- Avatar
- Card

## Theming

### Light and Dark Mode

The design system includes both light and dark themes:

**React/Angular:**
```tsx
// Toggle theme by changing data attribute
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

**React Native:**
```tsx
import { useColorScheme } from 'react-native';
import { lightTokens, darkTokens } from '@redhorn/design-tokens/js';

const scheme = useColorScheme();
const tokens = scheme === 'dark' ? darkTokens : lightTokens;
```

## Bundle Size

Expected bundle sizes (minified + gzipped):

- `@redhorn/design-tokens`: ~5 KB
- `@redhorn/react`: ~15-20 KB (with 2 components)
- `@redhorn/angular`: ~15-20 KB (with 2 components)
- `@redhorn/react-native`: ~10-15 KB (with 2 components)

Components are tree-shakeable - you only bundle what you import.

## TypeScript Support

All packages include full TypeScript definitions:

```tsx
import type { ButtonProps } from '@redhorn/react';

const myButton: ButtonProps = {
  variant: 'primary',
  size: 'md',
  onClick: () => console.log('clicked'),
};
```

## Browser/Platform Support

**React (Web):**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Angular (Web):**
- Same as React

**React Native (Mobile):**
- iOS 13+
- Android 6.0+ (API 23+)
- React Native 0.70+

## Troubleshooting

### Components Not Styling Correctly

**Issue:** Components render but have no styles

**Solution:** Make sure you imported the design tokens:
```tsx
import '@redhorn/design-tokens/css/light';
```

### TypeScript Errors

**Issue:** Cannot find module '@redhorn/react'

**Solution:** Check package is installed and types are available:
```bash
npm list @redhorn/react
```

### React Native Components Don't Work

**Issue:** Components crash on mobile

**Solution:** 
1. Check React Native version: `npx react-native --version` (need 0.70+)
2. Ensure you're importing from `@redhorn/react-native`, not `@redhorn/react`
3. Check for platform-specific issues in generated code

## Migration from Existing Components

If you have existing button/input components:

### 1. Install Design System
```bash
npm install @redhorn/react
```

### 2. Replace Gradually

```tsx
// Before
import OldButton from './components/Button';
<OldButton className="primary">Click</OldButton>

// After
import { Button } from '@redhorn/react';
<Button variant="primary">Click</Button>
```

### 3. Keep Both During Transition

```tsx
import { Button as DSButton } from '@redhorn/react';
import OldButton from './components/Button';

// Use DS button for new features
<DSButton variant="primary">New Feature</DSButton>

// Keep old button in existing features
<OldButton>Existing Feature</OldButton>
```

### 4. Remove Old After Verification

Once tested in production, remove old components.

## Getting Help

- **Documentation:** https://design-system.redhorn.com
- **Storybook Preview:** https://main--[project-id].chromatic.com
- **Issues:** https://github.com/redhorn/design-system/issues
- **Slack:** #design-system channel

## Updating Packages

### Check for Updates

```bash
npm outdated @redhorn/react
```

### Update to Latest

```bash
npm install @redhorn/react@latest
```

### Update All Design System Packages

```bash
npm install @redhorn/design-tokens@latest @redhorn/react@latest
```

## Version Compatibility

All framework packages use synchronized versions:

| Version | Changes | Breaking? |
|---------|---------|-----------|
| 1.0.0   | Initial release (Button, Input) | - |
| 1.1.0   | Add Checkbox | No |
| 1.2.0   | Add Badge, Tag | No |
| 2.0.0   | Rename onClick to onPress | Yes |

Always use same version across all packages:
```json
{
  "@redhorn/design-tokens": "1.1.0",
  "@redhorn/react": "1.1.0",
  "@redhorn/angular": "1.1.0"
}
```

## Release Notes

Subscribe to releases: https://github.com/redhorn/design-system/releases

Each release includes:
- New components
- Bug fixes
- Breaking changes (if any)
- Migration guide

## Performance Best Practices

### Tree Shaking

Import only what you need:

```tsx
// ✅ Good - tree-shakeable
import { Button } from '@redhorn/react';

// ❌ Avoid - imports everything
import * as DS from '@redhorn/react';
```

### Code Splitting

Lazy load less-used components:

```tsx
const Button = React.lazy(() => 
  import('@redhorn/react').then(m => ({ default: m.Button }))
);
```

### Bundle Analysis

Check what you're actually bundling:

```bash
# React
npm run analyze

# Check bundle size
npx webpack-bundle-analyzer build/stats.json
```

## Questions?

Contact the design system team:
- Email: design-system@redhorn.com
- Slack: #design-system
- GitHub: @redhorn/design-system-team
