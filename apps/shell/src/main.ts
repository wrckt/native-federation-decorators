import { initFederation } from '@angular-architects/native-federation';
import { FEDERATION_MANIFEST } from 'federation.manifest';

initFederation(FEDERATION_MANIFEST)
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
