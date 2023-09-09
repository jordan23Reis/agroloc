import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'web',
    loadChildren: () =>
      import('@agroloc/home/shell').then((m) => m.HomeShellModule),
  },
  {
    path: 'mob',
    loadChildren: () =>
      import('@agroloc/home/shell').then((m) => m.HomeShellModule),
  },
];
