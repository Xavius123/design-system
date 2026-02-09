#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Please provide a component name');
  console.log('Usage: npm run generate:component <ComponentName>');
  console.log('Example: npm run generate:component Checkbox');
  process.exit(1);
}

// Validate component name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be in PascalCase (e.g., Checkbox, SelectDropdown)');
  process.exit(1);
}

const componentDir = join(rootDir, 'source', 'redhorn-components', 'src', 'components', componentName);

if (existsSync(componentDir)) {
  console.error(`❌ Error: Component "${componentName}" already exists`);
  process.exit(1);
}

console.log(`\n🚀 Generating component: ${componentName}\n`);

// Create component directory
mkdirSync(componentDir, { recursive: true });

// Generate .lite.tsx file
const liteTemplate = `/** @jsxImportSource @builder.io/mitosis */
import { useStore } from '@builder.io/mitosis';
import styles from './${componentName}.module.css';

export interface ${componentName}Props {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: any;
  className?: string;
}

export default function ${componentName}(props: ${componentName}Props) {
  const state = useStore({
    get variantClass() {
      return props.variant || 'default';
    },
    get sizeClass() {
      return props.size || 'md';
    },
    get computedClasses() {
      const classes = [
        styles.${componentName.toLowerCase()},
        styles[state.variantClass],
        styles[state.sizeClass],
        props.className || '',
      ];
      return classes.filter(Boolean).join(' ');
    },
  });

  return (
    <div className={state.computedClasses}>
      {props.children}
    </div>
  );
}
`;

writeFileSync(join(componentDir, `${componentName}.lite.tsx`), liteTemplate);
console.log(`✓ Created ${componentName}.lite.tsx`);

// Generate .module.css file
const cssTemplate = `.${componentName.toLowerCase()} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  transition: all 0.2s ease;
}

/* Variants */
.default {
  background: var(--color-gray-100);
  color: var(--color-gray-900);
  border: 1px solid var(--color-gray-300);
}

.primary {
  background: var(--color-primary-500);
  color: var(--color-white);
  border: 1px solid var(--color-primary-500);
}

/* Sizes */
.sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
}

.md {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
}

.lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-lg);
}

/* States */
.${componentName.toLowerCase()}:hover:not(:disabled) {
  opacity: 0.9;
}

.${componentName.toLowerCase()}:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;

writeFileSync(join(componentDir, `${componentName}.module.css`), cssTemplate);
console.log(`✓ Created ${componentName}.module.css`);

// Generate .stories.jsx file
const storiesDir = join(rootDir, 'packages', 'react', 'stories');
const storiesTemplate = `import ${componentName} from '../src/components/${componentName}/${componentName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: '${componentName} variant style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '${componentName} size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the ${componentName.toLowerCase()}',
    },
  },
};

export const Default = {
  args: {
    variant: 'default',
    children: '${componentName}',
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: '${componentName}',
  },
};

export const Small = {
  args: {
    size: 'sm',
    children: 'Small ${componentName}',
  },
};

export const Medium = {
  args: {
    size: 'md',
    children: 'Medium ${componentName}',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large ${componentName}',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled ${componentName}',
  },
};
`;

writeFileSync(join(storiesDir, `${componentName}.stories.jsx`), storiesTemplate);
console.log(`✓ Created ${componentName}.stories.jsx`);

// Generate .mdx file
const mdxTemplate = `import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ${componentName}Stories from './${componentName}.stories';

<Meta of={${componentName}Stories} />

# ${componentName}

Multi-framework ${componentName.toLowerCase()} component generated from Mitosis.

## Live Preview (React)

<Canvas of={${componentName}Stories.Default} />

### Variants

<Canvas of={${componentName}Stories.Default} />
<Canvas of={${componentName}Stories.Primary} />

### Sizes

<Canvas of={${componentName}Stories.Small} />
<Canvas of={${componentName}Stories.Medium} />
<Canvas of={${componentName}Stories.Large} />

### Disabled State

<Canvas of={${componentName}Stories.Disabled} />

## Props

<Controls of={${componentName}Stories} />

---

## Installation & Usage

### React

\`\`\`bash
npm install @redhorn/design-tokens @redhorn/react
\`\`\`

\`\`\`jsx
import { ${componentName} } from '@redhorn/react';

function App() {
  return (
    <${componentName} variant="primary">
      ${componentName} Content
    </${componentName}>
  );
}
\`\`\`

### Angular

\`\`\`typescript
import { ${componentName}Component } from '@redhorn/angular';

@Component({
  imports: [${componentName}Component],
  template: \`
    <redhorn-${componentName.toLowerCase()} variant="primary">
      ${componentName} Content
    </redhorn-${componentName.toLowerCase()}>
  \`
})
\`\`\`

### Vue 3

\`\`\`vue
<template>
  <${componentName} variant="primary">
    ${componentName} Content
  </${componentName}>
</template>

<script setup>
import { ${componentName} } from '@redhorn/vue';
</script>
\`\`\`

### React Native

\`\`\`jsx
import { ${componentName} } from '@redhorn/react-native';

export default function App() {
  return (
    <${componentName} variant="primary">
      ${componentName} Content
    </${componentName}>
  );
}
\`\`\`

---

## Source Code

- **Mitosis Source**: \`source/redhorn-components/src/components/${componentName}/${componentName}.lite.tsx\`
- **React Output**: \`packages/react/src/components/${componentName}/${componentName}.tsx\`
- **Angular Output**: \`packages/angular/src/components/${componentName}/${componentName}.ts\`
- **Vue Output**: \`packages/vue/src/components/${componentName}/${componentName}.vue\`
- **React Native Output**: \`packages/react-native/src/components/${componentName}/${componentName}.tsx\`
`;

writeFileSync(join(storiesDir, `${componentName}.mdx`), mdxTemplate);
console.log(`✓ Created ${componentName}.mdx`);

// Instructions
console.log(`\n✅ Component "${componentName}" generated successfully!\n`);
console.log('Next steps:');
console.log('1. Edit the component logic in:');
console.log(`   source/redhorn-components/src/components/${componentName}/${componentName}.lite.tsx\n`);
console.log('2. Build the component:');
console.log('   npm run build:mitosis\n');
console.log('3. Preview in Storybook:');
console.log('   npm run storybook\n');
console.log('4. Update index exports in:');
console.log('   - packages/react/src/index.js');
console.log('   - packages/angular/src/index.ts');
console.log('   - packages/vue/src/index.js');
console.log('   - packages/react-native/src/index.js\n');
