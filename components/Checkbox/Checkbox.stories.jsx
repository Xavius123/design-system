import { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
    indeterminate: {
      control: { type: 'boolean' },
    },
    onCheckedChange: { action: 'checked changed' },
    onBlur: { action: 'blurred' },
  },
};

export const Default = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked = {
  args: {
    label: 'I agree to the terms',
    checked: true,
  },
};

export const Required = {
  args: {
    label: 'I accept the terms and conditions',
    required: true,
  },
};

export const WithError = {
  args: {
    label: 'Accept terms',
    error: true,
    errorMessage: 'You must accept the terms to continue',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    label: 'Disabled and checked',
    checked: true,
    disabled: true,
  },
};

export const Small = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const Medium = {
  args: {
    label: 'Medium checkbox',
    size: 'md',
  },
};

export const Large = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
};


export const Controlled = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Controlled checkbox"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
};

export const CheckboxGroup = () => {
  const [items, setItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });

  const allChecked = Object.values(items).every(Boolean);
  const someChecked = Object.values(items).some(Boolean);

  const handleSelectAll = (checked) => {
    setItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });
  };

  return (
    <div className="space-y-3">
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={handleSelectAll}
      />
      <div className="ml-6 space-y-2">
        <Checkbox
          label="Item 1"
          checked={items.item1}
          onCheckedChange={(checked) => setItems({ ...items, item1: checked })}
        />
        <Checkbox
          label="Item 2"
          checked={items.item2}
          onCheckedChange={(checked) => setItems({ ...items, item2: checked })}
        />
        <Checkbox
          label="Item 3"
          checked={items.item3}
          onCheckedChange={(checked) => setItems({ ...items, item3: checked })}
        />
      </div>
    </div>
  );
};

