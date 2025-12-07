import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ButtonVariant, ComponentSize } from '@toyota/core';
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
      options: Object.values(ButtonVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(ComponentSize),
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
    variant: ButtonVariant.Primary,
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.Secondary,
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: ButtonVariant.Ghost,
    children: 'Ghost Button',
  },
};

export const Outline: Story = {
  args: {
    variant: ButtonVariant.Outline,
    children: 'Outline Button',
  },
};

export const Small: Story = {
  args: {
    size: ComponentSize.Small,
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: ComponentSize.Medium,
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: ComponentSize.Large,
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
    <Button variant={ButtonVariant.Primary}>Primary</Button>
    <Button variant={ButtonVariant.Secondary}>Secondary</Button>
    <Button variant={ButtonVariant.Ghost}>Ghost</Button>
    <Button variant={ButtonVariant.Outline}>Outline</Button>
  </div>
);

export const AllSizes = () => (
  <div className={styles.container}>
    <Button size={ComponentSize.Small}>Small</Button>
    <Button size={ComponentSize.Medium}>Medium</Button>
    <Button size={ComponentSize.Large}>Large</Button>
  </div>
);

export const WithInteractionTest: Story = {
  args: {
    variant: ButtonVariant.Primary,
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
    variant: ButtonVariant.Primary,
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
    variant: ButtonVariant.Primary,
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

