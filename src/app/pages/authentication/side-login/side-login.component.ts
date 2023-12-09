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
import { MaterialModule } from '../../../material.module';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private userService: UserService,
    private snackBar: MatSnackBar,
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
    this.userService
      .login(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.enable();
        }),
      )
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard');
        },
        error: (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.message || 'Something went wrong');
        },
      });
  }
}
