import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDataDetailParams } from '../interfaces/dashboard-api.interface';
import { IDashboardData } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getDataOverview() {
    return this.http.get<IDashboardData>(this.apiUrl + 'collect/report', {
      params: { time: 5 },
    });
  }

  getDataDetail(data: IDataDetailParams) {
    return this.http.get<IDashboardData>(this.apiUrl + 'collect/detail', {
      params: {
        time: data.time,
        start: data.start,
        end: data.end,
        type: 0,
      },
    });
  }
}
