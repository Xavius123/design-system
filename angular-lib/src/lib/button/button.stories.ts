import type { Meta, StoryObj } from '@storybook/angular';
import { DsButtonComponent } from './button.component';

const meta: Meta<DsButtonComponent> = {
  title: 'Components/Button',
  component: DsButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-button [variant]="variant">
        Primary Button
      </ds-button>
    `,
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-button [variant]="variant">
        Ghost Button
      </ds-button>
    `,
  }),
};
