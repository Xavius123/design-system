# Multi-Brand Design System Guide

Complete guide to managing multiple brands in the Redhorn Design System, including architecture patterns, implementation strategies, and best practices.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Options](#architecture-options)
3. [Recommended Approach](#recommended-approach)
4. [Implementation Guide](#implementation-guide)
5. [Consumer Usage](#consumer-usage)
6. [Real-World Examples](#real-world-examples)
7. [Best Practices](#best-practices)
8. [Migration Path](#migration-path)

---

## Overview

### The Challenge

Supporting multiple brands in a design system while maintaining:
- ✅ Single component codebase
- ✅ Consistent behavior
- ✅ Brand-specific visual identity
- ✅ Easy maintenance

### Example Scenario

**Redhorn Design System** needs to support:
- **Brand Red** - Primary brand with red color palette
- **Brand Blue** - Secondary brand with blue color palette

**Same components, different visual identity.**

---

## Architecture Options

### Option 1: Token-Based Theming ⭐ (Recommended)

**Concept:** Same components, different token files per brand

**Structure:**
```
packages/tokens/
├── core/                    # Shared across all brands
│   ├── spacing.json        # 4px, 8px, 16px, etc.
│   ├── typography.json     # Font scale
│   └── semantic.json       # color.primary, color.secondary
├── brands/
│   ├── brand-red/
│   │   ├── colors.json     # Red color palette
│   │   └── overrides.json  # Brand-specific tweaks
│   └── brand-blue/
│       ├── colors.json     # Blue color palette
│       └── overrides.json
└── dist/
    ├── brand-red/
    │   ├── css/light.css
    │   └── js/light.js
    └── brand-blue/
        ├── css/light.css
        └── js/light.js
```

**How it works:**

1. **Core tokens** define the semantic layer:
```json
{
  "color": {
    "primary": { "$value": "{brand.primary}" },
    "secondary": { "$value": "{brand.secondary}" }
  }
}
```

2. **Brand tokens** define actual values:
```json
// brand-red/colors.json
{
  "brand": {
    "primary": { "$value": "#C1272D" }
  }
}

// brand-blue/colors.json
{
  "brand": {
    "primary": { "$value": "#1E3A8A" }
  }
}
```

3. **Components** reference semantic tokens:
```css
.button {
  background: var(--color-primary);  /* Not brand-specific! */
}
```

**Pros:**
- ✅ Single component codebase
- ✅ Easy to maintain
- ✅ Small bundle size
- ✅ No runtime overhead
- ✅ Industry standard (used by IBM, Adobe, Salesforce)

**Cons:**
- ❌ All components must work with all brands
- ❌ Limited per-brand customization

---

### Option 2: Themed Packages

**Concept:** Core components + theme wrapper per brand

**Structure:**
```tsx
import { Button } from '@redhorn/react-ui';
import { RedBrandTheme } from '@redhorn/themes/red';
import { BlueBrandTheme } from '@redhorn/themes/blue';

// Red brand app
<RedBrandTheme>
  <Button>Red Button</Button>
</RedBrandTheme>

// Blue brand app
<BlueBrandTheme>
  <Button>Blue Button</Button>
</BlueBrandTheme>
```

**Pros:**
- ✅ Runtime brand switching
- ✅ Can mix brands in one app
- ✅ Flexible theming

**Cons:**
- ❌ Larger bundle size
- ❌ Runtime performance cost
- ❌ More complex API

---

### Option 3: CSS Custom Properties

**Concept:** Switch brands via CSS class/attribute

**Structure:**
```css
/* Brand Red */
[data-brand="red"] {
  --color-primary: #C1272D;
  --color-primary-hover: #A11E23;
}

/* Brand Blue */
[data-brand="blue"] {
  --color-primary: #1E3A8A;
  --color-primary-hover: #1E40AF;
}

/* Component */
.button {
  background: var(--color-primary);
}
```

**Usage:**
```tsx
<div data-brand="red">
  <App />  {/* All components use red theme */}
</div>
```

**Pros:**
- ✅ Simple implementation
- ✅ Runtime brand switching
- ✅ No JavaScript overhead
- ✅ Framework agnostic

**Cons:**
- ❌ Only affects styling (not behavior)
- ❌ Less control than JavaScript theming

---

### Option 4: Separate Packages Per Brand

**Concept:** Complete separation, different packages

**Structure:**
```
packages/
├── react-ui-brand-red/
├── react-ui-brand-blue/
└── core/  # Shared utilities
```

**Pros:**
- ✅ Complete brand independence
- ✅ Can have brand-specific components

**Cons:**
- ❌ Code duplication
- ❌ Hard to maintain consistency
- ❌ Multiple packages to manage

---

## Recommended Approach

### For Redhorn: Token-Based Theming

**Why:**
- You already have Style Dictionary setup
- Components are brand-agnostic
- Easy to add more brands later
- Industry-proven pattern

**Architecture:**

```
Token Layers:
┌─────────────────────────────────────┐
│ Global Tokens                       │
│ (spacing, typography, shadows)      │
│ Shared across ALL brands            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Semantic Tokens                     │
│ (color.primary, color.action)       │
│ Brand-agnostic names                │
└─────────────────────────────────────┘
              ↓
┌──────────────────┐  ┌──────────────────┐
│ Brand Red Tokens │  │ Brand Blue Tokens│
│ (red palette)    │  │ (blue palette)   │
└──────────────────┘  └──────────────────┘
```

---

## Implementation Guide

### Step 1: Restructure Token Directory

**Current structure:**
```
packages/tokens/
├── colors-light.json
├── colors-dark.json
├── typography.json
└── spacing.json
```

**New structure:**
```
packages/tokens/
├── core/
│   ├── semantic.json       # color.primary → {brand.primary}
│   ├── typography.json     # Shared font scale
│   ├── spacing.json        # Shared spacing
│   └── shadows.json        # Shared shadows
├── brands/
│   ├── brand-red/
│   │   ├── colors.json     # Red palette
│   │   ├── light.json      # Light mode values
│   │   └── dark.json       # Dark mode values
│   └── brand-blue/
│       ├── colors.json     # Blue palette
│       ├── light.json      # Light mode values
│       └── dark.json       # Dark mode values
└── dist/                   # Generated outputs
    ├── brand-red/
    │   ├── css/
    │   │   ├── light.css
    │   │   └── dark.css
    │   └── js/
    │       ├── light.js
    │       └── dark.js
    └── brand-blue/
        ├── css/
        └── js/
```

### Step 2: Create Core Semantic Tokens

**File:** `packages/tokens/core/semantic.json`

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "{brand.primary}"
    },
    "primaryHover": {
      "$type": "color",
      "$value": "{brand.primaryHover}"
    },
    "primaryActive": {
      "$type": "color",
      "$value": "{brand.primaryActive}"
    },
    "secondary": {
      "$type": "color",
      "$value": "{brand.secondary}"
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{palette.gray.900}"
      },
      "secondary": {
        "$type": "color",
        "$value": "{palette.gray.600}"
      }
    },
    "success": {
      "$type": "color",
      "$value": "{palette.green.500}"
    },
    "error": {
      "$type": "color",
      "$value": "{palette.red.500}"
    }
  }
}
```

### Step 3: Create Brand-Specific Tokens

**File:** `packages/tokens/brands/brand-red/colors.json`

```json
{
  "brand": {
    "primary": {
      "$type": "color",
      "$value": "#C1272D",
      "$description": "Brand Red primary color"
    },
    "primaryHover": {
      "$type": "color",
      "$value": "#A11E23"
    },
    "primaryActive": {
      "$type": "color",
      "$value": "#8A1A1F"
    },
    "secondary": {
      "$type": "color",
      "$value": "#F5F5F5"
    }
  },
  "palette": {
    "red": {
      "50": { "$value": "#FFEBEE" },
      "100": { "$value": "#FFCDD2" },
      "500": { "$value": "#C1272D" },
      "900": { "$value": "#4D0E11" }
    }
  }
}
```

**File:** `packages/tokens/brands/brand-blue/colors.json`

```json
{
  "brand": {
    "primary": {
      "$type": "color",
      "$value": "#1E3A8A",
      "$description": "Brand Blue primary color"
    },
    "primaryHover": {
      "$type": "color",
      "$value": "#1E40AF"
    },
    "primaryActive": {
      "$type": "color",
      "$value": "#2563EB"
    },
    "secondary": {
      "$type": "color",
      "$value": "#F5F5F5"
    }
  },
  "palette": {
    "blue": {
      "50": { "$value": "#EFF6FF" },
      "100": { "$value": "#DBEAFE" },
      "500": { "$value": "#1E3A8A" },
      "900": { "$value": "#1E3A8A" }
    }
  }
}
```

### Step 4: Update Style Dictionary Build

**File:** `config/style-dictionary.config.js`

```javascript
import StyleDictionary from 'style-dictionary';

const brands = ['brand-red', 'brand-blue'];
const themes = ['light', 'dark'];

brands.forEach(brand => {
  themes.forEach(theme => {
    console.log(`Building ${brand} - ${theme}`);
    
    const sd = new StyleDictionary({
      source: [
        'packages/tokens/core/**/*.json',
        `packages/tokens/brands/${brand}/**/*.json`,
        `packages/tokens/themes/${theme}.json`
      ],
      platforms: {
        css: {
          buildPath: `packages/tokens/dist/${brand}/css/`,
          transformGroup: 'css',
          files: [{
            destination: `${theme}.css`,
            format: 'css/variables',
            options: {
              outputReferences: true
            }
          }]
        },
        js: {
          buildPath: `packages/tokens/dist/${brand}/js/`,
          transformGroup: 'js',
          files: [{
            destination: `${theme}.js`,
            format: 'javascript/es6'
          }]
        }
      }
    });
    
    sd.buildAllPlatforms();
  });
});

console.log('\n✅ All brand tokens built successfully!');
```

### Step 5: Update Package Exports

**File:** `packages/tokens/package.json`

```json
{
  "name": "@redhorn/design-tokens",
  "version": "1.0.0",
  "exports": {
    "./brand-red/light": {
      "import": "./dist/brand-red/css/light.css"
    },
    "./brand-red/dark": {
      "import": "./dist/brand-red/css/dark.css"
    },
    "./brand-red/js/light": {
      "import": "./dist/brand-red/js/light.js"
    },
    "./brand-red/js/dark": {
      "import": "./dist/brand-red/js/dark.js"
    },
    "./brand-blue/light": {
      "import": "./dist/brand-blue/css/light.css"
    },
    "./brand-blue/dark": {
      "import": "./dist/brand-blue/css/dark.css"
    },
    "./brand-blue/js/light": {
      "import": "./dist/brand-blue/js/light.js"
    },
    "./brand-blue/js/dark": {
      "import": "./dist/brand-blue/js/dark.js"
    }
  }
}
```

---

## Consumer Usage

### Web Applications (React)

**Brand Red App:**
```tsx
// Import red brand tokens
import '@redhorn/design-tokens/brand-red/light';
import { Button, Input, Checkbox } from '@redhorn/react-ui';

function App() {
  return (
    <div>
      <Button variant="primary">Red Brand Button</Button>
      <Input label="Email" />
      <Checkbox label="Accept terms" />
    </div>
  );
}
```

**Brand Blue App:**
```tsx
// Import blue brand tokens
import '@redhorn/design-tokens/brand-blue/light';
import { Button, Input, Checkbox } from '@redhorn/react-ui';

function App() {
  return (
    <div>
      <Button variant="primary">Blue Brand Button</Button>
      <Input label="Email" />
      <Checkbox label="Accept terms" />
    </div>
  );
}
```

**Same components, different brands!**

### React Native Applications

**Brand selection via config:**

```tsx
// config/brand.ts
import { lightTokens as redLight } from '@redhorn/design-tokens/brand-red/js/light';
import { lightTokens as blueLight } from '@redhorn/design-tokens/brand-blue/js/light';

const BRAND = process.env.BRAND || 'red';

export const tokens = BRAND === 'blue' ? blueLight : redLight;
```

**Components use config:**
```tsx
import { tokens } from './config/brand';
import { Button } from '@redhorn/react-native-ui';

// Button styles automatically use correct brand tokens
<Button variant="primary">Button</Button>
```

### Runtime Brand Switching (Advanced)

**For apps that need to switch brands dynamically:**

```tsx
import { useState } from 'react';

function App() {
  const [brand, setBrand] = useState('red');
  
  return (
    <div data-brand={brand}>
      <select onChange={(e) => setBrand(e.target.value)}>
        <option value="red">Red Brand</option>
        <option value="blue">Blue Brand</option>
      </select>
      
      <Button>Dynamic Brand Button</Button>
    </div>
  );
}
```

**CSS:**
```css
[data-brand="red"] {
  --color-primary: #C1272D;
}

[data-brand="blue"] {
  --color-primary: #1E3A8A;
}
```

---

## Real-World Examples

### IBM Carbon Design System

**Brands:** IBM, Watson, CloudPak, Security

**Strategy:** Token theming with semantic layer

```
@carbon/
├── react/              # Components (brand-agnostic)
└── themes/
    ├── white/          # IBM white theme
    ├── g10/            # IBM gray 10
    ├── g90/            # IBM gray 90
    └── g100/           # IBM gray 100
```

**Usage:**
```tsx
import { white, g10, g90, g100 } from '@carbon/themes';
import { Theme } from '@carbon/react';

<Theme theme={white}>
  <App />
</Theme>
```

### Adobe Spectrum

**Brands:** Adobe, Behance, Portfolio

**Strategy:** Three-tier token system

```
Tier 1: Global (blue-500, gray-100)
Tier 2: Semantic (color-primary, color-background)
Tier 3: Component (button-background, input-border)
```

**Each brand overrides semantic tier:**
```json
// Adobe
{ "color-primary": "blue-500" }

// Behance
{ "color-primary": "pink-500" }
```

### Salesforce Lightning

**Brands:** Salesforce, Pardot, Tableau, MuleSoft

**Strategy:** Design token system with brand themes

```
Lightning/
├── tokens/
│   ├── global/         # Spacing, typography
│   ├── semantic/       # color.primary
│   └── brands/
│       ├── salesforce/ # Blue theme
│       ├── pardot/     # Orange theme
│       └── tableau/    # Multi-color theme
```

---

## Best Practices

### 1. Use Semantic Tokens in Components

**✅ Good:**
```css
.button {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}
```

**❌ Bad:**
```css
.button {
  background: var(--brand-red-500);  /* Brand-specific! */
  color: white;
}
```

### 2. Shared Core, Brand-Specific Values

**Core tokens (shared):**
- Spacing scale (4px, 8px, 16px...)
- Typography scale (14px, 16px, 18px...)
- Shadow definitions
- Border radius options

**Brand tokens (different):**
- Primary/secondary colors
- Brand-specific accent colors
- Logo/imagery
- Optional: font families

### 3. Semantic Naming

**Good semantic names:**
- `color.primary` (purpose-based)
- `color.action` (role-based)
- `color.interactive` (function-based)

**Bad semantic names:**
- `color.blue` (value-based)
- `color.brand1` (arbitrary)
- `color.main` (unclear)

### 4. Document Brand Differences

```markdown
# Brand Comparison

| Token | Red Brand | Blue Brand |
|-------|-----------|------------|
| color.primary | #C1272D | #1E3A8A |
| color.accent | #F52D3E | #2563EB |
| font.heading | Inter Bold | Inter Bold |
```

### 5. Test with All Brands

**Storybook:**
```tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    brands: ['red', 'blue'],  // Test with both
  },
};
```

**Visual regression:**
```bash
# Test red brand
npm run chromatic -- --brand=red

# Test blue brand
npm run chromatic -- --brand=blue
```

---

## Migration Path

### Phase 1: Restructure Tokens (Week 1)

**Tasks:**
- [ ] Create `core/` and `brands/` directories
- [ ] Move existing tokens to `brands/brand-red/`
- [ ] Create semantic token layer in `core/`
- [ ] Create `brands/brand-blue/` tokens
- [ ] Update Style Dictionary config

**Validation:**
- Build tokens for both brands
- Verify output structure
- Compare red brand output with existing

### Phase 2: Update Build Process (Week 1)

**Tasks:**
- [ ] Update build scripts for multi-brand
- [ ] Update package.json exports
- [ ] Test token generation
- [ ] Verify import paths

**Validation:**
- `npm run build:tokens` generates both brands
- Can import both brands in test app

### Phase 3: Component Migration (Week 2)

**Tasks:**
- [ ] Audit components for brand-specific values
- [ ] Replace with semantic tokens
- [ ] Update CSS modules
- [ ] Test components with both brands

**Validation:**
- All components work with red brand
- All components work with blue brand
- No hardcoded colors remain

### Phase 4: Storybook Multi-Brand (Week 2)

**Tasks:**
- [ ] Add brand switcher to Storybook
- [ ] Create brand-specific stories (optional)
- [ ] Document brand usage
- [ ] Visual regression testing

**Validation:**
- Can switch brands in Storybook
- All stories render correctly
- Chromatic tests pass for both brands

### Phase 5: Documentation (Week 3)

**Tasks:**
- [ ] Update README with multi-brand info
- [ ] Create brand selection guide
- [ ] Document token structure
- [ ] Add migration guide for consumers

**Validation:**
- Clear documentation exists
- Examples for both brands
- Migration path documented

---

## Troubleshooting

### Components Look the Same in Both Brands

**Problem:** Forgot to use semantic tokens

**Solution:** Replace hardcoded values with semantic tokens
```css
/* Before */
.button { background: #C1272D; }

/* After */
.button { background: var(--color-primary); }
```

### Build Fails for One Brand

**Problem:** Missing token reference

**Solution:** Check token exists in both brands
```json
// Ensure both brands define all semantic tokens
// brand-red/colors.json
{ "brand": { "primary": "#C1272D" } }

// brand-blue/colors.json
{ "brand": { "primary": "#1E3A8A" } }
```

### Wrong Brand Loading

**Problem:** Importing wrong brand tokens

**Solution:** Check import statement
```tsx
// ✅ Correct
import '@redhorn/design-tokens/brand-blue/light';

// ❌ Wrong
import '@redhorn/design-tokens/brand-red/light';
```

---

## Future Considerations

### Adding a Third Brand

The architecture supports unlimited brands:

```
brands/
├── brand-red/
├── brand-blue/
├── brand-green/    # New!
└── brand-purple/   # New!
```

Just add token files and rebuild.

### Brand-Specific Components

If needed, create brand variants:

```tsx
// Wrapper for brand-specific behavior
export const RedButton = (props) => (
  <BrandProvider brand="red">
    <Button {...props} />
  </BrandProvider>
);

export const BlueButton = (props) => (
  <BrandProvider brand="blue">
    <Button {...props} />
  </BrandProvider>
);
```

### Per-Brand Component Customization

Use brand context for conditional rendering:

```tsx
const Button = ({ children }) => {
  const brand = useBrand();
  
  return (
    <button className={styles[brand]}>
      {brand === 'blue' && <Icon />}  {/* Blue brand only */}
      {children}
    </button>
  );
};
```

---

## Resources

- **Style Dictionary:** https://amzn.github.io/style-dictionary/
- **Design Tokens Format:** https://design-tokens.github.io/community-group/format/
- **IBM Carbon Theming:** https://carbondesignsystem.com/guidelines/themes/overview/
- **Adobe Spectrum Tokens:** https://spectrum.adobe.com/page/design-tokens/
- **Material UI Theming:** https://mui.com/material-ui/customization/theming/

---

## Summary

**Key Takeaways:**

1. **Token-based theming** is the industry standard for multi-brand systems
2. **Semantic tokens** provide brand-agnostic layer
3. **Components** stay the same, only tokens change
4. **Easy to scale** - add unlimited brands
5. **No runtime cost** - tokens resolved at build time

**For Redhorn Design System:**
- Restructure tokens into `core/` and `brands/`
- Build separate outputs per brand
- Components use semantic tokens only
- Consumers choose brand via import

---

**Last Updated:** December 2024  
**Maintained by:** Redhorn Design System Team

