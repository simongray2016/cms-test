import { NavItem } from './nav-item/nav-item';
import { ERole } from '../../../enums/roles.enum';

export const navItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'aperture',
    route: '/dashboard',
    permissions: [ERole.ADMIN, ERole.USER],
  },
  {
    displayName: 'Account Management',
    iconName: 'user-circle',
    route: '/account-management',
    permissions: [ERole.ADMIN],
  },
  {
    displayName: 'Change Password',
    iconName: 'chart-candle',
    route: '/change-password',
    permissions: [ERole.ADMIN],
  },
];
