import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible card component for displaying content in contained boxes.

## Features
- **Variants**: Default, Elevated, Outlined, Filled
- **Padding**: None, Small, Medium, Large
- **Interactive**: Hover effects for elevated and default variants
- **Flexible**: Accepts any content as children

## Usage
\`\`\`tsx
import { Card } from './Card';

// Basic usage
<Card>Simple content</Card>

// With variant and padding
<Card variant="elevated" padding="large">
  <h3>Title</h3>
  <p>Content goes here</p>
</Card>

// With custom styling
<Card style={{ maxWidth: '400px' }}>
  Custom styled card
</Card>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'The visual style variant of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'The padding size inside the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    children: {
      control: 'text',
      description: 'The content to display inside the card',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default card with medium padding.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default card style with a subtle border and medium padding.',
      },
    },
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with shadow and hover effects.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Elevated card with shadow that lifts on hover for interactive feel.',
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card with a thicker border.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Outlined card with a prominent border for emphasis.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'This is a filled card with a subtle background color.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filled card with a subtle background color for visual separation.',
      },
    },
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: 'This card has no padding.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with no padding for full-width content.',
      },
    },
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'small',
    children: 'This card has small padding.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with small padding for compact layouts.',
      },
    },
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'large',
    children: 'This card has large padding for spacious layouts.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with large padding for spacious, comfortable layouts.',
      },
    },
  },
};

export const WithContent: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-light-text-primary)' }}>
          Card Title
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color-light-text-secondary)' }}>
          This is a card with structured content including a title, description, and action buttons.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="primary" size="small">Primary Action</Button>
          <Button variant="ghost" size="small">Secondary Action</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with structured content including title, description, and action buttons.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card variant="default" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Default</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Subtle border</p>
      </Card>
      <Card variant="elevated" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Elevated</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>With shadow</p>
      </Card>
      <Card variant="outlined" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Outlined</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Thick border</p>
      </Card>
      <Card variant="filled" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Filled</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Background color</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card variants displayed together for comparison.',
      },
    },
  },
};

export const AllPaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card padding="none" style={{ width: '150px' }}>
        <div style={{ padding: '1rem', background: 'var(--color-light-background-secondary)', borderRadius: '4px' }}>
          No padding
        </div>
      </Card>
      <Card padding="small" style={{ width: '150px' }}>
        Small padding
      </Card>
      <Card padding="medium" style={{ width: '150px' }}>
        Medium padding
      </Card>
      <Card padding="large" style={{ width: '150px' }}>
        Large padding
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All padding sizes displayed together for comparison.',
      },
    },
  },
};
