import React from 'react';
import styles from './Header.module.css';

/**
 * Header Props
 */
export interface HeaderProps {
  /** Content for the start (left) section */
  start?: React.ReactNode;
  /** Content for the center section */
  center?: React.ReactNode;
  /** Content for the end (right) section */
  end?: React.ReactNode;
  /** Whether to show the burger menu button */
  showBurger?: boolean;
  /** Burger menu click handler */
  onBurgerClick?: () => void;
  /** Burger menu aria-label */
  burgerLabel?: string;
  /** Whether the header is fixed to the top */
  fixed?: boolean;
  /** Header height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Additional CSS class name */
  className?: string;
}

/**
 * Header component for application navigation and branding
 * 
 * @component
 * @example
 * ```tsx
 * <Header
 *   showBurger
 *   onBurgerClick={() => setDrawerOpen(true)}
 *   start={<Logo />}
 *   center={<SearchBar />}
 *   end={<UserMenu />}
 *   fixed
 * />
 * ```
 */
const Header = React.forwardRef<HTMLElement, HeaderProps>(({
  start,
  center,
  end,
  showBurger = false,
  onBurgerClick,
  burgerLabel = 'Toggle navigation',
  fixed = false,
  height = 'md',
  className = '',
}, ref) => {
  const heightClasses: Record<string, string> = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };

  const classes = [
    styles.header,
    fixed && styles.fixed,
    heightClasses[height],
    className
  ].filter(Boolean).join(' ');

  return (
    <header ref={ref} className={classes}>
      {showBurger && (
        <button
          type="button"
          className={styles.burger}
          onClick={onBurgerClick}
          aria-label={burgerLabel}
          aria-expanded="false"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      )}
      
      {start && <div className={styles.start}>{start}</div>}
      {center && <div className={styles.center}>{center}</div>}
      {end && <div className={styles.end}>{end}</div>}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

