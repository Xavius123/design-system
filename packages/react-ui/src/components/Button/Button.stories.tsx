import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Button from './Button';
import styles from './Button.stories.module.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-primary',
        'color-light-secondary',
        'color-light-text-primary',
        'color-light-text-inverse',
        'color-light-border',
      ],
      spacing: ['spacing-sm', 'spacing-md', 'spacing-lg'],
      typography: ['fontSize-body', 'fontWeight-semibold'],
      borderRadius: ['borderRadius-md'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const AllVariants = () => (
  <div className={styles.container}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="outline">Outline</Button>
  </div>
);

export const AllSizes = () => (
  <div className={styles.container}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const WithInteractionTest: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test initial state
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Click me');
    await expect(button).not.toBeDisabled();
    
    // Test click interaction
    await userEvent.click(button);
    
    // Test button is still in document after click
    await expect(button).toBeInTheDocument();
  },
};

export const DisabledInteractionTest: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test disabled state
    await expect(button).toBeDisabled();
    await expect(button).toHaveTextContent('Disabled');
  },
};

export const FocusInteractionTest: Story = {
  args: {
    variant: 'primary',
    children: 'Focus Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test focus
    await button.focus();
    await expect(button).toHaveFocus();
    
    // Test keyboard interaction (Enter key)
    await userEvent.keyboard('{Enter}');
  },
};

