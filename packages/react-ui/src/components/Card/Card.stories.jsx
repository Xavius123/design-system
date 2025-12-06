import React from 'react';
import Card from './Card';
import Button from '../Button/Button';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    elevated: {
      control: { type: 'boolean' },
    },
    interactive: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    children: 'This is a basic card with default padding.',
  },
};

export const WithContent = {
  args: {
    padding: 'md',
    children: (
      <>
        <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Card Title</h2>
        <p style={{ margin: 0, color: 'var(--color-light-text-secondary)' }}>
          This is a card with a title and some content. Cards are useful for grouping related information.
        </p>
      </>
    ),
  },
};

export const Elevated = {
  args: {
    elevated: true,
    padding: 'md',
    children: (
      <>
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Elevated Card</h3>
        <p style={{ margin: 0, color: 'var(--color-light-text-secondary)' }}>
          This card has elevation with a shadow effect.
        </p>
      </>
    ),
  },
};

export const Interactive = {
  args: {
    interactive: true,
    padding: 'md',
    children: (
      <>
        <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Interactive Card</h3>
        <p style={{ margin: 0, color: 'var(--color-light-text-secondary)' }}>
          Hover over this card to see the interactive effect.
        </p>
      </>
    ),
  },
};

export const WithButton = {
  args: {
    padding: 'md',
    elevated: true,
    children: (
      <>
        <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Card with Action</h3>
        <p style={{ margin: '0 0 16px 0', color: 'var(--color-light-text-secondary)' }}>
          Cards can contain interactive elements like buttons.
        </p>
        <Button variant="primary" size="sm">Action</Button>
      </>
    ),
  },
};

export const PaddingSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Card padding="sm">
      <strong>Small Padding</strong>
      <p style={{ margin: 0, fontSize: '14px' }}>This card has small padding.</p>
    </Card>
    <Card padding="md">
      <strong>Medium Padding</strong>
      <p style={{ margin: 0, fontSize: '14px' }}>This card has medium padding (default).</p>
    </Card>
    <Card padding="lg">
      <strong>Large Padding</strong>
      <p style={{ margin: 0, fontSize: '14px' }}>This card has large padding.</p>
    </Card>
  </div>
);

