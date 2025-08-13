import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible input component with multiple variants, sizes, and states.

## Features
- **Variants**: Default, Filled, Outline
- **Sizes**: Small, Medium, Large
- **States**: Default, Focus, Error, Disabled
- **Accessibility**: Proper labels, error messages, and helper text

## Usage
\`\`\`tsx
import { Input } from './Input';

// Basic usage
<Input placeholder="Enter text..." />

// With label and helper text
<Input label="Email" helperText="We'll never share your email" />

// With error state
<Input label="Password" error="Password is required" />

// With variant and size
<Input variant="filled" size="large" label="Username" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline'],
      description: 'The visual style variant of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    label: {
      control: 'text',
      description: 'The label text displayed above the input',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input style. Use this for most form inputs.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a label. Always provide labels for accessibility.',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Must be at least 3 characters long',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with helper text to provide additional guidance to users.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters long',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with error state. Use this to display validation errors.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement;
    const input = canvas.querySelector('input');
    if (input) {
      input.focus();
    }
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Input',
    placeholder: 'This input has a filled background',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filled input variant with a subtle background color.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Input',
    placeholder: 'This input has a thicker border',
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline input variant with a thicker border for emphasis.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Input',
    placeholder: 'Small size input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small input size. Use this in compact layouts.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Input',
    placeholder: 'Large size input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large input size. Use this for prominent form fields.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input state. Use this when the field is not available.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input variant="default" label="Default" placeholder="Default variant" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
      <Input variant="outline" label="Outline" placeholder="Outline variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input size="small" label="Small" placeholder="Small size" />
      <Input size="medium" label="Medium" placeholder="Medium size" />
      <Input size="large" label="Large" placeholder="Large size" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input sizes displayed together for comparison.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Input label="Full Name" placeholder="Enter your full name" />
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input label="Password" type="password" error="Password is required" />
      <Input label="Bio" placeholder="Tell us about yourself" helperText="Optional" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how inputs look together in a form context.',
      },
    },
  },
};
