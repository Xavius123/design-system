import React from 'react';
import * as Slot from '@radix-ui/react-slot';
import styles from './Button.module.css';

/**
 * Button Props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Render as child component using Radix Slot */
  asChild?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Button component with multiple variants and sizes
 * 
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  asChild = false,
  ...props
}, ref) => {
  const variantClasses: Record<string, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    outline: styles.outline,
  };
  
  const sizeClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };
  
  const classes = [
    styles.button,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');
  
  const Comp = asChild ? Slot.Root : 'button';
  
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

export default Button;


