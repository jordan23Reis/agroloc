import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { machineryFeatureRoutes } from './lib.routes';
import { MachineryRegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DetailsComponent } from './details/details.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImageModule } from 'primeng/image';
import { MatDialogModule } from '@angular/material/dialog';
import { EditMachineryComponent } from './edit-machinery/edit-machinery.component';
import { RatingModule } from 'primeng/rating';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(machineryFeatureRoutes),
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ScrollingModule,
    ImageModule,
    MatDialogModule,
    RatingModule,
    AsyncPipe,
    FormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
  declarations: [
    MachineryRegisterComponent,
    SearchComponent,
    DetailsComponent,
    EditMachineryComponent,
  ],
  exports: [MachineryRegisterComponent, SearchComponent, DetailsComponent],
})
export class MachineryFeatureModule {}
