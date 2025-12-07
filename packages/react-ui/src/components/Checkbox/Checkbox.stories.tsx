import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentSize } from '@toyota/core';
import Checkbox from './Checkbox';
import styles from './Checkbox.stories.module.css';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the terms',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: true,
    errorMessage: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: ComponentSize.Small,
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Checkbox',
    size: ComponentSize.Medium,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    size: ComponentSize.Large,
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
    
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Indeterminate state (click to toggle)"
      />
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className={styles.container}>
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
          label="Controlled Checkbox"
        />
        <p>Checked: {String(checked)}</p>
      </div>
    );
  },
};

export const AllSizes = () => (
  <div className={styles.container}>
    <Checkbox label="Small" size={ComponentSize.Small} />
    <Checkbox label="Medium" size={ComponentSize.Medium} />
    <Checkbox label="Large" size={ComponentSize.Large} />
  </div>
);

export const AllStates = () => (
  <div className={styles.container}>
    <Checkbox label="Unchecked" />
    <Checkbox label="Checked" defaultChecked />
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Disabled Checked" disabled defaultChecked />
    <Checkbox label="Error" error errorMessage="This field is required" />
  </div>
);

