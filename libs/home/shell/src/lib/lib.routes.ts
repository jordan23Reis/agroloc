import { Route } from '@angular/router';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';
import { WebLoginComponent } from './web-login/web-login.component';
import { MobLoginComponent } from './mob-login/mob-login.component';

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
    ],
  },
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
