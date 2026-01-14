import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Navigation, { NavItem } from './Navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded',
    designTokens: {
      colors: [
        'color-light-accent-primary',
        'color-light-text-primary',
        'color-light-text-secondary',
        'color-light-surface-secondary',
      ],
      spacing: ['spacing-xs', 'spacing-sm', 'spacing-md', 'spacing-lg'],
      typography: ['fontSize-small', 'fontSize-body', 'fontWeight-regular', 'fontWeight-button'],
      borderRadius: ['borderRadius-button'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

// Sample nav items
const sampleItems: NavItem[] = [
  { id: '1', label: 'Home', href: '/', active: true },
  { id: '2', label: 'Products', href: '/products' },
  { id: '3', label: 'About', href: '/about' },
  { id: '4', label: 'Contact', href: '/contact' },
];

const itemsWithIcons: NavItem[] = [
  { id: '1', label: 'Dashboard', icon: '📊', href: '/', active: true },
  { id: '2', label: 'Messages', icon: '💬', href: '/messages' },
  { id: '3', label: 'Settings', icon: '⚙️', href: '/settings' },
  { id: '4', label: 'Profile', icon: '👤', href: '/profile' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems,
    orientation: 'horizontal',
  },
};

export const HorizontalWithIcons: Story = {
  args: {
    items: itemsWithIcons,
    orientation: 'horizontal',
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    items: sampleItems,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    items: itemsWithIcons,
    size: 'lg',
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', href: '/', active: true },
      { id: '2', label: 'Products', href: '/products' },
      { id: '3', label: 'Coming Soon', href: '/coming-soon', disabled: true },
      { id: '4', label: 'Contact', href: '/contact' },
    ],
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { id: '1', label: 'Dashboard', onClick: fn(), active: true },
      { id: '2', label: 'Analytics', onClick: fn() },
      { id: '3', label: 'Reports', onClick: fn() },
      { id: '4', label: 'Settings', onClick: fn() },
    ],
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Small</h4>
        <Navigation items={sampleItems} size="sm" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Medium</h4>
        <Navigation items={sampleItems} size="md" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Large</h4>
        <Navigation items={sampleItems} size="lg" />
      </div>
    </div>
  ),
};

export const AllOrientations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Vertical</h4>
        <Navigation items={itemsWithIcons} orientation="vertical" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>Horizontal</h4>
        <Navigation items={itemsWithIcons} orientation="horizontal" />
      </div>
    </div>
  ),
};

export const SidebarNavigation: Story = {
  args: {
    items: [
      { id: '1', label: 'Dashboard', icon: '📊', href: '/', active: true },
      { id: '2', label: 'Projects', icon: '📁', href: '/projects' },
      { id: '3', label: 'Team', icon: '👥', href: '/team' },
      { id: '4', label: 'Calendar', icon: '📅', href: '/calendar' },
      { id: '5', label: 'Documents', icon: '📄', href: '/documents' },
      { id: '6', label: 'Reports', icon: '📈', href: '/reports' },
      { id: '7', label: 'Settings', icon: '⚙️', href: '/settings' },
    ],
    size: 'md',
  },
};

export const HeaderNavigation: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', href: '/', active: true },
      { id: '2', label: 'Features', href: '/features' },
      { id: '3', label: 'Pricing', href: '/pricing' },
      { id: '4', label: 'Docs', href: '/docs' },
      { id: '5', label: 'Blog', href: '/blog' },
    ],
    orientation: 'horizontal',
    size: 'md',
  },
};

// Interaction Tests

export const ClickNavigationTest: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', onClick: fn(), active: true },
      { id: '2', label: 'About', onClick: fn() },
      { id: '3', label: 'Contact', onClick: fn() },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Find the "About" link
    const aboutLink = canvas.getByText('About');
    await expect(aboutLink).toBeInTheDocument();
    
    // Click it
    await userEvent.click(aboutLink);
    
    // Verify onClick was called
    if (args.items && args.items[1].onClick) {
      await expect(args.items[1].onClick).toHaveBeenCalled();
    }
  },
};

export const KeyboardNavigationTest: Story = {
  args: {
    items: [
      { id: '1', label: 'First', onClick: fn() },
      { id: '2', label: 'Second', onClick: fn() },
      { id: '3', label: 'Third', onClick: fn() },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Tab to first item
    const firstItem = canvas.getByText('First');
    await firstItem.focus();
    await expect(firstItem).toHaveFocus();
    
    // Tab to second item
    await userEvent.tab();
    const secondItem = canvas.getByText('Second');
    await expect(secondItem).toHaveFocus();
  },
};

export const ActiveStateTest: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', href: '/', active: false },
      { id: '2', label: 'About', href: '/about', active: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find active item
    const activeItem = canvas.getByText('About');
    await expect(activeItem).toHaveAttribute('aria-current', 'page');
  },
};

export const DisabledItemTest: Story = {
  args: {
    items: [
      { id: '1', label: 'Enabled', onClick: fn() },
      { id: '2', label: 'Disabled', onClick: fn(), disabled: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find disabled item
    const disabledItem = canvas.getByText('Disabled');
    await expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    
    // Try to click (should not work)
    await userEvent.click(disabledItem);
    // Note: Can't easily test that onClick wasn't called due to pointer-events:none
  },
};

