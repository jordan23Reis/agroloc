import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rentFeatureRoutes } from './lib.routes';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { MatIconModule } from '@angular/material/icon';
import { ImageModule } from 'primeng/image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentFeatureRoutes),
    MatIconModule,
    ImageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NegotiateComponent],
  exports: [NegotiateComponent],
})
export class RentFeatureModule {}
