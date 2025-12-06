import { useState } from 'react';
import RadioGroup, { RadioOption } from './Radio';

export default {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['row', 'column'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = () => {
  const [value, setValue] = useState('option1');
  return (
    <RadioGroup value={value} onValueChange={setValue} label="Select an option">
      <RadioOption value="option1" label="Option 1" />
      <RadioOption value="option2" label="Option 2" />
      <RadioOption value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const WithLabel = () => {
  const [value, setValue] = useState('apple');
  return (
    <RadioGroup value={value} onValueChange={setValue} label="Choose a fruit">
      <RadioOption value="apple" label="Apple" />
      <RadioOption value="banana" label="Banana" />
      <RadioOption value="orange" label="Orange" />
    </RadioGroup>
  );
};

export const Horizontal = () => {
  const [value, setValue] = useState('small');
  return (
    <RadioGroup 
      value={value} 
      onValueChange={setValue} 
      label="Size" 
      orientation="row"
    >
      <RadioOption value="small" label="Small" />
      <RadioOption value="medium" label="Medium" />
      <RadioOption value="large" label="Large" />
    </RadioGroup>
  );
};

export const Disabled = () => {
  const [value, setValue] = useState('option1');
  return (
    <RadioGroup value={value} onValueChange={setValue} label="Select an option">
      <RadioOption value="option1" label="Option 1" />
      <RadioOption value="option2" label="Option 2" disabled />
      <RadioOption value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const WithError = () => {
  const [value, setValue] = useState('');
  return (
    <RadioGroup 
      value={value} 
      onValueChange={setValue} 
      label="Select an option"
      error={!value}
      errorMessage="Please select an option"
    >
      <RadioOption value="option1" label="Option 1" />
      <RadioOption value="option2" label="Option 2" />
      <RadioOption value="option3" label="Option 3" />
    </RadioGroup>
  );
};

export const Sizes = () => {
  const [smallValue, setSmallValue] = useState('small1');
  const [mediumValue, setMediumValue] = useState('medium1');
  const [largeValue, setLargeValue] = useState('large1');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioGroup value={smallValue} onValueChange={setSmallValue} label="Small">
        <RadioOption value="small1" label="Option 1" size="sm" />
        <RadioOption value="small2" label="Option 2" size="sm" />
      </RadioGroup>
      
      <RadioGroup value={mediumValue} onValueChange={setMediumValue} label="Medium (default)">
        <RadioOption value="medium1" label="Option 1" size="md" />
        <RadioOption value="medium2" label="Option 2" size="md" />
      </RadioGroup>
      
      <RadioGroup value={largeValue} onValueChange={setLargeValue} label="Large">
        <RadioOption value="large1" label="Option 1" size="lg" />
        <RadioOption value="large2" label="Option 2" size="lg" />
      </RadioGroup>
    </div>
  );
};

export const Required = () => {
  const [value, setValue] = useState('');
  return (
    <RadioGroup 
      value={value} 
      onValueChange={setValue} 
      label="Select payment method"
      required
    >
      <RadioOption value="credit" label="Credit Card" />
      <RadioOption value="debit" label="Debit Card" />
      <RadioOption value="paypal" label="PayPal" />
    </RadioGroup>
  );
};

