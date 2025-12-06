# Design System Best Practices & Architecture Guide

## Table of Contents
1. [Component Architecture Patterns](#component-architecture-patterns)
2. [Storybook Best Practices](#storybook-best-practices)
3. [Environment-Agnostic Design](#environment-agnostic-design)
4. [NPM Package Preparation](#npm-package-preparation)
5. [Responsive Component Patterns](#responsive-component-patterns)
6. [Token System Architecture](#token-system-architecture)
7. [Accessibility Standards](#accessibility-standards)

---

## Component Architecture Patterns

### 1. Component Structure (Inspired by Storybook Design System)

```
components/
├── ComponentName/
│   ├── ComponentName.jsx          # Main component
│   ├── ComponentName.module.css   # Scoped styles
│   ├── ComponentName.stories.jsx  # Storybook stories
│   ├── ComponentName.test.jsx     # Unit tests
│   ├── index.js                   # Public API export
│   └── README.md                  # Component documentation
```

**Key Principles:**
- One component per folder
- Co-locate related files
- Clear public API via index.js
- Self-contained styles (CSS Modules)
- Comprehensive stories for all variants

### 2. Component API Design

**Best Practices from Radix UI & Material UI:**

```jsx
// ✅ GOOD: Flexible, composable API
<Button variant="primary" size="md" disabled={false}>
  Click me
</Button>

// ✅ GOOD: Forward refs for flexibility
const Button = React.forwardRef((props, ref) => {
  // Component implementation
});

// ✅ GOOD: Support asChild pattern (Radix pattern)
<Button asChild>
  <Link to="/page">Navigate</Link>
</Button>

// ❌ BAD: Hardcoded values
<Button style={{ color: 'red', fontSize: '14px' }}>
  Click me
</Button>
```

**Component Props Pattern:**
- Use PropTypes or TypeScript for type safety
- Provide sensible defaults
- Support className for custom styling
- Forward all standard HTML attributes
- Use compound components for complex UIs

### 3. Styling Architecture

**CSS Modules + Design Tokens Pattern:**

```css
/* ✅ GOOD: Use design tokens */
.button {
  font-family: var(--token-light-typography-font-family-body);
  font-size: var(--token-light-typography-font-size-small);
  padding: var(--token-light-spacing-sm) var(--token-light-spacing-md);
  border-radius: var(--token-light-border-radius-button);
  background-color: var(--color-light-accent-primary);
}

/* ❌ BAD: Hardcoded values */
.button {
  font-family: Arial;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #eb0a1e;
}
```

**Benefits:**
- Theme switching via CSS variables
- Consistent spacing/typography
- Easy to maintain and update
- Works across all environments

---

## Storybook Best Practices

### 1. Story Organization

**Recommended Structure (from Shopify Polaris & Adobe Spectrum):**

```jsx
export default {
  title: 'Components/Button',  // Clear hierarchy
  component: Button,
  parameters: {
    layout: 'centered',        // Responsive preview
    docs: {
      description: {
        component: 'Button component description',
      },
    },
  },
  tags: ['autodocs'],         // Auto-generate docs
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant',
    },
  },
};
```

### 2. Story Variants Pattern

**From Storybook Design System:**

```jsx
// ✅ GOOD: Comprehensive variant coverage
export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const Disabled = { args: { disabled: true } };
export const Small = { args: { size: 'sm' } };
export const Medium = { args: { size: 'md' } };
export const Large = { args: { size: 'lg' } };

// ✅ GOOD: Interactive examples
export const Controlled = () => {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
};

// ✅ GOOD: Responsive examples
export const Responsive = () => (
  <div style={{ width: '100%', maxWidth: '400px' }}>
    <Button fullWidth>Full Width Button</Button>
  </div>
);
```

### 3. MDX Documentation Pattern

**From Atlassian Atlaskit:**

```mdx
import { Meta, Story, Canvas, Controls } from '@storybook/blocks';
import Button from './Button';

<Meta title="Components/Button" component={Button} />

# Button

The Button component is used to trigger actions.

## Usage

<Canvas>
  <Story name="Default">
    <Button>Click me</Button>
  </Story>
</Canvas>

## Props

<Controls />
```

### 4. Accessibility Documentation

**From VMware Clarity & USWDS:**

```jsx
export default {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

// Include accessibility notes in stories
export const Accessible = {
  args: {
    'aria-label': 'Submit form',
    'aria-describedby': 'button-help',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with proper ARIA labels for screen readers.',
      },
    },
  },
};
```

---

## Environment-Agnostic Design

### 1. Zero Runtime Dependencies (Except React)

**Pattern from Radix UI:**

```jsx
// ✅ GOOD: Only React as peer dependency
// package.json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.0"  // Headless primitives
  }
}

// ❌ BAD: Heavy dependencies
{
  "dependencies": {
    "styled-components": "^6.0.0",
    "emotion": "^11.0.0",
    "lodash": "^4.0.0"
  }
}
```

### 2. CSS Distribution Strategy

**From Material UI & Primer:**

```
dist/
├── index.js                    # Main entry point
├── index.css                   # All CSS variables (tokens)
├── components/
│   ├── Button/
│   │   ├── Button.js
│   │   └── Button.module.css   # Component styles
│   └── Input/
│       ├── Input.js
│       └── Input.module.css
└── tokens/
    ├── light.css               # Light theme tokens
    └── dark.css                # Dark theme tokens
```

**Usage in any environment:**

```jsx
// Next.js
import { Button } from '@your-org/design-system';
import '@your-org/design-system/dist/index.css';

// Vite
import { Button } from '@your-org/design-system';
import '@your-org/design-system/dist/tokens/light.css';

// CRA
import { Button } from '@your-org/design-system';
import '@your-org/design-system/dist/index.css';
```

### 3. Build Configuration

**Multi-format output (ESM + CJS):**

```json
// package.json
{
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css",
    "./tokens/light": "./dist/tokens/light.css",
    "./tokens/dark": "./dist/tokens/dark.css"
  }
}
```

---

## NPM Package Preparation

### 1. Package Structure

**From Storybook Design System:**

```
design-system/
├── package.json
├── README.md
├── LICENSE
├── .npmignore
├── src/
│   ├── index.js              # Main export
│   ├── components/
│   └── styles/
├── dist/                     # Built files
│   ├── index.esm.js
│   ├── index.cjs.js
│   ├── index.d.ts
│   └── tokens/
└── .storybook/              # Storybook (dev only)
```

### 2. Package.json Best Practices

```json
{
  "name": "@your-org/design-system",
  "version": "1.0.0",
  "description": "Toyota-branded design system components",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": [
    "**/*.css"
  ],
  "keywords": [
    "design-system",
    "react",
    "components",
    "ui",
    "toyota"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/design-system"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "scripts": {
    "build": "vite build",
    "build:storybook": "storybook build",
    "prepublishOnly": "npm run build"
  }
}
```

### 3. .npmignore Pattern

```
# Development files
.storybook/
src/
node_modules/
*.stories.jsx
*.test.jsx
*.spec.jsx

# Config files
vite.config.js
.storybook/
.eslintrc*
.prettierrc*

# Source files (only ship dist/)
src/
components/
tokens/
scripts/
```

### 4. TypeScript Definitions

**Generate .d.ts files for TypeScript users:**

```typescript
// dist/index.d.ts
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  asChild?: boolean;
}

export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
```

---

## Responsive Component Patterns

### 1. Token-Based Responsive Design

**From IBM Carbon & Salesforce Lightning:**

```json
// tokens/typography.json
{
  "Typography": {
    "FontSize": {
      "Body": {
        "$type": "dimension",
        "$value": "16px",
        "mobile": "14px",
        "tablet": "16px",
        "desktop": "18px"
      }
    }
  }
}
```

**CSS Implementation:**

```css
.button {
  font-size: var(--token-typography-font-size-body);
}

@media (min-width: 768px) {
  .button {
    font-size: var(--token-typography-font-size-body-tablet);
  }
}
```

### 2. Responsive Props Pattern

**From Material UI:**

```jsx
// Component supports responsive values
<Button 
  size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}
  padding={{ mobile: '8px', desktop: '16px' }}
>
  Responsive Button
</Button>
```

### 3. Container Queries (Modern Approach)

**From Primer & Tailwind:**

```css
.button-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .button {
    padding: var(--token-spacing-md);
  }
}
```

---

## Token System Architecture

### 1. Three-Layer Token System

**From Salesforce Lightning & IBM Carbon:**

```
Layer 1: Global Tokens (Base Values)
├── colors.json (Toyota Red, White, Black, Grays)
├── typography.json (Font families, sizes, weights)
├── spacing.json (4px, 8px, 16px scale)
└── shadows.json (Base shadow definitions)

Layer 2: Alias Tokens (Semantic Names)
├── colors-light.json (References global colors)
├── colors-dark.json (References global colors)
├── theme-light.json (References global + color aliases)
└── theme-dark.json (References global + color aliases)

Layer 3: Component Tokens (Component-Specific)
└── (Defined in component CSS modules)
```

### 2. Token Naming Convention

**From Atlassian & Adobe:**

```
Format: {category}-{theme}-{property}-{variant}

Examples:
- color-light-accent-primary
- token-light-typography-font-size-body
- token-light-spacing-md
- token-light-border-radius-button
```

### 3. Token Organization

```json
// ✅ GOOD: Hierarchical, semantic
{
  "Color": {
    "Light": {
      "Accent": {
        "Primary": { "$value": "{Color.Brand.Toyota.Red}" }
      }
    }
  }
}

// ❌ BAD: Flat, non-semantic
{
  "red": "#eb0a1e",
  "buttonColor": "#eb0a1e"
}
```

---

## Accessibility Standards

### 1. ARIA Patterns (From WAI-ARIA Authoring Practices)

**Input Components:**

```jsx
// ✅ GOOD: Proper ARIA attributes
<Input
  id="email-input"
  label="Email Address"
  required
  error={hasError}
  errorMessage="Please enter a valid email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : "email-helper"}
/>

<p id="email-error" role="alert" aria-live="polite">
  {errorMessage}
</p>
```

**Button Components:**

```jsx
// ✅ GOOD: Accessible button
<Button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-disabled={disabled}
>
  Close
</Button>
```

### 2. Keyboard Navigation

**From Radix UI patterns:**

```jsx
// Support keyboard interactions
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick?.();
  }
};
```

### 3. Focus Management

```css
/* ✅ GOOD: Visible focus indicators */
.button:focus-visible {
  outline: none;
  box-shadow: var(--token-light-shadow-focus);
  border-color: var(--color-light-border-focus);
}

/* ❌ BAD: Remove focus outline */
.button:focus {
  outline: none;
}
```

---

## Component Documentation Standards

### 1. README Template (Per Component)

```markdown
# Button

Primary action component for triggering user actions.

## Usage

\`\`\`jsx
import { Button } from '@your-org/design-system';

<Button variant="primary" size="md">
  Click me
</Button>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'outline' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| disabled | boolean | false | Disabled state |

## Accessibility

- Supports keyboard navigation (Enter, Space)
- Proper ARIA attributes
- Focus indicators visible
```

### 2. Storybook Documentation

**Include in every story:**

- Description of component purpose
- Usage examples
- Props table (auto-generated)
- Accessibility notes
- Responsive behavior
- Common patterns

---

## Build & Distribution Checklist

### Pre-NPM Release

- [ ] All components use design tokens (no hardcoded values)
- [ ] TypeScript definitions generated
- [ ] CSS variables properly exported
- [ ] Storybook builds successfully
- [ ] Components work in isolation
- [ ] No runtime dependencies (except React)
- [ ] Proper peer dependencies declared
- [ ] README with usage examples
- [ ] LICENSE file included
- [ ] Version number follows semver
- [ ] .npmignore configured correctly
- [ ] Build outputs to dist/ directory
- [ ] ESM and CJS formats available

### Testing Checklist

- [ ] Components render in Storybook
- [ ] All variants documented
- [ ] Responsive behavior tested
- [ ] Accessibility validated (a11y addon)
- [ ] Works in Next.js
- [ ] Works in Vite
- [ ] Works in CRA
- [ ] CSS imports correctly
- [ ] Theme switching works

---

## Key Takeaways from Reference Repos

### From Storybook Design System:
- Co-locate stories with components
- Use autodocs for automatic documentation
- Comprehensive variant coverage

### From Adobe Spectrum:
- Enterprise-grade component patterns
- Strong accessibility focus
- Polished documentation

### From Shopify Polaris:
- MDX documentation patterns
- Clear component hierarchy
- Usage examples in context

### From Radix UI:
- Headless component primitives
- Composable APIs
- Zero styling assumptions

### From Material UI:
- Responsive prop patterns
- Theme system architecture
- Comprehensive component library

---

## Next Steps for Your Design System

1. **Implement these patterns** in existing components
2. **Add TypeScript definitions** for better DX
3. **Create comprehensive Storybook docs** using MDX
4. **Set up build pipeline** for npm distribution
5. **Test in multiple environments** (Next.js, Vite, CRA)
6. **Add accessibility testing** to Storybook
7. **Create component README templates**
8. **Document token system** usage

This foundation will make your design system production-ready and easily consumable across any React environment.

