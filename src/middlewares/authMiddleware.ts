import { verify } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  var md5 = require('md5');
  const authToken: string | undefined = req.headers.authorization;
  const jwtConfig = {
    hash: md5('ebarn-pass'),
    options: {
      expiresIn: 2000,
    },
  };

  if (!authToken) {
    return res.status(UNAUTHORIZED).json({
      error: 'Access denied.',
    });
  }

  if (authToken) {
    verify(authToken, jwtConfig.hash, (err: any) => {
      if (err) {
        return res.status(UNAUTHORIZED).json({
          error: 'Access denied.',
        });
      }
    });
    return next();
  }
};

export default authMiddleware;
