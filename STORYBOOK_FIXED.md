# ✅ Storybook Fixed - Mitosis Pragma Removed

## Problem Solved

**Issue:** Storybook was failing with error:
```
Failed to fetch dynamically imported module
Missing "./jsx-dev-runtime" specifier in "@builder.io/mitosis" package
```

**Root Cause:** Generated React, Angular, and Vue components had Mitosis JSX pragma:
```typescript
/** @jsxImportSource @builder.io/mitosis */
```

This pragma told components to use Mitosis JSX runtime instead of their framework's native runtime.

---

## Solution Implemented

### 1. Created Pragma Removal Script

**File:** `scripts/remove-mitosis-pragma.js`

**What it does:**
- Scans all generated React, Angular, Vue components
- Removes `/** @jsxImportSource @builder.io/mitosis */` pragma
- Reports which files were cleaned
- Fully automated

**Output:**
```
🧹 Removing Mitosis JSX pragmas from generated components...
✓ Cleaned react/Button.tsx
✓ Cleaned react/Input.tsx
✓ Cleaned angular/Button.ts
✓ Cleaned angular/Input.ts
✓ Cleaned vue/Button.vue
✓ Cleaned vue/Input.vue
✅ Cleaned 6 component file(s)!
```

---

### 2. Updated Build Pipeline

**File:** `package.json`

**Before:**
```json
"build:mitosis": "npm run build --workspace=source/redhorn-components && node scripts/copy-css-modules.js && node scripts/fix-react-native.js"
```

**After:**
```json
"build:mitosis": "npm run build --workspace=source/redhorn-components && node scripts/copy-css-modules.js && node scripts/remove-mitosis-pragma.js && node scripts/fix-react-native.js"
```

**Build Order:**
1. Mitosis generates all frameworks
2. Copy CSS modules to web frameworks
3. **Remove Mitosis pragmas** ← NEW STEP
4. Fix React Native with StyleSheet

---

## Verification

### ✅ Build Output
```bash
npm run build:mitosis
```

**Success:**
- Mitosis: generated 2 components per framework ✓
- CSS modules copied ✓
- **6 component pragmas removed** ✓
- React Native fixed with StyleSheet ✓

---

### ✅ Files Cleaned

**React components:**
- `packages/react/src/components/Button/Button.tsx` - Line 4 removed
- `packages/react/src/components/Input/Input.tsx` - Line 5 removed

**Angular components:**
- `packages/angular/src/components/Button/Button.ts` - Pragma removed
- `packages/angular/src/components/Input/Input.ts` - Pragma removed

**Vue components:**
- `packages/vue/src/components/Button/Button.vue` - Pragma removed
- `packages/vue/src/components/Input/Input.vue` - Pragma removed

**Verified:** No `@jsxImportSource` found in any generated files.

---

### ✅ Storybook Running

**Started successfully:**
```
Storybook 8.6.14 for react-vite started
230 ms for manager and 478 ms for preview

Local:            http://localhost:6012/
On your network:  http://192.168.50.11:6012/
```

**No errors:**
- ✓ No "Missing jsx-dev-runtime" errors
- ✓ No "Failed to fetch dynamically imported module" errors
- ✓ Components render correctly
- ✓ Props controls functional
- ✓ Multi-framework documentation visible

---

## How It Works

### Before (Broken)

```typescript
// packages/react/src/components/Button/Button.tsx
"use client";
import * as React from "react";

/** @jsxImportSource @builder.io/mitosis */  ❌ Wrong JSX runtime

export interface ButtonProps { ... }
```

**Problems:**
- Storybook tries to use Mitosis JSX runtime
- Mitosis not installed in Storybook
- TypeScript confused about JSX factory

---

### After (Fixed)

```typescript
// packages/react/src/components/Button/Button.tsx
"use client";
import * as React from "react";

                                              ✅ Uses React's JSX runtime

export interface ButtonProps { ... }
```

**Benefits:**
- Uses framework-native JSX runtime
- Storybook works out of the box
- TypeScript happy
- No extra dependencies

---

## Automated Workflow

Every time you run `npm run build:mitosis`:

1. **Mitosis generates** components with pragmas
2. **Script automatically removes** pragmas from output
3. **You get clean** framework-native components
4. **Storybook just works**

**No manual intervention required!**

---

## Why This Approach

### Best Practice: Post-Build Cleanup

**Pros:**
- ✅ Fully automated (runs on every build)
- ✅ Source files unchanged (still use Mitosis)
- ✅ Output is clean (framework-native)
- ✅ Scalable (handles new components automatically)
- ✅ Consistent with existing patterns (`fix-react-native.js`)

**Alternatives considered:**
- ❌ Configure Mitosis to not add pragma (no config option)
- ❌ Add Mitosis to Storybook (wrong runtime, unnecessary dependency)
- ❌ Manual removal (error-prone, doesn't scale)

---

## Files Modified

### New Files
- `scripts/remove-mitosis-pragma.js` - Pragma removal script

### Modified Files
- `package.json` - Updated `build:mitosis` script

### Auto-Cleaned Files (on every build)
- All generated React components (`.tsx`)
- All generated Angular components (`.ts`)
- All generated Vue components (`.vue`)

---

## Testing Checklist

- [x] Build runs without errors
- [x] Script removes pragmas from all frameworks
- [x] No `@jsxImportSource` in generated files
- [x] Storybook starts successfully
- [x] Components render in Storybook
- [x] Props controls work
- [x] No console errors
- [x] Multi-framework docs visible

---

## Current Status

**All 4 frameworks working:**
- ✅ React - Clean output, Storybook working
- ✅ Angular - Clean output, pragma removed
- ✅ Vue - Clean output, pragma removed
- ✅ React Native - StyleSheet (separate fix)

**Storybook:**
- ✅ Running on http://localhost:6012/
- ✅ Button component docs visible
- ✅ Input component docs visible
- ✅ All variants/sizes/states working
- ✅ Multi-framework installation guides

---

## Next Steps

### 1. View Storybook
```bash
# Already running at:
http://localhost:6012/
```

**Explore:**
- Button component with all variants
- Input component with all types
- Props controls
- Multi-framework usage examples

---

### 2. Add New Components

When you add a new component, the pragma will be automatically removed:

```bash
# 1. Create source component
npm run generate:component NewComponent

# 2. Edit the component
vim source/redhorn-components/src/components/NewComponent/NewComponent.lite.tsx

# 3. Build (pragma auto-removed)
npm run build:mitosis

# 4. Component ready in Storybook ✓
```

---

### 3. Test in Real Apps

Components are ready to use:

**React:**
```bash
npm install file:../design-system/packages/react
import { Button, Input } from '@redhorn/react';
```

**Angular:**
```bash
npm install file:../design-system/packages/angular
import { ButtonComponent, InputComponent } from '@redhorn/angular';
```

**Vue:**
```bash
npm install file:../design-system/packages/vue
import { Button, Input } from '@redhorn/vue';
```

**React Native:**
```bash
npm install file:../design-system/packages/react-native
import { Button, Input } from '@redhorn/react-native';
```

---

## Summary

**Problem:** Mitosis JSX pragmas breaking Storybook  
**Solution:** Automated post-build pragma removal  
**Result:** Clean framework-native components  
**Status:** ✅ Storybook working perfectly  

**Your design system now has:**
- ✅ 2 components (Button, Input)
- ✅ 4 frameworks (React, Angular, Vue, React Native)
- ✅ Working Storybook with multi-framework docs
- ✅ Fully automated build pipeline
- ✅ Clean, production-ready output

**Storybook is live at http://localhost:6012/** 🎉
