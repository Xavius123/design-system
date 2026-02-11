import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  const size = props.size || 'md';

  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    props.disabled && styles.button_disabled,
    props.style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    props.disabled && styles.text_disabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyles}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base button styles
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 0,
  },

  // Variant: Primary
  button_primary: {
    backgroundColor: '#007bff',
  },

  // Variant: Secondary
  button_secondary: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  // Variant: Ghost
  button_ghost: {
    backgroundColor: 'transparent',
  },

  // Variant: Outline
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  // Size: Small
  button_sm: {
    height: 32,
    paddingHorizontal: 12,
  },

  // Size: Medium
  button_md: {
    height: 40,
    paddingHorizontal: 16,
  },

  // Size: Large
  button_lg: {
    height: 48,
    paddingHorizontal: 20,
  },

  // Disabled state
  button_disabled: {
    opacity: 0.5,
  },

  // Text base styles
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },

  // Text variant: Primary
  text_primary: {
    color: '#ffffff',
  },

  // Text variant: Secondary
  text_secondary: {
    color: '#000000',
  },

  // Text variant: Ghost
  text_ghost: {
    color: '#000000',
  },

  // Text variant: Outline
  text_outline: {
    color: '#000000',
  },

  // Text size: Small
  text_sm: {
    fontSize: 14,
  },

  // Text size: Medium
  text_md: {
    fontSize: 14,
  },

  // Text size: Large
  text_lg: {
    fontSize: 16,
  },

  // Text disabled
  text_disabled: {
    opacity: 0.5,
  },
});
