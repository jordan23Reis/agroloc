import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeShellRoutes } from './lib.routes';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeShellRoutes)],
  declarations: [WebComponent, MobComponent],
  exports: [WebComponent, MobComponent],
})
export class HomeShellModule {}
