import {Response, Request, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../../config/auth';

import AppError from '../../../../../shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction)
  : void {
    //Validação do token JWT

    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppError('JWT token is missing', 401);
    }

    //Bearer sauidhasudh
    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token,  authConfig.jwt.secret);

      const {sub} = decoded as TokenPayload;

      // request.user = {
      //   id: sub
      // }

      console.log(decoded);

      return next();
    } catch {
      throw new AppError('Inavlid JWT token', 401);
    }
}
