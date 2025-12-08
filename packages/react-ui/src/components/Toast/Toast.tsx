import React from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps } from 'sonner';
import './Toast.module.css';

/**
 * Toast variant types
 */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Toast options
 */
export interface ToastOptions {
  /** Toast description */
  description?: string;
  /** Duration in milliseconds */
  duration?: number;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Cancel button */
  cancel?: {
    label: string;
    onClick?: () => void;
  };
}

/**
 * Toaster component - Add this to your app root
 * 
 * @component
 * @example
 * ```tsx
 * // In your App.tsx or root component
 * import { Toaster } from '@redhorn/react-ui';
 * 
 * function App() {
 *   return (
 *     <>
 *       <Toaster />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 */
export const Toaster: React.FC<Partial<ToasterProps>> = (props) => {
  return (
    <SonnerToaster
      position="bottom-right"
      expand={false}
      richColors
      closeButton
      {...props}
    />
  );
};

/**
 * Toast API for showing notifications
 * 
 * @example
 * ```tsx
 * import { toast } from '@redhorn/react-ui';
 * 
 * // Default toast
 * toast('Event has been created');
 * 
 * // Success toast
 * toast.success('Successfully saved!');
 * 
 * // Error toast
 * toast.error('Something went wrong');
 * 
 * // Toast with description
 * toast('Event created', {
 *   description: 'Your event has been scheduled for tomorrow'
 * });
 * 
 * // Toast with action
 * toast('Event created', {
 *   action: {
 *     label: 'Undo',
 *     onClick: () => console.log('Undo')
 *   }
 * });
 * ```
 */
export const toast = {
  /**
   * Show default toast
   */
  default: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, options);
  },

  /**
   * Show success toast
   */
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options);
  },

  /**
   * Show error toast
   */
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, options);
  },

  /**
   * Show warning toast
   */
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options);
  },

  /**
   * Show info toast
   */
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options);
  },

  /**
   * Show loading toast
   */
  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options);
  },

  /**
   * Show promise toast (updates automatically)
   */
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },

  /**
   * Dismiss a toast
   */
  dismiss: (toastId?: string | number) => {
    return sonnerToast.dismiss(toastId);
  },

  /**
   * Custom toast with JSX
   */
  custom: (jsx: React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.custom(jsx, options);
  },
};

// Export sonner toast as default for direct usage if needed
export default toast;

