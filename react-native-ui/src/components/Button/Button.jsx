import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text } from 'react-native';
import styles, { getThemeStyles } from './Button.styles';

/**
 * Button component with multiple variants and sizes
 * Mirrors the web Button component API
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {('primary'|'secondary'|'ghost'|'outline')} [props.variant='primary'] - Button variant style
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Button size
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {Object} [props.style] - Additional styles
 * @param {Function} [props.onPress] - Press handler (React Native uses onPress instead of onClick)
 * @param {string} [props.testID] - Test ID for testing
 * @param {Object} props... - Additional props passed to the Pressable component
 * @returns {React.ForwardRefExoticComponent} Button component
 * 
 * @example
 * <Button variant="primary" size="md" onPress={handlePress}>
 *   Click me
 * </Button>
 */
const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  onPress,
  testID,
  theme = 'light',
  ...props
}, ref) => {
  // Get theme-specific styles
  const themeStyles = getThemeStyles(theme);

  const buttonStyles = [
    themeStyles.button,
    themeStyles[variant],
    themeStyles[size],
    disabled && themeStyles.disabled,
    style,
  ].filter(Boolean);

  const textStyles = [
    themeStyles.text,
    themeStyles[`${variant}Text`],
    themeStyles[`${size}Text`],
  ].filter(Boolean);

  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !disabled && styles.pressed,
      ]}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...props}
    >
      <Text style={textStyles}>
        {children}
      </Text>
    </Pressable>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  testID: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default Button;

