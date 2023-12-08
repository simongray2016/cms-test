import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppTopCardsComponent} from "../../../components/dashboard1/top-cards/top-cards.component";
import {AppProjectsComponent} from "../../../components/dashboard1/projects/projects.component";
import {AppTotalRequestsComponent} from "../../../components/dashboard/total-requests/total-requests.component";
import {AppTotalErrorsComponent} from "../../../components/dashboard/total-errors/total-errors.component";
import {AppGpuAvgComponent} from "../../../components/dashboard/gpu-avg/gpu-avg.component";
import {AppCpuAvgComponent} from "../../../components/dashboard/cpu-avg/cpu-avg.component";
import {AppSystemComponent} from "../../../components/dashboard/system/system.component";
import {AppRamAvgComponent} from "../../../components/dashboard/ram-avg/ram-avg.component";
import {AppChartDetailComponent} from "../../../components/dashboard/chart-detail/chart-detail.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [CommonModule, AppTopCardsComponent, AppProjectsComponent, AppTotalRequestsComponent, AppTotalErrorsComponent, AppGpuAvgComponent, AppCpuAvgComponent, AppSystemComponent, AppRamAvgComponent, AppChartDetailComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AppDashboardComponent {

}
