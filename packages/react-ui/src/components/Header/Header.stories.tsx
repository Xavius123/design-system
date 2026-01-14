import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    designTokens: {
      colors: [
        'color-light-background-primary',
        'color-light-text-primary',
        'color-light-border-primary',
        'color-light-accent-primary',
      ],
      spacing: ['spacing-sm', 'spacing-md'],
      borderRadius: ['borderRadius-button'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    fixed: {
      control: { type: 'boolean' },
    },
    showBurger: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Helper components for demo
const Logo = () => (
  <div style={{ fontWeight: 600, fontSize: '18px', color: '#eb0a1e' }}>
    Brand
  </div>
);

const SearchBar = () => (
  <input
    type="search"
    placeholder="Search..."
    style={{
      width: '100%',
      maxWidth: '400px',
      padding: '8px 12px',
      border: '1px solid #e5e5e5',
      borderRadius: '6px',
      fontSize: '14px',
    }}
  />
);

const UserMenu = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <button
      style={{
        padding: '8px 16px',
        background: 'transparent',
        border: '1px solid #e5e5e5',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      Login
    </button>
    <button
      style={{
        padding: '8px 16px',
        background: '#eb0a1e',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      Sign Up
    </button>
  </div>
);

const NavLinks = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <a href="/" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>
      Home
    </a>
    <a href="/products" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>
      Products
    </a>
    <a href="/about" style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }}>
      About
    </a>
  </div>
);

export const Default: Story = {
  args: {
    start: <Logo />,
    end: <UserMenu />,
  },
};

export const WithBurger: Story = {
  args: {
    showBurger: true,
    onBurgerClick: fn(),
    start: <Logo />,
    end: <UserMenu />,
  },
};

export const WithSearch: Story = {
  args: {
    start: <Logo />,
    center: <SearchBar />,
    end: <UserMenu />,
  },
};

export const WithNavLinks: Story = {
  args: {
    start: <Logo />,
    center: <NavLinks />,
    end: <UserMenu />,
  },
};

export const Fixed: Story = {
  args: {
    start: <Logo />,
    center: <SearchBar />,
    end: <UserMenu />,
    fixed: true,
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ padding: '80px 20px' }}>
          <h2>Scroll down to see fixed header</h2>
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    start: <Logo />,
    end: <UserMenu />,
    height: 'sm',
  },
};

export const Medium: Story = {
  args: {
    start: <Logo />,
    end: <UserMenu />,
    height: 'md',
  },
};

export const Large: Story = {
  args: {
    start: <Logo />,
    center: <SearchBar />,
    end: <UserMenu />,
    height: 'lg',
  },
};

export const AllHeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ padding: '8px', margin: 0 }}>Small (48px)</h4>
        <Header start={<Logo />} end={<UserMenu />} height="sm" />
      </div>
      <div>
        <h4 style={{ padding: '8px', margin: 0 }}>Medium (64px)</h4>
        <Header start={<Logo />} end={<UserMenu />} height="md" />
      </div>
      <div>
        <h4 style={{ padding: '8px', margin: 0 }}>Large (80px)</h4>
        <Header start={<Logo />} end={<UserMenu />} height="lg" />
      </div>
    </div>
  ),
};

export const MobileLayout: Story = {
  args: {
    showBurger: true,
    onBurgerClick: fn(),
    start: <Logo />,
    end: (
      <button
        style={{
          padding: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        👤
      </button>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DesktopLayout: Story = {
  args: {
    start: <Logo />,
    center: <NavLinks />,
    end: <UserMenu />,
  },
};

// Interaction Tests

export const BurgerClickTest: Story = {
  args: {
    showBurger: true,
    onBurgerClick: fn(),
    start: <Logo />,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Find burger button
    const burgerButton = canvas.getByLabelText('Toggle navigation');
    await expect(burgerButton).toBeInTheDocument();
    
    // Click burger
    await userEvent.click(burgerButton);
    
    // Verify callback was called
    if (args.onBurgerClick) {
      await expect(args.onBurgerClick).toHaveBeenCalled();
    }
  },
};

export const KeyboardNavigationTest: Story = {
  args: {
    showBurger: true,
    onBurgerClick: fn(),
    start: <Logo />,
    end: <UserMenu />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Tab to burger button
    const burgerButton = canvas.getByLabelText('Toggle navigation');
    await burgerButton.focus();
    await expect(burgerButton).toHaveFocus();
    
    // Press Enter
    await userEvent.keyboard('{Enter}');
  },
};

export const ResponsiveTest: Story = {
  args: {
    showBurger: true,
    onBurgerClick: fn(),
    start: <Logo />,
    center: <SearchBar />,
    end: <UserMenu />,
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1920], // Test multiple viewports
    },
  },
};

