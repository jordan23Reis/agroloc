import { Route } from '@angular/router';
import { WebComponent } from './web/web.component';
import { MobComponent } from './mob/mob.component';

export const homeShellRoutes: Route[] = [
  {
    path: 'account-feature',
    loadChildren: () =>
      import('@agroloc/account/feature').then((m) => m.AccountFeatureModule),
  },
  { path: 'web', pathMatch: 'prefix', component: WebComponent, children: [] },
  { path: 'mob', pathMatch: 'prefix', component: MobComponent, children: [] },
  // {
  //   path: 'home-feature',
  //   loadChildren: () =>
  //     import('@agroloc/home/feature').then((m) => m.HomeFeatureModule),
  // },
];
