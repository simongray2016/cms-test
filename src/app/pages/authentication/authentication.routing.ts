import {Routes} from '@angular/router';
import {AppLoginComponent} from "./boxed-login/boxed-login.component";


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppLoginComponent,
      }
    ],
  },
];
