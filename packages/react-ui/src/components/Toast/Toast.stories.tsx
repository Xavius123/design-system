import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import { Toaster, toast } from './Toast';
import Button from '../Button/Button';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-background',
        'color-light-border',
        'color-light-text-primary',
        'color-light-success',
        'color-light-error',
        'color-light-warning',
        'color-light-info',
      ],
      spacing: ['spacing-xs', 'spacing-sm', 'spacing-md'],
      typography: ['fontSize-sm', 'fontSize-md', 'fontWeight-semibold'],
      borderRadius: ['borderRadius-sm', 'borderRadius-md'],
      shadows: ['shadow-lg'],
      zIndex: ['zIndex-toast'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast.default('Event has been created')}>
      Show Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast.success('Successfully saved!')}>
      Show Success Toast
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button onClick={() => toast.error('Something went wrong')}>
      Show Error Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button onClick={() => toast.warning('Please review your changes')}>
      Show Warning Toast
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button onClick={() => toast.info('New update available')}>
      Show Info Toast
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button onClick={() => toast.loading('Loading...')}>
      Show Loading Toast
    </Button>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success('Event created', {
          description: 'Your event has been scheduled for tomorrow at 10:00 AM',
        })
      }
    >
      Toast with Description
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.default('Event created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo clicked'),
          },
        })
      }
    >
      Toast with Action
    </Button>
  ),
};

export const WithCancel: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.default('Unsaved changes', {
          description: 'You have unsaved changes. Do you want to save them?',
          action: {
            label: 'Save',
            onClick: () => console.log('Save clicked'),
          },
          cancel: {
            label: 'Discard',
            onClick: () => console.log('Discard clicked'),
          },
        })
      }
    >
      Toast with Cancel
    </Button>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => toast.default('Short (1s)', { duration: 1000 })}>
        1 Second
      </Button>
      <Button onClick={() => toast.default('Long (10s)', { duration: 10000 })}>
        10 Seconds
      </Button>
      <Button onClick={() => toast.default('Infinite', { duration: Infinity })}>
        Infinite
      </Button>
    </div>
  ),
};

export const Promise: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = new Promise((resolve) => {
          setTimeout(() => resolve({ name: 'John Doe' }), 2000);
        });

        toast.promise(promise, {
          loading: 'Loading data...',
          success: 'Data loaded successfully!',
          error: 'Failed to load data',
        });
      }}
    >
      Promise Toast
    </Button>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Button
      onClick={() => {
        toast.success('First toast');
        setTimeout(() => toast.info('Second toast'), 300);
        setTimeout(() => toast.warning('Third toast'), 600);
      }}
    >
      Multiple Toasts
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Button onClick={() => toast.default('Default toast')}>Default</Button>
      <Button onClick={() => toast.success('Success toast')}>Success</Button>
      <Button onClick={() => toast.error('Error toast')}>Error</Button>
      <Button onClick={() => toast.warning('Warning toast')}>Warning</Button>
      <Button onClick={() => toast.info('Info toast')}>Info</Button>
    </div>
  ),
};

// Interaction Tests
export const InteractionTest: Story = {
  render: () => (
    <Button onClick={() => toast.success('Test toast', { duration: 5000 })}>
      Show Test Toast
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the button
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    
    // Wait for toast to appear
    await waitFor(
      async () => {
        const toastElement = document.querySelector('[data-sonner-toast]');
        await expect(toastElement).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
};

export const DismissTest: Story = {
  render: () => {
    let toastId: string | number;
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          onClick={() => {
            toastId = toast.default('This toast can be dismissed', {
              duration: Infinity,
            });
          }}
        >
          Show Toast
        </Button>
        <Button variant="outline" onClick={() => toast.dismiss(toastId)}>
          Dismiss Toast
        </Button>
      </div>
    );
  },
};

export const CustomJSX: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.custom(
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--color-light-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              JD
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>John Doe</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Sent you a message
              </div>
            </div>
          </div>
        )
      }
    >
      Custom JSX Toast
    </Button>
  ),
};

