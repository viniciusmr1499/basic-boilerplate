import { Request, Response } from 'express';

import { Controller, Get } from '@tsed/common';

@Controller('/test')
export class Test {
  @Get('/success')
  public async sucess(request: Request, response: Response): Promise<Response> {
    return response.json({
      message: 'success',
    });
  }
}
