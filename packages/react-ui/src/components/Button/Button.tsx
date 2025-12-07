import React from 'react';
import * as Slot from '@radix-ui/react-slot';
import { ButtonVariant, ComponentSize } from '@toyota/core';
import type { BaseComponentProps, InteractiveWebProps, WithChildren } from '@toyota/core';
import { DEFAULT_BUTTON_VARIANT, DEFAULT_SIZE } from '@toyota/core';
import styles from './Button.module.css';

/**
 * Button Props
 * Extends base component props with button-specific properties
 */
export interface ButtonProps extends BaseComponentProps, InteractiveWebProps, WithChildren {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Render as child component using Radix Slot */
  asChild?: boolean;
}

/**
 * Button component with multiple variants and sizes
 * 
 * @component
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Primary} size={ComponentSize.Medium} onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = DEFAULT_BUTTON_VARIANT as ButtonVariant,
  size = DEFAULT_SIZE as ComponentSize,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  asChild = false,
  ...props
}, ref) => {
  const variantClasses: Record<ButtonVariant, string> = {
    [ButtonVariant.Primary]: styles.primary,
    [ButtonVariant.Secondary]: styles.secondary,
    [ButtonVariant.Ghost]: styles.ghost,
    [ButtonVariant.Outline]: styles.outline,
  };
  
  const sizeClasses: Record<ComponentSize, string> = {
    [ComponentSize.Small]: styles.small,
    [ComponentSize.Medium]: styles.medium,
    [ComponentSize.Large]: styles.large,
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
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

export default Button;

