import { Request, Response } from 'express';
import { Controller, Post, ClassMiddleware } from '@overnightjs/core';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { sign } from 'jsonwebtoken';

import cors from 'cors';

@Controller('auth')
@ClassMiddleware([cors()])
export class AuthController {
  @Post('')
  private async authUser(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;
    var md5 = require('md5');

    const jwtConfig = {
      hash: md5('ebarn-pass'),
      options: {
        expiresIn: 2000,
      },
    };

    try {
      if (login === 'admin' && password === 'ebarn') {
        const adminToken = sign(
          { id: 'admin' },
          jwtConfig.hash,
          jwtConfig.options
        );

        return res.status(OK).json({ jwt: adminToken });
      } else {
        return res.status(UNAUTHORIZED).json({
          error: `Auth fail`,
        });
      }
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}
