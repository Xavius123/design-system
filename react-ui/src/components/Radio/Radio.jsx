import React from 'react';
import PropTypes from 'prop-types';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as Label from '@radix-ui/react-label';
import styles from './Radio.module.css';

/**
 * Radio component for single selection from a group of options
 * Must be used within a RadioGroup component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Radio value (required)
 * @param {boolean} [props.disabled=false] - Whether the radio is disabled
 * @param {boolean} [props.required=false] - Whether the radio is required
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Radio size
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.id] - Radio ID (auto-generated if not provided)
 * @param {Object} props... - Additional props passed to the radio element
 * @returns {React.ForwardRefExoticComponent} Radio component
 * 
 * @example
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <Radio value="option1" />
 * </RadioGroup>
 */
const Radio = React.forwardRef(({
  value,
  disabled = false,
  required = false,
  size = 'md',
  className = '',
  id,
  ...props
}, ref) => {
  const radioId = id || `radio-${crypto.randomUUID()}`;

  const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };

  const radioClasses = [
    styles.radio,
    sizeClasses[size],
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <RadioGroupPrimitive.Item
      id={radioId}
      ref={ref}
      value={value}
      disabled={disabled}
      required={required}
      className={radioClasses}
      aria-label={props['aria-label'] || 'Radio option'}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  id: PropTypes.string,
  'aria-label': PropTypes.string,
};

/**
 * RadioGroup component that contains Radio components
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Radio components
 * @param {string} [props.value] - Controlled selected value
 * @param {string} [props.defaultValue] - Uncontrolled default selected value
 * @param {Function} [props.onValueChange] - Value change handler
 * @param {string} [props.name] - Radio group name
 * @param {('row'|'column')} [props.orientation='column'] - Layout orientation
 * @param {boolean} [props.disabled=false] - Whether all radios in the group are disabled
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.label] - Group label
 * @param {boolean} [props.error=false] - Whether the group has an error
 * @param {string} [props.errorMessage=''] - Error message to display
 * @param {Object} props... - Additional props passed to the radio group element
 * @returns {React.ForwardRefExoticComponent} RadioGroup component
 * 
 * @example
 * <RadioGroup label="Select an option" onValueChange={setValue}>
 *   <Radio value="option1" label="Option 1" />
 *   <Radio value="option2" label="Option 2" />
 * </RadioGroup>
 */
const RadioGroup = React.forwardRef(({
  children,
  value,
  defaultValue,
  onValueChange,
  name,
  orientation = 'column',
  disabled = false,
  className = '',
  label = '',
  error = false,
  errorMessage = '',
  ...props
}, ref) => {
  const groupId = props.id || `radio-group-${crypto.randomUUID()}`;

  const orientationClasses = {
    row: styles.row,
    column: styles.column,
  };

  const groupClasses = [
    styles.group,
    orientationClasses[orientation],
    error && styles.error,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      {label && (
        <Label.Root htmlFor={groupId} className={styles.label}>
          {label}
        </Label.Root>
      )}
      <RadioGroupPrimitive.Root
        id={groupId}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
        disabled={disabled}
        orientation={orientation}
        className={groupClasses}
        aria-invalid={error}
        aria-describedby={error ? `${groupId}-error` : undefined}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
      {error && errorMessage && (
        <p id={`${groupId}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

RadioGroup.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onValueChange: PropTypes.func,
  name: PropTypes.string,
  orientation: PropTypes.oneOf(['row', 'column']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
};

/**
 * RadioOption component that combines Radio with Label
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Radio value
 * @param {string} [props.label=''] - Radio label
 * @param {boolean} [props.disabled=false] - Whether the radio is disabled
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Radio size
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} props... - Additional props passed to the Radio component
 * @returns {React.Component} RadioOption component
 * 
 * @example
 * <RadioOption value="option1" label="Option 1" />
 */
const RadioOption = ({
  value,
  label = '',
  disabled = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const optionId = props.id || `radio-option-${crypto.randomUUID()}`;

  return (
    <div className={styles.option}>
      <Radio
        id={optionId}
        value={value}
        disabled={disabled}
        size={size}
        className={className}
        aria-label={props['aria-label'] || label || undefined}
        {...props}
      />
      {label && (
        <Label.Root htmlFor={optionId} className={styles.optionLabel}>
          {label}
        </Label.Root>
      )}
    </div>
  );
};

RadioOption.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  id: PropTypes.string,
  'aria-label': PropTypes.string,
};

RadioGroup.Radio = Radio;
RadioGroup.Option = RadioOption;

export { Radio, RadioGroup, RadioOption };
export default RadioGroup;

