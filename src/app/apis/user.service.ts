import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ERole } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;


  login(params: { account: string; password: string }) {
    return this.http.post(this.apiUrl + 'user/login', {}, { params });
  }

  addUser(params: { account: string; password: string }) {
    return this.http.post(this.apiUrl + 'user/reg', {}, { params });
  }

  uppdatePassword(params: { account: string; password: string }) {
    return this.http.post(this.apiUrl + 'user/update', {}, { params });
  }

  updatePermission(params: { account: string; newRole: ERole }) {
    return this.http.post(this.apiUrl + 'user/update', {}, { params });
  }
}
