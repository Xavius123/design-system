import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Drawer from './Drawer';
import Navigation, { NavItem } from '../Navigation/Navigation';
import Button from '../Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    designTokens: {
      colors: [
        'color-light-background-primary',
        'color-light-text-primary',
      ],
      spacing: ['spacing-md'],
      borderRadius: ['borderRadius-button'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    open: {
      control: { type: 'boolean' },
    },
    showClose: {
      control: { type: 'boolean' },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Sample navigation items
const navItems: NavItem[] = [
  { id: '1', label: 'Dashboard', icon: '📊', href: '/', active: true },
  { id: '2', label: 'Projects', icon: '📁', href: '/projects' },
  { id: '3', label: 'Team', icon: '👥', href: '/team' },
  { id: '4', label: 'Calendar', icon: '📅', href: '/calendar' },
  { id: '5', label: 'Settings', icon: '⚙️', href: '/settings' },
];

// Interactive wrapper
const DrawerStory = ({ children, ...args }: any) => {
  const [open, setOpen] = useState(args.open !== undefined ? args.open : false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
          if (args.onClose) args.onClose();
        }}
      >
        {children}
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  args: {
    open: false,
    onClose: fn(),
    children: (
      <div style={{ padding: '24px' }}>
        <h2>Drawer Content</h2>
        <p>This is the drawer content.</p>
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const WithNavigation: Story = {
  args: {
    open: false,
    onClose: fn(),
    children: (
      <div style={{ padding: '16px' }}>
        <Navigation items={navItems} />
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const LeftSide: Story = {
  args: {
    open: false,
    onClose: fn(),
    side: 'left',
    children: (
      <div style={{ padding: '16px' }}>
        <Navigation items={navItems} />
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const RightSide: Story = {
  args: {
    open: false,
    onClose: fn(),
    side: 'right',
    children: (
      <div style={{ padding: '16px' }}>
        <Navigation items={navItems} />
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const WithCloseButton: Story = {
  args: {
    open: false,
    onClose: fn(),
    showClose: true,
    children: (
      <div style={{ padding: '16px' }}>
        <Navigation items={navItems} />
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const CustomWidth: Story = {
  args: {
    open: false,
    onClose: fn(),
    width: 400,
    showClose: true,
    children: (
      <div style={{ padding: '24px' }}>
        <h2>Wide Drawer</h2>
        <p>This drawer is 400px wide.</p>
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const NoOverlayClose: Story = {
  args: {
    open: false,
    onClose: fn(),
    closeOnOverlayClick: false,
    showClose: true,
    children: (
      <div style={{ padding: '24px' }}>
        <h2>No Overlay Close</h2>
        <p>Clicking the overlay won't close this drawer.</p>
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const NoEscapeClose: Story = {
  args: {
    open: false,
    onClose: fn(),
    closeOnEscape: false,
    showClose: true,
    children: (
      <div style={{ padding: '24px' }}>
        <h2>No ESC Close</h2>
        <p>Pressing ESC won't close this drawer.</p>
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const ScrollableContent: Story = {
  args: {
    open: false,
    onClose: fn(),
    showClose: true,
    children: (
      <div style={{ padding: '24px' }}>
        <h2>Long Content</h2>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

export const ComplexContent: Story = {
  args: {
    open: false,
    onClose: fn(),
    showClose: true,
    children: (
      <div>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e5e5' }}>
          <h2 style={{ margin: '0 0 8px 0' }}>Menu</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Navigate to different sections</p>
        </div>
        <div style={{ padding: '16px' }}>
          <Navigation items={navItems} />
        </div>
        <div style={{ padding: '24px', borderTop: '1px solid #e5e5e5' }}>
          <Button variant="primary" style={{ width: '100%' }}>
            Sign Out
          </Button>
        </div>
      </div>
    ),
  },
  render: (args) => <DrawerStory {...args} />,
};

// Interaction Tests

export const OpenCloseTest: Story = {
  args: {
    open: false,
    onClose: fn(),
    showClose: true,
    children: <div style={{ padding: '24px' }}>Drawer Content</div>,
  },
  render: (args) => <DrawerStory {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click open button
    const openButton = canvas.getByText('Open Drawer');
    await userEvent.click(openButton);
    
    // Wait for drawer to appear
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Find close button
    const closeButton = canvas.getByLabelText('Close drawer');
    await expect(closeButton).toBeInTheDocument();
    
    // Click close
    await userEvent.click(closeButton);
  },
};

export const OverlayClickTest: Story = {
  args: {
    open: false,
    onClose: fn(),
    closeOnOverlayClick: true,
    children: <div style={{ padding: '24px' }}>Click outside to close</div>,
  },
  render: (args) => <DrawerStory {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Open drawer
    const openButton = canvas.getByText('Open Drawer');
    await userEvent.click(openButton);
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 400));
  },
};

export const EscapeKeyTest: Story = {
  args: {
    open: true,
    onClose: fn(),
    closeOnEscape: true,
    children: <div style={{ padding: '24px' }}>Press ESC to close</div>,
  },
  play: async ({ args }) => {
    // Wait for drawer to mount
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Press Escape
    await userEvent.keyboard('{Escape}');
    
    // Verify close was called
    if (args.onClose) {
      await expect(args.onClose).toHaveBeenCalled();
    }
  },
};

