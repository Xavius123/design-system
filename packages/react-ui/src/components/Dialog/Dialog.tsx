import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './Dialog.module.css';

/**
 * Dialog Props
 */
export interface DialogProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Dialog content */
  children: React.ReactNode;
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Additional CSS class for content */
  className?: string;
}

/**
 * Dialog component (Modal)
 * 
 * @component
 * @example
 * ```tsx
 * <Dialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Confirm Action"
 *   description="Are you sure you want to continue?"
 * >
 *   <p>Dialog content goes here</p>
 *   <button onClick={() => setIsOpen(false)}>Cancel</button>
 *   <button onClick={handleConfirm}>Confirm</button>
 * </Dialog>
 * ```
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}, ref) => {
  const sizeClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
    xl: styles.extraLarge,
    full: styles.full,
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay} />
        <DialogPrimitive.Content
          ref={ref}
          className={`${styles.content} ${sizeClasses[size]} ${className}`}
        >
          {(title || showCloseButton) && (
            <div className={styles.header}>
              {title && (
                <DialogPrimitive.Title className={styles.title}>
                  {title}
                </DialogPrimitive.Title>
              )}
              {showCloseButton && (
                <DialogPrimitive.Close className={styles.closeButton}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.srOnly}>Close</span>
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          
          {description && (
            <DialogPrimitive.Description className={styles.description}>
              {description}
            </DialogPrimitive.Description>
          )}
          
          <div className={styles.body}>
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;

