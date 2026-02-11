# ✅ Storybook Moved to Root Level

## What Changed

Storybook has been moved from `packages/react/` to the root level for better multi-framework architecture.

### Before (Package-Specific)
```
packages/react/
├── .storybook/          ← Storybook config
├── stories/             ← Story files
├── src/                 ← React components
└── package.json         ← Storybook dependencies
```

### After (Root-Level)
```
.storybook/              ← Storybook config (ROOT)
├── main.js
└── preview.js

stories/                 ← Story files (ROOT)
├── Button.mdx
├── Button.stories.jsx
├── Input.mdx
└── Input.stories.jsx

packages/
├── react/               ← Just components
├── angular/             ← Just components
├── vue/                 ← Just components
└── react-native/        ← Just components
```

---

## Benefits

### 1. Framework-Agnostic
- Storybook is no longer tied to the React package
- Can showcase all frameworks from one place
- Single source of truth for documentation

### 2. Better for Publishing
- Storybook dev dependencies not included in published packages
- Smaller package sizes
- Cleaner package structure

### 3. Single URL
- One Storybook for all frameworks: http://localhost:6012/
- No need to run multiple Storybook instances
- Easier to share with team

### 4. Easier Deployment
- One build command: `npm run build-storybook`
- One deployment target
- Consistent documentation site

---

## What Was Moved

### Files
- `.storybook/` → Root level
  - `main.js` (updated paths)
  - `preview.js` (updated token imports)
- `stories/` → Root level
  - All `.mdx` and `.stories.jsx` files

### Dependencies
- All Storybook packages moved to root `devDependencies`:
  - `@storybook/react-vite`
  - `@storybook/blocks`
  - `@storybook/addon-*`
  - `storybook`
  - `vite`
  - `react` & `react-dom` (for Storybook)

### Scripts
- `npm run storybook` → Runs from root
- `npm run build-storybook` → Runs from root

---

## Updated Paths

### .storybook/main.js
```javascript
// Before
resolve: {
  alias: {
    '@': resolve(__dirname, '../src'),
    '@tokens': resolve(__dirname, '../../tokens/dist/css'),
  },
}

// After
resolve: {
  alias: {
    '@': resolve(__dirname, '../packages/react/src'),
    '@tokens': resolve(__dirname, '../packages/tokens/dist/css'),
  },
}
```

### .storybook/preview.js
```javascript
// Before
import '../../tokens/dist/css/light.css';
import '../../tokens/dist/css/dark.css';

// After
import '../packages/tokens/dist/css/light.css';
import '../packages/tokens/dist/css/dark.css';
```

---

## How to Use

### Start Storybook
```bash
npm run storybook
```

**URL:** http://localhost:6012/

### Build Static Site
```bash
npm run build-storybook
```

**Output:** `storybook-static/` (root level)

### Add New Stories
Create stories in the root `stories/` folder:

```
stories/
└── NewComponent/
    ├── NewComponent.mdx
    └── NewComponent.stories.jsx
```

---

## Multi-Framework Documentation

Your MDX files already show all frameworks:

```mdx
# Button

## Live Preview (React)
<Canvas of={ButtonStories.Primary} />

## Installation & Usage by Framework

### React
```jsx
import { Button } from '@redhorn/react';
<Button variant="primary">Click Me</Button>
```

### Angular
```typescript
import { ButtonComponent } from '@redhorn/angular';
<redhorn-button variant="primary">Click Me</redhorn-button>
```

### Vue
```vue
import { Button } from '@redhorn/vue';
<Button variant="primary">Click Me</Button>
```

### React Native
```jsx
import { Button } from '@redhorn/react-native';
<Button variant="primary" onPress={...}>Click Me</Button>
```
```

**This pattern continues to work perfectly from root level!**

---

## Package Structure

### packages/react/
```
packages/react/
├── src/
│   ├── components/    ← Generated components
│   └── index.js       ← Exports
└── package.json       ← No Storybook dependencies
```

**Clean!** No `.storybook/`, `stories/`, or Storybook dependencies.

### Root Level
```
design-system/
├── .storybook/        ← All Storybook config
├── stories/           ← All documentation
├── packages/          ← Component packages (clean)
├── source/            ← Mitosis source
└── package.json       ← Storybook dependencies here
```

---

## Lint Configuration Updated

```json
// Before
"lint": "eslint ... \"packages/react/stories/**/*.{js,jsx}\""

// After
"lint": "eslint ... \"stories/**/*.{js,jsx}\""
```

Now lints stories from root `stories/` folder.

---

## What Stays the Same

### 1. Component Development
Still edit in `source/redhorn-components/`:
```bash
vim source/redhorn-components/src/components/Button/Button.lite.tsx
npm run build:mitosis
```

### 2. Storybook Experience
Same URL, same UI, same components:
- http://localhost:6012/
- Button & Input components
- Multi-framework docs

### 3. Build Pipeline
```bash
npm run build:mitosis   # Generates components
npm run storybook       # Shows them in Storybook
```

---

## CI/CD Considerations

### Deploy Storybook
```yaml
# .github/workflows/deploy-storybook.yml
- name: Build Storybook
  run: npm run build-storybook

- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./storybook-static
```

### Test Storybook Builds in CI
```yaml
# .github/workflows/test.yml
- name: Test Storybook Build
  run: |
    npm run build:mitosis
    npm run build-storybook
```

---

## Migration Checklist

- [x] Move `.storybook/` to root
- [x] Move `stories/` to root
- [x] Update paths in `main.js`
- [x] Update imports in `preview.js`
- [x] Move Storybook dependencies to root
- [x] Update root `package.json` scripts
- [x] Remove Storybook from `packages/react`
- [x] Update lint paths
- [x] Install dependencies
- [x] Test Storybook starts successfully

---

## Verification

### ✅ Directory Structure
```
c:\Repo\design-system\
├── .storybook/          ← EXISTS at root
├── stories/             ← EXISTS at root
└── packages/
    └── react/
        ├── src/         ← Components only
        └── package.json ← No Storybook deps
```

### ✅ Storybook Running
```
Storybook 8.6.14 for react-vite started
Local: http://localhost:6012/
```

### ✅ Commands Work
```bash
npm run storybook       ← Starts from root ✓
npm run build-storybook ← Builds from root ✓
```

---

## Future Enhancements

Now that Storybook is at root, you can:

1. **Add Framework Switcher** - Show live examples for multiple frameworks
2. **Deploy to GitHub Pages** - One deployment for all docs
3. **Add More Addons** - Accessibility, performance, etc.
4. **Showcase Design Tokens** - Create token documentation pages
5. **Add Playground** - Interactive component playground

---

## Summary

**What:** Moved Storybook from `packages/react/` to root level  
**Why:** Better architecture, framework-agnostic, easier to maintain  
**Result:** Single Storybook showing all frameworks at http://localhost:6012/  
**Status:** ✅ Complete and working

**Storybook is now at the root level and showcases your entire multi-framework design system!** 🎉
