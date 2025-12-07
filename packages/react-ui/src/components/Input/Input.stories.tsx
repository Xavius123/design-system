import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentSize, InputType } from '@toyota/core';
import Input from './Input';
import styles from './Input.stories.module.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(InputType),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(ComponentSize),
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
    type: InputType.Email,
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
    type: InputType.Email,
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: InputType.Password,
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
    size: ComponentSize.Small,
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: ComponentSize.Medium,
    placeholder: 'Medium size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: ComponentSize.Large,
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
    <Input label="Text" type={InputType.Text} placeholder="Text input" />
    <Input label="Email" type={InputType.Email} placeholder="email@example.com" />
    <Input label="Password" type={InputType.Password} placeholder="Password" />
    <Input label="Number" type={InputType.Number} placeholder="123" />
    <Input label="Tel" type={InputType.Tel} placeholder="(555) 555-5555" />
    <Input label="URL" type={InputType.Url} placeholder="https://example.com" />
    <Input label="Search" type={InputType.Search} placeholder="Search..." />
  </div>
);

export const AllSizes = () => (
  <div className={styles.container}>
    <Input label="Small" size={ComponentSize.Small} placeholder="Small input" />
    <Input label="Medium" size={ComponentSize.Medium} placeholder="Medium input" />
    <Input label="Large" size={ComponentSize.Large} placeholder="Large input" />
  </div>
);

