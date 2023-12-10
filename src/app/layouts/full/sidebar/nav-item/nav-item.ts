import { EPermission, ERole } from '../../../../enums/roles.enum';

export interface NavItem {
  displayName: string;
  iconName: string;
  route: string;
  permissions: (ERole | EPermission)[];
}
