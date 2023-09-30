import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeFeatureRoutes } from './lib.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeFeatureRoutes)],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeFeatureModule {}
