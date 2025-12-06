# Storybook Best Practices Guide

## Story Organization

### 1. Story Hierarchy

**Recommended Structure (from Shopify Polaris & Adobe Spectrum):**

```
Components/
├── Button/
│   ├── Default
│   ├── Variants
│   ├── Sizes
│   ├── States
│   └── Interactive
├── Input/
│   ├── Default
│   ├── With Label
│   ├── Error States
│   └── Responsive
└── Checkbox/
    ├── Default
    ├── Grouped
    └── Controlled
```

### 2. Story Naming Convention

```jsx
// ✅ GOOD: Descriptive, hierarchical
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const SmallSize = { args: { size: 'sm' } };
export const DisabledState = { args: { disabled: true } };

// ❌ BAD: Vague names
export const Story1 = {};
export const Test = {};
```

---

## Story Configuration

### Complete Story Template

```jsx
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component for triggering actions. Supports multiple variants, sizes, and states.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};
```

---

## Story Variants Pattern

### 1. Basic Variants

```jsx
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```

### 2. Size Variants

```jsx
export const Small = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};
```

### 3. State Variants

```jsx
export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};
```

### 4. Interactive Stories

```jsx
import { useState } from 'react';

export const Controlled = () => {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  );
};

export const WithForm = () => {
  const [value, setValue] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert(value); }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text..."
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

### 5. Composition Stories

```jsx
export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="outline">Outline</Button>
  </div>
);

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);
```

---

## Responsive Stories

### 1. Viewport Addon

```jsx
export default {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1920px', height: '1080px' },
        },
      },
    },
  },
};

export const Responsive = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  render: () => (
    <div style={{ width: '100%', padding: '16px' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};
```

### 2. Container Queries

```jsx
export const ContainerResponsive = () => (
  <div style={{ containerType: 'inline-size', width: '100%' }}>
    <div style={{ width: '200px', border: '1px solid #ccc', padding: '16px' }}>
      <Button>Narrow Container</Button>
    </div>
    <div style={{ width: '600px', border: '1px solid #ccc', padding: '16px', marginTop: '16px' }}>
      <Button>Wide Container</Button>
    </div>
  </div>
);
```

---

## Accessibility Stories

### 1. ARIA Examples

```jsx
export const WithAriaLabel = {
  args: {
    'aria-label': 'Close dialog',
    children: '×',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with aria-label for icon-only buttons.',
      },
    },
  },
};

export const KeyboardNavigation = {
  parameters: {
    docs: {
      description: {
        story: 'Button supports keyboard navigation. Press Enter or Space to activate.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};
```

### 2. Focus States

```jsx
export const FocusVisible = {
  parameters: {
    docs: {
      description: {
        story: 'Focus indicator is visible when navigating with keyboard.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.tab();
    // Focus should be visible
  },
};
```

---

## MDX Documentation

### Component Documentation Page

```mdx
import { Meta, Story, Canvas, Controls, ArgsTable } from '@storybook/blocks';
import Button from './Button';

<Meta title="Components/Button" component={Button} />

# Button

The Button component is used to trigger actions throughout the interface.

## Usage

Buttons should be used for primary actions, while links should be used for navigation.

<Canvas>
  <Story name="Default">
    <Button>Click me</Button>
  </Story>
</Canvas>

## Variants

Buttons come in four variants:

<Canvas>
  <Story name="Primary">
    <Button variant="primary">Primary</Button>
  </Story>
  <Story name="Secondary">
    <Button variant="secondary">Secondary</Button>
  </Story>
  <Story name="Ghost">
    <Button variant="ghost">Ghost</Button>
  </Story>
  <Story name="Outline">
    <Button variant="outline">Outline</Button>
  </Story>
</Canvas>

## Props

<Controls />

<ArgsTable of={Button} />

## Accessibility

- Supports keyboard navigation (Enter, Space)
- Proper ARIA attributes
- Visible focus indicators
- Screen reader friendly

## Related Components

- [Link](./?path=/docs/components-link--docs)
- [IconButton](./?path=/docs/components-iconbutton--docs)
```

---

## Advanced Patterns

### 1. Decorators

```jsx
export default {
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};
```

### 2. Global Decorators

```js
// .storybook/preview.js
export const decorators = [
  (Story) => (
    <div data-theme="light">
      <Story />
    </div>
  ),
];
```

### 3. Theme Switching

Use the Storybook toolbar theme selector, or programmatically:

```jsx
import { useTheme } from '@toyota/react-ui';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <Button onClick={toggleTheme}>
        Toggle Theme (Current: {theme})
      </Button>
      <Button variant="primary">Primary Button</Button>
    </div>
  );
};
```

See [STORYBOOK_THEMING.md](./STORYBOOK_THEMING.md) for complete theming guide.

---

## Testing in Storybook

### 1. Interaction Testing

```jsx
import { userEvent, within, expect } from '@storybook/test';

export const Clicked = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    // Assert something happened
  },
};
```

### 2. Accessibility Testing

```jsx
import { expect } from '@storybook/test';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export const Accessibility = {
  play: async ({ canvasElement }) => {
    const { container } = canvasElement;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  },
};
```

---

## Storybook Configuration

### Main Configuration

```js
// .storybook/main.js
export default {
  stories: ['../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials', // Includes: actions, controls, docs, viewport, backgrounds, measure, outline
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y', // Accessibility testing
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
```

### Available Addons

See [STORYBOOK_ADDONS.md](./STORYBOOK_ADDONS.md) for complete addon documentation.

### Preview Configuration

```js
// .storybook/preview.js
import '../src/styles/global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
      tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      desktop: { name: 'Desktop', styles: { width: '1920px', height: '1080px' } },
    },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ padding: '20px' }}>
      <Story />
    </div>
  ),
];
```

---

## Best Practices Summary

1. **Organize by component** - One story file per component
2. **Cover all variants** - Every prop combination should have a story
3. **Document interactions** - Show how components work together
4. **Test accessibility** - Use a11y addon and interaction tests
5. **Responsive examples** - Show components at different sizes
6. **Use MDX** - For comprehensive documentation
7. **Auto-docs** - Enable autodocs tag for automatic documentation
8. **Clear naming** - Descriptive story names
9. **Interactive examples** - Show real-world usage
10. **Accessibility focus** - Document ARIA patterns

Following these patterns ensures your Storybook is professional, comprehensive, and useful for both developers and designers.

