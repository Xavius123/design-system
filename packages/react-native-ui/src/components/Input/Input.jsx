import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './Input.styles';

/**
 * Input component for React Native with label, error states, and helper text
 * 
 * Mirrors the web Input component API where possible
 */
const Input = ({
  type = 'text',
  size = 'md',
  label,
  placeholder,
  value,
  onChangeText,
  error = false,
  errorMessage,
  helperText,
  required = false,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Map web input types to React Native keyboard types
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'tel':
        return 'phone-pad';
      case 'url':
        return 'url';
      default:
        return 'default';
    }
  };

  const getInputStyles = () => {
    return [
      styles.input,
      styles[size],
      error && styles.inputError,
      isFocused && styles.inputFocused,
      disabled && styles.inputDisabled,
    ];
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={getInputStyles()}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={getKeyboardType()}
        secureTextEntry={type === 'password'}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessibilityLabel={label || placeholder}
        {...props}
      />
      {error && errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      {!error && helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;


