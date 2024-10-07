import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone-pipe/phone.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PhonePipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    PhonePipe,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
