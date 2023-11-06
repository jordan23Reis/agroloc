import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { homeShellRoutes } from './lib.routes';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';
import { WebRegisterComponent } from './web-register/web-register.component';
import { MobRegisterComponent } from './mob-register/mob-register.component';
import { WebLoginComponent } from './web-login/web-login.component';
import { MobLoginComponent } from './mob-login/mob-login.component';
import { Error404Component } from './error404/error404.component';
import { AccountFeatureModule } from '@agroloc/account/feature';
import { MachineryFeatureModule } from '@agroloc/machinery/feature';
import { HomeFeatureModule } from '@agroloc/home/feature';
import { WebMainComponent } from './web-main/web-main.component';
import { MobMainComponent } from './mob-main/mob-main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeShellRoutes),
    MatGridListModule,
    AccountFeatureModule,
    HomeFeatureModule,
    MachineryFeatureModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    ScrollingModule,
  ],
  declarations: [
    WebComponent,
    MobComponent,
    WebRegisterComponent,
    MobRegisterComponent,
    WebLoginComponent,
    MobLoginComponent,
    Error404Component,
    WebMainComponent,
    MobMainComponent,
  ],
})
export class HomeShellModule {}
