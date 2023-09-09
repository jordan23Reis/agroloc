import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeShellRoutes } from './lib.routes';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';
import { WebRegisterComponent } from './web-register/web-register.component';
import { MobRegisterComponent } from './mob-register/mob-register.component';
import { WebLoginComponent } from './web-login/web-login.component';
import { MobLoginComponent } from './mob-login/mob-login.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeShellRoutes)],
  declarations: [
    WebComponent,
    MobComponent,
    WebRegisterComponent,
    MobRegisterComponent,
    WebLoginComponent,
    MobLoginComponent,
  ],
})
export class HomeShellModule {}
