# Redhorn Components

> The source of truth for all framework components

## Overview

This is the **single source** that generates components for:
- React
- Angular
- Vue 3
- React Native

**Note:** The underscore prefix (`_redhorn-components`) ensures this folder appears at the top of the packages list, making it easy to find the source components.

## Package Info

- **Name**: `@redhorn/redhorn-components`
- **Private**: Yes (not published to npm)
- **Purpose**: Source components written in Mitosis

## Structure

```
_redhorn-components/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.lite.tsx      # Mitosis source
│   │   │   └── Button.module.css    # Shared styles
│   │   └── Input/
│   │       ├── Input.lite.tsx
│   │       └── Input.module.css
│   └── types/
│       └── css-modules.d.ts
├── overrides/                       # Framework-specific overrides
├── mitosis.config.js                # Build configuration
├── package.json
└── tsconfig.json
```

## Development

### Edit Components

```bash
code packages/_redhorn-components/src/components/Button/Button.lite.tsx
```

### Build All Frameworks

```bash
npm run build:mitosis
```

This generates:
- `packages/react/src/components/Button/Button.tsx`
- `packages/angular/src/components/Button/Button.ts`
- `packages/vue/src/components/Button/Button.vue`
- `packages/react-native/src/components/Button/Button.tsx`

### Preview

```bash
npm run storybook
```

## Mitosis Syntax

Components use Mitosis JSX syntax (`.lite.tsx`):

```tsx
/** @jsxImportSource @builder.io/mitosis */
import { useStore } from '@builder.io/mitosis';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children?: any;
}

export default function Button(props: ButtonProps) {
  const state = useStore({
    get variantClass() {
      return styles[props.variant || 'primary'];
    },
  });

  return (
    <button class={state.variantClass}>
      {props.children}
    </button>
  );
}
```

### Key Differences from React

- Use `class` instead of `className`
- Use `useStore` instead of React hooks
- Computed values in store (getter functions)
- Keep logic simple (cross-framework compatible)

## Adding New Component

### 1. Create Files

```bash
mkdir packages/_redhorn-components/src/components/Badge
```

### 2. Write Mitosis Component

**Badge.lite.tsx:**
```tsx
/** @jsxImportSource @builder.io/mitosis */
import { useStore } from '@builder.io/mitosis';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'default' | 'success';
  children: string;
}

export default function Badge(props: BadgeProps) {
  const state = useStore({
    get variantClass() {
      return styles[props.variant || 'default'];
    },
  });

  return (
    <span class={`${styles.badge} ${state.variantClass}`}>
      {props.children}
    </span>
  );
}
```

**Badge.module.css:**
```css
.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.default {
  background: var(--color-gray-200);
  color: var(--color-gray-800);
}
```

### 3. Generate

```bash
npm run build:mitosis
```

### 4. Preview

```bash
npm run storybook
```

## Guidelines

See `docs/MITOSIS_GUIDELINES.md` for:
- Supported Mitosis features
- Cross-framework patterns
- Common pitfalls
- Best practices

## Configuration

**Build config**: `mitosis.config.js`

```javascript
export default {
  files: 'src/**/*.lite.tsx',
  targets: ['react', 'angular', 'reactNative', 'vue'],
  options: {
    react: {
      stylesType: 'style-tag',
      typescript: true
    },
    angular: {
      standalone: true,
      typescript: true
    },
    reactNative: {
      typescript: true,
      stateType: 'useState'
    },
    vue: {
      typescript: true,
      api: 'composition'
    }
  },
  dest: '../',
  overridesDir: 'overrides'
}
```

## Outputs

Each `.lite.tsx` file generates 4 framework versions:

| Source | React | Angular | Vue | React Native |
|--------|-------|---------|-----|--------------|
| Button.lite.tsx | Button.tsx | Button.ts | Button.vue | Button.tsx |
| Input.lite.tsx | Input.tsx | Input.ts | Input.vue | Input.tsx |

All use the same CSS (Button.module.css, Input.module.css).

## Why Underscore Prefix?

The `_` prefix sorts this folder to the top:

```
packages/
├── _redhorn-components/    ← First in list!
├── angular/
├── react/
├── react-native/
├── tokens/
└── vue/
```

Makes it easy to find the source when browsing `packages/`.

## Commands

```bash
# Build from source
npm run build:mitosis

# Watch mode (auto-rebuild on changes)
npm run watch --workspace=packages/_redhorn-components

# Full build (tokens + components)
npm run build:all
```

## Support

- **Documentation**: `docs/MITOSIS_GUIDELINES.md`
- **Examples**: See existing Button.lite.tsx and Input.lite.tsx
- **Mitosis Docs**: https://github.com/BuilderIO/mitosis

---

**Location**: `packages/_redhorn-components/`  
**Package**: `@redhorn/redhorn-components` (private)  
**Purpose**: Source components for 4 frameworks  
**Status**: ✅ Active development
