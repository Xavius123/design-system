import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppShell from '@/framework/AppShell';
import Button from '@/ui/Button';
import HomePage from '@/pages/HomePage';
import ComponentsPage from '@/pages/ComponentsPage';
import DocsPage from '@/pages/DocsPage';
import SettingsPage from '@/pages/SettingsPage';

const AppContent: React.FC<{ theme: 'light' | 'dark'; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', href: '/', active: location.pathname === '/' },
    { id: 'components', label: 'Components', href: '/components', active: location.pathname === '/components' },
    { id: 'docs', label: 'Documentation', href: '/docs', active: location.pathname === '/docs' },
    { id: 'settings', label: 'Settings', href: '/settings', active: location.pathname === '/settings' },
  ];

  return (
    <AppShell
      navItems={navItems}
      headerStart={
        <h1 style={{ fontSize: 'var(--ds-font-size-lg)', fontWeight: 'var(--ds-font-weight-bold)', margin: 0 }}>
          Design System
        </h1>
      }
      headerCenter={
        <input 
          placeholder="Search..." 
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: 'var(--ds-space-2) var(--ds-space-3)',
            border: '1px solid var(--ds-color-border)',
            borderRadius: 'var(--ds-radius-md)',
            background: 'var(--ds-color-background)',
            color: 'var(--ds-color-text-primary)',
            fontSize: 'var(--ds-font-size-sm)',
          }}
        />
      }
      headerEnd={
        <Button onClick={toggleTheme} variant="ghost" size="sm">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      }
      navBottom={
        <div>v1.0.0</div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AppShell>
  );
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div data-ds-root data-theme={theme}>
      <BrowserRouter>
        <AppContent theme={theme} toggleTheme={toggleTheme} />
      </BrowserRouter>
    </div>
  );
}

export default App;

