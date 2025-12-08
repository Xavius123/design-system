import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styles from './Tooltip.module.css';

/**
 * Tooltip Props
 */
export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Side of the trigger to display tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end';
  /** Delay before showing tooltip (ms) */
  delayDuration?: number;
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Additional CSS class for content */
  className?: string;
}

/**
 * TooltipProvider - Wrap your app or component tree with this
 */
export const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Tooltip component
 * 
 * Wrap your app with TooltipProvider at the root level:
 * ```tsx
 * <TooltipProvider>
 *   <App />
 * </TooltipProvider>
 * ```
 * 
 * @component
 * @example
 * ```tsx
 * <Tooltip content="This is a helpful tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 200,
  showArrow = true,
  className = '',
}, ref) => {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          className={`${styles.content} ${className}`}
          side={side}
          align={align}
          sideOffset={4}
        >
          {content}
          {showArrow && (
            <TooltipPrimitive.Arrow className={styles.arrow} />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;

