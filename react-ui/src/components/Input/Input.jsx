import React from 'react';
import PropTypes from 'prop-types';
import * as Label from '@radix-ui/react-label';
import styles from './Input.module.css';

/**
 * Input component with label, error states, and helper text
 * 
 * @component
 * @param {Object} props - Component props
 * @param {('text'|'email'|'password'|'number'|'tel'|'url'|'search')} [props.type='text'] - Input type
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.value] - Controlled input value
 * @param {string} [props.defaultValue] - Uncontrolled input default value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean} [props.error=false] - Whether the input has an error
 * @param {string} [props.errorMessage=''] - Error message to display
 * @param {string} [props.label=''] - Input label
 * @param {string} [props.helperText=''] - Helper text to display
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Input size
 * @param {boolean} [props.fullWidth=false] - Whether the input should take full width
 * @param {string} [props.id] - Input ID (auto-generated if not provided)
 * @param {Object} props... - Additional props passed to the input element
 * @returns {React.ForwardRefExoticComponent} Input component
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 *   error={hasError}
 *   errorMessage="Invalid email address"
 * />
 */
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
  // Validate that value and defaultValue are not used together
  if (process.env.NODE_ENV !== 'production' && value !== undefined && defaultValue !== undefined) {
    console.warn('Input: Both `value` and `defaultValue` cannot be used. Use `value` for controlled components or `defaultValue` for uncontrolled components.');
  }

  const inputId = props.id || `input-${crypto.randomUUID()}`;
  
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

