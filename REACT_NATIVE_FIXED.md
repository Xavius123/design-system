# ✅ React Native StyleSheet Solution

## Problem Solved
Mitosis was generating React Native components with CSS Module imports (`import styles from './Button.module.css'`) which don't work in React Native. Every build would overwrite manually fixed StyleSheet versions.

## Solution: Automated Post-Build Fix

### How It Works

```
1. Mitosis builds all frameworks (including broken RN)
   ↓
2. Copy CSS modules to web frameworks (React, Angular, Vue)
   ↓
3. Replace RN components with proper StyleSheet templates
   ✓ Fully automated
```

### File Structure

```
source/redhorn-components/
├── src/
│   └── components/
│       ├── Button/
│       │   ├── Button.lite.tsx        ← Source (uses CSS Modules)
│       │   └── Button.module.css
│       └── Input/
│           ├── Input.lite.tsx          ← Source (uses CSS Modules)
│           └── Input.module.css
└── templates/
    └── react-native/
        ├── Button/
        │   └── Button.tsx              ← RN template (StyleSheet)
        └── Input/
            └── Input.tsx                ← RN template (StyleSheet)
```

### Build Process

**Updated script in `package.json`:**
```json
"build:mitosis": "npm run build --workspace=source/redhorn-components && node scripts/copy-css-modules.js && node scripts/fix-react-native.js"
```

**What happens:**
1. `mitosis build` - Generates all framework outputs (RN will have CSS imports)
2. `copy-css-modules.js` - Copies CSS to React, Angular, Vue
3. `fix-react-native.js` - Replaces RN components with StyleSheet versions ✨

### New Files

**Template Files (StyleSheet implementations):**
- `source/redhorn-components/templates/react-native/Button/Button.tsx`
- `source/redhorn-components/templates/react-native/Input/Input.tsx`

**Build Script:**
- `scripts/fix-react-native.js` - Auto-replaces generated RN files

---

## How to Maintain React Native Components

### When You Add a New Component

1. **Create the Mitosis source** (uses CSS Modules - normal workflow):
   ```
   source/redhorn-components/src/components/NewComponent/
   ├── NewComponent.lite.tsx
   └── NewComponent.module.css
   ```

2. **Create the React Native template** (with StyleSheet):
   ```
   source/redhorn-components/templates/react-native/NewComponent/
   └── NewComponent.tsx
   ```

3. **Build:**
   ```bash
   npm run build:mitosis
   ```
   The script automatically replaces the generated RN file with your template.

### React Native Template Structure

Each RN template should:
- Use `StyleSheet.create()` instead of CSS imports
- Match the same props interface as the source component
- Use proper RN components (`TouchableOpacity`, `TextInput`, etc.)
- Convert CSS styles to RN equivalents

**Example:**
```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[`button_${props.variant}`]]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 6,
  },
  button_primary: {
    backgroundColor: '#007bff',
  },
  text: {
    color: '#ffffff',
  },
});
```

---

## CSS to React Native StyleSheet Conversion Guide

### Common Conversions

| CSS Property | React Native StyleSheet |
|--------------|------------------------|
| `display: flex` | `flexDirection: 'row'` or `'column'` |
| `align-items: center` | `alignItems: 'center'` |
| `justify-content: space-between` | `justifyContent: 'space-between'` |
| `padding: 10px 20px` | `paddingVertical: 10, paddingHorizontal: 20` |
| `margin: 10px` | `margin: 10` |
| `border: 1px solid #000` | `borderWidth: 1, borderColor: '#000'` |
| `border-radius: 6px` | `borderRadius: 6` |
| `font-weight: bold` | `fontWeight: 'bold'` |
| `font-weight: 500` | `fontWeight: '500'` (string) |
| `font-size: 14px` | `fontSize: 14` (number) |
| `color: #000` | `color: '#000'` (string) |
| `background-color: #fff` | `backgroundColor: '#fff'` |
| `opacity: 0.5` | `opacity: 0.5` |

### Not Supported in React Native

- ❌ `box-shadow` - Use `elevation` (Android) or `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` (iOS)
- ❌ `transition` - Use `Animated` API
- ❌ `:hover`, `:active` - Handle via component state
- ❌ `cursor` - No cursors on mobile
- ❌ CSS variables (`var(--token)`) - Use JS constants

---

## Current React Native Components

### Button
**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `onPress`: () => void
- `children`: ReactNode
- `style`: ViewStyle (custom styles)

**Example:**
```tsx
<Button variant="primary" size="md" onPress={() => alert('Pressed')}>
  Click Me
</Button>
```

### Input
**Props:**
- `label`: string
- `placeholder`: string
- `value`: string
- `onChangeText`: (text: string) => void
- `size`: 'sm' | 'md' | 'lg'
- `error`: boolean
- `errorMessage`: string
- `helperText`: string
- `required`: boolean
- `fullWidth`: boolean
- `editable`: boolean
- `containerStyle`: ViewStyle

**Example:**
```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
  error={!isValid}
  errorMessage="Please enter a valid email"
  size="md"
  required
/>
```

---

## Benefits of This Approach

### ✅ Best of Both Worlds
- Web frameworks use CSS Modules (clean, familiar)
- React Native uses StyleSheet (proper, performant)
- Fully automated - no manual intervention needed

### ✅ Easy Maintenance
- Edit source `.lite.tsx` files as normal
- Edit RN templates when RN-specific changes needed
- Build script handles everything automatically

### ✅ No Mitosis Limitations
- Don't need inline `css` props
- Don't need to rewrite all components
- Keep your clean CSS Module approach

### ✅ Scalable
- Add new components easily
- Just create both source and template
- Script auto-detects and fixes all components

---

## Workflow Summary

### Daily Development (Web Components)
```bash
# Edit source files
vim source/redhorn-components/src/components/Button/Button.lite.tsx
vim source/redhorn-components/src/components/Button/Button.module.css

# Build
npm run build:mitosis

# React, Angular, Vue get CSS Modules ✓
# React Native gets StyleSheet ✓
```

### Adding React Native Features
```bash
# Edit RN template directly
vim source/redhorn-components/templates/react-native/Button/Button.tsx

# Build
npm run build:mitosis

# Your RN changes are preserved ✓
```

---

## Testing React Native Components

### In a React Native App

```bash
# Install the package
npm install file:../design-system/packages/react-native

# Use it
import { Button, Input } from '@redhorn/react-native';

function App() {
  return (
    <View>
      <Button variant="primary" onPress={() => console.log('Pressed')}>
        Press Me
      </Button>
      <Input
        label="Name"
        placeholder="Enter your name"
        onChangeText={(text) => console.log(text)}
      />
    </View>
  );
}
```

### Verify StyleSheet
Check that generated files have `StyleSheet.create()`:
```bash
cat packages/react-native/src/components/Button/Button.tsx
# Should see: const styles = StyleSheet.create({ ... })
# Should NOT see: import styles from './Button.module.css'
```

---

## Troubleshooting

### Build shows "Fixed 0 components"
**Problem:** Templates not found

**Fix:**
```bash
# Verify templates exist
ls source/redhorn-components/templates/react-native/
# Should show: Button/, Input/
```

### RN components still have CSS imports
**Problem:** Script didn't run or failed

**Fix:**
```bash
# Run fix script manually
node scripts/fix-react-native.js

# Check for errors in output
```

### New component not getting fixed
**Problem:** Forgot to create template

**Fix:**
1. Create template: `source/redhorn-components/templates/react-native/NewComponent/NewComponent.tsx`
2. Re-run build: `npm run build:mitosis`

---

## Future Enhancements

### Potential Improvements
1. **Auto-generate RN templates** from CSS files (CSS-to-StyleSheet parser)
2. **Design token integration** - Use token JS values instead of hardcoded colors
3. **Theme support** - Dark mode for RN components
4. **Validation** - Check RN components on build for common issues
5. **Documentation generator** - Auto-generate RN API docs

### Current Limitations
- Manual RN template creation (not auto-generated)
- Styles are hardcoded (not using design tokens yet)
- Light mode only (no dark theme)
- 2 components (Button, Input) - add more as needed

---

## Status: ✅ FULLY AUTOMATED

**Every `npm run build:mitosis` now:**
1. ✅ Generates perfect web components (React, Angular, Vue)
2. ✅ Auto-fixes React Native with StyleSheet
3. ✅ No manual intervention required
4. ✅ Ready for production use

**Your React Native components will always have proper StyleSheet implementations!** 🎉
