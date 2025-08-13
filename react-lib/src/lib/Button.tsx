import React from 'react';

// Pull in CSS variables produced by Style Dictionary
import '@yourco/tokens/css'; // -> packages/tokens/dist/css/tokens.css
// (optional) your shared base styles if you have them
// import '@yourco/styles';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button: React.FC<Props> = ({
  variant = 'primary',
  style,
  ...props
}) => {
  const base: React.CSSProperties = {
    borderRadius: 'var(--radius-md)',
    padding: '0.5rem 1rem',
    fontWeight: 600,
  };
  const primary: React.CSSProperties = {
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
  };
  const ghost: React.CSSProperties = {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
  };
  return (
    <button
      {...props}
      style={{
        ...base,
        ...(variant === 'primary' ? primary : ghost),
        ...style,
      }}
    />
  );
};
