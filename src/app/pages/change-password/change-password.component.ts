import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { finalize, take } from 'rxjs';
import { UserApiService } from '../../apis/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class ChangePasswordComponent implements OnInit {
  private userService = inject(UserService);
  private userApiService = inject(UserApiService);
  private snackbar = inject(MatSnackBar);
  loading = false;
  form = new FormGroup(
    {
      account: new FormControl('', { nonNullable: true }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: [this.validatePasswordMatching] },
  );

  ngOnInit() {
    this.userService.user.pipe(take(1)).subscribe((user) => {
      this.form.controls.account.setValue(user?.account || '');
    });
  }

  validatePasswordMatching(formGroup: AbstractControl) {
    const { newPassword, confirmPassword } = formGroup.getRawValue();
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({
        notMatch: true,
      });
    }

    return null;
  }

  submit() {
    this.loading = true;
    const { account, password, newPassword } = this.form.getRawValue();
    this.userApiService
      .updatePassword({
        account,
        password,
        newPassword,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.snackbar.open('Update successfully');
        },
        error: (err: HttpErrorResponse) => {
          this.snackbar.open(err.error.message || 'Something went wrong');
        },
      });
  }
}
