import { ComponentSize } from '../enums';

/**
 * Base props shared by all components
 */
export interface BaseComponentProps {
  /** Component size */
  size?: ComponentSize;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS class name (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Props for interactive web components
 */
export interface InteractiveWebProps {
  /** Click event handler (web) */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
}

/**
 * Props for interactive React Native components
 */
export interface InteractiveNativeProps {
  /** Press event handler (React Native) */
  onPress?: () => void;
  /** Blur event handler */
  onBlur?: () => void;
  /** Focus event handler */
  onFocus?: () => void;
}

/**
 * Props for components with children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Props for form field components
 */
export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field has an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text to display */
  helperText?: string;
  /** Field name */
  name?: string;
  /** Field ID */
  id?: string;
}

