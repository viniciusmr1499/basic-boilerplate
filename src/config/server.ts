import express from 'express';
import '@tsed/platform-express';
import '@tsed/swagger';

import jwt from '@middlewares/jwt';
import responseHandler from '@middlewares/responseHandler';
import { PlatformApplication } from '@tsed/common';
import { Configuration, Inject } from '@tsed/di';

@Configuration()
export default class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  public $beforeRoutesInit() {
    /** Middleware do Express p/ fazer o parse do JSON (baseado no body-parse) */
    this.app.use(express.json());
    /** Middleware padrão para manipulação das respostas JSON */
    this.app.use(responseHandler);
    /** Middleware padrão para autenticar clientes externos */
    // this.app.use(jwt);
  }
}
