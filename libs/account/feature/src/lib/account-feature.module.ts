import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { accountFeatureRoutes } from './lib.routes';
import { AccountRegisterComponent } from './register/register.component';
import { AccountLoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AccountDataAcessModule } from '@agroloc/account/data-acess';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountFeatureRoutes),
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    AccountDataAcessModule,
  ],
  declarations: [AccountRegisterComponent, AccountLoginComponent],
  exports: [AccountRegisterComponent, AccountLoginComponent],
})
export class AccountFeatureModule {}
