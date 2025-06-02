import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableDetailComponent } from './component/user-table-detail/user-table-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentFormDialogComponent } from './Popups/student-form-dialog/student-form-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './Popups/confirmation-dialog/confirmation-dialog.component';
import { NumericInputDirective } from './directives/numeric-input.directive';
@NgModule({
  declarations: [
    AppComponent,
    UserTableDetailComponent,
    StudentFormDialogComponent,
    ConfirmationDialogComponent,
    NumericInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      progressBar: true,
      newestOnTop: true,
      enableHtml: true,
      toastClass: 'custom-toastr',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
