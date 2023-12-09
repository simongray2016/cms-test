import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ILoginParams,
  IUpdatePasswordParams,
  IUpdatePermissionParams,
} from '../interfaces/user-api.interface';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { IAccount } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(data: ILoginParams) {
    return this.http.post<IUser>(
      this.apiUrl + 'user/login',
      {},
      {
        params: {
          account: data.account,
          password: data.password,
        },
      },
    );
  }

  addUser(data: ILoginParams) {
    return this.http.post(
      this.apiUrl + 'user/reg',
      {},
      {
        params: {
          account: data.account,
          password: data.password,
        },
      },
    );
  }

  updatePassword(data: IUpdatePasswordParams) {
    return this.http.post(
      this.apiUrl + 'user/update',
      {},
      {
        params: {
          account: data.account,
          password: data.password,
          newPassword: data.newPassword,
        },
      },
    );
  }

  updatePermission(data: IUpdatePermissionParams) {
    return this.http.post(
      this.apiUrl + 'user/permission',
      {},
      {
        params: {
          account: data.account,
          newRole: data.newRole,
        },
      },
    );
  }

  getUserList() {
    return this.http.get<IAccount[]>(this.apiUrl + 'user/list');
  }
}
