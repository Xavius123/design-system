import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states.

## Features
- **Variants**: Primary, Secondary, Ghost, Outline, Danger, Success
- **Sizes**: Small, Medium, Large
- **States**: Default, Hover, Disabled
- **Accessibility**: Proper ARIA attributes and keyboard navigation support

## Usage
\`\`\`tsx
import { Button } from './Button';

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="secondary" size="large">Large Secondary</Button>

// With custom styling
<Button style={{ backgroundColor: 'purple' }}>Custom Button</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    children: {
      control: 'text',
      description: 'The content to display inside the button',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the button is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default primary button style. Use this for the main action in a section or form.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button style. Use this for secondary actions that are less prominent than the primary action.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost button with transparent background. Use this for subtle actions that don\'t compete with primary content.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline button with border. Use this for actions that need to be visible but not dominant.',
      },
    },
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger button for destructive actions. Use this sparingly for actions that can\'t be undone.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success button for positive actions. Use this for confirmations or successful operations.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small button size. Use this in compact layouts or for less important actions.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large button size. Use this for prominent calls-to-action or in spacious layouts.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled button state. Use this when the action is not available or the form is invalid.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.',
      },
    },
  },
};

export const WithCustomStyle: Story = {
  args: {
    variant: 'primary',
    children: 'Custom Styled Button',
    style: {
      fontSize: '18px',
      padding: '12px 24px',
      borderRadius: '20px',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom inline styles. Use this for one-off styling needs.',
      },
    },
  },
};
