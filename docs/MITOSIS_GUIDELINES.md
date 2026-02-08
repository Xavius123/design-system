# Mitosis Multi-Framework Guidelines

This guide explains how to work with Mitosis components in the Redhorn Design System. Mitosis allows us to write components once and compile them to multiple frameworks (React, Angular, Vue, Svelte, Solid).

## Table of Contents

- [Overview](#overview)
- [Component Structure](#component-structure)
- [Writing Mitosis Components](#writing-mitosis-components)
- [Mitosis Constraints](#mitosis-constraints)
- [CSS Modules](#css-modules)
- [Build Process](#build-process)
- [Adding New Components](#adding-new-components)
- [Testing Generated Components](#testing-generated-components)
- [Troubleshooting](#troubleshooting)

## Overview

**Mitosis Components** are framework-agnostic source components written in `.lite.tsx` files. They use a restricted subset of JSX and compile to native framework code.

**Current Components:**
- Button
- Input

**Location:** `packages/mitosis-components/src/components/`

**Generated Output:**
- `packages/react-ui-generated/` - React components
- `packages/angular-ui/` - Angular components
- `packages/vue-ui/` - Vue components

## Component Structure

Each Mitosis component follows this structure:

```
packages/mitosis-components/src/components/
└── ComponentName/
    ├── ComponentName.lite.tsx    # Mitosis source
    └── ComponentName.module.css  # CSS Modules styles
```

After building with Mitosis, framework-specific components are generated:

```
packages/
├── react-ui-generated/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       └── ComponentName.module.css
├── angular-ui/
│   └── component-name/
│       ├── component-name.component.ts
│       └── component-name.component.css
└── vue-ui/
    └── ComponentName/
        ├── ComponentName.vue
        └── ComponentName.module.css
```

## Writing Mitosis Components

### Basic Component Template

```tsx
import { useStore } from '@builder.io/mitosis'
import styles from './ComponentName.module.css'

export interface ComponentNameProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: (event: any) => void
  children?: any
}

export default function ComponentName(props: ComponentNameProps) {
  const state = useStore({
    // Computed values using getters
    get variantClass() {
      return props.variant || 'primary'
    },
    get classes() {
      return `${styles.component} ${styles[this.variantClass]}`
    }
  })

  return (
    <div 
      className={state.classes}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
```

### Props Interface

Always export a TypeScript interface for props:

```tsx
export interface ComponentProps {
  // Required props (no question mark)
  id: string
  
  // Optional props (with question mark and defaults)
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  
  // Event handlers (use 'any' for event type)
  onClick?: (event: any) => void
  onChange?: (value: string) => void
  
  // Children content
  children?: any
  
  // Additional class names
  className?: string
}
```

### State Management

Use `useStore` for component state and computed values:

```tsx
const state = useStore({
  // Simple values
  count: 0,
  isOpen: false,
  
  // Computed values using getters
  get total() {
    return this.count * 2
  },
  
  // Methods
  increment() {
    state.count++
  }
})
```

## Mitosis Constraints

Mitosis uses a **restricted subset of JSX**. These limitations ensure code can compile to all target frameworks:

### ✅ Allowed

- Basic JSX elements (`<div>`, `<button>`, `<input>`, etc.)
- Props and attributes
- Conditional rendering with ternary operator: `{condition ? <A /> : <B />}`
- Conditional attributes: `className={error ? styles.error : ''}`
- `useStore` for local state
- Event handlers: `onClick`, `onChange`, etc.
- CSS Modules imports
- Simple computations in getters

### ❌ Not Allowed

- React hooks: `useEffect`, `useRef`, `useCallback`, `useMemo`
- Complex lifecycle methods
- Direct DOM manipulation
- `useState` (use `useStore` instead)
- Complex JavaScript logic in JSX
- Spreading objects in JSX: `{...props}` (use explicit props)
- Array methods in JSX (`.map()` is allowed in limited cases)
- Async operations
- Context API

### Working Around Limitations

**Instead of useEffect:**
```tsx
// ❌ Bad - useEffect not supported
useEffect(() => {
  console.log('mounted')
}, [])

// ✅ Good - Use onMount
import { onMount } from '@builder.io/mitosis'

onMount(() => {
  console.log('mounted')
})
```

**Instead of useState:**
```tsx
// ❌ Bad - useState not supported
const [count, setCount] = useState(0)

// ✅ Good - Use useStore
const state = useStore({ count: 0 })
// Update: state.count = 1
```

**Complex Logic:**
```tsx
// ❌ Bad - Complex logic in render
return (
  <div>
    {items.filter(x => x.active).map(x => (
      <Item key={x.id} {...x} />
    ))}
  </div>
)

// ✅ Good - Precompute in getter
const state = useStore({
  get activeItems() {
    return props.items.filter(x => x.active)
  }
})

return (
  <div>
    {state.activeItems.map(x => (
      <Item id={x.id} name={x.name} />
    ))}
  </div>
)
```

## CSS Modules

### Naming Convention

- Use kebab-case for CSS files: `ComponentName.module.css`
- Use camelCase for class names: `.buttonPrimary`, `.inputError`

### Importing Styles

```tsx
import styles from './ComponentName.module.css'

// Apply classes
<div className={styles.wrapper}>
  <button className={`${styles.button} ${styles.primary}`}>
    Click me
  </button>
</div>
```

### Dynamic Classes

```tsx
const state = useStore({
  get buttonClasses() {
    const classes = [
      styles.button,
      styles[props.variant || 'primary'],
      styles[props.size || 'md'],
      props.error ? styles.error : '',
      props.className || ''
    ]
    return classes.filter(Boolean).join(' ')
  }
})

return <button className={state.buttonClasses}>Click</button>
```

### Design Tokens

Use CSS variables for design tokens:

```css
.button {
  background-color: var(--color-light-accent-primary);
  padding: var(--token-light-spacing-md);
  border-radius: var(--token-light-border-radius-button);
  font-size: var(--token-light-typography-font-size-small);
}

[data-theme="dark"] .button {
  background-color: var(--color-dark-accent-primary);
}
```

## Build Process

### Building Mitosis Components

```bash
# Build Mitosis components (generates React, Angular, Vue)
npm run build:mitosis

# Watch mode for development
npm run build:mitosis --watch

# Build everything (tokens + mitosis + react-ui)
npm run build:all
```

### Output Structure

After running `npm run build:mitosis`, Mitosis generates:

```
packages/
├── react-ui-generated/
│   └── Button/
│       ├── Button.tsx              # Generated React component
│       └── Button.module.css       # Copied CSS
├── angular-ui/
│   └── button/
│       ├── button.component.ts     # Generated Angular component
│       ├── button.component.html   # Generated template
│       └── button.component.css    # Converted CSS
└── vue-ui/
    └── Button/
        ├── Button.vue              # Generated Vue SFC
        └── Button.module.css       # Copied CSS
```

### Configuration

Mitosis configuration is in `packages/mitosis-components/mitosis.config.js`:

```js
export default {
  files: 'src/**/*.lite.tsx',
  targets: ['react', 'angular', 'vue3'],
  options: {
    react: {
      stylesType: 'style-tag',
      typescript: true
    },
    angular: {
      standalone: true,
      typescript: true
    },
    vue3: {
      typescript: true,
      api: 'composition'
    }
  },
  dest: '../'
}
```

## Adding New Components

Follow these steps to add a new component:

### 1. Choose a Component

Start with simple components:
- ✅ Good candidates: Badge, Tag, Card, Avatar
- ⚠️  Complex components: Dropdown, Dialog, Tooltip (may need framework-specific versions)

### 2. Copy from Existing React Component

```bash
# Navigate to mitosis-components
cd packages/mitosis-components/src/components

# Create new component directory
mkdir NewComponent
cd NewComponent
```

### 3. Create `.lite.tsx` File

Copy from an existing component like Button or Input:

```tsx
import { useStore } from '@builder.io/mitosis'
import styles from './NewComponent.module.css'

export interface NewComponentProps {
  // Add your props
  variant?: 'default' | 'primary'
  children?: any
}

export default function NewComponent(props: NewComponentProps) {
  const state = useStore({
    get classes() {
      return `${styles.component} ${styles[props.variant || 'default']}`
    }
  })

  return (
    <div className={state.classes}>
      {props.children}
    </div>
  )
}
```

### 4. Copy CSS Module

Copy the CSS from your existing React component:

```bash
# From project root
cp packages/react-ui/src/components/NewComponent/NewComponent.module.css \
   packages/mitosis-components/src/components/NewComponent/
```

### 5. Simplify Component Logic

Remove complex React-specific patterns:
- Remove `useEffect`, `useRef`, `useCallback`
- Replace `useState` with `useStore`
- Remove prop spreading: `{...props}`
- Simplify event handlers

### 6. Build and Verify

```bash
# Build Mitosis components
npm run build:mitosis

# Check generated output
ls packages/react-ui-generated/NewComponent/
ls packages/angular-ui/new-component/
ls packages/vue-ui/NewComponent/
```

### 7. Test Generated Components

- **React**: Import from `packages/react-ui-generated`
- **Angular**: Create test Angular app and import component
- **Vue**: Create test Vue app and import component

## Testing Generated Components

### React Components

```tsx
// In your React app
import { Button } from '@redhorn/react-ui-generated'

function App() {
  return (
    <Button variant="primary" onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  )
}
```

### Angular Components

```typescript
// app.component.ts
import { ButtonComponent } from '@redhorn/angular-ui/button'

@Component({
  selector: 'app-root',
  imports: [ButtonComponent],
  template: `
    <button-component 
      variant="primary" 
      (click)="handleClick()">
      Click me
    </button-component>
  `
})
export class AppComponent {
  handleClick() {
    alert('Clicked!')
  }
}
```

### Vue Components

```vue
<script setup>
import { Button } from '@redhorn/vue-ui'

const handleClick = () => {
  alert('Clicked!')
}
</script>

<template>
  <Button variant="primary" @click="handleClick">
    Click me
  </Button>
</template>
```

## Troubleshooting

### Build Errors

**Error: "Cannot use useEffect in Mitosis"**
- Solution: Remove `useEffect` and use `onMount` or restructure logic

**Error: "Spread operator not supported"**
- Solution: Explicitly pass each prop: `<Component prop1={value1} prop2={value2} />`

**Error: "Complex expression in JSX"**
- Solution: Move logic to computed getter in `useStore`

### CSS Not Applied

- Check CSS Module import path
- Verify class names match between JSX and CSS
- Ensure CSS file is copied to generated output

### Generated Code Doesn't Match Expected

- Simplify Mitosis component (remove complex patterns)
- Check Mitosis documentation for supported patterns
- Consider creating framework-specific version for complex components

### TypeScript Errors in Generated Code

- Ensure prop types are simple (string, number, boolean)
- Avoid complex union types
- Use `any` for event handler types

## Migration Priority

**Simple Components (Migrate First):**
- ✅ Button
- ✅ Input
- Badge
- Tag
- Avatar
- Card

**Medium Complexity (Migrate Later):**
- Checkbox
- Radio
- Switch
- Progress Bar
- Alert

**Complex Components (Consider Framework-Specific):**
- Dropdown/Select
- Dialog/Modal
- Tooltip
- Drawer
- Date Picker

## Resources

- [Mitosis Documentation](https://mitosis.builder.io/)
- [Mitosis GitHub](https://github.com/BuilderIO/mitosis)
- [Component Examples](../packages/mitosis-components/src/components/)
- [Agent Skill](../agent/design-system-migration/SKILL.md)

## Questions?

For questions or issues with Mitosis components:
1. Check this guide first
2. Review existing components (Button, Input) as examples
3. Consult Mitosis documentation
4. Create an issue in the design system repository
