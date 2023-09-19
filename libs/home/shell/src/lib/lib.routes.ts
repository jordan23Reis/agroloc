import { Route } from '@angular/router';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';
import { WebLoginComponent } from './web-login/web-login.component';
import { MobLoginComponent } from './mob-login/mob-login.component';
import { Error404Component } from './error404/error404.component';
import { MobRegisterComponent } from './mob-register/mob-register.component';
import { WebRegisterComponent } from './web-register/web-register.component';
import { MachineryRegisterComponent } from 'libs/machinery/feature/src/lib/register/register.component';

export const homeShellRoutes: Route[] = [
  {
    path: 'web',
    pathMatch: 'prefix',
    component: WebComponent,
    children: [
      {
        path: 'login',
        pathMatch: 'prefix',
        component: WebLoginComponent,
        children: [],
      },
      {
        path: 'register',
        pathMatch: 'prefix',
        component: WebRegisterComponent,
        children: [],
      },
      {
        path: 'machinery',
        pathMatch: 'prefix',
        component: MachineryRegisterComponent,
        children: [],
      },
    ],
  },

  {
    path: 'mob',
    pathMatch: 'prefix',
    component: MobComponent,
    children: [
      {
        path: 'login',
        pathMatch: 'prefix',
        component: MobLoginComponent,
        children: [],
      },
      {
        path: 'register',
        pathMatch: 'prefix',
        component: MobRegisterComponent,
        children: [],
      },
    ],
  },

  {
    path: '404',
    component: Error404Component,
  },

  {
    path: '**',
    redirectTo: '404',
  },
  // {
  //   path: 'machinery-feature',
  //   loadChildren: () =>
  //     import('@agroloc/machinery/feature').then(
  //       (m) => m.MachineryFeatureModule
  //     ),
  // },
  // {
  //   path: 'home-feature',
  //   loadChildren: () =>
  //     import('@agroloc/home/feature').then((m) => m.HomeFeatureModule),
  // },
  // {
  //   path: 'account-feature',
  //   loadChildren: () =>
  //     import('@agroloc/account/feature').then((m) => m.AccountFeatureModule),
  // },
];
