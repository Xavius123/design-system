import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonVariant, ComponentSize } from '@toyota/core';
import Button from './Button';
import styles from './Button.stories.module.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
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

