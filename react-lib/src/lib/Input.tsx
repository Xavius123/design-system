import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  error?: string;
  helperText?: string;
};

export const Input: React.FC<Props> = ({
  variant = 'default',
  size = 'medium',
  label,
  error,
  helperText,
  style,
  ...props
}) => {
  const base: React.CSSProperties = {
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease-in-out',
    border: '1px solid var(--color-light-border-primary)',
    outline: 'none',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  };

  const sizes: Record<Props['size'], React.CSSProperties> = {
    small: {
      padding: '0.375rem 0.75rem',
      fontSize: '12px',
    },
    medium: {
      padding: '0.5rem 0.75rem',
      fontSize: '14px',
    },
    large: {
      padding: '0.75rem 1rem',
      fontSize: '16px',
    },
  };

  const variants: Record<Props['variant'], React.CSSProperties> = {
    default: {
      background: 'var(--color-light-background-primary)',
      color: 'var(--color-light-text-primary)',
    },
    filled: {
      background: 'var(--color-light-background-secondary)',
      color: 'var(--color-light-text-primary)',
      borderColor: 'var(--color-light-border-secondary)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-light-text-primary)',
      borderWidth: '2px',
    },
  };

  const focusStyles: React.CSSProperties = {
    borderColor: 'var(--color-light-border-focus)',
    boxShadow: '0 0 0 3px rgba(59, 108, 207, 0.1)',
  };

  const errorStyles: React.CSSProperties = {
    borderColor: '#dc2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-light-text-primary)',
  };

  const helperTextStyles: React.CSSProperties = {
    marginTop: '0.25rem',
    fontSize: '12px',
    color: error ? '#dc2626' : 'var(--color-light-text-tertiary)',
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          ...base,
          ...sizes[size],
          ...variants[variant],
          ...(error && errorStyles),
          ...style,
        }}
        onFocus={(e) => {
          if (!error) {
            Object.assign(e.currentTarget.style, focusStyles);
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.boxShadow = '';
          }
        }}
      />
      {(helperText || error) && (
        <div style={helperTextStyles}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};
