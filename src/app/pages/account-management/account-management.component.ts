import { Component, inject, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IAccount } from '../../interfaces/account.interface';
import { ERole } from '../../enums/roles.enum';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, switchMap, tap } from 'rxjs';
import { UserApiService } from '../../apis/user-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './account-management.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class AccountManagementComponent {
  private userApiService = inject(UserApiService);
  private snackbar = inject(MatSnackBar);

  readonly ERole = ERole;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = ['#', 'account', 'role'];
  dataSource = new MatTableDataSource<IAccount>([]);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userApiService.getUserList().subscribe((list) => {
      this.dataSource.data = list;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AccountManagementDialogContentComponent);
    dialogRef
      .afterClosed()
      .pipe(
        switchMap((res) => {
          if (res.data) {
            const { account = '', password = '' } = res.data;
            return this.userApiService
              .addUser({
                account,
                password,
              })
              .pipe(
                tap({
                  next: (res) => {
                    this.snackbar.open('Add successfully');
                    this.getUserList();
                  },
                  error: (err: HttpErrorResponse) => {
                    this.snackbar.open(
                      err.error.message || 'Something went wrong',
                    );
                    this.getUserList();
                  },
                }),
              );
          }
          return of(null);
        }),
      )
      .subscribe();
  }

  roleChange(item: IAccount, role: ERole) {
    this.userApiService
      .updatePermission({
        account: item.account,
        newRole: role,
      })
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

@Component({
  // tslint:disable-next-line: component-selector
  standalone: true,
  selector: 'app-account-management-content',
  templateUrl: 'account-management-dialog-content.html',
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
// tslint:disable-next-line: component-class-suffix
export class AccountManagementDialogContentComponent {
  readonly ERole = ERole;
  account = '';
  password = '';

  constructor(
    public dialogRef: MatDialogRef<AccountManagementDialogContentComponent>,
  ) {}

  doAction(): void {
    this.dialogRef.close({
      data: {
        account: this.account,
        password: this.password,
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
