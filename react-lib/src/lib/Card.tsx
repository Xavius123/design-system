import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
};

export const Card: React.FC<Props> = ({
  variant = 'default',
  padding = 'medium',
  style,
  children,
  ...props
}) => {
  const base: React.CSSProperties = {
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'inherit',
  };

  const variants = {
    default: {
      background: 'var(--color-light-background-primary)',
      border: '1px solid var(--color-light-border-primary)',
    },
    elevated: {
      background: 'var(--color-light-background-primary)',
      border: 'none',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    },
    outlined: {
      background: 'transparent',
      border: '2px solid var(--color-light-border-primary)',
    },
    filled: {
      background: 'var(--color-light-background-secondary)',
      border: 'none',
    },
  };

  const paddingSizes = {
    none: {},
    small: { padding: '1rem' },
    medium: { padding: '1.5rem' },
    large: { padding: '2rem' },
  };

  const hoverStyles: React.CSSProperties = {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'elevated' 
      ? '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div
      {...props}
      style={{
        ...base,
        ...variants[variant],
        ...paddingSizes[padding],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'elevated' || variant === 'default') {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'elevated' || variant === 'default') {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    >
      {children}
    </div>
  );
};
