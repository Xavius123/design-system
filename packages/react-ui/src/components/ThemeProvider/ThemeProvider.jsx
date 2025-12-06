import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTheme, setTheme, initTheme, toggleTheme } from '../../utils/theme';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

/**
 * ThemeProvider component that manages theme state and provides theme utilities
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.defaultTheme - Default theme ('light' or 'dark')
 * @param {boolean} props.persist - Whether to persist theme to localStorage
 */
export const ThemeProvider = ({ children, defaultTheme = 'light', persist = true }) => {
  const [theme, setThemeState] = useState(defaultTheme);

  useEffect(() => {
    if (persist) {
      initTheme();
      const currentTheme = getTheme();
      setThemeState(currentTheme);
    } else {
      setThemeState(defaultTheme);
      document.documentElement.setAttribute('data-theme', defaultTheme);
    }

    // Listen for theme changes
    const handleThemeChange = (event) => {
      setThemeState(event.detail.theme);
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, [defaultTheme, persist]);

  const handleSetTheme = (newTheme) => {
    if (persist) {
      setTheme(newTheme);
    } else {
      setThemeState(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const handleToggleTheme = () => {
    if (persist) {
      const newTheme = toggleTheme();
      setThemeState(newTheme);
      return newTheme;
    } else {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setThemeState(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        toggleTheme: handleToggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(['light', 'dark']),
  persist: PropTypes.bool,
};

/**
 * Hook to access theme context
 * @returns {Object} Theme context with theme, setTheme, and toggleTheme
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;

