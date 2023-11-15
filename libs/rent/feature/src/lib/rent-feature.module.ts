import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rentFeatureRoutes } from './lib.routes';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentFeatureRoutes),
    MatIconModule,
  ],
  declarations: [NegotiateComponent],
  exports: [NegotiateComponent],
})
export class RentFeatureModule {}
