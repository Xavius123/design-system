# Component Architecture Guide

## Principles for Environment-Agnostic Components

### 1. Zero Styling Assumptions

**✅ DO:**
- Use CSS Modules for scoped styles
- Export CSS variables for theming
- Allow className override
- Support style prop for edge cases

**❌ DON'T:**
- Assume Tailwind is available
- Use styled-components (adds runtime dependency)
- Hardcode colors, spacing, fonts
- Require specific CSS framework

### 2. Headless Component Pattern (Radix UI Style)

```jsx
// Base primitive (logic only)
const CheckboxPrimitive = ({ checked, onCheckedChange, ...props }) => {
  // All the logic, no styling
};

// Styled wrapper (your design system)
const Checkbox = ({ className, ...props }) => {
  return (
    <CheckboxPrimitive
      {...props}
      className={cn(styles.checkbox, className)}
    />
  );
};
```

### 3. Forward Refs Pattern

**Essential for flexibility:**

```jsx
const Button = React.forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});

// Allows parent components to access DOM node
const Parent = () => {
  const buttonRef = useRef();
  return <Button ref={buttonRef}>Click</Button>;
};
```

### 4. Compound Components Pattern

**For complex components (from Radix UI):**

```jsx
// Usage
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Implementation
const Card = ({ children, ...props }) => {
  return <div className={styles.card} {...props}>{children}</div>;
};

Card.Header = ({ children }) => (
  <div className={styles.header}>{children}</div>
);

Card.Title = ({ children }) => (
  <h3 className={styles.title}>{children}</h3>
);
```

---

## File Organization Patterns

### Recommended Structure

```
components/
├── Button/
│   ├── Button.jsx              # Component logic
│   ├── Button.module.css       # Scoped styles
│   ├── Button.stories.jsx      # Storybook stories
│   ├── Button.test.jsx         # Unit tests
│   ├── index.js                # Public API
│   └── README.md               # Component docs
├── Input/
│   └── [same structure]
└── index.js                     # Barrel export
```

### Barrel Export Pattern

```js
// components/index.js
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Checkbox } from './Checkbox';

// Usage
import { Button, Input, Checkbox } from '@your-org/design-system';
```

---

## CSS Architecture

### CSS Modules + CSS Variables

```css
/* Button.module.css */
.button {
  /* Use design tokens */
  font-family: var(--token-light-typography-font-family-body);
  font-size: var(--token-light-typography-font-size-small);
  padding: var(--token-light-spacing-sm) var(--token-light-spacing-md);
  border-radius: var(--token-light-border-radius-button);
  background-color: var(--color-light-accent-primary);
  color: var(--color-light-text-inverse);
  
  /* Transitions */
  transition: all 0.2s ease;
}

/* Variants */
.primary {
  background-color: var(--color-light-accent-primary);
}

.secondary {
  background-color: var(--color-light-surface-secondary);
}
```

### Global Styles Distribution

```css
/* dist/index.css - Imported by consumers */
@import './tokens/light.css';
@import './tokens/dark.css';

/* Base styles */
* {
  box-sizing: border-box;
}
```

---

## Component API Design

### Props Interface Pattern

```jsx
// ✅ GOOD: Clear, typed interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

// ❌ BAD: Vague, untyped
interface ButtonProps {
  [key: string]: any;
}
```

### Default Props Pattern

```jsx
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  // Implementation
};
```

### Spread Props Pattern

```jsx
// ✅ GOOD: Forward standard HTML attributes
<button
  className={classes}
  disabled={disabled}
  {...props}  // Allows onClick, aria-*, data-*, etc.
>
  {children}
</button>
```

---

## Responsive Component Patterns

### 1. Container-Based Sizing

```jsx
// Component adapts to container
<div style={{ width: '100%', maxWidth: '400px' }}>
  <Button fullWidth>Responsive Button</Button>
</div>
```

### 2. Token-Based Responsive

```css
/* Use spacing tokens that scale */
.button {
  padding: var(--token-spacing-sm) var(--token-spacing-md);
}

@media (min-width: 768px) {
  .button {
    padding: var(--token-spacing-md) var(--token-spacing-lg);
  }
}
```

### 3. Responsive Props

```jsx
// Component accepts responsive values
<Button 
  size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}
>
  Responsive
</Button>
```

---

## Testing Patterns

### Storybook as Test Environment

```jsx
// Visual regression testing
export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="outline">Outline</Button>
  </div>
);
```

### Interaction Testing

```jsx
import { userEvent, within } from '@storybook/testing-library';

export const Clicked = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
```

---

## Accessibility Patterns

### ARIA Attributes

```jsx
// Input with proper ARIA
<Input
  id="email"
  label="Email"
  error={hasError}
  errorMessage={errorMessage}
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : 'email-helper'}
/>

{hasError && (
  <p id="email-error" role="alert" aria-live="polite">
    {errorMessage}
  </p>
)}
```

### Keyboard Navigation

```jsx
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick?.();
  }
  if (e.key === 'Escape') {
    onClose?.();
  }
};
```

### Focus Management

```css
/* Visible focus indicators */
.component:focus-visible {
  outline: none;
  box-shadow: var(--token-shadow-focus);
}
```

---

## Performance Patterns

### 1. Code Splitting

```js
// Lazy load heavy components
const Modal = React.lazy(() => import('./Modal'));

// Usage
<Suspense fallback={<Spinner />}>
  <Modal />
</Suspense>
```

### 2. Memoization

```jsx
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering
});
```

### 3. CSS Optimization

```css
/* Use CSS variables (no runtime cost) */
.button {
  color: var(--color-accent-primary);
}

/* Avoid complex calculations in CSS */
.button {
  /* ❌ BAD */
  width: calc(100% - 32px - 16px);
  
  /* ✅ GOOD */
  width: calc(100% - var(--token-spacing-xl));
}
```

---

## Versioning Strategy

### Semantic Versioning

- **MAJOR**: Breaking API changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Breaking Changes Checklist

- [ ] Removed props
- [ ] Changed prop types
- [ ] Changed CSS class names
- [ ] Removed CSS variables
- [ ] Changed component structure

---

## Documentation Requirements

### Component README Template

```markdown
# ComponentName

Brief description of component purpose.

## Installation

\`\`\`bash
npm install @your-org/design-system
\`\`\`

## Usage

\`\`\`jsx
import { ComponentName } from '@your-org/design-system';
import '@your-org/design-system/dist/index.css';

<ComponentName prop="value">
  Content
</ComponentName>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop | type | default | description |

## Examples

### Basic Usage
[Example code]

### Advanced Usage
[Example code]

## Accessibility

- Keyboard navigation supported
- ARIA attributes included
- Screen reader friendly

## Related Components

- [RelatedComponent1](./RelatedComponent1)
- [RelatedComponent2](./RelatedComponent2)
```

---

This architecture ensures your components work seamlessly across any React environment while maintaining consistency and accessibility.

