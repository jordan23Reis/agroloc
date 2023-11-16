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
import { FavoriteComponent } from './favorite/favorite.component';
import { MatDividerModule } from '@angular/material/divider';
import { ManagementComponent } from './management/management.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutomobileComponent } from './automobile/automobile.component';
import { MatChipsModule } from '@angular/material/chips';
import { DetailsAutomobileComponent } from './details-automobile/details-automobile.component';
import { ImageModule } from 'primeng/image';

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
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatProgressBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    ImageModule,
  ],
  declarations: [
    AccountRegisterComponent,
    AccountLoginComponent,
    FavoriteComponent,
    ManagementComponent,
    AutomobileComponent,
    DetailsAutomobileComponent,
  ],
  exports: [
    AccountRegisterComponent,
    AccountLoginComponent,
    FavoriteComponent,
    ManagementComponent,
    AutomobileComponent,
    DetailsAutomobileComponent,
  ],
})
export class AccountFeatureModule {}
