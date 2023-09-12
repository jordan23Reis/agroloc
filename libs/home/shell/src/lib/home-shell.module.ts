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
import { AccountFeatureModule } from '@agroloc/account/feature'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeShellRoutes),
    MatGridListModule,
    AccountFeatureModule
  ],
  declarations: [
    WebComponent,
    MobComponent,
    WebRegisterComponent,
    MobRegisterComponent,
    WebLoginComponent,
    MobLoginComponent,
    Error404Component,
  ],
})
export class HomeShellModule {}
