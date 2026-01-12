export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Helper to get media query string
export const getMediaQuery = (breakpoint: Breakpoint, type: 'up' | 'down' = 'up'): string => {
  const width = breakpoints[breakpoint];
  return type === 'up' 
    ? `(min-width: ${width}px)` 
    : `(max-width: ${width - 1}px)`;
};

