import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppSettings, defaults } from '../app.config';
import { IUser } from '../interfaces/user.interface';
import { UserApiService } from '../apis/user-api.service';
import { ILoginParams } from '../interfaces/user-api.interface';
import { Router } from '@angular/router';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { EPermission, ERole } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApi = inject(UserApiService);
  private permissionService = inject(NgxPermissionsService);
  private roleService = inject(NgxRolesService);
  private user$ = new BehaviorSubject<IUser | null>(null);

  constructor() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData) as IUser;
      this.user$.next(user);
      this.setPermission(user.role);
    }
  }

  get user() {
    return this.user$.asObservable();
  }

  setUser(data: IUser | null) {
    this.user$.next(data);
  }

  login(data: ILoginParams) {
    return this.userApi.login(data).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user$.next(user);
        this.setPermission(user.role);
      }),
    );
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem('user');
  }

  setPermission(roleName: ERole) {
    const roles = {
      [ERole.USER]: [EPermission.DASHBOARD],
      [ERole.ADMIN]: [
        EPermission.DASHBOARD,
        EPermission.ACCOUNT_MANAGEMENT,
        EPermission.CHANGE_PASSWORD,
      ],
    };
    this.roleService.flushRolesAndPermissions();
    this.permissionService.loadPermissions(roles[roleName]);
    this.roleService.addRole(roleName, roles[roleName]);
    console.log(this.roleService.getRoles());
  }
}
