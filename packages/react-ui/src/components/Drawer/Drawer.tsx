import React, { useEffect, useRef } from 'react';
import styles from './Drawer.module.css';

/**
 * Drawer Props
 */
export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when the drawer should close */
  onClose: () => void;
  /** Drawer content */
  children: React.ReactNode;
  /** Side of the screen to slide from */
  side?: 'left' | 'right';
  /** Width of the drawer */
  width?: number | string;
  /** Whether to show close button */
  showClose?: boolean;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on ESC key */
  closeOnEscape?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Drawer component for overlaying side panels
 * 
 * @component
 * @example
 * ```tsx
 * <Drawer
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   side="left"
 *   showClose
 * >
 *   <Navigation items={navItems} />
 * </Drawer>
 * ```
 */
const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(({
  open,
  onClose,
  children,
  side = 'left',
  width = 280,
  showClose = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}, ref) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (open && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [open]);

  if (!open) return null;

  const sideClass = side === 'right' ? styles.right : styles.left;
  const drawerClasses = [styles.drawer, sideClass, className].filter(Boolean).join(' ');
  
  const widthValue = typeof width === 'number' ? `${width}px` : width;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={styles.overlay}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={ref || drawerRef}
        className={drawerClasses}
        style={{ width: widthValue }}
        role="dialog"
        aria-modal="true"
      >
        {showClose && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close drawer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;

