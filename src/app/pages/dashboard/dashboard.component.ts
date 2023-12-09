import {
  Component,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopCardsComponent } from '../../components/dashboard1/top-cards/top-cards.component';
import { AppProjectsComponent } from '../../components/dashboard1/projects/projects.component';
import { AppTotalRequestsComponent } from '../../components/dashboard/total-requests/total-requests.component';
import { AppTotalErrorsComponent } from '../../components/dashboard/total-errors/total-errors.component';
import { AppGpuAvgComponent } from '../../components/dashboard/gpu-avg/gpu-avg.component';
import { AppCpuAvgComponent } from '../../components/dashboard/cpu-avg/cpu-avg.component';
import { AppSystemComponent } from '../../components/dashboard/system/system.component';
import { AppRamAvgComponent } from '../../components/dashboard/ram-avg/ram-avg.component';
import { AppChartDetailComponent } from '../../components/dashboard/chart-detail/chart-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { format } from 'date-fns';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DashboardApiService } from '../../apis/dashboard-api.service';
import { EMPTY, finalize, interval, Subject } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import * as moment from 'moment';

export enum DataType {
  totalRequests,
  totalErrors,
  gpuAvg,
  cpuAvg,
  system,
  ramAvg,
}

export interface DataOverview {
  dataType: DataType;
  title: string;
  detailTitle?: string;
  value?: number;
  percent?: number;
  min?: number;
  max?: number;
  worker?: number;
  process?: number;
  series: ApexAxisChartSeries;
  yaxis: ApexYAxis;
}

export interface OverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export type DetailChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};

export const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable()
export class ThreeDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createThreeDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createThreeDayRange(activeDate);
  }

  private _createThreeDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -1);
      const end = this._dateAdapter.addCalendarDays(date, 1);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AppTopCardsComponent,
    AppProjectsComponent,
    AppTotalRequestsComponent,
    AppTotalErrorsComponent,
    AppGpuAvgComponent,
    AppCpuAvgComponent,
    AppSystemComponent,
    AppRamAvgComponent,
    AppChartDetailComponent,
    MatCardModule,
    MatIconModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatProgressBarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: ThreeDayRangeSelectionStrategy,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class AppDashboardComponent implements OnInit, OnDestroy {
  private dashboardApiService = inject(DashboardApiService);

  readonly destroy$ = new Subject();
  readonly DataType = DataType;
  readonly durations = [
    { value: 5, viewValue: '5m' },
    { value: 10, viewValue: '10m' },
    { value: 30, viewValue: '30m' },
    { value: 60, viewValue: '1h' },
  ];
  loading = false;
  dataOverview: DataOverview[] = [
    {
      dataType: DataType.totalRequests,
      title: 'Total Request (5m)',
      detailTitle: 'Total Request',
      value: 288,
      percent: 22,
      series: [
        {
          name: '',
          data: [],
        },
      ],
      yaxis: {
        labels: {
          show: false,
        },
        max: 200,
      },
    },
    {
      dataType: DataType.totalErrors,
      title: 'Total Errors (5m)',
      detailTitle: 'Total Errors',
      value: 288,
      percent: 22,
      series: [
        {
          name: '',
          data: [],
        },
      ],
      yaxis: {
        labels: {
          show: false,
        },
        max: 200,
      },
    },
    {
      dataType: DataType.gpuAvg,
      title: 'GPU Avg',
      value: 23,
      min: 30,
      max: 50,
      series: [
        {
          name: '',
          data: [],
        },
      ],
      yaxis: {
        labels: {
          show: false,
        },
        max: 200,
      },
    },
    {
      dataType: DataType.cpuAvg,
      title: 'CPU Avg',
      value: 23,
      min: 30,
      max: 50,
      series: [
        {
          name: '',
          data: [],
        },
      ],
      yaxis: {
        labels: {
          show: false,
        },
        max: 200,
      },
    },
    {
      dataType: DataType.system,
      title: 'System',
      worker: 23,
      process: 30,
      series: [
        {
          name: '',
          data: [],
        },
      ],
      yaxis: {
        labels: {
          show: false,
        },
        max: 200,
      },
    },
    {
      dataType: DataType.ramAvg,
      title: 'RAM Avg',
      value: 23,
      min: 30,
      max: 50,
      series: [
        {
          name: '',
          data: [],
        },
      ],
      yaxis: {
        labels: {
          show: false,
        },
        max: 200,
      },
    },
  ];
  overviewChart: Partial<OverviewChart> | any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 80,
      resize: true,
      barColor: '#fff',
      sparkline: {
        enabled: true,
      },
    } as ApexChart,
    colors: ['#5D87FF'],
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        barHeight: '20%',
        borderRadius: 3,
      },
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ['rgba(0,0,0,0.01)'],
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      max: 200,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
    },
  };
  detailChart: Partial<DetailChart> | any = {
    series: [
      {
        name: '',
        data: [],
      },
    ],
    chart: {
      height: 500,
      type: 'line',
      fontFamily: 'DM Sans,sans-  serif',
      foreColor: '#a1aab2',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
      strokeColors: 'transparent',
    },
    stroke: {
      curve: 'straight',
      width: '2',
    },
    colors: ['#398bf7'],
    legend: {
      show: false,
    },
    grid: {
      show: true,
      strokeDashArray: 0,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (val: number) => {
          return format(new Date(val), 'yyyy-LL-dd HH:mm');
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => {
          return val.toFixed(2);
        },
      },
    },
  };
  form = new FormGroup({
    from: new FormControl(moment().subtract(2, 'days')),
    to: new FormControl(moment()),
    duration: new FormControl(this.durations[0].value),
    selectedItem: new FormControl(this.dataOverview[0]),
  });

  get itemSelected() {
    return this.form.controls.selectedItem;
  }

  ngOnInit() {
    this.getDataOverview();
    this.getDataDetail();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  getDataDetail() {
    this.form.valueChanges
      .pipe(
        startWith(this.form.getRawValue()),
        switchMap((value) => {
          const { from, to, duration } = value;
          if (from && to) {
            this.loading = true;
            const start = moment(from || moment()).format(
              'YYYY-MM-DD HH:mm:ss',
            );
            const end = moment(to || moment()).format('YYYY-MM-DD HH:mm:ss');
            return this.dashboardApiService
              .getDataDetail({
                time: duration || 0,
                start,
                end,
              })
              .pipe(finalize(() => (this.loading = false)));
          }
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        let data: number[][] = [];
        switch (this.itemSelected.value?.dataType) {
          case DataType.totalRequests:
            data = res.historiesRequest.map((i) => [i.date, i.totalRequest]);
            break;
          case DataType.totalErrors:
            data = res.historiesErrors.map((i) => [i.date, i.totalRequest]);
            break;
          case DataType.system:
            data = res.historiesSystem.map((i) => [i.date, i.process]);
            break;
          case DataType.ramAvg:
            data = res.historiesRam.map((i) => [i.date, i.avg]);
            break;
          case DataType.cpuAvg:
            data = res.historiesCpu.map((i) => [i.date, i.avg]);
            break;
          case DataType.gpuAvg:
            data = res.historiesGpu.map((i) => [i.date, i.avg]);
            break;
        }
        this.detailChart.series = [{ data }];
      });
  }

  getDataOverview() {
    interval(10000)
      .pipe(
        startWith(null),
        takeUntil(this.destroy$),
        switchMap(() => this.dashboardApiService.getDataOverview()),
      )
      .subscribe((res) => {
        this.dataOverview.forEach((item, index) => {
          switch (item.dataType) {
            case DataType.totalRequests:
              item.value = res.totalRequest.totalRequest;
              item.percent = res.totalRequest.percent;
              item.series = [
                { data: res.historiesRequest.map((i) => i.totalRequest) },
              ];
              // item.value = Math.floor(Math.random() * 200) + 1;
              // item.percent = Math.floor(Math.random() * 100) + 1;
              // if (item.series[0].data.length) {
              //   const data = item.series[0].data;
              //   data.splice(0, 1);
              //   data.push((Math.floor(Math.random() * 200) + 1) as any);
              //   item.series = [
              //     {
              //       data,
              //     },
              //   ];
              // } else {
              //   const data = Array.from(
              //     { length: 8 },
              //     (value, index) => Math.floor(Math.random() * 100) + 1,
              //   );
              //   item.series = [
              //     {
              //       data,
              //     },
              //   ];
              // }
              break;
            case DataType.totalErrors:
              item.value = res.totalError.totalRequest;
              item.percent = res.totalRequest.percent;
              item.series = [
                { data: res.historiesErrors.map((i) => i.totalRequest) },
              ];
              break;
            case DataType.cpuAvg:
              item.value = res.cpu.avg;
              item.min = res.cpu.min;
              item.max = res.cpu.max;
              item.series = [{ data: res.historiesCpu.map((i) => i.avg) }];
              break;
            case DataType.gpuAvg:
              item.value = res.gpu.avg;
              item.min = res.gpu.min;
              item.max = res.gpu.max;
              item.series = [{ data: res.historiesGpu.map((i) => i.avg) }];
              break;
            case DataType.ramAvg:
              item.value = res.ram.avg;
              item.min = res.ram.min;
              item.max = res.ram.max;
              item.series = [{ data: res.historiesRam.map((i) => i.avg) }];
              break;
            case DataType.system:
              item.process = res.system.process;
              item.worker = res.system.worker;
              item.series = [
                { data: res.historiesSystem.map((i) => i.process) },
              ];
              break;
          }
        });
      });
  }

  generateDayWiseTimeSeries(
    baseval: number,
    count: number,
    yrange: { min: number; max: number },
  ) {
    let i = 0;
    let series = [];
    while (i < count) {
      let x = baseval;
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}
