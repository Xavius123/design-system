import Input from '../packages/react/src/components/Input/Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width of container',
    },
  },
};

export const Default = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const WithError = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const WithHelper = {
  args: {
    label: 'Username',
    type: 'text',
    helperText: 'Choose a unique username',
  },
};

export const Required = {
  args: {
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'you@example.com',
  },
};

export const Disabled = {
  args: {
    label: 'Email',
    type: 'email',
    disabled: true,
    value: 'disabled@example.com',
  },
};

export const Small = {
  args: {
    label: 'Email',
    type: 'email',
    size: 'sm',
  },
};

export const Medium = {
  args: {
    label: 'Email',
    type: 'email',
    size: 'md',
  },
};

export const Large = {
  args: {
    label: 'Email',
    type: 'email',
    size: 'lg',
  },
};

export const FullWidth = {
  args: {
    label: 'Email',
    type: 'email',
    fullWidth: true,
  },
};
