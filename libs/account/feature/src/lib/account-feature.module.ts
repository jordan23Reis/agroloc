import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { RouterModule } from '@angular/router';
import { accountFeatureRoutes } from './lib.routes';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(accountFeatureRoutes),
    NgSwitch,
    NgSwitchCase,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    HttpClientModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent],
})
export class AccountFeatureModule {}
