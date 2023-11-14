import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'remote-1-entry',
    loadComponent: () =>
      loadRemoteModule('remote-1', './Entry')
  },
  {
    path: 'remote-1',
    loadChildren: () => {
      return loadRemoteModule('remote-1', './Routes').then((m) => m.appRoutes);
    }
  }
];
