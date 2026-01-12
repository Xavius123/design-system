import { useMediaQuery } from './useMediaQuery';
import { breakpoints, getMediaQuery, type Breakpoint } from '@/tokens';

export function useBreakpointUp(breakpoint: Breakpoint): boolean {
  return useMediaQuery(getMediaQuery(breakpoint, 'up'));
}

export function useBreakpointDown(breakpoint: Breakpoint): boolean {
  return useMediaQuery(getMediaQuery(breakpoint, 'down'));
}

export function useCurrentBreakpoint(): Breakpoint {
  const is2xl = useBreakpointUp('2xl');
  const isXl = useBreakpointUp('xl');
  const isLg = useBreakpointUp('lg');
  const isMd = useBreakpointUp('md');
  const isSm = useBreakpointUp('sm');
  
  if (is2xl) return '2xl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'sm';
}

