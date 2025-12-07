# Advanced Improvements Guide

Comprehensive guide to recommended improvements for the Redhorn Design System monorepo. Read this to understand what each improvement does, why it's beneficial, and how to implement it when ready.

---

## Table of Contents

1. [TypeScript Project References](#typescript-project-references)
2. [Pre-commit Hooks (Husky + lint-staged)](#pre-commit-hooks)
3. [Changeset Management](#changeset-management)
4. [Package Publishing Configuration](#package-publishing-configuration)
5. [Bundle Size Limits](#bundle-size-limits)
6. [Component Generator](#component-generator)
7. [Automated Dependency Updates](#automated-dependency-updates)
8. [Monorepo Tooling Upgrade](#monorepo-tooling-upgrade)
9. [Design Token Versioning](#design-token-versioning)
10. [Migration Guides](#migration-guides)

---

## TypeScript Project References

### What It Is
TypeScript project references allow you to structure large TypeScript projects as multiple smaller projects that reference each other. Think of it as telling TypeScript "this package depends on that package."

### Benefits
- ✅ **Faster builds** - TypeScript only rebuilds changed packages
- ✅ **Better IDE performance** - Smaller compilation units
- ✅ **Parallel builds** - Independent packages build simultaneously
- ✅ **Build-time enforcement** - Prevents circular dependencies

### Current State
```
packages/
├── core/          (TypeScript, no references)
├── react-ui/      (JavaScript with tsconfig)
├── react-native-ui/ (JavaScript)
└── tokens/        (JSON, no TypeScript)
```

### With Project References
```
tsconfig.base.json (root config)
  ↓
packages/core/tsconfig.json (no dependencies)
  ↓
packages/react-ui/tsconfig.json (references core)
```

### How It Works

**1. Root Config** (`tsconfig.base.json`):
```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

**2. Core Package** (`packages/core/tsconfig.json`):
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

**3. React UI Package** (`packages/react-ui/tsconfig.json`):
```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    { "path": "../core" }
  ],
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  }
}
```

**4. Build Command**:
```bash
# Builds in correct order automatically
tsc --build packages/react-ui
```

### Implementation Steps
1. Add `composite: true` to all tsconfig files
2. Add `references` array pointing to dependencies
3. Update build scripts to use `tsc --build`
4. Verify builds complete successfully

### Effort: Medium | Impact: High

---

## Pre-commit Hooks

### What It Is
Automated checks that run before every `git commit`. If checks fail, the commit is blocked until you fix the issues.

### Benefits
- ✅ **Prevent bad commits** - Catch issues before they enter git history
- ✅ **Consistent code quality** - Everyone's code is formatted/linted
- ✅ **Faster CI** - Fewer failed builds
- ✅ **Save time** - Auto-fix issues locally instead of in PR reviews

### What Gets Checked
1. **Linting** - ESLint catches code quality issues
2. **Formatting** - Prettier auto-formats code
3. **Type checking** - TypeScript validates types
4. **Tests** - Unit tests for changed files (optional)

### Tools Used

#### Husky
Manages git hooks (like pre-commit, pre-push).

#### lint-staged
Runs commands only on staged files (faster than checking entire codebase).

### How It Works

**Before commit:**
```bash
git add src/components/Button.tsx
git commit -m "Update button"
```

**Husky intercepts:**
```bash
🔍 Running pre-commit hooks...
✓ ESLint - no errors
✓ Prettier - formatted 1 file
✓ TypeScript - no type errors
✅ Commit allowed
```

**If there's an issue:**
```bash
🔍 Running pre-commit hooks...
✗ ESLint - 2 errors found in Button.tsx
  - Missing prop validation
  - Unused variable 'color'

❌ Commit blocked. Fix errors and try again.
```

### Configuration

**package.json**:
```json
{
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0"
  },
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,json,md}": [
      "prettier --write"
    ]
  }
}
```

**.husky/pre-commit**:
```bash
#!/bin/sh
npx lint-staged
```

### Implementation Steps
1. Install: `npm install --save-dev husky lint-staged`
2. Initialize: `npx husky install`
3. Add hook: `npx husky add .husky/pre-commit "npx lint-staged"`
4. Configure `lint-staged` in package.json
5. Test: Make a change and commit

### Customization Options

**Only check changed packages:**
```json
"lint-staged": {
  "packages/react-ui/**/*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

**Run tests:**
```json
"lint-staged": {
  "*.{ts,tsx}": [
    "eslint --fix",
    "jest --bail --findRelatedTests"
  ]
}
```

**Skip hooks** (emergency only):
```bash
git commit --no-verify -m "Emergency fix"
```

### Effort: Low | Impact: High

---

## Changeset Management

### What It Is
A tool (@changesets/cli) that helps manage versions and changelogs in monorepos. It prompts you to describe changes, then automatically updates versions and generates changelogs when you're ready to publish.

### The Problem It Solves

**Without Changesets:**
```bash
# Manual process:
1. Manually update package.json versions
2. Manually write CHANGELOG.md entries  
3. Manually keep versions in sync across packages
4. Manually create git tags
5. Manually publish to npm
```

**Conflicts arise:**
- Developer A bumps `@toyota/core` to 1.1.0
- Developer B bumps it to 1.2.0
- Git conflict!

### How Changesets Work

**1. Developer makes changes:**
```bash
# Make your changes
git add .

# Create changeset
npx changeset

? Which packages would you like to include? 
  ◉ @toyota/core
  ◉ @toyota/react-ui
  ◯ @toyota/design-tokens

? What type of change is this for @toyota/core? 
  ❯ patch (1.0.0 → 1.0.1)
    minor (1.0.0 → 1.1.0)
    major (1.0.0 → 2.0.0)

? Summary: Added new ButtonVariant.Danger enum

✔ Created changeset file: .changeset/happy-lions-jump.md
```

**2. Changeset file created:**
```markdown
---
'@toyota/core': minor
'@toyota/react-ui': patch
---

Added new ButtonVariant.Danger enum. This is a minor change in core (new feature) but patch in react-ui (just consuming the new enum).
```

**3. Commit changeset with code:**
```bash
git add .
git commit -m "Add danger button variant"
git push
```

**4. When ready to release:**
```bash
# Preview version bumps and changelog
npx changeset version

# This updates:
# - package.json versions
# - CHANGELOG.md files
# - Consumes all .changeset/*.md files

# Review changes, then publish
git add .
git commit -m "Version packages"
npx changeset publish
npm publish
```

### Benefits
- ✅ **No version conflicts** - Each PR includes its own changeset
- ✅ **Automated changelogs** - Generated from changeset descriptions
- ✅ **Semantic versioning** - Enforces proper semver
- ✅ **Monorepo-aware** - Handles dependent package bumps automatically
- ✅ **CI integration** - Can auto-publish from GitHub Actions

### Workflow

#### Developer Workflow
```bash
# 1. Create feature branch
git checkout -b feature/danger-button

# 2. Make changes
# ... edit files ...

# 3. Create changeset
npx changeset
# Follow prompts

# 4. Commit everything
git add .
git commit -m "Add danger button"
git push

# 5. Create PR
# Changeset file is included in PR
```

#### Release Workflow
```bash
# Option A: Manual release
npx changeset version   # Bump versions
git add .
git commit -m "Version packages"
npx changeset publish   # Publish to npm
git push --follow-tags

# Option B: Automated via GitHub Actions
# Just merge PR with changeset
# GitHub Action handles version + publish
```

### Configuration

**.changeset/config.json**:
```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [
    ["@redhorn/core", "@redhorn/react-ui", "@redhorn/react-native-ui"]
  ],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch"
}
```

**`linked` explained:**
- Packages in same array always get same version
- Good for packages that should stay in sync

**package.json**:
```json
{
  "scripts": {
    "changeset": "changeset",
    "version-packages": "changeset version",
    "publish-packages": "changeset publish"
  }
}
```

### GitHub Actions Integration

**.github/workflows/release.yml**:
```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - name: Create Release PR or Publish
        uses: changesets/action@v1
        with:
          publish: npm run publish-packages
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Implementation Steps
1. Install: `npm install --save-dev @changesets/cli`
2. Initialize: `npx changeset init`
3. Configure `.changeset/config.json`
4. Add scripts to package.json
5. Create first changeset: `npx changeset`
6. Document workflow in CONTRIBUTING.md

### Effort: Low | Impact: Very High

---

## Package Publishing Configuration

### What It Is
Settings in `package.json` that control how packages are published to npm.

### The Problem
Without proper configuration:
- ❌ Packages might publish as private
- ❌ Wrong files included in package
- ❌ Missing exports
- ❌ Incorrect registry

### Key Fields

#### publishConfig
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

**`access: "public"`** - Required for scoped packages (@toyota/*) to be public.  
**`registry`** - Where to publish (npm registry).

#### files
```json
{
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

**Whitelist of files to include.** Everything else is excluded.

#### exports
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css"
  }
}
```

**Modern way to define package entry points.**

### Complete Example

**packages/react-ui/package.json**:
```json
{
  "name": "@toyota/react-ui",
  "version": "1.2.3",
  "description": "Toyota React UI components",
  "license": "ISC",
  
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css",
    "./package.json": "./package.json"
  },
  
  "files": [
    "dist",
    "README.md"
  ],
  
  "sideEffects": [
    "**/*.css"
  ],
  
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  
  "repository": {
    "type": "git",
    "url": "https://github.com/toyota/design-system.git",
    "directory": "packages/react-ui"
  }
}
```

### Pre-publish Checklist

**Test locally before publishing:**
```bash
# 1. Build package
npm run build

# 2. Check what will be published
npm pack --dry-run

# 3. Test package locally
npm pack
cd /tmp/test-project
npm install /path/to/toyota-react-ui-1.2.3.tgz

# 4. Publish (if all good)
npm publish
```

### Publishing Workflow

**Option 1: Manual**
```bash
npm version patch  # or minor, major
npm publish
git push --follow-tags
```

**Option 2: With Changesets**
```bash
npx changeset publish
# Publishes all packages with version bumps
```

**Option 3: CI/CD (Recommended)**
- Changesets GitHub Action publishes automatically
- Triggered when PR merged to main

### Effort: Very Low | Impact: Medium

---

## Bundle Size Limits

### What It Is
Automated checks that fail the build if your JavaScript bundle exceeds a size limit. Prevents shipping bloated code to users.

### Why It Matters

**Without limits:**
```
PR #42: Added icon library
Bundle: 50 KB → 250 KB (+200 KB!)
❓ No one notices until production
```

**With limits:**
```
PR #42: Added icon library
Bundle: 50 KB → 250 KB
❌ CI fails: "Bundle size exceeds limit (100 KB)"
✅ Developer optimizes before merging
```

### Tools

#### size-limit
Lightweight, focused on performance.

#### bundlewatch
CI-focused, stores sizes in history.

### How It Works

**1. Define limits** (`.size-limit.json`):
```json
[
  {
    "name": "Core Package",
    "path": "packages/core/dist/index.js",
    "limit": "10 KB"
  },
  {
    "name": "React UI (ESM)",
    "path": "packages/react-ui/dist/index.esm.js",
    "limit": "50 KB",
    "gzip": true
  },
  {
    "name": "React UI (CJS)",
    "path": "packages/react-ui/dist/index.cjs.js",
    "limit": "52 KB",
    "gzip": true
  }
]
```

**2. Check in CI:**
```yaml
# .github/workflows/ci.yml
- name: Check bundle size
  run: npm run size
```

**3. If exceeded:**
```bash
❌ FAILED

  Package size limit exceeded:

  react-ui/dist/index.esm.js
    Size:  65.2 KB (gzip)
    Limit: 50 KB
    Over:  +15.2 KB (+30%)

  Fix: Reduce bundle size or update limit
```

### Configuration

**package.json**:
```json
{
  "scripts": {
    "size": "size-limit",
    "size:why": "size-limit --why"
  },
  "devDependencies": {
    "size-limit": "^11.0.0",
    "@size-limit/preset-small-lib": "^11.0.0"
  }
}
```

**.size-limit.json**:
```json
[
  {
    "name": "Core",
    "path": "packages/core/dist/index.js",
    "limit": "10 KB"
  },
  {
    "name": "React UI",
    "path": "packages/react-ui/dist/index.esm.js",
    "limit": "50 KB",
    "gzip": true,
    "running": false,
    "webpack": false
  }
]
```

### Advanced: Time Limits

**Check both size AND load time:**
```json
{
  "name": "React UI",
  "path": "packages/react-ui/dist/index.esm.js",
  "limit": "50 KB",
  "gzip": true,
  "running": true,  // Also check JS execution time
  "maxInitialSizeLimit": "50 KB",
  "maxLoadTimeLimit": "500ms"
}
```

### Debugging Large Bundles

```bash
# Why is my bundle large?
npm run size:why

# Opens webpack bundle analyzer
# Shows: What's taking up space?
```

### Setting Realistic Limits

**1. Check current size:**
```bash
npm run build
npm run size -- --json
```

**2. Add ~10% buffer:**
```
Current: 42 KB
Limit: 46 KB (42 + 10%)
```

**3. Update over time:**
- As you optimize, lower the limit
- Never raise without justification

### Implementation Steps
1. Install: `npm install --save-dev size-limit @size-limit/preset-small-lib`
2. Create `.size-limit.json` with current sizes
3. Add `size` script to package.json
4. Add size check to CI
5. Document in CONTRIBUTING.md

### Effort: Low | Impact: High

---

## Component Generator

### What It Is
A CLI tool to automatically scaffold new components with all necessary files.

### The Problem

**Manual component creation:**
```bash
# Create 6+ files manually
touch Button.tsx
touch Button.module.css
touch Button.stories.tsx
touch Button.test.tsx
touch index.ts
# Copy boilerplate
# Update imports
# Register in components/index.ts
# ⏱️ Takes 10-15 minutes
```

**With generator:**
```bash
npm run generate:component Button
# ✅ All files created in 5 seconds
```

### What It Creates

```bash
npm run generate:component Button

✨ Creating component: Button

📁 packages/react-ui/src/components/Button/
  ✓ Button.tsx
  ✓ Button.module.css
  ✓ Button.stories.tsx
  ✓ Button.test.tsx
  ✓ index.ts

📁 packages/core/src/metadata/
  ✓ Button.meta.ts

📝 Updated:
  ✓ packages/react-ui/src/components/index.js
  ✓ packages/core/src/metadata/index.ts

✅ Component created! Start developing:
   cd packages/react-ui
   npm run storybook
```

### File Templates

**Button.tsx**:
```typescript
import React from 'react';
import { ComponentSize } from '@toyota/core';
import type { BaseComponentProps, WithChildren } from '@toyota/core';
import styles from './Button.module.css';

export interface ButtonProps extends BaseComponentProps, WithChildren {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = ComponentSize.Medium,
  children,
  ...props
}) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
```

**Button.module.css**:
```css
.button {
  /* Base styles */
}

.primary {
  /* Primary variant */
}

.secondary {
  /* Secondary variant */
}
```

**Button.stories.tsx**:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    designTokens: {
      colors: [],
      spacing: [],
      typography: [],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

### Tools

#### plop.js
Template-based file generator.

#### hygen
Alternative with different syntax.

### Implementation

**1. Install**:
```bash
npm install --save-dev plop
```

**2. Create config** (`plopfile.js`):
```javascript
export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
      },
      {
        type: 'list',
        name: 'category',
        message: 'Component category:',
        choices: ['form', 'layout', 'feedback', 'navigation', 'data-display'],
      },
    ],
    actions: [
      // Component file
      {
        type: 'add',
        path: 'packages/react-ui/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
      // CSS Module
      {
        type: 'add',
        path: 'packages/react-ui/src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: 'templates/Component.module.css.hbs',
      },
      // Story
      {
        type: 'add',
        path: 'packages/react-ui/src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'templates/Component.stories.tsx.hbs',
      },
      // Test
      {
        type: 'add',
        path: 'packages/react-ui/src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'templates/Component.test.tsx.hbs',
      },
      // Index
      {
        type: 'add',
        path: 'packages/react-ui/src/components/{{pascalCase name}}/index.ts',
        template: "export { default } from './{{pascalCase name}}';\n",
      },
      // Metadata
      {
        type: 'add',
        path: 'packages/core/src/metadata/{{pascalCase name}}.meta.ts',
        templateFile: 'templates/Metadata.meta.ts.hbs',
      },
      // Update exports
      {
        type: 'append',
        path: 'packages/react-ui/src/components/index.js',
        template: "export { default as {{pascalCase name}} } from './{{pascalCase name}}';\n",
      },
    ],
  });
}
```

**3. Add templates** (`templates/`):
Store .hbs (Handlebars) template files.

**4. Add script**:
```json
{
  "scripts": {
    "generate": "plop",
    "generate:component": "plop component"
  }
}
```

**5. Use it**:
```bash
npm run generate:component
# or
npm run generate:component Button
```

### Benefits
- ✅ **Consistency** - All components follow same structure
- ✅ **Speed** - Create components in seconds
- ✅ **Best practices** - Templates include patterns by default
- ✅ **Less errors** - No typos in boilerplate
- ✅ **Onboarding** - New devs productive immediately

### Effort: Medium | Impact: Medium

---

## Automated Dependency Updates

### What It Is
Automated pull requests that update dependencies when new versions are available.

### Tools

#### Dependabot (GitHub)
- Built into GitHub
- Free
- Basic features

#### Renovate Bot
- More powerful
- Better configuration
- Supports monorepos well

### How It Works

**1. Dependabot scans dependencies daily**

**2. Finds updates:**
```
@radix-ui/react-checkbox: 1.3.3 → 1.4.0 (minor)
typescript: 5.3.0 → 5.3.3 (patch)
```

**3. Creates PRs automatically:**
```
PR #123: Bump @radix-ui/react-checkbox from 1.3.3 to 1.4.0

📦 Dependencies
- @radix-ui/react-checkbox: 1.3.3 → 1.4.0

📝 Release notes
- Added new accessibility features
- Fixed focus management bug

✅ CI checks passed
```

**4. You review and merge (or auto-merge if tests pass)**

### Configuration

#### Dependabot

**.github/dependabot.yml**:
```yaml
version: 2
updates:
  # Root package.json
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    groups:
      storybook:
        patterns:
          - "@storybook/*"
      radix-ui:
        patterns:
          - "@radix-ui/*"
    
  # React UI package
  - package-ecosystem: "npm"
    directory: "/packages/react-ui"
    schedule:
      interval: "weekly"
    
  # Core package
  - package-ecosystem: "npm"
    directory: "/packages/core"
    schedule:
      interval: "weekly"
    
  # Tokens package
  - package-ecosystem: "npm"
    directory: "/packages/tokens"
    schedule:
      interval: "weekly"
    
  # React Native package
  - package-ecosystem: "npm"
    directory: "/packages/react-native-ui"
    schedule:
      interval: "weekly"
    
  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

**`groups` explained:**
Groups related updates into single PR instead of individual PRs for each package.

#### Renovate

**renovate.json**:
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base",
    ":preserveSemverRanges",
    ":automergeMinor"
  ],
  "rangeStrategy": "bump",
  "labels": ["dependencies"],
  "packageRules": [
    {
      "matchPackagePatterns": ["^@storybook"],
      "groupName": "Storybook packages"
    },
    {
      "matchPackagePatterns": ["^@radix-ui"],
      "groupName": "Radix UI packages"
    },
    {
      "matchUpdateTypes": ["patch", "pin", "digest"],
      "automerge": true,
      "automergeType": "pr",
      "automergeStrategy": "squash"
    }
  ],
  "schedule": ["before 5am on monday"],
  "timezone": "America/New_York"
}
```

### Auto-merge Configuration

**Only auto-merge if:**
- ✅ All CI checks pass
- ✅ Patch updates only (1.2.3 → 1.2.4)
- ✅ Dependencies, not devDependencies

**.github/workflows/auto-merge-dependabot.yml**:
```yaml
name: Auto-merge Dependabot PRs

on: pull_request

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - name: Enable auto-merge for Dependabot PRs
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{github.event.pull_request.html_url}}
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

### Best Practices

**DO:**
- ✅ Group related packages
- ✅ Auto-merge patch updates
- ✅ Review minor/major updates
- ✅ Run full test suite on updates
- ✅ Set schedule (avoid weekends)

**DON'T:**
- ❌ Auto-merge everything blindly
- ❌ Ignore breaking changes
- ❌ Skip testing updates
- ❌ Update during release week

### Implementation Steps
1. Create `.github/dependabot.yml`
2. Configure update schedule
3. Set up package groups
4. Enable auto-merge for patches (optional)
5. Monitor first few weeks

### Effort: Very Low | Impact: Medium

---

## Monorepo Tooling Upgrade

### What It Is
Replace `npm workspaces` with advanced monorepo tools (Turborepo or Nx) for faster builds and better developer experience.

### Current: npm workspaces
```json
{
  "workspaces": ["packages/*"]
}
```

**Pros:**
- ✅ Simple
- ✅ No extra dependencies
- ✅ Works out of the box

**Cons:**
- ❌ No build caching
- ❌ No parallel builds
- ❌ No dependency graph
- ❌ Rebuilds everything every time

### Option 1: Turborepo

#### What It Is
High-performance build system for JavaScript/TypeScript monorepos.

#### Benefits
- ⚡ **Remote caching** - Share build cache with team
- ⚡ **Parallel execution** - Run tasks concurrently
- ⚡ **Smart scheduling** - Only build what changed
- ⚡ **Pipeline definition** - Define task dependencies

#### How It Works

**Before (npm workspaces):**
```bash
npm run build
# Builds tokens → core → react-ui sequentially
# Takes 45 seconds every time
```

**After (Turborepo):**
```bash
turbo build
# First run: 45 seconds (builds all)
# Second run: 0.2 seconds (uses cache)
# Only rebuilds changed packages
```

#### Configuration

**turbo.json**:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "build:token": {
      "outputs": ["packages/tokens/dist/**"]
    },
    "lint": {
      "cache": false
    },
    "test": {
      "dependsOn": ["build"],
      "cache": true
    }
  }
}
```

**package.json**:
```json
{
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev --parallel",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "^1.11.0"
  }
}
```

#### Remote Caching

**Vercel (free for OSS):**
```bash
npx turbo login
npx turbo link

# Now builds are cached remotely
# Team members reuse each other's builds
```

**Self-hosted:**
```bash
# Run your own cache server
turbo run build --api="https://cache.yourcompany.com"
```

### Option 2: Nx

#### What It Is
Smart, extensible build framework by Nrwl.

#### Benefits
- 🎯 **Affected detection** - Only test/build what changed
- 🎯 **Computation caching** - Like Turborepo
- 🎯 **Code generators** - Built-in component generator
- 🎯 **Workspace analysis** - Visualize dependencies

#### Unique Features

**Dependency graph visualization:**
```bash
npx nx graph

# Opens browser with interactive dependency graph
@toyota/core
  ↓
@toyota/react-ui
  ↓
apps/docs
```

**Affected commands:**
```bash
# Only test packages affected by current changes
nx affected:test

# Only build what's affected
nx affected:build
```

#### Configuration

**nx.json**:
```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test"]
      }
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": ["!{projectRoot}/**/*.spec.ts"]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/dist"]
    }
  }
}
```

### Comparison

| Feature | npm workspaces | Turborepo | Nx |
|---------|---------------|-----------|-----|
| Caching | ❌ | ✅ Local + Remote | ✅ Local + Remote |
| Parallel | ❌ | ✅ | ✅ |
| Affected | ❌ | ❌ | ✅ |
| Generators | ❌ | ❌ | ✅ |
| Complexity | Simple | Medium | High |
| Learning Curve | None | Low | Medium |
| Speed | Slow | Fast | Fast |

### Recommendation: Turborepo

**For this project:**
- ✅ Simpler than Nx
- ✅ Dramatic speed improvements
- ✅ Easy migration from npm workspaces
- ✅ Free remote caching
- ✅ Great documentation

### Migration Steps

**1. Install Turborepo:**
```bash
npm install turbo --save-dev
```

**2. Create `turbo.json`:**
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

**3. Update scripts:**
```json
{
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint"
  }
}
```

**4. Test:**
```bash
npm run build  # First run
npm run build  # Second run (should be instant)
```

**5. Add remote caching (optional):**
```bash
npx turbo login
npx turbo link
```

### Effort: Medium | Impact: Very High

---

## Design Token Versioning

### The Problem
Token changes are breaking changes but aren't treated as such.

**Scenario:**
```css
/* v1.0 */
--color-primary: #EB0A1E;

/* v1.1 - BREAKING CHANGE */
--color-primary: #FF0000;  /* Now brighter red */

/* Apps using v1.0 suddenly change appearance */
```

**Impact:**
- ❌ Apps break unexpectedly
- ❌ No migration path
- ❌ Can't rollback easily
- ❌ Hard to test changes

### Solution 1: Version Tokens Separately

**Treat tokens as API:**
```json
{
  "name": "@redhorn/design-tokens",
  "version": "1.0.0"  // Independent versioning
}
```

**Breaking change = major bump:**
```
1.0.0 → 2.0.0  (changed primary color)
1.0.0 → 1.1.0  (added new color)
1.0.0 → 1.0.1  (fixed typo in comment)
```

**Apps pin to specific version:**
```json
{
  "dependencies": {
    "@redhorn/design-tokens": "^1.0.0"  // Won't auto-upgrade to 2.x
  }
}
```

### Solution 2: Migration Scripts

**Provide automated migration:**

**tokens/migrations/1.x-to-2.x.js**:
```javascript
module.exports = function migrate(css) {
  return css
    // Rename old tokens
    .replace(/--color-accent/g, '--color-primary')
    // Update values
    .replace(/#EB0A1E/g, '#FF0000')
    // Add fallbacks
    .replace(/var\(--color-primary\)/g, 'var(--color-primary, #EB0A1E)');
};
```

**Run migration:**
```bash
npx @redhorn/design-tokens migrate 1.x 2.x src/**/*.css
```

### Solution 3: Deprecation Warnings

**Add console warnings:**

**tokens/dist/js/light.js**:
```javascript
export const tokens = {
  color: {
    // Old (deprecated)
    get accent() {
      console.warn(
        'tokens.color.accent is deprecated. Use tokens.color.primary instead.'
      );
      return '#EB0A1E';
    },
    // New
    primary: '#EB0A1E',
  },
};
```

**Developers see:**
```
⚠️ tokens.color.accent is deprecated. Use tokens.color.primary instead.
   at Button.tsx:23
```

### Solution 4: Version Namespacing

**Support multiple versions simultaneously:**

```css
/* v1 tokens */
:root[data-tokens="v1"] {
  --color-primary: #EB0A1E;
}

/* v2 tokens */
:root[data-tokens="v2"] {
  --color-primary: #FF0000;
}
```

**Apps opt into new version:**
```html
<html data-tokens="v2">
```

### Solution 5: Token Changelog

**CHANGELOG.md for tokens:**

```markdown
# @toyota/design-tokens

## 2.0.0 (2024-01-15)

### BREAKING CHANGES

- `--color-primary` changed from #EB0A1E to #FF0000
- `--color-accent` removed (use `--color-primary`)
- `--spacing-unit` changed from 8px to 4px

### Migration Guide

1. Replace all `--color-accent` with `--color-primary`
2. Review components using `--spacing-unit`
3. Run visual regression tests

### New Tokens

- `--color-primary-hover`
- `--color-primary-active`

## 1.2.0 (2023-12-01)

### New Tokens

- `--color-success-light`
```

### Recommended Approach

**Combine multiple solutions:**

1. ✅ **Semantic versioning** - Version tokens independently
2. ✅ **Changelog** - Document all changes
3. ✅ **Deprecation warnings** - Warn before removing
4. ✅ **Migration guide** - Help developers upgrade

### Implementation

**1. Add token versioning:**
```json
{
  "name": "@redhorn/design-tokens",
  "version": "1.0.0",
  "scripts": {
    "version": "changeset version"
  }
}
```

**2. Create CHANGELOG.md**

**3. Add deprecation system:**
```javascript
// tokens/src/deprecations.js
export function deprecate(oldToken, newToken, value) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Token '${oldToken}' is deprecated. Use '${newToken}'.`);
  }
  return value;
}
```

**4. Document migration process in docs/**

### Effort: Medium | Impact: High

---

## Migration Guides

### What It Is
Step-by-step documentation to help developers upgrade between major versions.

### Why Needed
Major version changes can break apps:
- API changes
- Token changes
- Removed components
- New required props

Without migration guide:
- ❌ Developers stuck on old versions
- ❌ Breaking changes cause incidents
- ❌ Adoption of new features slow

### What to Include

#### 1. Overview
```markdown
# Migration Guide: v1 → v2

## Overview
Version 2.0 includes breaking changes to improve consistency and accessibility.

**Estimated migration time:** 2-4 hours for typical app

**Benefits:**
- Better accessibility
- Improved performance
- New components
```

#### 2. Breaking Changes
```markdown
## Breaking Changes

### Button Component

**Changed:** `variant` prop values
```diff
- <Button variant="primary" />
+ <Button variant={ButtonVariant.Primary} />
```

**Why:** TypeScript enums for better type safety

**Migration:**
1. Replace strings with enums
2. Import ButtonVariant from @toyota/core
```

#### 3. Step-by-Step Instructions
```markdown
## Migration Steps

### Step 1: Update Dependencies

```bash
npm install @redhorn/react-ui@2.0.0 @redhorn/core@2.0.0
```

### Step 2: Run Codemods

```bash
npx @redhorn/codemods v1-to-v2 src/
```

### Step 3: Fix TypeScript Errors

Common errors and solutions...

### Step 4: Update Imports

```diff
- import { Button } from '@redhorn/react-ui';
+ import { Button } from '@redhorn/react-ui';
+ import { ButtonVariant } from '@redhorn/core';
```

### Step 5: Test Thoroughly

Run tests, visual regression, manual testing.
```

#### 4. Codemods

**Automated code transformations:**

**v1-to-v2.js**:
```javascript
// Using jscodeshift
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Replace string literals with enums
  root
    .find(j.JSXAttribute, {
      name: { name: 'variant' },
      value: { value: 'primary' }
    })
    .forEach(path => {
      path.value.value = j.jsxExpressionContainer(
        j.memberExpression(
          j.identifier('ButtonVariant'),
          j.identifier('Primary')
        )
      );
    });

  return root.toSource();
};
```

**Run:**
```bash
npx jscodeshift -t codemods/v1-to-v2.js src/
```

#### 5. Common Issues
```markdown
## Common Issues

### Issue: "ButtonVariant is not defined"

**Cause:** Missing import

**Solution:**
```typescript
import { ButtonVariant } from '@toyota/core';
```

### Issue: Components look different

**Cause:** Token changes

**Solution:** See [Token Migration Guide](#tokens)
```

### Example Structure

**docs/migrations/**:
```
docs/migrations/
├── README.md                    (Index of all migrations)
├── v1-to-v2.md                 (v1 → v2 migration)
├── v2-to-v3.md                 (v2 → v3 migration)
└── codemods/
    ├── v1-to-v2/
    │   ├── button-variants.js
    │   ├── import-updates.js
    │   └── README.md
    └── v2-to-v3/
        └── ...
```

### Complete Migration Guide Template

```markdown
# Migration Guide: v{X} → v{Y}

## Overview
Brief description of changes and why.

## Prerequisites
- Node.js 18+
- Current version: v{X}.latest
- Time estimate: X hours

## Breaking Changes

### Component API Changes
List all breaking changes with before/after examples.

### Token Changes  
List token renames, removals, value changes.

### Removed Features
List deprecated features now removed.

## Migration Steps

### Step 1: Preparation
- [ ] Back up your code
- [ ] Run tests (baseline)
- [ ] Review breaking changes

### Step 2: Update Dependencies
```bash
npm install ...
```

### Step 3: Run Codemods
```bash
npx @toyota/codemods vX-to-vY src/
```

### Step 4: Manual Updates
List changes that can't be automated.

### Step 5: Testing
- [ ] Unit tests pass
- [ ] Visual regression tests
- [ ] Manual testing
- [ ] Accessibility audit

## Common Issues
FAQ-style troubleshooting.

## Rollback Plan
How to revert if needed.

## Support
Where to get help.
```

### Effort: Medium | Impact: High

---

## Summary

### Quick Reference

| Improvement | Effort | Impact | Priority |
|------------|--------|--------|----------|
| TypeScript Project References | Medium | High | Medium |
| Pre-commit Hooks | Low | High | High |
| Changeset Management | Low | Very High | High |
| Package Publishing Config | Very Low | Medium | High |
| Bundle Size Limits | Low | High | Medium |
| Component Generator | Medium | Medium | Low |
| Automated Dependency Updates | Very Low | Medium | Low |
| Monorepo Tooling Upgrade | Medium | Very High | Low |
| Design Token Versioning | Medium | High | Medium |
| Migration Guides | Medium | High | Medium |

### Recommended Implementation Order

**Phase 1 (Now):**
1. Pre-commit hooks
2. Package publishing config
3. Changeset management

**Phase 2 (This Sprint):**
4. Bundle size limits
5. TypeScript project references
6. Automated dependency updates

**Phase 3 (Next Sprint):**
7. Component generator
8. Design token versioning
9. Migration guides

**Phase 4 (Future):**
10. Monorepo tooling upgrade

---

## Next Steps

1. **Read and understand** each improvement
2. **Prioritize** based on your team's needs
3. **Create issues** for approved improvements
4. **Implement incrementally** - one at a time
5. **Document your experience** - update this guide

---

## Questions?

**Need clarification?** Ask in team channel or create a discussion issue.

**Want to implement?** Follow the implementation steps in each section.

**Have suggestions?** Submit a PR to improve this guide!

