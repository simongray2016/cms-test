import { Component, inject, ViewEncapsulation } from '@angular/core';
import { navItems } from './sidebar/sidebar-data';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Router, RouterOutlet } from '@angular/router';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { UserService } from '../../services/user.service';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    TablerIconsModule,
    RouterOutlet,
    AppNavItemComponent,
    NgxPermissionsModule,
  ],
  templateUrl: './full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  readonly user$ = this.userService.user;
  navItems = navItems;

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
