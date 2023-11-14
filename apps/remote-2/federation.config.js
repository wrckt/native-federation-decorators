import path from 'path';
import { fileURLToPath } from 'url';
import { getConfigFromProject } from '@wrckt/native-federation-decorators/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default getConfigFromProject({ tsConfigFilePath: __dirname + '/tsconfig.app.json'});
