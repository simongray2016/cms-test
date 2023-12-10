import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { EPermission, ERole } from './enums/roles.enum';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.AppDashboardComponent,
          ),
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Dashboard',
          permissions: {
            only: [ERole.ADMIN, ERole.USER],
          },
        },
      },
      {
        path: 'account-management',
        loadComponent: () =>
          import(
            './pages/account-management/account-management.component'
          ).then((m) => m.AccountManagementComponent),
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Account Management',
          permissions: {
            only: [ERole.ADMIN],
          },
        },
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./pages/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent,
          ),
        canActivate: [AuthGuard, NgxPermissionsGuard],
        data: {
          title: 'Change Password',
          permissions: {
            only: [ERole.ADMIN],
          },
        },
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        data: {
          title: 'Change Password',
        },
      },
      {
        path: 'error',
        loadComponent: () =>
          import('./pages/error/error.component').then((m) => m.ErrorComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
