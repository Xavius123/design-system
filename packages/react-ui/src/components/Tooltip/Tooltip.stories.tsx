import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import Tooltip, { TooltipProvider } from './Tooltip';
import Button from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    designTokens: {
      colors: [
        'color-light-text-primary',
        'color-light-text-inverse',
      ],
      spacing: ['spacing-xs', 'spacing-sm'],
      typography: ['fontSize-sm'],
      borderRadius: ['borderRadius-md'],
      shadows: ['shadow-md'],
      zIndex: ['zIndex-tooltip'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    showArrow: {
      control: { type: 'boolean' },
    },
    delayDuration: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    side: 'top',
    children: <Button>Top</Button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    side: 'right',
    children: <Button>Right</Button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <Button>Bottom</Button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    side: 'left',
    children: <Button>Left</Button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    content: 'No arrow on this tooltip',
    showArrow: false,
    children: <Button>No Arrow</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a much longer tooltip with multiple words that will wrap to multiple lines when it exceeds the maximum width.',
    children: <Button>Long Content</Button>,
  },
};

export const OnDisabledButton: Story = {
  args: {
    content: 'Tooltips work on disabled elements too',
    children: (
      <span style={{ cursor: 'not-allowed' }}>
        <Button disabled>Disabled Button</Button>
      </span>
    ),
  },
};

export const CustomDelay: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delayDuration: 1000,
    children: <Button>Slow Delay</Button>,
  },
};

export const InstantDelay: Story = {
  args: {
    content: 'This tooltip appears instantly',
    delayDuration: 0,
    children: <Button>Instant</Button>,
  },
};

export const OnIcon: Story = {
  args: {
    content: 'Help information',
    children: (
      <button
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--color-light-text-secondary)',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 14V10M10 6H10.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    ),
  },
};

// Interaction Tests
export const InteractionTest: Story = {
  args: {
    content: 'Test tooltip',
    delayDuration: 100,
    children: <Button>Hover Test</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find the button
    const button = canvas.getByRole('button', { name: /hover test/i });
    await expect(button).toBeInTheDocument();
    
    // Hover over button
    await userEvent.hover(button);
    
    // Wait for tooltip to appear (delay + animation)
    await waitFor(
      async () => {
        const tooltip = document.querySelector('[role="tooltip"]');
        await expect(tooltip).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
};

// Visual comparison story
export const AllSides: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '60px',
      padding: '60px',
    }}>
      <Tooltip content="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const AllAlignments: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '60px',
    }}>
      <Tooltip content="Start aligned" side="bottom" align="start">
        <Button>Start Alignment</Button>
      </Tooltip>
      <Tooltip content="Center aligned" side="bottom" align="center">
        <Button>Center Alignment</Button>
      </Tooltip>
      <Tooltip content="End aligned" side="bottom" align="end">
        <Button>End Alignment</Button>
      </Tooltip>
    </div>
  ),
};

