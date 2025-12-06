import React from 'react';
import PropTypes from 'prop-types';
import * as ToastPrimitive from '@radix-ui/react-toast';
import styles from './Toast.module.css';

/**
 * Toast component for displaying temporary notifications
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Toast content
 * @param {string} [props.title] - Toast title
 * @param {string} [props.description] - Toast description
 * @param {('success'|'error'|'info'|'warning')} [props.variant='info'] - Toast variant
 * @param {number} [props.duration=5000] - Auto-dismiss duration (ms)
 * @param {boolean} [props.open] - Controlled open state
 * @param {Function} [props.onOpenChange] - Open state change handler
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} props... - Additional props passed to the toast element
 * @returns {React.Component} Toast component
 * 
 * @example
 * <Toast title="Success" description="Action completed" variant="success" />
 */
const Toast = ({
  children,
  title,
  description,
  variant = 'info',
  duration = 5000,
  open,
  onOpenChange,
  className = '',
  ...props
}) => {
  const variantClasses = {
    success: styles.success,
    error: styles.error,
    info: styles.info,
    warning: styles.warning,
  };

  const classes = [
    styles.toast,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <ToastPrimitive.Root
      className={classes}
      duration={duration}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {title && (
        <ToastPrimitive.Title className={styles.title}>
          {title}
        </ToastPrimitive.Title>
      )}
      {description && (
        <ToastPrimitive.Description className={styles.description}>
          {description}
        </ToastPrimitive.Description>
      )}
      {children}
      <ToastPrimitive.Close className={styles.close} aria-label="Close">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

Toast.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  duration: PropTypes.number,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Hook to create and show toasts programmatically
 * Note: This is a simplified implementation. For production, consider using a toast context.
 * 
 * @returns {Object} Object with toast function and dismiss function
 */
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description, variant = 'info', duration = 5000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = {
      id,
      title,
      description,
      variant,
      duration,
      open: true,
    };
    setToasts((prev) => [...prev, newToast]);
    
    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    
    return id;
  }, []);

  const dismiss = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toast, dismiss, toasts };
};

// ToastProvider is exported separately from ToastProvider.jsx
// useToast hook is exported separately
export default Toast;

