import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './Sidebar';
import Navigation, { NavItem } from '../Navigation/Navigation';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    designTokens: {
      colors: [
        'color-light-background-primary',
        'color-light-border-primary',
        'color-light-text-secondary',
      ],
      spacing: ['spacing-md'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    bordered: {
      control: { type: 'boolean' },
    },
    width: {
      control: { type: 'number' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Sample navigation items
const navItems: NavItem[] = [
  { id: '1', label: 'Dashboard', icon: '📊', href: '/', active: true },
  { id: '2', label: 'Projects', icon: '📁', href: '/projects' },
  { id: '3', label: 'Team', icon: '👥', href: '/team' },
  { id: '4', label: 'Calendar', icon: '📅', href: '/calendar' },
  { id: '5', label: 'Documents', icon: '📄', href: '/documents' },
  { id: '6', label: 'Reports', icon: '📈', href: '/reports' },
  { id: '7', label: 'Settings', icon: '⚙️', href: '/settings' },
];

const Logo = () => (
  <div style={{ fontWeight: 600, fontSize: '20px', color: '#eb0a1e' }}>
    Brand
  </div>
);

const Version = () => (
  <div style={{ fontSize: '12px', color: '#666' }}>
    v1.0.0
  </div>
);

export const Default: Story = {
  args: {
    children: <Navigation items={navItems} />,
  },
};

export const WithHeader: Story = {
  args: {
    header: <Logo />,
    children: <Navigation items={navItems} />,
  },
};

export const WithFooter: Story = {
  args: {
    children: <Navigation items={navItems} />,
    footer: <Version />,
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <Logo />,
    children: <Navigation items={navItems} />,
    footer: <Version />,
  },
};

export const RightSide: Story = {
  args: {
    side: 'right',
    header: <Logo />,
    children: <Navigation items={navItems} />,
    footer: <Version />,
  },
};

export const CustomWidth: Story = {
  args: {
    width: 300,
    header: <Logo />,
    children: <Navigation items={navItems} />,
    footer: <Version />,
  },
};

export const NoBorder: Story = {
  args: {
    bordered: false,
    header: <Logo />,
    children: <Navigation items={navItems} />,
    footer: <Version />,
  },
};

export const ScrollableContent: Story = {
  args: {
    header: <Logo />,
    children: (
      <div>
        <Navigation
          items={Array.from({ length: 30 }, (_, i) => ({
            id: `${i}`,
            label: `Item ${i + 1}`,
            icon: '📄',
            href: `#${i}`,
            active: i === 0,
          }))}
        />
      </div>
    ),
    footer: <Version />,
  },
};

export const ComplexContent: Story = {
  args: {
    header: (
      <div>
        <Logo />
        <input
          type="search"
          placeholder="Search..."
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '12px',
            border: '1px solid #e5e5e5',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </div>
    ),
    children: (
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: '#666' }}>
          MAIN
        </h3>
        <Navigation
          items={navItems.slice(0, 4)}
        />
        <h3 style={{ fontSize: '12px', fontWeight: 600, margin: '16px 0 8px', color: '#666' }}>
          WORKSPACE
        </h3>
        <Navigation
          items={navItems.slice(4)}
        />
      </div>
    ),
    footer: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eb0a1e' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>John Doe</div>
            <div style={{ fontSize: '12px', color: '#666' }}>john@example.com</div>
          </div>
        </div>
        <Version />
      </div>
    ),
  },
};

export const MinimalSidebar: Story = {
  args: {
    children: (
      <Navigation
        items={[
          { id: '1', icon: '📊', label: '', href: '/', active: true },
          { id: '2', icon: '📁', label: '', href: '/projects' },
          { id: '3', icon: '👥', label: '', href: '/team' },
          { id: '4', icon: '⚙️', label: '', href: '/settings' },
        ]}
      />
    ),
    width: 60,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', height: '600px' }}>
      <Sidebar
        header={<Logo />}
        footer={<Version />}
        width={240}
      >
        <Navigation items={navItems} />
      </Sidebar>
      <Sidebar
        side="right"
        header={<Logo />}
        footer={<Version />}
        width={240}
      >
        <Navigation items={navItems} />
      </Sidebar>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

