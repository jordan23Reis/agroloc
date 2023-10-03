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
  ],
  declarations: [MachineryRegisterComponent, SearchComponent, DetailsComponent],
  exports: [MachineryRegisterComponent, SearchComponent, DetailsComponent],
})
export class MachineryFeatureModule {}