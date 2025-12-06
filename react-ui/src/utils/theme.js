/**
 * Theme utility functions for managing light/dark mode
 */

const THEME_STORAGE_KEY = 'design-system-theme';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Get the current theme from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
export function getTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Check localStorage first
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * Set the theme and persist to localStorage
 * @param {string} theme - 'light' or 'dark'
 */
export function setTheme(theme) {
  if (typeof window === 'undefined') {
    return;
  }

  if (theme !== 'light' && theme !== 'dark') {
    console.warn(`Invalid theme: ${theme}. Must be 'light' or 'dark'`);
    return;
  }

  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  // Dispatch custom event for theme change
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

/**
 * Initialize theme on page load
 */
export function initTheme() {
  if (typeof window === 'undefined') {
    return;
  }

  const theme = getTheme();
  setTheme(theme);

  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

/**
 * Toggle between light and dark themes
 * @returns {string} The new theme
 */
export function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

