---
name: design-system-migration
description: Migrate React design system from Radix UI to Base UI, then set up Mitosis for multi-framework compilation (React, Angular, Vue). Use when refactoring component libraries, migrating headless UI frameworks, or adding multi-framework support to design systems.
---

# Design System Migration: Radix UI → Base UI → Mitosis

## Overview

This skill orchestrates a two-phase migration:
1. **Phase 1**: Migrate from Radix UI to Base UI (modern React-only)
2. **Phase 2**: Set up Mitosis for multi-framework compilation

## Phase 1: Base UI Migration

### 1.1 Update Dependencies

**Remove Radix packages:**
- `@radix-ui/react-checkbox`
- `@radix-ui/react-dialog`
- `@radix-ui/react-label`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-slot`
- `@radix-ui/react-toast`
- `@radix-ui/react-tooltip`

**Add Base UI:**
- `@base-ui/react@^1.1.0`

### 1.2 Component Migration Patterns

#### Button: Radix Slot → Base UI Render Prop

**Before (Radix):**
```tsx
import * as Slot from '@radix-ui/react-slot';

const Comp = asChild ? Slot.Root : 'button';
<Comp {...props}>{children}</Comp>
```

**After (Base UI):**
```tsx
// Option 1: Keep asChild for backward compatibility
const Comp = asChild ? 'span' : 'button';
<Comp {...props}>{children}</Comp>

// Option 2: Add render prop (new API)
if (render) {
  return render(props);
}
```

#### Checkbox: Nearly Identical Structure

**Before (Radix):**
```tsx
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

<CheckboxPrimitive.Root>
  <CheckboxPrimitive.Indicator />
</CheckboxPrimitive.Root>
```

**After (Base UI):**
```tsx
import { Checkbox } from '@base-ui/react/checkbox';

<Checkbox.Root>
  <Checkbox.Indicator />
</Checkbox.Root>
```

#### Input: Label → Field Component

**Before (Radix):**
```tsx
import * as Label from '@radix-ui/react-label';

<Label.Root htmlFor={id}>{label}</Label.Root>
<input id={id} />
```

**After (Base UI):**
```tsx
import { Field } from '@base-ui/react/field';

<Field.Root>
  <Field.Label>{label}</Field.Label>
  <Field.Control render={<input />} />
</Field.Root>

// Or simpler: just use native <label>
<label htmlFor={id}>{label}</label>
<input id={id} />
```

### 1.3 Migration Checklist

Complete in order:

- [ ] Update `packages/react-ui/package.json` dependencies
- [ ] Run `npm install` in workspace root
- [ ] Migrate Button component
- [ ] Migrate Checkbox component
- [ ] Migrate Input component
- [ ] Update all component stories (if imports changed)
- [ ] Run `npm run storybook` and verify all components
- [ ] Run `npm run build` to verify bundle
- [ ] Test in demo app `apps/react-app-ds`
- [ ] Check TypeScript types compile
- [ ] Run linter: `npm run lint`

### 1.4 Key Considerations

**Backward Compatibility:**
- Keep prop APIs identical for consumers
- Only internal implementations change
- Add deprecation warnings if removing features

**Bundle Size:**
- Base UI single package vs Radix multi-package
- Should reduce total bundle size

**Styling:**
- CSS Modules remain unchanged
- Class names stay the same

## Phase 2: Mitosis Setup

### 2.1 Install Mitosis

```bash
npm install -D @builder.io/mitosis-cli @builder.io/mitosis
```

### 2.2 Create Configuration

**File: `mitosis.config.js` (workspace root)**

```js
export default {
  files: 'packages/mitosis-components/src/**/*.lite.tsx',
  targets: ['react', 'angular', 'vue3', 'svelte', 'solid'],
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
  dest: 'packages',
}
```

### 2.3 Create Mitosis Package Structure

```
packages/mitosis-components/
├── package.json
├── tsconfig.json
├── mitosis.config.js
└── src/
    └── components/
        ├── Button.lite.tsx
        ├── Input.lite.tsx
        └── Checkbox.lite.tsx
```

**Package.json template:**
```json
{
  "name": "@redhorn/mitosis-components",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "mitosis build",
    "watch": "mitosis build --watch"
  }
}
```

### 2.4 Convert Components to Mitosis

**Mitosis Constraints:**
- Static JSX only (no `useEffect`, complex hooks)
- Use `useStore` for local state
- Use `onMount`/`onUpdate` for lifecycle
- Props are immutable
- CSS Modules supported

**Example: Button.lite.tsx**
```tsx
import { useStore } from '@builder.io/mitosis'
import styles from './Button.module.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children?: any
}

export default function Button(props: ButtonProps) {
  const state = useStore({
    variant: props.variant || 'primary',
    size: props.size || 'md',
  })

  return (
    <button
      className={`${styles.button} ${styles[state.variant]} ${styles[state.size]}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
```

### 2.5 Build Pipeline Setup

**Update root `package.json`:**
```json
{
  "scripts": {
    "build:mitosis": "npm run build --workspace=packages/mitosis-components",
    "build:react": "npm run build --workspace=packages/react-ui",
    "build:all": "npm run build:mitosis && npm run build:react"
  }
}
```

### 2.6 Mitosis Checklist

- [ ] Install Mitosis CLI and dependencies
- [ ] Create `mitosis.config.js` at workspace root
- [ ] Create `packages/mitosis-components` structure
- [ ] Add package.json to mitosis-components
- [ ] Convert Button to `.lite.tsx` format
- [ ] Run `npm run build:mitosis` and verify React output
- [ ] Verify generated React components work
- [ ] Test Angular output (if Angular app exists)
- [ ] Create `docs/MITOSIS_GUIDELINES.md`
- [ ] Document component authoring rules

## Best Practices

### Testing Strategy

**After each component migration:**
1. Visual test in Storybook
2. Interaction test (click, hover, focus)
3. Accessibility test (keyboard nav, screen reader)
4. TypeScript compilation
5. Bundle size check

### Rollback Plan

Keep Radix packages as devDependencies until Phase 1 is fully tested:
```json
{
  "devDependencies": {
    "@radix-ui/react-checkbox": "^1.3.3"
  }
}
```

### Documentation

Update these files:
- `packages/react-ui/README.md` - Note Base UI usage
- `CHANGELOG.md` - Document breaking changes (if any)
- Component JSDoc comments - Update examples

## Troubleshooting

**Base UI not working:**
- Check version: `npm list @base-ui/react`
- Verify import paths: `@base-ui/react/checkbox` not `@base-ui/react`

**Mitosis build fails:**
- Ensure static JSX only (no complex hooks)
- Check CSS Module imports are valid
- Verify target config in mitosis.config.js

**TypeScript errors:**
- Base UI v1.1.0+ has full TypeScript support
- May need `@types/react@^18.0.0`

## Success Criteria

**Phase 1 Complete:**
- All components use Base UI
- No Radix imports in src/
- Storybook stories all working
- Demo app working
- Bundle builds successfully
- No visual regressions

**Phase 2 Complete:**
- Mitosis generates React components
- Generated components match hand-written versions
- At least 3 components in Mitosis format
- Build pipeline working
- Documentation complete
