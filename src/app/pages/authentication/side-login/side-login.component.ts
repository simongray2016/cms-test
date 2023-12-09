import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/apis/user.service';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  loading = false;

  constructor(
    private router: Router,
    private userApi: UserService,
  ) {}

  form = new FormGroup({
    account: new FormControl('hoang', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('12345678', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit() {
    this.loading = true;
    this.form.disable();
    this.userApi.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/dashboards/dashboard');
      },
      error: (err) => {},
      complete: () => {
        this.loading = false;
        this.form.enable();
      }
    });
  }
}
