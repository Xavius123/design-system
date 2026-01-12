import React from 'react';
import Button from '@/ui/Button';

const ComponentsPage: React.FC = () => {
  return (
    <div style={{ padding: 'var(--ds-space-6)' }}>
      <h1 style={{ fontSize: 'var(--ds-font-size-2xl)', marginBottom: 'var(--ds-space-4)' }}>
        Components
      </h1>
      
      <section style={{ marginBottom: 'var(--ds-space-8)' }}>
        <h2 style={{ fontSize: 'var(--ds-font-size-xl)', marginBottom: 'var(--ds-space-3)' }}>
          Buttons
        </h2>
        <div style={{ display: 'flex', gap: 'var(--ds-space-3)', marginBottom: 'var(--ds-space-4)' }}>
          <Button variant="primary" size="sm">Small Primary</Button>
          <Button variant="primary" size="md">Medium Primary</Button>
          <Button variant="primary" size="lg">Large Primary</Button>
        </div>
        <div style={{ display: 'flex', gap: 'var(--ds-space-3)', marginBottom: 'var(--ds-space-4)' }}>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>
    </div>
  );
};

export default ComponentsPage;

