import React from 'react';
import styles from './Navigation.module.css';

/**
 * Navigation Item Props
 */
export interface NavItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon (React node) */
  icon?: React.ReactNode;
  /** Navigation href (use with Link component) */
  href?: string;
  /** Click handler (use for programmatic navigation) */
  onClick?: () => void;
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
}

/**
 * Navigation Props
 */
export interface NavigationProps {
  /** Array of navigation items to display */
  items: NavItem[];
  /** Orientation of navigation */
  orientation?: 'vertical' | 'horizontal';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class name */
  className?: string;
  /** Custom render function for nav items */
  renderItem?: (item: NavItem) => React.ReactNode;
}

/**
 * Navigation component for rendering lists of navigation links
 * 
 * @component
 * @example
 * ```tsx
 * <Navigation
 *   items={[
 *     { id: '1', label: 'Home', href: '/', active: true },
 *     { id: '2', label: 'About', href: '/about' },
 *     { id: '3', label: 'Contact', href: '/contact', disabled: true },
 *   ]}
 *   orientation="vertical"
 *   size="md"
 * />
 * ```
 */
const Navigation = React.forwardRef<HTMLElement, NavigationProps>(({
  items,
  orientation = 'vertical',
  size = 'md',
  className = '',
  renderItem,
}, ref) => {
  const orientationClass = orientation === 'horizontal' ? styles.horizontal : styles.vertical;
  const sizeClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };

  const classes = [
    styles.navigation,
    orientationClass,
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  const defaultRenderItem = (item: NavItem) => {
    const itemClasses = [
      styles.navItem,
      item.active && styles.navItemActive,
      item.disabled && styles.navItemDisabled,
    ].filter(Boolean).join(' ');

    const content = (
      <>
        {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
        <span className={styles.navLabel}>{item.label}</span>
      </>
    );

    if (item.disabled) {
      return (
        <span key={item.id} className={itemClasses} aria-disabled="true">
          {content}
        </span>
      );
    }

    if (item.href) {
      return (
        <a
          key={item.id}
          href={item.href}
          className={itemClasses}
          onClick={item.onClick}
          aria-current={item.active ? 'page' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        className={itemClasses}
        onClick={item.onClick}
        aria-current={item.active ? 'page' : undefined}
      >
        {content}
      </button>
    );
  };

  return (
    <nav ref={ref} className={classes} aria-label="Navigation">
      {items.map(item => renderItem ? renderItem(item) : defaultRenderItem(item))}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;

