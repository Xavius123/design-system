# Mitosis Setup Instructions

## Installation

Due to dependency version conflicts in the current environment, Mitosis packages need to be installed manually:

### 1. Install Mitosis Dependencies

```bash
cd packages/mitosis-components
npm install @builder.io/mitosis@^0.5.0 @builder.io/mitosis-cli@^0.5.0 --save-dev
```

Or add to root devDependencies:

```bash
npm install -D @builder.io/mitosis-cli @builder.io/mitosis
```

### 2. Verify Installation

```bash
# Check that mitosis CLI is available
npx mitosis --version
```

### 3. Build Components

```bash
# From root directory
npm run build:mitosis

# Or from mitosis-components directory
cd packages/mitosis-components
npm run build
```

### 4. Verify Generated Output

After building, check that framework-specific packages were generated:

```bash
ls packages/react-ui-generated/
ls packages/angular-ui/
ls packages/vue-ui/
```

## Current Status

**Completed:**
- ✅ Mitosis package structure created
- ✅ Configuration files set up (mitosis.config.js)
- ✅ Button component migrated to Mitosis
- ✅ Input component migrated to Mitosis
- ✅ CSS Modules copied and configured
- ✅ Build scripts added to package.json
- ✅ Documentation created (MITOSIS_GUIDELINES.md)
- ✅ Agent skill created for future migrations

**Pending:**
- ⏳ Install Mitosis npm packages (blocked by esbuild version conflict)
- ⏳ Run first build to generate React/Angular/Vue outputs
- ⏳ Test generated components

## Troubleshooting

### esbuild Version Conflict

If you encounter esbuild version errors:

```
Error: Expected "0.25.12" but got "0.27.3"
```

**Solution 1: Update esbuild**
```bash
npm install esbuild@latest --save-dev
```

**Solution 2: Clear and Reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 3: Manual Binary Installation**
```bash
npm install @esbuild/win32-x64@latest --save-dev
```

### Mitosis Build Fails

If `npm run build:mitosis` fails:

1. Verify Mitosis packages are installed:
   ```bash
   npm list @builder.io/mitosis
   ```

2. Check configuration:
   ```bash
   cat packages/mitosis-components/mitosis.config.js
   ```

3. Try building directly:
   ```bash
   cd packages/mitosis-components
   npx mitosis build
   ```

## Next Steps

Once Mitosis packages are installed:

1. Run `npm run build:mitosis` to generate framework outputs
2. Create test apps for React, Angular, and Vue
3. Import and test generated components
4. Add more components following the established pattern
5. Document any framework-specific quirks or limitations

## Resources

- [Mitosis Documentation](https://mitosis.builder.io/)
- [Design System Guidelines](../../docs/MITOSIS_GUIDELINES.md)
- [Component Examples](./src/components/)
