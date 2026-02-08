# Complete the Build - Step-by-Step Commands

Copy and paste these commands once esbuild is resolved.

## Step 1: Resolve esbuild (Choose ONE option)

### Option A: Quick Fix (Try First)
```powershell
npm install esbuild@latest --save-dev
```

### Option B: Clean Install (If Option A Fails)
```powershell
# Remove problematic directories
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Fresh install
npm install
```

### Option C: Different Package Manager (If npm keeps failing)
```powershell
# Install yarn
npm install -g yarn

# Use yarn instead
yarn install
```

---

## Step 2: Install Mitosis Packages

```bash
npm install @builder.io/mitosis-cli@latest @builder.io/mitosis@latest --save-dev
```

**Expected output:** Should complete without errors

---

## Step 3: Build for All 3 Frameworks

```bash
npm run build:mitosis
```

**What this does:**
- Reads `packages/mitosis-components/src/**/*.lite.tsx`
- Generates React components in `packages/react-ui-generated/`
- Generates Angular components in `packages/angular-ui/`
- Generates React Native components in `packages/react-native-ui/`

**Expected output:**
```
Building components...
✓ Button.lite.tsx → react
✓ Button.lite.tsx → angular
✓ Button.lite.tsx → reactNative
✓ Input.lite.tsx → react
✓ Input.lite.tsx → angular
✓ Input.lite.tsx → reactNative
Build complete!
```

---

## Step 4: Verify Generated Output

### Check Folders Created
```bash
# List generated packages
Get-ChildItem packages -Directory

# Expected output:
# - core
# - mitosis-components
# - react-ui
# - tokens
# - react-ui-generated      ← NEW
# - angular-ui              ← NEW
# - react-native-ui         ← NEW
```

### Check Button Files
```bash
# React (web)
Get-ChildItem packages/react-ui-generated/Button

# Angular (web)
Get-ChildItem packages/angular-ui/button

# React Native (mobile)
Get-ChildItem packages/react-native-ui/Button
```

### Quick Look at Generated Code
```bash
# See React output
cat packages/react-ui-generated/Button/Button.tsx | Select-Object -First 30

# See Angular output
cat packages/angular-ui/button/button.component.ts | Select-Object -First 30

# See React Native output
cat packages/react-native-ui/Button/Button.tsx | Select-Object -First 30
```

---

## Step 5: Test Generated Components

### Test React (Web)

Create test file: `packages/react-ui-generated/test-components.tsx`

```tsx
import React from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';

export function TestComponents() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Generated React Components Test</h1>
      
      <h2>Button Variants</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
      </div>
      
      <h2>Button Sizes</h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      
      <h2>Input Component</h2>
      <Input 
        label="Email Address" 
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share your email"
      />
      
      <Input 
        label="Password" 
        type="password"
        required
        error
        errorMessage="Password is required"
      />
    </div>
  );
}
```

Run in Storybook:
```bash
npm run storybook
```

### Test Angular (Web)

Create test component: `test-angular-components.ts`

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '../packages/angular-ui/button/button.component';
import { InputComponent } from '../packages/angular-ui/input/input.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  template: `
    <div style="padding: 20px;">
      <h1>Generated Angular Components Test</h1>
      
      <h2>Button Variants</h2>
      <div style="display: flex; gap: 10px;">
        <app-button variant="primary">Primary</app-button>
        <app-button variant="secondary">Secondary</app-button>
        <app-button variant="ghost">Ghost</app-button>
        <app-button variant="outline">Outline</app-button>
      </div>
      
      <h2>Button Sizes</h2>
      <div style="display: flex; gap: 10px; align-items: center;">
        <app-button size="sm">Small</app-button>
        <app-button size="md">Medium</app-button>
        <app-button size="lg">Large</app-button>
      </div>
      
      <h2>Input Component</h2>
      <app-input 
        label="Email Address" 
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share your email">
      </app-input>
      
      <app-input 
        label="Password" 
        type="password"
        [required]="true"
        [error]="true"
        errorMessage="Password is required">
      </app-input>
    </div>
  `
})
export class TestComponent {}
```

### Test React Native (Mobile)

Create test: `test-mobile-components.tsx`

```tsx
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Button } from '../packages/react-native-ui/Button/Button';
import { Input } from '../packages/react-native-ui/Input/Input';

export function TestMobileComponents() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Generated React Native Components Test
        </Text>
        
        <Text style={{ fontSize: 18, marginTop: 20 }}>Button Variants</Text>
        <Button variant="primary" onClick={() => alert('Primary!')}>
          Primary
        </Button>
        <Button variant="secondary" onClick={() => alert('Secondary!')}>
          Secondary
        </Button>
        <Button variant="ghost" onClick={() => alert('Ghost!')}>
          Ghost
        </Button>
        
        <Text style={{ fontSize: 18, marginTop: 20 }}>Input Component</Text>
        <Input 
          label="Email Address" 
          placeholder="you@example.com"
          helperText="We'll never share your email"
        />
        
        <Input 
          label="Password" 
          type="password"
          required
          error
          errorMessage="Password is required"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
```

---

## Step 6: Publish Packages (Optional)

If you're ready to publish to npm:

```bash
# Build all packages
npm run build:all

# Publish React generated
cd packages/react-ui-generated
npm publish --access public

# Publish Angular
cd ../angular-ui
npm publish --access public

# Publish React Native
cd ../react-native-ui
npm publish --access public
```

Or for internal npm registry:
```bash
npm publish --registry=https://your-internal-registry.com
```

---

## Troubleshooting

### Build Fails with "Cannot find module '@builder.io/mitosis'"
**Solution:** Mitosis not installed
```bash
npm install @builder.io/mitosis-cli @builder.io/mitosis --save-dev
```

### No Output Generated
**Solution:** Check config targets
```bash
cat packages/mitosis-components/mitosis.config.js
# Should show: targets: ['react', 'angular', 'reactNative']
```

### React Native Output Looks Wrong
**Solution:** Check if proper conversions happened
```bash
# Should see Pressable, not button
grep -r "Pressable" packages/react-native-ui/

# Should see StyleSheet, not CSS
grep -r "StyleSheet" packages/react-native-ui/
```

### Permission Errors on Windows
**Solution:** Run PowerShell as Administrator
```powershell
Start-Process powershell -Verb runAs
```

---

## Next Component to Add

Once Button and Input work, add Checkbox next:

### 1. Create Checkbox.lite.tsx
```bash
New-Item -ItemType Directory packages/mitosis-components/src/components/Checkbox
New-Item packages/mitosis-components/src/components/Checkbox/Checkbox.lite.tsx
New-Item packages/mitosis-components/src/components/Checkbox/Checkbox.module.css
```

### 2. Copy from React version
```bash
# Copy React Checkbox as starting point
Copy-Item packages/react-ui/src/components/Checkbox/Checkbox.tsx `
          packages/mitosis-components/src/components/Checkbox/Checkbox.lite.tsx

# Copy CSS
Copy-Item packages/react-ui/src/components/Checkbox/Checkbox.module.css `
          packages/mitosis-components/src/components/Checkbox/
```

### 3. Adapt to Mitosis constraints
- Remove `useRef` (not supported)
- Remove complex `useEffect` (use `onMount` instead)
- Simplify event handlers
- Remove Radix UI imports

### 4. Build and test
```bash
npm run build:mitosis
```

---

## Success Checklist

After completing all steps:

- [ ] esbuild issue resolved
- [ ] Mitosis packages installed
- [ ] Build completed without errors
- [ ] `react-ui-generated/` folder created
- [ ] `angular-ui/` folder created
- [ ] `react-native-ui/` folder created
- [ ] Button generated for all 3 frameworks
- [ ] Input generated for all 3 frameworks
- [ ] React components render correctly
- [ ] Angular components render correctly
- [ ] React Native components render on mobile
- [ ] Ready to add more components

---

## Quick Reference Commands

```bash
# Build everything
npm run build:all

# Build just Mitosis
npm run build:mitosis

# Watch mode (auto-rebuild on changes)
cd packages/mitosis-components
npm run watch

# Check generated files
Get-ChildItem packages -Recurse -Include *.tsx, *.ts | Where-Object { $_.FullName -match 'react-ui-generated|angular-ui|react-native-ui' }

# Clean generated output (if you need to rebuild)
Remove-Item -Recurse packages/react-ui-generated, packages/angular-ui, packages/react-native-ui
npm run build:mitosis
```

---

## Support

If you encounter issues:
1. Check `READY_TO_BUILD.md` for detailed explanations
2. Review `docs/MITOSIS_GUIDELINES.md` for Mitosis patterns
3. Check Mitosis docs: https://mitosis.builder.io/
4. Create an issue in the repo

**The configuration is complete. You're just one build command away from having components in all 3 frameworks!** 🎉
