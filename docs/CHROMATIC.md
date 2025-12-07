# Chromatic Visual Regression Testing

## What is Chromatic?

Chromatic is a cloud-based visual testing platform that automatically detects visual changes in your UI components. It captures screenshots of every story in your Storybook and compares them to previous versions, helping you catch unintended visual bugs before they reach production.

## Why Use Chromatic?

### Traditional Testing Misses Visual Bugs

- **Unit tests** verify logic, not appearance
- **Integration tests** check functionality, not visual consistency  
- **Manual testing** is time-consuming and error-prone

### Visual Regression Testing Catches:
- ✅ Unintended layout shifts
- ✅ CSS changes that break designs
- ✅ Typography and spacing issues
- ✅ Color and theming problems
- ✅ Responsive design breakage
- ✅ Browser-specific rendering issues

## How It Works

### 1. **Baseline Creation**
First run captures screenshots of all stories as the "baseline" or "truth" state.

```
Story: Button/Primary
Screenshot: button-primary-baseline.png ✓
```

### 2. **Change Detection**
Each subsequent run compares new screenshots to the baseline.

```
Story: Button/Primary
Old: button-primary-baseline.png
New: button-primary-new.png
Diff: 2 pixels changed ⚠️
```

### 3. **Review UI**
Chromatic provides a visual interface to review changes:
- **Side-by-side comparison** - See before and after
- **Overlay diff** - Highlight exact pixel changes  
- **Slider view** - Swipe between versions

### 4. **Accept or Reject**
You decide for each change:
- ✅ **Accept** - This change is intentional → Update baseline
- ❌ **Reject** - This is a bug → Keep old baseline, fix code

## Setup

### 1. Create Chromatic Account

1. Visit [chromatic.com](https://www.chromatic.com/)
2. Sign up using your GitHub account
3. Click "Add Project"
4. Select this repository (`design-system`)
5. Copy the project token

### 2. Configure Project Token

**Option A: Local Development**

Update `.chromatic.config.json`:
```json
{
  "projectToken": "chpt_YOUR_TOKEN_HERE"
}
```

**Option B: CI/CD (Recommended)**

Add to GitHub Secrets:
1. Go to repository Settings
2. Navigate to Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `CHROMATIC_PROJECT_TOKEN`
5. Value: Your Chromatic token
6. Click "Add secret"

### 3. Install Dependencies

Already installed:
```bash
npm install --save-dev chromatic
```

## Usage

### Local Development

Run Chromatic from your machine:

```bash
# Run Chromatic (will prompt for approval)
npm run chromatic

# CI mode (auto-accept on main branch)
npm run chromatic:ci
```

**Output:**
```
✔ Build 1 published
  View your Storybook at:
  https://main--YOUR_PROJECT_ID.chromatic.com

✔ Tested 24 stories across 12 components
  ✓ 20 unchanged
  ⚠ 4 changes detected

👀 Review changes:
  https://www.chromatic.com/build?appId=YOUR_PROJECT_ID&number=1
```

### Continuous Integration

Chromatic runs automatically on:
- ✅ Pull requests
- ✅ Pushes to `main` branch

Configured in `.github/workflows/chromatic.yml`:

```yaml
- name: Run Chromatic
  uses: chromaui/action@latest
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    buildScriptName: 'build-storybook'
    workingDir: packages/react-ui
```

### PR Integration

When you create a PR, Chromatic:
1. **Builds** Storybook
2. **Captures** screenshots of all stories
3. **Compares** to baseline
4. **Comments** on PR with results
5. **Blocks merge** if changes are unreviewed (configurable)

**Example PR Comment:**
```
🌈 Chromatic Build #42

✅ 18 components unchanged
⚠️ 3 components changed
🆕 1 new component

👀 Review changes: [View build →]

Status: ⏸ Waiting for approval
```

## Workflow

### Developer Workflow

#### Making a Component Change

1. **Develop** your component locally
   ```bash
   npm run storybook
   ```

2. **Preview** changes in Storybook
   - Test all variants
   - Check light/dark themes
   - Verify responsive behavior

3. **Push** to feature branch
   ```bash
   git push origin feature/update-button-colors
   ```

4. **Create PR** on GitHub
   - Chromatic runs automatically
   - Wait for build to complete (~2-5 minutes)

5. **Review** visual changes
   - Click Chromatic link in PR comment
   - Review each changed component
   - Accept intended changes
   - Reject unintended changes

6. **Fix** rejected changes (if any)
   ```bash
   # Make fixes
   git commit -am "Fix button hover state"
   git push
   # Chromatic runs again
   ```

7. **Merge** when all approved
   - All visual changes accepted
   - PR checks pass
   - Merge to main

### Reviewer Workflow

#### Reviewing a PR

1. **Open** Chromatic build from PR comment

2. **Review** each change:
   - ✅ **Accept** if change looks correct
   - ❌ **Reject** if it looks wrong
   - 💬 **Comment** to request clarification

3. **Common scenarios:**

   **Intentional Design Update ✅**
   ```
   Change: Button primary color updated
   Reason: New brand colors
   Action: Accept all button changes
   ```

   **Unintended Side Effect ❌**
   ```
   Change: Input label shifted 2px down
   Reason: Unrelated CSS change
   Action: Reject change, request fix
   ```

   **New Component 🆕**
   ```
   Change: New Badge component added
   Reason: New feature
   Action: Accept baseline
   ```

## Best Practices

### ✅ Do

**1. Use Consistent Data**
```typescript
// ✅ Good - Fixed date
export const Story = {
  args: {
    date: new Date('2024-01-01'),
  },
};

// ❌ Bad - Random data
export const Story = {
  args: {
    date: new Date(), // Changes every time!
  },
};
```

**2. Wait for Animations**
```typescript
export const AnimatedStory = {
  parameters: {
    chromatic: { 
      delay: 300, // Wait for animation to complete
    },
  },
};
```

**3. Test Multiple Viewports**
```typescript
export const ResponsiveComponent = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1920],
    },
  },
};
```

**4. Disable Snapshots for Dynamic Content**
```typescript
export const LiveDataStory = {
  parameters: {
    chromatic: { 
      disableSnapshot: true, // Too dynamic to test
    },
  },
};
```

### ❌ Don't

- ❌ Use random data (Math.random(), Date.now())
- ❌ Include live API data
- ❌ Snapshot every animation frame
- ❌ Auto-accept all changes without review
- ❌ Snapshot loading states (unless testing them)

## Optimizing Chromatic

### Reduce Snapshot Count

Each story = 1 snapshot. To save snapshots:

**Disable non-visual stories:**
```typescript
export const CodeOnlyStory = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
```

**Combine similar states:**
```typescript
// Instead of 5 separate stories
export const AllVariants = () => (
  <div>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);
```

### Improve Performance

**Parallel snapshots:**
```json
{
  "projectToken": "...",
  "onlyChanged": true,  // Only snapshot changed stories
  "skip": "test/**",    // Skip test stories
}
```

**Faster builds:**
```bash
# Use Storybook build cache
npm run build-storybook -- --quiet
```

## Pricing

Chromatic pricing is based on snapshots:

- **Free Tier**: 5,000 snapshots/month
- **Team**: $149/month for 35,000 snapshots
- **Enterprise**: Custom pricing

### Calculating Your Usage

```
Stories per build: 24
Builds per month: ~100 (5 PRs/week × 4 weeks × 5 builds/PR)
Total snapshots: 24 × 100 = 2,400/month
```

**Fits in free tier!** ✅

### Tips to Stay Under Limit

1. Use `onlyChanged: true` (only test changed stories)
2. Disable snapshots for non-visual stories
3. Combine similar variants into one story
4. Limit viewport testing to essential breakpoints
5. Use Chromatic's branch baselines (test only changed files)

## Troubleshooting

### Build Failed

**Check:**
```bash
# Build Storybook locally
npm run build-storybook

# Verify no build errors
# Check that all stories render
```

**Common causes:**
- Missing dependencies
- Broken imports
- Design tokens not built
- TypeScript errors

### Too Many Changes Detected

**Scenario:** Every story shows changes

**Possible causes:**
1. **Font loading changed** - Add `delay` parameter
2. **Global CSS updated** - Expected, accept all changes
3. **Design tokens changed** - Expected, accept all changes
4. **Browser version updated** - Accept all changes (one-time)

**Fix:**
```typescript
// Add delay for font loading
export const config = {
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};
```

### Flaky Tests

**Scenario:** Same story shows different results each run

**Causes:**
- Random data
- Animations not completing
- API calls
- Dynamic timestamps

**Fix:**
```typescript
// Use mocked, consistent data
export const Story = {
  args: {
    data: mockData, // Not real API
    timestamp: 1704067200000, // Fixed timestamp
  },
  parameters: {
    chromatic: {
      delay: 1000, // Wait for animations
      pauseAnimationAtEnd: true,
    },
  },
};
```

### Chromatic Not Running in CI

**Check:**
1. GitHub secret `CHROMATIC_PROJECT_TOKEN` exists
2. Workflow file present: `.github/workflows/chromatic.yml`
3. Tokens built: `npm run build:token`
4. Core built: `npm run build --workspace=packages/core`

## Advanced Features

### Ignore Regions

Ignore specific elements that change:

```typescript
export const Story = {
  parameters: {
    chromatic: {
      ignore: ['.timestamp', '#dynamic-content'],
    },
  },
};
```

### Threshold for Changes

Set pixel threshold:

```typescript
export const Story = {
  parameters: {
    chromatic: {
      diffThreshold: 0.2, // Ignore changes < 0.2%
    },
  },
};
```

### Multiple Baselines

Test against different baselines:

```typescript
export const Story = {
  parameters: {
    chromatic: {
      baseline: 'feature-branch', // Compare to feature, not main
    },
  },
};
```

## Resources

- **Chromatic Docs**: https://www.chromatic.com/docs/
- **Storybook Visual Testing**: https://storybook.js.org/docs/react/writing-tests/visual-testing
- **Chromatic GitHub Action**: https://github.com/chromaui/action
- **Support**: support@chromatic.com
- **Status Page**: https://status.chromatic.com/

## FAQ

**Q: Do I need to review every change?**
A: Yes, for production. Auto-accept can be enabled for development branches.

**Q: What happens if I don't review changes?**
A: PR remains blocked (if configured) until changes are reviewed.

**Q: Can I test locally before pushing?**
A: Yes! Run `npm run chromatic` locally to preview changes.

**Q: How long does Chromatic keep history?**
A: Unlimited on all plans. All builds are permanently stored.

**Q: Can I test without Chromatic?**
A: Yes, but you'll need to manually compare screenshots or use an alternative tool.

**Q: Does Chromatic test in different browsers?**
A: Yes, Chromatic tests in Chrome by default. Enterprise plans support additional browsers.

