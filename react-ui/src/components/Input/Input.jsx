import React from 'react';
import PropTypes from 'prop-types';
import * as Label from '@radix-ui/react-label';
import styles from './Input.module.css';

const Input = React.forwardRef(({
  type = 'text',
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
  size = 'md',
  fullWidth = false,
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
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

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
};

export default Input;

