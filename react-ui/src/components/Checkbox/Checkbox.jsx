import React from 'react';
import PropTypes from 'prop-types';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import styles from './Checkbox.module.css';

/**
 * Checkbox component with label, error states, and multiple sizes
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.label=''] - Checkbox label
 * @param {boolean} [props.checked] - Controlled checked state
 * @param {boolean} [props.defaultChecked=false] - Uncontrolled default checked state
 * @param {Function} [props.onCheckedChange] - Checked state change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {boolean} [props.required=false] - Whether the checkbox is required
 * @param {boolean} [props.error=false] - Whether the checkbox has an error
 * @param {string} [props.errorMessage=''] - Error message to display
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Checkbox size
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.id] - Checkbox ID (auto-generated if not provided)
 * @param {Object} props... - Additional props passed to the checkbox element
 * @returns {React.ForwardRefExoticComponent} Checkbox component
 * 
 * @example
 * <Checkbox
 *   label="Accept terms and conditions"
 *   required
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 * />
 */
const Checkbox = React.forwardRef(({
  label = '',
  checked,
  defaultChecked = false,
  onCheckedChange,
  onBlur,
  disabled = false,
  required = false,
  error = false,
  errorMessage = '',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const checkboxId = props.id || `checkbox-${crypto.randomUUID()}`;
  
  const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };
  
  const checkboxClasses = [
    styles.checkbox,
    sizeClasses[size],
    error && styles.error,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
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
          aria-label={props['aria-label'] || (label ? undefined : 'Checkbox')}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={styles.indicator}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onCheckedChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Checkbox;

