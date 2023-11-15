import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rentFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(rentFeatureRoutes)],
})
export class RentFeatureModule {}
