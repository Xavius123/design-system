import React from 'react';
import Button from '@/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--ds-space-6)' }}>
      <h1 style={{ fontSize: 'var(--ds-font-size-2xl)', marginBottom: 'var(--ds-space-4)' }}>
        Welcome to Design System Demo
      </h1>
      <p style={{ fontSize: 'var(--ds-font-size-base)', color: 'var(--ds-color-text-secondary)', marginBottom: 'var(--ds-space-6)' }}>
        A responsive design system built with React, TypeScript, and CSS Modules.
      </p>
      <div style={{ display: 'flex', gap: 'var(--ds-space-3)' }}>
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
        <Button variant="ghost">Documentation</Button>
      </div>
    </div>
  );
};

export default HomePage;

