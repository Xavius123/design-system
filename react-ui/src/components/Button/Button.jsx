import React from 'react';
import PropTypes from 'prop-types';
import * as Slot from '@radix-ui/react-slot';
import styles from './Button.module.css';

/**
 * Button component with multiple variants and sizes
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {('primary'|'secondary'|'ghost'|'outline')} [props.variant='primary'] - Button variant style
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Button size
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Button type
 * @param {boolean} [props.asChild=false] - Render as child component using Radix Slot
 * @param {Object} props... - Additional props passed to the button element
 * @returns {React.ForwardRefExoticComponent} Button component
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  asChild = false,
  ...props
}, ref) => {
  const variantClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    outline: styles.outline,
  };
  
  const sizeClasses = {
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
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  asChild: PropTypes.bool,
};

export default Button; 