import React from 'react';
import styles from './Sidebar.module.css';

/**
 * Sidebar Props
 */
export interface SidebarProps {
  /** Main sidebar content */
  children: React.ReactNode;
  /** Optional header content at the top */
  header?: React.ReactNode;
  /** Optional footer content at the bottom */
  footer?: React.ReactNode;
  /** Side of the screen to display */
  side?: 'left' | 'right';
  /** Width of the sidebar */
  width?: number | string;
  /** Whether sidebar has a border */
  bordered?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Sidebar component for permanent side navigation
 * 
 * @component
 * @example
 * ```tsx
 * <Sidebar
 *   header={<Logo />}
 *   footer={<Version>v1.0.0</Version>}
 *   bordered
 * >
 *   <Navigation items={navItems} />
 * </Sidebar>
 * ```
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(({
  children,
  header,
  footer,
  side = 'left',
  width = 240,
  bordered = true,
  className = '',
}, ref) => {
  const sideClass = side === 'right' ? styles.right : styles.left;
  
  const classes = [
    styles.sidebar,
    sideClass,
    bordered && styles.bordered,
    className
  ].filter(Boolean).join(' ');

  const widthValue = typeof width === 'number' ? `${width}px` : width;

  return (
    <aside
      ref={ref}
      className={classes}
      style={{ width: widthValue }}
    >
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;

