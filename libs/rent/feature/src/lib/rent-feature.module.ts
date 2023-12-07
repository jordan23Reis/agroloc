import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rentFeatureRoutes } from './lib.routes';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { MatIconModule } from '@angular/material/icon';
import { ImageModule } from 'primeng/image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RatingModule } from 'primeng/rating';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentFeatureRoutes),
    MatIconModule,
    ImageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    RatingModule,
  ],
  declarations: [NegotiateComponent],
  exports: [NegotiateComponent],
})
export class RentFeatureModule {}
