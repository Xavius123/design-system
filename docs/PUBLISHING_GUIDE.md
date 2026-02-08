# Publishing Guide

How to publish packages to npm and release new versions.

## Prerequisites

1. **NPM Account:** Create account at https://npmjs.com
2. **NPM Token:** Generate access token at https://www.npmjs.com/settings/tokens
3. **GitHub Secrets:** Add `NPM_TOKEN` to repository secrets

## Publishing Workflow

### Manual Publishing (First Release)

#### Step 1: Build Everything

```bash
# Build design tokens
npm run build:tokens

# Build Mitosis components (generates React, Angular, React Native)
npm run build:mitosis

# Verify output
ls packages/react/src/components/
ls packages/angular/src/components/
ls packages/react-native/src/components/
```

#### Step 2: Test Generated Components

```bash
# Run Storybook for visual verification
cd packages/react
npm run storybook
```

Visit http://localhost:6007 and verify:
- All components render
- All variants work
- All sizes work
- Interactions work

#### Step 3: Create Changeset

```bash
# From root directory
npx changeset
```

Answer prompts:
1. **Which packages?** Select all 4 (tokens, react, angular, react-native)
2. **Version bump?** Select 'minor' for new features, 'patch' for fixes
3. **Summary:** Describe changes (e.g., "Initial release with Button and Input")

This creates `.changeset/[random-name].md`

#### Step 4: Version Packages

```bash
npm run version
```

This:
- Updates all package.json versions
- Creates/updates CHANGELOG.md files
- Consumes the changeset

#### Step 5: Publish to NPM

**First time setup:**
```bash
npm login
```

**Publish all packages:**
```bash
# Dry run first (safe)
npm publish --workspace=packages/tokens --dry-run
npm publish --workspace=packages/react --dry-run
npm publish --workspace=packages/angular --dry-run
npm publish --workspace=packages/react-native --dry-run

# Actually publish
npm run publish:all
```

#### Step 6: Verify on NPM

Check packages published:
- https://www.npmjs.com/package/@redhorn/design-tokens
- https://www.npmjs.com/package/@redhorn/react
- https://www.npmjs.com/package/@redhorn/angular
- https://www.npmjs.com/package/@redhorn/react-native

### Automated Publishing (After Setup)

Once GitHub Actions are configured:

#### Step 1: Edit Source Component

```bash
# Edit Mitosis component
code packages/mitosis-components/src/components/Button/Button.lite.tsx

# Or add new component
mkdir packages/mitosis-components/src/components/Badge
code packages/mitosis-components/src/components/Badge/Badge.lite.tsx
```

#### Step 2: Create Changeset

```bash
npx changeset
```

#### Step 3: Commit and Push

```bash
git add .
git commit -m "feat: add new component"
git push origin main
```

#### Step 4: GitHub Actions Run Automatically

- Builds tokens
- Builds Mitosis components
- Runs tests
- Creates release PR (if changeset exists)
- Publishes to npm (when PR merged)

## Version Strategy

### Synchronized Versions

All packages use same version number:

```json
{
  "@redhorn/design-tokens": "1.2.0",
  "@redhorn/react": "1.2.0",
  "@redhorn/angular": "1.2.0",
  "@redhorn/react-native": "1.2.0"
}
```

### Semantic Versioning

- **Patch (1.0.1):** Bug fixes only
  - Fix Button disabled state
  - Fix Input validation
  - No API changes

- **Minor (1.1.0):** New features, backward compatible
  - Add new component (Checkbox)
  - Add new prop (optional)
  - Deprecate old prop (still works)

- **Major (2.0.0):** Breaking changes
  - Remove component
  - Remove prop
  - Rename prop
  - Change behavior

## Release Checklist

Before publishing:

- [ ] Mitosis build successful (`npm run build:mitosis`)
- [ ] All tests pass
- [ ] Storybook builds successfully
- [ ] Visual review in Storybook
- [ ] Changeset created
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Breaking changes documented (if major)
- [ ] Migration guide written (if major)

## Rollback

If a release has issues:

### Option 1: Deprecate Version

```bash
npm deprecate @redhorn/react@1.2.0 "Please use 1.1.0 - 1.2.0 has critical bug"
```

### Option 2: Publish Patch

```bash
# Fix the bug
# Create patch changeset
npx changeset
# Select "patch"
# Publish
npm run publish:all
```

### Option 3: Unpublish (Within 72 hours)

```bash
npm unpublish @redhorn/react@1.2.0
```

⚠️ Use sparingly - breaks anyone who installed

## Communication

### After Each Release

1. **Post in Slack:**
   ```
   📦 New Release: v1.2.0
   
   ✨ What's New:
   - Added Checkbox component
   - Fixed Button disabled styling
   
   📚 Docs: https://design-system.redhorn.com
   🎨 Preview: https://chromatic.com/...
   
   To update:
   npm install @redhorn/react@1.2.0
   ```

2. **Update GitHub Release:**
   - Create release from tag
   - Copy changelog
   - Attach any migration guides

3. **Email App Teams:**
   - Include changelog
   - Highlight breaking changes
   - Provide migration guide

## NPM Organization Setup

### Create NPM Organization

1. Go to https://www.npmjs.com/org/create
2. Create organization (e.g., `redhorn`)
3. Add team members

### Package Access

```bash
# Make packages public
npm access public @redhorn/react
npm access public @redhorn/angular
npm access public @redhorn/react-native
npm access public @redhorn/design-tokens

# Add team members
npm owner add <username> @redhorn/react
```

## Monitoring

### Download Stats

Check package downloads:
- https://npm-stat.com/charts.html?package=@redhorn/react
- https://npmjs.com/package/@redhorn/react

### Bundle Size

Monitor bundle size with Bundlephobia:
- https://bundlephobia.com/package/@redhorn/react

Set alerts if bundle grows >50KB

## Troubleshooting

### "402 Payment Required"

**Issue:** Trying to publish scoped package to free npm

**Solution:** Use `--access public` flag or set in package.json

### "403 Forbidden"

**Issue:** No permission to publish

**Solution:**
```bash
npm login
npm owner add <your-username> @redhorn/react
```

### "Version Already Published"

**Issue:** Version 1.2.0 already exists

**Solution:** Bump version again:
```bash
npm run version
```

### Changeset Not Creating PR

**Issue:** GitHub Action doesn't create release PR

**Solution:**
1. Check `GITHUB_TOKEN` has permissions
2. Verify changeset file exists in `.changeset/`
3. Check GitHub Actions logs

## Security

### NPM Tokens

- **Never** commit tokens to git
- Store in GitHub Secrets only
- Use automation tokens (not user tokens)
- Rotate tokens annually

### Package Provenance

Enable provenance for supply chain security:

```bash
npm publish --provenance
```

This links the published package to the GitHub commit.

## Support

For publishing issues:
- Check #design-system Slack channel
- Contact @design-system-team
- Review https://docs.npmjs.com/
