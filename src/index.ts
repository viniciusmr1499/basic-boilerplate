import 'reflect-metadata';

import app from '@config/app';
import dotenv from '@config/dotenv';
import Server from '@config/server';
import { PlatformExpress } from '@tsed/platform-express';

(async () => {
  // Carrega as variavéis de ambiente
  await dotenv();

  const config = app();

  // Start da Aplicação
  const platform = await PlatformExpress.bootstrap(Server, config);
  await platform.listen();
})();
