import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, setTheme as setThemeUtil } from '../../utils/theme';

/**
 * Theme context value
 */
interface ThemeContextValue {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider Props
 */
export interface ThemeProviderProps {
  /** Initial theme (defaults to system preference) */
  defaultTheme?: 'light' | 'dark';
  /** Children components */
  children: React.ReactNode;
  /** Custom class name for the theme container */
  className?: string;
  /** Whether to scope tokens to this container (default: false for backward compatibility) */
  scoped?: boolean;
}

/**
 * Theme Provider Component
 * 
 * Provides theme context to all child components and manages theme switching.
 * 
 * **Style Isolation:**
 * - Set `scoped={true}` to prevent token conflicts with consumer apps
 * - Creates an isolated theme container for design system tokens
 * - Recommended for library usage
 * 
 * @example
 * ```tsx
 * // Scoped theme (recommended for libraries)
 * <ThemeProvider scoped>
 *   <App />
 * </ThemeProvider>
 * 
 * // Global theme (for full app ownership)
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultTheme,
  children,
  className = '',
  scoped = false,
}) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    return defaultTheme || getTheme();
  });

  // Update theme
  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    
    if (!scoped) {
      // Global mode: set on document element
      setThemeUtil(newTheme);
    }
    // Scoped mode: handled by data-theme attribute on container
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    if (!scoped) {
      setThemeUtil(theme);
    }

    // Listen for external theme changes (if not scoped)
    if (!scoped && typeof window !== 'undefined') {
      const handleThemeChange = (event: CustomEvent) => {
        setThemeState(event.detail.theme);
      };

      window.addEventListener('themechange', handleThemeChange as EventListener);
      return () => {
        window.removeEventListener('themechange', handleThemeChange as EventListener);
      };
    }
  }, [theme, scoped]);

  const containerClass = [
    scoped ? 'redhorn-theme' : '',
    className,
  ].filter(Boolean).join(' ');

  const containerProps = {
    className: containerClass || undefined,
    'data-theme': theme,
    'data-redhorn-scoped': scoped ? 'true' : undefined,
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {scoped ? (
        <div {...containerProps}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, toggleTheme } = useTheme();
 * ```
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

ThemeProvider.displayName = 'ThemeProvider';

