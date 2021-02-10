import ormconfig from '@config/ormconfig';
import { EndpointDirectoriesSettings } from '@tsed/common';
import { Configuration } from '@tsed/di';
import '@tsed/typeorm';

const rootDir = `${__dirname}/..`;

export default () =>
  <Configuration>{
    rootDir,
    mount: <EndpointDirectoriesSettings>{
      '/': [`${rootDir}/controllers/**.controller{.ts,.js}`],
    },
    httpPort: process.env.PORT || 5000,

    // Configuração do nível do log e do debug
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
    },
    debug: process.env.NODE_ENV !== 'production',

    // Configuração do Swagger, habilitado apenas em desenvolvimento
    swagger:
      process.env.NODE_ENV === 'production'
        ? false
        : [
            {
              path: '/',
              specVersion: '3.0.1',
            },
          ],

    // Configuração de banco de dados através do typeorm
    typeorm: ormconfig(),
  };
