import { Request, Response } from 'express';
import mung from 'express-mung';

/**
 * Intercepta a resposta por padrão e formata o JSON de saída
 */
const ResponseHandler = mung.json(
  (body: any, request: Request, response: Response) => {
    const path = request.url;

    // Mostrar em produção enquanto o swagger tiver oculto
    if (path === '/' && process.env.NODE_ENV === 'production') {
      response.json({
        status: 'success',
        code: 200,
        data: {
          message: 'FortBrasil',
        },
      });
    }

    // Modifica os retornos, exceto o swagger.json
    if (path !== '/swagger.json') {
      const statusCode = response.statusCode || 500;
      let status = 'success';

      // Em caso de requisição inválida
      if (statusCode >= 400 && statusCode <= 499) {
        status = 'fail';
      }

      // Em caso de erro do servidor
      if (statusCode >= 500 && statusCode <= 599) {
        status = 'error';
      }

      const json = {
        status,
        code: statusCode,
        data: body,
      };

      if (
        process.env.NODE_ENV === 'production' &&
        Object.prototype.hasOwnProperty.call(json.data, 'errors')
      ) {
        delete json.data.errors;
      }
      if (
        process.env.NODE_ENV === 'production' &&
        Object.prototype.hasOwnProperty.call(json.data, 'stack')
      ) {
        delete json.data.stack;
      }
      response.json(json);
    }
  },
  {
    mungError: true,
  },
);

export default ResponseHandler;
