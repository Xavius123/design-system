import React from 'react';
import PropTypes from 'prop-types';
import * as Slot from '@radix-ui/react-slot';
import styles from './Card.module.css';

/**
 * Card component for displaying content in a contained card layout
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.asChild=false] - Render as child component using Radix Slot
 * @param {('sm'|'md'|'lg')} [props.padding='md'] - Card padding size
 * @param {boolean} [props.elevated=false] - Whether the card has elevation/shadow
 * @param {boolean} [props.interactive=false] - Whether the card is interactive (hover effects)
 * @param {Object} props... - Additional props passed to the card element
 * @returns {React.ForwardRefExoticComponent} Card component
 * 
 * @example
 * <Card padding="md" elevated>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 */
const Card = React.forwardRef(({
  children,
  className = '',
  asChild = false,
  padding = 'md',
  elevated = false,
  interactive = false,
  ...props
}, ref) => {
  const paddingClasses = {
    sm: styles.paddingSmall,
    md: styles.paddingMedium,
    lg: styles.paddingLarge,
  };

  const classes = [
    styles.card,
    paddingClasses[padding],
    elevated && styles.elevated,
    interactive && styles.interactive,
    className
  ].filter(Boolean).join(' ');

  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </Comp>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  asChild: PropTypes.bool,
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
  elevated: PropTypes.bool,
  interactive: PropTypes.bool,
};

export default Card;

