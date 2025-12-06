import { useState } from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
  },
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const Required = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
};

export const WithHelperText = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

export const Small = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size',
  },
};

export const Medium = {
  args: {
    label: 'Medium Input',
    size: 'md',
    placeholder: 'Medium size',
  },
};

export const Large = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size',
  },
};

export const FullWidth = {
  args: {
    label: 'Full Width Input',
    placeholder: 'Takes full width',
    fullWidth: true,
  },
};

export const Controlled = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      label="Controlled Input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
      helperText={`You typed: ${value}`}
    />
  );
};

export const AllTypes = () => (
  <div className="space-y-4 w-80">
    <Input label="Text" type="text" placeholder="Text input" />
    <Input label="Email" type="email" placeholder="email@example.com" />
    <Input label="Password" type="password" placeholder="Password" />
    <Input label="Number" type="number" placeholder="123" />
    <Input label="Tel" type="tel" placeholder="+1 (555) 000-0000" />
    <Input label="URL" type="url" placeholder="https://example.com" />
    <Input label="Search" type="search" placeholder="Search..." />
  </div>
);

