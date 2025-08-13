import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button: React.FC<Props> = ({
  variant = 'primary',
  style,
  ...props
}) => {
  const base: React.CSSProperties = {
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  };
  
  const primary: React.CSSProperties = {
    background: 'var(--color-light-accent-primary)',
    color: 'var(--color-light-text-inverse)',
    border: 'none',
  };
  
  const ghost: React.CSSProperties = {
    background: 'transparent',
    color: 'var(--color-light-accent-primary)',
    border: '1px solid var(--color-light-accent-primary)',
  };

  const hoverStyles: React.CSSProperties = {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <button
      {...props}
      style={{
        ...base,
        ...(variant === 'primary' ? primary : ghost),
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
