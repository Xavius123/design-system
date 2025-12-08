import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Dialog from './Dialog';
import Button from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-primary',
        'color-light-background',
        'color-light-border',
        'color-light-text-primary',
        'color-light-text-secondary',
      ],
      spacing: ['spacing-md', 'spacing-lg'],
      typography: ['fontSize-md', 'fontSize-xl', 'fontWeight-bold'],
      borderRadius: ['borderRadius-md', 'borderRadius-lg'],
      shadows: ['shadow-xl'],
      zIndex: ['zIndex-dialogOverlay', 'zIndex-dialogContent'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWrapper = (props: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog {...props} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Dialog Title',
    description: 'This is a description of the dialog content.',
    children: (
      <div>
        <p>Dialog content goes here.</p>
      </div>
    ),
  },
};

export const WithoutDescription: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Simple Dialog',
    children: (
      <div>
        <p>This dialog has no description.</p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    children: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    ),
  },
};

export const Small: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Small Dialog',
    size: 'sm',
    children: (
      <div>
        <p>This is a small dialog.</p>
      </div>
    ),
  },
};

export const Medium: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Medium Dialog',
    size: 'md',
    children: (
      <div>
        <p>This is a medium dialog (default).</p>
      </div>
    ),
  },
};

export const Large: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Large Dialog',
    size: 'lg',
    children: (
      <div>
        <p>This is a large dialog.</p>
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Extra Large Dialog',
    size: 'xl',
    children: (
      <div>
        <p>This is an extra large dialog.</p>
      </div>
    ),
  },
};

export const FullScreen: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Full Screen Dialog',
    size: 'full',
    children: (
      <div>
        <p>This dialog takes up most of the screen.</p>
      </div>
    ),
  },
};

export const LongContent: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Long Content Dialog',
    description: 'This dialog has scrollable content.',
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    ),
  },
};

export const WithForm: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'User Registration',
    description: 'Please fill out the form below.',
    children: (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>Name</label>
          <input
            id="name"
            type="text"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>Email</label>
          <input
            id="email"
            type="email"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="outline" type="button">Cancel</Button>
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </form>
    ),
  },
};

// Interaction Tests
export const InteractionTest: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Test Dialog',
    children: <p>Test content</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the open button
    const openButton = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(openButton);
    
    // Wait for dialog animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Dialog should be visible
    const dialog = document.querySelector('[role="dialog"]');
    await expect(dialog).toBeInTheDocument();
  },
};

export const CloseWithEscape: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Press ESC to close',
    children: <p>Try pressing the Escape key</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open dialog
    const openButton = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(openButton);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Press Escape
    await userEvent.keyboard('{Escape}');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Dialog should be closed
    const dialog = document.querySelector('[role="dialog"]');
    await expect(dialog).not.toBeInTheDocument();
  },
};

export const CloseButton: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Click X to close',
    showCloseButton: true,
    children: <p>Click the X button in the header</p>,
  },
};

