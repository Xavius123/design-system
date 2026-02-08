# Pilot Rollout Plan

## Phase 1: Pilot in 1 React App (Weeks 1-2)

### Choose Pilot App

**Ideal characteristics:**
- ✅ Small to medium size
- ✅ Active development (not in maintenance mode)
- ✅ Enthusiastic team
- ✅ Lower risk (not customer-facing critical path)
- ✅ Uses modern React (hooks, TypeScript)

**Candidate:** `react-app-ds` (if it's a real app) or your smallest React app

### Goals

1. Validate components work in real app
2. Identify integration issues
3. Measure bundle size impact
4. Gather developer feedback
5. Establish adoption pattern

### Success Criteria

- [ ] App builds successfully
- [ ] Components render correctly
- [ ] No visual regressions
- [ ] Performance acceptable
- [ ] Team gives positive feedback
- [ ] No showstopper bugs

## Pilot Implementation

### Week 1: Setup and First Feature

#### Day 1: Setup

```bash
# In pilot app directory
npm install @redhorn/design-tokens @redhorn/react

# Import tokens in main file
# src/main.tsx or src/index.tsx
import '@redhorn/design-tokens/css/light';
```

#### Day 2-3: Pick One Feature

Choose a small, isolated feature to migrate first:

**Good candidates:**
- Login form (Button + Input)
- Search bar (Input + Button)
- Settings page section
- Modal/dialog with form

**Avoid:**
- Homepage (high visibility, high risk)
- Checkout flow (business critical)
- Complex forms with many components

#### Day 4-5: Implement

```tsx
// Before
<button className="btn-primary" onClick={handleLogin}>
  Log In
</button>
<input 
  type="email" 
  className="form-control"
  placeholder="Email"
/>

// After
import { Button, Input } from '@redhorn/react';

<Input 
  label="Email" 
  type="email"
  placeholder="your@email.com"
/>
<Button variant="primary" onClick={handleLogin}>
  Log In
</Button>
```

### Week 2: Expand and Evaluate

#### Day 6-8: Add More Features

Migrate 2-3 more features using Button and Input:
- Another form
- Navigation bar
- Action buttons

#### Day 9-10: Evaluation

**Collect metrics:**
- Bundle size before/after
- Build time before/after
- Developer satisfaction (survey)
- Bugs found

**Decision point:**
- ✅ If successful → proceed to Phase 2 (all React apps)
- ⚠️ If issues → fix and iterate
- ❌ If major problems → reassess approach

## Monitoring During Pilot

### Bundle Size

```bash
# Before
npm run build
# Note bundle size

# After adding design system
npm run build
# Compare bundle size
```

**Expected:**
- Tokens: +5 KB
- 2 Components: +15-20 KB
- **Total increase: ~20-25 KB**

### Performance

Monitor:
- Page load time
- Time to interactive
- First contentful paint

Should be negligible impact (< 50ms difference).

### Developer Experience

Survey pilot team:

**Questions:**
1. How easy was it to integrate? (1-5 scale)
2. Are components better than previous? (1-5 scale)
3. Would you recommend to other teams? (Yes/No)
4. What improvements would you suggest?
5. Any blockers or issues?

## Common Issues and Solutions

### Issue: Styles Don't Match

**Symptom:** Components look different from Storybook

**Solutions:**
1. Check global CSS isn't overriding
2. Verify tokens imported
3. Check data-theme attribute
4. Inspect computed styles

### Issue: Props Don't Work

**Symptom:** Passing props doesn't change component

**Solutions:**
1. Check prop names match (case-sensitive)
2. Verify TypeScript types
3. Check generated code for bugs
4. Review Mitosis component source

### Issue: Bundle Size Too Large

**Symptom:** App bundle increased by >50 KB

**Solutions:**
1. Verify tree-shaking works
2. Check if importing all components unnecessarily
3. Use dynamic imports for less-used components
4. Check for duplicate dependencies

## Documentation for Pilot Team

Create pilot-specific guide:

### Quick Reference Card

```markdown
# Design System Quick Start

## Install
npm install @redhorn/react

## Import Tokens
import '@redhorn/design-tokens/css/light';

## Use Components
import { Button, Input } from '@redhorn/react';

<Button variant="primary">Click</Button>
<Input label="Email" type="email" />

## Get Help
#design-system Slack channel
```

### Code Examples

Provide examples for common use cases:
- Form with validation
- Search bar
- Modal with buttons
- Table with action buttons

### Migration Checklist

For pilot team to track progress:

```markdown
- [ ] Install packages
- [ ] Import tokens
- [ ] Migrate login form
- [ ] Migrate search
- [ ] Migrate settings
- [ ] Test all features
- [ ] Deploy to staging
- [ ] QA testing
- [ ] Deploy to production
- [ ] Provide feedback
```

## After Pilot

### If Successful (Likely)

**Week 3:** Start Phase 2 - expand to remaining 4 React apps

**Actions:**
1. Share pilot learnings
2. Update integration guide based on feedback
3. Fix any issues discovered
4. Create rollout schedule for other apps

### If Issues Found

**Actions:**
1. Document issues clearly
2. Prioritize fixes
3. Update Mitosis components
4. Republish fixed version
5. Retry pilot

### If Major Problems

**Actions:**
1. Pause rollout
2. Reassess architecture
3. Consider alternatives
4. Don't proceed to other apps yet

## Success Indicators

**Green lights (proceed):**
- ✅ No bugs reported
- ✅ Team feedback positive
- ✅ Performance acceptable
- ✅ Bundle size reasonable
- ✅ Easy to integrate

**Yellow lights (fix before proceeding):**
- ⚠️ Minor bugs found
- ⚠️ Documentation unclear
- ⚠️ Some friction in DX
- ⚠️ Bundle size slightly high

**Red lights (pause rollout):**
- ❌ Critical bugs
- ❌ Performance issues
- ❌ Team strongly negative
- ❌ Cannot integrate
- ❌ Breaks existing features

## Rollout Schedule (After Pilot)

### Phase 2: All React Apps (Weeks 3-4)
- App 2: Week 3
- App 3: Week 3
- App 4: Week 4
- App 5: Week 4

### Phase 3: Angular Apps (Weeks 5-6)
- Angular App 1: Week 5
- Angular App 2: Week 6
- Angular App 3: Week 6

### Phase 4: React Native (Weeks 7-8)
- RN App 1: Week 7
- RN App 2: Week 8

### Phase 5: Ongoing Component Addition
- Week 9+: Add 3-5 components per week
- Target: 40+ components in 6 months

## Communication Template

### Pre-Pilot Email

```
Subject: Design System Pilot - [App Name]

Team,

We're piloting our new multi-framework design system in [App Name].

What: Button and Input components
When: Starting [Date]
Duration: 2 weeks
Impact: Low (isolated feature only)

Your role:
- Integrate components in [specific feature]
- Provide feedback
- Report any issues

Support: #design-system Slack channel

Preview components: [Chromatic URL]
Docs: [Documentation URL]
```

### Post-Pilot Report

```
Subject: Design System Pilot Complete - Results

Results from 2-week pilot in [App Name]:

✅ Successes:
- [Metric 1: e.g., 20 KB bundle size]
- [Metric 2: e.g., 5/5 developer satisfaction]
- [Metric 3: e.g., zero bugs found]

⚠️ Issues Found:
- [Issue 1: description and fix]
- [Issue 2: description and fix]

Next Steps:
- Fix identified issues
- Rollout to Apps 2-5 in Week 3-4

Questions? Reply or #design-system
```

## Lessons Learned Template

After pilot, document:

### What Went Well
- [Thing 1]
- [Thing 2]

### What Didn't Go Well
- [Thing 1: what we'll change]
- [Thing 2: what we'll change]

### Unexpected Discoveries
- [Discovery 1]
- [Discovery 2]

### Changes for Next Apps
- [Change 1]
- [Change 2]

## Resources

- Integration Guide: `docs/APP_INTEGRATION_GUIDE.md`
- Component Docs: https://design-system.redhorn.com
- Storybook Preview: [Chromatic URL]
- Support: #design-system Slack
