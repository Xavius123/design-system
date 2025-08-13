import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
};

export const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'medium',
  style,
  ...props
}) => {
  const base: React.CSSProperties = {
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontFamily: 'inherit',
  };

  const sizes = {
    small: {
      padding: '0.375rem 0.75rem',
      fontSize: '12px',
    },
    medium: {
      padding: '0.5rem 1rem',
      fontSize: '14px',
    },
    large: {
      padding: '0.75rem 1.5rem',
      fontSize: '16px',
    },
  };

  const variants = {
    primary: {
      background: 'var(--color-light-accent-primary)',
      color: 'var(--color-light-text-inverse)',
      border: 'none',
    },
    secondary: {
      background: 'var(--color-light-accent-secondary)',
      color: 'var(--color-light-text-inverse)',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-light-accent-primary)',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-light-accent-primary)',
      border: '1px solid var(--color-light-accent-primary)',
    },
    danger: {
      background: '#dc2626',
      color: 'var(--color-light-text-inverse)',
      border: 'none',
    },
    success: {
      background: '#16a34a',
      color: 'var(--color-light-text-inverse)',
      border: 'none',
    },
  };

  const hoverStyles: React.CSSProperties = {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  const disabledStyles: React.CSSProperties = {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  };

  return (
    <button
      {...props}
      style={{
        ...base,
        ...sizes[size],
        ...variants[variant],
        ...(props.disabled && disabledStyles),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!props.disabled) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled) {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    />
  );
};
