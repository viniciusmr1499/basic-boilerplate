import { celebrate, Joi, errors, Segments } from 'celebrate';
import { Request, Response } from 'express';
import httpstatus from 'http-status-codes';

import { Controller, Get, UseBefore } from '@tsed/common';
import { Deprecated } from '@tsed/schema';

import AppositeService from '../services/api/apposite.service';

@Controller('/apposite')
class AppositeController {
  @Get('/show')
  @UseBefore(
    celebrate({
      [Segments.QUERY]: {
        cpf: Joi.string().required(),
      },
    }),
  )
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { cpf } = request.query;

      const appositeService = new AppositeService();
      const ids = await appositeService.verify(String(cpf));

      return response.json({
        isOk: true,
        message: 'Cliente está apto',
        idContas: ids,
      });
    } catch (error) {
      return response.status(httpstatus.NOT_FOUND).json({
        isOk: false,
        message: error.message,
        id_conta: [],
      });
    }
  }

 }

export default AppositeController;
