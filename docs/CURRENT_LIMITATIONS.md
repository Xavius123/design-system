# Current Limitations & Roadmap

## Production-Ready Packages

### ✅ @redhorn/design-tokens
**Status:** Fully functional  
**Components:** N/A (tokens only)  
**Notes:** CSS and JS outputs working perfectly

### ✅ @redhorn/react
**Status:** Ready for testing  
**Components:** Button, Input  
**Notes:** 
- CSS Modules working
- Index exports created
- Storybook documentation complete
- TypeScript types working

### ⚠️ @redhorn/angular
**Status:** Generated, needs testing  
**Components:** Button, Input  
**Notes:**
- Generated from Mitosis
- Standalone components
- Not yet tested in real Angular app
- May need minor adjustments

### ⚠️ @redhorn/vue
**Status:** Generated, needs testing  
**Components:** Button, Input  
**Notes:**
- Generated from Mitosis
- Vue 3 Composition API
- Not yet tested in real Vue app
- May need minor adjustments

### ❌ @redhorn/react-native
**Status:** Not functional (CSS imports won't work)  
**Components:** None working  
**Notes:**
- Mitosis generates CSS Module imports
- React Native doesn't support CSS files
- Needs manual StyleSheet implementation
- Deferred until web frameworks are battle-tested

---

## Component Library Status

### Current Components (2)
- ✅ Button - All variants and sizes working
- ✅ Input - All types and states working

### Planned Components (Coming Later)
After Button + Input are verified in real apps:

**Phase 2 (5 components):**
- Checkbox
- Radio
- Select
- Alert
- Card

**Phase 3 (10 components):**
- Modal
- Tooltip
- Badge
- Avatar
- Tabs
- Breadcrumb
- Pagination
- Divider
- Spinner
- Toast

**Phase 4 (20+ components):**
- Table
- Drawer
- Menu
- Dropdown
- Switch
- Slider
- Progress
- Accordion
- Chip
- etc.

**Target:** 40-50 components over 6 months

---

## Known Issues

### React Native Package
**Issue:** Generated code has CSS Module imports that don't work in RN

**Impact:** React Native apps can't use the package

**Workaround:** None currently

**Solution Options:**
1. Manual RN component implementation (separate from Mitosis)
2. Mitosis overrides (attempted, inconsistent)
3. CSS-to-StyleSheet converter (need to build)
4. Wait for Mitosis improvements

**Decision:** Defer until web frameworks proven in production

---

### Angular Component Names
**Issue:** Angular exports use `ButtonComponent` not `Button`

**Impact:** Import syntax differs from React/Vue

**Current:**
```typescript
import { ButtonComponent } from '@redhorn/angular';
```

**Ideal:**
```typescript
import { Button } from '@redhorn/angular';
```

**Fix:** Update index exports or accept different naming

---

### Storybook Port
**Issue:** Running on port 6012 due to conflicts

**Impact:** None (just documentation needs updating)

**Note:** Port 6007 is occupied by another process on development machine

---

## Framework Compatibility

### What Works Everywhere

**These Mitosis features work across all web frameworks:**
- ✅ Props and TypeScript interfaces
- ✅ CSS Modules
- ✅ Event handlers (onClick, onChange)
- ✅ Conditional rendering
- ✅ Computed values (useStore getters)
- ✅ Children prop
- ✅ className/class attribute

### What Doesn't Work in Mitosis

**Avoid these (won't compile to all frameworks):**
- ❌ useEffect / lifecycle hooks
- ❌ useRef / refs
- ❌ Context API
- ❌ External dependencies
- ❌ Complex state management
- ❌ Async operations
- ❌ Browser-specific APIs

**For complex features:** Use framework-specific code or different architecture

---

## Testing Infrastructure

### Current State
**Missing:**
- ❌ No unit tests
- ❌ No testing library
- ❌ No visual regression tests
- ❌ No E2E tests

**Quality Gates Working:**
- ✅ ESLint (code quality)
- ✅ Prettier (formatting)
- ✅ TypeScript (type checking)
- ✅ Pre-commit hooks

**Recommendation:** Add Vitest + Testing Library after packages proven working

---

## Documentation Status

### Complete Documentation ✅
- `README.md` - Project overview
- `CONTRIBUTING.md` - Contribution guide
- `docs/MITOSIS_GUIDELINES.md` - Component development
- `docs/APP_INTEGRATION_GUIDE.md` - Usage instructions
- `docs/PUBLISHING_GUIDE.md` - Release process
- `docs/PILOT_ROLLOUT.md` - Rollout strategy
- `docs/PROJECT_OVERVIEW.md` - Architecture
- `docs/CURSOR_RULES.md` - AI development standards

### Missing Documentation
- Migration guide (from other component libraries)
- Performance best practices
- Accessibility guidelines
- Component contribution templates
- Testing guide

---

## Realistic Timeline

### Week 1 (Current)
- [x] Set up infrastructure
- [x] Create Button + Input
- [x] Add quality gates (ESLint, Prettier)
- [ ] Test React package locally
- [ ] Fix any critical bugs

### Week 2
- [ ] Test Angular package
- [ ] Test Vue package
- [ ] Pilot in 1 React app
- [ ] Collect feedback
- [ ] Document learnings

### Week 3-4
- [ ] Add testing infrastructure
- [ ] Add 3-5 more components
- [ ] Fix issues from pilot
- [ ] Prepare for wider rollout

### Month 2
- [ ] Add 10+ components
- [ ] Roll out to 3-5 apps
- [ ] Publish to npm
- [ ] Consider React Native support

### Month 3-6
- [ ] Reach 30-40 components
- [ ] All 8 web apps using system
- [ ] Community adoption (if open source)
- [ ] Mature ecosystem

---

## Realistic Expectations

### What You Have Now (Week 1)
- 2 components
- 3 frameworks (web)
- Full tooling
- Ready for testing

### What You Need (Month 1)
- 10 components
- Tested in 1-2 apps
- Some bugs fixed
- Team feedback

### What Success Looks Like (Month 6)
- 40+ components
- 8 apps using it
- Smooth workflow
- 1-2 person maintenance

---

## The Simple Truth

**You have:**
- ✅ Great architecture
- ✅ Solid foundation
- ✅ 2 working components
- ✅ Professional tooling

**You need:**
- Real-world testing
- Bug fixes from usage
- Gradual component addition
- Team adoption

**Don't:**
- Add 50 components immediately
- Try to support RN before web works
- Over-engineer before validating
- Skip testing phase

**Do:**
- Test Button + Input in React app NOW
- Fix any bugs found
- Add 3-5 components at a time
- Let real usage guide priorities

---

**Keep it simple. Test it real. Scale it gradually.** 🎯
