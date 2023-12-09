import { Component, ViewEncapsulation } from '@angular/core';
import { navItems } from './vertical/sidebar/sidebar-data';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './vertical/sidebar/sidebar.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { RouterOutlet } from '@angular/router';
import { AppNavItemComponent } from './vertical/sidebar/nav-item/nav-item.component';

// for mobile app sidebar
interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    SidebarComponent,
    TablerIconsModule,
    RouterOutlet,
    AppNavItemComponent,
  ],
  templateUrl: './full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent {
  navItems = navItems;

  logout() {}
}
