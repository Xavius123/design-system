import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
}

export default function Input(props: InputProps) {
  const {
    label,
    error,
    errorMessage,
    helperText,
    size = 'md',
    fullWidth = true,
    required,
    containerStyle,
    style,
    editable = true,
    ...textInputProps
  } = props;

  const containerStyles = [
    styles.container,
    fullWidth && styles.container_fullWidth,
    containerStyle,
  ];

  const inputStyles = [
    styles.input,
    styles[`input_${size}`],
    error && styles.input_error,
    !editable && styles.input_disabled,
    style,
  ];

  return (
    <View style={containerStyles}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      
      <TextInput
        style={inputStyles}
        editable={editable}
        placeholderTextColor="#999999"
        {...textInputProps}
      />
      
      {error && errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      
      {!error && helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  
  container_fullWidth: {
    width: '100%',
  },

  // Label styles
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#000000',
  },

  required: {
    color: '#dc3545',
    marginLeft: 4,
  },

  // Input base styles
  input: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    color: '#000000',
    lineHeight: 21,
  },

  // Input sizes
  input_sm: {
    height: 32,
    paddingHorizontal: 12,
    fontSize: 14,
  },

  input_md: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: 14,
  },

  input_lg: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  // Input states
  input_error: {
    borderColor: '#dc3545',
  },

  input_disabled: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    opacity: 0.5,
  },

  // Message styles
  errorMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: '#dc3545',
    marginTop: 4,
  },

  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6c757d',
    marginTop: 4,
  },
});
