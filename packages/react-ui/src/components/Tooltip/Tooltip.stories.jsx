import React from 'react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    delayDuration: {
      control: { type: 'number' },
    },
  },
};

export const Default = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const AllPositions = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '100px', alignItems: 'center', padding: '100px' }}>
    <Tooltip content="Top tooltip" side="top">
      <Button>Top</Button>
    </Tooltip>
    <div style={{ display: 'flex', gap: '100px' }}>
      <Tooltip content="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
    <Tooltip content="Bottom tooltip" side="bottom">
      <Button>Bottom</Button>
    </Tooltip>
  </div>
);

export const WithInput = () => (
  <Tooltip content="Enter your email address">
    <Input label="Email" placeholder="email@example.com" />
  </Tooltip>
);

export const LongContent = {
  args: {
    content: 'This is a longer tooltip that contains more information and wraps to multiple lines if needed.',
    children: <Button>Hover for details</Button>,
  },
};

export const Disabled = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button>No tooltip</Button>,
  },
};

export const FastDelay = {
  args: {
    content: 'This tooltip appears quickly',
    delayDuration: 100,
    children: <Button>Fast tooltip</Button>,
  },
};

