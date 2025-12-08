import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-primary',
        'color-light-background',
        'color-light-border',
        'color-light-text-primary',
        'color-light-surface-hover',
      ],
      spacing: ['spacing-xs', 'spacing-sm', 'spacing-md', 'spacing-lg'],
      typography: ['fontSize-sm', 'fontSize-md', 'fontSize-lg'],
      borderRadius: ['borderRadius-sm', 'borderRadius-md'],
      shadows: ['shadow-lg'],
      zIndex: ['zIndex-dropdown'],
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
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const SelectWrapper = (props: any) => {
  const [value, setValue] = useState<string>(props.value || '');
  return <Select {...props} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    placeholder: 'Select a fruit',
  },
};

export const WithValue: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    value: 'banana',
    placeholder: 'Select a fruit',
  },
};

export const Small: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    size: 'sm',
    placeholder: 'Small select',
  },
};

export const Medium: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    size: 'md',
    placeholder: 'Medium select',
  },
};

export const Large: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    size: 'lg',
    placeholder: 'Large select',
  },
};

export const Disabled: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    disabled: true,
    placeholder: 'Disabled select',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape', disabled: true },
      { value: 'mango', label: 'Mango' },
    ],
    placeholder: 'Some options disabled',
  },
};

export const LongList: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
    ],
    placeholder: 'Select a country',
  },
};

// Interaction Tests
export const InteractionTest: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    placeholder: 'Click to open',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the select trigger
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeInTheDocument();
    
    // Click to open
    await userEvent.click(trigger);
    
    // Wait for dropdown to appear
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Select should be open
    await expect(trigger).toHaveAttribute('data-state', 'open');
  },
};

export const KeyboardNavigation: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: defaultOptions,
    placeholder: 'Use keyboard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Focus the select
    const trigger = canvas.getByRole('combobox');
    trigger.focus();
    
    // Open with Space key
    await userEvent.keyboard('{Space}');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    
    // Select with Enter
    await userEvent.keyboard('{Enter}');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Should be closed now
    await expect(trigger).toHaveAttribute('data-state', 'closed');
  },
};

// Visual comparison story
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SelectWrapper options={defaultOptions} size="sm" placeholder="Small" />
      <SelectWrapper options={defaultOptions} size="md" placeholder="Medium" />
      <SelectWrapper options={defaultOptions} size="lg" placeholder="Large" />
    </div>
  ),
};

