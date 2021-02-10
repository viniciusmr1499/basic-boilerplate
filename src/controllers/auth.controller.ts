import { Response, Request } from 'express';
import httpstatus from 'http-status-codes';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/jwt';
import UserService from '@services/api/user.service';
import { Controller, Post } from '@tsed/common';

@Controller('/auth')
class Authentication {
  @Post('/login')
  public async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      // const userService = new UserService();
      // const user = await userService.authenticate({ email, password });

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        // subject: user.id,
        issuer: 'api',
        expiresIn,
      });

      return response.json({
        // user,
        token,
      });
    } catch (error) {
      return response.status(httpstatus.UNAUTHORIZED).json(error.message);
    }
  }
}

export default Authentication;
