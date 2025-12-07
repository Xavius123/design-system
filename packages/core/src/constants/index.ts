/**
 * Default values and constants used across components
 */

export const DEFAULT_SIZE = 'md' as const;
export const DEFAULT_BUTTON_VARIANT = 'primary' as const;
export const DEFAULT_BUTTON_TYPE = 'button' as const;
export const DEFAULT_INPUT_TYPE = 'text' as const;

/**
 * Platform detection
 */
export const IS_WEB = typeof window !== 'undefined' && typeof document !== 'undefined';
export const IS_NATIVE = !IS_WEB;

