import { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface AppShellProps {
  navItems: NavItem[];
  headerStart?: ReactNode;
  headerCenter?: ReactNode;
  headerEnd?: ReactNode;
  navTop?: ReactNode;
  navBottom?: ReactNode;
  footer?: ReactNode;
  renderNavContent?: (items: NavItem[]) => ReactNode;
  children: ReactNode;
}

