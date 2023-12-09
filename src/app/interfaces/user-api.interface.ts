import { ERole } from '../enums/roles.enum';

export interface ILoginParams {
  account: string;
  password: string;
}

export interface IUpdatePasswordParams {
  account: string;
  password: string;
  newPassword: string;
}

export interface IUpdatePermissionParams {
  account: string;
  newRole: ERole;
}
