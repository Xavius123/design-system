# Folder Structure Update

## Date: February 8, 2026

## Summary

Reorganized the design system to clearly separate source components from published packages.

## Changes Made

### Before

```
packages/
├── _redhorn-components/    ← Source (with underscore prefix hack)
├── angular/                ← Generated
├── react/                  ← Generated
├── react-native/           ← Generated
├── tokens/                 ← Published
└── vue/                    ← Generated
```

### After

```
source/
└── redhorn-components/     ← Source (clearly separated)

packages/
├── angular/                ← Generated & published
├── react/                  ← Generated & published
├── react-native/           ← Generated & published
├── tokens/                 ← Published
└── vue/                    ← Generated & published
```

## Benefits

1. **Clear Separation**: Source and published packages are in separate top-level folders
2. **Self-Documenting**: The structure immediately shows source → packages relationship
3. **No Naming Hacks**: No need for underscore prefix to force alphabetical ordering
4. **Better Organization**: Clean grouping of related folders

## Files Updated

### Configuration Files
- ✅ `package.json` - Updated workspaces and build scripts
- ✅ `mitosis.config.js` - Updated source file paths
- ✅ `source/redhorn-components/mitosis.config.js` - Updated destination path
- ✅ `source/redhorn-components/package.json` - Already had correct package name
- ✅ `.github/workflows/publish.yml` - Updated trigger paths

### Documentation Files
- ✅ `README.md` - Updated architecture diagrams and instructions
- ✅ `docs/MITOSIS_GUIDELINES.md` - Updated all path references
- ✅ `docs/PROJECT_OVERVIEW.md` - Updated folder structure
- ✅ `docs/CURSOR_RULES.md` - Updated path references
- ✅ `source/redhorn-components/README.md` - Updated all examples

### Storybook Files
- ✅ `packages/react/stories/Button.mdx` - Updated Mitosis source path
- ✅ `packages/react/stories/Input.mdx` - Updated Mitosis source path

### Cursor Rules
- ✅ `.cursor/rules/mitosis-components.mdc` - Updated globs and paths
- ✅ `.cursor/rules/package-structure.mdc` - Updated folder structure
- ✅ `.cursor/rules/build-workflow.mdc` - Updated command examples

## Build Verification

```bash
npm run build:mitosis
```

**Result**: ✅ Success
- Generated 2 React components
- Generated 2 Angular components  
- Generated 2 Vue components
- Generated 2 React Native components

All files generated to correct location: `packages/*/src/components/`

## Migration Path for Developers

### For New Components

**Old way:**
```bash
mkdir packages/_redhorn-components/src/components/Badge
code packages/_redhorn-components/src/components/Badge/Badge.lite.tsx
```

**New way:**
```bash
mkdir source/redhorn-components/src/components/Badge
code source/redhorn-components/src/components/Badge/Badge.lite.tsx
```

### For CI/CD

GitHub Actions automatically triggers on changes to `source/redhorn-components/**`

### For Changesets

No changes needed - the source package remains private and excluded from publishing.

## Known Issues

The Storybook runtime error with `@builder.io/mitosis/jsx-dev-runtime` is a pre-existing issue with the Mitosis React generator and is unrelated to this folder reorganization. The build completes successfully and generates valid TypeScript files.

## Next Steps

1. Update any local developer environments with the new paths
2. Clear any IDE caches that might reference old paths
3. Inform team members of the new structure
4. Update any external documentation or wikis

## Rollback (if needed)

To rollback, reverse the process:

```bash
Move-Item source/redhorn-components packages/_redhorn-components
Remove-Item source -Recurse
# Then revert all config and documentation changes
```

However, since the build is verified working, rollback should not be necessary.
