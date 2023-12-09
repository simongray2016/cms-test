import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'aperture',
    route: '/dashboard',
  },
  {
    displayName: 'Account Management',
    iconName: 'user-circle',
    route: '/account-management',
  },
  {
    displayName: 'Change Password',
    iconName: 'chart-candle',
    route: '/change-password',
  },
];
