import React from 'react';
import PropTypes from 'prop-types';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import styles from './Checkbox.module.css';

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
  const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
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

