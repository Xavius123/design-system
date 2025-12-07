import React from 'react';
import * as Label from '@radix-ui/react-label';
import styles from './Input.module.css';

/**
 * Input Props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Input label */
  label?: string;
  /** Whether the input has an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text to display */
  helperText?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input should take full width */
  fullWidth?: boolean;
}

/**
 * Input component with label, error states, and helper text
 * 
 * @component
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 *   error={hasError}
 *   errorMessage="Invalid email address"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  size = 'md',
  label = '',
  error = false,
  errorMessage = '',
  helperText = '',
  required = false,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  // Validate that value and defaultValue are not used together
  if (process.env.NODE_ENV !== 'production' && props.value !== undefined && props.defaultValue !== undefined) {
    console.warn('Input: Both `value` and `defaultValue` cannot be used. Use `value` for controlled components or `defaultValue` for uncontrolled components.');
  }

  const inputId = id || `input-${crypto.randomUUID()}`;
  
  const sizeClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };
  
  const inputClasses = [
    styles.input,
    sizeClasses[size],
    error && styles.error,
    props.disabled && styles.disabled,
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
        required={required}
        className={inputClasses}
        aria-invalid={error}
        aria-label={props['aria-label'] || (label ? undefined : 'Input field')}
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


