# Redhorn Design System

> Multi-framework component library powered by Mitosis - Write once, run everywhere

[![npm version](https://img.shields.io/npm/v/@redhorn/react.svg)](https://www.npmjs.com/package/@redhorn/react)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**Simplified Setup:** Focus on Mitosis components, generated outputs, and Storybook

## Overview

A design system that generates components for **React**, **Angular**, **Vue 3**, and **React Native** from a single source using [Mitosis](https://github.com/BuilderIO/mitosis).

**Maintained by:** 1-2 developers  
**Serves:** 10+ applications (5 React, 3 Angular, 2 React Native, Vue support)  
**Philosophy:** Write once, maintain once, deploy everywhere

## 📦 Published Packages

| Package | Version | Framework | Install |
|---------|---------|-----------|---------|
| [@redhorn/design-tokens](https://npmjs.com/package/@redhorn/design-tokens) | 1.0.0 | All | `npm i @redhorn/design-tokens` |
| [@redhorn/react](https://npmjs.com/package/@redhorn/react) | 1.0.0 | React | `npm i @redhorn/react` |
| [@redhorn/angular](https://npmjs.com/package/@redhorn/angular) | 1.0.0 | Angular | `npm i @redhorn/angular` |
| [@redhorn/react-native](https://npmjs.com/package/@redhorn/react-native) | 1.0.0 | React Native | `npm i @redhorn/react-native` |
| [@redhorn/vue](https://npmjs.com/package/@redhorn/vue) | 1.0.0 | Vue 3 | `npm i @redhorn/vue` |

## 🚀 Quick Start

### For React Apps

```bash
npm install @redhorn/design-tokens @redhorn/react
```

```tsx
// Import tokens in your main file
import '@redhorn/design-tokens/css/light';

// Use components
import { Button, Input } from '@redhorn/react';

function App() {
  return (
    <div>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

### For Vue Apps

```bash
npm install @redhorn/design-tokens @redhorn/vue
```

```vue
<script setup>
import '@redhorn/design-tokens/css/light';
import { Button, Input } from '@redhorn/vue';
</script>

<template>
  <div>
    <Input label="Email" type="email" />
    <Button variant="primary">Submit</Button>
  </div>
</template>
```

### For Angular Apps

```bash
npm install @redhorn/design-tokens @redhorn/angular
```

```typescript
// styles.css
@import '@redhorn/design-tokens/css/light';

// component.ts
import { ButtonComponent } from '@redhorn/angular/button';

@Component({
  imports: [ButtonComponent],
  template: '<app-button variant="primary">Submit</app-button>'
})
```

### For React Native Apps

```bash
npm install @redhorn/design-tokens @redhorn/react-native
```

```tsx
import { Button } from '@redhorn/react-native';

<Button variant="primary" onPress={handleSubmit}>
  Submit
</Button>
```

## 🎨 Available Components

### v1.0.0 (Current)

- **Button** - Multi-variant button with 3 sizes
- **Input** - Text input with label, validation, helper text

### Coming Soon

- Checkbox
- Radio
- Switch
- Badge
- Tag
- Avatar
- Card
- Alert
- Toast

## 📖 Documentation

- **[Simplified Setup](SIMPLIFIED_SETUP.md)** - Quick start guide ⭐
- **[Mitosis Guidelines](docs/MITOSIS_GUIDELINES.md)** - Component development patterns
- **[App Integration Guide](docs/APP_INTEGRATION_GUIDE.md)** - How to use packages in your apps
- **[Publishing Guide](docs/PUBLISHING_GUIDE.md)** - How to publish new versions
- **[Pilot Rollout Plan](docs/PILOT_ROLLOUT.md)** - Gradual adoption strategy

## 🏗️ Architecture

```
Edit Source → Build → Preview → Publish
     ↓            ↓        ↓         ↓
mitosis-      generate  Storybook  npm
components    4 outputs  preview   packages
```

```
packages/_redhorn-components/    (Edit here - at top of list!)
        ↓
    npm run build:mitosis
        ↓
┌───────┬─────────┬──────────────┬─────┐
│ React │ Angular │ React Native │ Vue │
└───────┴─────────┴──────────────┴─────┘
        ↓
   npm publish
        ↓
   10+ Apps Consume
```

## 💻 Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build everything (tokens + generated components)
npm run build:all

# Preview in Storybook
npm run storybook
```

Opens Storybook at http://localhost:6007 showing generated React components.

### Adding a New Component

```bash
# 1. Create Redhorn component
mkdir packages/_redhorn-components/src/components/Badge
code packages/_redhorn-components/src/components/Badge/Badge.lite.tsx
code packages/_redhorn-components/src/components/Badge/Badge.module.css

# 2. Generate outputs for all frameworks
npm run build:mitosis

# 3. Preview in Storybook
npm run storybook

# 4. Publish
npx changeset           # Create version bump
npm run version         # Apply versions
npm run publish:all     # Publish to npm
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run build:tokens` | Build design tokens (CSS + JSON) |
| `npm run build:mitosis` | Generate React/Angular/RN components |
| `npm run build:all` | Build tokens + Mitosis |
| `npm run publish:all` | Publish all 4 packages to npm |
| `npm run version` | Bump versions with Changesets |
| `npm run release` | Build + Publish (for CI) |

## 🔄 Release Process

### Automated (Recommended)

1. Edit component in `packages/mitosis-components/`
2. Create changeset: `npx changeset`
3. Push to main
4. GitHub Actions creates release PR
5. Merge PR → auto-publishes to npm

### Manual

```bash
# 1. Create changeset
npx changeset

# 2. Version packages
npm run version

# 3. Publish
npm login
npm run publish:all
```

## 🎯 Rollout Plan

### Phase 1: Pilot (Weeks 1-2)
- ✅ 1 React app
- ✅ 2 components (Button, Input)
- ✅ Collect feedback

### Phase 2: Expand React (Weeks 3-4)
- ⏳ Remaining 4 React apps
- ⏳ Monitor adoption

### Phase 3: Angular (Weeks 5-6)
- ⏳ 3 Angular apps
- ⏳ Document Angular-specific patterns

### Phase 4: React Native (Weeks 7-8)
- ⏳ 2 React Native apps
- ⏳ Test on iOS and Android

### Phase 5: Component Growth (Ongoing)
- ⏳ Add 3-5 components per week
- ⏳ Target: 40+ components in 6 months

## 📊 Benefits

**For Design System Team (1-2 people):**
- Write 1 component → deploy to 3 frameworks
- 1 bug fix → fixed everywhere
- 60-70% less maintenance work

**For App Teams:**
- Install from npm like any package
- TypeScript support built-in
- Consistent UX across all apps
- Regular updates and improvements

**For Business:**
- Faster feature development
- Brand consistency
- Reduced technical debt
- Easier engineer onboarding

## 🛠️ Technology Stack

- **[Mitosis](https://github.com/BuilderIO/mitosis)** - Component compiler (React, Angular, Vue, React Native)
- **[Changesets](https://github.com/changesets/changesets)** - Version management
- **[Storybook](https://storybook.js.org/)** - Component preview
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD
- **[npm](https://npmjs.com)** - Package registry
- **[Style Dictionary](https://amzn.github.io/style-dictionary/)** - Token generation

## 📁 Repository Structure

```
design-system/
├── packages/
│   ├── _redhorn-components/    # ⭐ SOURCE - Edit here
│   │   ├── src/components/
│   │   │   ├── Button/
│   │   │   └── Input/
│   │   └── mitosis.config.js
│   ├── angular/                # 📦 Published (generated)
│   ├── react/                  # 📦 Published (generated)
│   │   ├── src/components/     # Generated from Mitosis
│   │   └── stories/            # Storybook stories
│   ├── react-native/           # 📦 Published (generated)
│   ├── tokens/                 # 📦 Published
│   └── vue/                    # 📦 Published (generated)
├── .github/workflows/          # CI/CD pipeline
├── .changeset/                 # Version management
└── docs/                       # Documentation
```

## 🤝 Contributing

### For Design System Team

1. Edit components in `packages/mitosis-components/`
2. Follow [Mitosis Guidelines](docs/MITOSIS_GUIDELINES.md)
3. Test in Storybook
4. Create changeset
5. Push to main

### For App Teams

1. Report issues on GitHub
2. Request features in #design-system Slack
3. Share feedback on adoption

## 📝 Versioning

All packages use synchronized semantic versioning:

- **1.0.0** → Initial release (Button, Input)
- **1.1.0** → Add Checkbox (minor)
- **1.0.1** → Fix Button bug (patch)
- **2.0.0** → Breaking change (major)

## 🔗 Links

- **NPM Packages:** https://www.npmjs.com/org/redhorn
- **Storybook:** Run `npm run storybook` locally
- **GitHub:** https://github.com/redhorn/design-system
- **Issues:** https://github.com/redhorn/design-system/issues

## 📞 Support

- **Slack:** #design-system
- **Email:** design-system@redhorn.com
- **Issues:** GitHub Issues
- **Docs:** See `docs/` folder

## 📄 License

ISC © Redhorn Design System Team

---

**Status:** ✅ Production Ready - v1.0.0 published

**Last Updated:** February 8, 2026
