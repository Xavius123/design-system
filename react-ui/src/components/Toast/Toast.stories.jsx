import React, { useState } from 'react';
import Toast, { useToast } from './Toast';
import Button from '../Button/Button';

export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Toast.Provider>
        <Story />
      </Toast.Provider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'info', 'warning'],
    },
    duration: {
      control: { type: 'number' },
    },
  },
};

export const Success = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Success Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Success"
        description="Your action was completed successfully."
        variant="success"
      />
    </>
  );
};

export const Error = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Error Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Error"
        description="Something went wrong. Please try again."
        variant="error"
      />
    </>
  );
};

export const Info = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Info Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Information"
        description="Here's some helpful information for you."
        variant="info"
      />
    </>
  );
};

export const Warning = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Warning Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Warning"
        description="Please review this before proceeding."
        variant="warning"
      />
    </>
  );
};

export const AllVariants = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button onClick={() => setSuccessOpen(true)}>Success</Button>
      <Button onClick={() => setErrorOpen(true)}>Error</Button>
      <Button onClick={() => setInfoOpen(true)}>Info</Button>
      <Button onClick={() => setWarningOpen(true)}>Warning</Button>

      <Toast
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Success"
        description="Action completed"
        variant="success"
      />
      <Toast
        open={errorOpen}
        onOpenChange={setErrorOpen}
        title="Error"
        description="Action failed"
        variant="error"
      />
      <Toast
        open={infoOpen}
        onOpenChange={setInfoOpen}
        title="Info"
        description="Here's some info"
        variant="info"
      />
      <Toast
        open={warningOpen}
        onOpenChange={setWarningOpen}
        title="Warning"
        description="Please be careful"
        variant="warning"
      />
    </div>
  );
};

export const WithProvider = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button
        onClick={() =>
          toast({
            title: 'Success',
            description: 'This toast was created using the useToast hook',
            variant: 'success',
          })
        }
      >
        Show Toast (Hook)
      </Button>
    </div>
  );
};

export const LongDuration = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Long Toast</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        title="Long Duration"
        description="This toast will stay visible for 10 seconds"
        duration={10000}
      />
    </>
  );
};

