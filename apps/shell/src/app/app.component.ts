import { Component } from '@angular/core';
import '@angular/core/primitives/signals';
import { RouterModule } from '@angular/router';
import { withNativeFederationDynamicHost } from '@wrckt/native-federation-decorators';

@withNativeFederationDynamicHost({
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
  ],
})
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'native-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
