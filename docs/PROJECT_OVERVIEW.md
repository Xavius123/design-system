# Project Overview

## Design System Summary

**Name**: Redhorn Design System  
**Purpose**: Multi-framework component library  
**Approach**: Write once in Mitosis, generate for 4 frameworks  
**Team Size**: 1-2 developers  
**Apps Served**: 10+ (5 React, 3 Angular, 2 React Native, future Vue)

## Key Concepts

### Single Source of Truth

Edit components in: `packages/_redhorn-components/src/components/`

### Four Framework Outputs

Every Mitosis component generates:
1. **React** - Web applications
2. **Angular** - Enterprise web apps
3. **Vue 3** - Future Vue apps
4. **React Native** - Mobile applications

### Synchronized Versions

All packages version together:
- v1.0.0 - Button, Input (all frameworks)
- v1.1.0 - Add Checkbox (all frameworks)
- v1.2.0 - Add Badge (all frameworks)

## Package Architecture

### Published to NPM (5 packages)

| Package | Purpose | Apps |
|---------|---------|------|
| `@redhorn/design-tokens` | CSS + JS tokens | All |
| `@redhorn/react` | React components | 5 |
| `@redhorn/angular` | Angular components | 3 |
| `@redhorn/vue` | Vue 3 components | Future |
| `@redhorn/react-native` | Mobile components | 2 |

### Private (1 package)

| Package | Purpose |
|---------|---------|
| `@redhorn/redhorn-components` | Mitosis source (not published) |

## Technology Stack

- **Mitosis** - Component compiler
- **Changesets** - Version management
- **Storybook** - Component preview
- **Style Dictionary** - Token generation
- **GitHub Actions** - CI/CD automation
- **npm** - Package registry

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run build:tokens` | Generate design tokens |
| `npm run build:mitosis` | Generate all framework components |
| `npm run build:all` | Build everything |
| `npm run storybook` | Preview components |
| `npx changeset` | Create version bump |
| `npm run publish:all` | Publish to npm |

## Current Components

- Button (4 variants, 3 sizes)
- Input (multiple types, validation)

## Component Development Process

1. Create `.lite.tsx` in `packages/_redhorn-components/src/components/`
2. Write Mitosis-compatible JSX
3. Create matching `.module.css` for styles
4. Run `npm run build:mitosis`
5. Create MDX story in `packages/react/stories/`
6. Preview in Storybook
7. Create changeset
8. Publish to npm

## Key Constraints

### Mitosis Limitations

Mitosis supports a subset of React features:
- ✅ JSX, props, state (useStore)
- ✅ Computed values (getters)
- ✅ Event handlers
- ✅ CSS Modules
- ❌ useEffect, useRef
- ❌ Context API
- ❌ External dependencies

See `docs/MITOSIS_GUIDELINES.md` for details.

### Framework Differences

Components must work across all 4 frameworks:
- Keep logic simple
- Avoid framework-specific APIs
- Use CSS for styling (not framework styles)
- Test in multiple frameworks

## Rollout Strategy

### Phase 1: Pilot (Weeks 1-2)
- 1 React app
- 2 components

### Phase 2: React Expansion (Weeks 3-4)
- Remaining 4 React apps

### Phase 3: Angular (Weeks 5-6)
- 3 Angular apps

### Phase 4: React Native (Weeks 7-8)
- 2 React Native apps

### Phase 5: Component Growth (Ongoing)
- Add 3-5 components per week
- Target: 40+ components in 6 months

## Success Metrics

**Current state:**
- 2 components working
- 4 frameworks supported
- Ready to publish

**6-month goal:**
- 40+ components
- All 10 apps using design system
- 1 person maintaining
- Weekly releases

## File Organization

### Root
- Essential docs only (README, CHANGELOG, CONTRIBUTING)
- Build configs

### docs/
- All documentation files
- Guides and references

### packages/_redhorn-components/
- Mitosis source components
- Component development

### packages/react/
- Generated React components
- Storybook stories and config

### Other framework packages
- Generated components only
- Minimal config

## Resources

- **Documentation**: See `docs/` folder
- **Cursor Rules**: See `.cursor/rules/`
- **Components**: See `packages/_redhorn-components/src/components/`
- **Examples**: Run `npm run storybook`
