import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Input from './Input';
import styles from './Input.stories.module.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-border',
        'color-light-text-primary',
        'color-light-text-secondary',
        'color-light-error',
        'color-light-background',
      ],
      spacing: ['spacing-xs', 'spacing-sm', 'spacing-md'],
      typography: ['fontSize-sm', 'fontSize-body', 'fontWeight-regular'],
      borderRadius: ['borderRadius-md'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: 'md',
    placeholder: 'Medium size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllTypes = () => (
  <div className={styles.container}>
    <Input label="Text" type="text" placeholder="Text input" />
    <Input label="Email" type="email" placeholder="email@example.com" />
    <Input label="Password" type="password" placeholder="Password" />
    <Input label="Number" type="number" placeholder="123" />
    <Input label="Tel" type="tel" placeholder="(555) 555-5555" />
    <Input label="URL" type="url" placeholder="https://example.com" />
    <Input label="Search" type="search" placeholder="Search..." />
  </div>
);

export const AllSizes = () => (
  <div className={styles.container}>
    <Input label="Small" size="sm" placeholder="Small input" />
    <Input label="Medium" size="md" placeholder="Medium input" />
    <Input label="Large" size="lg" placeholder="Large input" />
  </div>
);

export const TypingInteractionTest: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter your username');
    
    // Test initial state
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveValue('');
    
    // Test typing
    await userEvent.type(input, 'johndoe');
    await expect(input).toHaveValue('johndoe');
    
    // Test clearing
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
  },
};

export const FocusBlurInteractionTest: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter email');
    
    // Test focus
    await input.focus();
    await expect(input).toHaveFocus();
    
    // Test blur
    await userEvent.tab();
    await expect(input).not.toHaveFocus();
  },
};

export const ErrorValidationTest: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: true,
    errorMessage: 'Please enter a valid email',
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test error message is displayed
    const errorMessage = canvas.getByText('Please enter a valid email');
    await expect(errorMessage).toBeInTheDocument();
    
    // Test input has aria-invalid
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

export const DisabledInputTest: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot type here',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Cannot type here');
    
    // Test disabled state
    await expect(input).toBeDisabled();
    
    // Verify user cannot type
    await userEvent.type(input, 'test');
    await expect(input).toHaveValue('');
  },
};


