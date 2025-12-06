import React from 'react';
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './Modal.module.css';

/**
 * Modal component for displaying content in an overlay dialog
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Controlled open state
 * @param {Function} [props.onOpenChange] - Open state change handler
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.title] - Modal title
 * @param {string} [props.description] - Modal description
 * @param {boolean} [props.closeOnOverlayClick=true] - Close when clicking overlay
 * @param {boolean} [props.closeOnEscape=true] - Close on Escape key
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} props... - Additional props passed to the dialog element
 * @returns {React.Component} Modal component
 * 
 * @example
 * <Modal open={isOpen} onOpenChange={setIsOpen} title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 */
const Modal = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  ...props
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal={true} {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className={styles.overlay}
          onClick={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
        />
        <DialogPrimitive.Content 
          className={`${styles.content} ${className}`}
          onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
          onPointerDownOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
        >
          {title && (
            <DialogPrimitive.Title className={styles.title}>
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description className={styles.description}>
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          <DialogPrimitive.Close className={styles.close} aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Modal Trigger component
 */
const ModalTrigger = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <DialogPrimitive.Trigger ref={ref} className={`${styles.trigger} ${className}`} {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
});

ModalTrigger.displayName = 'ModalTrigger';

ModalTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Modal Close component
 */
const ModalClose = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <DialogPrimitive.Close ref={ref} className={`${styles.closeButton} ${className}`} {...props}>
      {children}
    </DialogPrimitive.Close>
  );
});

ModalClose.displayName = 'ModalClose';

ModalClose.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Modal.Trigger = ModalTrigger;
Modal.Close = ModalClose;

export default Modal;

