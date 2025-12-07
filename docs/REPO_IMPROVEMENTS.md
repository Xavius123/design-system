# Repository Improvements Guide

Practical guide to 7 high-impact tools that will improve code quality, development speed, and team collaboration in the Redhorn Design System.

---

## Quick Overview

| Tool | What It Does | Setup Time | Impact | Priority |
|------|--------------|------------|--------|----------|
| **Husky + lint-staged** | Auto-check code before commits | 30 min | 🔥 High | 1st |
| **Changesets** | Automate versioning & changelogs | 1-2 hrs | 🔥 Very High | Before publish |
| **Bundle Size Limits** | Prevent bloated bundles | 30 min | 🔥 High | 2nd |
| **Component Generator** | Scaffold components instantly | 2-3 hrs | 💚 Medium | Later |
| **Renovate/Dependabot** | Auto-update dependencies | 1 hr | 💚 Medium | 3rd |
| **Turborepo** | Speed up builds 10-20x | 1-2 hrs | 🔥 Very High | When slow |
| **Token Versioning** | Version design tokens safely | 2-3 hrs | 🔥 High | Before publish |

---

## 1. Husky + lint-staged (Pre-commit Hooks)

### What It Does
Automatically runs code formatting and linting checks before every git commit, blocking the commit if there are errors. Only checks the files you're actually committing, not your entire codebase.

### Why It's an Improvement
Prevents messy, inconsistent, or broken code from ever entering your git history, catching mistakes immediately instead of during PR review when they're more expensive to fix.

### Key Benefits
- ✅ Stops bad code at commit time (not PR time)
- ✅ Auto-formats code with Prettier
- ✅ Catches ESLint errors immediately
- ✅ Only checks changed files (fast!)
- ✅ Ensures consistent code style across team

### Example Workflow
```bash
git add src/components/Button.tsx
git commit -m "Update button"

# Husky intercepts:
🔍 Running pre-commit hooks...
✓ ESLint - checking 1 file
✓ Prettier - formatted Button.tsx
✓ TypeScript - no errors
✅ Commit allowed!
```

### Setup
```bash
# Install
npm install --save-dev husky lint-staged

# Initialize
npx husky install

# Add hook
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configure in package.json:**
```json
{
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

**Setup Time:** 30 minutes  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#pre-commit-hooks)

---

## 2. Changesets (Version Management)

### What It Does
Prompts developers to describe their changes when making PRs, then automatically generates version numbers and changelogs when you're ready to publish. Each PR includes a small "changeset" file describing the change.

### Why It's an Improvement
Eliminates version conflicts in git, automates changelog generation, and ensures every change is documented with proper semantic versioning without manual coordination.

### Key Benefits
- ✅ No more version conflicts in PRs
- ✅ Beautiful changelogs automatically generated
- ✅ Enforces semantic versioning
- ✅ Handles dependent package bumps
- ✅ CI/CD integration for auto-publishing

### Example Workflow
```bash
# Developer makes changes
git checkout -b feature/button-sizes

# Create changeset
npx changeset

? Which packages changed? @redhorn/react-ui
? What type of change? minor (new feature)
? Summary: Added sm/md/lg size variants to Button

✔ Created .changeset/happy-lions-jump.md

# Commit with code
git add .
git commit -m "Add button sizes"
```

**When ready to release:**
```bash
npx changeset version   # Updates package.json & CHANGELOG
npx changeset publish   # Publishes to npm
```

### Setup
```bash
# Install
npm install --save-dev @changesets/cli

# Initialize
npx changeset init

# Configure .changeset/config.json
{
  "changelog": "@changesets/cli/changelog",
  "linked": [
    ["@redhorn/core", "@redhorn/react-ui", "@redhorn/react-native-ui"]
  ],
  "access": "public"
}
```

**Setup Time:** 1-2 hours  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#changeset-management)

---

## 3. Bundle Size Limits

### What It Does
Fails your build if JavaScript bundles exceed configured size limits, alerting you immediately when someone accidentally imports a massive library. Shows exactly what's taking up space in your bundle.

### Why It's an Improvement
Catches performance-killing bloat before it reaches production, keeping your library lightweight and ensuring fast load times for end users.

### Key Benefits
- ✅ Prevents shipping bloated code
- ✅ Catches accidental large imports
- ✅ Keeps library performant
- ✅ Forces conscious decisions about size
- ✅ Easy to debug with bundle analyzer

### Example
```bash
npm run build

❌ Bundle size limit exceeded!

  packages/react-ui/dist/index.esm.js
  Expected: ≤ 50 KB
  Actual:   65.2 KB (+15.2 KB / +30%)
  
  Run 'npm run size:why' to analyze
```

### Setup
```bash
# Install
npm install --save-dev size-limit @size-limit/preset-small-lib
```

**Create `.size-limit.json`:**
```json
[
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

**Add to package.json:**
```json
{
  "scripts": {
    "size": "size-limit",
    "size:why": "size-limit --why"
  }
}
```

**Setup Time:** 30 minutes  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#bundle-size-limits)

---

## 4. Component Generator (plop.js)

### What It Does
CLI tool that scaffolds complete components with one command, creating all necessary files (component, styles, stories, tests) from templates. Takes 5 seconds instead of 10-15 minutes of manual work.

### Why It's an Improvement
Ensures every component follows the same structure and includes all necessary files (no forgotten tests or stories), dramatically speeds up development, and makes onboarding new developers instant.

### Key Benefits
- ✅ Creates components in 5 seconds
- ✅ Never forget tests or stories
- ✅ Consistent structure across all components
- ✅ Pre-configured with best practices
- ✅ Perfect for onboarding new devs

### Example
```bash
npm run generate:component Badge

✨ Creating component: Badge

📁 packages/react-ui/src/components/Badge/
  ✓ Badge.tsx
  ✓ Badge.module.css
  ✓ Badge.stories.tsx
  ✓ Badge.test.tsx
  ✓ index.ts

📝 Updated:
  ✓ packages/react-ui/src/components/index.js

✅ Component ready! Run 'npm run storybook'
```

### Setup
```bash
# Install
npm install --save-dev plop
```

**Create `plopfile.js`:**
```javascript
export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/react-ui/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
      // ... more actions
    ],
  });
}
```

**Add to package.json:**
```json
{
  "scripts": {
    "generate": "plop",
    "generate:component": "plop component"
  }
}
```

**Setup Time:** 2-3 hours (creating templates)  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#component-generator)

---

## 5. Renovate/Dependabot (Automated Updates)

### What It Does
Bots that automatically scan your dependencies and create pull requests to update them, grouping related packages together. Can auto-merge patch updates if your tests pass.

### Why It's an Improvement
Keeps dependencies current with zero manual effort, prevents security vulnerabilities from lingering, and avoids the nightmare of upgrading 50 packages at once after years of neglect.

### Key Benefits
- ✅ Zero manual dependency work
- ✅ Security patches applied quickly
- ✅ Small, incremental updates (easy to review)
- ✅ Groups related packages (one PR for all Storybook packages)
- ✅ Can auto-merge patch updates

### Example
```
Every Monday:
✅ PR #145: Update Storybook packages (8.4.7 → 8.4.8)
✅ PR #146: Update TypeScript (5.3.0 → 5.3.1)
✅ PR #147: Security: Update axios (1.2.0 → 1.2.1)

Review → Approve → Merge → Stay current!
```

### Setup (Dependabot)

**Create `.github/dependabot.yml`:**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    groups:
      storybook:
        patterns:
          - "@storybook/*"
      radix-ui:
        patterns:
          - "@radix-ui/*"
  
  - package-ecosystem: "npm"
    directory: "/packages/react-ui"
    schedule:
      interval: "weekly"
```

**Setup Time:** 1 hour  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#automated-dependency-updates)

---

## 6. Turborepo (Build System)

### What It Does
Intelligently caches build outputs and runs tasks in parallel, only rebuilding packages that actually changed. Can share cache across your team so developers reuse each other's build results.

### Why It's an Improvement
Transforms 45-second builds into 0.2-second rebuilds when nothing changed, speeds up CI by 3-5x, and makes development feel instant instead of waiting constantly.

### Key Benefits
- ⚡ 3-5x faster builds
- ⚡ Instant rebuilds when nothing changed
- ⚡ Remote caching - team shares builds
- ⚡ Parallel execution - uses all CPU cores
- ⚡ Only builds what changed

### Real Impact
```
Without Turborepo:
→ npm run build: 45s (every time)
→ CI builds: 3-5 minutes

With Turborepo:
→ First build: 45s
→ Rebuild (no changes): 0.2s
→ CI builds: 30-60s (uses cache)
```

### Setup
```bash
# Install
npm install turbo --save-dev
```

**Create `turbo.json`:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "cache": false
    }
  }
}
```

**Update package.json:**
```json
{
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint"
  }
}
```

**Optional - Remote caching:**
```bash
npx turbo login
npx turbo link
# Now your team shares build cache!
```

**Setup Time:** 1-2 hours  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#monorepo-tooling-upgrade)

---

## 7. Design Token Versioning

### What It Does
Treats design tokens as a versioned API with semantic versioning, deprecation warnings, and migration scripts when colors/spacing/typography change. Provides changelogs specifically for token changes.

### Why It's an Improvement
Prevents apps from unexpectedly breaking when token values change, gives teams a clear migration path with automated tools, and allows controlled rollout of design updates instead of sudden visual changes.

### Key Benefits
- ✅ Controlled token updates
- ✅ Apps won't break unexpectedly
- ✅ Clear migration path
- ✅ Deprecation warnings guide developers
- ✅ Easy to rollback if needed

### The Problem
```css
/* Without versioning: */
/* v1.0 */ --color-primary: #EB0A1E;
/* v1.1 */ --color-primary: #FF0000;  /* BREAKING! */
/* All apps suddenly change appearance! */
```

### The Solution
```json
{
  "name": "@redhorn/design-tokens",
  "version": "1.0.0"
}

// Apps pin to major version
{
  "dependencies": {
    "@redhorn/design-tokens": "^1.0.0"  // Won't auto-upgrade to 2.x
  }
}
```

### Deprecation Warnings
```javascript
export const tokens = {
  color: {
    get accent() {
      console.warn('tokens.color.accent is deprecated. Use tokens.color.primary');
      return '#EB0A1E';
    },
    primary: '#EB0A1E',
  },
};
```

### Token Changelog
```markdown
# @redhorn/design-tokens

## 2.0.0 (2024-01-15)

### BREAKING CHANGES
- `--color-primary` changed from #EB0A1E to #FF0000
- `--color-accent` removed (use `--color-primary`)

### Migration Guide
1. Replace `--color-accent` with `--color-primary`
2. Run visual regression tests
3. Update brand guidelines

### New Tokens
- `--color-primary-hover`
- `--color-primary-active`
```

**Setup Time:** 2-3 hours  
**Full Details:** [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md#design-token-versioning)

---

## Implementation Roadmap

### Phase 1: Quick Wins (Week 1)
**Goal:** Immediate code quality improvements

1. **Husky + lint-staged** (30 min)
   - Prevents bad commits
   - Auto-formats code
   
2. **Bundle Size Limits** (30 min)
   - Catches bloat early
   - Keeps library performant

3. **Renovate/Dependabot** (1 hr)
   - Set and forget
   - Keeps dependencies current

**Total time:** ~2 hours  
**Impact:** High code quality, no bloat, auto-updates

---

### Phase 2: Pre-Publish Essentials (Before npm)
**Goal:** Ready for production publishing

4. **Changesets** (1-2 hrs)
   - Essential for version management
   - Beautiful changelogs
   
5. **Token Versioning** (2-3 hrs)
   - Prevent breaking changes
   - Safe token updates

**Total time:** ~4 hours  
**Impact:** Professional release process

---

### Phase 3: Developer Experience (Month 1)
**Goal:** Speed up development

6. **Component Generator** (2-3 hrs)
   - Scaffold components instantly
   - Consistent structure

**Total time:** ~3 hours  
**Impact:** Faster component development

---

### Phase 4: Performance (When Needed)
**Goal:** Speed up builds

7. **Turborepo** (1-2 hrs)
   - Implement when builds get slow (>10s)
   - 10-20x faster builds

**Total time:** ~2 hours  
**Impact:** Instant rebuilds, fast CI

---

## FAQ

### Q: Do I need all 7 tools?
**A:** No. Start with Phase 1 (quick wins). Add others as needed.

### Q: Which is most important?
**A:** Husky + lint-staged. Prevents bad code from day 1.

### Q: Which can wait?
**A:** Turborepo (implement when builds are slow). Component generator (nice-to-have).

### Q: What's the minimum for npm publishing?
**A:** Changesets (version management) and Token Versioning (if using tokens).

### Q: How long to implement everything?
**A:** ~12-15 hours total, but spread over weeks/months based on priority.

---

## Additional Resources

- **Chromatic** (Visual Regression): [docs/CHROMATIC.md](./CHROMATIC.md)
- **Storybook Addons**: [docs/STORYBOOK_ADDONS.md](./STORYBOOK_ADDONS.md)
- **Advanced Details**: [docs/ADVANCED_IMPROVEMENTS.md](./ADVANCED_IMPROVEMENTS.md)
- **Contributing Guide**: [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## Quick Reference

```bash
# Husky
npm install --save-dev husky lint-staged
npx husky install

# Changesets
npm install --save-dev @changesets/cli
npx changeset init

# Bundle Size
npm install --save-dev size-limit @size-limit/preset-small-lib

# Component Generator
npm install --save-dev plop

# Turborepo
npm install turbo --save-dev

# Dependabot
# Create .github/dependabot.yml (no install needed)
```

---

**Last Updated:** December 2024  
**Maintained by:** Redhorn Design System Team

