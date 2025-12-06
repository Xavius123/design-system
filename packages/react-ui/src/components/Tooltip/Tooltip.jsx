import React from 'react';
import PropTypes from 'prop-types';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styles from './Tooltip.module.css';

/**
 * Tooltip component for displaying contextual information
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Tooltip trigger element
 * @param {string} props.content - Tooltip content text
 * @param {('top'|'right'|'bottom'|'left')} [props.side='top'] - Tooltip position
 * @param {number} [props.delayDuration=700] - Delay before showing tooltip (ms)
 * @param {boolean} [props.disabled=false] - Whether tooltip is disabled
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} props... - Additional props passed to the tooltip element
 * @returns {React.Component} Tooltip component
 * 
 * @example
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */
const Tooltip = ({
  children,
  content,
  side = 'top',
  delayDuration = 700,
  disabled = false,
  className = '',
  ...props
}) => {
  if (disabled) {
    return children;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild className={styles.trigger}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={`${styles.content} ${className}`}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired,
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  delayDuration: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Tooltip;

