import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import styles from './Checkbox.module.css';

/**
 * Checkbox Props
 */
export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean | 'indeterminate';
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Handler called when checkbox state changes */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  /** Checkbox label */
  label?: string;
  /** Whether the checkbox has an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class name */
  className?: string;
  /** Checkbox ID (auto-generated if not provided) */
  id?: string;
}

/**
 * Checkbox component with label and error states
 * 
 * @component
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   label="Accept terms and conditions"
 *   required
 *   error={hasError}
 *   errorMessage="You must accept the terms"
 * />
 * ```
 */
const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label = '',
  error = false,
  errorMessage = '',
  required = false,
  disabled = false,
  size = 'md',
  className = '',
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${crypto.randomUUID()}`;
  
  const sizeClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };
  
  const checkboxClasses = [
    styles.checkbox,
    sizeClasses[size],
    error && styles.error,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxWrapper}>
        <CheckboxPrimitive.Root
          id={checkboxId}
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          className={checkboxClasses}
          aria-invalid={error}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={styles.indicator}>
            {checked === 'indeterminate' ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6H10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <Label.Root htmlFor={checkboxId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </Label.Root>
        )}
      </div>
      {error && errorMessage && (
        <p id={`${checkboxId}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

