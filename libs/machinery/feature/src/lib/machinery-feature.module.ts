import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { machineryFeatureRoutes } from './lib.routes';
import { MachineryRegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(machineryFeatureRoutes)],
  declarations: [MachineryRegisterComponent],
  exports: [MachineryRegisterComponent],
})
export class MachineryFeatureModule {}
