import { default as React } from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost';
};
export declare const Button: React.FC<Props>;
export {};
