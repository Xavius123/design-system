/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        'light': {
          'background-primary': 'var(--light-background-primary)',
          'background-secondary': 'var(--light-background-secondary)',
          'background-tertiary': 'var(--light-background-tertiary)',
          'surface-primary': 'var(--light-surface-primary)',
          'surface-secondary': 'var(--light-surface-secondary)',
          'surface-tertiary': 'var(--light-surface-tertiary)',
          'text-primary': 'var(--light-text-primary)',
          'text-secondary': 'var(--light-text-secondary)',
          'text-tertiary': 'var(--light-text-tertiary)',
          'text-inverse': 'var(--light-text-inverse)',
          'border-primary': 'var(--light-border-primary)',
          'border-secondary': 'var(--light-border-secondary)',
          'border-focus': 'var(--light-border-focus)',
          'accent-primary': 'var(--light-accent-primary)',
          'accent-secondary': 'var(--light-accent-secondary)',
        },
        // Dark theme colors
        'dark': {
          'background-primary': 'var(--dark-background-primary)',
          'background-secondary': 'var(--dark-background-secondary)',
          'background-tertiary': 'var(--dark-background-tertiary)',
          'surface-primary': 'var(--dark-surface-primary)',
          'surface-secondary': 'var(--dark-surface-secondary)',
          'surface-tertiary': 'var(--dark-surface-tertiary)',
          'text-primary': 'var(--dark-text-primary)',
          'text-secondary': 'var(--dark-text-secondary)',
          'text-tertiary': 'var(--dark-text-tertiary)',
          'text-inverse': 'var(--dark-text-inverse)',
          'border-primary': 'var(--dark-border-primary)',
          'border-secondary': 'var(--dark-border-secondary)',
          'border-focus': 'var(--dark-border-focus)',
          'accent-primary': 'var(--dark-accent-primary)',
          'accent-secondary': 'var(--dark-accent-secondary)',
        }
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      }
    },
  },
  plugins: [],
} 