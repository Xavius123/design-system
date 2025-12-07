import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Checkbox from './Checkbox';
import styles from './Checkbox.stories.module.css';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-primary',
        'color-light-border',
        'color-light-text-primary',
        'color-light-error',
        'color-light-background',
      ],
      spacing: ['spacing-xs', 'spacing-sm'],
      typography: ['fontSize-body', 'fontSize-sm'],
      borderRadius: ['borderRadius-sm'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
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
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Checkbox',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    size: 'lg',
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
    <Checkbox label="Small" size="sm" />
    <Checkbox label="Medium" size="md" />
    <Checkbox label="Large" size="lg" />
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

export const CheckUncheckInteractionTest: Story = {
  args: {
    label: 'Accept terms',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    
    // Test initial unchecked state
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();
    
    // Test checking
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    
    // Test unchecking
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const KeyboardNavigationTest: Story = {
  args: {
    label: 'Keyboard test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    
    // Test focus
    await checkbox.focus();
    await expect(checkbox).toHaveFocus();
    
    // Test Space key to check
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
    
    // Test Space key to uncheck
    await userEvent.keyboard(' ');
    await expect(checkbox).not.toBeChecked();
  },
};

export const DisabledCheckboxTest: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    
    // Test disabled state
    await expect(checkbox).toBeDisabled();
    
    // Verify user cannot check
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const IndeterminateStateTest: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
    
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Indeterminate (click to cycle)"
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    
    // Test initial indeterminate state
    await expect(checkbox).toBeInTheDocument();
    
    // Test clicking cycles through states
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const ErrorStateTest: Story = {
  args: {
    label: 'Required checkbox',
    error: true,
    errorMessage: 'You must accept the terms',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test error message is displayed
    const errorMessage = canvas.getByText('You must accept the terms');
    await expect(errorMessage).toBeInTheDocument();
    
    // Test checkbox has aria-invalid
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  },
};


