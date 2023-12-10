import { Component, inject, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { EPermission, ERole } from './enums/roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private permissionService = inject(NgxPermissionsService);
  private roleService = inject(NgxRolesService);

  ngOnInit() {
    const perm = Object.values(EPermission);
    this.permissionService.addPermission(perm);
    this.roleService.addRoles({
      [ERole.USER]: [EPermission.DASHBOARD],
      [ERole.ADMIN]: [
        EPermission.DASHBOARD,
        EPermission.ACCOUNT_MANAGEMENT,
        EPermission.CHANGE_PASSWORD,
      ],
    });
  }
}
