import React from 'react';
import { ComponentSize } from '../enums';

/**
 * Base props shared by all components
 */
export interface BaseComponentProps {
  /** Component size */
  size?: ComponentSize;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS class name (web) */
  className?: string;
  /** Test ID for testing (React Native) */
  testID?: string;
}

/**
 * Props for interactive web components
 */
export interface InteractiveWebProps {
  /** Click handler for web */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Props for interactive React Native components
 */
export interface InteractiveNativeProps {
  /** Press handler for React Native */
  onPress?: () => void;
}

/**
 * Props for components with children
 */
export interface WithChildren {
  /** Child elements */
  children?: React.ReactNode;
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
}
