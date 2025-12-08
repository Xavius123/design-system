import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import styles from './Select.module.css';

/**
 * Select option type
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select Props
 */
export interface SelectProps {
  /** Array of options to display */
  options: SelectOption[];
  /** Current selected value */
  value?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for form submission */
  name?: string;
  /** Whether the select is required */
  required?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Select component (Dropdown)
 * 
 * @component
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 *   value={selectedValue}
 *   onValueChange={setSelectedValue}
 *   placeholder="Select an option"
 * />
 * ```
 */
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  disabled = false,
  size = 'md',
  name,
  required = false,
  className = '',
}, ref) => {
  const sizeClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      required={required}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        className={`${styles.trigger} ${sizeClasses[size]} ${className}`}
        aria-label={placeholder}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className={styles.icon}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={styles.content}
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.Viewport className={styles.viewport}>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={styles.item}
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className={styles.indicator}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = 'Select';

export default Select;

