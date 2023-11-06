import { Route } from '@angular/router';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';
import { WebLoginComponent } from './web-login/web-login.component';
import { MobLoginComponent } from './mob-login/mob-login.component';
import { Error404Component } from './error404/error404.component';
import { MobRegisterComponent } from './mob-register/mob-register.component';
import { WebRegisterComponent } from './web-register/web-register.component';
import {
  MachineryRegisterComponent,
  SearchComponent,
} from '@agroloc/machinery/feature';
import { WebMainComponent } from './web-main/web-main.component';
import { MobMainComponent } from './mob-main/mob-main.component';
import { HomeComponent } from '@agroloc/home/feature';
import { DetailsComponent } from '@agroloc/machinery/feature';
import { ManagementComponent } from '@agroloc/account/feature';
import { AuthGuard } from '@agroloc/account/data-acess';
import { AutomobileComponent } from 'libs/account/feature/src/lib/automobile/automobile.component';

export const homeShellRoutes: Route[] = [
  {
    path: 'web',
    component: WebComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: WebLoginComponent,
        children: [],
      },
      {
        path: 'register',
        component: WebRegisterComponent,
        children: [],
      },
      {
        path: 'main',
        component: WebMainComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent,
            children: [],
          },
          {
            path: 'machinery',
            component: MachineryRegisterComponent,
            canActivate: [AuthGuard],
            data: {
              roles: ['Administrador', 'Comum', 'Freteiro'],
            },
            children: [],
          },
          {
            path: 'automobile',
            component: AutomobileComponent,
            canActivate: [AuthGuard],
            data: {
              roles: ['Administrador', 'Freteiro'],
            },
            children: [],
          },
          {
            path: 'search',
            component: SearchComponent,
            children: [],
          },
          {
            path: 'details',
            component: DetailsComponent,
            children: [],
          },
          {
            path: 'management',
            component: ManagementComponent,
            canActivate: [AuthGuard],
            data: {
              roles: ['Administrador', 'Comum', 'Freteiro'],
            },
            children: [],
          },
        ],
      },
    ],
  },

  {
    path: 'mob',
    component: MobComponent,
    children: [
      {
        path: 'login',
        component: MobLoginComponent,
        children: [],
      },
      {
        path: 'register',
        component: MobRegisterComponent,
        children: [],
      },
      {
        path: 'home',
        component: MobMainComponent,
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
