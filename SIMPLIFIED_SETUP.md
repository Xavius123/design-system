# Simplified Design System Setup

## Current Focus: Mitosis Components + Storybook

The design system is streamlined to focus on:
1. **Mitosis components** (source)
2. **Generated outputs** (React, Angular, React Native)
3. **Storybook** (preview generated React components)

## Repository Structure

```
design-system/
├── packages/
│   ├── mitosis-components/       ⭐ SOURCE - Edit here
│   │   ├── src/components/
│   │   │   ├── Button/
│   │   │   │   ├── Button.lite.tsx
│   │   │   │   └── Button.module.css
│   │   │   └── Input/
│   │   │       ├── Input.lite.tsx
│   │   │       └── Input.module.css
│   │   └── mitosis.config.js
│   │
│   ├── tokens/                   📦 Design tokens
│   │   └── dist/
│   │       ├── css/
│   │       └── json/
│   │
│   ├── react/                    📦 Generated React
│   │   ├── src/components/
│   │   │   ├── Button/
│   │   │   └── Input/
│   │   ├── stories/              🎨 Storybook
│   │   └── .storybook/
│   │
│   ├── angular/                  📦 Generated Angular
│   │   └── src/components/
│   │
│   └── react-native/             📦 Generated React Native
│       └── src/components/
│
└── .changeset/                   🔄 Version management
```

## Key Packages

| Package | Status | Purpose |
|---------|--------|---------|
| `mitosis-components` | ⭐ Source | Write components here |
| `tokens` | 📦 Publish | Design tokens |
| `react` | 📦 Publish | Generated React components |
| `angular` | 📦 Publish | Generated Angular components |
| `react-native` | 📦 Publish | Generated React Native components |

## Development Workflow

### 1. Edit Source Components

```bash
# Edit Mitosis source
code packages/mitosis-components/src/components/Button/Button.lite.tsx
```

### 2. Build & Generate

```bash
# Generate components for all frameworks
npm run build:mitosis

# This creates:
# - packages/react/src/components/Button/Button.tsx
# - packages/angular/src/components/Button/Button.ts
# - packages/react-native/src/components/Button/Button.tsx
```

### 3. Preview in Storybook

```bash
# Run Storybook for React components
npm run storybook

# Or from React package
cd packages/react
npm run storybook
```

Opens at http://localhost:6007

### 4. Verify Outputs

Check the generated files:

```bash
# React output
code packages/react/src/components/Button/Button.tsx

# Angular output
code packages/angular/src/components/Button/Button.ts

# React Native output
code packages/react-native/src/components/Button/Button.tsx
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run build:tokens` | Build design tokens |
| `npm run build:mitosis` | Generate all framework components |
| `npm run build:all` | Build tokens + generate components |
| `npm run storybook` | Launch Storybook |
| `npm run build-storybook` | Build static Storybook |

## Storybook Stories

Stories are in `packages/react/stories/`:

- `Button.stories.tsx` - All button variants
- `Input.stories.tsx` - All input states

### Adding New Story

```tsx
// packages/react/stories/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import NewComponent from '../src/components/NewComponent/NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'Generated/NewComponent',
  component: NewComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewComponent>;

export const Default: Story = {
  args: {
    // your props
  },
};
```

## Adding New Component

### Step 1: Create Mitosis Component

```bash
mkdir packages/mitosis-components/src/components/Badge
```

Create `Badge.lite.tsx`:

```tsx
/** @jsxImportSource @builder.io/mitosis */
import { useStore } from '@builder.io/mitosis';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'error';
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

Create `Badge.module.css`:

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

.success {
  background: var(--color-success-100);
  color: var(--color-success-800);
}
```

### Step 2: Build

```bash
npm run build:mitosis
```

### Step 3: Create Storybook Story

```tsx
// packages/react/stories/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Badge from '../src/components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Generated/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'New',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
  },
};
```

### Step 4: Preview

```bash
npm run storybook
```

## Publishing Workflow

### 1. Create Changeset

```bash
npx changeset
```

Select:
- All packages (tokens, react, angular, react-native)
- Version type (patch/minor/major)
- Description

### 2. Version

```bash
npm run version
```

Updates package.json files and creates changelogs.

### 3. Publish

```bash
npm login
npm run publish:all
```

Or push to main and let GitHub Actions handle it.

## Simplified GitHub Actions

`.github/workflows/publish.yml`:

```yaml
- Build tokens + Mitosis
- Create release PR (Changesets)
- Auto-publish to npm when merged
```

No Chromatic, no visual regression testing - just build and publish.

## Package Outputs

After `npm run build:mitosis`, you get:

**React (packages/react/src/components/Button/):**
```tsx
// Button.tsx
export default function Button(props) {
  return <button className={...}>{props.children}</button>
}
```

**Angular (packages/angular/src/components/Button/):**
```ts
// Button.ts
@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button>{{children}}</button>`
})
export class ButtonComponent {
  @Input() variant: string = 'primary';
}
```

**React Native (packages/react-native/src/components/Button/):**
```tsx
// Button.tsx
import { Pressable, Text } from 'react-native';

export default function Button(props) {
  return (
    <Pressable>
      <Text>{props.children}</Text>
    </Pressable>
  );
}
```

## Current Components

- ✅ Button (primary, secondary, ghost, outline)
- ✅ Input (text, email, password, with validation)

## Next Components to Add

- Checkbox
- Radio
- Switch
- Badge
- Tag
- Avatar

## Tips

### TypeScript Errors in .lite.tsx?

Add JSX pragma at top:

```tsx
/** @jsxImportSource @builder.io/mitosis */
```

### CSS Modules Not Found?

Check `packages/mitosis-components/src/types/css-modules.d.ts` exists:

```typescript
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

### Want to See All Generated Files?

```bash
# React
ls packages/react/src/components/

# Angular
ls packages/angular/src/components/

# React Native
ls packages/react-native/src/components/
```

### Build Not Working?

```bash
# Clean and rebuild
npm run build:tokens
npm run build:mitosis
```

## Documentation

- `docs/MITOSIS_GUIDELINES.md` - Component development patterns
- `docs/APP_INTEGRATION_GUIDE.md` - How apps use packages
- `docs/PUBLISHING_GUIDE.md` - Release process
- `docs/PILOT_ROLLOUT.md` - Adoption strategy

## Focus Areas

**Current:**
- ✅ Mitosis component authoring
- ✅ Generated output quality
- ✅ Storybook previews
- ✅ Build pipeline

**Not Included (simplified out):**
- ❌ Chromatic visual testing
- ❌ react-ui (original React package)
- ❌ Complex CI/CD
- ❌ Multiple Storybook instances

## Quick Reference

```bash
# Daily workflow
code packages/mitosis-components/src/components/Button/Button.lite.tsx
npm run build:mitosis
npm run storybook

# Publishing
npx changeset
npm run version
npm run publish:all

# Verify
npm view @redhorn/react
```

---

**Status:** ✅ Streamlined and ready for component development

**Focus:** Write Mitosis → Generate outputs → Preview in Storybook → Publish to npm
