import { ERole } from '../enums/roles.enum';

export interface IAccount {
  id: number;
  account: string;
  role: ERole;
}
