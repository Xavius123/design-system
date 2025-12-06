import React from 'react';
import PropTypes from 'prop-types';
import * as ToastPrimitive from '@radix-ui/react-toast';
import styles from './Toast.module.css';

/**
 * ToastProvider component that wraps the app and provides toast context
 * This is a wrapper around Radix UI's ToastProvider with our styling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {('top-left'|'top-right'|'bottom-left'|'bottom-right'|'top-center'|'bottom-center')} [props.position='bottom-right'] - Toast position
 * @param {number} [props.duration=5000] - Default duration for toasts
 * @param {('left'|'right'|'up'|'down')} [props.swipeDirection='right'] - Swipe direction to dismiss
 * @returns {React.Component} ToastProvider component
 * 
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
const ToastProvider = ({
  children,
  position = 'bottom-right',
  duration = 5000,
  swipeDirection = 'right',
}) => {
  const positionMap = {
    'top-left': { x: 'left', y: 'top' },
    'top-right': { x: 'right', y: 'top' },
    'top-center': { x: 'center', y: 'top' },
    'bottom-left': { x: 'left', y: 'bottom' },
    'bottom-right': { x: 'right', y: 'bottom' },
    'bottom-center': { x: 'center', y: 'bottom' },
  };

  const pos = positionMap[position] || positionMap['bottom-right'];

  return (
    <ToastPrimitive.Provider
      duration={duration}
      swipeDirection={swipeDirection}
    >
      {children}
      <ToastPrimitive.Viewport
        className={styles.viewport}
        style={{
          [pos.y]: 0,
          [pos.x]: 0,
          transform: pos.x === 'center' ? 'translateX(-50%)' : undefined,
        }}
      />
    </ToastPrimitive.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center']),
  duration: PropTypes.number,
  swipeDirection: PropTypes.oneOf(['left', 'right', 'up', 'down']),
};

export default ToastProvider;

