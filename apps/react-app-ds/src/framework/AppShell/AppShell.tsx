import React, { useState } from 'react';
import Drawer from '@/ui/Drawer';
import styles from './AppShell.module.css';
import { AppShellProps, NavItem } from './types';

const AppShell: React.FC<AppShellProps> = ({
  navItems,
  headerStart,
  headerCenter,
  headerEnd,
  navTop,
  navBottom,
  footer,
  renderNavContent,
  children,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(prev => !prev);
  };

  const closeMobileDrawer = () => {
    setMobileDrawerOpen(false);
  };

  // Default nav renderer
  const defaultNavRenderer = (items: NavItem[]) => (
    <nav className={styles.nav}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
            closeMobileDrawer();
          }}
          className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
        >
          {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );

  const navContent = (
    <div className={styles.sidebarContent}>
      {navTop && <div className={styles.navTop}>{navTop}</div>}
      {renderNavContent ? renderNavContent(navItems) : defaultNavRenderer(navItems)}
      {navBottom && <div className={styles.navBottom}>{navBottom}</div>}
    </div>
  );

  return (
    <div className={styles.appShell}>
      {/* Header */}
      <header className={styles.header}>
        <button 
          className={styles.burger}
          onClick={toggleMobileDrawer}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {headerStart && <div className={styles.headerStart}>{headerStart}</div>}
        {headerCenter && <div className={styles.headerCenter}>{headerCenter}</div>}
        {headerEnd && <div className={styles.headerEnd}>{headerEnd}</div>}
      </header>

      {/* Permanent Sidebar (Desktop only, hidden on mobile via CSS) */}
      <aside className={styles.permanentSidebar}>
        {navContent}
      </aside>

      {/* Mobile Drawer (Mobile only, hidden on desktop via CSS) */}
      <Drawer 
        open={mobileDrawerOpen} 
        onClose={closeMobileDrawer}
        side="left"
      >
        {navContent}
      </Drawer>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Footer (optional) */}
      {footer && (
        <footer className={styles.footer}>
          {footer}
        </footer>
      )}
    </div>
  );
};

export default AppShell;

