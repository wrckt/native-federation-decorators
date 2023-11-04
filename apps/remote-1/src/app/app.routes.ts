import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { initFederation } from '@angular-architects/native-federation';
import { FEDERATION_MANIFEST } from 'federation.manifest';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'remote-2',
    loadComponent: () =>
      initFederation(FEDERATION_MANIFEST)
      .then(() => loadRemoteModule('remote-2', './Component'))
      .then((m) => m.AppComponent)
  }
];
