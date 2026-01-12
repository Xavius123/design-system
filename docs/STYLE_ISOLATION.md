# Style Isolation Best Practices

## Overview

This document explains how component libraries avoid breaking internal styles of applications when imported. Following these practices ensures your design system components work reliably across different applications without causing style conflicts.

## The Problem

When a component library is imported into an application, style conflicts can occur:
- Global styles from the library override app styles
- Class name collisions (`.button`, `.container`, etc.)
- CSS specificity wars
- Unintended cascade effects
- Box model inconsistencies

## Solutions Implemented in This Design System

### 1. ✅ CSS Modules (Primary Strategy)

**What:** All component styles use CSS Modules (`.module.css` files)

**How it works:**
- Class names are automatically scoped during build
- `.button` becomes `.Button_button__a1b2c3` 
- Eliminates class name collisions

**Example:**
```css
/* Button.module.css */
.button {
  display: inline-flex;
  /* ... */
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';

<button className={styles.button}>Click me</button>
// Renders as: <button class="Button_button__a1b2c3">
```

### 2. ✅ No Global Styles

**What:** The library does NOT apply styles to global elements

**Avoided patterns:**
```css
/* ❌ BAD - These would break consumer apps */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
}

html {
  font-size: 16px;
}
```

**Instead:** Apply resets at component scope:
```css
/* ✅ GOOD - Scoped to component */
.button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /* component styles */
}
```

### 3. ✅ CSS Custom Properties (CSS Variables)

**What:** All design tokens use namespaced CSS variables

**Benefits:**
- Consumers can override values
- No style collisions
- Theme switching support

**Example:**
```css
.button {
  /* Namespaced variables with fallbacks */
  border-radius: var(--token-light-border-radius-button, 6px);
  font-size: var(--token-light-typography-font-size-small, 14px);
}
```

**Namespacing pattern:** `--[brand]-[theme]-[category]-[property]`
- `--token-light-typography-font-size-small`
- `--color-dark-accent-primary`

### 4. ✅ Component-Scoped Resets

**What:** Each component includes its own minimal reset

**Pattern:**
```css
.component {
  /* Reset properties that might be affected by consumer styles */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  
  /* Component-specific styles */
  display: flex;
  /* ... */
}
```

**Why:** Ensures consistent rendering without affecting consumer's global styles

### 5. ✅ Avoid High Specificity

**What:** Keep CSS specificity low and predictable

**Avoided patterns:**
```css
/* ❌ BAD - Too specific, hard to override */
.button.primary.large {
  /* ... */
}

div.container > .button {
  /* ... */
}
```

**Preferred patterns:**
```css
/* ✅ GOOD - Single class, easy to override */
.button {
  /* ... */
}

.primary {
  /* ... */
}

.large {
  /* ... */
}
```

**Why:** Consumers can override styles with simple class names

### 6. ✅ Never Use `!important`

**What:** Avoid `!important` in library styles

**Why:**
- Makes consumer overrides nearly impossible
- Creates specificity arms races
- Poor developer experience

**Exception:** Only if absolutely necessary for critical accessibility styles

### 7. ✅ Separate Token Loading

**What:** CSS variables are loaded separately from component styles

**Structure:**
```
@redhorn/react-ui
  ├── index.js          # Component exports
  └── index.css         # Only CSS variables (no component styles)

@redhorn/tokens
  ├── dist/css/light.css  # Light theme variables
  └── dist/css/dark.css   # Dark theme variables
```

**Usage by consumers:**
```tsx
// Import CSS variables once at app root
import '@redhorn/react-ui/dist/index.css';

// Use components anywhere
import { Button } from '@redhorn/react-ui';
```

## How Other Popular Libraries Handle This

### Material-UI (MUI)
- **CSS-in-JS** with scoped styles
- Dynamic class name generation
- Runtime style injection
- CSS variables for theming

### Chakra UI
- **CSS-in-JS** with style props
- Scoped styles via Emotion
- Theme system with CSS variables
- No global styles

### Shadcn/ui
- **CSS Modules** + Tailwind
- Copy-paste pattern (you own the code)
- Scoped class names
- Minimal global impact

### Ant Design
- **CSS Modules** + LESS
- Prefixed class names (`.ant-btn`)
- Custom namespace option
- Separate theme CSS

### Bootstrap
- **Prefixed class names** (`.btn`, `.btn-primary`)
- Global styles (can conflict)
- Optional: Customize via SASS variables
- **Not recommended pattern** for modern component libraries

## Best Practices Checklist

When building components, ensure:

- [ ] Component uses CSS Modules
- [ ] No global element selectors (`html`, `body`, `*`)
- [ ] Component-scoped resets included
- [ ] CSS variables are namespaced
- [ ] No `!important` used
- [ ] Specificity kept low (single classes preferred)
- [ ] Class names are semantic and scoped
- [ ] Consumers can override styles easily
- [ ] Theme switching supported via CSS variables
- [ ] Documentation shows how to customize

## Testing Style Isolation

### Manual Testing

1. **Create a test app with conflicting styles:**
```css
/* test-app/src/App.css */
* {
  box-sizing: content-box; /* Opposite of library */
}

button {
  font-family: Comic Sans MS; /* Bad global style */
  padding: 50px; /* Excessive padding */
}
```

2. **Import your library components**
3. **Verify components render correctly despite conflicts**

### Automated Testing

```typescript
// Component.test.tsx
describe('Button style isolation', () => {
  it('should not be affected by global button styles', () => {
    // Add global style
    const style = document.createElement('style');
    style.innerHTML = 'button { padding: 100px; }';
    document.head.appendChild(style);
    
    // Render component
    const { container } = render(<Button>Test</Button>);
    const button = container.querySelector('button');
    
    // Verify component style wins
    expect(button).not.toHaveStyle({ padding: '100px' });
  });
});
```

## Migration Guide

### If Your Components Currently Use Global Styles

1. **Identify global styles:**
```bash
# Search for global selectors
grep -r "^body\|^html\|^\*" packages/react-ui/src --include="*.css"
```

2. **Move to component scope:**
```css
/* Before: global.css */
* {
  box-sizing: border-box;
}

/* After: Button.module.css */
.button {
  box-sizing: border-box;
  /* ... */
}
```

3. **Test each component in isolation**

4. **Update documentation**

## References

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Specificity Calculator](https://specificity.keegan.st/)
- [Component Library Best Practices](https://www.smashingmagazine.com/2021/05/complete-guide-css-modules/)

## Common Questions

### Q: Can consumers still customize components?

**A:** Yes! Multiple ways:

1. **CSS Variables (recommended):**
```css
/* app.css */
:root {
  --token-light-border-radius-button: 12px; /* Override */
}
```

2. **ClassName prop:**
```tsx
<Button className="my-custom-button">Click me</Button>
```

3. **Style prop:**
```tsx
<Button style={{ borderRadius: '12px' }}>Click me</Button>
```

### Q: What about CSS resets like Normalize.css?

**A:** The consumer app should apply CSS resets, not the component library. If needed, document recommended resets in your usage guide.

### Q: Should we provide a global CSS file?

**A:** Only for CSS variables (design tokens), never for component styles.

```
✅ GOOD: global-tokens.css (only CSS variables)
❌ BAD: global-styles.css (component styles, resets)
```

### Q: How do we handle third-party component libraries?

**A:** Ensure third-party components (like Radix UI) also use scoped styles:
- Radix UI uses data attributes, not class names
- No global style pollution
- Safe to use in libraries

## Summary

**Golden Rules:**
1. ✅ **Use CSS Modules** for all component styles
2. ✅ **No global styles** (`*`, `body`, `html`)
3. ✅ **Namespace CSS variables** 
4. ✅ **Component-scoped resets** only
5. ✅ **Low specificity** - single classes
6. ✅ **No `!important`**
7. ✅ **Test in isolation** with conflicting styles

Following these practices ensures your component library is a good citizen in any application, avoiding the frustrating "why did importing this library break my app's styles?" problem.

