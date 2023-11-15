import { Component } from '@angular/core';
import '@angular/core/primitives/signals';
import { RouterModule } from '@angular/router';
import { withNativeFederationRemote } from '@wrckt/native-federation-decorators';

@withNativeFederationRemote({
  name: 'remote-1',
  exposes: {
    './Routes': './apps/remote-1/src/app/app.routes.ts',
  },
  shared: {
    '@angular/core': { requiredVersion: 'auto', singleton: true },
    '@angular/core/primitives/signals': { requiredVersion: 'auto', singleton: true },
    '@angular/common': { requiredVersion: 'auto', singleton: true },
    '@angular/router': { requiredVersion: 'auto', singleton: true },
    '@angular/common/http': { requiredVersion: 'auto', singleton: true },
  },
  skip: [
    'federation.manifest',
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]
})
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'native-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export default class AppComponent { }
