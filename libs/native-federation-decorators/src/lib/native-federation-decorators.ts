import { FederationConfig } from '@softarc/native-federation/src/lib/config/federation-config';

export function withNativeFederationDynamicHost(config: FederationConfig, options?: { manifestUrl?: string }): ((target: any) => void) {
  // initFederation(options?.manifestUrl ?? '/assets/federation.manifest.json')
  //   .then(() => { })
  //   .catch(err => console.error(err));
  return (target: any): void => { };
};

export function withNativeFederationRemote(config: FederationConfig): ((target: any) => void) {
  return (target: any): void => { };
};
