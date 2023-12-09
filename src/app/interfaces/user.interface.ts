import { ERole } from '../enums/roles.enum';

export interface IUser {
  id: number;
  account: string;
  fullName: string;
  role: ERole;
}
