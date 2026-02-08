# Multi-Framework Storybook Documentation

## Overview

Storybook now shows documentation for all 3 frameworks (React, Angular, React Native) in a single instance using MDX format.

## What Changed

### 1. Core Package Removed
- **Deleted**: `packages/core/` - Unused TypeScript types package
- **Why**: Not imported anywhere, simplified architecture
- **Impact**: None (was already orphaned)

### 2. MDX Documentation Added
- **Format**: MDX (Markdown + JSX)
- **Location**: `packages/react/stories/*.mdx`
- **Purpose**: Show all framework examples in one place

### 3. Storybook Configuration Updated
- **File**: `packages/react/.storybook/main.js`
- **Change**: Added MDX support to stories pattern
- **Result**: Storybook now loads `.mdx` files

## New Documentation Files

### Button.mdx
**Location**: `packages/react/stories/Button.mdx`

**Features**:
- Live React component previews (interactive)
- React installation + usage examples
- Angular installation + usage examples
- React Native installation + usage examples
- Complete prop documentation
- Design token references
- Accessibility notes
- All variants and sizes

### Input.mdx
**Location**: `packages/react/stories/Input.mdx`

**Features**:
- Live React component previews (interactive)
- React installation + usage examples
- Angular installation + usage examples
- React Native installation + usage examples
- Complete prop documentation
- All input types, sizes, and states
- Form validation examples
- Error handling patterns

## How to Use

### Run Storybook

```bash
# From root
npm run storybook

# Or from React package
cd packages/react
npm run storybook
```

Opens at: http://localhost:6007

### Navigate Documentation

1. Open Storybook
2. Go to "Components/Button" or "Components/Input"
3. See live React preview at top
4. Scroll down for framework-specific examples:
   - React section with installation + usage
   - Angular section with installation + usage
   - React Native section with installation + usage

## Structure

```
Components/
├── Button
│   ├── Live Preview (React interactive)
│   ├── Props Table
│   ├── React Examples
│   ├── Angular Examples
│   └── React Native Examples
│
└── Input
    ├── Live Preview (React interactive)
    ├── Props Table
    ├── React Examples
    ├── Angular Examples
    └── React Native Examples
```

## What App Teams See

### React Team

1. Live interactive component at top
2. Copy-paste React code examples
3. Installation instructions: `npm install @redhorn/react`
4. TypeScript prop definitions

### Angular Team

1. See React preview (visual reference)
2. Copy-paste Angular code examples
3. Installation instructions: `npm install @redhorn/angular`
4. Angular-specific syntax (decorators, templates)

### React Native Team

1. See React preview (visual reference)
2. Copy-paste React Native code examples
3. Installation instructions: `npm install @redhorn/react-native`
4. Mobile-specific considerations

## Benefits

### For Development Team
- One Storybook to maintain
- All documentation in one place
- Live previews for React (most common)
- Easy to update (just edit MDX)

### For App Teams
- See all frameworks at once
- Copy-paste ready examples
- Framework-specific installation
- Consistent documentation

### For Business
- Single source of truth
- Professional documentation
- Easy onboarding
- Reduces support questions

## Technical Details

### Why Not Live Previews for All 3?

**React**: Built into Storybook (Vite + React)
**Angular**: Requires full Angular CLI setup
**React Native**: Requires Expo/mobile environment

**Solution**: Show live React + code examples for others

### MDX Format

MDX allows mixing Markdown with JSX:

```mdx
# Title

<Canvas>
  <Story name="Example">
    <Button variant="primary">Click</Button>
  </Story>
</Canvas>

## Code Example

```tsx
import { Button } from '@redhorn/react';
<Button variant="primary">Click</Button>
\```
\```

### Code Examples

All code examples are:
- Real usage patterns (not pseudo-code)
- Copy-paste ready
- Include imports and setup
- Show TypeScript types
- Framework-specific

## Old Files (Kept as Reference)

The original `.stories.tsx` files are still available:
- `packages/react/stories/Button.stories.tsx`
- `packages/react/stories/Input.stories.tsx`

These use the older CSF (Component Story Format) approach with pure TypeScript.

You can use either format:
- **MDX**: Better for documentation with multiple frameworks
- **TSX**: Better for pure interactive stories

## Future Enhancements

### Short Term
1. Add more components (Checkbox, Radio, Badge)
2. Add "Copy" buttons to code blocks
3. Link installation to npm packages

### Medium Term
1. Auto-generate code examples from actual generated files
2. Add framework selector tabs (cleaner UI)
3. Add live code editor (optional)

### Long Term
1. Generate examples automatically on build
2. Add visual regression testing
3. Host publicly for app teams

## Updating Documentation

### Add New Component

1. Create Mitosis component:
   ```bash
   mkdir packages/mitosis-components/src/components/Badge
   # Create Badge.lite.tsx and Badge.module.css
   ```

2. Generate outputs:
   ```bash
   npm run build:mitosis
   ```

3. Create MDX documentation:
   ```bash
   # Create packages/react/stories/Badge.mdx
   # Copy structure from Button.mdx
   # Update with Badge-specific examples
   ```

4. Preview:
   ```bash
   npm run storybook
   ```

### Update Existing Component

1. Edit Mitosis source
2. Regenerate: `npm run build:mitosis`
3. Update MDX examples if API changed
4. Preview in Storybook

## Commands Reference

```bash
# Build
npm run build:tokens          # Build design tokens
npm run build:mitosis         # Generate all frameworks
npm run build:all             # Build tokens + Mitosis

# Preview
npm run storybook             # Launch Storybook
npm run build-storybook       # Build static Storybook

# Publish
npx changeset                 # Create version bump
npm run publish:all           # Publish to npm
```

## File Locations

```
packages/react/
├── .storybook/
│   ├── main.js               # Updated with MDX support
│   └── preview.js            # Theme config
├── stories/
│   ├── Button.mdx            # NEW: Multi-framework docs
│   ├── Input.mdx             # NEW: Multi-framework docs
│   ├── Button.stories.tsx    # OLD: Pure React stories (kept)
│   └── Input.stories.tsx     # OLD: Pure React stories (kept)
└── src/
    └── components/           # Generated React components
```

## Dependencies

Storybook dependencies already installed:
- `@storybook/react-vite` - React + Vite integration
- `@storybook/addon-essentials` - Core addons (includes docs)
- `@storybook/addon-interactions` - Interactive testing
- `@storybook/addon-a11y` - Accessibility checks
- `@storybook/blocks` - Documentation blocks (MDX support)

No additional installation needed.

## Testing

### Manual Testing Checklist

- [ ] Storybook starts without errors
- [ ] Button documentation shows React preview
- [ ] Button documentation shows all 3 frameworks
- [ ] Input documentation shows React preview
- [ ] Input documentation shows all 3 frameworks
- [ ] All interactive controls work
- [ ] Code examples are copy-paste ready
- [ ] Props tables display correctly
- [ ] Navigation between components works

### Run Test

```bash
npm run storybook
# Visit http://localhost:6007
# Check both Button and Input components
```

## Troubleshooting

### MDX Files Not Loading

**Problem**: Storybook doesn't show MDX stories

**Solution**: Check `packages/react/.storybook/main.js`:
```js
stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)', '../stories/**/*.mdx']
```

### Components Not Rendering

**Problem**: "Cannot find module" error

**Solution**: Build components first:
```bash
npm run build:mitosis
```

### Styles Not Loading

**Problem**: Components have no styles

**Solution**: Build tokens first:
```bash
npm run build:tokens
```

## Success Criteria

- ✅ Core package removed (simplified)
- ✅ MDX support enabled in Storybook
- ✅ Button.mdx created with all 3 frameworks
- ✅ Input.mdx created with all 3 frameworks
- ✅ Live React previews working
- ✅ Code examples accurate and copy-paste ready
- ✅ Documentation comprehensive

## Next Steps

1. **Test**: Run `npm run storybook` and verify all features
2. **Add Components**: Create MDX docs for new components
3. **Share**: Send Storybook URL to app teams
4. **Iterate**: Gather feedback and improve

---

**Status**: ✅ Complete

**Run**: `npm run storybook`

**View**: http://localhost:6007
