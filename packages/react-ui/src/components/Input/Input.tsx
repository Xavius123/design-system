import React from 'react';
import * as Label from '@radix-ui/react-label';
import { ComponentSize, InputType } from '@toyota/core';
import type { BaseComponentProps, FormFieldProps } from '@toyota/core';
import { DEFAULT_SIZE } from '@toyota/core';
import styles from './Input.module.css';

/**
 * Input Props
 * Extends base component props with input-specific properties
 */
export interface InputProps extends Omit<BaseComponentProps, 'testID'>, FormFieldProps {
  /** Input type */
  type?: InputType;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled input value */
  value?: string;
  /** Uncontrolled input default value */
  defaultValue?: string;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Input ID (auto-generated if not provided) */
  id?: string;
  /** Aria label for accessibility */
  'aria-label'?: string;
}

/**
 * Input component with label, error states, and helper text
 * 
 * @component
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type={InputType.Email}
 *   placeholder="Enter your email"
 *   required
 *   error={hasError}
 *   errorMessage="Invalid email address"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = InputType.Text,
  placeholder = '',
  value,
  defaultValue,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error = false,
  errorMessage = '',
  label = '',
  helperText = '',
  className = '',
  size = DEFAULT_SIZE as ComponentSize,
  fullWidth = false,
  id,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  // Validate that value and defaultValue are not used together
  if (process.env.NODE_ENV !== 'production' && value !== undefined && defaultValue !== undefined) {
    console.warn('Input: Both `value` and `defaultValue` cannot be used. Use `value` for controlled components or `defaultValue` for uncontrolled components.');
  }

  const inputId = id || `input-${crypto.randomUUID()}`;
  
  const sizeClasses: Record<ComponentSize, string> = {
    [ComponentSize.Small]: styles.small,
    [ComponentSize.Medium]: styles.medium,
    [ComponentSize.Large]: styles.large,
  };
  
  const inputClasses = [
    styles.input,
    sizeClasses[size],
    error && styles.error,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');
  
  const wrapperClasses = [
    styles.wrapper,
    fullWidth && styles.wrapperFullWidth
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses}>
      {label && (
        <Label.Root htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </Label.Root>
      )}
      <input
        id={inputId}
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-invalid={error}
        aria-label={ariaLabel || (label ? undefined : 'Input field')}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && errorMessage && (
        <p id={`${inputId}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

