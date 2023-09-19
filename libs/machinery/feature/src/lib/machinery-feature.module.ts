import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { machineryFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(machineryFeatureRoutes)],
})
export class MachineryFeatureModule {}
