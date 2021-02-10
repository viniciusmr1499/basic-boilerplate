import { ConnectionOptions } from 'typeorm';

export default () =>
  <ConnectionOptions[]>[
    // Conexão Padrão: Serviços
    {
      name: 'default',
      type: 'mysql',
      host: process.env.DB_API_HOST,
      port: Number(process.env.DB_API_PORT || 3306),
      username: process.env.DB_API_USER,
      password: process.env.DB_API_PASS,
      database: process.env.DB_API_NAME,
      logging: process.env.NODE_ENV !== 'production' ? 'all' : ['error'],
      entities: [`${__dirname}/../entities/api/*{.ts,.js}`],
      cli: {
        entitiesDir: `${__dirname}/../entities/api`,
      },
    },

    // Conexão com a Stage
    // {
    //   name: 'stage',
    //   type: 'mssql',
    //   host: process.env.DB_STAGE_HOST,
    //   port: Number(process.env.DB_PORT || 1433),
    //   username: process.env.DB_STAGE_USER,
    //   password: process.env.DB_STAGE_PASS,
    //   database: process.env.DB_STAGE_NAME,
    //   logging: process.env.NODE_ENV !== 'production' ? 'all' : ['error'],
    //   entities: [`${__dirname}/../entities/stage/*{.ts,.js}`],
    //   cli: {
    //     entitiesDir: `${__dirname}/../entities/stage`,
    //   },
    //   extra: {
    //     options: {
    //       enableArithAbort: true,
    //     },
    //   },
    // },
  ];
