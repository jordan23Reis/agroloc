import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { accountFeatureRoutes } from './lib.routes';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(accountFeatureRoutes)],
  declarations: [RegisterComponent, LoginComponent],
})
export class AccountFeatureModule {}
