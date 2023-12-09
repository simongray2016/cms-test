import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppSettings, defaults } from '../app.config';
import { IUser } from '../interfaces/user.interface';
import { UserApiService } from '../apis/user-api.service';
import { ILoginParams } from '../interfaces/user-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private userApi = inject(UserApiService);
  private user$ = new BehaviorSubject<IUser | null>(null);

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
      }),
    );
  }
}
