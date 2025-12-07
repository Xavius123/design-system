import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './Checkbox.styles';
import { CheckIcon, MinusIcon } from './icons';

/**
 * Checkbox component for React Native
 * 
 * Mirrors the web Checkbox component API where possible
 */
const Checkbox = ({
  checked = false,
  onCheckedChange,
  label,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  size = 'md',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (disabled) return;
    
    if (checked === 'indeterminate') {
      onCheckedChange?.(true);
    } else {
      onCheckedChange?.(!checked);
    }
  };

  const getCheckboxStyles = () => {
    return [
      styles.checkbox,
      styles[size],
      checked && styles.checkboxChecked,
      error && styles.checkboxError,
      isFocused && styles.checkboxFocused,
      disabled && styles.checkboxDisabled,
    ];
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.checkboxWrapper}>
        <Pressable
          onPress={handlePress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          style={getCheckboxStyles()}
          accessibilityRole="checkbox"
          accessibilityState={{ checked, disabled }}
          accessibilityLabel={label}
          {...props}
        >
          {checked === 'indeterminate' ? (
            <MinusIcon size={size} />
          ) : checked ? (
            <CheckIcon size={size} />
          ) : null}
        </Pressable>
        {label && (
          <Text style={[styles.label, disabled && styles.labelDisabled]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}
      </View>
      {error && errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['indeterminate'])]),
  onCheckedChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Checkbox;

