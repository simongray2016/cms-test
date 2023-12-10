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
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  form = new FormGroup({
    account: new FormControl('triet', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('123456', {
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
