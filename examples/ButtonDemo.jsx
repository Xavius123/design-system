import React, { useState } from 'react';
import { Button } from '../components';

const ButtonDemo = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="p-8 min-h-screen" data-theme={theme}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Design System Button Component</h1>
          <Button onClick={toggleTheme} variant="outline" className="mb-4">
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
          </Button>
        </div>

        <div className="space-y-8">
          {/* Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* Disabled State */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Disabled State</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" disabled>Primary Disabled</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
              <Button variant="ghost" disabled>Ghost Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
            </div>
          </section>

          {/* Interactive Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                onClick={() => alert('Primary button clicked!')}
              >
                Click Me
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => console.log('Secondary button clicked!')}
              >
                Console Log
              </Button>
              <Button type="submit" variant="outline">
                Submit Form
              </Button>
            </div>
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Custom Styling</h2>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                className="shadow-lg transform hover:scale-105"
              >
                With Shadow & Scale
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-dashed"
              >
                Dashed Border
              </Button>
              <Button 
                variant="ghost" 
                className="text-lg font-bold"
              >
                Bold Text
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo; 