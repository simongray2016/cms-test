import {Routes} from '@angular/router';

// dashboards
import {AppDashboardComponent} from "./dashboard/dashboard.component";
import {AppDashboard1Component} from './dashboard1/dashboard1.component';
import {AppDashboard2Component} from './dashboard2/dashboard2.component';

export const DashboardsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: AppDashboardComponent,
                data: {
                    title: 'Dashboard',
                    urls: [
                        {title: 'Dashboard', url: '/dashboards/dashboard1'},
                        {title: 'Analytical'},
                    ],
                },
            },
            {
                path: 'dashboard1',
                component: AppDashboard1Component,
                data: {
                    title: 'Dashboard',
                    urls: [
                        {title: 'Dashboard', url: '/dashboards/dashboard1'},
                        {title: 'Analytical'},
                    ],
                },
            },
            {
                path: 'dashboard2',
                component: AppDashboard2Component,
                data: {
                    title: 'Dashboard',
                    urls: [
                        {title: 'Dashboard', url: '/dashboards/dashboard1'},
                        {title: 'eCommerce'},
                    ],
                },
            },
        ],
    },
];
