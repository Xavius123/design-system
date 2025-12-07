import { ButtonVariant, ComponentSize } from '../enums';

// Default values for components
export const DEFAULT_BUTTON_VARIANT = ButtonVariant.Primary;
export const DEFAULT_SIZE = ComponentSize.Medium;

// Component configuration
export const COMPONENT_CONFIG = {
  button: {
    defaultVariant: ButtonVariant.Primary,
    defaultSize: ComponentSize.Medium,
  },
  input: {
    defaultType: 'text' as const,
    defaultSize: ComponentSize.Medium,
  },
  checkbox: {
    defaultSize: ComponentSize.Medium,
  },
} as const;
